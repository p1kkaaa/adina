/* src/components/auth/LoginRegistr.jsx */
import { useState } from 'react'
import { FaLock, FaEnvelope } from 'react-icons/fa'
import { useAuth } from '../../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Header from '../../header/Header'
import './LoginRegistr.css'

const LoginRegistr = () => {
  const [action, setAction] = useState('')
  // <-- возвращаем username
  const [loginData, setLoginData] = useState({ username: '', password: '' })
  const [registerData, setRegisterData] = useState({
    username: '', email: '', password: '', password2: ''
  })
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login(loginData)                 // передаём { username, password }
      navigate('/')
    } catch (error) {
      // покажем тело ответа, если нужно
      console.error('Login failed response:', error.response?.data || error)
      alert('Ошибка входа: ' + error.message)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    try {
      await register(registerData)
      alert('Регистрация успешна! Теперь войдите в систему.')
      setAction('')
    } catch (errors) {
      const entries = typeof errors === 'object'
        ? Object.entries(errors)
        : [['error', String(errors)]]
      const msg = entries.map(([field, val]) => {
        const text = Array.isArray(val) ? val.join(', ') : String(val)
        return `${field}: ${text}`
      }).join('\n')
      alert('Ошибка регистрации:\n' + msg)
      console.error('Registration errors:', errors)
    }
  }

  return (
    <>
      <Header />
      <div className="bodys">
        <div className={`wrapper${action}`}>
          {/* Login Form */}
          <div className="form-box login">
            <form onSubmit={handleLogin}>
              <h1>Login</h1>
              <div className="input-box">
                <input
                  name="username"
                  type="text"
                  placeholder="Username"
                  required
                  value={loginData.username}
                  onChange={e =>
                    setLoginData({ ...loginData, username: e.target.value })
                  }
                />
                <FaEnvelope className="icon" />
              </div>
              <div className="input-box">
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                  value={loginData.password}
                  onChange={e =>
                    setLoginData({ ...loginData, password: e.target.value })
                  }
                />
                <FaLock className="icon" />
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#">Forgot password?</a>
              </div>
              <button type="submit">Login</button>
              <div className="registr-link">
                <p>
                  Don't have an account?{' '}
                  <a href="#" onClick={() => setAction(' active')}>
                    Register
                  </a>
                </p>
              </div>
            </form>
          </div>

          {/* Register Form */}
          <div className="form-box register">
            <form onSubmit={handleRegister}>
              <h1>Registration</h1>
              <div className="input-box">
                <input
                  type="text"
                  placeholder="Username"
                  required
                  value={registerData.username}
                  onChange={e =>
                    setRegisterData({ ...registerData, username: e.target.value })
                  }
                />
              </div>
              <div className="input-box">
                <input
                  type="email"
                  placeholder="Email"
                  required
                  value={registerData.email}
                  onChange={e =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                />
                <FaEnvelope className="icon" />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Password"
                  required
                  value={registerData.password}
                  onChange={e =>
                    setRegisterData({ ...registerData, password: e.target.value })
                  }
                />
                <FaLock className="icon" />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Repeat password"
                  required
                  value={registerData.password2}
                  onChange={e =>
                    setRegisterData({ ...registerData, password2: e.target.value })
                  }
                />
                <FaLock className="icon" />
              </div>
              <div className="remember-forgot">
                <label>
                  <input type="checkbox" /> I agree to the terms & conditions
                </label>
              </div>
              <button type="submit">Register</button>
              <div className="registr-link">
                <p>
                  Already have an account?{' '}
                  <a href="#" onClick={() => setAction('')}>
                    Login
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginRegistr
