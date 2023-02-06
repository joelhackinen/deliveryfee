FROM node:16.18.1-bullseye-slim

WORKDIR /usr/src/app

COPY --chown=node . .

ENV PORT 8080

RUN npm ci --omit=dev

RUN npm run build

RUN npm install -g serve

USER node

CMD ["serve", "build"]