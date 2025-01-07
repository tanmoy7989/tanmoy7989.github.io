[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)


This is my personal website based on the immensely popular [minimal-mistakes](https://mmistakes.github.io/minimal-mistakes) theme by [Michael Rose](https://github.com/mmistakes). 

I borrowed several modifications to the css content from [this very helpful blog post](https://www.cross-validated.com/Personal-website-with-Minimal-Mistakes-Jekyll-Theme-HOWTO-Part-II/) by Katerina Bosko.

This website also hosts my resume. I modified the json-resume theme [caffeine](https://github.com/kelyvin/jsonresume-theme-caffeine) and incorporated it within a sub-folder `resume/jsonresume-theme-cortado`

The major heavy lifting is done through two containerized serrvices:
- building formatted resume from json content: using node and `jsonresume-theme-cortado` for rendering html and `puppeteer` for converting to pdf. PDF conversion in an (node:alpine) docker container is tricky, since it will generally have several fonts missing, giving the final product an ugly look. I tracked down the fonts I was missing manually and downloaded them from google-fonts. You can find these in `resume/jsonresume-theme-cortado/required_fonts`. 

- website building: To test this locally, I use a ruby docker. When deployed, actions automatically provided by github takes care of this. I do have a build pipeline in `.github/workflows/test_build.yml` that checks resume + website build, but for now it is mostly for my sanity. The process is to run a `build_local.sh` after making any required changes (which ensures that all website assets including the resume ) and then push everything to github.

If you find the combined website + resume hosting useful, feel free to fork this repository, but with appropriate citations.
