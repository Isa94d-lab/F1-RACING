// Definir la URL base del servidor JSON
const BASE_URL = "http://localhost:3000/pilots";

// Función para obtener todos los pilotos
async function getPilots() {
    const response = await fetch(BASE_URL);
    return response.json();
}

// Función para obtener un piloto por ID
async function getPilotById(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    return response.json();
}

// Función para agregar un nuevo piloto
async function addPilot(pilot) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(pilot)
    });
    return response.json();
}

// Función para actualizar un piloto por ID
async function updatePilot(id, updatedData) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
    });
    return response.json();
}

// Función para eliminar un piloto por ID
async function deletePilot(id) {
    await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });
}

// Exportar las funciones para usarlas en otros módulos
export { getPilots, getPilotById, addPilot, updatePilot, deletePilot };

//Falta definir excepciones(errores)