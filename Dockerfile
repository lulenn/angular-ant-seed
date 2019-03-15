# Stage 1: "build-stage", based on Node.js, to build and compile Angular
FROM node:10.15-alpine as build-stage

ARG configuration=production
ENV version=local

WORKDIR /app
COPY package*.json /app/
RUN npm i
COPY . .

## run test
#RUN npm run test -- --browsers ChromeHeadlessNoSandbox --watch=false

## Build the angular app in production mode and store the artifacts in dist folder
RUN npm run build -- --output-path=./dist/out --configuration $configuration

### STAGE 2: Setup ###
FROM nginx:1.14-alpine

## Copy our default nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From ‘build-stage’ stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=build-stage /app/dist/out/ /usr/share/nginx/html

CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/deploy/env.template.json > /usr/share/nginx/html/assets/deploy/env.json && exec nginx -g 'daemon off;'"]

## build & run
# sudo docker build . -t platform:0.1 --build-arg configuation=''
# sudo docker run -d -p 8888:80 --env version=docker platform:0.1
# visit localhost:8888
