import { useNavigate, useParams } from "react-router-dom";
import { Heart, Star, MapPin, ArrowLeft, Edit, Trash2, Eye, Save, X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import properties from "../../data/properties.json";
import './PropertyDetail.css';
import Header from '../../pages/Header.jsx';
import { useAuth } from "../../context/AuthContext.jsx";
import { addFavorite, fetchFavoritesByUser, deleteFavoriteById } from "../utils/FavoriteManager.jsx";
import ManagePropertyModal from "../utils/modalManager/PropertyModalManager.jsx";
import { useFavorites } from '../../context/FavoritesContext.jsx';


const PropertyDetail = () => {
    const { user } = useAuth();
    const { id } = useParams();
    const property = properties.find(p => p.id === parseInt(id));
    const [favorites, setFavorites] = useState(false);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const navigate = useNavigate();
    const checkOutRef = useRef(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedProperty, setSelectedProperty] = useState(null);
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();


    if (!property) return <p>Propiedad no encontrada</p>;

    const handleReservation = async () => {
        if (!checkIn || !checkOut || new Date(checkOut) <= new Date(checkIn)) {
            alert('Por favor seleccioná fechas válidas.');
            return;
        }
        const bookingData = {
            propertyId: property.id,
            propertyTitle: property.title,
            propertyImage: property.mainImage,
            checkIn,
            checkOut,
            guests,
            pricePerNight: property.pricePerNight,
            totalPrice:
                property.pricePerNight *
                Math.ceil(
                    (new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)
                ) + 15,
            status: 'confirmada',
        };

        try {
            const response = await fetch("http://localhost:8787/roombleapi/booking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    user: user.email,
                    bookingData: bookingData,
                    price: bookingData.totalPrice,
                }),
            });

            const result = await response.json();

            if (result.success) {
                alert("Reserva guardada correctamente");
            } else {
                alert("Error al guardar la reserva");
            }
        } catch (error) {
            console.error("Error en la reserva:", error);
            alert("Error al conectar con el servidor");
        }
    };

    const handleManageProperty = (property) => {
        setSelectedProperty(property);
        setShowModal(true);
    };

    const handleDeleteProperty = (propertyId) => {
        const stored = JSON.parse(localStorage.getItem("properties")) || [];
        const updated = stored.filter(p => p.id !== propertyId);
        localStorage.setItem("properties", JSON.stringify(updated));

        setShowModal(false);
        alert("Propiedad eliminada correctamente.");
    };

    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const favs = await fetchFavoritesByUser(user.email); // debe devolver array
                setFavorites(favs || []); // asegurarse que sea array
            } catch (err) {
                console.error(err);
                setFavorites([]); // fallback seguro
            }
        };

        if (user?.email) {
            loadFavorites();
        }
    }, [user]);

    const handleFavoriteClick = (e) => {
        e.stopPropagation();
        if (isFavorite(property.id)) {
            removeFavorite(property.id);
        } else {
            addFavorite(property);
        }
    };

    const today = new Date().toISOString().split("T")[0];

    return (

        <div className="property-detail">
            {/* Header */}
            <Header />
            <div className="property-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <ArrowLeft size={24} />
                </button>
                <div className="property-actions">
                    <button
                        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
                        onClick={handleFavoriteClick}>
                        <Heart
                            size={18}
                            fill={isFavorite(property.id) ? '#ff385c' : 'transparent'}
                            color={isFavorite(property.id) ? '#ff385c' : '#ffffff'}
                        />
                    </button>
                </div>
            </div>

            {/* Galería */}
            <div className="image-gallery">
                <div className="main-image">
                    <img
                        src={
                            selectedImage === 0
                                ? property.mainImage
                                : property.imagesInside[selectedImage - 1]
                        }
                        alt={property.title}
                    />
                </div>

                <div className="thumbnail-list">
                    {[property.mainImage, ...property.imagesInside].map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Vista ${index}`}
                            className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                            onClick={() => setSelectedImage(index)}
                        />
                    ))}
                </div>
            </div>

            <div className="property-content">
                <div className="property-info">
                    {/* Título y puntaje */}
                    <div className="property-title-section">
                        <h1 className="property-title">{property.title}</h1>
                        <div className="property-rating">
                            <Star size={16} fill="#ffd700" color="#ffd700" />
                            <span className="rating-text">{property.rating}</span>
                            <span className="reviews-count">({property.reviews?.length || 0} reseñas)</span>
                        </div>
                    </div>

                    {/* Ubicación */}
                    <div className="property-location">
                        <MapPin size={16} />
                        <span>{property.location}</span>
                    </div>

                    {/* Descripción */}
                    <div className="property-description">
                        <p>{property.descripcion}</p>
                    </div>

                    {/* Amenities */}
                    <div className="amenities-section">
                        <h3>¿Qué ofrece este lugar?</h3>
                        <div className="amenities-grid"> {property.amenities.map((amenity, index) => (
                            <div key={index} className="amenity-item">{amenity.icon}<span>{amenity.name}</span>
                            </div>
                        ))}
                        </div>
                    </div>

                    {/* Anfitrión */}
                    <div className="host-section">
                        <h3>Conoce a tu anfitrión</h3>
                        <div className="host-card">
                            <img
                                src={property.host.avatar}
                                alt={property.host.name}
                                className="host-avatar"
                            />
                            <div className="host-info">
                                <h4>{property.host.name}</h4>
                                <div className="host-stats">
                                    <span>Tasa de respuesta: {property.host.responseRate}</span>
                                    <span>Tiempo de respuesta: {property.host.responseTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className="reviews-section">
                        <h3>Reseñas</h3>
                        <div className="reviews-list">
                            {property.reviews.map(review => (
                                <div key={review.id} className="review-item">
                                    <div className="review-header">
                                        <span className="reviewer-name">{review.user}</span>
                                        <div className="review-rating">
                                            {[...Array(review.rating)].map((_, i) => (
                                                <Star key={i} size={12} fill="#ffd700" color="#ffd700" />
                                            ))}
                                        </div>
                                        <span className="review-date">{review.date}</span>
                                    </div>
                                    <p className="review-comment">{review.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Reserva */}
                <div className="booking-card">
                    <div className="price-section">
                        <span className="price">€{property.price}</span>
                        <span className="price-unit">/ noche</span>
                    </div>

                    <div className="booking-form">
                        <div className="date-inputs">
                            <div className="input-group">
                                <label>Check-in</label>
                                <input
                                    type="date"
                                    value={checkIn}
                                    onChange={(e) => {
                                        setCheckIn(e.target.value);
                                        checkOutRef.current?.focus();
                                    }}
                                    min={today}
                                />
                            </div>
                            <div className="input-group">
                                <label>Check-out</label>
                                <input className="date-input"
                                    ref={checkOutRef}
                                    type="date"
                                    value={checkOut}
                                    onChange={(e) => setCheckOut(e.target.value)}
                                    min={checkIn || today}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Huéspedes</label>
                            <select
                                value={guests}
                                onChange={(e) => setGuests(parseInt(e.target.value))} >
                                <option value={1}>1 huésped</option>
                                <option value={2}>2 huéspedes</option>
                                <option value={3}>3 huéspedes</option>
                                <option value={4}>4 huéspedes</option>
                            </select>
                        </div>

                        {user.isAdmin ? (
                            <button className="manage-button" onClick={() => handleManageProperty(property)}>
                                Gestionar Propiedad
                            </button>
                        ) : (
                            <button className="reserve-button" onClick={handleReservation}>Reservar</button>
                        )}

                        {showModal && selectedProperty && (
                            <ManagePropertyModal
                                property={selectedProperty}
                                onClose={() => setShowModal(false)}
                                onDelete={handleDeleteProperty}
                            />
                        )}


                    </div>

                    <div className="booking-summary">
                        <div className="summary-line">
                            <span>€{property.pricePerNight} x {checkIn && checkOut ?
                                Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) || 1 : 1} noche(s)
                            </span>
                            <span>€{property.pricePerNight * (checkIn && checkOut ?
                                Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) || 1 : 1)}
                            </span>
                        </div>
                        <div className="summary-line">
                            <span>Tarifa de servicio</span>
                            <span>€15</span>
                        </div>
                        <hr />
                        <div className="summary-total">
                            <span>Total</span>
                            <span>€{(property.pricePerNight * (checkIn && checkOut ?
                                Math.ceil((new Date(checkOut) - new Date(checkIn)) / (1000 * 60 * 60 * 24)) || 1
                                : 1)) + 15}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetail;
