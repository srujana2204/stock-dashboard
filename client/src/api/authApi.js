import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

export const login = async (email) => {
  const res = await axios.post(`${BASE_URL}/auth/login`, { email });
  return res.data; // { token, user }
};
