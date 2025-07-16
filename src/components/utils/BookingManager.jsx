// const getStorageKey = (email) => `favorites_${email}`;

// // Obtener favoritos por usuario
// export const getFavorites = (userEmail) => {
//   const stored = localStorage.getItem(getStorageKey(userEmail));
//   return stored ? JSON.parse(stored) : [];
// };

// export const addFavorite = (propertyId, userEmail) => {
//   const favorites = getFavorites(userEmail);
//   if (!favorites.includes(propertyId)) {
//     favorites.push(propertyId);
//     localStorage.setItem(getStorageKey(userEmail), JSON.stringify(favorites));
//   }
// };

// export const removeFavorite = (propertyId, userEmail) => {
//   const favorites = getFavorites(userEmail);
//   const updated = favorites.filter(id => id !== propertyId);
//   localStorage.setItem(getStorageKey(userEmail), JSON.stringify(updated));
// };

// export const isFavorite = (propertyId, userEmail) => {
//   const favorites = getFavorites(userEmail);
//   return favorites.includes(propertyId);
// };