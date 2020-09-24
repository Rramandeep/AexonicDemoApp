import axios from 'axios';
import config, { BASE_URL } from './config';

export const getDemoRouteData = async () => {
  const requestUrl = `${BASE_URL}/82f1d43e-2176-4a34-820e-2e0aa4566b5c`;
  try {
    const data = await axios.get(`${requestUrl}`);
    return data;
  } catch (error) {
    return error.response;
  }
};