import React, { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({
        email: '',
        password: ''
    });

    const [loginError, setLoginError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoginError(''); 
        setIsLoading(true);

        try {
            const success = await login(form.email, form.password);

            if (success) {
                navigate('/');
            } else {
                setLoginError("Correo o contraseña incorrectos");
            }
        } catch (error) {
            setLoginError("Error al iniciar sesión. Intenta nuevamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));

        if (loginError) {
            setLoginError('');
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
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name='email'
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            className="form-control"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            name='password'
                            type="password"
                            value={form.password}
                            onChange={handleChange}
                            required
                            className={`form-control ${loginError ? 'error' : ''}`}
                        />
                        {loginError && (
                            <div className="error-message">
                                {loginError}
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary login-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Iniciando sesión...' : 'LOGIN'}
                    </button>

                    <div className="login-footer">
                        <a href="/forgot-password" className="forgot-password">Olvidaste la contraseña?</a>
                        <p className="signup-text">No tienes cuenta? <a href="/signup">Registrate</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;