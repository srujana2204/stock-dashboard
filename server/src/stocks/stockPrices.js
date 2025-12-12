import { SUPPORTED_STOCKS } from '../config.js';

const prices = {};
SUPPORTED_STOCKS.forEach((sym) => {
  prices[sym] = 100 + Math.random() * 50;
});

let intervalId = null;

/**
 * Start global generator.
 * onUpdate(symbol, price) is called for each symbol every second.
 */
export function startPriceGenerator(onUpdate) {
  if (intervalId) return;

  intervalId = setInterval(() => {
    SUPPORTED_STOCKS.forEach((sym) => {
      const change = (Math.random() - 0.5) * 2; // -1 to +1
      prices[sym] = Math.max(1, prices[sym] + change);
      const rounded = Number(prices[sym].toFixed(2));
      onUpdate(sym, rounded);
    });
  }, 1000);
}
