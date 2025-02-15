import { getVehicles, getVehicleById, updateVehicle, deleteVehicle } from "./vehicles_controller.js";

class EditarVehiculoC extends HTMLElement {
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
          margin: 5px;
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
          z-index: 1000;
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

      <div id="form-container">
        <h3>Editar Vehículo</h3>
        <select id="vehicle-select">
          <option value="">Seleccionar Vehículo</option>
        </select>
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

        <button id="save-button">Guardar Cambios</button>
        <button id="delete-button">Eliminar Vehículo</button>
        <button id="cancel-button">Cancelar</button>
        <p class="error" id="error-msg"></p>
        <p class="success" id="success-msg"></p>
      </div>
    `;

    this.addEventListeners();
    this.loadVehicles();
    this.loadPilots();
  }

  async addEventListeners() {
    const editButton = document.getElementById("edit-button");
    const saveButton = this.shadowRoot.getElementById("save-button");
    const deleteButton = this.shadowRoot.getElementById("delete-button");
    const cancelButton = this.shadowRoot.getElementById("cancel-button");
    const formContainer = this.shadowRoot.getElementById("form-container");
    const vehicleSelect = this.shadowRoot.getElementById("vehicle-select");
    const errorMsg = this.shadowRoot.getElementById("error-msg");
    const successMsg = this.shadowRoot.getElementById("success-msg");

    // Mostrar el formulario al hacer clic en "Editar"
    editButton.addEventListener("click", () => {
      formContainer.style.display = "block";
    });

    // Cargar los datos del vehículo seleccionado
    vehicleSelect.addEventListener("change", async () => {
      const vehicleId = vehicleSelect.value;
      if (vehicleId) {
        const vehicle = await getVehicleById(vehicleId);
        this.populateForm(vehicle);
      }
    });

    // Guardar los cambios
    saveButton.addEventListener("click", async () => {
      const vehicleId = vehicleSelect.value;
      if (!vehicleId) {
        errorMsg.textContent = "Por favor, seleccione un vehículo.";
        return;
      }

      const updatedVehicle = this.getFormData();
      await updateVehicle(vehicleId, updatedVehicle);
      successMsg.textContent = "Vehículo actualizado exitosamente.";
    });

    // Eliminar el vehículo
    deleteButton.addEventListener("click", async () => {
      const vehicleId = vehicleSelect.value;
      if (!vehicleId) {
        errorMsg.textContent = "Por favor, seleccione un vehículo.";
        return;
      }

      await deleteVehicle(vehicleId);
      successMsg.textContent = "Vehículo eliminado exitosamente.";
      this.clearForm();
      this.loadVehicles(); // Recargar la lista de vehículos
    });

    // Cancelar y ocultar el formulario
    cancelButton.addEventListener("click", () => {
      formContainer.style.display = "none";
      errorMsg.textContent = "";
      successMsg.textContent = "";
    });
  }

  async loadVehicles() {
    const vehicles = await getVehicles();
    const vehicleSelect = this.shadowRoot.getElementById("vehicle-select");
    vehicleSelect.innerHTML = '<option value="">Seleccionar Vehículo</option>';
    vehicles.forEach(vehicle => {
      const option = document.createElement("option");
      option.value = vehicle.id;
      option.textContent = vehicle.modelo;
      vehicleSelect.appendChild(option);
    });
  }

  async loadPilots() {
    const response = await fetch("http://localhost:3000/pilots");
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
  }

  populateForm(vehicle) {
    this.shadowRoot.getElementById("equipo").value = vehicle.equipo;
    this.shadowRoot.getElementById("modelo").value = vehicle.modelo;
    this.shadowRoot.getElementById("motor").value = vehicle.motor;
    this.shadowRoot.getElementById("velocidad").value = vehicle.velocidad_maxima_kmh;
    this.shadowRoot.getElementById("aceleracion").value = vehicle.aceleracion_0_100;
    this.shadowRoot.getElementById("img").value = vehicle.img;
    this.shadowRoot.getElementById("pilot1").value = vehicle.pilots[0];
    this.shadowRoot.getElementById("pilot2").value = vehicle.pilots[1];

    // Llenar rendimiento
    const rendimiento = vehicle.rendimiento;
    // Llenar los campos de rendimiento (conducción normal, conducción agresiva y ahorro de combustible)
this.shadowRoot.getElementById("cn-velocidad").value = rendimiento.conduccion_normal.velocidad_promedio_kmh;
this.shadowRoot.getElementById("cn-seco").value = rendimiento.conduccion_normal.consumo_combustible.seco;
this.shadowRoot.getElementById("cn-lluvioso").value = rendimiento.conduccion_normal.consumo_combustible.lluvioso;
this.shadowRoot.getElementById("cn-extremo").value = rendimiento.conduccion_normal.consumo_combustible.extremo;
this.shadowRoot.getElementById("cn-d-seco").value = rendimiento.conduccion_normal.desgaste_neumaticos.seco;
this.shadowRoot.getElementById("cn-d-lluvioso").value = rendimiento.conduccion_normal.desgaste_neumaticos.lluvioso;
this.shadowRoot.getElementById("cn-d-extremo").value = rendimiento.conduccion_normal.desgaste_neumaticos.extremo;

// Llenar campos de conducción agresiva
this.shadowRoot.getElementById("ca-velocidad").value = rendimiento.conduccion_agresiva.velocidad_promedio_kmh;
this.shadowRoot.getElementById("ca-seco").value = rendimiento.conduccion_agresiva.consumo_combustible.seco;
this.shadowRoot.getElementById("ca-lluvioso").value = rendimiento.conduccion_agresiva.consumo_combustible.lluvioso;
this.shadowRoot.getElementById("ca-extremo").value = rendimiento.conduccion_agresiva.consumo_combustible.extremo;
this.shadowRoot.getElementById("ca-d-seco").value = rendimiento.conduccion_agresiva.desgaste_neumaticos.seco;
this.shadowRoot.getElementById("ca-d-lluvioso").value = rendimiento.conduccion_agresiva.desgaste_neumaticos.lluvioso;
this.shadowRoot.getElementById("ca-d-extremo").value = rendimiento.conduccion_agresiva.desgaste_neumaticos.extremo;

// Llenar campos de ahorro de combustible
this.shadowRoot.getElementById("ac-velocidad").value = rendimiento.ahorro_combustible.velocidad_promedio_kmh;
this.shadowRoot.getElementById("ac-seco").value = rendimiento.ahorro_combustible.consumo_combustible.seco;
this.shadowRoot.getElementById("ac-lluvioso").value = rendimiento.ahorro_combustible.consumo_combustible.lluvioso;
this.shadowRoot.getElementById("ac-extremo").value = rendimiento.ahorro_combustible.consumo_combustible.extremo;
this.shadowRoot.getElementById("ac-d-seco").value = rendimiento.ahorro_combustible.desgaste_neumaticos.seco;
this.shadowRoot.getElementById("ac-d-lluvioso").value = rendimiento.ahorro_combustible.desgaste_neumaticos.lluvioso;
this.shadowRoot.getElementById("ac-d-extremo").value = rendimiento.ahorro_combustible.desgaste_neumaticos.extremo;


  }

  getFormData() {
    return {
      equipo: this.shadowRoot.getElementById("equipo").value,
      modelo: this.shadowRoot.getElementById("modelo").value,
      motor: this.shadowRoot.getElementById("motor").value,
      velocidad_maxima_kmh: parseFloat(this.shadowRoot.getElementById("velocidad").value),
      aceleracion_0_100: parseFloat(this.shadowRoot.getElementById("aceleracion").value),
      img: this.shadowRoot.getElementById("img").value,
      pilots: [
        this.shadowRoot.getElementById("pilot1").value,
        this.shadowRoot.getElementById("pilot2").value,
      ],
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
          },
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
          },
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
          },
        },
      },
    };
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
    // Limpiar campos de rendimiento...
  }
}

customElements.define("editar-vehiculo", EditarVehiculoC);