FROM caddy:alpine

RUN apk update && apk add --no-cache nodejs npm

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN cp -r dist/* /srv/

COPY ./Caddyfile /etc/caddy/Caddyfile