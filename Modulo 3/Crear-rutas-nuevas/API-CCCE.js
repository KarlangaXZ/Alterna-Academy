const express = require("express");
const app = express();
var cors = require('cors');

app.use(cors());
app.use(express.json());

// Datos de ejemplo
const contacts = [
  { id: 1, name: "Carlos Linares", phoneNumber: 8009995555, email: "Carlos@Alterna.com" },
  { id: 2, name: "Eduado Burgos", phoneNumber: 8009795445, email: "Eduado@Alterna.com" },
  { id: 3, name: "Carolin Santos", phoneNumber: 8007798765, email: "Carolin@Alterna.com" }
];

const client = [
  { id: 1, name: "Cliente 1", phoneNumber: 8001234567, email: "cliente1@empresa.com" },
  { id: 2, name: "Cliente 2", phoneNumber: 8001234568, email: "cliente2@empresa.com" },
  { id: 3, name: "Cliente 3", phoneNumber: 8001234569, email: "cliente3@empresa.com" }
];

const industry = [
  { id: 1, name: "Empresa A", industry: "Tecnología", country: "México" },
  { id: 2, name: "Empresa B", industry: "Finanzas", country: "España" },
  { id: 3, name: "Empresa C", industry: "Manufactura", country: "Argentina" }
];

const catalog = [
  { id: 1, itemName: "Producto 1", price: "100$" },
  { id: 2, itemName: "Producto 2", price: "200$" },
  { id: 3, itemName: "Producto 3", price: "300$" }
];

// Rutas base
app.get("/", (req, res) => {
  res.send("API activa");
});

// CRUD para contactos

app.get("/api/contacts", (req, res) => {
  res.send(contacts);
});

app.get("/api/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) {
    return res.status(400).json({ error: "El ID debe ser un número." });
  }

  const contact = contacts.find(contact => contact.id === id);
  if (!contact) {
    return res.status(404).json({ error: "Contacto no encontrado." });
  }

  res.send(contact);
});

// Añadir contacto
app.post('/api/contacts', (req, res) => {
  const { name, phoneNumber, email } = req.body;

  if (!name || !phoneNumber || !email) {
    return res.status(400).json({ error: 'Todos los campos son requeridos: name, phoneNumber, email' });
  }

  const emailExist = contacts.some(contact => contact.email === email);
  if (emailExist) return res.status(400).json({ error: 'El correo ya está en uso' });

  const newContact = {
    id: contacts.length + 1,
    name,
    phoneNumber,
    email
  };

  contacts.push(newContact);
  res.status(201).json(newContact);
});

// Actualizar contacto
app.put('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, phoneNumber, email } = req.body;

  if (isNaN(id)) return res.status(400).json({ error: 'El ID debe ser un número' });

  const contact = contacts.find(contact => contact.id === id);
  if (!contact) return res.status(404).json({ error: 'Contacto no encontrado' });

  const emailExist = contacts.some(contact => contact.email === email && contact.id !== id);
  if (emailExist) return res.status(400).json({ error: 'El correo está en uso por otro contacto' });

  contact.name = name;
  contact.phoneNumber = phoneNumber;
  contact.email = email;

  res.send(contact);
});

// Eliminar contacto
app.delete('/api/contacts/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) return res.status(400).json({ error: 'El ID debe ser un número' });

  const index = contacts.findIndex(contact => contact.id === id);
  if (index === -1) return res.status(404).json({ error: 'Contacto no encontrado' });

  contacts.splice(index, 1);
  res.send('Contacto eliminado correctamente');
});

// CRUD para client

app.get("/api/client", (req, res) => {
  res.send(client);
});

app.get("/api/client/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) return res.status(400).json({ error: 'El ID debe ser un número' });

  const cliente = client.find(cliente => cliente.id === id);
  if (!cliente) return res.status(404).json({ error: 'Cliente no encontrado' });

  res.send(cliente);
});

// CRUD para industry

app.get("/api/industry", (req, res) => {
  res.send(industry);
});

app.get("/api/industry/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) return res.status(400).json({ error: 'El ID debe ser un número' });

  const empresa = industry.find(empresa => empresa.id === id);
  if (!empresa) return res.status(404).json({ error: 'Empresa no encontrada' });

  res.send(empresa);
});

// CRUD para catálogos

app.get("/api/catalog", (req, res) => {
  res.send(catalog);
});

app.get("/api/catalog/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (isNaN(id)) return res.status(400).json({ error: 'El ID debe ser un número' });

  const catalogo = catalog.find(catalogo => catalogo.id === id);
  if (!catalogo) return res.status(404).json({ error: 'Producto no encontrado' });

  res.send(catalogo);
});

// Escuchar en el puerto
const port = 4224;
app.listen(port, () => {
  console.log(`Servidor está activo en el puerto ${port}`);
});
