class TrackEditPopup extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `

        <style>
            #popup,  #popup2 {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                justify-content: center;
                align-items: center;
            }
    
            .popupBox {
                background: white;
                padding: 20px;
                border-radius: 10px;
                width: 500px;
                text-align: center;
                line-height: 1.5; /* 1.5 veces el tamaño de la fuente */
            }
    
            .popupBox input {
                width: 100%;
                padding: 8px;
                margin-bottom: 10px;
                border: 1px solid #ddd;
                border-radius: 5px;
            }
    
            .popupBox button {
                padding: 10px 15px;
                background-color: #a10b0b;
                color: white;
                border: none;
                cursor: pointer;
                border-radius: 5px;
                margin-top: 10px;
            }
    
            .popupBox button:hover {
                background-color: #990a0a;
            }
    
            .popupBox button.close {
                background-color: #f44336;
            }
    
            .popupBox button.close:hover {
                background-color: #d32f2f;
            }
    
            /* Botón para abrir el popup */
            .addPista {
                padding: 10px 15px;
                background-color: #d80202;
                color: white;
                border: none;
                cursor: pointer;
                margin-bottom: 0px;
                font-weight: 600;
            }
    
            .addPista:hover {
                background-color: #910808;
            }
            </style>

            <div id="popup2">
                <div class="popupBox">
                    <h3>Editar Pista</h3>
                    <label for="select_pista">Seleccionar Pista:</label>
                    <select id="select_pista">
                        <option value="">Seleccione una pista</option>
                    </select><br>
                    <label for="edit_namePista">Nombre:</label>
                    <input type="text" id="edit_namePista" placeholder="Nombre de la pista">
                    <label for="edit_descriptionPista">Descripción:</label>
                    <input type="text" id="edit_descriptionPista" placeholder="Descripción de la pista">
                    <label for="edit_imgPista">Imagen (URL):</label>
                    <input type="text" id="edit_imgPista" placeholder="URL de la imagen de la pista">
                    <label for="edit_countryImgPista">Pais:</label>
                    <input type="text" id="edit_countryImgPista" placeholder="URL de la imagen del país">
                    <label for="edit_firstGrandPrixPista">Primer Gran Premio:</label>
                    <input type="number" id="edit_firstGrandPrixPista" placeholder="Año del primer Gran Premio">
                    <label for="edit_numberPista">Número de vueltas:</label>
                    <input type="number" id="edit_numberPista" placeholder="Número de vueltas de la carrera">
                    <label for="edit_circuitLengthPista">Longitud del circuito (km):</label>
                    <input type="number" id="edit_circuitLengthPista" placeholder="Longitud de la pista en km">
                    <label for="edit_raceDistancePista">Distancia de carrera (km):</label>
                    <input type="number" id="edit_raceDistancePista" placeholder="Distancia total de la carrera">
                    <button id="saveEdits">Guardar Cambios</button>
                    <button id="closePopup2">Cerrar</button>
                </div>
            </div>
        `;
        function closePopup2() {
            document.getElementById("popup2").style.display = "none";
        }

        // Función para cargar las opciones en el select
        async function loadPistas() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("Error al cargar las pistas");

                const pistas = await response.json();
                const select = document.getElementById("select_pista");
                select.innerHTML = '<option value="">Seleccione una pista</option>'; // Limpiar opciones previas

                pistas.forEach(pista => {
                    const option = document.createElement("option");
                    option.value = pista.id;
                    option.textContent = pista.nombre; // Asegúrate de usar el nombre correcto del campo
                    select.appendChild(option);
                });
            } catch (error) {
                console.error("Error:", error);
                alert("No se pudieron cargar las pistas");
            }
        }

        // Función para abrir el Popup de Edición
        function openPopup2() {
            document.getElementById("popup2").style.display = "flex";
            loadPistas(); // Cargar las pistas cuando se abre el popup
        }


        // Cargar los detalles de la pista seleccionada
        async function loadPistaDetails() {
            const select = document.getElementById("select_pista");
            const pistaId = select.value;

            if (pistaId) {
                try {
                    const response = await fetch(`${API_URL}/${pistaId}`);
                    if (!response.ok) throw new Error("No se pudo obtener la pista");

                    const pista = await response.json();

                    document.getElementById("edit_namePista").value = pista.nombre;
                    document.getElementById("edit_descriptionPista").value = pista.descripcion;
                    document.getElementById("edit_imgPista").value = pista.img;
                    document.getElementById("edit_countryImgPista").value = pista.pais;
                    document.getElementById("edit_firstGrandPrixPista").value = pista.primerGP;
                    document.getElementById("edit_numberPista").value = pista.numeroVueltas;
                    document.getElementById("edit_circuitLengthPista").value = pista.longitud;
                    document.getElementById("edit_raceDistancePista").value = pista.distancia;
                } catch (error) {
                    console.error("Error al cargar detalles de la pista:", error);
                    alert("No se pudieron cargar los detalles de la pista.");
                }
            }
        }


        // Función para guardar los cambios
        async function saveEdits() {
            const pistaId = document.getElementById("select_pista").value;

            if (pistaId) {
                const updatedPista = {
                    nombre: document.getElementById("edit_namePista").value,
                    descripcion: document.getElementById("edit_descriptionPista").value,
                    img: document.getElementById("edit_imgPista").value,
                    pais: document.getElementById("edit_countryImgPista").value,
                    primerGP: document.getElementById("edit_firstGrandPrixPista").value,
                    numeroVueltas: document.getElementById("edit_numberPista").value,
                    longitud: document.getElementById("edit_circuitLengthPista").value,
                    distancia: document.getElementById("edit_raceDistancePista").value
                };

                try {
                    const response = await fetch(`${API_URL}/${pistaId}`, {
                        method: "PUT", // También podrías usar PATCH si solo actualizas algunos campos
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(updatedPista)
                    });

                    if (!response.ok) throw new Error("No se pudo actualizar la pista");

                    alert("Pista actualizada con éxito");
                    closePopup2();
                    loadLeftTable(); // Recargar la tabla izquierda con los cambios
                } catch (error) {
                    console.error("Error al actualizar la pista:", error);
                    alert("No se pudieron guardar los cambios.");
                }
            }
        }
    }
}

customElements.define('track-edit-popup', TrackEditPopup);
