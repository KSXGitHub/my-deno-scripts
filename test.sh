#! /usr/bin/env sh

cd "$(dirname "$0")" || exit $?

echo ':: shellcheck'
shellcheck ./*.sh || exit $?

echo ':: deno test'
exec deno run --allow-all ./cmd/run-tests.ts
