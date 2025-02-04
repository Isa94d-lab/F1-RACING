import { getVehicles, addVehicle } from "../../../../backend/src/js/controllers/vehicles_controller.js";

class AñadirVehiculoC extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        button {
          padding: 10px;
          font-size: 16px;
          cursor: pointer;
        }
        #form-container {
          display: none;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: white;
          padding: 20px;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
          width: 300px;
        }
        input, select {
          display: block;
          width: 100%;
          margin: 5px 0;
          padding: 8px;
        }
        .error {
          color: red;
          font-size: 12px;
        }
      </style>

      <button id="add-button">Añadir Vehículo</button>

      <div id="form-container">
        <h3>Nuevo Vehículo</h3>
        <input type="text" id="equipo" placeholder="Equipo" required>
        <input type="text" id="modelo" placeholder="Modelo" required>
        <input type="text" id="motor" placeholder="Motor" required>
        <input type="number" id="velocidad" placeholder="Velocidad Máxima (km/h)" required>
        <input type="number" id="aceleracion" placeholder="Aceleración 0-100 (s)" required>
        <input type="url" id="img" placeholder="Imagen URL" required>
        <select id="pilot"></select>

        <button id="save-button">Guardar</button>
        <button id="cancel-button">Cancelar</button>
        <p class="error" id="error-msg"></p>
      </div>
    `;

    this.addEventListeners();
    this.loadPilots();
  }

  async addEventListeners() {
    const addButton = this.shadowRoot.getElementById("add-button");
    const saveButton = this.shadowRoot.getElementById("save-button");
    const cancelButton = this.shadowRoot.getElementById("cancel-button");
    const formContainer = this.shadowRoot.getElementById("form-container");
    const errorMsg = this.shadowRoot.getElementById("error-msg");

    // Mostrar el formulario
    addButton.addEventListener("click", () => {
      formContainer.style.display = "block";
    });

    // Cerrar el formulario
    cancelButton.addEventListener("click", () => {
      formContainer.style.display = "none";
      errorMsg.textContent = "";
    });

    // Guardar nuevo vehículo
    saveButton.addEventListener("click", async () => {
      const equipo = this.shadowRoot.getElementById("equipo").value.trim();
      const modelo = this.shadowRoot.getElementById("modelo").value.trim();
      const motor = this.shadowRoot.getElementById("motor").value.trim();
      const velocidad = parseFloat(this.shadowRoot.getElementById("velocidad").value);
      const aceleracion = parseFloat(this.shadowRoot.getElementById("aceleracion").value);
      const img = this.shadowRoot.getElementById("img").value.trim();
      const pilot = this.shadowRoot.getElementById("pilot").value;

      // Validación de datos
      

      // Verificar si el vehículo ya existe
      const vehicles = await getVehicles();
      const exists = vehicles.some(v => v.modelo.toLowerCase() === modelo.toLowerCase());

      if (exists) {
        errorMsg.textContent = "Este modelo ya existe en la base de datos.";
        return;
      }

      // Crear objeto vehículo
      const newVehicle = {
        equipo,
        modelo,
        motor,
        velocidad_maxima_kmh: velocidad,
        aceleracion_0_100: aceleracion,
        pilot,
        img,
        rendimiento: {
          conduccion_normal: {
            velocidad_promedio_kmh: velocidad * 0.8,
            consumo_combustible: { seco: 8, lluvioso: 10, extremo: 12 },
            desgaste_neumaticos: { seco: 5, lluvioso: 7, extremo: 9 }
          },
          conduccion_agresiva: {
            velocidad_promedio_kmh: velocidad * 0.9,
            consumo_combustible: { seco: 10, lluvioso: 13, extremo: 15 },
            desgaste_neumaticos: { seco: 8, lluvioso: 10, extremo: 12 }
          },
          ahorro_combustible: {
            velocidad_promedio_kmh: velocidad * 0.7,
            consumo_combustible: { seco: 5, lluvioso: 7, extremo: 9 },
            desgaste_neumaticos: { seco: 3, lluvioso: 5, extremo: 7 }
          }
        }
      };

      // Añadir vehículo a la base de datos
      await addVehicle(newVehicle);

      // Cerrar el formulario y limpiar campos
      formContainer.style.display = "none";
      this.clearForm();
    });
  }

  async loadPilots() {
    const pilotSelect = this.shadowRoot.getElementById("pilot");

    // Simulación de obtener pilotos de la base de datos
    const response = await fetch("http://localhost:3000/pilots"); // Asegúrate de que esta ruta existe en `db.json`
    const pilots = await response.json();

    pilots.forEach(pilot => {
      const option = document.createElement("option");
      option.value = pilot.name;
      option.textContent = pilot.name;
      pilotSelect.appendChild(option);
    });
  }

  clearForm() {
    this.shadowRoot.getElementById("equipo").value = "";
    this.shadowRoot.getElementById("modelo").value = "";
    this.shadowRoot.getElementById("motor").value = "";
    this.shadowRoot.getElementById("velocidad").value = "";
    this.shadowRoot.getElementById("aceleracion").value = "";
    this.shadowRoot.getElementById("img").value = "";
    this.shadowRoot.getElementById("error-msg").textContent = "";
  }
}

customElements.define("añadir-vehiculo", AñadirVehiculoC);
