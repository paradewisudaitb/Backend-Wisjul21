FROM node:fermium-alpine

COPY . /usr/share/app
WORKDIR /usr/share/app
RUN yarn install --production=true
RUN yarn build

CMD [ "yarn", "start" ]
