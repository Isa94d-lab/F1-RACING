class TrackAddPopup extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        shadow.innerHTML = `
            <style>
            #popup {
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
                line-height: 1.5;
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
            
            <div id="popup">
                <div class="popupBox">
                    <h3>Agregar Nueva Pista</h3>
                    <label>Nombre: <input type="text" id="new_namePista" placeholder="Ingresa nombre de nueva pista"></label>
                    <label>Descripción: <input type="text" id="new_descriptionPista" placeholder="Ingresa una pequeña descripción"></label>
                    <label>Imagen (URL): <input type="text" id="new_imgPista" placeholder="URL de la imagen de la pista"></label>
                    <label>País: <input type="text" id="new_countryImgPista" placeholder="URL de la imagen del país"></label>
                    <label>Primer Gran Premio: <input type="number" id="new_firstGrandPrixPista" placeholder="Año del primer Gran Premio"></label>
                    <label>Número de vueltas: <input type="number" id="new_numberPista" placeholder="Número de vueltas de la carrera"></label>
                    <label>Longitud del circuito (km): <input type="number" id="new_circuitLengthPista" placeholder="Longitud de la pista en km"></label>
                    <label>Distancia de carrera (km): <input type="number" id="new_raceDistancePista" placeholder="Distancia total de la carrera"></label>
                    <button id="addBtn">Agregar</button>
                    <button id="closeBtn" class="close">Cerrar</button>
                </div>
            </div>
        `;

        this.API_URL = "http://localhost:3000/pistas";

        this.shadowRoot.getElementById('addBtn').addEventListener('click', () => this.addInfo());
        this.shadowRoot.getElementById('closeBtn').addEventListener('click', () => this.closePopup());

        // Escuchar evento del botón externo
        document.addEventListener('DOMContentLoaded', () => {
            document.getElementById('openPopupBtn').addEventListener('click', () => this.openPopup());
        });
    }

    openPopup() {
        this.shadowRoot.getElementById('popup').style.display = 'flex';
    }

    closePopup() {
        this.shadowRoot.getElementById('popup').style.display = 'none';
    }

    async addInfo() {
        const shadow = this.shadowRoot;

        const nombre = shadow.getElementById('new_namePista').value;
        const descripcion = shadow.getElementById('new_descriptionPista').value;
        const img = shadow.getElementById('new_imgPista').value;
        const pais = shadow.getElementById('new_countryImgPista').value;
        const primerGP = shadow.getElementById('new_firstGrandPrixPista').value;
        const numeroVueltas = shadow.getElementById('new_numberPista').value;
        const longitud = shadow.getElementById('new_circuitLengthPista').value;
        const distancia = shadow.getElementById('new_raceDistancePista').value;

        const pista = { nombre, descripcion, img, pais, primerGP, numeroVueltas, longitud, distancia };

        try {
            const response = await fetch(this.API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(pista)
            });

            if (!response.ok) throw new Error("Error al agregar la pista");

            console.log("Pista agregada correctamente");
            this.closePopup();
        } catch (error) {
            console.error("Error al agregar la pista:", error);
            alert("No se pudo agregar la pista");
        }
    }
    
}

customElements.define('track-form-popup', TrackAddPopup);
