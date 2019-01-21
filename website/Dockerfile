FROM nginx

# setup build tools
WORKDIR /app
COPY . /app

RUN apt-get update\
  && apt-get install -y jekyll \
  && rm -rf /var/lib/apt/lists/*

# build website
WORKDIR /data
COPY ./default.conf /etc/nginx/conf.d/default.conf

RUN jekyll build -s /app -d .

# finish up
EXPOSE 3000