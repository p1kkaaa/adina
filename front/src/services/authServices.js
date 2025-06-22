// src/services/authServices.js
import api from './axiosConfig'

/**
 * Логин пользователя по username и password.
 * @param {{username: string, password: string}} credentials
 * @returns {Promise<{access: string, refresh: string, user: object}>}
 */
export const signIn = async ({ username, password }) => {
  const payload = { username, password }
  const { data } = await api.post('app/login/', payload)
  return data
}

// регистрация остаётся как было
export const signUp = async (registerData) => {
  const payload = {
    username:  registerData.username,
    email:     registerData.email,
    password:  registerData.password,
    password2: registerData.password2,
  }
  const { data } = await api.post('app/register/', payload)
  return data
}
