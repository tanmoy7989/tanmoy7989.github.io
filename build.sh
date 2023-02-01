#!/bin/bash

# paths
BUILD_DATA_PATH=build_data
RESUME_DATA_PATH=resume
CURR_PATH=$(pwd)

# setup environment
ENVNAME=webenv
eval "$(command conda 'shell.bash' 'hook' 2> /dev/null)"
conda activate $ENVNAME

# usage
function usage {
    echo "Usage: $(basename $0) [-l] [-d <commit msg>]"
}

# jekyll requirements (gemfile and config)
function build_jekyll {
    if [ $1 == "l" ]; then
        cp $BUILD_DATA_PATH/config.local.yml ./_config.yml
        cp $BUILD_DATA_PATH/Gemfile.local ./Gemfile
    elif [ $1 == "d" ]; then
        cp $BUILD_DATA_PATH/config.deploy.yml ./_config.yml
        cp $BUILD_DATA_PATH/Gemfile.deploy ./Gemfile
    else
        echo Unknown build option $1
    fi

    if [[ -f Gemfile.lock ]]; then
        rm -f Gemfile.lock
    fi

    bundle
}

# build resume
function build_resume {
    mkdir -p assets/docs/resume
    cd $RESUME_DATA_PATH && npm run export
    mv resume.pdf ../assets/docs/resume/
    cd $CURR_PATH 
}

# site 
function build_site {
    rm -rf _site
    bundle exec jekyll build --incremental
}

# sync with github
function github_sync {
    git add *
    if [ -z "$1" ]; then
        msg=auto_commit_msg_$RANDOM
    else
        msg=$1
    fi

    git commit -m "${msg}"
    git push origin main
}


#### MAIN ####
while getopts ':ld:h' opt; do
  case "$opt" in
    l)
        build_jekyll l
        build_resume
        build_site
        jekyll serve
        ;;
    d)
        echo "Deploying site to github"
        build_jekyll d
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
            build_jekyll d
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
