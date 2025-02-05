import { generateCode } from './generateCode.js';  // Asegúrate de usar la ruta correcta



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

// Funciones para manejar los popups
function openPopup() {
    document.getElementById("popup").style.display = "flex";
}

function closePopup() {
    document.getElementById("popup").style.display = "none";
}

function openPopup2() {
    document.getElementById("popup2").style.display = "flex";
}

function closePopup2() {
    document.getElementById("popup2").style.display = "none";
}



document.addEventListener("DOMContentLoaded", () => {
    // Primero manejamos los eventos de los botones
    document.getElementById("btnAgregar")?.addEventListener("click", openPopup);
    document.getElementById("btnGuardar")?.addEventListener("click", addPilotInfo);
    document.getElementById("btnCerrar")?.addEventListener("click", closePopup);
    document.getElementById("btnEditar")?.addEventListener("click", () => {
        document.querySelector('editar-piloto-popup').open();
    });
    document.getElementById("btnGuardar2")?.addEventListener("click", updatePilotInfo);
    document.getElementById("select_piloto")?.addEventListener("change", loadPilotoDetails);

// Evento para la búsqueda
document.getElementById("search-bar")?.addEventListener("input", handleSearch);

// Luego, llamamos a la función que carga los pilotos al inicio
loadPilots();

// Finalmente, instanciamos y renderizamos el componente popup
const popup = new AgregarPilotoPopup(); // Crea la instancia de tu clase (si es necesario)
const popup2 = new EditarPilotoPopup();
popup.render(); // Llamamos al método render después de que el DOM esté listo
popup2.render();
 });




// Función para agregar un nuevo piloto al JSON Server
async function addPilotInfo() {
    const nombrePilot = document.getElementById("new_namePiloto").value.trim();
    const equipoPilot = document.getElementById("new_equipoPiloto").value.trim();
    const experiencePilot = document.getElementById("new_experiencePiloto").value.trim();
    const imgPilot = document.getElementById("new_imgPiloto").value.trim();
    const generateCodeElement = document.getElementById("generateCode");
    const generatedCode = generateCodeElement ? generateCodeElement.getGeneratedCode() : null;

    const pilot = {
        id: generatedCode,  // Incluir el código generado
        nombre: nombrePilot,
        equipo: equipoPilot,
        experiencia: experiencePilot,
        img: imgPilot,
    };

    try {
        const response = await fetch(BASE_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pilot)
        });

        if (!response.ok) throw new Error("Error al guardar el piloto en JSON Server");

        alert("Piloto agregado exitosamente");

        // Limpiar los campos del formulario
        document.getElementById("new_namePiloto").value = "";
        document.getElementById("new_equipoPiloto").value = "";
        document.getElementById("new_experiencePiloto").value = "";
        document.getElementById("new_imgPiloto").value = "";

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
        console.log(pilots);  // Añadir para depuración
        const pilotosCard = document.getElementById("pilotosCard");

        if (!pilotosCard) {
            console.error("Error: No se encontró el elemento con id 'pilotosCard'.");
            return;
        }

        // Limpiar la lista antes de actualizar
        pilotosCard.innerHTML = "";

        pilots.forEach((pilot) => {
            const pilotElement = document.createElement("div");
            pilotElement.classList.add("pilot-card");
            pilotElement.innerHTML = `
                <h2>${pilot.nombre}</h2>
                <img src="${pilot.img}">
            `;
            pilotosCard.appendChild(pilotElement);
        });
    } catch (error) {
        console.error("Error al cargar los pilotos:", error);
    }
}


// Función para cargar los pilotos en el select de editar
async function loadPilotsForSelect() {
    const pilots = await getPilots();
    const select = document.getElementById("select_piloto");

    pilots.forEach((pilot) => {
        const option = document.createElement("option");
        option.value = pilot.id;
        option.textContent = pilot.nombre;
        select.appendChild(option);
    });
}

