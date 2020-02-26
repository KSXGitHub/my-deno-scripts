#! /usr/bin/env sh
git checkout master || exit $?
git push origin master || exit $?
git checkout gh-pages || exit $?
git merge master || exit $?
git push origin gh-pages || exit $?
