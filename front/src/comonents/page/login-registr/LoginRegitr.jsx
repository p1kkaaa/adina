import { useState } from 'react';
import './LoginRegistr.css'
import { FaUser, FaLock, FaEnvelope  } from "react-icons/fa";

const LoginRegistr = () => {

    const [action, setAction] = useState('');

    const registerLink = () => {
        setAction(' active')
    }

    const loginLink = () => {
        setAction('')
    }

    return (
        <body className="bodys">
            <div className={`wrapper${action}`}>
                <div className="form-box login">
                    <form action="">
                        <h1>Login</h1>
                        <div className="input-box">
                            <input type="text" placeholder='Username' required />
                            <FaUser className='icon' />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder='Password' required />
                            <FaLock className='icon' />
                        </div>
                        <div className="remember-forgot">
                            <label><input type="chekbox" />
                                Remember me
                            </label>
                            <a href="#">Forgot password?</a>
                        </div>
                        <button type='sumbit'>Login</button>
                        <div className="registr-link">
                            <p>Don't have an accont? <a href="#" onClick={registerLink}>Register</a>
                            </p>
                        </div>
                    </form>
                </div>

                <div className="form-box register">
                    <form action="">
                        <h1>Registration</h1>
                        <div className="input-box">
                            <input type="text" placeholder='Username' required />
                            <FaUser className='icon' />
                        </div>
                        <div className="input-box">
                            <input type="email" placeholder='Email' required />
                            <FaEnvelope  className='icon' />
                        </div>
                        <div className="input-box">
                            <input type="password" placeholder='Password' required />
                            <FaLock className='icon' />
                        </div>
                        <div className="remember-forgot">
                            <label><input type="chekbox" />
                            I agree to the terms & conditions
                            </label>
                        </div>
                        <button type='sumbit'>Register</button>
                        <div className="registr-link">
                            <p>Already have an accont? <a href="#" onClick={loginLink}>Login</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </body>

    );
}

export default LoginRegistr;