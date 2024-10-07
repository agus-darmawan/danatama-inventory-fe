import axios from '@/lib/axios';
import { deleteCookie, setCookie } from '@/lib/cookie';

import { useStore } from '@/store';

import { IForgotPassword, ILogin, IRegister } from '@/types/auth';

export const useAuth = () => {
  const fetchUser = async () => {
    const isServer = typeof window === 'undefined';

    try {
      const { data } = await axios.get('/auth/user');
      useStore.setState({ auth: data.user });
      return data;
    } catch {
      useStore.setState({ auth: null });
      if (!isServer) {
        deleteCookie('auth.__token');
      }
    }

    return null;
  };

  const login = async (params: ILogin) => {
    try {
      const { data } = await axios.post('/auth/login', params);
      setCookie('auth.__token', data.data);
      console.log('Login response:', data);
      await fetchUser();
    } catch (e) {
      throw e;
    }
  };

  const register = async (params: IRegister) => {
    try {
      await axios.post('/auth/register', params);
      await login({ emailOrUsername: params.email, password: params.password });
    } catch (e) {
      throw e;
    }
  };

  const forgotPassword = async (params: IForgotPassword) => {
    try {
      await axios.post('/auth/password/forgot', params);
    } catch (e) {
      throw e;
    }
  };

  const logout = async () => {
    try {
      await axios.post('/auth/logout');
      deleteCookie('auth.__token');
    } catch {}
  };

  return {
    loggedIn: !!useStore.getState().auth,
    fetchUser,
    login,
    register,
    forgotPassword,
    logout,
  };
};
