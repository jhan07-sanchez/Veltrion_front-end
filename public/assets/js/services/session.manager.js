/**
 * ============================================================
 * Veltrion ERP
 * Session Manager
 * ============================================================
 *
 * Orquestador central de la sesión del usuario.
 *
 * Responsabilidades:
 *  - Inicializar la sesión.
 *  - Iniciar sesión.
 *  - Cerrar sesión.
 *  - Destruir la sesión.
 *  - Exponer el estado de la sesión.
 *
 * No conoce:
 *  - HTTP
 *  - JWT
 *  - LocalStorage
 *
 * Coordina:
 *  - AuthService
 *  - SecurityService
 *  - Storage
 * ============================================================
 */

import Storage from "../storage/storage.js";
import AuthService from "./auth.service.js";
import SecurityService from "../security/security.service.js";

const SessionManager = (() => {
  let initialized = false;

  /**
   * Inicializa la sesión del usuario.
   */
  async function initialize() {
    console.log("[SESSION] Inicializando sesión");
    if (initialized) {
      return true;
    }

    if (!Storage.hasAccessToken()) {
      console.log("[SESSION] No existe token");
      return false;
    }

    try {
      /**
       * Obtiene el usuario autenticado.
       */
      console.log("[SESSION] Consultando usuario");
      const me = await AuthService.me();
      console.log("[SESSION] Usuario:", me);
 
      const currentUser = me?.data?.user ?? me?.data ?? me?.user ?? me;
      Storage.saveUser(currentUser);

      /**
       * Carga completamente el contexto
       * de seguridad.
       *
       * SecurityService se encarga de guardar:
       * - Contexto
       * - Navegación
       * - Dashboard
       */
      console.log("[SESSION] Cargando seguridad");
      await SecurityService.loadSecurity();
      console.log("[SESSION] Seguridad cargada");

      initialized = true;

      return true;
    } catch (error) {
      console.error("[SessionManager]", error);

      destroy();

      return false;
    }
  }

  /**
   * Inicia una nueva sesión.
   *
   * @param {Object} loginResponse
   */
  async function start(loginResponse) {
    const accessToken =
      loginResponse.data.access_token ?? loginResponse.data.access;
    const refreshToken =
      loginResponse.data.refresh_token ?? loginResponse.data.refresh;
    const currentUser = loginResponse.data.user ?? loginResponse.data;

    Storage.saveTokens(accessToken, refreshToken);
    Storage.saveUser(currentUser);

    initialized = false;

    return initialize();
  }

  /**
   * Finaliza la sesión.
   */
  async function logout() {
    console.log("[SessionManager] Cerrando sesión");
    try {
      await AuthService.logout();
    } catch (error) {
      console.warn("[SessionManager] Error cerrando sesión", error);
    }

    destroy();
  }

  /**
   * Destruye completamente la sesión local.
   */
  function destroy() {
    initialized = false;

    Storage.clear();

    SecurityService.clear();
  }

  /**
   * Indica si existe sesión.
   */
  function isAuthenticated() {
    return Storage.hasAccessToken();
  }

  /**
   * Usuario autenticado.
   */
  function getUser() {
    return Storage.getUser();
  }

  /**
   * Navegación.
   */
  function getNavigation() {
    return Storage.getNavigation();
  }

  /**
   * Dashboard.
   */
  function getDashboard() {
    return Storage.getDashboard();
  }

  /**
   * Contexto de seguridad.
   */
  function getSecurityContext() {
    return Storage.getSecurityContext();
  }

  return Object.freeze({
    initialize,
    start,
    logout,
    destroy,
    isAuthenticated,
    getUser,
    getNavigation,
    getDashboard,
    getSecurityContext,
  });
})();

export default SessionManager;
