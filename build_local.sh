#!/bin/bash

# docker container images
# make sure you have logged in to the docker registry with proper credentials
DOCKER_SITE_IMG=ghcr.io/tanmoy7989/tanmoy7989.github.io/tsanyal-website:latest
DOCKER_RESUME_IMG=ghcr.io/tanmoy7989/tanmoy7989.github.io/tsanyal-resume:latest

# pull docker images (assumes that the images are already built)
docker pull $DOCKER_SITE_IMG
docker pull $DOCKER_RESUME_IMG

# paths
RESUME_SRC_PATH=resume/content
RESUME_TAR_PATH=assets/docs/resume

# copy local config file
cp configs/config.local.yml ./_config.yml

# build resume
mkdir -p $RESUME_TAR_PATH
docker run --rm -it \
    -u 1000:1000 \
    -v $(pwd)/$RESUME_SRC_PATH:/home/content \
    $DOCKER_RESUME_IMG \
    sh -c "npm run export"

mv $RESUME_SRC_PATH/resume.pdf $RESUME_TAR_PATH
mv $RESUME_SRC_PATH/resume.html $RESUME_TAR_PATH

# build (and serve) site
docker run --rm -it \
    -u 1000:1000 \
    -p 4000:4000 \
    -v $(pwd):/home \
    $DOCKER_SITE_IMG \
    sh -c \
        "bundle exec jekyll build --incremental && \
        jekyll serve --watch --host 0.0.0.0"

# cleanup
rm -rf _site
rm _config.yml && cp configs/config.deploy.yml ./_config.yml
