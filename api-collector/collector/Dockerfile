FROM node:8-alpine

# Bundle APP files
COPY . .

# Install app dependencies
RUN npm install --production --build-from-source && npm install -g pm2

CMD [ "pm2-runtime", "start", "pm2.json" ]