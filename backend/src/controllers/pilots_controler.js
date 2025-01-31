//Añadir nuevo piloto
async function createPilot(name, team, rol, image) {
    const response = await fetch('http://localhost:3000/pilots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, team, rol, image }),
    });
    return await response.json();
}

//Obtener todos los pilotos
async function getAllPilots() {
    const response = await fetch('http://localhost:3000/pilots');
    return await response.json();
}

//obtener pilotos por ID
async function getPilotById(id) {
    const response = await fetch(`http://localhost:3000/pilots/${id}`);
    return await response.json();
}

//Actualizar un piloto por ID
async function updatePilot(id, updatedData) {
    const response = await fetch(`http://localhost:3000/pilots/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedData),
    });
    return await response.json();
}

//Eliminar un piloto por ID
async function deletePilot(id) {
    const response = await fetch(`http://localhost:3000/pilots/${id}`, {
        method: 'DELETE',
    });
    return response.ok; // Devuelve true si se eliminó correctamente
}