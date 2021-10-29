# FROM finos/legend-shared-server:0.16.0

FROM ubuntu:latest

#FROM legend-shared Java server

WORKDIR /usr/app/linter-app

# Bundle app source

COPY . .

RUN \
    curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | bash && \
    apt-get update && \
    apt install -y curl && \
    curl -sL https://deb.nodesource.com/setup_16.x | bash - && \
    apt install -y nodejs && \
    npm install -y -g npm@8.1.0 && \
    npm install -g yarn &&\
    yarn install && \
    yarn setup

COPY . .

EXPOSE 3050

CMD ["yarn", "start"]

# CMD java -cp /app/bin/webapp-content:/app/bin/* \
# org.finos.legend.server.shared.staticserver.Server server /config/httpConfig.json