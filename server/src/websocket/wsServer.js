import { WebSocketServer } from 'ws';
import url from 'url';
import { verifyToken } from '../auth/auth.middleware.js';
import { SUPPORTED_STOCKS } from '../config.js';
import { startPriceGenerator } from '../stocks/stockPrices.js';

export function setupWebSocket(server) {
  const wss = new WebSocketServer({ server, path: '/ws' });

  // symbol -> Set<ws>
  const subscriptions = new Map();
  SUPPORTED_STOCKS.forEach((sym) => subscriptions.set(sym, new Set()));

  wss.on('connection', (ws, req) => {
    const { query } = url.parse(req.url, true);
    const token = query?.token;
    const user = token ? verifyToken(token) : null;

    if (!user) {
      ws.close(4001, 'Unauthorized');
      return;
    }

    ws.user = user;
    ws.subscribedSymbols = new Set();

    ws.on('message', (data) => {
      try {
        const msg = JSON.parse(data.toString());
        if (msg.type === 'subscribe') {
          handleSubscribe(ws, msg.symbol, subscriptions);
        } else if (msg.type === 'unsubscribe') {
          handleUnsubscribe(ws, msg.symbol, subscriptions);
        }
      } catch (err) {
        console.error('Invalid WS message', err);
      }
    });

    ws.on('close', () => {
      ws.subscribedSymbols.forEach((symbol) => {
        const set = subscriptions.get(symbol);
        if (set) set.delete(ws);
      });
    });
  });

  startPriceGenerator((symbol, price) => {
    const subs = subscriptions.get(symbol);
    if (!subs) return;

    const payload = JSON.stringify({
      type: 'price_update',
      symbol,
      price,
      ts: Date.now(),
    });

    subs.forEach((client) => {
      if (client.readyState === 1) {
        client.send(payload);
      }
    });
  });
}

function handleSubscribe(ws, symbol, subscriptions) {
  if (!subscriptions.has(symbol)) return;
  ws.subscribedSymbols.add(symbol);
  subscriptions.get(symbol).add(ws);
}

function handleUnsubscribe(ws, symbol, subscriptions) {
  if (!subscriptions.has(symbol)) return;
  ws.subscribedSymbols.delete(symbol);
  subscriptions.get(symbol).delete(ws);
}
