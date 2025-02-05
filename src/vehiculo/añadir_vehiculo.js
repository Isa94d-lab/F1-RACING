import { getVehicles, addVehicle } from "../backend/js/controllers/vehicles_controller.js";

class AñadirVehiculoC extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        /* Estilos del formulario */
        #form-container {
          display: none; /* El formulario inicialmente está oculto */
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
          z-index: 1000;
        }
        input, select {
          display: block;
          width: 100%;
          margin: 5px 0;
          padding: 8px;
        }
        button {
          padding: 10px;
          font-size: 16px;
          cursor: pointer;
        }
        .error {
          color: red;
          font-size: 12px;
        }
      </style>

      <div id="form-container">
        <h3>Nuevo Vehículo</h3>
        <input type="text" id="equipo" placeholder="Equipo" required>
        <input type="text" id="modelo" placeholder="Modelo" required>
        <input type="text" id="motor" placeholder="Motor" required>
        <input type="number" id="velocidad" placeholder="Velocidad Máxima (km/h)" required>
        <input type="number" id="aceleracion" placeholder="Aceleración 0-100 (s)" required>
        <input type="url" id="img" placeholder="Imagen URL" required>
        <label>Piloto 1:</label>
        <select id="pilot1" name="pilot1">
          <option value="">Seleccionar Piloto</option>
        </select>
        <label>Piloto 2:</label>
        <select id="pilot2" name="pilot2">
          <option value="">Seleccionar Piloto</option>
        </select>
        <div class="section">
          <h4>Rendimiento - Conducción Normal</h4>
          <input type="number" id="cn-velocidad" placeholder="Velocidad Promedio (km/h)">
          <input type="number" id="cn-seco" placeholder="Consumo Combustible Seco (L/100km)">
          <input type="number" id="cn-lluvioso" placeholder="Consumo Combustible Lluvioso (L/100km)">
          <input type="number" id="cn-extremo" placeholder="Consumo Combustible Extremo (L/100km)">
          <input type="number" id="cn-d-seco" placeholder="Desgaste Neumáticos Seco">
          <input type="number" id="cn-d-lluvioso" placeholder="Desgaste Neumáticos Lluvioso">
          <input type="number" id="cn-d-extremo" placeholder="Desgaste Neumáticos Extremo">
        </div>

        <div class="section">
          <h4>Rendimiento - Conducción Agresiva</h4>
          <input type="number" id="ca-velocidad" placeholder="Velocidad Promedio (km/h)">
          <input type="number" id="ca-seco" placeholder="Consumo Combustible Seco (L/100km)">
          <input type="number" id="ca-lluvioso" placeholder="Consumo Combustible Lluvioso (L/100km)">
          <input type="number" id="ca-extremo" placeholder="Consumo Combustible Extremo (L/100km)">
          <input type="number" id="ca-d-seco" placeholder="Desgaste Neumáticos Seco">
          <input type="number" id="ca-d-lluvioso" placeholder="Desgaste Neumáticos Lluvioso">
          <input type="number" id="ca-d-extremo" placeholder="Desgaste Neumáticos Extremo">
        </div>

        <div class="section">
          <h4>Rendimiento - Ahorro de Combustible</h4>
          <input type="number" id="ac-velocidad" placeholder="Velocidad Promedio (km/h)">
          <input type="number" id="ac-seco" placeholder="Consumo Combustible Seco (L/100km)">
          <input type="number" id="ac-lluvioso" placeholder="Consumo Combustible Lluvioso (L/100km)">
          <input type="number" id="ac-extremo" placeholder="Consumo Combustible Extremo (L/100km)">
          <input type="number" id="ac-d-seco" placeholder="Desgaste Neumáticos Seco">
          <input type="number" id="ac-d-lluvioso" placeholder="Desgaste Neumáticos Lluvioso">
          <input type="number" id="ac-d-extremo" placeholder="Desgaste Neumáticos Extremo">
        </div>

        <button id="save-button">Guardar</button>
        <button id="cancel-button">Cancelar</button>
        <p class="error" id="error-msg"></p>
      </div>
    `;

    this.addEventListeners();
    this.loadPilots();
  }

  addEventListeners() {
    const formContainer = this.shadowRoot.getElementById("form-container");
    const addButton = document.getElementById("add-button"); // Accedemos al botón fuera del componente
    const saveButton = this.shadowRoot.getElementById("save-button");
    const cancelButton = this.shadowRoot.getElementById("cancel-button");
    const errorMsg = this.shadowRoot.getElementById("error-msg");

    // Abrir el formulario cuando se haga clic en el botón
    addButton.addEventListener("click", () => {
      formContainer.style.display = "block";
    });

    // Cerrar el formulario cuando se haga clic en "Cancelar"
    cancelButton.addEventListener("click", () => {
      formContainer.style.display = "none";
      errorMsg.textContent = "";
    });

    // Lógica para guardar el vehículo
    saveButton.addEventListener("click", async () => {
      const equipo = this.shadowRoot.getElementById("equipo").value;
      const modelo = this.shadowRoot.getElementById("modelo").value;
      const motor = this.shadowRoot.getElementById("motor").value;
      const velocidad = this.shadowRoot.getElementById("velocidad").value;
      const aceleracion = this.shadowRoot.getElementById("aceleracion").value;
      const img = this.shadowRoot.getElementById("img").value;
      const pilot1 = this.shadowRoot.getElementById("pilot1").value;
      const pilot2 = this.shadowRoot.getElementById("pilot2").value;

      // Verificar que todos los campos requeridos están completos
      if (!equipo || !modelo || !motor || !velocidad || !aceleracion || !img || !pilot1 || !pilot2) {
        errorMsg.textContent = "Por favor, complete todos los campos.";
        return;
      }

      const newVehicle = {
        equipo,
        modelo,
        motor,
        velocidad_maxima_kmh: parseFloat(velocidad),
        aceleracion_0_100: parseFloat(aceleracion),
        img,
        pilots: [pilot1, pilot2],
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

      try {
        await addVehicle(newVehicle);
        formContainer.style.display = "none";
        errorMsg.textContent = "";
        alert("Vehículo agregado con éxito!");
      } catch (error) {
        console.error("Error al agregar vehículo:", error);
        errorMsg.textContent = "Hubo un error al guardar el vehículo.";
      }
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

      pilots.forEach(pilot => {
        const option1 = document.createElement("option");
        option1.value = pilot.id;
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
}

customElements.define("añadir-vehiculo", AñadirVehiculoC);
