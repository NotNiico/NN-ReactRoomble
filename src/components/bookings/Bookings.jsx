import React, { useEffect, useState } from 'react';
import { Calendar, Users, MapPin, CreditCard, Clock } from 'lucide-react';
import Header from '../../pages/Header';
import './Bookings.css';
import { useAuth } from '../../context/AuthContext';

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const { user } = useAuth();

    useEffect(() => {
        if (!user?.email) return;

        fetch(`http://localhost:8787/roombleapi/bookings/user/${encodeURIComponent(user.email)}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    const formattedBookings = data.bookings.map(b => ({
                        id: b.id,
                        user: b.user,
                        dateTime: b.dateTime,
                        price: b.price,
                        ...b.bookingData
                    }));
                    setBookings(formattedBookings);
                } else {
                    alert("Error al cargar las reservas");
                }
            })
            .catch(error => {
                console.error("Error al cargar reservas:", error);
            });
    }, [user]);


    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmada': return 'bg-green-100 text-green-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('es-ES', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    const handleCancellation = async (bookingId) => {
        if (!confirm("¿Estás seguro de que deseas cancelar esta reserva?")) return;

        try {
            const res = await fetch(`http://localhost:8787/roombleapi/booking/${bookingId}`, {
                method: 'DELETE',
            });

            const data = await res.json();

            if (data.success) {
                setBookings(prev => prev.filter(b => b.id !== bookingId));
                alert("Reserva cancelada correctamente.");
            } else {
                alert("Error al cancelar la reserva.");
            }
        } catch (error) {
            console.error("Error al cancelar reserva:", error);
            alert("Error de conexión al cancelar la reserva.");
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <Header />
            <div className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Mis Reservas</h1>
                            <p className="text-gray-600 mt-1">Gestiona todas tus reservaciones</p>
                        </div>
                        <div className="flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-lg">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <span className="text-blue-800 font-medium">{bookings.length} reservas</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 py-8">
                {bookings.length === 0 ? (
                    <div className="text-center py-16">
                        <div className="bg-white rounded-2xl shadow-sm p-12 max-w-md mx-auto">
                            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-900 mb-2">No hay reservas aún</h3>
                            <p className="text-gray-600 mb-6">Cuando hagas tu primera reserva, aparecerá aquí</p>
                            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors" onClick={() => window.location.href = '/'}>
                                Explorar propiedades
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 overflow-hidden">
                                <div className="md:flex">
                                    {/* Imagen */}
                                    <div className="md:w-80 h-48 md:h-auto">
                                        <img
                                            src={booking.propertyImage}
                                            alt={booking.propertyTitle}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Contenido */}
                                    <div className="flex-1 p-6">
                                        <div className="flex justify-between items-start mb-4">
                                            <div>
                                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                    {booking.propertyTitle}
                                                </h3>
                                                <div className="flex items-center text-gray-600 mb-2">
                                                    <MapPin className="w-4 h-4 mr-2" />
                                                    <span className="text-sm">Reserva #{booking.id}</span>
                                                </div>
                                            </div>
                                            <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </div>

                                        {/* Detalles de la reserva */}
                                        <div className="grid md:grid-cols-3 gap-4 mb-6">
                                            <div className="flex items-center space-x-3">
                                                <div className="bg-blue-50 p-2 rounded-lg">
                                                    <Calendar className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">Check-in</p>
                                                    <p className="text-sm text-gray-600">{formatDate(booking.checkIn)}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <div className="bg-green-50 p-2 rounded-lg">
                                                    <Clock className="w-5 h-5 text-green-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">Check-out</p>
                                                    <p className="text-sm text-gray-600">{formatDate(booking.checkOut)}</p>
                                                </div>
                                            </div>

                                            <div className="flex items-center space-x-3">
                                                <div className="bg-purple-50 p-2 rounded-lg">
                                                    <Users className="w-5 h-5 text-purple-600" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-gray-900">Huéspedes</p>
                                                    <p className="text-sm text-gray-600">{booking.guests} personas</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Footer con precio y acciones */}
                                        <div className="d-flex justify-content-between align-items-center pt-4 border-top" style={{ borderColor: '#f3f4f6' }}>
                                            <div className="d-flex align-items-center">
                                                <CreditCard className="me-2 text-muted" style={{ width: '20px', height: '20px' }} />
                                                <span className="fs-3 fw-bold text-dark me-2">€{booking.totalPrice}</span>
                                                <span className="text-muted">total</span>
                                            </div>

                                            <div className="d-flex gap-3">
                                                {booking.status === 'confirmada' && (
                                                    <button
                                                        className="btn btn-outline-danger rounded-3 px-4 py-2"
                                                        onClick={() => handleCancellation(booking.id)}
                                                    >
                                                        Cancelar
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingsPage;