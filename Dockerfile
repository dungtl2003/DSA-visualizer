FROM nginxinc/nginx-unprivileged:1-alpine3.18

USER root

ENV ROOT=/app

# Set current working directory to be in /app
WORKDIR ${ROOT}

COPY ./templates /etc/nginx/templates
COPY ./run.sh ./run.sh
COPY ./dist ./dist

RUN touch /etc/nginx/conf.d/default.conf && \
    chown -R nginx:nginx /etc/nginx/conf.d && \
    chmod a+x run.sh

EXPOSE 80 443

USER nginx

CMD ["./run.sh"]
