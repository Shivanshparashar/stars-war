import { useState, useEffect } from 'react';
import { AuthState } from '../utils/types';
import { login as mockLogin, refreshToken } from '../utils/auth';

export const useAuth = () => {
  const [auth, setAuth] = useState<AuthState>({ isLoggedIn: false, token: null });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuth({ isLoggedIn: true, token });
      // Silent refresh every 5 minutes
      const interval = setInterval(() => {
        const newToken = refreshToken();
        setAuth({ isLoggedIn: true, token: newToken });
        localStorage.setItem('token', newToken);
      }, 5 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, []);

  const login = async (username: string, password: string) => {
    const token = await mockLogin(username, password);
    if (token) {
      setAuth({ isLoggedIn: true, token });
      localStorage.setItem('token', token);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const logout = () => {
    setAuth({ isLoggedIn: false, token: null });
    localStorage.removeItem('token');
  };

  return { auth, login, logout };
};