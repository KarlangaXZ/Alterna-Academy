const express = require("express");
const app = express();
var cors = require('cors');

app.use(cors());

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


//add contact
app.post('/api/contacts', (req, res)=>{
    
    const {name, phoneNumber, email} = req.body;

    if(!name || !phoneNumber || !email) {
        return res.status(400).json({error:'Todos los campos son requerido OBLIGATORIAMENTE: name, phoneNumber, email'});
    }

    const emailExist = contacts.some(contact => contact.email === email);
    if(emailExist) return res.status(400).json({error:'El correo ya esta en uso de otro Contacto'});

    const newContact = {
        id: contacts.length + 1,
        name,
        phoneNumber,
        email
    };

    contacts.push(newContact);
    res.status(201).json(newContact)
})


//Update contact
app.put('/api/contacts/:id', (req, res) =>{
    const id =  parseInt(req.params.id, 10);
    const {name,phoneNumber,email} = req.body;
    //console.log(req.body);
    if(isNaN(id))
        return res.status(400).json({error: 'El ID debe ser un numero'});

    const contact = contacts.find(contacts => contacts.id === id);

    if(!contact)
        return res.status(404).json({error:'Ese contacto no se encontro'});

    if(!name || !phoneNumber || !email)
        return res.status(400).json({ error:'Todos los Campos son requeridos OBLIGATORIAMENTE: name, phoneNumber, email'});

    const emailExist = contacts.some(contacts => contacts.email === email && contacts.id !== id);

    if(emailExist)
        return res.status(400).json({error:'El Correo esta siendo usado por otro Contacto'});

    contact.name = name;
    contact.phoneNumber = phoneNumber;
    contact.email = email;

    res.send(contact);
});

//delete contact
app.delete('/api/contacts/:id',(req, res) => {
    const id = parseInt(req.params.id, 10);

    if (isNaN(id))
        return res.status(400).json({error:'El ID debe ser un numero'});

    const index = contacts.findIndex(contacts => contacts.id === id);

    if(index === -1)
        return res.status(404).json({error:'Ese contacto no se encontro'});

    contacts.splice(index, 1);
    res.status(200).send('Se elimino correctamente');
        
});

//filter

app.get('/api/contacts/filter/:name', (req, res) =>{

    const name = req.params.name.toLowerCase();

    if(!name) return res.status(400).json({error:'El parametro no es requerido'})

    const filterContact = contacts.filter(contacts => contacts.name.toLowerCase());

    if(filterContact.length ===0)
        return res.status(404).json({error:'No existe contacto que coincida con lo que solicita'})

    res.json(filterContact)

})


const port = 4224;
app.listen(port, () => {
  console.log(`Servidor esta activo en el puerto ${port}`);
});