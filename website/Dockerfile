FROM nginx

# setup build tools

RUN apt-get update\
  && apt-get install -y jekyll \
  && rm -rf /var/lib/apt/lists/*

# copy data
WORKDIR /app
COPY . /app
COPY ./default.conf /etc/nginx/conf.d/default.conf

# build website
WORKDIR /data
RUN jekyll build -s /app -d .

# production port
EXPOSE 3000
# dev port
EXPOSE 4000