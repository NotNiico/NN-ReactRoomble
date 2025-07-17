
export const createBooking = async (userEmail, bookingData) => {
  const response = await fetch("http://localhost:8787/roombleapi/booking", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      user: userEmail,
      bookingData,
      price: bookingData.totalPrice,
    }),
  });

  const result = await response.json();

  if (!response.ok || !result.success) {
    throw new Error(result.message || "Error al guardar la reserva");
  }

  return result;
};

export const fetchBookingsByUser = async (email) => {
  const response = await fetch(`http://localhost:8787/roombleapi/bookings/user/${encodeURIComponent(email)}`);
  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Error al obtener las reservas");
  }

  return data.bookings.map(b => ({
    id: b.id,
    user: b.user,
    dateTime: b.dateTime,
    price: b.price,
    ...b.bookingData,
  }));
};

export const cancelBookingById = async (bookingId) => {
  const response = await fetch(`http://localhost:8787/roombleapi/booking/${bookingId}`, {
    method: 'DELETE',
  });

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error(data.message || "Error al cancelar la reserva");
  }

  return true;
};
