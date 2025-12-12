import { useEffect, useRef, useState } from 'react';

export function useWebSocketPrices(token, subscribedSymbols) {
  const [prices, setPrices] = useState({});
  const wsRef = useRef(null);

  // establish connection when token changes
  useEffect(() => {
    if (!token) return;

    const wsUrl = `ws://localhost:4000/ws?token=${encodeURIComponent(token)}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log('WS connected');
      subscribedSymbols.forEach((sym) => {
        ws.send(JSON.stringify({ type: 'subscribe', symbol: sym }));
      });
    };

    ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === 'price_update') {
        setPrices((prev) => ({
          ...prev,
          [msg.symbol]: msg.price,
        }));
      }
    };

    ws.onclose = () => {
      console.log('WS closed');
    };

    ws.onerror = (err) => {
      console.error('WS error', err);
    };

    return () => {
      ws.close();
    };
  }, [token]);

  // when subscribedSymbols change, send subscribe messages
  useEffect(() => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;

    subscribedSymbols.forEach((sym) => {
      ws.send(JSON.stringify({ type: 'subscribe', symbol: sym }));
    });
  }, [subscribedSymbols]);

  return prices;
}
