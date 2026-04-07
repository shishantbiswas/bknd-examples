import { Hono } from 'hono'
import { upgradeWebSocket, websocket } from 'hono/bun'
import { redisSubscriber } from './redis';

const app = new Hono();

const activeClients = new Set<any>();

await redisSubscriber.subscribe('db_invalidation', (message) => {
  const payload = JSON.stringify({
    type: 'INVALIDATE',
    key: message
  });

  activeClients.forEach((ws) => {
    try {
      ws.send(payload);
    } catch (err) {
      activeClients.delete(ws);
    }
  });
});

app.get("/", (c) => c.text("daijoubu"));

app.get(
  '/ws',
  upgradeWebSocket((c) => {
    return {
      onOpen(event, ws) {
        activeClients.add(ws);
        console.log('Client connected');
      },
      onClose(event, ws) {
        activeClients.delete(ws);
        console.log('Client disconnected');
      },
    }
  })
)

export default {
  fetch: app.fetch,
  websocket,
}