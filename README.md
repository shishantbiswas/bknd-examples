# bknd + Tanstack Start Example (Bun + Cloudflare)

This is a minimal example to shows how to integrate bknd with Tanstack Start for Cloudflare deployment.
Here is a [Cloudflare Preview URL](https://tanstack-start-bknd.shishantbiswas.workers.dev)

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
│   │   ├── ssr.tsx       # Server Side Rendering example
│   │   ├── __root.tsx
│   ├── routeTree.gen.ts
│   └── styles.css
├── tsconfig.json
├── vite.config.ts
├── worker-configuration.d.ts
└── wrangler.jsonc

```


## API Endpoints

- `GET /admin` - for Admin Dashboard
- `GET /api/data/entity/todos` - List todos (requires auth)
- `POST /api/auth/password/login` - Login

## Test Credentials

- Email: `test@bknd.io`
- Password: `12345678`


## For Deployment on Cloudflare

1. Create a D1 database
2. Update `wrangler.jsonc` with your database ID
3. Run `bun run build`
4. Run `bun run preview`
5. Run `bun run deploy`

## For Local Development

1. Run `bun run dev`
2. Open `http://localhost:3000`
3. Open `http://localhost:3000/admin` for Admin Dashboard


## For docker deployment
Checkout the main branch for docker deployment instructions.