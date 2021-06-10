# DB

## Running MongoDB in Docker

1) Download and run Mongo container

    `docker run --name mongodb -d mongo:latest`

2) Run Docker bash shell

    `docker exec -it mongodb bash` 

3) Run Mongo CLI tool

    `mongo`

4) Execute MongoDB commands in the CLI prompt, refer to this guide for options - https://www.tutorialspoint.com/mongodb/index.htm

## Additional References

- https://mongoosejs.com/docs/guide.html#definition
- https://hub.docker.com/_/mongo