FROM ubuntu:latest
#FROM node:16

# Create app directory
WORKDIR /usr/src/linter-server

# Install app dependencies
COPY package.json ./

EXPOSE 9900
CMD [ "node", "server.js" ]
