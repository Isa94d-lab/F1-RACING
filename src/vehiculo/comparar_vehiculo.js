class CompararVehiculos extends HTMLElement {
    constructor() {
        super();
        this.selectedCars = [];
        this.attachShadow({ mode: 'open' });
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = /*html*/`
        <style>
@import url('https://fonts.googleapis.com/css2?family=Exo+2:ital,wght@0,100..900;1,100..900&display=swap');

body {
    background: -webkit-linear-gradient(90deg, #560000,#333333,#000000);
    background: linear-gradient(90deg, #560000,#333333,#000000);
    font-family: "exo 2", serif;
    font-optical-sizing: auto;
    color: white;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }


            .comparison-container {
                padding-top: 4rem;
                background: -webkit-linear-gradient(90deg, #560000,#333333,#000000);
                background: linear-gradient(90deg, #560000,#333333,#000000);;
                border-radius: 12px;
                min-height: 100vh;
        width: 100%;
                color: white;
                position: relative;
            }

            .back-button {
                position: fixed;
                top: 1rem;
                left: 1rem;
                background-color:# c7080c;
                color: white;
                border: none;
                padding: 0.8rem 1.5rem;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 600;
                z-index: 100;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }

            .back-button:hover {
                background: linear-gradient(45deg, #ff2d36, #ff6666);
                box-shadow: 0 0 15px rgba(237, 28, 36, 0.3);
                transform: translateX(-3px);
            }

            h2 {
                color: #ffffff;
                font-size: 2.5rem;
                font-weight: 600;
                margin-bottom: 2rem;
                text-transform: uppercase;
                text-align: center;
                text-shadow: 0 0 10px rgba(237, 28, 36, 0.5);
            }

            .car-selector {
                margin: 0 auto 2rem;
                text-align: center;
                max-width: 500px;
                position: relative;
            }

            select {
                width: 100%;
                padding: 1rem 2rem;
                background: rgba(20, 20, 20, 0.9);
                border: 2px solid rgba(237, 28, 36, 0.3);
                border-radius: 8px;
                color: white;
                font-size: 1rem;
                cursor: pointer;
                transition: all 0.3s ease;
                appearance: none;
            }

            select:hover {
                border-color: #ED1C24;
                box-shadow: 0 0 15px rgba(237, 28, 36, 0.3);
            }

            .car-selector::after {
                content: '▼';
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                color: #ED1C24;
                pointer-events: none;
            }

            .comparison-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
                gap: 2rem;
                padding: 1rem;
            }

            .car-card {
                background: rgba(20, 20, 20, 0.5);
                border-radius: 12px;
                overflow: hidden;
                border: 1px solid rgba(237, 28, 36, 0.2);
                transition: all 0.3s ease;
                opacity: 0;
                animation: fadeIn 0.5s ease forwards;
            }

            @keyframes fadeIn {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            .car-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(237, 28, 36, 0.2);
                border-color: #ED1C24;
            }

            .car-image {
                width: 100%;
                height: 200px;
                object-fit: cover;
                border-bottom: 2px solid rgba(237, 28, 36, 0.3);
            }

            .car-info {
                padding: 1.5rem;
            }

            .car-title {
                color: #ED1C24;
                font-size: 1.5rem;
                font-weight: 600;
                margin: 0 0 1rem;
                text-transform: uppercase;
            }

            .spec-section {
                margin: 1.5rem 0;
            }

            .spec-title {
                color: #ED1C24;
                font-size: 1.2rem;
                margin-bottom: 1rem;
                text-transform: uppercase;
            }

            .spec-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 0.8rem;
            }

            .spec-item {
                background: rgba(30, 30, 30, 0.5);
                padding: 0.8rem;
                border-radius: 6px;
                border: 1px solid rgba(237, 28, 36, 0.2);
            }

            .spec-label {
                color: #cccccc;
                font-size: 0.8rem;
                display: block;
                margin-bottom: 0.3rem;
            }

            .spec-value {
                color: white;
                font-size: 1rem;
                font-weight: 500;
            }

            .remove-button {
                background: linear-gradient(45deg, #ED1C24, #ff4d4d);
                color: white;
                border: none;
                width: 100%;
                padding: 1rem;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 1px;
                font-weight: 600;
            }

            .remove-button:hover {
                background: linear-gradient(45deg, #ff2d36, #ff6666);
                box-shadow: 0 0 15px rgba(237, 28, 36, 0.3);
            }

            @media (max-width: 768px) {
                .comparison-grid {
                    grid-template-columns: 1fr;
                }

                h2 {
                    font-size: 2rem;
                }

                .car-selector {
                    width: 90%;
                }
            }
            a{
    text-decoration:none;
            }
        </style>
        <div class="comparison-container">
            <a class="back-button" href="vehiculosP.html" id="backBtn">← Volver</a>
            <h2>Compara Vehículos</h2>
            <div class="car-selector">
                <select id="carSelect">
                    <option value="">Seleccionar vehículo para comparar</option>
                </select>
            </div>
            <div id="comparisonGrid" class="comparison-grid"></div>
        </div>
        `;

        this.shadowRoot.querySelector('#backBtn').addEventListener('click', () => {
            const buscarVehiculos = document.createElement('buscar-vehiculos');
            this.replaceWith(buscarVehiculos);
        });

        this.fetchVehicles();
    }

    async fetchVehicles() {
        try {
            const response = await fetch('http://localhost:3000/vehiculos'); // Cambia la ruta si es necesario
            const data = await response.json();
            this.vehicles = data;
            this.populateSelect();
        } catch (error) {
            console.error("Error al cargar los datos de vehículos:", error);
        }
    }

    populateSelect() {
        const carSelect = this.shadowRoot.getElementById("carSelect");
        carSelect.innerHTML = '<option value="">Seleccionar vehículo para comparar</option>';

        carSelect.addEventListener("change", (event) => this.displayVehicleInfo(event.target.value));

        this.vehicles.forEach(vehiculo => {
            if (!this.selectedCars.includes(vehiculo.id)) {
                const option = document.createElement("option");
                option.value = vehiculo.id;
                option.textContent = vehiculo.modelo; // Cambia a la propiedad correcta
                carSelect.appendChild(option);
            }
        });
    }

    displayVehicleInfo(vehicleId) {
        if (!vehicleId) return;

        const selectedVehicle = this.vehicles.find(v => v.id === vehicleId);
        const container = this.shadowRoot.getElementById("comparisonGrid");

        if (selectedVehicle && !this.selectedCars.includes(vehicleId)) {
            this.selectedCars.push(vehicleId);

            const card = document.createElement("div");
            card.classList.add("car-card");
            card.dataset.vehicleId = vehicleId;

            card.innerHTML = /*html*/`
                <img src="${selectedVehicle.img}" alt="${selectedVehicle.modelo}" class="car-image">
                <div class="car-info">
                    <h3 class="car-title">${selectedVehicle.modelo}</h3>

                    <div class="spec-section">
                        <h4 class="spec-title">Especificaciones</h4>
                        <div class="spec-grid">
                            <div class="spec-item">
                                <span class="spec-label">Velocidad Máxima</span>
                                <span class="spec-value">${selectedVehicle.velocidad_maxima_kmh} km/h</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">0-100 km/h</span>
                                <span class="spec-value">${selectedVehicle.aceleracion_0_100} s</span>
                            </div>
                        </div>
                    </div>

                    <div class="spec-section">
                        <h4 class="spec-title">Consumo de Combustible</h4>
                        <div class="spec-grid">
                            <div class="spec-item">
                                <span class="spec-label">Seco</span>
                                <span class="spec-value">${selectedVehicle.rendimiento.conduccion_normal.consumo_combustible.seco} L/100km</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Lluvia</span>
                                <span class="spec-value">${selectedVehicle.rendimiento.conduccion_normal.consumo_combustible.lluvioso} L/100km</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Extremo</span>
                                <span class="spec-value">${selectedVehicle.rendimiento.conduccion_normal.consumo_combustible.extremo} L/100km</span>
                            </div>
                        </div>
                    </div>

                    <div class="spec-section">
                        <h4 class="spec-title">Desgaste de Neumáticos</h4>
                        <div class="spec-grid">
                            <div class="spec-item">
                                <span class="spec-label">Seco</span>
                                <span class="spec-value">${selectedVehicle.rendimiento.conduccion_normal.desgaste_neumaticos.seco}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Lluvia</span>
                                <span class="spec-value">${selectedVehicle.rendimiento.conduccion_normal.desgaste_neumaticos.lluvioso}</span>
                            </div>
                            <div class="spec-item">
                                <span class="spec-label">Extremo</span>
                                <span class="spec-value">${selectedVehicle.rendimiento.conduccion_normal.desgaste_neumaticos.extremo}</span>
                            </div>
                        </div>
                    </div>

                    <button class="remove-button">Eliminar Comparación</button>
                </div>
            `;

            const removeButton = card.querySelector('.remove-button');
            removeButton.addEventListener('click', () => {
                this.selectedCars = this.selectedCars.filter(id => id !== vehicleId);
                card.remove();
                this.populateSelect();
            });

            container.appendChild(card);
            carSelect.value = "";
            this.populateSelect();
        }
    }
}

customElements.define("comparar-vehiculos", CompararVehiculos);