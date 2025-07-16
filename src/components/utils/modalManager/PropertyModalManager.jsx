// src/components/utils/modalManager/PropertyModalManager.jsx
import React from "react";

const ManagePropertyModal = ({ property, onClose, onDelete }) => {
    if (!property) return null;

    const handleDelete = () => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta propiedad?')) {
            onDelete(property.id);
        }
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div 
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 9999,
                backdropFilter: 'blur(2px)'
            }}
            onClick={handleOverlayClick}
        >
            <div 
                style={{
                    background: 'white',
                    borderRadius: '12px',
                    maxWidth: '500px',
                    width: '90%',
                    maxHeight: '80vh',
                    overflowY: 'auto',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                    position: 'relative'
                }}
            >
                <div style={{
                    padding: '24px 24px 16px 24px',
                    borderBottom: '1px solid #e5e5e5',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <h2 style={{
                        margin: 0,
                        color: '#333',
                        fontSize: '1.5rem',
                        fontWeight: '600'
                    }}>
                        Gestionar Propiedad
                    </h2>
                    <button 
                        style={{
                            background: 'none',
                            border: 'none',
                            fontSize: '24px',
                            cursor: 'pointer',
                            color: '#666',
                            padding: '0',
                            width: '30px',
                            height: '30px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            transition: 'background-color 0.2s ease'
                        }}
                        onClick={onClose}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#f0f0f0';
                            e.target.style.color = '#333';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = 'transparent';
                            e.target.style.color = '#666';
                        }}
                    >
                        ×
                    </button>
                </div>
                
                <div style={{ padding: '24px' }}>
                    <div>
                        <p style={{ margin: '12px 0', color: '#555', lineHeight: '1.6', fontSize: '14px' }}>
                            <strong style={{ color: '#333', fontWeight: '600' }}>Título:</strong> {property.title}
                        </p>
                        <p style={{ margin: '12px 0', color: '#555', lineHeight: '1.6', fontSize: '14px' }}>
                            <strong style={{ color: '#333', fontWeight: '600' }}>Descripción:</strong> {property.descripcion || property.description}
                        </p>
                        <p style={{ margin: '12px 0', color: '#555', lineHeight: '1.6', fontSize: '14px' }}>
                            <strong style={{ color: '#333', fontWeight: '600' }}>Ubicación:</strong> {property.location}
                        </p>
                        <p style={{ margin: '12px 0', color: '#555', lineHeight: '1.6', fontSize: '14px' }}>
                            <strong style={{ color: '#333', fontWeight: '600' }}>Precio:</strong> €{property.pricePerNight || property.price} por noche
                        </p>
                    </div>
                </div>

                <div style={{
                    padding: '16px 24px 24px 24px',
                    borderTop: '1px solid #e5e5e5',
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'flex-end'
                }}>
                    <button 
                        style={{
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '14px',
                            transition: 'all 0.2s ease',
                            minWidth: '100px',
                            backgroundColor: '#dc3545',
                            color: 'white'
                        }}
                        onClick={handleDelete}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#c82333';
                            e.target.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#dc3545';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Eliminar Propiedad
                    </button>
                    <button 
                        style={{
                            border: 'none',
                            padding: '10px 20px',
                            borderRadius: '6px',
                            cursor: 'pointer',
                            fontWeight: '500',
                            fontSize: '14px',
                            transition: 'all 0.2s ease',
                            minWidth: '100px',
                            backgroundColor: '#6c757d',
                            color: 'white'
                        }}
                        onClick={onClose}
                        onMouseEnter={(e) => {
                            e.target.style.backgroundColor = '#5a6268';
                            e.target.style.transform = 'translateY(-1px)';
                        }}
                        onMouseLeave={(e) => {
                            e.target.style.backgroundColor = '#6c757d';
                            e.target.style.transform = 'translateY(0)';
                        }}
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ManagePropertyModal;