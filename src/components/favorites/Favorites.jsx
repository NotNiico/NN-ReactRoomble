import React, { useEffect, useState } from 'react';
import { Calendar, Users, MapPin, Heart } from 'lucide-react';
import Header from '../../pages/Header';
import './Favorites.css';
import properties from '../../data/properties.json';
import { fetchFavoritesByUser, deleteFavoriteById } from '../utils/FavoriteManager.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { useFavorites } from '../../context/FavoritesContext.jsx';


const FavoritesPage = ({ property }) => {
  const { user } = useAuth();
  const [favProperties, setFavProperties] = useState([]);
  const navigate = useNavigate();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
console.log('Fetching favorites for:', user.email);


  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const favs = await fetchFavoritesByUser(user.email);
        console.log("Favoritos:", favs); // ✅ chequear aquí
        setFavProperties(favs || []);
      } catch (err) {
        console.error(err);
        setFavProperties([]);
      }
    };

    if (user?.email) {
      loadFavorites();
    }
  }, [user]);

  // const loadFavorites = async () => {
  //   try {
  //     const favs = await fetchFavoritesByUser(user.email);
  //     setFavProperties(favs || []);
  //   } catch (err) {
  //     console.error(err);
  //     setFavProperties([]);
  //   }
  // };


  const handleRemoveFavorite = async (id) => {
    const success = await deleteFavoriteById(id);
    if (success) {
      alert('Favorito eliminado correctamente.');
      loadFavorites();
    } else {
      alert('Error al eliminar favorito.');
    }
  };
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mis Favoritos</h1>
              <p className="text-gray-600 mt-1">Gestiona tus favoritos</p>
            </div>
            <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-blue-800 font-medium">{favProperties.length} favoritos</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {favProperties.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-sm p-12 max-w-md mx-auto">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No tienes favoritos aún</h3>
              <p className="text-gray-600 mb-6">Puedes guardar propiedades que te gusten para un futuro aquí</p>
              <button
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => navigate('/')}
              >
                Explorar propiedades
              </button>
            </div>
          </div>

        ) : (

          <div className="space-y-6">
            {favProperties.map(({ id, favoriteData }) => {
              const property = favoriteData;

              if (!property) return null;

              return (
                <div key={id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
                  <div className="md:flex">
                    <div
                      className="modern-card md:w-80 h-48 md:h-auto"
                      onClick={() => navigate(`/property/${property.propertyId}`)}
                      style={{ cursor: 'pointer' }}
                    >
                      <img
                        src={property.mainImage}
                        alt={property.title}
                        className="modern-card-image w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-2">{property.title}</h3>
                          <div className="flex items-center text-gray-600 mb-2">
                            <MapPin className="w-4 h-4 mr-2" />
                            <span className="text-sm">{property.location}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm">Favorito #{property.propertyId}</span>
                            <button
                              className="favorite-btn-filled"
                              onClick={() => handleRemoveFavorite(id)}
                              aria-label="Eliminar favorito"
                            >
                              <Heart size={18} fill="#ff385c" color="#ff385c" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default FavoritesPage;