// Función para actualizar la información del piloto
async function updatePilotInfo() {
    const pilotoId = document.getElementById("select_piloto").value;
    if (!pilotoId) {
        alert("Por favor, selecciona un piloto para editar.");
        return;
    }

    const nombrePilot = document.getElementById("edit_namePiloto").value.trim();
    const equipoPilot = document.getElementById("edit_equipoPiloto").value.trim();
    const experiencePilot = document.getElementById("edit_experiencePiloto").value.trim();
    const imgPilot = document.getElementById("edit_imgPiloto").value.trim();

    if (!nombrePilot || !equipoPilot || !experiencePilot || !imgPilot) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    const updatedPilot = {
        nombre: nombrePilot,
        equipo: equipoPilot,
        experiencia: experiencePilot,
        img: imgPilot  // Cambié de 'Imagen' a 'img'
    };

    try {
        const response = await fetch(`${BASE_URL}/${pilotoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPilot)
        });

        if (!response.ok) throw new Error("Error al actualizar el piloto en JSON Server");

        alert("Piloto actualizado exitosamente");
        closePopup2();
        loadPilots();
    } catch (error) {
        console.error("Error al actualizar el piloto:", error);
        alert("Hubo un problema al actualizar el piloto");
    }
}

// Función para cargar los detalles del piloto seleccionado en el formulario de edición
async function loadPilotoDetails() {
    const pilotoId = document.getElementById("select_piloto").value;
    if (!pilotoId) return;

    try {
        const pilots = await getPilots();
        const selectedPilot = pilots.find(pilot => pilot.id == pilotoId);

        if (selectedPilot) {
            document.getElementById("edit_namePiloto").value = selectedPilot.nombre;
            document.getElementById("edit_equipoPiloto").value = selectedPilot.equipo;
            document.getElementById("edit_experiencePiloto").value = selectedPilot.experiencia;
            document.getElementById("edit_imgPiloto").value = selectedPilot.img;  // Cambié de 'Imagen' a 'img'
        }
    } catch (error) {
        console.error("Error al cargar los detalles del piloto:", error);
    }
}

// Función para manejar la búsqueda en la barra de búsqueda
async function handleSearch(event) {
    const searchQuery = event.target.value.toLowerCase();
    
    // Filtrar los pilotos que coincidan con la búsqueda
    const filteredPilots = await getPilots();
    const filteredResults = filteredPilots.filter(pilot => 
        pilot.nombre.toLowerCase().includes(searchQuery)
    );
    // Mostrar los pilotos filtrados
    displaySearchResults(filteredResults);
}
// Función para mostrar los resultados de la búsqueda en el DOM
function displaySearchResults(pilots) {
    const pilotosCard = document.getElementById("pilotosCard");
    // Limpiamos la lista antes de actualizar
    pilotosCard.innerHTML = "";
    // Si hay resultados, los mostramos
    if (pilots.length > 0) {
        pilots.forEach((pilot) => {
            const pilotElement = document.createElement("div");
            pilotElement.classList.add("pilot-card");
            pilotElement.innerHTML = `
                <h2>${pilot.nombre}</h2>
                <img src="${pilot.img}">
            `;
            pilotosCard.appendChild(pilotElement);
        });
    } else {
        pilotosCard.innerHTML = "<p>No se encontraron pilotos que coincidan con la búsqueda.</p>";
   }
}


document.addEventListener("DOMContentLoaded", () => {
    const generateCodeElement = document.getElementById("generateCode");
    console.log(generateCodeElement);  // Añadir para depuración
    const idUsuarioInput = document.getElementById("id_Usuario");

    if (generateCodeElement) {
        const generatedCode = generateCodeElement.getGeneratedCode();  // Obtén el código generado
        if (idUsuarioInput) {
            idUsuarioInput.value = generatedCode;  // Actualiza el campo del ID con el código generado
        }
    } else {
        console.error('El componente generateCode no se encuentra en el DOM.');
    }
});


