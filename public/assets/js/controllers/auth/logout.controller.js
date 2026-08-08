/**
 * ============================================================
 * Veltrion ERP
 * Logout Controller
 * ============================================================
 *
 * Responsable de controlar el cierre de sesión desde la interfaz.
 *
 * No maneja:
 * - Tokens
 * - Storage
 * - HTTP
 *
 * Delega todo a SessionManager.
 *
 * ============================================================
 */

import SessionManager from "../../services/session.manager.js";
import Config from "../../config/config.js";

const LogoutController = (() => {
  function init() {
    const buttons = document.querySelectorAll("[data-action='logout']");

    if (!buttons || buttons.length === 0) {
      console.warn("[LogoutController] Botón logout no encontrado");

      return;
    }

    buttons.forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.preventDefault();

        try {
          console.log("[Logout] Cerrando sesión...");

          await SessionManager.logout();

          console.log("[Logout] Sesión destruida correctamente");

          window.location.href = Config.BASE_PATH + Config.LOGIN_PATH;
        } catch (error) {
          console.error("[Logout]", error);
        }
      });
    });
  }

  return Object.freeze({
    init,
  });
})();

export default LogoutController;
