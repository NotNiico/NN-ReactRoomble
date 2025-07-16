import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, User, Star, Heart, MapPin, Calendar, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import './Home.css';
import PropertyCard from '../components/propertyCards/PropertyCard.jsx';
import PropertyDetail from '../components/propertyDetails/PropertyDetail.jsx';
import properties from "../data/properties.json";
import Header from './Header.jsx';

// Componente principal Home
const Home = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (user?.isAdmin) {
      setIsAdmin(true);
    }
  }, [user]);

  const categories = [
    { name: "Apartamentos", icon: "🏢" },
    { name: "Casas", icon: "🏠" },
    { name: "Villas", icon: "🏖️" },
    { name: "Cabañas", icon: "🏘️" },
    { name: "Únicos", icon: "✨" },
    { name: "Lujo", icon: "💎" }
  ];

  const handlePropertyClick = (property) => {
    navigate(`/property/${property.id}`);
  };

  return (
    <div className="home">
      <Header />
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Encuentra tu próximo destino</h1>
          <p className="hero-subtitle">Descubre lugares únicos donde quedarte y experiencias increíbles</p>
        </div>
      </section>

      {/* Categorías */}
      <section className="categories">
        <div className="container">
          <div className="categories-grid">
            {categories.map((category, index) => (
              <div key={index} className="category-item">
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Propiedades destacadas */}
      <section className="properties">
        <h2 className="section-title">Propiedades destacadas</h2>
        <div className="container">
          <div className="properties-grid">
            {properties.map(property => (
              <PropertyCard
                key={property.id}
                property={{
                  ...property,
                  image: property.mainImage,
                  price: property.pricePerNight,
                }}
                onPropertyClick={handlePropertyClick}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4 className="footer-title">Roomble</h4>
              <p className="footer-text">Tu hogar lejos de casa</p>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Soporte</h4>
              <a href="#" className="footer-link">Centro de ayuda</a>
              <a href="#" className="footer-link">Contacto</a>
            </div>
            <div className="footer-section">
              <h4 className="footer-title">Anfitrión</h4>
              <a href="#" className="footer-link">Recursos</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;