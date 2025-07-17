import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, MapPin } from 'lucide-react';
import './PropertyCard.css';
import '../../pages/Home.css';
import { useAuth } from '../../context/AuthContext.jsx';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { addFavorite, fetchFavoritesByUser, deleteFavoriteById } from '../../api/FavoriteApi.js';



const PropertyCard = ({ property }) => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();


  const handleClick = () => {
    navigate(`/property/${property.id}`);
  };


  const isFav = isFavorite(property.id);
  console.log('Es favorito:', isFav, 'para propiedad', property.id);


  const handleFavoriteClick = (e) => {
  e.stopPropagation();
  if (isFav) {
    removeFavorite(property.id);
  } else {
    addFavorite(property);
  }
};


  return (
    <div className="modern-card" >
      <div className="modern-card-image-container">
        <img src={property.image} alt={property.title} className="modern-card-image" onClick={handleClick} />
        <button
  className={`favorite-btn ${isFav ? 'active' : ''}`}
  onClick={handleFavoriteClick}
>
  <Heart
    size={18}
    fill={isFav ? '#ff385c' : 'transparent'}
    color={isFav ? '#ff385c' : '#ffffff'}
  />
</button>
      </div>
      <div className="modern-card-content" onClick={handleClick}>
        <div className="modern-card-header">
          <h3 className="modern-card-title">{property.title}</h3>
          <div className="modern-rating">
            <Star size={14} fill="#ffd700" color="#ffd700" />
            <span className="modern-rating-value">{property.rating}</span>
          </div>
        </div>

        <p className="modern-card-location">
          <MapPin size={14} color="#717171" />
          <span>{property.location}</span>
        </p>

        <div className="modern-card-footer">
          <span className="modern-price">€{property.price}</span>
          <span className="modern-night"> / noche</span>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;