#!/bin/bash
# Compile tsanyal_resume.tex → ../public/resume.pdf and remove LaTeX aux files.
set -e

RESUME_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$RESUME_DIR/.." && pwd)"
REGISTRY=ghcr.io/tanmoy7989/tanmoy7989.github.io
DOCKER_TEXLIVE=$REGISTRY/tsanyal-texlive:latest
TEX_FILE=tsanyal_resume.tex
JOBNAME=resume
PDF_FILE=resume.pdf

clean_aux_files() {
  find "$RESUME_DIR" -maxdepth 1 \( -name '*.aux' -o -name '*.log' -o -name '*.out' \) -delete
}

if [ ! -f "$RESUME_DIR/$TEX_FILE" ]; then
  echo "✗ $RESUME_DIR/$TEX_FILE not found"
  exit 1
fi

if [ -z "$(docker images -q "$DOCKER_TEXLIVE" 2>/dev/null)" ]; then
  echo "→ Pulling $DOCKER_TEXLIVE..."
  docker pull "$DOCKER_TEXLIVE"
fi

echo "→ Compiling $RESUME_DIR/$TEX_FILE..."
docker run --rm \
  -v "$RESUME_DIR":/workdir \
  -w /workdir \
  "$DOCKER_TEXLIVE" \
  sh -c "pdflatex -jobname=$JOBNAME -interaction=nonstopmode $TEX_FILE && \
         pdflatex -jobname=$JOBNAME -interaction=nonstopmode $TEX_FILE && \
         find . -maxdepth 1 \\( -name '*.aux' -o -name '*.log' -o -name '*.out' \\) -delete && \
         test -f $PDF_FILE"

clean_aux_files

if [ ! -f "$RESUME_DIR/$PDF_FILE" ]; then
  echo "✗ $RESUME_DIR/$PDF_FILE was not produced"
  exit 1
fi

mkdir -p "$ROOT/public"
mv "$RESUME_DIR/$PDF_FILE" "$ROOT/public/$PDF_FILE"
echo "✓ public/$PDF_FILE updated"
