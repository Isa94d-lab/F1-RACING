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

// Función para abrir el popup
function openPopup() {
    document.getElementById("popup").style.display = "flex";
}

// Función para cerrar el popup
function closePopup() {
    document.getElementById("popup").style.display = "none";
}

// Para mostrar el popup cuando se le da click al botón "Agregar"
document.getElementById("btnAgregar").addEventListener("click", openPopup);

// Para guardar la info el popup cuando se le da click al botón "Guardar"
document.getElementById("btnGuardar").addEventListener("click", addPilotInfo);

// Para cerrar el popup cuando se le da click al botón "cerrar"
document.getElementById("btnCerrar").addEventListener("click", closePopup);



// Función para agregar un nuevo piloto al JSON Server
async function addPilotInfo() {
    // Obtener valores de los inputs
    const nombrePilot = document.getElementById("new_namePiloto").value.trim();
    const equipoPilot = document.getElementById("new_equipoPiloto").value.trim();
    const experiencePilot = document.getElementById("new_experiencePiloto").value.trim();
    const skillsPilot = document.getElementById("new_skillsPiloto").value.trim();


    // Crear objeto piloto
    const pilot = {
        nombre: nombrePilot,
        equipo: equipoPilot,
        experiencia: experiencePilot,
        habilidades: skillsPilot
    };

    try {
        // Hacer la petición POST al JSON Server
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pilot)
        });

        if (!response.ok) {
            throw new Error("Error al guardar el piloto en JSON Server");
        }

        alert("Piloto agregado exitosamente");

        // Limpiar los campos del formulario
        document.getElementById("new_namePiloto").value = "";
        document.getElementById("new_equipoPiloto").value = "";
        document.getElementById("new_experiencePiloto").value = "";
        document.getElementById("new_skillsPiloto").value = "";

        // Cerrar el popup
        closePopup();

        // Recargar la lista de pilotos
        loadPilots();
    } catch (error) {
        console.error("Error al agregar el piloto:", error);
        alert("Hubo un problema al agregar el piloto");
    }
}





// Función para cargar la lista de pilotos en la interfaz
async function loadPilots() {
    try {
        const pilots = await getPilots();
        const pilotosCard = document.getElementById("pilotosCard");

        // Limpiar la lista antes de actualizar
        pilotosCard.innerHTML = "";

        // Crear tarjetas para cada piloto
        pilots.forEach((pilot) => {
            const pilotElement = document.createElement("div");
            pilotElement.classList.add("pilot-card");
            pilotElement.innerHTML = `
                <h4>${pilot.nombre}</h4>
                <p>Equipo: ${pilot.equipo}</p>
                <p>Experiencia: ${pilot.experiencia}</p>
                <p>Habilidades: ${pilot.habilidades}</p>
            `;
            pilotosCard.appendChild(pilotElement);
        });
    } catch (error) {
        console.error("Error al cargar los pilotos:", error);
    }
}

// Cargar la lista de pilotos cuando la página cargue
document.addEventListener("DOMContentLoaded", loadPilots);


// Función para abrir el popup
function openPopup2() {
    document.getElementById("popup2").style.display = "flex";
}

// Función para cerrar el popup
function closePopup2() {
    document.getElementById("popup2").style.display = "none";
}

// Para mostrar el popup cuando se le da click al botón "Agregar"
document.getElementById("btnEditar").addEventListener("click", openPopup2);

// Para guardar la info el popup cuando se le da click al botón "Guardar"
document.getElementById("btnGuardar2").addEventListener("click", addPilotInfo);

// Para cerrar el popup cuando se le da click al botón "cerrar"
document.getElementById("btnCerrar2").addEventListener("click", closePopup2);






// Cargar la lista de pilotos en el select del segundo popup
async function loadPilotsForSelect() {
    try {
        const pilots = await getPilots();  // Obtiene la lista de pilotos desde la API
        const selectPiloto = document.getElementById("select_piloto");

        // Limpiar el select antes de llenarlo
        selectPiloto.innerHTML = "<option value=''>Seleccione un piloto</option>";

        // Añadir las opciones al select
        pilots.forEach((pilot) => {
            const option = document.createElement("option");
            option.value = pilot.id;  // Asegúrate de que "id" es el campo correcto
            option.textContent = pilot.nombre;  // Usamos el nombre del piloto para mostrarlo
            selectPiloto.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar los pilotos para el select:", error);
    }
}

// Cargar los detalles del piloto seleccionado
async function loadPilotoDetails() {
    const select = document.getElementById("select_piloto");
    const pilotoId = select.value;

    if (pilotoId) {
        try {
            const pilot = await getPilotById(pilotoId);  // Obtiene los detalles del piloto seleccionado

            // Rellenar los campos del formulario con los detalles del piloto
            document.getElementById("new_namePiloto").value = pilot.nombre;
            document.getElementById("new_equipoPiloto").value = pilot.equipo;
            document.getElementById("new_experiencePiloto").value = pilot.experiencia;
            document.getElementById("new_skillsPiloto").value = pilot.habilidades;
        } catch (error) {
            console.error("Error al cargar detalles del piloto:", error);
            alert("No se pudieron cargar los detalles del piloto.");
        }
    }
}

// Cargar los pilotos en el select cuando se abre el popup
document.getElementById("btnEditar").addEventListener("click", () => {
    openPopup2();
    loadPilotsForSelect();  // Llenar el select con los pilotos al abrir el popup
});
