#!/bin/bash

rm -f /root/.genixcore/.lock /root/.genixcore/genixd.pid && \
genixd -daemon -datadir=/root/.genixcore -conf=/root/conf/genix.conf && \
touch /root/.genixcore/debug.log && \
cron && \
service rsyslog restart && \
tail -n 100 -f /root/.genixcore/debug.log
