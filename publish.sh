#! /usr/bin/env sh
echo '>>> master'
git checkout master || exit $?
git push origin master || exit $?
echo '>>> gh-pages'
git checkout gh-pages || exit $?
git merge master || exit $?
git push origin gh-pages || exit $?
echo '>>> master'
exec git checkout master
