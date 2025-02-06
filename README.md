
# F1 Racing

Este es un proyecto web que simula una página de la Fórmula 1, ofreciendo funcionalidades CRUD para gestionar las entidades de **pilotos**, **equipos**, **vehículos** y **circuitos**. Permite a los usuarios visualizar y administrar información sobre estos elementos de manera sencilla y eficiente.

## Tecnologías utilizadas

### Frontend:
- **HTML5** y **CSS3**: Para la estructura y el diseño responsivo.
- **JavaScript (ES6+)**: Desarrollo de la lógica de simulación y gestión de datos.
- **Web Components (Vanilla JS)**: Modularización de la interfaz para una mayor escalabilidad y reutilización del código.

### Gestión de Datos:
- **Local Storage** y **Session Storage**: Para persistir datos en el navegador (pilotos, equipos, vehículos, circuitos).
- **JSON Server**: Para crear un servidor local y simular una API REST.
- **Fetch API**: Potencial para futuras integraciones con APIs externas.

### Vistas:
- **Vistas de usuario**: Interfaz sencilla para la visualización de la información.
- **Vistas de administrador**: Funcionalidad avanzada para gestionar (CRUD) las entidades.

## Instalación

### Requisitos previos:
- Asegúrate de tener **Node.js** y **npm** instalados en tu máquina. Si no los tienes, puedes descargarlos desde [aquí](https://nodejs.org/).

### Pasos de instalación:

1. **Clonar el repositorio**:

   ```bash
   git clone https://github.com/Isa94d-lab/F1-RACING.git
   cd F1-RACING
   ```

2. **Instalar las dependencias con npm**:

   ```bash
   npm install
   ```

3. **Iniciar el servidor JSON**:
   
   Para que el proyecto funcione correctamente, necesitas ejecutar **JSON Server** para simular la API de backend.
   
   Asegúrate de tener **JSON Server** instalado. Si no lo tienes, instálalo globalmente:
   
   ```bash
   npm install -g json-server
   ```

   Luego, corre el servidor con el siguiente comando (esto ejecutará el archivo `db.json` que contiene los datos de ejemplo):

   ```bash
   json-server --watch db.json --port 5000
   ```

4. **Iniciar el proyecto**:

   Una vez que el servidor JSON esté en funcionamiento, puedes iniciar el servidor de desarrollo con:

   ```bash
   npm run dev
   ```

   El sitio web estará disponible en `http://localhost:3000`.

## Funcionalidades

- **CRUD de pilotos, equipos, vehículos y circuitos**: Los administradores pueden agregar, editar y eliminar los elementos de estas entidades.
- **Visualización de información**: Los usuarios pueden ver los detalles de los pilotos, equipos, vehículos y circuitos.
- **Modularización con Web Components**: Se ha implementado para mejorar la escalabilidad y reutilización del código.

## Futuras mejoras

- Integración con una API REST externa para actualizar datos en tiempo real.
- Implementación de autenticación de usuarios para permitir diferentes roles (admin y usuario).
- Mejora en la experiencia del usuario con gráficos o estadísticas en tiempo real.

## Colaboradores

Agradecemos la valiosa contribución de los siguientes colaboradores:

- [Andres Araque](https://github.com/amdresw)
- [Santiago Mendieta](https://github.com/santiagomtello)

## Contribuciones

Si deseas contribuir al proyecto, por favor abre un **pull request**. Asegúrate de seguir las mejores prácticas de codificación y de documentar las funciones nuevas.
