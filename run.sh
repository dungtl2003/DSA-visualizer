#!/bin/sh

set -e

envsubst < /etc/nginx/templates/default.conf.template > /etc/nginx/conf.d/default.conf
nginx -g 'daemon off;'
