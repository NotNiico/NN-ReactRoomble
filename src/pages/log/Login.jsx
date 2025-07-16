import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const isLoggedIn = login(username, password);
        if (isLoggedIn) {
            navigate('/');
        } else {
            alert('Credenciales inválidas, intente nuevamente');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h2>Bienvenido a Roomble</h2>
                    <p>Encuentra tu lugar favorito en cualquier lugar</p>
                </div>
                
                <form onSubmit={handleLogin} className="login-form">
                    <div className="form-group">
                        <label htmlFor="username">Usuario</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    
                    <button type="submit" className="btn btn-primary login-btn">LOGIN</button>
                    
                    <div className="login-footer">
                        <a href="/forgot-password" className="forgot-password">Forgot Password?</a>
                        <p className="signup-text">Don't have an account? <a href="/signup">Sign Up</a></p>
                        
                        {/* <div className="divider">
                            <span>OR</span>
                        </div> */}
{/*                         
                        <div className="social-login">
                            <button type="button" className="btn btn-outline-secondary social-btn">
                                <i className="fab fa-google"></i> Continue with Google
                            </button>
                            <button type="button" className="btn btn-outline-secondary social-btn">
                                <i className="fab fa-facebook-f"></i> Continue with Facebook
                            </button>
                        </div> */}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;