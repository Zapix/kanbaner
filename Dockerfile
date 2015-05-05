FROM ubuntu:14.04
MAINTAINER Aleksandr Aibulatov <zap.aibulatov@gmail.com>
RUN apt-get update -y
RUN apt-get install -y npm
RUN ln -s /usr/bin/nodejs /usr/bin/node

ADD . /src
RUN cd /src && npm install

WORKDIR /src
