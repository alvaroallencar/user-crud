FROM node:16

WORKDIR /usr/src/server

COPY package*.json ./

RUN yarn install 

COPY . .

RUN yarn build

EXPOSE 3333

CMD ["yarn", "start:prod"]
