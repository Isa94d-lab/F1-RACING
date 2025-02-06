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

// URL del JSON Server donde se encuentran los datos
const apiUrl = 'http://localhost:3000/vehiculos';  // Cambia esto con la URL correcta de tu servidor

// Función para obtener los datos desde JSON Server
async function fetchVehiclesData() {
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('No se pudieron obtener los datos.');
    }
    const vehicles = await response.json();
    createVehicleCards(vehicles);  // Llamar a la función para crear las tarjetas
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

    card.innerHTML = `
        <img src="${vehicle.img}" alt="Imagen del vehículo">
        <h3>${vehicle.modelo}</h3>
        <p><strong>Equipo:</strong> ${vehicle.equipo}</p>
        <p><strong>Motor:</strong> ${vehicle.motor}</p>
        <p><strong>Velocidad Máxima:</strong> ${vehicle.velocidad_maxima_kmh} km/h</p>
        <p><strong>Aceleración (0-100):</strong> ${vehicle.aceleracion_0_100} segundos</p>
        <div class="details">
        <span><strong>Rendimiento Normal:</strong> Velocidad Promedio: ${vehicle.rendimiento.conduccion_normal.velocidad_promedio_kmh} km/h</span>
        <span>Consumo Combustible (seco): ${vehicle.rendimiento.conduccion_normal.consumo_combustible.seco}</span>
        </div>
    `;

    container.appendChild(card);
});
}

// Llamar a la función para obtener los datos cuando se cargue la página
window.onload = fetchVehiclesData;
