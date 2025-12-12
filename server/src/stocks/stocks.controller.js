import { SUPPORTED_STOCKS } from '../config.js';

export const getSupportedStocks = (req, res) => {
  res.json({ symbols: SUPPORTED_STOCKS });
};
