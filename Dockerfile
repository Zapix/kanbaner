FROM ubuntu:14.04
MAINTAINER Aleksandr Aibulatov <zap.aibulatov@gmail.com>
RUN apt-get update -y
RUN apt-get install -y npm
RUN ln -s /usr/bin/nodejs /usr/bin/node

ADD . /src
RUN npm install -g http-server
RUN cd /src && npm install && npm install jest-cli

WORKDIR /src
