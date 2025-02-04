const BASE_URL = "http://localhost:3000/teams";

// Funciones CRUD para teams
async function getTeams() {
    const response = await fetch(BASE_URL);
    return response.json();
}

async function getTeamById(id) {
    const response = await fetch(`${BASE_URL}/${id}`);
    return response.json();
}

async function addTeam(team) {
    const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(team)
    });
    return response.json();
}

async function updateTeam(id, updatedData) {
    const response = await fetch(`${BASE_URL}/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
    });
    return response.json();
}

async function deleteTeam(id) {
    await fetch(`${BASE_URL}/${id}`, {
        method: "DELETE"
    });
}

// Función para obtener los pilotos de un equipo
async function getPilotsByTeam(teamId) {
    const team = await getTeamById(teamId);
    if (!team) return [];

    const pilots = await Promise.all(
        team.pilots.map(async (pilotId) => {
            const response = await fetch(`http://localhost:3000/pilots/${pilotId}`);
            return await response.json();
        })
    );

    return pilots;
}

// Exportar todas las funciones
export { getTeams, getTeamById, addTeam, updateTeam, deleteTeam, getPilotsByTeam };

//Falta definir excepciones(errores)