FROM ubuntu:trusty

ARG TAG=v0.2.0.2

WORKDIR /root/

# install build tools
RUN apt-get update \
  && apt-get install -y --no-install-recommends  software-properties-common\
  build-essential libtool autotools-dev automake pkg-config libssl-dev libevent-dev bsdmainutils python3\
  curl g++-aarch64-linux-gnu cmake \
  
  # cleanup 
  && rm -rf /var/lib/apt/lists/* 

# install libdb
RUN add-apt-repository ppa:bitcoin/bitcoin -y \
  && apt-get update \
  && apt-get install -y --no-install-recommends libdb4.8-dev libdb4.8++-dev \
  # cleanup 
  && rm -rf /var/lib/apt/lists/* 

# clone and build
RUN apt-get update \
  && apt-get install -y --no-install-recommends git libboost-all-dev \
  && git clone -b ${TAG} https://github.com/genix-project/genix.git \
  && cd ./genix \ 
  && cd share/ \
  && chmod +x genbuild.sh \
  && cd .. \
  && cd depends/ \
  && chmod +x config.guess \
  && chmod +x config.sub \
  && sudo make \
  && cd .. \
  && export CC="gcc -fPIC"  \
  && export CXX="g++ -fPIC"  \
  && sudo bash ./autogen.sh CONFIG_SITE=$PWD/depends/x86_64-pc-linux-gnu/share/config.site \
  && sudo ./configure --prefix=/ --enable-cxx --enable-shared --with-pic --without-gui \
  && sudo make  \
  && sudo make install \
  # cleanup 
  && rm -rf /var/lib/apt/lists/* 

RUN mkdir /root/bin/ \
  && cd /root/genix/src/ \
  && cp genixd /root/bin/ \ 
  && cp genix-cli /root/bin/ \
  && cp genix-tx /root/bin/ \
  && cd /root/bin/ \
  && strip * 

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

ENTRYPOINT genixd -rpcuser=$RPC_USER -rpcpassword=$RPC_PASSWORD -rpcallowip=$RPC_ALLOW_IP -rpcport=$RPC_PORT -txindex -printtoconsole
