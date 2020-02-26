#! /usr/bin/env sh
git checkout gh-pages || exit $?
git merge master || exit $?
git push origin gh-pages
