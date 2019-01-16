FROM node:lts-alpine

WORKDIR /explorer
COPY . /explorer

RUN apk update \
  && apk add python make \
  && cp ./settings.json.template ./settings.json \
  && npm install --production 

CMD ["node","app.js"]