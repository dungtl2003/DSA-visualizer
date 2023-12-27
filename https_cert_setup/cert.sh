#!/bin/sh

set -e

docker-compose run --rm  certbot certonly --webroot --webroot-path /var/www/certbot/ -d dsa-visualizer.com
