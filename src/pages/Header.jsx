import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, User, Globe, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchFocus, setSearchFocus] = useState('');
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    toast.success('Sesión cerrada correctamente', {
      duration: 2000,
      position: 'top-right',
    });

    setTimeout(() => {
      logout();
      navigate('/');
      setIsMenuOpen(false);
    }, 500);
  };


  return (
    <>
      <header className="bg-white shadow-sm border-bottom position-fixed w-100 top-0 start-0" style={{ zIndex: 1050 }}>
        <div className="container-fluid px-4">
          <div className="d-flex justify-content-between align-items-center" style={{ height: '64px' }}>

            {/* Logo */}
            <div className="d-flex align-items-center" onClick={() => window.location.href = '/'} style={{ cursor: 'pointer' }}>
              <div className="d-flex align-items-center">
                <Home className="text-info" style={{ width: '32px', height: '32px' }} />
                <span className="ms-2 fs-3 fw-bold text-info">Roomble</span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="d-none d-md-block flex-grow-1 mx-4" style={{ maxWidth: '512px' }}>
              <div className="position-relative">
                <div className="d-flex align-items-center bg-white border rounded-pill shadow-sm">
                  <div className="d-flex flex-grow-1">
                    <input
                      type="text"
                      placeholder="¿A dónde quieres ir?"
                      className="form-control border-0 bg-transparent px-3 py-2"
                      style={{ fontSize: '14px' }}
                      onFocus={() => setSearchFocus('active')}
                      onBlur={() => setSearchFocus('')}
                    />
                  </div>

                  <button className="btn btn-info text-white rounded-circle m-2 p-2">
                    <Search style={{ width: '16px', height: '16px' }} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right side - Navigation */}
            <div className="d-flex align-items-center">

              {/* User menu */}
              <div className="position-relative">
                <button
                  className="btn btn-outline-secondary d-flex align-items-center rounded-pill px-3 py-2"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  <Menu className="text-secondary me-2" style={{ width: '16px', height: '16px' }} />
                  <div className="bg-secondary rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                    <User className="text-white" style={{ width: '20px', height: '20px' }} />
                  </div>
                </button>

                {/* Dropdown menu - Versión optimizada con AuthContext */}
                {isMenuOpen && (
                  <div className="position-absolute end-0 mt-2 bg-white rounded shadow border py-2" style={{ width: '224px', zIndex: 1060 }}>
                    {!isAuthenticated ? (
                      <>
                        <a href="/signup" className="dropdown-item px-3 py-2 fw-medium">
                          Registrarse
                        </a>
                        <a href="/login" className="dropdown-item px-3 py-2">
                          Iniciar sesión
                        </a>
                        <hr className="dropdown-divider" />
                      </>
                    ) : null}

                    {/* Opción exclusiva para admin */}
                    {user?.isAdmin && (
                      <>
                        <a
                          href="/admin"
                          className="dropdown-item px-3 py-2 text-danger fw-medium"
                        >
                          Panel Admin
                        </a>
                        <hr className="dropdown-divider" />
                      </>
                    )}

                    {/* Opciones para usuarios autenticados */}
                    {isAuthenticated && (
                      <>
                        <a href="/favorites" className="dropdown-item px-3 py-2">
                          Favoritos
                        </a>
                        <a href="/bookings" className="dropdown-item px-3 py-2">
                          Reservas
                        </a>
                      </>
                    )}

                    <a href="#" className="dropdown-item px-3 py-2">
                      Centro de ayuda
                    </a>

                    {/* Cerrar sesión solo si está autenticado */}
                    {isAuthenticated && (
                      <>
                        <hr className="dropdown-divider" />
                        <button
                          className="dropdown-item px-3 py-2 text-danger"
                          onClick={handleLogout}
                        >
                          Cerrar sesión
                        </button>
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile search bar */}
          <div className="d-md-none pb-3">
            <div className="d-flex align-items-center bg-light rounded-pill p-2">
              <Search className="text-muted ms-3" style={{ width: '20px', height: '20px' }} />
              <input
                type="text"
                placeholder="¿A dónde quieres ir?"
                className="form-control border-0 bg-transparent px-3 py-2"
                style={{ fontSize: '14px' }}
              />
              <button className="btn btn-info text-white rounded-pill px-3 py-2 fw-medium">
                Buscar
              </button>
            </div>
          </div>
        </div>

        {/* Overlay for mobile menu */}
        {isMenuOpen && (
          <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-25"
            style={{ zIndex: 1050 }}
            onClick={() => setIsMenuOpen(false)}
          ></div>
        )}
      </header>

      {/* Spacer para compensar el header fijo */}
      <div style={{ height: '64px' }}></div>
    </>
  );
};

export default Header;