ENVNAME=webenv
eval "$(command conda 'shell.bash' 'hook' 2> /dev/null)"
conda activate $ENVNAME

# build resume
curr_dir=$(pwd)
mkdir -p assets/docs/resume
cd resume && npm run export
mv resume.pdf ../assets/docs/resume/
cd $curr_dir

# build the website
bundle exec jekyll build --incremental

sync with git
git add *
if [ $# -eq 0 ]; then
    msg=auto_commit_msg_$(echo $RANDOM | md5sum | head -c 20)
else
    msg=$1
fi

git commit -m $msg
git push origin main
