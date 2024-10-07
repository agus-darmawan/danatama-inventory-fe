import Axios from 'axios';
import { getCookie } from '@/lib/cookie';
const isServer = typeof window === 'undefined';

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axios.interceptors.request.use(
  async (config) => {
    let token;
    if (isServer) {
      const { cookies } = await import('next/headers');
      token = getCookie('auth.__token', { cookies });
    } else {
      token = getCookie('auth.__token');
    }

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default axios;
