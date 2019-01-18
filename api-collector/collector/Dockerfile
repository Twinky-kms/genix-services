FROM node:10-alpine

WORKDIR /app

# Bundle APP files
COPY . .

# Install app dependencies & build
RUN npm install \
  && npm install -g pm2 \
  && npm run build

CMD [ "pm2-runtime", "start", "pm2.json" ]