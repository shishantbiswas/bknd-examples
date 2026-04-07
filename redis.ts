import { createClient } from 'redis';

const url = process.env.REDIS_URL;
const servername = process.env.REDIS_SNI

export const redisSubscriber = await createClient({
  url: url,
  socket: {
    tls: true,
    servername,
    connectTimeout: 10000,
  }
}).connect();