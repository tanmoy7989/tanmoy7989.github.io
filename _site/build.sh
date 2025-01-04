#!/bin/bash

# docker container image
DOCKER_SITE_IMG=tsanyal-website:latest
DOCKER_RESUME_IMG=tsanyal-resume:latest
DOCKER_MNT_PATH=/usr/src/app

# paths
BUILD_DATA_PATH=build_data
RESUME_DATA_PATH=resume
CURR_PATH=$(pwd)

# usage
function usage {
    echo "Usage: $(basename $0) [-l] [-d <commit msg>]"
}

# jekyll requirements (gemfile and config)
function get_config {
    if [ $1 == "l" ]; then
        cp $BUILD_DATA_PATH/config.local.yml ./_config.yml
    elif [ $1 == "d" ]; then
        cp $BUILD_DATA_PATH/config.deploy.yml ./_config.yml
    else
        echo Unknown build option $1
    fi

    if [[ -f Gemfile.lock ]]; then
        rm -f Gemfile.lock
    fi
}

# build resume
function build_resume {
    mkdir -p assets/docs/resume
    docker run --rm -it \
        -u 1000:1000 \
        -v $(pwd)/resume/content:$DOCKER_MNT_PATH/resume/content \
        $DOCKER_RESUME_IMG \
        sh -c "cd resume && npm run export"
    mv resume/content/resume.pdf assets/docs/resume/
    mv resume/content/resume.html assets/docs/resume/
}

# site 
function build_site {
    rm -rf _site
    docker run --rm -it \
        -u 1000:1000 \
        -v $(pwd):$DOCKER_MNT_PATH \
        $DOCKER_SITE_IMG \
        sh -c "bundle exec jekyll build --incremental"
}

# sync with github
function github_sync {
    git add *
    if [ -z "$2" ]; then
        msg=auto_commit_msg_$RANDOM
    else
        msg=$2
    fi

    git commit -m "${msg}"
    git push origin main
}


#### MAIN ####
while getopts ':ld:h' opt; do
  case "$opt" in
    l)
        echo "Building site locally"
        get_config l
        build_resume
        build_site
        docker run --rm -it \
            -u 1000:1000 \
            -p 4000:4000 \
            -v $(pwd):$DOCKER_MNT_PATH \
            $DOCKER_SITE_IMG \
            sh -c "bundle exec jekyll serve --watch -H 0.0.0.0"
        ;;
    d)
        echo "Deploying site to github"
        get_config d
        build_resume
        build_site
        github_sync "${OPTARG}"
        ;;
   
    h)
        usage
        exit 1
        ;;
    
    :)
        if [ $OPTARG == "d" ]; then
            echo "Deploying site to github"
            get_config d
            build_resume
            build_site
            github_sync
        else
            echo "Argument missing for ${OPTARG}"
        fi
        ;;

    ?) 
      echo "Invalid option: -${OPTARG}"
      usage
      exit 1
      ;;
  esac
done
shift "$(($OPTIND -1))"
