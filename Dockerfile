FROM node:24-alpine

WORKDIR /pong/front

COPY package.json .

RUN npm install

COPY . .

RUN npm i -g serve

RUN npm run build

EXPOSE 3000

CMD [ "serve", "-s", "dist" ]