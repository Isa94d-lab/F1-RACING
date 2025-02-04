// Definir la URL base del servidor JSON
const BASE_URL = "http://localhost:3000/pilots";

// Función para obtener todos los pilotos
async function getPilots() {
    const response = await fetch(BASE_URL);
    return response.json();
}

// Función para abrir el popup (ahora con Web Component)
function openPopup() {
    const popupElement = document.querySelector('agregar-piloto-popup');  // Seleccionamos el Web Component
    if (popupElement) {
        popupElement.open();  // Usamos el método open() del Web Component
    } else {
        console.error("El Web Component 'agregar-piloto-popup' no se encuentra en el DOM.");
    }
}

// Función para cerrar el popup (Web Component)
function closePopup() {
    const popupElement = document.querySelector('agregar-piloto-popup'); // Seleccionamos el Web Component
    if (popupElement) {
        popupElement.close(); // Usamos el método close() del Web Component
    } else {
        console.error("El Web Component 'agregar-piloto-popup' no está en el DOM.");
    }
}

// Función para abrir el popup de editar piloto
function openPopup2() {
    document.getElementById("popup2").style.display = "flex";
}

// Función para cerrar el popup de editar piloto
function closePopup2() {
    document.getElementById("popup2").style.display = "none";
}

// Función para agregar un nuevo piloto al JSON Server
async function addPilotInfo() {
    const nombrePilot = document.getElementById("new_namePiloto").value.trim();
    const equipoPilot = document.getElementById("new_equipoPiloto").value.trim();
    const experiencePilot = document.getElementById("new_experiencePiloto").value.trim();
    const imgPilot = document.getElementById("new_imgPiloto").value.trim();

    if (!nombrePilot || !equipoPilot || !experiencePilot || !skillsPilot) {
        alert("Todos los campos son obligatorios.");
        return;  // Evitar continuar si hay campos vacíos
    }

    const pilot = {
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

        if (!response.ok) {
            throw new Error("Error al guardar el piloto en JSON Server");
        }

        alert("Piloto agregado exitosamente");

        // Limpiar los campos del formulario
        document.getElementById("new_namePiloto").value = "";
        document.getElementById("new_equipoPiloto").value = "";
        document.getElementById("new_experiencePiloto").value = "";
        document.getElementById("new_imgPiloto").value = "";

        closePopup();  // Cerrar el popup
        loadPilots();  // Recargar la lista de pilotos
    } catch (error) {
        console.error("Error al agregar el piloto:", error);
        alert("Hubo un problema al agregar el piloto");
    }
}

// Para guardar la info del popup cuando se le da click al botón "Guardar"
document.getElementById("btnGuardar").addEventListener("click", addPilotInfo);

// Función para cargar la lista de pilotos en la interfaz
async function loadPilots() {
    try {
        const pilots = await getPilots();
        const pilotosCard = document.getElementById("pilotosCard");

        pilotosCard.innerHTML = "";

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
document.addEventListener("DOMContentLoaded", () => {
    // Mostrar el popup al hacer clic en "Agregar"
    document.getElementById("btnAgregar").addEventListener("click", openPopup);
    document.getElementById("btnCerrar").addEventListener("click", closePopup);
});

// Para mostrar el popup cuando se le da click al botón "Editar"
document.getElementById("btnEditar").addEventListener("click", () => {
    openPopup2();
    loadPilotsForSelect();  // Llenar el select con los pilotos al abrir el popup
});

// Para cerrar el popup cuando se le da click al botón "Cerrar" (de editar)
document.getElementById("btnCerrar2").addEventListener("click", closePopup2);

// Función para cargar los pilotos en el select
async function loadPilotsForSelect() {
    try {
        const pilots = await getPilots();
        const selectPiloto = document.getElementById("select_piloto");

        selectPiloto.innerHTML = "<option value=''>Seleccione un piloto</option>";

        pilots.forEach((pilot) => {
            const option = document.createElement("option");
            option.value = pilot.id;
            option.textContent = pilot.nombre;
            selectPiloto.appendChild(option);
        });
    } catch (error) {
        console.error("Error al cargar los pilotos para el select:", error);
    }
}

// Función para cargar los detalles del piloto seleccionado
async function loadPilotoDetails() {
    const select = document.getElementById("select_piloto");
    const pilotoId = select.value;

    if (pilotoId) {
        try {
            const pilots = await getPilots();
            const selectedPilot = pilots.find(pilot => pilot.id === Number(pilotoId));  // Asegurando que ambos tengan el mismo tipo

            if (selectedPilot) {
                document.getElementById("edit_namePiloto").value = selectedPilot.nombre;
                document.getElementById("edit_equipoPiloto").value = selectedPilot.equipo;
                document.getElementById("edit_experiencePiloto").value = selectedPilot.experiencia;
                document.getElementById("edit_imgPiloto").value = selectedPilot.img;
            } else {
                console.error("Piloto no encontrado.");
            }
        } catch (error) {
            console.error("Error al cargar detalles del piloto:", error);
            alert("No se pudieron cargar los detalles del piloto.");
        }
    } else {
        document.getElementById("edit_namePiloto").value = '';
        document.getElementById("edit_equipoPiloto").value = '';
        document.getElementById("edit_experiencePiloto").value = '';
        document.getElementById("edit_imgPiloto").value = '';
    }
}

// Función para actualizar la información del piloto
async function updatePilotInfo() {
    const pilotoId = document.getElementById("select_piloto").value;
    if (!pilotoId) {
        alert("Por favor, selecciona un piloto para editar.");
        return;  // Retornar si no se selecciona piloto
    }

    const nombrePilot = document.getElementById("edit_namePiloto").value.trim();
    const equipoPilot = document.getElementById("edit_equipoPiloto").value.trim();
    const experiencePilot = document.getElementById("edit_experiencePiloto").value.trim();
    const imgPilot = document.getElementById("edit_imgPiloto").value.trim();

    if (!nombrePilot || !equipoPilot || !experiencePilot || !imgPilot) {
        alert("Todos los campos son obligatorios.");
        return;  // Retornar si algún campo está vacío
    }

    const updatedPilot = {
        nombre: nombrePilot,
        equipo: equipoPilot,
        experiencia: experiencePilot,
        img: imgPilot
    };

    try {
        const response = await fetch(`${BASE_URL}/${pilotoId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedPilot)
        });

        if (!response.ok) {
            throw new Error("Error al actualizar el piloto en JSON Server");
        }

        alert("Piloto actualizado exitosamente");
        closePopup2();
        loadPilots();  // Recargar la lista de pilotos
    } catch (error) {
        console.error("Error al actualizar el piloto:", error);
        alert("Hubo un problema al actualizar el piloto");
    }
    

    function openPopup() {
        const popupElement = document.querySelector('agregar-piloto-popup'); // Seleccionamos el Web Component
        if (popupElement) {
            popupElement.open();  // Usamos el método open() del Web Component
        } else {
            console.error("El Web Component 'agregar-piloto-popup' no se encuentra en el DOM.");
        }
    }

}

// Para guardar la info del popup cuando se le da click al botón "Guardar" (de editar)
document.getElementById("btnGuardar2").addEventListener("click", updatePilotInfo);

// Para cargar los detalles del piloto seleccionado
document.getElementById("select_piloto").addEventListener("change", loadPilotoDetails);
