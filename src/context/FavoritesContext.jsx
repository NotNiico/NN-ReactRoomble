import React, { createContext, useContext, useEffect, useState } from "react";
import {
  fetchFavoritesByUser,
  addFavorite as addFavAPI,
  deleteFavoriteById as deleteFavAPI
} from "../components/utils/FavoriteManager.jsx";
import { useAuth } from "./AuthContext";

const FavoritesContext = createContext();


export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (user?.email) {
        const favs = await fetchFavoritesByUser(user.email);
        setFavorites(favs || []);
      }
    };
    load();
  }, [user]);

  const isFavorite = (propertyId) =>
    favorites.some(fav => fav.favoriteData?.propertyId === propertyId);

  const addFavorite = async (property) => {
    const newFav = await addFavAPI(property, user.email);
    setFavorites((prev) => [...prev, newFav]);
  };

  const removeFavorite = async (propertyId) => {
    const toDelete = favorites.find(fav => fav.favoriteData?.propertyId === propertyId);
    if (toDelete) {
      await deleteFavAPI(toDelete.id);
      setFavorites((prev) => prev.filter(fav => fav.id !== toDelete.id));
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
