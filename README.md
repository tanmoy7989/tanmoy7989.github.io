## Personal website jekyll theme:

Visit the website [here](tanmoy7989.github.io) 

This is adapted from a simple single-paged website template:
[github.com/t413/SinglePaged](https://github.com/t413/SinglePaged)

The build process has been somewhat automated using the ```build.py``` script.<br>Usage: <code>python build.py -cv cvtype -m commitmsg</code><br>where

* cvtype: type of resume to build using pdflatex (resume tex files are kept in the img/resume directory). Current resume types are "short" or "long"
* commitmsg: Message to use as a commit message while pushing to github. If not selected, will automatically use a random string.