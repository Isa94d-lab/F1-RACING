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
                    z-index: 1000;
                    color: black;
                }

                #conteiner_pilot.show {
                    display: flex;
                }

                .cuadrado-popup {
                    background: white;
                    border-radius: 10px;
                    width: 500px;
                    height: 500px;
                    display: flex;
                    justify-content: center;
                    flex-direction: column;
                    align-items: center;  
                    z-index: 1000;
                }

                .cuadrado-popup button {
                    padding: 10px 15px;
                    background-color: #a10b0b;
                    color: white;
                    border: none;
                    cursor: pointer;
                    border-radius: 5px;
                    margin-top: 10px;
                }

                .cuadrado-popup button:hover {
                    background-color: #990a0a;
                }
            
                .infocard{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    width: 70%;
                }

                #pilotImg{
                    width: 250px;
                    height: 250px;

                    }
                img.bandera{
                    height:80px;
                    border-radius: 10px;
                }
                .info{
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;
                    align-items: center;
                    width: 70%;
                }

            </style>
            <div id="conteiner_pilot">
                <div class="cuadrado-popup">
                <div class=infocard>
                    <h2 id="pilotName"></h2>
                    <img id="pilotFlag" alt="Bandera del piloto">
                </div>
                <img id="pilotImg" alt="Imagen de piloto">
                <div class=info>
                    <p id="pilotExperience"></p>
                    <p id="pilotTeam"></p>
                </div>

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
        this.shadowRoot.querySelector("#pilotExperience").textContent = `Rol: ${pilot.experiencia}`;
        this.shadowRoot.querySelector("#pilotImg").src = pilot.img;
        this.shadowRoot.querySelector("#pilotFlag").src = pilot.bandera;  // Aquí asignas la bandera

        // Mostrar el popup
        this.shadowRoot.querySelector("#conteiner_pilot").classList.add("show");
    }

    close() {
        this.shadowRoot.querySelector("#conteiner_pilot").classList.remove("show");
    }
}

customElements.define('piloto-popup', Popup_piloto);
