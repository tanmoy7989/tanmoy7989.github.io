ENVNAME=webenv
conda activate $ENVNAME

bundle exec jekyll build --incremental
git add *
git commit -m $1
git push origin main




