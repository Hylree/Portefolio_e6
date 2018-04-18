FROM node:latest

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

RUN npm install -g pm2

COPY . /usr/src/app

RUN npm install

EXPOSE 3000

CMD pm2 start --no-daemon server.js
