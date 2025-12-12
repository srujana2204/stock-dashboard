import { useEffect, useRef, useState } from 'react';

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

export function useWebSocketPrices(token, subscribedSymbols) {
  const [prices, setPrices] = useState({});
  const [previousPrices, setPreviousPrices] = useState({});
  const [history, setHistory] = useState({}); // symbol -> number[]
  const wsRef = useRef(null);

  // establish connection when token changes
  useEffect(() => {
    if (!token) return;

    const wsProtocol = API_BASE.startsWith('https') ? 'wss' : 'ws';
    const host = API_BASE.replace(/^https?:\/\//, '');
    const wsUrl = `${wsProtocol}://${host}/ws?token=${encodeURIComponent(
      token,
    )}`;

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
        const { symbol, price } = msg;

        // store previous price before updating
        setPreviousPrices((prevPrev) => ({
          ...prevPrev,
          [symbol]: prices[symbol],
        }));

        // current price
        setPrices((prev) => ({
          ...prev,
          [symbol]: price,
        }));

        // history for sparkline (last 60 points)
        setHistory((prevHist) => {
          const existing = prevHist[symbol] || [];
          const updated = [...existing, price].slice(-60);
          return { ...prevHist, [symbol]: updated };
        });
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
  }, [token]); // token only

  // when subscribedSymbols change, send subscribe messages
  useEffect(() => {
    const ws = wsRef.current;
    if (!ws || ws.readyState !== WebSocket.OPEN) return;

    subscribedSymbols.forEach((sym) => {
      ws.send(JSON.stringify({ type: 'subscribe', symbol: sym }));
    });
  }, [subscribedSymbols]);

  // return all three pieces
  return { prices, previousPrices, history };
}
