class Popup_piloto extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <style>
                #conteiner_pilot {
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

                #conteiner_pilot.show {
                    display: flex;
                }

                .cuadrado {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    width: 500px;
                    text-align: center;
                }

                .cuadrado img {
                    max-width: 100px;
                    border-radius: 10px;
                }

                .cuadrado button {
                    padding: 10px 15px;
                    background-color: #a10b0b;
                    color: white;
                    border: none;
                    cursor: pointer;
                    border-radius: 5px;
                    margin-top: 10px;
                }

                .cuadrado button:hover {
                    background-color: #990a0a;
                }
            </style>
            <div id="conteiner_pilot">
                <div class="cuadrado">
                    <div class="title">
                        <h4 id="pilotName"></h4>
                        <img id="pilotBandera" alt="Bandera de piloto">
                    </div>
                    <p id="pilotTeam"></p>
                    <p id="pilotExperience"></p>
                    <p>Imagen de piloto: 
                        <img id="pilotImg" alt="Imagen de piloto">
                    </p>
                    <button id="btnCerrar">Cerrar</button>
                </div>
            </div>
        `;

        // Asegurarse de que el botón de cerrar esté disponible antes de agregar el evento
        const btnCerrar = this.shadowRoot.querySelector('#btnCerrar');
        if (btnCerrar) {
            btnCerrar.addEventListener('click', () => this.close());
        } else {
            console.error("No se encontró el botón de cerrar.");
        }
    }

    open(pilot) {
        const pilotNameElement = this.shadowRoot.querySelector("#pilotName");

        if (!pilotNameElement) {
            console.error("El shadowRoot no está listo o el elemento #pilotName no se encuentra.");
            return; // Salir si no se encuentra el elemento
        }

        // Asignar los valores del piloto al popup
        pilotNameElement.textContent = pilot.nombre;
        this.shadowRoot.querySelector("#pilotTeam").textContent = `Equipo: ${pilot.equipo}`;
        this.shadowRoot.querySelector("#pilotExperience").textContent = `Experiencia: ${pilot.experiencia}`;
        this.shadowRoot.querySelector("#pilotImg").src = pilot.img;
        this.shadowRoot.querySelector("#pilotBandera").src = pilot.bandera;
        
        // Mostrar el popup
        this.shadowRoot.querySelector("#conteiner_pilot").classList.add("show");
    }

    close() {
        this.shadowRoot.querySelector("#conteiner_pilot").classList.remove("show");
    }
}

// Definir el custom element
customElements.define('piloto-popup', Popup_piloto);

// Función para cargar los pilotos
async function loadPilots() {
    try {
        const pilots = await getPilots();
        const pilotosCard = document.getElementById("pilotosCard");

        if (!pilotosCard) {
            console.error("Error: No se encontró el elemento con id 'pilotosCard'.");
            return;
        }

        // Limpiar la lista antes de actualizar
        pilotosCard.innerHTML = "";

        // Asegurarse de que solo haya un popup en el body
        let popup = document.querySelector("piloto-popup");
        if (!popup) {
            popup = document.createElement("piloto-popup");
            document.body.appendChild(popup);
        }

        // Recorrer los pilotos para crear los elementos visuales
        pilots.forEach((pilot) => {
            const pilotElement = document.createElement("div");
            pilotElement.classList.add("pilot-card");
            pilotElement.innerHTML = `
            <div class="conteiner_pilot">
                <div class="cuadrado">
                    <div class="title">
                        <h3>${pilot.nombre}</h3>
                        <img src="${pilot.bandera}" alt="Bandera de ${pilot.nombre}">
                    </div>
                    <p>Equipo: ${pilot.equipo}</p>
                    <p>Experiencia: ${pilot.experiencia}</p>
                    <img src="${pilot.img}" alt="Imagen de ${pilot.nombre}" style="width: 100px; height: 100px;">
                </div>
            </div>
            `;

            // Agregar evento de clic para abrir el popup con la información del piloto
            pilotElement.addEventListener("click", () => {
                popup.open(pilot); // Pasamos el piloto al popup
            });

            // Añadir la tarjeta de piloto al contenedor
            pilotosCard.appendChild(pilotElement);
        });
    } catch (error) {
        console.error("Error al cargar los pilotos:", error);
    }
}
