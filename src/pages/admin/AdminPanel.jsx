import React, { useEffect, useState } from "react";
import { fetchProperties, fetchPropertyById, createProperty, updateProperty, deleteProperty } from '../../api/PropertiesApi.js';
import { fetchUsers, registerUser, updateUser, deleteUser } from '../../api/UserApi.js';
import { Container, Row, Col, Nav, Tab, Card, Table, Button, Form, Modal } from 'react-bootstrap';

const AdminPanel = () => {
  const [properties, setProperties] = useState([]);
  const initialProperty = {
    title: "",
    pricePerNight: "",
    location: "",
    description: "",
    mainImage: "",
    host: {
      name: "",
    },
    amenities: [],
    reviews: [],
  };
  const [newProperty, setNewProperty] = useState(initialProperty);

  const [editingProperty, setEditingProperty] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'user', password: '' });
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);


  console.log("Propiedades", properties)
  useEffect(() => {
    loadProperties();
    loadUsers();
  }, []);

  const loadProperties = async () => {
    const response = await fetchProperties();
    setProperties(response);
  };

  const loadUsers = async () => {
    const response = await fetchUsers();
    setUsers(response.users);
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    await registerUser(newUser);
    setNewUser({ name: '', email: '', role: 'user', password: '' });
    loadUsers();
  };


  const startEditUser = (user) => {
    setEditingUser({ ...user });
    setShowUserModal(true);
  };

  const handleEditUserChange = (e) => {
    setEditingUser({ ...editingUser, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = async () => {
    await updateUser(editingUser.id, editingUser);
    setShowUserModal(false);
    setEditingUser(null);
    loadUsers();
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    loadUsers();
  };

  const handleUserInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };


  const handleCloseUserModal = () => {
    setShowUserModal(false);
    setEditingUser(null);
  };


  const handleInputChange = (e) => {
    setNewProperty({ ...newProperty, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    await createProperty(newProperty);
    setNewProperty(initialProperty);
    loadProperties();
  };

  const handleUpdate = async () => {
    await updateProperty(editingProperty.id, editingProperty);
    setEditingProperty(null);
    setShowEditModal(false);
    loadProperties();
  };

  const handleDelete = async (id) => {
    await deleteProperty(id);
    loadProperties();
  };

  const startEdit = (property) => {
    setEditingProperty({ ...property });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    setEditingProperty({ ...editingProperty, [e.target.name]: e.target.value });
  };

  const handleCloseModal = () => {
    setShowEditModal(false);
    setEditingProperty(null);
  };

  return (
    <Container fluid className="mt-4">
      <h2 className="mb-4">Panel de Administración</h2>

      <Tab.Container defaultActiveKey="users">
        <Row>
          <Col sm={3}>
            <Card>
              <Card.Header>Menú de Administración</Card.Header>
              <Card.Body className="p-0">
                <Nav variant="pills" className="flex-column">
                  <Nav.Item>
                    <Nav.Link eventKey="users">Gestión de Usuarios</Nav.Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Nav.Link eventKey="properties">Gestión de Propiedades</Nav.Link>
                  </Nav.Item>
                </Nav>
              </Card.Body>
            </Card>
          </Col>

          <Col sm={9}>
            <Tab.Content>
              {/* Pestaña de Usuarios */}
              <Tab.Pane eventKey="users">
                <Card>
                  <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Lista de Usuarios</span>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nombre</th>
                          <th>Email</th>
                          <th>Rol</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {users.map(user => (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? "admin" : "usuario"}
                            </td>
                            <td>
                              <Button variant="info" size="sm" className="me-2" onClick={() => startEditUser(user)}>Editar</Button>
                              <Button variant="danger" size="sm" onClick={() => handleDeleteUser(user.id)}>Eliminar</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>

                <Card className="mt-4">
                  <Card.Header>Agregar Nuevo Usuario</Card.Header>
                  <Card.Body>
                    <Form onSubmit={handleCreateUser}>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Nombre completo</Form.Label>
                            <Form.Control
                              type="text"
                              name="name"
                              placeholder="Ingrese el nombre"
                              value={newUser.name}
                              onChange={handleUserInputChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              type="email"
                              name="email"
                              placeholder="Ingrese el email"
                              value={newUser.email}
                              onChange={handleUserInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                              type="password"
                              name="password"
                              placeholder="Ingrese la contraseña"
                              value={newUser.password}
                              onChange={handleUserInputChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Rol</Form.Label>
                            <Form.Select
                              name="role"
                              value={newUser.role}
                              onChange={handleUserInputChange}
                            >
                              <option value="user">Usuario</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button variant="primary" type="submit">
                        Guardar Usuario
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>

              {/* Pestaña de Propiedades */}
              <Tab.Pane eventKey="properties">
                <Card>
                  <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                      <span>Lista de Propiedades</span>
                    </div>
                  </Card.Header>
                  <Card.Body>
                    <Table striped bordered hover responsive>
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Título</th>
                          <th>Precio</th>
                          <th>Propietario</th>
                          <th>Acciones</th>
                        </tr>
                      </thead>
                      <tbody>
                        {properties.map(property => (
                          <tr key={property.id}>
                            <td>{property.id}</td>
                            <td>{property.title}</td>
                            <td>${property.pricePerNight}</td>
                            <td>{property.host.name}</td>
                            <td>
                              <Button
                                variant="info"
                                size="sm"
                                className="me-2"
                                onClick={() => startEdit(property)}
                              >
                                Editar
                              </Button>
                              <Button variant="danger" size="sm" onClick={() => handleDelete(property.id)}>Eliminar</Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>


                <Card className="mt-4">
                  <Card.Header>Agregar Nueva Propiedad</Card.Header>
                  <Card.Body>
                    <Form>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Título</Form.Label>
                            <Form.Control
                              type="text"
                              name="title"
                              placeholder="Título de la propiedad"
                              value={newProperty.title}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control
                              type="text"
                              name="pricePerNight"
                              placeholder="Precio"
                              value={newProperty.pricePerNight}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Ubicación</Form.Label>
                            <Form.Control
                              type="text"
                              name="location"
                              placeholder="Ubicación"
                              value={newProperty.location}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Descripción</Form.Label>
                            <Form.Control
                              type="text"
                              name="description"
                              placeholder="Descripción"
                              value={newProperty.description}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <Form.Group className="mb-3" controlId="formHost">
                            <Form.Label>Propietario (Nombre)</Form.Label>
                            <Form.Control
                              type="text"
                              name="hostName"
                              placeholder="Nombre del propietario"
                              value={newProperty.host.name}
                              onChange={(e) =>
                                setNewProperty((prev) => ({
                                  ...prev,
                                  host: {
                                    name: e.target.value, // solo el nombre, nada más
                                  },
                                }))
                              }
                            />
                          </Form.Group>

                        </Col>
                        <Col md={6}>
                          <Form.Group className="mb-3">
                            <Form.Label>Imagen (URL)</Form.Label>
                            <Form.Control
                              type="text"
                              name="mainImage"
                              placeholder="https://example.com/imagen.jpg"
                              value={newProperty.mainImage}
                              onChange={handleInputChange}
                            />
                          </Form.Group>
                        </Col>
                      </Row>
                      <Button
                        variant="primary"
                        type="button"
                        onClick={handleCreate}
                      >
                        Guardar Propiedad
                      </Button>
                    </Form>
                  </Card.Body>
                </Card>
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>

      {/* Modal para editar propiedad */}
      <Modal show={showEditModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Propiedad</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingProperty && (
            <Form>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Título</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={editingProperty.title}
                      onChange={handleEditChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Form.Group className="mb-3">
                    <Form.Label>Precio</Form.Label>
                    <Form.Control
                      type="text"
                      name="pricePerNight"
                      value={editingProperty.pricePerNight}
                      onChange={handleEditChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
      {/* Modal para users */}
      <Modal show={showUserModal} onHide={handleCloseUserModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Editar Usuario</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={editingUser.name}
                  onChange={handleEditUserChange}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleEditUserChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseUserModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={handleUpdateUser}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default AdminPanel;