const API_URL = "http://localhost:4224/api/contacts";

// Definir la interfaz para un contacto
interface Contact {
  id?: number;
  name: string;
  phoneNumber: string;
  email: string;
}

// API - Obtener contactos
async function getContacts(): Promise<void> {
  const response = await fetch(API_URL);
  const contacts_user: Contact[] = await response.json();

  const tablebd = document.getElementById(
    "contactTable"
  ) as HTMLTableElement | null;
  if (!tablebd) {
    console.error("No se encontró el elemento con ID table");
    return;
  }

  tablebd.innerHTML = "";

  contacts_user.forEach((contact) => {
    const rows = document.createElement("tr");
    rows.innerHTML = `
      <td class="table-success">${contact.id}</td> 
      <td class="table-success text-uppercase">${contact.name}</td> 
      <td class="table-success">${contact.phoneNumber}</td> 
      <td class="table-success text-uppercase">${contact.email}</td>
      <td class="table-dark" >
        <button class="btn btn-primary" onclick="editContact(${contact.id})">Edit</button>
        <button class="btn btn-danger"  onclick="deleteContact(${contact.id})">Delete</button>
      </td> 

    `;

    tablebd.appendChild(rows);
  });
}

// Agregar contacto
async function postContact(contact: Contact): Promise<void> {
  await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(contact),
  });
  getContacts();
}

// Eliminar contacto
async function deleteContact(id: number): Promise<void> {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  getContacts();
}

// Editar contacto
async function editContact(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`);
  const contact: Contact = await response.json();

  const contactId = document.getElementById(
    "contactId"
  ) as HTMLInputElement | null;
  const contactName = document.getElementById(
    "contactName"
  ) as HTMLInputElement | null;
  const contactPhone = document.getElementById(
    "contactPhone"
  ) as HTMLInputElement | null;
  const contactEmail = document.getElementById(
    "contactEmail"
  ) as HTMLInputElement | null;

  if (!contactId || !contactName || !contactPhone || !contactEmail) {
    console.error("No se encontraron los elementos del formulario");
    return;
  }

  // Asignar los valores correctamente
  contactId.value = contact.id?.toString() || "";
  contactName.value = contact.name;
  contactPhone.value = contact.phoneNumber;
  contactEmail.value = contact.email;
}

// Manejo del formulario
const contactForm = document.getElementById(
  "contactForm"
) as HTMLFormElement | null;

if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = (document.getElementById("contactId") as HTMLInputElement | null)
      ?.value;
    const contact: Contact = {
      name: (document.getElementById("contactName") as HTMLInputElement).value,
      phoneNumber: (document.getElementById("contactPhone") as HTMLInputElement)
        .value,
      email: (document.getElementById("contactEmail") as HTMLInputElement)
        .value,
    };

    if (id) {
      // Si hay un ID, es una edición
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(contact),
      });
    } else {
      // Si no hay ID, es un nuevo contacto
      await postContact(contact);
    }

    // Limpiar el formulario
    contactForm.reset();
    const contactIdField = document.getElementById(
      "contactId"
    ) as HTMLInputElement | null;
    if (contactIdField) {
      contactIdField.value = ""; // Limpiar el campo ID
    }
    getContacts();
  });

  // Cargar los contactos al iniciar
  getContacts();
}
