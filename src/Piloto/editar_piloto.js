console.log('Antes de la importación');
import { deletePiloto } from './eliminar_piloto.js';
console.log('Después de la importación');

class EditarPilotoPopup extends HTMLElement {
    constructor() {
        super();
        this.BASE_URL = "http://localhost:3000/pilots";
        this.render();
    }

    render() {
        this.innerHTML = `
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
                }

                #popup2.show {
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
            <div id="popup2">
                <div class="cuadrado">
                    <h3>Editar Piloto</h3>

                    <label for="select_piloto">Seleccionar Piloto:</label>
                    <select id="select_piloto">
                        <option value="">Seleccione un piloto...</option>
                    </select>

                    <label for="edit_namePiloto">Nombre:</label>
                    <input type="text" id="edit_namePiloto" placeholder="Nombre del Piloto">

                    <label for="edit_equipoPiloto">Equipo:</label>
                    <input type="text" id="edit_equipoPiloto" placeholder="Nombre del Equipo">

                    <label for="edit_experiencePiloto">Experiencia:</label>
                    <input type="text" id="edit_experiencePiloto" placeholder="Experiencia">

                    <label for="edit_imgPiloto">Imagen:</label>
                    <input type="text" id="edit_imgPiloto" placeholder="URL de imagen del piloto">

                    <label for="edit_banderaPiloto">Bandera:</label>
                    <input type="text" id="edit_banderaPiloto" placeholder="Ingresa URL de bandera del piloto">

                    <button id="btnGuardar2">Guardar Cambios</button>
                    <button id="btnCerrar2">Cerrar</button>
                    <button id="btnEliminar">Eliminar</button>
                </div>
            </div>
        `;

        // Asignar event listeners
        this.querySelector('#select_piloto').addEventListener('change', () => this.loadPilotDetails());
        this.querySelector('#btnGuardar2').addEventListener('click', () => this.updatePilot());
        this.querySelector('#btnCerrar2').addEventListener('click', () => this.close());
        
        // Ahora el botón de "Eliminar" ejecutará la función importada
        this.querySelector('#btnEliminar').addEventListener('click', () => {
            const pilotId = this.querySelector('#select_piloto').value;  // Obtener el ID del piloto seleccionado
            if (!pilotId) {
                alert('Por favor, seleccione un piloto para eliminar');
                return;  // Si no hay piloto seleccionado, no hacer nada
            }
            
            // Llamar a la función deletePiloto pasando el ID y la URL base
            deletePiloto(pilotId, this.BASE_URL);  // Asegúrate de que 'this.BASE_URL' esté correctamente definido
        });
        
        const pilotId = this.querySelector('#select_piloto').value;
        console.log('ID del piloto seleccionado:', pilotId);  // Verifica el ID

    }

    async loadPilots() {
        try {
            const response = await fetch(this.BASE_URL);
            const pilots = await response.json();
            const select = this.querySelector('#select_piloto');
            
            // Limpiar opciones existentes
            select.innerHTML = '<option value="">Seleccione un piloto...</option>';
            
            // Agregar nuevas opciones
            pilots.forEach(pilot => {
                const option = document.createElement('option');
                option.value = pilot.id;
                option.textContent = pilot.nombre;
                select.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar los pilotos:', error);
        }
    }

    async loadPilotDetails() {
        const pilotId = this.querySelector('#select_piloto').value;
        if (!pilotId) return;

        try {
            const response = await fetch(`${this.BASE_URL}/${pilotId}`);
            const pilot = await response.json();

            this.querySelector('#edit_namePiloto').value = pilot.nombre;
            this.querySelector('#edit_equipoPiloto').value = pilot.equipo;
            this.querySelector('#edit_experiencePiloto').value = pilot.experiencia;
            this.querySelector('#edit_imgPiloto').value = pilot.img;
            this.querySelector('#edit_banderaPiloto').value = pilot.bandera;
        } catch (error) {
            console.error('Error al cargar los detalles del piloto:', error);
        }
    }

    async updatePilot() {
        const pilotId = this.querySelector('#select_piloto').value;
        if (!pilotId) {
            alert('Por favor, seleccione un piloto para editar');
            return;
        }

        const updatedPilot = {
            nombre: this.querySelector('#edit_namePiloto').value,
            equipo: this.querySelector('#edit_equipoPiloto').value,
            experiencia: this.querySelector('#edit_experiencePiloto').value,
            img: this.querySelector('#edit_imgPiloto').value,
            bandera: this.querySelector('#edit_banderaPiloto').value,
        };

        try {
            const response = await fetch(`${this.BASE_URL}/${pilotId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPilot)
            });

            if (!response.ok) throw new Error('Error al actualizar el piloto');

            alert('Piloto actualizado exitosamente');
            this.close();
            // Disparar un evento para notificar que se actualizó un piloto
            window.dispatchEvent(new CustomEvent('pilotUpdated'));
        } catch (error) {
            console.error('Error al actualizar el piloto:', error);
            alert('Error al actualizar el piloto');
        }
    }

    open() {
        this.querySelector('#popup2').style.display = 'flex';
        this.loadPilots(); // Cargar la lista de pilotos cuando se abre el popup
    }

    close() {
        this.querySelector('#popup2').style.display = 'none';
        // Limpiar los campos
        this.querySelector('#select_piloto').value = '';
        this.querySelector('#edit_namePiloto').value = '';
        this.querySelector('#edit_equipoPiloto').value = '';
        this.querySelector('#edit_experiencePiloto').value = '';
        this.querySelector('#edit_imgPiloto').value = '';
        this.querySelector('#edit_banderaPiloto').value = '';
    }

    

    
    
}


customElements.define('editar-piloto-popup', EditarPilotoPopup);
