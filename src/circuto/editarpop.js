class TrackEditPopup extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
        <style>
            #popup2 {
                display: none;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.5);
                justify-content: center;
                align-items: center;
                z-index: 1000;
            }
    
            .popupBox {
                background: white;
                padding: 20px;
                border-radius: 10px;
                width: 500px;
                text-align: center;
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
                    <label for="edit_countryImgPista">País:</label>
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
                    <button id="closePopup2" class="close">Cerrar</button>
                </div>
            </div>
        `;

        // Definir API_URL (Asegúrate de cambiar esto por la URL correcta de tu backend)
        this.API_URL = "http://localhost:3000/pistas"; 

        // Asignar eventos correctamente usando shadowRoot
        this.shadowRoot.querySelector("#closePopup2").addEventListener("click", () => this.closePopup2());
        this.shadowRoot.querySelector("#select_pista").addEventListener("change", () => this.loadPistaDetails());
        this.shadowRoot.querySelector("#saveEdits").addEventListener("click", () => this.saveEdits());
    }

    connectedCallback() {
        const editBtn = document.getElementById("editTrackBtn");
        if (editBtn) {
            editBtn.addEventListener("click", () => this.openPopup2());
        }
    
        this.shadowRoot.getElementById("closePopup2").addEventListener("click", () => this.closePopup2());
    }
    

    // Función para abrir el popup
    openPopup2() {
        this.shadowRoot.querySelector("#popup2").style.display = "flex";
        this.loadPistas();
    }

    // Función para cerrar el popup
    closePopup2() {
        this.shadowRoot.querySelector("#popup2").style.display = "none";
    }

    // Cargar las opciones en el select
    async loadPistas() {
        try {
            const response = await fetch(this.API_URL);
            if (!response.ok) throw new Error("Error al cargar las pistas");

            const pistas = await response.json();
            const select = this.shadowRoot.querySelector("#select_pista");
            select.innerHTML = '<option value="">Seleccione una pista</option>'; 

            pistas.forEach(pista => {
                const option = document.createElement("option");
                option.value = pista.id;
                option.textContent = pista.nombre;
                select.appendChild(option);
            });
        } catch (error) {
            console.error("Error:", error);
            alert("No se pudieron cargar las pistas");
        }
    }

    // Cargar los detalles de la pista seleccionada
    async loadPistaDetails() {
        const select = this.shadowRoot.querySelector("#select_pista");
        const pistaId = select.value;

        if (pistaId) {
            try {
                const response = await fetch(`${this.API_URL}/${pistaId}`);
                if (!response.ok) throw new Error("No se pudo obtener la pista");

                const pista = await response.json();

                this.shadowRoot.querySelector("#edit_namePista").value = pista.nombre;
                this.shadowRoot.querySelector("#edit_descriptionPista").value = pista.descripcion;
                this.shadowRoot.querySelector("#edit_imgPista").value = pista.img;
                this.shadowRoot.querySelector("#edit_countryImgPista").value = pista.pais;
                this.shadowRoot.querySelector("#edit_firstGrandPrixPista").value = pista.primerGP;
                this.shadowRoot.querySelector("#edit_numberPista").value = pista.numeroVueltas;
                this.shadowRoot.querySelector("#edit_circuitLengthPista").value = pista.longitud;
                this.shadowRoot.querySelector("#edit_raceDistancePista").value = pista.distancia;
            } catch (error) {
                console.error("Error al cargar detalles de la pista:", error);
                alert("No se pudieron cargar los detalles de la pista.");
            }
        }
    }

    // Guardar cambios
    async saveEdits() {
        const pistaId = this.shadowRoot.querySelector("#select_pista").value;

        if (pistaId) {
            const updatedPista = {
                nombre: this.shadowRoot.querySelector("#edit_namePista").value,
                descripcion: this.shadowRoot.querySelector("#edit_descriptionPista").value,
                img: this.shadowRoot.querySelector("#edit_imgPista").value,
                pais: this.shadowRoot.querySelector("#edit_countryImgPista").value,
                primerGP: this.shadowRoot.querySelector("#edit_firstGrandPrixPista").value,
                numeroVueltas: this.shadowRoot.querySelector("#edit_numberPista").value,
                longitud: this.shadowRoot.querySelector("#edit_circuitLengthPista").value,
                distancia: this.shadowRoot.querySelector("#edit_raceDistancePista").value
            };

            try {
                const response = await fetch(`${this.API_URL}/${pistaId}`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(updatedPista)
                });

                if (!response.ok) throw new Error("No se pudo actualizar la pista");

                alert("Pista actualizada con éxito");
                this.closePopup2();
            } catch (error) {
                console.error("Error:", error);
                alert("No se pudieron guardar los cambios.");
            }
        }
    }
}

customElements.define('track-edit-popup', TrackEditPopup);
