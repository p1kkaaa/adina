import { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/axiosConfig';
import { signUp, signIn } from '../services/authServices';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const res = await api.get('users/me/');
          setUser(res.data);
        } catch {
          logout();
        }
      }
      setIsLoading(false);
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const { access, refresh, user } = await signIn({ email, password });
      localStorage.setItem('access_token', access);
      localStorage.setItem('refresh_token', refresh);
      setUser(user);
      return user;
    } catch (err) {
      setError(err.response?.data?.detail || 'Ошибка входа');
      throw err;
    }
  };

  const register = async (userData) => {
    try {
      const data = await signUp(userData);
      return data;
    } catch (err) {
      setError(JSON.stringify(err.response?.data));
      throw err;
    }
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
