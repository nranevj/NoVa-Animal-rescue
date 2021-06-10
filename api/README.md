# API

## Running Node API locally

1) Run node in entry file

    `node app.js`

## Running Node API in Docker

1) Build docker image

    `docker build -t api/node-hello-api .`

2) Run docker image on local Docker

    `docker run --rm -d -p 3001:3001 api/node-hello-api`