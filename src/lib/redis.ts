import { createClient } from 'redis';

const url = process.env.REDIS_URL;
const servername = process.env.REDIS_SNI

export const redis = await createClient({
  url: url,
  socket: {
    tls: true,
    servername, // remove this if not required
    connectTimeout: 10000,
  }
}).connect();