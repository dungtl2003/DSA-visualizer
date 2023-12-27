#!/bin/sh

set -e

envsubst < /etc/nginx/templates/https.conf.template > /etc/nginx/conf.d/https.conf
docker-compose exec nginx nginx -s reload

