class AgregarPilotoPopup extends HTMLElement {
    constructor() {
        super();
        this.render();
    }

    async render() {
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
                    display: flex; 
                }

                .cuadrado-agg {
                    background: white;
                    padding: 20px;
                    border-radius: 10px;
                    width: 50%;
                    higth 100%
                    text-align: center;
                    
                }
                .cuadrado-agg input, .cuadrado-agg select {
                    width: 100%;
                    padding: 8px;
                    margin-bottom: 10px;
                    border: 1px solid #ddd;
                    border-radius: 5px;
                }
                .cuadrado-agg button {
                    padding: 10px 15px;
                    background-color: #a10b0b;
                    color: white;
                    border: none;
                    cursor: pointer;
                    border-radius: 5px;
                    margin-top: 10px;
                }
                .cuadrado-agg button:hover {
                    background-color: #990a0a;
                }
            </style>
            <div id="popup">
                <div class="cuadrado-agg">
                    <h3>Agregar Nuevo Piloto</h3>

                    <label for="new_namePiloto">Nombre:</label>
                    <input type="text" id="new_namePiloto" placeholder="Ingresa nombre de Piloto">
            
                    <label for="new_equipoPiloto">Equipo:</label>
                    <select id="new_equipoPiloto">
                        <option value="">Seleccione un equipo</option>
                    </select> 

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

        this.loadEquipos();

        this.querySelector('#btnCerrar').addEventListener('click', () => {
            this.close();
        });

         // Prevención de duplicados al guardar
        this.querySelector('#btnGuardar').addEventListener('click', async () => {
            // Evitar múltiples envíos
            if (this.isSaving) return; // Si ya se está guardando, no hacemos nada
            this.isSaving = true; // Indicamos que estamos guardando
            await this.savePiloto();
            this.isSaving = false; // Habilitamos el guardado de nuevo después de completar
        });
    }

    async loadEquipos() {
        try {
            const response = await fetch('http://localhost:3000/equipos');
            const equipos = await response.json();
            
            console.log("Equipos cargados desde el servidor:", equipos); // 👀 Log para ver qué llega
            
            const select = this.querySelector('#new_equipoPiloto');
            select.innerHTML = '<option value="">Seleccione un equipo</option>'; // Limpiar antes de agregar
    
            equipos.forEach(equipo => {
                const option = document.createElement('option');
                option.value = equipo.nombre;
                option.textContent = equipo.nombre;
                select.appendChild(option);
            });
        } catch (error) {
            console.error('Error cargando los equipos:', error);
        }
    }


    open() {
        this.querySelector('#popup').style.display = 'flex';
    }

    close() {
        this.querySelector('#popup').style.display = 'none';
    }

    async savePiloto() {
        const name = this.querySelector('#new_namePiloto').value.trim();
        const equipo = this.querySelector('#new_equipoPiloto').value.trim();
        const experience = this.querySelector('#new_experiencePiloto').value.trim();
        const img = this.querySelector('#new_imgPiloto').value.trim();
        const bandera = this.querySelector('#new_banderaPiloto').value.trim();
    
        if (!name || !equipo || !experience || !img || !bandera) {
            alert("Por favor, completa todos los campos.");
            this.isSaving = false; // Restablecer estado si no se completan los campos
            return;
        }
    
        const nuevoPiloto = { nombre: name, equipo, experiencia: experience, img, bandera };
    
        try {
            // 1️⃣ Verificar si el piloto ya existe
            const existingPilotoResponse = await fetch('http://localhost:3000/pilots');
            const existingPilotos = await existingPilotoResponse.json();
            const pilotoExistente = existingPilotos.find(p => p.nombre === name);
    
            if (pilotoExistente) {
                alert("El piloto ya existe.");
                this.isSaving = false; // Restablecer estado si el piloto ya existe
                return;
            }
    
            // 2️⃣ Guardar el piloto en "pilots"
            const response = await fetch('http://localhost:3000/pilots', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevoPiloto)
            });
            const responseJson = await response.json();
            if (!response.ok) throw new Error('Error al guardar el piloto');
            console.log('Piloto guardado:', responseJson);
    
            // 3️⃣ Buscar el equipo en "equipos" y actualizar el campo "piloto"
            const equiposResponse = await fetch('http://localhost:3000/equipos');
            const equipos = await equiposResponse.json();

        // Lógica para guardar el piloto (aquí se puede integrar con un servidor o almacenamiento local)
        if (!equiposResponse.ok) throw new Error('Error al cargar equipos');

        const equipoEncontrado = equipos.find(e => e.nombre === equipo);
        if (!equipoEncontrado) {
            console.error("Equipo no encontrado:", equipo);
            this.isSaving = false; // Restablecer estado si no encontramos el equipo
            return;
        }

        console.log("Equipo encontrado:", equipoEncontrado);

        // Asegurarnos de que "piloto" es un arreglo
        const pilotosActuales = Array.isArray(equipoEncontrado.pilotos) ? equipoEncontrado.pilotos : [];

        // Añadir el nuevo piloto al equipo
        pilotosActuales.push(name);

        // Mostrar en consola los pilotos antes de la actualización
        console.log("Pilotos actuales antes de actualizar:", pilotosActuales);

        // Actualizar el equipo con el nuevo piloto
        const equipoActualizado = { ...equipoEncontrado, pilotos: pilotosActuales };

        const updateResponse = await fetch(`http://localhost:3000/equipos/${equipoEncontrado.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(equipoActualizado)
        });

        const updateResponseJson = await updateResponse.json();
        if (!updateResponse.ok) throw new Error('Error al actualizar el equipo');
        
        console.log('Equipo actualizado:', updateResponseJson);

        // 4️⃣ Limpiar los campos y cerrar el popup
        this.querySelector('#new_namePiloto').value = '';
        this.querySelector('#new_equipoPiloto').value = '';
        this.querySelector('#new_experiencePiloto').value = '';
        this.querySelector('#new_imgPiloto').value = '';
        this.querySelector('#new_banderaPiloto').value = '';

        this.close();
    } catch (error) {
        console.error('Error al guardar piloto o actualizar equipo:', error);
        this.isSaving = false; // Restablecer estado en caso de error
    }
}

}

// Definir el componente personalizado
customElements.define('agregar-piloto-popup', AgregarPilotoPopup);