FROM node:21-alpine

# Set current working directory to be in /home/app
WORKDIR /home/app

# Download non-dev dependencies
COPY ./package.json .
# Need to set script prepare to none so that it does not try to download husky
RUN npm pkg set scripts.prepare=" " && npm install --omit=dev

COPY ./server ./server
COPY ./config ./config
COPY ./dist ./dist

EXPOSE 80

CMD ["node", "server/server.js"]
