import { useState } from 'react';
import './LoginRegistr.css';
import { FaLock, FaEnvelope } from 'react-icons/fa';
import { useAuth } from '../../../context/AuthContext';

import { useNavigate } from 'react-router-dom';
import Header from '../../header/Header';

const LoginRegistr = () => {
    const [action, setAction] = useState('');
    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    });

    const [registerData, setRegisterData] = useState({
        username: '',
        email: '',
        password: '',
        first_name: '',
        last_name: ''
    });

    const { login, register } = useAuth();
    const navigate = useNavigate();

const handleLogin = async (e) => {
  e.preventDefault();
  try {
    await login(loginData.email, loginData.password); // email вместо username
    navigate('/');
  } catch (error) {
    alert('Ошибка входа: ' + (error?.response?.data?.detail || error.message));
  }
};


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(registerData);
            setAction(''); // переключаемся на login форму
        } catch (error) {
            alert('Ошибка регистрации: ' + (error?.response?.data?.detail || error.message));
        }
    };

    return (
        <>
        <Header />
        <div className="bodys">
            <div className={`wrapper${action}`}>
                {/* Login form */}
                <div className="form-box login">
                    <form onSubmit={handleLogin}>
                        <h1>Login</h1>
                        

                        <div className="input-box">
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={loginData.email}
                                onChange={(e) =>
                                    setLoginData({ ...loginData, email: e.target.value })
                                }
                            />
                            <FaEnvelope className="icon" />
                        </div>

                        <div className="input-box">
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={loginData.password}
                                onChange={(e) =>
                                    setLoginData({ ...loginData, password: e.target.value })
                                }
                            />
                            <FaLock className="icon" />
                        </div>

                        <div className="remember-forgot">
                            <label>
                                <input type="checkbox" />
                                Remember me
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

                {/* Register form */}
                <div className="form-box register">
                    <form onSubmit={handleRegister}>
                        <h1>Registration</h1>

                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="First Name"
                                required
                                value={registerData.first_name}
                                onChange={(e) =>
                                    setRegisterData({ ...registerData, first_name: e.target.value })
                                }
                            />
                        </div>

                        <div className="input-box">
                            <input
                                type="text"
                                placeholder="Last Name"
                                required
                                value={registerData.last_name}
                                onChange={(e) =>
                                    setRegisterData({ ...registerData, last_name: e.target.value })
                                }
                            />
                        </div>

                       

                        <div className="input-box">
                            <input
                                type="email"
                                placeholder="Email"
                                required
                                value={registerData.email}
                                onChange={(e) =>
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
                                onChange={(e) =>
                                    setRegisterData({ ...registerData, password: e.target.value })
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
    );
};

export default LoginRegistr;
