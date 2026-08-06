# syntax=docker/dockerfile:1

FROM node:24-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

COPY . .
RUN npm run build

FROM caddy:2-alpine AS runner

ENV PORT=49228

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist/client /srv

EXPOSE 49228
