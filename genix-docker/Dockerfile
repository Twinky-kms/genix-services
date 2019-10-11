FROM ubuntu:trusty

ARG TAG=v0.2.0.2

SHELL ["/bin/bash", "-o", "pipefail", "-c"]

RUN mkdir /.genixcore

WORKDIR /.genixcore

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
  && apt-get install zip \
  && apt-get install -y --no-install-recommends libdb4.8-dev libdb4.8++-dev \
  # cleanup
  && rm -rf /var/lib/apt/lists/* \
  && apt-get remove -y software-properties-common 

RUN wget -qO- https://github.com/Twinky-kms/genix/releases/download/1/ubuntu14.04-release.zip
RUN unzip ubuntu14.04-release.zip

RUN chmod +x /.genixcore/genixd
RUN chmod +x /.genixcore/genix-cli

RUN ln -sf /.genixcore/genixd /usr/bin/genixd
RUN ln -sf /.genixcore/genix-cli /usr/bin/genix-cli

RUN mkdir /root/data
RUN mkdir /root/conf

COPY genix.conf /root/conf/genix.conf

VOLUME /root/data


# mainnet port
EXPOSE 43649

# rpc port
EXPOSE 43648

COPY entrypoint.sh ./entrypoint.sh
RUN chmod +x entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]
