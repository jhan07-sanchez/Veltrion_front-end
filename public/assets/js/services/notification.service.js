/**
 * ============================================================
 * Veltrion ERP
 * Notification Service
 * ============================================================
 *
 * Servicio centralizado de notificaciones.
 *
 * Responsabilidades:
 *  - Encapsular SweetAlert2.
 *  - Mostrar mensajes del backend.
 *  - Mostrar confirmaciones.
 *  - Mostrar loaders.
 *  - Evitar duplicación de código.
 *
 * Ningún otro módulo debe utilizar Swal.fire() directamente.
 * ============================================================
 */
import SessionManager from "./session.manager.js";

const NotificationService = (() => {
  /**
   * Configuración base para todas las alertas.
   */
  const DEFAULT_OPTIONS = {
    confirmButtonColor: "#0d6efd",
    cancelButtonColor: "#dc3545",
    allowOutsideClick: true,
    allowEscapeKey: true,
    heightAuto: false,
  };

  /**
   * Construye una alerta.
   */
  function build(options = {}) {
    return Swal.fire({
      ...DEFAULT_OPTIONS,
      ...options,
    });
  }

  /**
   * Éxito
   */
  function success(message, title = "Éxito") {
    return build({
      icon: "success",
      title,
      text: message,
    });
  }

  /**
   * Error
   */
  function error(message, title = "Error") {
    return build({
      icon: "error",
      title,
      text: message,
    });
  }

  /**
   * Advertencia
   */
  function warning(message, title = "Advertencia") {
    return build({
      icon: "warning",
      title,
      text: message,
    });
  }

  /**
   * Información
   */
  function info(message, title = "Información") {
    return build({
      icon: "info",
      title,
      text: message,
    });
  }

  /**
   * Pregunta
   */
  function question(message, title = "Confirmación") {
    return build({
      icon: "question",
      title,
      text: message,
    });
  }

  /**
   * Confirmación.
   */
  async function confirm({
    title = "¿Está seguro?",
    text = "",
    confirmText = "Aceptar",
    cancelText = "Cancelar",
    icon = "warning",
  } = {}) {
    const result = await build({
      icon,
      title,
      text,
      showCancelButton: true,
      confirmButtonText: confirmText,
      cancelButtonText: cancelText,
      reverseButtons: true,
      focusCancel: true,
    });

    return result.isConfirmed;
  }

  /**
   * Loader.
   */
  function loading(message = "Procesando...") {
    Swal.fire({
      title: message,
      allowEscapeKey: false,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  /**
   * Cierra el loader.
   */
  function close() {
    Swal.close();
  }

  /**
   * Toast superior.
   */
  function toast({ icon = "success", title = "", timer = 3000 } = {}) {
    return Swal.fire({
      toast: true,
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer,
      timerProgressBar: true,
    });
  }

  /**
   * Éxito de API
   */
  function apiSuccess(response) {
    const message = response?.message || "Operación realizada correctamente.";
    return toast({ title: message, icon: "success" });
  }

  /**
   * Errores de validación (400)
   */
  function validationError(errors) {
    if (!errors || typeof errors !== "object") {
      return error("Error de validación.");
    }

    let errorHtml = '<ul class="text-left mb-0">';
    for (const [field, messages] of Object.entries(errors)) {
      const msgs = Array.isArray(messages) ? messages : [messages];
      msgs.forEach(msg => {
        errorHtml += `<li><strong>${field}:</strong> ${msg}</li>`;
      });
    }
    errorHtml += '</ul>';

    return build({
      icon: "warning",
      title: "Error de validación",
      html: errorHtml
    });
  }

  /**
   * Error de API
   */
  function apiError(response) {
    if (response instanceof Error) {
      return error(response.message, "Error de red");
    }

    const status = response?.status || 500;
    const message = response?.message || "Se produjo un error inesperado.";

    if (status === 401) {
      if (
        window.location.pathname.includes("login.php") ||
        (response && response.code === "AUTHENTICATION_FAILED" && message.includes("incorrectos"))
      ) {
        return warning(message, "Error de autenticación");
      }

      return build({
        icon: "warning",
        title: "Sesión Expirada",
        text: "Tu sesión ha expirado. Inicia sesión nuevamente.",
        allowOutsideClick: false,
        allowEscapeKey: false,
        confirmButtonText: "Ir al Login"
      }).then(async () => {
        await SessionManager.logout();
        window.location.replace("login.php");
      });
    }

    if (status === 403) {
      return error(message, "Acceso Denegado");
    }

    if (status === 400 || status === 422) {
      if (response?.errors) {
        return validationError(response.errors);
      }
      return warning(message);
    }

    if (status === 404) {
      return warning(message, "No encontrado");
    }

    return error(message);
  }

  /**
   * API pública.
   */
  return Object.freeze({
    success,
    error,
    warning,
    info,
    question,

    confirm,

    loading,
    close,

    toast,

    apiSuccess,
    apiError,
    validationError,
  });
})();

export default NotificationService;
