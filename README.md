# bknd + Tanstack Start Example (Docker)

This is a minimal example to shows how to integrate bknd with Tanstack Start for Docker deployment.

## Setup

```bash
bun install
bun run dev
```

## How it works

1. **`bknd.config.ts`** - bknd configuration with database connection, schema, and seed data
2. **`src/routes/api.$.ts`** - Handles `/api/*` requests for bknd
3. **`src/routes/index.tsx`** - Using `getApp()` to fetch data in loader
3. **`src/routes/ssr.tsx`** - Server Side example with `getApp()` to fetch data on server

## Directory Structure

```txt
├── bknd.config.ts
├── bun.lock
├── docker-compose.yml
├── Dockerfile
├── package.json
├── public
├── README.md
├── src
│   ├── bknd.ts           # bknd singleton initialization
│   ├── logo.svg
│   ├── router.tsx
│   ├── routes
│   │   ├── api.$.ts      # bknd API handler
│   │   ├── admin.$.tsx   # Admin Dashboard
│   │   ├── index.tsx     # Client Side Rendering example
│   │   └── ssr.tsx       # Server Side Rendering example
│   │   ├── __root.tsx
│   ├── routeTree.gen.ts
│   └── styles.css
├── tsconfig.json
└── vite.config.ts
```


## API Endpoints

- `GET /admin` - for Admin Dashboard
- `GET /api/data/entity/todos` - List todos (requires auth)
- `POST /api/auth/password/login` - Login

## Test Credentials

- Email: `test@bknd.io`
- Password: `12345678`

## For Building the Docker Image

```bash
docker build -t bknd-examples:tanstack-start .
```

## For Deployment on Docker (using docker compose)

1. Run `docker compose up -d`

## For Local Development

1. Run `bun run dev`
2. Open `http://localhost:3000`
3. Open `http://localhost:3000/admin` for Admin Dashboard


## For Cloudflare Workers deployment
Checkout the `cf-tanstack` branch for Cloudflare Workers deployment instructions.