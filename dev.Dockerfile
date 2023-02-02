FROM node:16.18.1-bullseye-slim

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD npm start