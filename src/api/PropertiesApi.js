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
    return data.property || null;
  } catch (error) {
    console.error("fetchPropertyById error:", error);
    return null;
  }
};

export const createProperty = async (propertyData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/property`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propertyData),
    });

    if (!response.ok) {
      throw new Error(`Error al crear propiedad: ${response.statusText}`);
    }

    const data = await response.json();
    return data.property;
  } catch (error) {
    console.error("createProperty error:", error);
    return null;
  }
};

export const updateProperty = async (id, updatedData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/property/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`Error al actualizar propiedad: ${response.statusText}`);
    }

    const data = await response.json();
    return data.property;
  } catch (error) {
    console.error("updateProperty error:", error);
    return null;
  }
};

export const deleteProperty = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/property/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`Error al eliminar propiedad: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("deleteProperty error:", error);
    return null;
  }
};

