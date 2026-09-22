#!/bin/sh
set -eu

if [ -d /output ]; then
  cp -a /usr/share/nginx/html/. /output/
fi

exec /docker-entrypoint.sh "$@"
