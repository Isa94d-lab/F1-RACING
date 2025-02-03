class TrackAddPopup extends HTMLElement {
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
            <div id="popup">
                <div class="popupBox">
                    <h3>Agregar Nueva Pista</h3>
                    <label>Nombre: <input type="text" id="new_namePista" placeholder="Ingresa nombre de nueva pista"></label>
                    <label>Descripción: <input type="text" id="new_descriptionPista" placeholder="Ingresa una pequeña descripción"></label>
                    <label>Imagen (URL): <input type="text" id="new_imgPista" placeholder="URL de la imagen de la pista"></label>
                    <label>Pais: <input type="text" id="new_countryImgPista" placeholder="URL de la imagen del pais"></label>
                    <label>Primer Gran Premio: <input type="number" id="new_firstGrandPrixPista" placeholder="Año del primer Gran Premio"></label>
                    <label>Numero de vueltas: <input type="number" id="new_numberPista" placeholder="Numero de vueltas de la carrera"></label>
                    <label>Longitud del circuito (km): <input type="number" id="new_circuitLengthPista" placeholder="Longitud de la pista en km"></label>
                    <label>Distancia de carrera (km): <input type="number" id="new_raceDistancePista" placeholder="Distancia total de la carrera"></label>
                    <button id="addBtn">Agregar</button>
                    <button id="closeBtn">Cerrar</button>
                </div>
            </div>
        `;
        // URL del JSON Server
        const API_URL = "http://localhost:3000/pistas";
    
        // Función para abrir el popup
        function openPopup() {
            document.getElementById('popup').style.display = 'flex';
        }
    
        // Función para cerrar el popup
        function closePopup() {
            document.getElementById('popup').style.display = 'none';
        }
    
        // Función para agregar una pista al JSON Server y actualizar la tabla izquierda
        async function addInfo() {
            const nombre = document.getElementById('new_namePista').value;
            const descripcion = document.getElementById('new_descriptionPista').value;
            const img = document.getElementById('new_imgPista').value;
            const pais = document.getElementById('new_countryImgPista').value;
            const primerGP = document.getElementById('new_firstGrandPrixPista').value;
            const numeroVueltas = document.getElementById('new_numberPista').value;
            const longitud = document.getElementById('new_circuitLengthPista').value;
            const distancia = document.getElementById('new_raceDistancePista').value;
    
            const pista = { nombre, descripcion, img, pais, primerGP, numeroVueltas, longitud, distancia };
    
            try {
                await fetch(API_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(pista)
                });
                loadLeftTable();
                closePopup();
            } catch (error) {
                console.error("Error al agregar la pista:", error);
                alert("No se pudo agregar la pista");
            }
        }
    
        // Cargar la tabla izquierda con solo los nombres
        async function loadLeftTable() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) throw new Error("Error al cargar datos");

                const pistas = await response.json();
                const tableBody = document.querySelector('.left-table tbody');
                tableBody.innerHTML = ""; // Limpiar la tabla antes de agregar las filas


                pistas.forEach(pista => {
                    const row = document.createElement('tr');
                    row.innerHTML = `<td>${pista.nombre}</td>`;
                    row.onclick = () => showDetails(pista);
                    tableBody.appendChild(row);
                });
            } catch (error) {
                console.error("Error:", error);
                alert("No se pudieron cargar las pistas");
            }
        }

    }
}
customElements.define('track-form-popup', TrackAddPopup);