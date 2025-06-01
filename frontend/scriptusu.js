
const BASE_URL = 'https://tu-backend-render.onrender.com';
const API_U = `${BASE_URL}/usuarios`;
const API_L = `${BASE_URL}/licores`;

document.getElementById('formUsuario').addEventListener('submit', async (e) => {
  e.preventDefault();
  const usuario = {
    nombre: document.getElementById('nombre').value,
    correo: document.getElementById('correo').value,
    contrasena: document.getElementById('contrasena').value
  };
  await fetch(API_U, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(usuario)
  });
  alert('Usuario creado');
});

document.getElementById('formLicor').addEventListener('submit', async (e) => {
  e.preventDefault();
  const licor = {
    nombre: document.getElementById('licorNombre').value,
    tipo: document.getElementById('licorTipo').value,
    precio: parseFloat(document.getElementById('licorPrecio').value)
  };
  await fetch(API_L, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(licor)
  });
  alert('Licor creado');
});

