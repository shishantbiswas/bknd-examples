FROM node:25-alpine3.22 AS base
RUN apk add --no-cache libc6-compat wget curl
RUN npm install -g bun

WORKDIR /app

FROM base AS deps
COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NODE_ENV=production
RUN bun run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production \
  PORT=3000 \
  HOSTNAME="0.0.0.0" \
  NODE_OPTIONS="--max-old-space-size=256"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 bkndapp

COPY --from=builder --chown=bkndapp:nodejs /app/.output ./.output
USER bkndapp

EXPOSE 3000

CMD [ "node",".output/server/index.mjs" ]
