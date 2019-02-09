FROM node:10-alpine

WORKDIR /app

# Bundle APP files
COPY . .

# Install app dependencies & build

# see https://github.com/npm/uid-number/issues/3#issuecomment-453736871 `set unsafe-perm true`
RUN npm config set unsafe-perm true\
  && npm install \
  && npm install -g pm2 \
  && npm run build

CMD [ "pm2-runtime", "start", "pm2.json" ]