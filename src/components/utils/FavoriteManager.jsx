export const addFavorite = async (property, userEmail) => {
  try {
    const response = await fetch("http://localhost:8787/roombleapi/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: userEmail,
        favoriteData: {
          propertyId: property.id,
          title: property.title,
          mainImage: property.mainImage,
          location: property.location,
          price: property.price,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Error al añadir a favorito");
    }

    return data.favorite;
  } catch (error) {
    console.error("Error al añadir favorito:", error);
    throw error;
  }
};

export async function fetchFavoritesByUser(email) {
  try {
    const response = await fetch(`http://localhost:8787/roombleapi/favorites/user/${encodeURIComponent(email)}`);
    if (!response.ok) {
      throw new Error(`Error al obtener favoritos: ${response.statusText}`);
    }
    const data = await response.json();
    return data.favorites || [];
  } catch (error) {
    console.error('Error en fetchFavoritesByUser:', error);
    return [];
  }
}

export async function deleteFavoriteById(id) {
  try {
    const response = await fetch(`http://localhost:8787/roombleapi/favorites/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error al eliminar favorito: ${response.statusText}`);
    }
    return true;
  } catch (error) {
    console.error('Error en deleteFavoriteById:', error);
    return false;
  }
}
