FROM ubuntu:trusty

# install build tools
RUN apt-get update
RUN sudo apt-get -y install build-essential libtool autotools-dev automake \ 
  pkg-config libssl-dev libevent-dev bsdmainutils python3\
  libboost-all-dev software-properties-common

# install libdb
RUN add-apt-repository ppa:bitcoin/bitcoin -y
RUN apt-get update
RUN apt-get -y install libdb4.8-dev libdb4.8++-dev

# install git
RUN apt-get -y install git

# clone repo to root
WORKDIR /
RUN git clone https://github.com/Pigeoncoin/pigeoncoin.git

# install from repo folder
WORKDIR /pigeoncoin/
RUN export CC="gcc -fPIC" &&\
  export CXX="g++ -fPIC" &&\
  ./autogen.sh && \
  ./configure --enable-cxx --disable-shared --with-pic --without-gui &&\
  make &&\
  make install