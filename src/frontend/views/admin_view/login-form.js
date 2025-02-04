class LoginForm extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });

        // Crear el formulario con estilos
        shadow.innerHTML = `
            <style>
            @import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css");

                * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                    font-family: sans-serif;
                }

                body {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 100vh;
                    background: linear-gradient(to right, #cb232c, #ce1d61);
                }

                /* Estilos del formulario */
                form {
                    display: flex;
                    flex-direction: column;
                    background: #fff;
                    text-align: center;
                    padding: 20px 25px;
                    width: 300px;
                    border-radius: 8px;
                    box-shadow: 0 5px 10px rgba(71, 3, 6, 0.7);
                }

                /* Título */
                form .title {
                    color: #252525;
                    font-size: 35px;
                    font-weight: 800;
                    margin-bottom: 20px;
                }

                /* Contenedor del input con el icono */
                form label {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    border-bottom: solid 1px #ce1d61;
                    padding: 5px 0;
                    margin-bottom: 20px;
                }

                /* Iconos */
                form label .fa-solid {
                    font-size: 20px;
                    color: #cb232c;
                }

                /* Campos de entrada */
                form label input {
                    flex: 1;
                    outline: none;
                    border: none;
                    color: #252525;
                    padding: 5px;
                    font-size: 18px;
                    background: none;
                }

                form label input::placeholder {
                    color: rgba(37, 37, 37, 0.5);
                }

                /* Enlace "Forgot password?" */
                form .link {
                    color: #252525;
                    margin-bottom: 15px;
                    font-size: 14px;
                    text-decoration: none;
                    cursor: pointer;
                }

                form .link:hover {
                    text-decoration: underline;
                }

                /* Botón */
                form button {
                    color: #fff;
                    border: none;
                    background: linear-gradient(to right, #cb232c, #ce1d61);
                    padding: 10px 15px;
                    cursor: pointer;
                    font-size: 18px;
                    border-radius: 5px;
                    transition: background 0.3s ease-in-out;
                }

                form button:hover {
                    background: linear-gradient(to right, #b71c1c, #b71550);
                }

            </style>

            <form>
                <h1 class="title">Login</h1>
                <label>
                    <i class="fa-solid fa-user"></i>
                    <input placeholder="Username" type="text" id="username">
                </label>
                <label>
                    <i class="fa-solid fa-lock"></i>
                    <input placeholder="Password" type="password" id="password">
                </label>
                <a href="#" class="link">Forgot your password?</a>
                <button type="submit">Login</button>
            </form>
        `;

        const form = shadow.querySelector("form");

        form.addEventListener("submit", (e) => {
            e.preventDefault();

            // Obtener valores de los campos correctamente
            const username = shadow.querySelector("#username").value;
            const password = shadow.querySelector("#password").value;

            if (!username || !password) {
                alert("Por favor, completa todos los campos.");
                return;
            }

            // Usuarios válidos
            const users = [
                { username: "Isa", password: "1234" },
                { username: "Andres", password: "5678" }
            ];

            // Verificar credenciales
            const isValidUser = users.some(user => user.username === username && user.password === password);
            if (isValidUser) {
                window.location.href = "admin.html";
            } else {
                alert("Datos incorrectos");
            }

            form.reset(); // Limpiar el formulario
        });
    }
}

customElements.define("login-form", LoginForm);
