import Axios from 'axios';

import { getCookie } from '@/lib/cookie';
import { toast } from '@/hooks/use-toast';

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

axios.interceptors.response.use(
  (response) => {
    if (response.data?.success) {
      toast({
        variant: 'success',
        title: response.data.message || 'Success',
      });
    }
    return response;
  },
  (error) => {
    const responseData = error?.response?.data;

    if (error?.response?.status === 401) {
      toast({
        variant: 'error',
        title: 'Unauthorized access. Please log in again.',
      });
    } else if (responseData?.errors) {
      const errors = responseData.errors;
      if (Array.isArray(errors) && errors.length) {
        toast({
          variant: 'error',
          title: errors[0].message || 'An error occurred.',
        });
      }
    } else if (responseData?.message) {
      toast({
        variant: 'error',
        title: responseData.message,
      });
    } else {
      toast({
        variant: 'error',
        title: 'An unexpected error occurred.',
      });
    }

    return Promise.reject(error);
  },
);

export default axios;
