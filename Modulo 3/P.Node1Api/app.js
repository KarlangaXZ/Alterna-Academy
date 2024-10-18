const api_url = 'http://localhost:4224/api/contacts';

function getContact(){
    const API = fetch(api_url).then()
    const contacto = {
    id: 1,
    name: "Carlos Linares",
    phoneNumber: 8009995555,
    email: "Carlos@Alterna.com",
   }

   const tablebody = document.getElementById('contactTable');
   if(!tablebody){
    return
   }
  tablebody.innerHTML =`
  <td>${contacto.id}</td>
  <td>${contacto.name}</td>
  <td>${contacto.phoneNumber}</td>
  <td>${contacto.email}</td>
  <td>
  <button style="background-color: green;">Editar</button>
  <button style="background-color: red;">Delete</button>
  </td>
  ` 
  
}

getContact();