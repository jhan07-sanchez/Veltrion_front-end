/**
 * ============================================================
 * Veltrion ERP
 * Security Service
 * ------------------------------------------------------------
 * Servicio encargado de consumir los endpoints de seguridad
 * del backend.
 *
 * Responsabilidades:
 *  - Obtener contexto de seguridad
 *  - Obtener navegación dinámica
 *  - Obtener dashboard dinámico
 *
 * No contiene lógica de permisos.
 * Toda la autorización es responsabilidad del backend.
 * ============================================================
 */

const SecurityService = (() => {
  /**
   * Obtiene el contexto completo del usuario.
   *
   * Endpoint:
   * GET /security/context/
   */
  async function getContext() {
    return ApiClient.get("/api/v1/security/context/");
  }

  /**
   * Obtiene únicamente la navegación.
   *
   * Endpoint:
   * GET /security/navigation/
   */
  async function getNavigation() {
    return ApiClient.get("/api/v1/security/navigation/");
  }

  /**
   * Obtiene la configuración del dashboard.
   *
   * Endpoint:
   * GET /security/dashboard/
   */
  async function getDashboard() {
    return ApiClient.get("/api/v1/security/dashboard/");
  }

  /**
   * Refresca toda la información de seguridad.
   *
   * Ideal para cargar el ERP después del login.
   */
  async function loadSecurity() {
    const [context, navigation, dashboard] = await Promise.all([
      getContext(),
      getNavigation(),
      getDashboard(),
    ]);

    return {
      context,
      navigation,
      dashboard,
    };
  }

  return {
    getContext,

    getNavigation,

    getDashboard,

    loadSecurity,
  };
})();
