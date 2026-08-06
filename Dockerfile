# syntax=docker/dockerfile:1

FROM node:24-alpine AS builder
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile --ignore-scripts

COPY . .
RUN pnpm build

FROM caddy:2-alpine AS runner
ENV PORT=49228

COPY Caddyfile /etc/caddy/Caddyfile
COPY --from=builder /app/dist/client /srv

EXPOSE 49228