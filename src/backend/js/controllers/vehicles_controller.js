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
