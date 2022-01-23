ENVNAME=webenv
eval "$(command conda 'shell.bash' 'hook' 2> /dev/null)"
conda activate $ENVNAME

bundle exec jekyll build --incremental
git add *
git commit -m $1
git push origin main




