ENVNAME=webenv
eval "$(command conda 'shell.bash' 'hook' 2> /dev/null)"
conda activate $ENVNAME

bundle exec jekyll build --incremental
git add *
if [ $# -eq 0 ]; then
    msg=$(echo $RANDOM | md5sum | head -c 20)
else
    msg=$1
fi

git commit -m $msg
git push origin main
