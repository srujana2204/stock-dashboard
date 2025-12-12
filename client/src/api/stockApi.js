import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

export const getSupportedStocks = async () => {
  const res = await axios.get(`${BASE_URL}/stocks/supported`);
  return res.data.symbols;
};

export const getWatchlist = async (token) => {
  const res = await axios.get(`${BASE_URL}/stocks/watchlist`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.symbols;
};

export const addToWatchlist = async (token, symbol) => {
  await axios.post(
    `${BASE_URL}/stocks/watchlist`,
    { symbol },
    { headers: { Authorization: `Bearer ${token}` } },
  );
};

export const removeFromWatchlist = async (token, symbol) => {
  await axios.delete(`${BASE_URL}/stocks/watchlist/${symbol}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};