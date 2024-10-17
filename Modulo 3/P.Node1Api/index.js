const express = require("express");
const app = express();

app.use(express.json());

const contacts = [
  {
    id: 1,
    name: "Carlos Linares",
    phoneNumber: 8009995555,
    email: "Carlos@Alterna.com",
  },
  {
    id: 2,
    name: "Eduado Burgos",
    phoneNumber: 8009795445,
    email: "Eduado@Alterna.com",
  },
  {
    id: 3,
    name: "Carolin Santos",
    phoneNumber: 8007798765,
    email: "Carolin@Alterna.com",
  },
  {
    id: 4,
    name: "Juan Perez",
    phoneNumber: 8009873355,
    email: "Juan@Alterna.com",
  },
];

app.get("/", (req, res) => {
  res.send("Api active");
});

app.get("/api/contacts", (req, res) => {
  res.send(contacts);
});

app.get("/api/contacts/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);

  if (!req.params.id || isNaN(id)) {
    return res.status(400).json({ error: "El ID debe ser un numero." });
  }

  const contact = contacts.find((contact) => contact.id === id);

  if (!contact) {
    return res.status(404).json({ error: "Ese contacto no se encontro" });
  }

  res.send(contact);
});

const port = 4224;
app.listen(port, () => {
  console.log(`Servidor esta activo en el puerto ${port}`);
});
