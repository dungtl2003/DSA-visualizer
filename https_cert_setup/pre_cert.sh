#!/bin/sh

set -e

docker-compose -f compose.yaml -f compose.prod.yaml run -d nginx
