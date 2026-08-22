/**
 * @fileoverview Controlador del formulario de autenticación.
 * @description
 * Coordina el proceso de inicio de sesión delegando toda la lógica
 * de negocio a AuthService y SessionManager.
 *
 * Responsabilidades:
 *  - Escuchar el envío del formulario.
 *  - Validar campos requeridos.
 *  - Gestionar el estado visual del botón.
 *  - Invocar el servicio de autenticación.
 *  - Redirigir al usuario tras un inicio de sesión exitoso.
 *
 * No contiene lógica HTTP, JWT, almacenamiento ni permisos.
 */
import AuthService from "../../services/auth.service.js";
import SessionManager from "../../services/session.manager.js";
import NotificationService from "../../services/notification.service.js";

const LoginController = (() => {
  let form;
  let emailInput;
  let passwordInput;
  let submitButton;

  /**
   * Inicializa el controlador.
   */
  const init = () => {
    form = document.getElementById("loginForm");

    if (!form) {
      return;
    }

    emailInput = document.getElementById("email");
    passwordInput = document.getElementById("password");

    submitButton = form.querySelector('button[type="submit"]');

    form.addEventListener("submit", onSubmit);
  };



  /**
   * Maneja el envío del formulario.
   */
  const onSubmit = async (event) => {
    event.preventDefault();
    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      return;
    }

    setLoading(true);

    try {
      /**
       * Login contra el backend.
       */
      const response = await AuthService.login({
        email,
        password,
      });

      if (!response.success) {
        NotificationService.apiError(response);
        return;
      }

      /**
       * Guarda completamente la sesión.
       */
      await SessionManager.start(response);

      /**
       * Redirección.
       */
      window.location.replace("/Veltrion_front-end/index.php");
    } catch (error) {
      NotificationService.apiError(error);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Cambia el estado visual del botón.
   */
  const setLoading = (loading) => {
    if (!submitButton) {
      return;
    }

    submitButton.disabled = loading;

    submitButton.classList.toggle("disabled", loading);
  };

  return {
    init,
  };
})();

export default LoginController;
