import { getVehicles, addVehicle } from "../../../../backend/js/controllers/vehicles_controller.js";

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
          width: 350px;
          max-height: 90vh;
          overflow-y: auto;
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
        .success {
          color: green;
          font-size: 12px;
        }
        .section {
          margin-top: 10px;
          padding: 10px;
          border: 1px solid #ddd;
        }
        .section h4 {
          margin: 5px 0;
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
        <label>Piloto 1:</label>
        <select class="nombrePiloto" id="pilot1" name="pilot1" required>
          <option value="">Seleccionar Piloto</option>
        </select>
        
        <label>Piloto 2:</label>
        <select class="nombrePiloto" id="pilot2" name="pilot2" required>
          <option value="">Seleccionar Piloto</option>
        </select>

        <div class="section">
          <h4>Rendimiento - Conducción Normal</h4>
          <input type="number" id="cn-velocidad" placeholder="Velocidad Promedio (km/h)" required>
          <input type="number" id="cn-seco" placeholder="Consumo Combustible Seco (L/100km)" required>
          <input type="number" id="cn-lluvioso" placeholder="Consumo Combustible Lluvioso (L/100km)" required>
          <input type="number" id="cn-extremo" placeholder="Consumo Combustible Extremo (L/100km)" required>
          <input type="number" id="cn-d-seco" placeholder="Desgaste Neumáticos Seco" required>
          <input type="number" id="cn-d-lluvioso" placeholder="Desgaste Neumáticos Lluvioso" required>
          <input type="number" id="cn-d-extremo" placeholder="Desgaste Neumáticos Extremo" required>
        </div>

        <div class="section">
          <h4>Rendimiento - Conducción Agresiva</h4>
          <input type="number" id="ca-velocidad" placeholder="Velocidad Promedio (km/h)" required>
          <input type="number" id="ca-seco" placeholder="Consumo Combustible Seco (L/100km)" required>
          <input type="number" id="ca-lluvioso" placeholder="Consumo Combustible Lluvioso (L/100km)" required>
          <input type="number" id="ca-extremo" placeholder="Consumo Combustible Extremo (L/100km)" required>
          <input type="number" id="ca-d-seco" placeholder="Desgaste Neumáticos Seco" required>
          <input type="number" id="ca-d-lluvioso" placeholder="Desgaste Neumáticos Lluvioso" required>
          <input type="number" id="ca-d-extremo" placeholder="Desgaste Neumáticos Extremo" required>
        </div>

        <div class="section">
          <h4>Rendimiento - Ahorro de Combustible</h4>
          <input type="number" id="ac-velocidad" placeholder="Velocidad Promedio (km/h)" required>
          <input type="number" id="ac-seco" placeholder="Consumo Combustible Seco (L/100km)" required>
          <input type="number" id="ac-lluvioso" placeholder="Consumo Combustible Lluvioso (L/100km)" required>
          <input type="number" id="ac-extremo" placeholder="Consumo Combustible Extremo (L/100km)" required>
          <input type="number" id="ac-d-seco" placeholder="Desgaste Neumáticos Seco" required>
          <input type="number" id="ac-d-lluvioso" placeholder="Desgaste Neumáticos Lluvioso" required>
          <input type="number" id="ac-d-extremo" placeholder="Desgaste Neumáticos Extremo" required>
        </div>

        <button id="save-button">Guardar</button>
        <button id="cancel-button">Cancelar</button>
        <p class="error" id="error-msg"></p>
        <p class="success" id="success-msg"></p>
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
    const successMsg = this.shadowRoot.getElementById("success-msg");

    addButton.addEventListener("click", () => {
      formContainer.style.display = "block";
      errorMsg.textContent = ""; // Limpiar mensajes de error al abrir el formulario
      successMsg.textContent = ""; // Limpiar mensajes de éxito al abrir el formulario
    });

    cancelButton.addEventListener("click", () => {
      formContainer.style.display = "none";
      errorMsg.textContent = "";
      successMsg.textContent = "";
    });

    saveButton.addEventListener("click", async () => {
      const equipo = this.shadowRoot.getElementById("equipo").value.trim();
      const modelo = this.shadowRoot.getElementById("modelo").value.trim();
      const motor = this.shadowRoot.getElementById("motor").value.trim();
      const velocidad = parseFloat(this.shadowRoot.getElementById("velocidad").value);
      const aceleracion = parseFloat(this.shadowRoot.getElementById("aceleracion").value);
      const img = this.shadowRoot.getElementById("img").value.trim();
      const pilot1 = this.shadowRoot.getElementById("pilot1").value;
      const pilot2 = this.shadowRoot.getElementById("pilot2").value;

      // Validar que todos los campos estén llenos
      if (!equipo || !modelo || !motor || isNaN(velocidad) || isNaN(aceleracion) || !img || !pilot1 || !pilot2) {
        errorMsg.textContent = "Por favor, complete todos los campos.";
        return;
      }

      // Validar que los pilotos sean diferentes
      if (pilot1 === pilot2) {
        errorMsg.textContent = "Los pilotos deben ser diferentes.";
        return;
      }

      // Validar que el modelo no exista
      const vehicles = await getVehicles();
      if (vehicles.some(v => v.modelo.toLowerCase() === modelo.toLowerCase())) {
        errorMsg.textContent = "Este modelo ya existe.";
        return;
      }

      // Crear el nuevo vehículo
      const newVehicle = {
        equipo,
        modelo,
        motor,
        velocidad_maxima_kmh: velocidad,
        aceleracion_0_100: aceleracion,
        pilots: [pilot1, pilot2],
        img,
        rendimiento: {
          conduccion_normal: {
            velocidad_promedio_kmh: parseFloat(this.shadowRoot.getElementById("cn-velocidad").value),
            consumo_combustible: {
              seco: parseFloat(this.shadowRoot.getElementById("cn-seco").value),
              lluvioso: parseFloat(this.shadowRoot.getElementById("cn-lluvioso").value),
              extremo: parseFloat(this.shadowRoot.getElementById("cn-extremo").value),
            },
            desgaste_neumaticos: {
              seco: parseFloat(this.shadowRoot.getElementById("cn-d-seco").value),
              lluvioso: parseFloat(this.shadowRoot.getElementById("cn-d-lluvioso").value),
              extremo: parseFloat(this.shadowRoot.getElementById("cn-d-extremo").value),
            }
          },
          conduccion_agresiva: {
            velocidad_promedio_kmh: parseFloat(this.shadowRoot.getElementById("ca-velocidad").value),
            consumo_combustible: {
              seco: parseFloat(this.shadowRoot.getElementById("ca-seco").value),
              lluvioso: parseFloat(this.shadowRoot.getElementById("ca-lluvioso").value),
              extremo: parseFloat(this.shadowRoot.getElementById("ca-extremo").value),
            },
            desgaste_neumaticos: {
              seco: parseFloat(this.shadowRoot.getElementById("ca-d-seco").value),
              lluvioso: parseFloat(this.shadowRoot.getElementById("ca-d-lluvioso").value),
              extremo: parseFloat(this.shadowRoot.getElementById("ca-d-extremo").value),
            }
          },
          ahorro_combustible: {
            velocidad_promedio_kmh: parseFloat(this.shadowRoot.getElementById("ac-velocidad").value),
            consumo_combustible: {
              seco: parseFloat(this.shadowRoot.getElementById("ac-seco").value),
              lluvioso: parseFloat(this.shadowRoot.getElementById("ac-lluvioso").value),
              extremo: parseFloat(this.shadowRoot.getElementById("ac-extremo").value),
            },
            desgaste_neumaticos: {
              seco: parseFloat(this.shadowRoot.getElementById("ac-d-seco").value),
              lluvioso: parseFloat(this.shadowRoot.getElementById("ac-d-lluvioso").value),
              extremo: parseFloat(this.shadowRoot.getElementById("ac-d-extremo").value),
            }
          }
        }
      };

      // Guardar el vehículo
      await addVehicle(newVehicle);
      formContainer.style.display = "none";
      this.clearForm();
      successMsg.textContent = "Vehículo guardado exitosamente."; // Mostrar mensaje de éxito
    });
  }

  async loadPilots() {
    try {
      const response = await fetch("http://localhost:3000/pilots");

      if (!response.ok) {
        throw new Error(`Error al cargar pilotos: ${response.status}`);
      }

      const pilots = await response.json();
      const pilotSelect1 = this.shadowRoot.getElementById("pilot1");
      const pilotSelect2 = this.shadowRoot.getElementById("pilot2");

      if (!pilotSelect1 || !pilotSelect2) {
        console.error("No se encontraron los select de pilotos en el shadow DOM.");
        return;
      }

      // Agregar pilotos a los select
      pilots.forEach(pilot => {
        const option1 = document.createElement("option");
        option1.value = pilot.id; // Usamos el id del piloto
        option1.textContent = pilot.nombre;
        pilotSelect1.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = pilot.id;
        option2.textContent = pilot.nombre;
        pilotSelect2.appendChild(option2);
      });

    } catch (error) {
      console.error("Error al cargar los pilotos:", error);
    }
  }

  clearForm() {
    this.shadowRoot.getElementById("equipo").value = "";
    this.shadowRoot.getElementById("modelo").value = "";
    this.shadowRoot.getElementById("motor").value = "";
    this.shadowRoot.getElementById("velocidad").value = "";
    this.shadowRoot.getElementById("aceleracion").value = "";
    this.shadowRoot.getElementById("img").value = "";
    this.shadowRoot.getElementById("pilot1").value = "";
    this.shadowRoot.getElementById("pilot2").value = "";
    this.shadowRoot.getElementById("cn-velocidad").value = "";
    this.shadowRoot.getElementById("cn-seco").value = "";
    this.shadowRoot.getElementById("cn-lluvioso").value = "";
    this.shadowRoot.getElementById("cn-extremo").value = "";
    this.shadowRoot.getElementById("cn-d-seco").value = "";
    this.shadowRoot.getElementById("cn-d-lluvioso").value = "";
    this.shadowRoot.getElementById("cn-d-extremo").value = "";
    this.shadowRoot.getElementById("ca-velocidad").value = "";
    this.shadowRoot.getElementById("ca-seco").value = "";
    this.shadowRoot.getElementById("ca-lluvioso").value = "";
    this.shadowRoot.getElementById("ca-extremo").value = "";
    this.shadowRoot.getElementById("ca-d-seco").value = "";
    this.shadowRoot.getElementById("ca-d-lluvioso").value = "";
    this.shadowRoot.getElementById("ca-d-extremo").value = "";
    this.shadowRoot.getElementById("ac-velocidad").value = "";
    this.shadowRoot.getElementById("ac-seco").value = "";
    this.shadowRoot.getElementById("ac-lluvioso").value = "";
    this.shadowRoot.getElementById("ac-extremo").value = "";
    this.shadowRoot.getElementById("ac-d-seco").value = "";
    this.shadowRoot.getElementById("ac-d-lluvioso").value = "";
    this.shadowRoot.getElementById("ac-d-extremo").value = "";
  }
}

customElements.define("añadir-vehiculo", AñadirVehiculoC);