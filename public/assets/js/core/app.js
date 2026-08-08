/**
 * ============================================================
 * Veltrion ERP
 * App
 * ============================================================
 *
 * Bootstrap principal de la aplicación.
 *
 * Punto único de entrada del frontend.
 *
 * Responsabilidades:
 *  - Inicializar la aplicación.
 *  - Detectar la página actual.
 *  - Inicializar la sesión.
 *  - Renderizar la interfaz dinámica.
 *
 * No contiene lógica de:
 *  - Autenticación
 *  - HTTP
 *  - JWT
 *  - LocalStorage
 *  - Permisos
 * ============================================================
 */

import Routes from "./routes.js";
import Storage from "../storage/storage.js";

import LoginController from "../controllers/auth/login.controller.js";
import LogoutController from "../controllers/auth/logout.controller.js";

import SessionManager from "../services/session.manager.js";

import SidebarRenderer from "../renderers/sidebar.renderer.js";
import DashboardRenderer from "../renderers/dashboard.renderer.js";
import UserRenderer from "../renderers/user.renderer.js";

import Config from "../config/config.js";
import SecurityService from "../security/security.service.js";


const App = (() => {
  /**
   * Inicializa toda la aplicación.
   */
  async function bootstrap() {
    try {
      console.log("APP INICIADA");

      const currentPage = Routes.currentFile();

      console.log("[APP] Página:", currentPage);

      /**
       * Página de Login
       */
      if (currentPage === "login.php") {
        LoginController.init();
        return;
      }

      /**
       * Inicializa la sesión.
       */
      const authenticated = await SessionManager.initialize();

      if (!authenticated) {
        console.warn("[APP] Usuario no autenticado.");
        window.location.replace(Config.BASE_PATH + Config.LOGIN_PATH);
        return;
      }

      LogoutController.init();

      /**
       * Obtiene la información almacenada.
       */
      const navigation = Storage.getNavigation();

      const dashboard = Storage.getDashboard();

      const user = Storage.getUser();
      console.log("[APP] Usuario Storage:", user);
      /**
       * Render usuario sidebar
       */
      UserRenderer.render(user);

      
      /**
       * Renderiza Sidebar.
       */
      if (navigation) {
        SidebarRenderer.render(navigation);
      }

      /**
       * Renderiza Dashboard.
       */
      DashboardRenderer.initialize();
      if (dashboard) {
        DashboardRenderer.render(dashboard);
      } else {
        console.warn("[APP] No existe dashboard en Storage");
      }

      // Aplica permisos: oculta elementos HTML con data-permission sin acceso
      SecurityService.applyPermissions();

      console.log("[APP] Aplicación inicializada correctamente.");
    } catch (error) {
      console.error("[APP]", error);
    }
  }

  return Object.freeze({
    bootstrap,
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  App.bootstrap();
});

export default App;
