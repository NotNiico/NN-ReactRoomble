const API_BASE_URL = "http://localhost:8787/roombleapi";

export const fetchProperties = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/property`);
    if (!response.ok) {
      throw new Error(`Error al obtener propiedades: ${response.statusText}`);
    }
    const data = await response.json();
    return data.property || [];
  } catch (error) {
    console.error("fetchProperties error:", error);
    return [];
  }
};

export const fetchPropertyById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/property/${id}`);
    if (!response.ok) {
      throw new Error(`Error al obtener propiedad: ${response.statusText}`);
    }
    const data = await response.json();
    // Suponiendo que la API devuelve { success: true, property: {...} }
    return data.property || null;
  } catch (error) {
    console.error("fetchPropertyById error:", error);
    return null;
  }
};

// Si querés, podés agregar funciones para crear, actualizar, eliminar propiedades
// export const createProperty = async (propertyData) => { ... }
// export const updateProperty = async (id, updatedData) => { ... }
// export const deleteProperty = async (id) => { ... }
