FROM node:jessie

ARG NPM_TOKEN
ENV NPM_TOKEN=$NPM_TOKEN

WORKDIR /usr/src/app

COPY .npmrc .npmrc
COPY package*.json ./

RUN npm i

COPY . .

EXPOSE 3000

CMD npm start