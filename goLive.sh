echo ${1}
git add -A
git commit -m "${1}"
git push
cp code.js ../XURDLE
cp styles.css ../XURDLE
cd ../XURDLE
git add -A
git commit -m "$1"
git push
cd ../XURDLE-dev
