import { createClient } from 'redis';

const url = process.env.REDIS_URL;

// Main client for GET/SET/PUBLISH
export const redis = await createClient({ url }).connect();

// Dedicated client for SUBSCRIBE
export const redisSubscriber = await createClient({ url }).connect();