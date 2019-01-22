FROM ubuntu:16.04
RUN apt-get update;
RUN apt-get -y install build-essential libboost-all-dev libssl-dev;

ADD . /tmp/seeder
RUN cd /tmp/seeder && make
RUN cp /tmp/seeder/dnsseed /usr/local/bin

EXPOSE 53/udp

WORKDIR /var/dnsseed

ENTRYPOINT ["/usr/local/bin/dnsseed", \
  "-h", "seed2.pigeoncoin.org", \
  "-n", "0.0.0.0", \
  "-m", "contact@pigeoncoin.org"]
