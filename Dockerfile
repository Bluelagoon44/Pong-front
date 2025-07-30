FROM node:24-alpine

WORKDIR /pong/front

COPY package.json .
COPY package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine

COPY config/nginx.conf /etc/nginx/conf.d/default.conf
COPY config/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

COPY --from=0 /pong/front/dist /usr/share/nginx/html

EXPOSE 80