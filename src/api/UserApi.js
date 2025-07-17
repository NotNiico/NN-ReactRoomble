export async function loginUser(email, password) {
  const response = await fetch("http://localhost:8787/roombleapi/user/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error en login");
  return data.user;
}

export async function registerUser({ firstName, lastName, email, password }) {
  const response = await fetch("http://localhost:8787/roombleapi/user/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: `${firstName} ${lastName}`,
      email,
      password,
      phoneNumber: "",
    }),
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Error en registro");
  return data.result;
}

export async function fetchUsers() {
  const response = await fetch("http://localhost:8787/roombleapi/user");
  if (!response.ok) throw new Error("Error al obtener usuarios");
  return response.json();
}

export const updateUser = async (id, userData) => {
  const response = await fetch(`http://localhost:8787/roombleapi/user/edit/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  return response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`http://localhost:8787/roombleapi/user/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

