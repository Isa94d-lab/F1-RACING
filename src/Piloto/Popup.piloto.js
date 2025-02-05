class Popup_piloto extends HTMLElement {
    constructor() {
        super();
        this.BASE_URL = "http://localhost:3000/pilots";
        this.attachShadow({mode: 'open'}); // Asegúrate de tener un shadow DOM
    }

    render(pilot) {
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

                .cuadrado select,
                .cuadrado input {
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
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
            <div class="conteiner_pilot" id="conteiner_pilot">
                <div class="cuadrado">
                    <h4>${pilot.nombre}</h4>
                    <p>Equipo: ${pilot.equipo}</p>
                    <p>Experiencia: ${pilot.experiencia}</p>
                    <p>Imagen de piloto: <img src="${pilot.img}" alt="Imagen de piloto" width="100px"></p>
                    <button id="btnCerrar">Cerrar</button>
                </div>
            </div>
        `;
        // Event listener para cerrar el popup
        this.shadowRoot.querySelector('#btnCerrar').addEventListener('click', () => {
            this.close();
        });
    }

    open() {
        this.shadowRoot.querySelector('#conteiner_pilot').style.display = 'flex';
    }

    close() {
        this.shadowRoot.querySelector('#conteiner_pilot').style.display = 'none';
    }
}

// Definir el componente personalizado
customElements.define('agregar-piloto-popup', Popup_piloto);
