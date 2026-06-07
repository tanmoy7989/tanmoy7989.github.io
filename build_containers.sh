#!/bin/bash
# build_containers.sh — rebuild and push Docker images
set -e

REGISTRY=ghcr.io/tanmoy7989/tanmoy7989.github.io

echo "→ Building website image..."
docker build -f dockerfiles/Dockerfile.website \
  -t $REGISTRY/tsanyal-website:latest .

echo "→ Building texlive image..."
docker build -f dockerfiles/Dockerfile.texlive \
  -t $REGISTRY/tsanyal-texlive:latest .

echo "→ Pushing images..."
docker push $REGISTRY/tsanyal-website:latest
docker push $REGISTRY/tsanyal-texlive:latest

echo "✓ Done"
