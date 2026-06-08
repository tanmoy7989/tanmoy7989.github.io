#!/bin/bash
# test_build.sh — start local dev server to preview site changes
# Usage: ./scripts/test_build.sh [-r|--resume]
#
# With -r: compile resume/tsanyal_resume.tex → public/resume.pdf, then dev server
set -e

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
BUILD_RESUME=false

for arg in "$@"; do
  case $arg in
    -r|--resume) BUILD_RESUME=true ;;
    *)
      echo "Usage: ./scripts/test_build.sh [-r|--resume]"
      exit 1
      ;;
  esac
done

if [ "$BUILD_RESUME" = true ]; then
  bash "$ROOT/scripts/render_resume.sh"
fi

echo "→ Copying resume/tsanyal_resume.ts → src/data/cv.ts..."
mkdir -p "$ROOT/src/data"
cp "$ROOT/resume/tsanyal_resume.ts" "$ROOT/src/data/cv.ts"

echo "→ Starting Astro dev server..."
cd "$ROOT"
npm run dev
