FROM ubuntu:16.04
RUN apt-get update;
RUN apt-get -y install build-essential libboost-all-dev libssl-dev;

ADD . /tmp/seeder
RUN cd /tmp/seeder && make
RUN cp /tmp/seeder/dnsseed /usr/local/bin

EXPOSE 53/udp

WORKDIR /var/dnsseed


ENV NS_ADDRESS=seed.pigeoncoin.org
ENV A_ADDRESS=dnsseed.pigeoncoin.org
ENV EMAIL=contact@pigeoncoin.org

ENTRYPOINT /usr/local/bin/dnsseed -h ${NS_ADDRESS} -n ${A_ADDRESS} -m ${EMAIL}