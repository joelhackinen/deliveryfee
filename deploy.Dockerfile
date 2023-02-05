FROM node:16.18.1-bullseye-slim

WORKDIR /usr/src/app

COPY . .

ENV PORT 8080

RUN npm ci

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]