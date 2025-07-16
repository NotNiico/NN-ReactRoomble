import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart, MapPin } from 'lucide-react';
import './PropertyCard.css';
import '../../pages/Home.css';
import { addFavorite, fetchFavoritesByUser, deleteFavoriteById } from '../utils/FavoriteManager.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { useFavorites } from '../../context/FavoritesContext.jsx';


const PropertyCard = ({ property }) => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();


  const handleClick = () => {
    navigate(`/property/${property.id}`);
  };

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favs = await fetchFavoritesByUser(user.email); // debe devolver array
        setFavorites(favs || []); // asegurarse que sea array
      } catch (err) {
        console.error(err);
        setFavorites([]); // fallback seguro
      }
    };

    if (user?.email) {
      loadFavorites();
    }
  }, [user]);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFavorite(property.id)) {
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
          className={`favorite-btn ${isFavorite(property.id) ? 'active' : ''}`}
          onClick={handleFavoriteClick}
        >
          <Heart
            size={18}
            fill={isFavorite(property.id) ? '#ff385c' : 'transparent'}
            color={isFavorite(property.id) ? '#ff385c' : '#ffffff'}
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