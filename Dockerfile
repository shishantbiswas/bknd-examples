FROM oven/bun:alpine AS base
RUN apk add --no-cache libc6-compat wget curl

WORKDIR /app
# WORKDIR /app

# FROM base AS deps
COPY . .
RUN bun install --frozen-lockfile

# FROM base AS builder
# WORKDIR /app
# COPY --from=deps /app/node_modules ./node_modules

# ENV NODE_ENV=production
# RUN npm run build

# FROM base AS runner

ENV NODE_ENV=production \
  PORT=3000 \
  HOSTNAME="0.0.0.0" \
  NODE_OPTIONS="--max-old-space-size=256"

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 honoapp

# COPY --from=builder --chown=bunuser:nodejs /app/.output ./.output
USER honoapp

EXPOSE 3000

CMD [ "bun","start" ]