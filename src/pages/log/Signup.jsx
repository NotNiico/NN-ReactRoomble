import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';
import './Signup.css'; 

const Signup = () => {
    const { register } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        userName: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [errors, setErrors] = useState({});
    const [registerStatus, setRegisterStatus] = useState({ type: '', message: '' });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        
        // Limpiar error específico cuando el usuario empiece a escribir
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }

        // Limpiar mensaje de estado cuando el usuario empiece a escribir
        if (registerStatus.message) {
            setRegisterStatus({ type: '', message: '' });
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName.trim()) {
            newErrors.firstName = 'El nombre es requerido';
        }
        if (!formData.lastName.trim()) {
            newErrors.lastName = 'El apellido es requerido';
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = 'El email es requerido';
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Ingresa un email válido';
        }
        if (!formData.password) {
            newErrors.password = 'La contraseña es requerida';
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
        }
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = 'Confirma tu contraseña';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Las contraseñas no coinciden';
        }

        return newErrors;
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        
        const formErrors = validateForm();
        
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }

        setIsLoading(true);
        setRegisterStatus({ type: '', message: '' });

        try {
            const isRegistered = await register(formData);
            
            if (isRegistered) {
                setRegisterStatus({ 
                    type: 'success', 
                    message: '¡Registro exitoso! Bienvenido a Roomble' 
                });
                
                // Redirigir después de un breve delay para mostrar el mensaje
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                setRegisterStatus({ 
                    type: 'error', 
                    message: 'Error en el registro, intente nuevamente' 
                });
            }
        } catch (error) {
            setRegisterStatus({ 
                type: 'error', 
                message: 'Error al procesar el registro. Intenta nuevamente.' 
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-card">
                <div className="signup-header">
                    <h2>Únete a Roomble</h2>
                    <p>Crea tu cuenta y comienza a explorar</p>
                </div>
                
                <form onSubmit={handleSignup} className="signup-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label htmlFor="firstName">Nombre</label>
                            <input
                                id="firstName"
                                name="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={handleInputChange}
                                className={`form-control ${errors.firstName ? 'error' : ''}`}
                            />
                            {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                        </div>
                        
                        <div className="form-group">
                            <label htmlFor="lastName">Apellido</label>
                            <input
                                id="lastName"
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={handleInputChange}
                                className={`form-control ${errors.lastName ? 'error' : ''}`}
                            />
                            {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                        </div>
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`form-control ${errors.email ? 'error' : ''}`}
                        />
                        {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className={`form-control ${errors.password ? 'error' : ''}`}
                        />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirmar Contraseña</label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={handleInputChange}
                            className={`form-control ${errors.confirmPassword ? 'error' : ''}`}
                        />
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                    </div>

                    {/* Mensaje de estado del registro */}
                    {registerStatus.message && (
                        <div className={`status-message ${registerStatus.type}`}>
                            {registerStatus.message}
                        </div>
                    )}
                    
                    <button 
                        type="submit" 
                        className="btn btn-primary signup-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creando cuenta...' : 'CREAR CUENTA'}
                    </button>
                    
                    <div className="signup-footer">
                        <p className="login-text">¿Ya tienes una cuenta? <a href="/login">Iniciar Sesión</a></p>
                        
                        <div className="terms">
                            <p>Al crear una cuenta, aceptas nuestros <a href="/terms">Términos de Servicio</a> y <a href="/privacy">Política de Privacidad</a></p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;