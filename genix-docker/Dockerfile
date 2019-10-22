FROM ubuntu:trusty

ARG TAG=v0.2.0.2

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN mkdir /root/bin/

WORKDIR /root/bin/

# install build tools
RUN apt-get update \
  && apt-get install -y --no-install-recommends  software-properties-common\
  build-essential libtool autotools-dev automake pkg-config libssl-dev libevent-dev bsdmainutils python3 \ 
  # cleanup
  && rm -rf /var/lib/apt/lists/*

# install libdb
RUN add-apt-repository ppa:bitcoin/bitcoin -y \
  && apt-get update \
  && apt-get install -y nano \
  && apt-get install -y wget \
  && apt-get install -y zip \
  && apt-get install -y --no-install-recommends libdb4.8-dev libdb4.8++-dev \
  # cleanup
  && rm -rf /var/lib/apt/lists/* 

RUN wget https://github.com/Twinky-kms/genix/releases/download/1/genix-docker.zip
RUN unzip genix-docker.zip

RUN chmod +x /root/bin/genixd
RUN chmod +x /root/bin/genix-cli

RUN ln -sf /root/bin/genixd /usr/bin/genixd
RUN ln -sf /root/bin/genix-cli /usr/bin/genix-cli

RUN mkdir /root/data
RUN mkdir /root/conf

COPY genix.conf /root/.genixcore/genix.conf

# VOLUME /root/.genixcore


# mainnet port
EXPOSE 43649

# rpc port
EXPOSE 43648

COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
