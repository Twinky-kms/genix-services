FROM ubuntu:trusty

ARG TAG=v0.2.0.2

WORKDIR /

# install build tools
RUN apt-get update \
  && apt-get install -y --no-install-recommends  software-properties-common\
  build-essential libtool autotools-dev automake pkg-config libssl-dev libevent-dev bsdmainutils python3 \ 
  # cleanup
  && rm -rf /var/lib/apt/lists/*

# install libdb
RUN add-apt-repository ppa:bitcoin/bitcoin -y \
  && apt-get update \
  && apt-get install -y --no-install-recommends libdb4.8-dev libdb4.8++-dev \
  # cleanup
  && rm -rf /var/lib/apt/lists/* \
  && apt-get remove -y software-properties-common 

# clone and build
RUN apt-get update \
  && apt-get install -y --no-install-recommends git libboost-all-dev \
  && git clone -b ${TAG} https://github.com/genix-project/genix.git \
  && cd ./genix \ 
  && cd share/ \
  && chmod +x genbuild.sh \
  && cd .. \
  && export CC="gcc -fPIC"  \
  && export CXX="g++ -fPIC"  \
  && sudo bash ./autogen.sh  \
  && sudo ./configure --enable-cxx --disable-shared --with-pic --without-gui \
  && sudo make  \
  && sudo make install \
  # cleanup
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf /genix \
  && apt-get remove -y git libboost-all-dev

# mainnet port
EXPOSE 43649

# rpc port
EXPOSE 43648

# chain data location
VOLUME /root/.genixcore

# set defaults
ENV RPC_USER=rpc_user
ENV RPC_PASSWORD=rpc_password
ENV RPC_ALLOW_IP=0.0.0.0/0
ENV RPC_PORT=43648

#write defaults to file
  RUN echo "rpcuser=$RPC_USER" >> /root/.genixcore/genix.conf \
  && echo "rpcpassword=$RPC_PASSWORD" >> /root/.genixcore/genix.conf \
  && echo "rpcallowip=$RPC_ALLOW_IP" >> /root/.genixcore/genix.conf \
  && echo "rpcport=$RPC_PORT" >> /root/.genixcore/genix.conf \
  && echo "txindex=1" >> /root/.genixcore/genix.conf \
  && echo "listen=1" >> /root/.genixcore/genix.conf \
  && echo "printtoconsole=1" >> /root/.genixcore/genix.conf 

ENTRYPOINT genixd
