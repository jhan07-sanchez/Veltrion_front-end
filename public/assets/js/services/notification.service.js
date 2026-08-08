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
  });
})();
