[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# hidden variables

This is my personal website based on the immensely popular [minimal-mistakes](https://mmistakes.github.io/minimal-mistakes) theme by [Michael Rose](https://github.com/mmistakes). 

I borrowed several modifications to the css content from [this very helpful blog post](https://www.cross-validated.com/Personal-website-with-Minimal-Mistakes-Jekyll-Theme-HOWTO-Part-II/) by Katerina Bosko.

This website also hosts my resume. I modified the json-resume theme [caffeine](https://github.com/kelyvin/jsonresume-theme-caffeine) and incorporated it within a sub-folder in the website. 


I prefer to keep the website management limited to my local machine instead of putting it in `github actions`:

- `setup.sh` is a script that sets up everything (conda environments too) from scratch the first time this repository is downloaded.

- `update.sh` re-builds my resume, and pushes any other changes made to github. 

If you find the combined website + resume hosting useful, feel free to fork this repository, but with appropriate citations.