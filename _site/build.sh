#!/bin/bash

# docker container image
DOCKER_SITE_IMG=tsanyal-website:latest
DOCKER_RESUME_IMG=tsanyal-resume:latest
DOCKER_MNT_PATH=/home

# paths
CONFIG_PATH=configs
RESUME_CONTENT_PATH=resume/content
RESUME_ASSETS_PATH=assets/docs/resume

# usage
function usage {
    echo "Usage: $(basename $0) [-l] [-d <commit msg>]"
}

# jekyll requirements (gemfile and config)
function get_config {
    if [ $1 == "l" ]; then
        cp $CONFIG_PATH/config.local.yml ./_config.yml
    elif [ $1 == "d" ]; then
        cp $CONFIG_PATH/config.deploy.yml ./_config.yml
    else
        echo Unknown config build option $1
        exit 1
    fi

    if [[ -f Gemfile.lock ]]; then
        rm -f Gemfile.lock
    fi
}

# build resume
function build_resume {
    mkdir -p $RESUME_ASSETS_PATH
    docker run --rm -it \
        -u 1000:1000 \
        -v $(pwd)/$RESUME_CONTENT_PATH:$DOCKER_MNT_PATH/content \
        $DOCKER_RESUME_IMG \
        sh -c "npm run export"
    mv $RESUME_CONTENT_PATH/resume.pdf $RESUME_ASSETS_PATH
    mv $RESUME_CONTENT_PATH/resume.html $RESUME_ASSETS_PATH
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
