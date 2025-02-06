const BASE_URL = "http://localhost:3000/vehiculos";

// Obtener todos los vehículos
async function getVehicles() {
  const response = await fetch(BASE_URL);
  return response.json();
}

// Obtener un vehículo por ID
async function getVehicleById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);
  return response.json();
}

// Añadir un nuevo vehículo
async function addVehicle(vehicle) {
  const response = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(vehicle),
  });
  return response.json();
}

// Actualizar un vehículo por ID
async function updateVehicle(id, updatedData) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  return response.json();
}

// Eliminar un vehículo por ID
async function deleteVehicle(id) {
  await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
}

export { getVehicles, getVehicleById, addVehicle, updateVehicle, deleteVehicle };

const apiUrl = 'http://localhost:3000/vehiculos'; // URL del JSON Server

// Función para obtener los datos desde JSON Server
async function fetchVehiclesData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('No se pudieron obtener los datos.');
    }
    const vehicles = await response.json();
    createVehicleCards(vehicles); // Crear las tarjetas
  } catch (error) {
    console.error('Error al obtener los datos:', error);
  }
}

// Función para crear las tarjetas
function createVehicleCards(vehicles) {
  const container = document.getElementById('vehicles-container');
  container.innerHTML = '';  // Limpiar el contenedor antes de agregar nuevas tarjetas

  vehicles.forEach(vehicle => {
    const card = document.createElement('div');
    card.classList.add('card-vehicle');
    card.setAttribute('data-id', vehicle.id); // Establecer un atributo para identificar la tarjeta

    card.innerHTML = `
      <img src="${vehicle.img}" alt="Imagen del vehículo">
      <h3>${vehicle.modelo}</h3>
      <p><strong>Equipo:</strong> ${vehicle.equipo}</p>
      <p><strong>Motor:</strong> ${vehicle.motor}</p>
      <p><strong>Velocidad Máxima:</strong> ${vehicle.velocidad_maxima_kmh} km/h</p>
      <p><strong>Aceleración (0-100):</strong> ${vehicle.aceleracion_0_100} segundos</p>
    `;

  // Añadir evento de clic para abrir el popup
  card.addEventListener('click', function() {
    openModal(vehicle); // Pasar el objeto completo al modal
  });

  container.appendChild(card);
});
}

// Función para abrir el popup con los detalles del vehículo
function openModal(vehicle) {
  const modal = document.getElementById('vehicle-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalImage = document.getElementById('modal-image');
  const modalDescription = document.getElementById('modal-description');

  // Verificar si los elementos existen antes de manipularlos
  if (modalTitle && modalImage && modalDescription) {
    // Actualizamos el título del modal con el modelo del vehículo
    modalTitle.innerHTML = `${vehicle.modelo} - ${vehicle.equipo}`;

    // Colocar la imagen del vehículo en el modal
    modalImage.innerHTML = `<img src="${vehicle.img}" alt="Imagen del vehículo">`;

    // Detalles del vehículo
    modalDescription.innerHTML = `
      <strong>Motor:</strong> ${vehicle.motor}<br>
      <strong>Velocidad Máxima:</strong> ${vehicle.velocidad_maxima_kmh} km/h<br>
      <strong>Aceleración (0-100):</strong> ${vehicle.aceleracion_0_100} segundos<br><br>
      <strong>Rendimiento Normal:</strong><br>
      Velocidad Promedio: ${vehicle.rendimiento.conduccion_normal.velocidad_promedio_kmh} km/h<br>
      Consumo Combustible (seco): ${vehicle.rendimiento.conduccion_normal.consumo_combustible.seco}<br>
      Desgaste Neumáticos (seco): ${vehicle.rendimiento.conduccion_normal.desgaste_neumaticos.seco}
    `;
    
    modal.style.display = 'flex'; // Mostrar el modal
  } else {
    console.error("Los elementos del modal no están disponibles.");
  }
}

// Función para cerrar el modal
function closeModal() {
  const modal = document.getElementById('vehicle-modal');
  modal.style.display = 'none'; // Ocultar el modal
}

// Asignar el evento de cierre al botón de cerrar
const closeButton = document.getElementById('close-btn');
if (closeButton) {
  closeButton.addEventListener('click', closeModal);
}

// Llamar a la función para obtener los datos cuando se cargue la página
window.onload = fetchVehiclesData;


if (localStorage.getItem("isLoggedIn") === "true") {
  document.querySelector(".wrapper").style.display = "flex";
}