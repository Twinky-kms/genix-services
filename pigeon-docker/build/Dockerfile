FROM ubuntu:trusty

ARG TAG=v16.00.1b

VOLUME /build

WORKDIR /

RUN apt-get update \
  # setup environment
  && apt-get install -y build-essential libtool autotools-dev \
  automake pkg-config libssl-dev libevent-dev bsdmainutils python3 \
  && apt-get install -y libboost-system-dev libboost-filesystem-dev \
  libboost-chrono-dev libboost-program-options-dev libboost-test-dev \
  libboost-thread-dev \
  && apt-get install -y software-properties-common \
  && add-apt-repository -y ppa:bitcoin/bitcoin \
  && apt-get update \
  && apt-get install -y libdb4.8-dev libdb4.8++-dev \
  && apt-get install -y libminiupnpc-dev \
  && apt-get install -y libzmq3-dev \
  && apt-get install -y libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev qttools5-dev-tools libprotobuf-dev protobuf-compiler \
  && apt-get install -y libqrencode-dev \
  && apt-get install -y git \
  # build
  && git clone -b ${TAG} https://github.com/Pigeoncoin/pigeoncoin.git \
  && cd pigeoncoin \
  && export CC="gcc -fPIC"  \
  && export CXX="g++ -fPIC"  \
  && ./autogen.sh  \
  && ./configure --enable-cxx --disable-shared --with-pic \
  && make \
  && make install \
  # prepare build artifacts
  && cp src/qt/pigeon-qt /build \
  && cp src/pigeond /build \
  && cp src/pigeon-cli /build \
  && cp src/pigeon-tx /build \
  && cd /build \
  && strip * \
  && md5sum * > md5 \
  && tar -zcvf pigeon_${TAG}_linux.tar.gz * \
  # cleanup
  && rm -rf /var/lib/apt/lists/* \
  && rm -rf /pigeoncoin \
  && apt-get remove -y build-essential libtool autotools-dev \
  automake pkg-config libssl-dev libevent-dev bsdmainutils python3 \
  libboost-system-dev libboost-filesystem-dev \
  libboost-chrono-dev libboost-program-options-dev libboost-test-dev \
  software-properties-common \
  libdb4.8-dev libdb4.8++-dev \
  libminiupnpc-dev \
  libzmq3-dev \
  libqt5gui5 libqt5core5a libqt5dbus5 qttools5-dev qttools5-dev-tools libprotobuf-dev protobuf-compiler \
  libqrencode-dev \
  git 

# untested, but seemingly complete

# this line might be necessary, will find out when we try to build this image
# && apt-get install libboost-all-dev \