FROM node:16.18.1-bullseye-slim AS build-stage

WORKDIR /usr/src/app

COPY --chown=node:node . .

ENV PORT 8000

RUN npm ci --omit=dev

RUN npm run build


FROM nginx:1.20-alpine

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html