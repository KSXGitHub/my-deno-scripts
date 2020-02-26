#! /usr/bin/env sh

cd "$(dirname "$0")" || exit $?

echo '>>> master'
git checkout master || exit $?

echo ':: generate'
deno --allow-all cmd/generate-index-page.ts
git add tree.html
git commit -m 'Update tree.html'
git push origin master || exit $?

echo '>>> gh-pages'
git checkout gh-pages || exit $?
git merge master || exit $?
git push origin gh-pages || exit $?

echo '>>> master'
exec git checkout master
