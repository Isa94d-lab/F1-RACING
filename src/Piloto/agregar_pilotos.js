class AgregarPilotoPopup extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    render() {
        this.innerHTML = `
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
                }

                #popup.show {
                    display: flex; /* Asegúrate de que el popup se vea cuando la clase 'show' esté aplicada */
                }

                .cuadrado {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    width: 500px;
                    text-align: center;
                }
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
            <div id="popup">
            <div class="cuadrado">
                    <h3>Agregar Nuevo Piloto</h3>
            
                    <generate-code id="generateCode"></generate-code>
                    <script src="generateCode.js"></script>
            
            
            
                    <label for="new_namePiloto">Nombre:</label>
                    <input type="text" id="new_namePiloto" placeholder="Ingresa nombre de Piloto">
            
                    <label for="new_equipoPiloto">Equipo:</label>
                    <input type="text" id="new_equipoPiloto" placeholder="Ingresa nombre del Equipo">
            
                    <label for="new_experiencePiloto">Rol:</label>
                    <input type="text" id="new_experiencePiloto" placeholder="Ingresa el rol">
            
                    <label for="new_imgPiloto">Imagen:</label>
                    <input type="text" id="new_imgPiloto" placeholder="Ingresa URL de imagen del piloto">

                    <label for="new_banderaPiloto">Bandera:</label>
                    <input type="text" id="new_banderaPiloto" placeholder="Ingresa URL de bandera del piloto">
            
                    <button id="btnGuardar">Guardar</button>
                    <button id="btnCerrar">Cerrar</button>
                </div>
            </div>
        `;

        // Event listener para cerrar el popup
        this.shadowRoot.querySelector('#btnCerrar').addEventListener('click', () => {
            this.close();
        });

        // Event listener para guardar el piloto
        this.shadowRoot.querySelector('#btnGuardar').addEventListener('click', () => {
            this.savePiloto();
        });
    }

    open() {
        this.shadowRoot.querySelector('#popup').style.display = 'flex';
    }

    close() {
        this.shadowRoot.querySelector('#popup').style.display = 'none';
    }

    savePiloto() {
        const name = this.shadowRoot.querySelector('#new_namePiloto').value;
        const equipo = this.shadowRoot.querySelector('#new_equipoPiloto').value;
        const experience = this.shadowRoot.querySelector('#new_experiencePiloto').value;
        const img = this.shadowRoot.querySelector('#new_imgPiloto').value;
        const bandera = this.shadowRoot.querySelector('#new_banderaPiloto').value;

        // Lógica para guardar el piloto (aquí se puede integrar con un servidor o almacenamiento local)
        console.log('Piloto guardado:', { name, equipo, experience, img, bandera });

        // Limpiar los campos después de guardar
        this.shadowRoot.querySelector('#new_namePiloto').value = '';
        this.shadowRoot.querySelector('#new_equipoPiloto').value = '';
        this.shadowRoot.querySelector('#new_experiencePiloto').value = '';
        this.shadowRoot.querySelector('#new_imgPiloto').value = '';
        this.shadowRoot.querySelector('#new_banderaPiloto').value = '';

        this.close();
    }
}

// Definir el componente personalizado
customElements.define('agregar-piloto-popup', AgregarPilotoPopup);

//-------------------------------------------------------------------------------------------------------------