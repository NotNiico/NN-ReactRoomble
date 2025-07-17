import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { Calendar, Users, MapPin, CreditCard, Clock, X, AlertTriangle } from 'lucide-react';
import Header from '../../pages/Header';
import './Bookings.css';
import { useAuth } from '../../context/AuthContext';
import { fetchBookingsByUser, cancelBookingById } from '../../api/BookingApi';

// Componente Modal de Confirmación
const ConfirmationModal = ({ isOpen, onClose, onConfirm, bookingData }) => {
    if (!isOpen) return null;

    return (
        <div className="modal d-block" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content shadow-lg">
                    <div className="modal-header border-0 pb-0">
                        <div className="d-flex align-items-center">
                            <div className="bg-danger bg-opacity-10 p-2 rounded me-3">
                                <AlertTriangle className="text-danger" size={24} />
                            </div>
                            <h5 className="modal-title fw-bold">Cancelar Reserva</h5>
                        </div>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>

                    <div className="modal-body">
                        <p className="text-muted mb-4">
                            ¿Estás seguro de que deseas cancelar esta reserva?
                        </p>
                        
                        {bookingData && (
                            <div className="bg-light rounded p-3 mb-4">
                                <div className="row mb-2">
                                    <div className="col-4">
                                        <small className="fw-medium text-secondary">Propiedad:</small>
                                    </div>
                                    <div className="col-8">
                                        <small className="text-dark">{bookingData.propertyTitle}</small>
                                    </div>
                                </div>
                                <div className="row mb-2">
                                    <div className="col-4">
                                        <small className="fw-medium text-secondary">Reserva:</small>
                                    </div>
                                    <div className="col-8">
                                        <small className="text-dark">#{bookingData.id}</small>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <small className="fw-medium text-secondary">Total:</small>
                                    </div>
                                    <div className="col-8">
                                        <small className="text-dark">€{bookingData.totalPrice}</small>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div className="alert alert-danger alert-dismissible fade show border-0 py-2" role="alert">
                            <small className="text-danger">
                                <strong>Atención:</strong> Esta acción no se puede deshacer.
                            </small>
                        </div>
                    </div>

                    <div className="modal-footer border-0 pt-0">
                        <button
                            type="button"
                            className="btn btn-secondary me-2"
                            onClick={onClose}
                        >
                            Mantener Reserva
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={onConfirm}
                        >
                            Cancelar Reserva
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BookingsPage = () => {
    const [bookings, setBookings] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        const loadBookings = async () => {
            if (!user?.email) return;

            try {
                const userBookings = await fetchBookingsByUser(user.email);
                setBookings(userBookings);
            } catch (error) {
                console.error("Error al cargar reservas:", error);
                alert("Error al cargar las reservas");
            }
        };

        loadBookings();
    }, [user]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'confirmada': return 'bg-success bg-opacity-10 text-success';
            default: return 'bg-secondary bg-opacity-10 text-secondary';
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

    const handleCancellationClick = (booking) => {
        setSelectedBooking(booking);
        setShowModal(true);
    };

    const handleConfirmCancellation = async () => {
        if (!selectedBooking) return;

        try {
            await cancelBookingById(selectedBooking.id);
            setBookings(prev => prev.filter(b => b.id !== selectedBooking.id));
            toast.success("Reserva cancelada correctamente.");
            setShowModal(false);
            setSelectedBooking(null);
        } catch (error) {
            console.error("Error al cancelar reserva:", error);
            toast.error("No se pudo cancelar la reserva");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedBooking(null);
    };

    return (
        <div className="min-vh-100 bg-light">
            {/* Header */}
            <Header />
            
            {/* Page Header */}
            <div className="bg-white shadow-sm border-bottom">
                <div className="container-xxl py-4">
                    <div className="row align-items-center">
                        <div className="col">
                            <h1 className="display-6 fw-bold text-dark mb-1">Mis Reservas</h1>
                            <p className="text-muted mb-0">Gestiona todas tus reservaciones</p>
                        </div>
                        <div className="col-auto">
                            <div className="d-flex align-items-center bg-primary bg-opacity-10 px-3 py-2 rounded">
                                <Calendar className="text-primary me-2" size={20} />
                                <span className="text-primary fw-medium">{bookings.length} reservas</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="container-xxl py-4">
                {bookings.length === 0 ? (
                    <div className="text-center py-5">
                        <div className="bg-white rounded-3 shadow-sm p-5 mx-auto" style={{ maxWidth: '400px' }}>
                            <Calendar className="text-muted mb-3" size={64} />
                            <h3 className="h4 fw-semibold text-dark mb-2">No hay reservas aún</h3>
                            <p className="text-muted mb-4">Cuando hagas tu primera reserva, aparecerá aquí</p>
                            <button 
                                className="btn btn-primary px-4 py-2"
                                onClick={() => window.location.href = '/'}
                            >
                                Explorar propiedades
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="row g-4">
                        {bookings.map((booking) => (
                            <div key={booking.id} className="col-12">
                                <div className="card h-100 border-0 shadow-sm">
                                    <div className="row g-0">
                                        {/* Imagen */}
                                        <div className="col-md-4">
                                            <img
                                                src={booking.propertyImage}
                                                alt={booking.propertyTitle}
                                                className="img-fluid rounded-start h-100 object-fit-cover"
                                                style={{ minHeight: '200px' }}
                                            />
                                        </div>

                                        {/* Contenido */}
                                        <div className="col-md-8">
                                            <div className="card-body h-100 d-flex flex-column">
                                                <div className="d-flex justify-content-between align-items-start mb-3">
                                                    <div>
                                                        <h5 className="card-title fw-bold mb-2">
                                                            {booking.propertyTitle}
                                                        </h5>
                                                        <div className="d-flex align-items-center text-muted">
                                                            <MapPin size={16} className="me-2" />
                                                            <small>Reserva #{booking.id}</small>
                                                        </div>
                                                    </div>
                                                    <span className={`badge rounded-pill ${getStatusColor(booking.status)}`}>
                                                        {booking.status}
                                                    </span>
                                                </div>

                                                {/* Detalles de la reserva */}
                                                <div className="row g-3 mb-4">
                                                    <div className="col-md-4">
                                                        <div className="d-flex align-items-center">
                                                            <div className="bg-primary bg-opacity-10 p-2 rounded me-3">
                                                                <Calendar className="text-primary" size={20} />
                                                            </div>
                                                            <div>
                                                                <small className="fw-medium text-dark d-block">Check-in</small>
                                                                <small className="text-muted">{formatDate(booking.checkIn)}</small>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="d-flex align-items-center">
                                                            <div className="bg-success bg-opacity-10 p-2 rounded me-3">
                                                                <Clock className="text-success" size={20} />
                                                            </div>
                                                            <div>
                                                                <small className="fw-medium text-dark d-block">Check-out</small>
                                                                <small className="text-muted">{formatDate(booking.checkOut)}</small>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="col-md-4">
                                                        <div className="d-flex align-items-center">
                                                            <div className="bg-info bg-opacity-10 p-2 rounded me-3">
                                                                <Users className="text-info" size={20} />
                                                            </div>
                                                            <div>
                                                                <small className="fw-medium text-dark d-block">Huéspedes</small>
                                                                <small className="text-muted">{booking.guests} personas</small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Footer con precio y acciones */}
                                                <div className="d-flex justify-content-between align-items-center pt-3 border-top mt-auto">
                                                    <div className="d-flex align-items-center">
                                                        <CreditCard className="text-muted me-2" size={20} />
                                                        <span className="h4 fw-bold text-dark me-2">€{booking.totalPrice}</span>
                                                        <span className="text-muted">total</span>
                                                    </div>

                                                    <div className="d-flex gap-2">
                                                        {booking.status === 'confirmada' && (
                                                            <button
                                                                className="btn btn-outline-danger"
                                                                onClick={() => handleCancellationClick(booking)}
                                                            >
                                                                Cancelar
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal de Confirmación */}
            <ConfirmationModal
                isOpen={showModal}
                onClose={handleCloseModal}
                onConfirm={handleConfirmCancellation}
                bookingData={selectedBooking}
            />
        </div>
    );
};

export default BookingsPage;