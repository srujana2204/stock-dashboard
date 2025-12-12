import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

export const getSupportedStocks = async () => {
  const res = await axios.get(`${BASE_URL}/stocks/supported`);
  return res.data.symbols;
};
