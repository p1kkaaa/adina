// src/services/authService.js
import api from './axiosConfig';

// Регистрация
export const signUp = async (userData) => {
  // POST http://127.0.0.1:8000/api/app/register/
  const res = await api.post('app/register/', userData);
  return res.data;  // здесь окажутся access, refresh и/или данные пользователя
};

// Логин
export const signIn = async ({ email, password }) => {
  // POST http://127.0.0.1:8000/api/app/login/
  const res = await api.post('app/login/', { email, password });
  return res.data;  // { access, refresh, user }
};
