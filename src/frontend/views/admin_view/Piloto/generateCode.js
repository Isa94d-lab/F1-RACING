export class generateCode extends HTMLElement {
    constructor() {
        super();

        // Crear el Shadow DOM
        this.attachShadow({ mode: 'open' });

        // Crear un bloque de estilos personalizados
        const style = document.createElement('style');
        style.textContent = `
            label.form-label {
                display: flex;
                margin-bottom: .5rem;
                font-weight: 600;
                margin-top: .5rem;
                justify-content: center;
            }

            input.form-control {
                display: block;
                padding: .375rem .75rem;
                width: 94%;
                font-size: 1rem;
                line-height: 1.5;
                background-color: #fff;
                border: 1px solid #ced4da;
                border-radius: .25rem;
            }
        `;

        // Crear el contenedor para el label y el input dentro del Shadow DOM
        const container = document.createElement('div');
        
        // Crear el label
        const label = document.createElement('label');
        label.setAttribute('for', 'factura_Usuario');
        label.setAttribute('class', 'form-label');
        label.textContent = 'ID del Piloto: ';

        // Crear el input
        this.input = document.createElement('input');
        this.input.setAttribute('class', 'form-control form-select1');
        this.input.setAttribute('type', 'text');
        this.input.setAttribute('id', 'codigo');
        this.input.setAttribute('aria-label', 'Disabled input example');
        this.input.setAttribute('disabled', true);  // Establecer como deshabilitado y solo lectura
        this.input.setAttribute('readonly', true);  // Solo lectura

        // Generar un número único y establecerlo en el input
        this.number = Date.now() + Math.floor(Math.random() * 1000000);
        this.input.value = this.number;  // Establece el valor generado en el input

        // Agregar el bloque de estilos al Shadow DOM
        this.shadowRoot.appendChild(style); // Agregar el bloque de estilos al Shadow DOM

        // Agregar el label y el input al contenedor
        container.appendChild(label);
        container.appendChild(this.input);

        // Agregar el contenedor al Shadow DOM
        this.shadowRoot.appendChild(container);
    }

    // Método para acceder al código generado
    getGeneratedCode() {
        return this.number;
    }
}

// Registrar el Web Component
customElements.define('generate-code', generateCode);
