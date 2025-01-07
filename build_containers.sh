#!/bin/bash

# docker container images
DOCKER_SITE_IMG=ghcr.io/tanmoy7989/tanmoy7989.github.io/tsanyal-website:latest
DOCKER_RESUME_IMG=ghcr.io/tanmoy7989/tanmoy7989.github.io/tsanyal-resume:latest

# build docker images
docker build -t $DOCKER_SITE_IMG -f dockerfiles/website .
docker build -t $DOCKER_RESUME_IMG -f dockerfiles/resume .

# login to github container registry
docker login ghcr.io -u tanmoy7989 --password-stdin

# push docker images
docker push $DOCKER_SITE_IMG
docker push $DOCKER_RESUME_IMG