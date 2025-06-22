// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react'
import api from '../services/axiosConfig'
import { signIn, signUp } from '../services/authServices'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    setUser(null)
  }

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('access_token')
      if (token) {
        try {
          const res = await api.get('app/me/')
          setUser(res.data)
        } catch {
          logout()
        }
      }
      setIsLoading(false)
    }
    loadUser()
  }, [])

  /**
   * @param {{email?: string, password: string}} credentials
   */
  const login = async (credentials) => {
    try {
      // Передаём объект credentials напрямую в signIn
      const { access, refresh, user } = await signIn(credentials)
      localStorage.setItem('access_token', access)
      localStorage.setItem('refresh_token', refresh)
      setUser(user)
      return user
    } catch (err) {
      // если 401 — неверные данные, иначе общий сбой
      const msg =
        err.response?.status === 401
          ? 'Неверное имя пользователя или пароль'
          : err.response?.data?.detail || 'Ошибка входа'
      setError(msg)
      // бросаем Error, чтобы в компоненте .catch получил именно error.message
      throw new Error(msg)
    }
  }

  /**
   * @param {{username: string, email: string, password: string, password2: string}} registerData
   */
  const register = async (registerData) => {
    try {
      return await signUp(registerData)
    } catch (err) {
      const validationErrors = err.response?.data || { detail: err.message }
      setError(validationErrors)
      throw validationErrors
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, isLoading, error, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
