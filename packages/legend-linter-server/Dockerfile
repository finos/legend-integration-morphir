FROM ubuntu:latest
#FROM node:16

# Create app directory
WORKDIR /usr/src/linter-server

# Install app dependencies
COPY package.json ./

RUN \
    curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | bash && \
    apt-get update && \
    apt install -y curl && \
    curl -sL https://deb.nodesource.com/setup_12.x | bash - && \
    apt install -y nodejs && \
    npm install -y -g npm@8.1.0 && \
    npm install -y typescript --save-devnpm install typescript --save-dev

# Bundle app source
COPY . .

EXPOSE 9900
CMD [ "node", "server.js" ]
