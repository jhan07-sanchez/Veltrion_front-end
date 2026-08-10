/**
 * ============================================================
 * Security Service
 * ============================================================
 *
 * Servicio central de seguridad del frontend.
 *
 * Responsabilidades:
 *
 * - Obtener contexto de seguridad.
 * - Obtener navegación.
 * - Obtener dashboard.
 * - Resolver permisos dinámicos.
 * - Aplicar permisos al DOM.
 *
 * No renderiza.
 * No usa localStorage directamente.
 * ============================================================
 */

import ApiClient from "../core/api.client.js";
import Storage from "../storage/storage.js";

const SecurityService = (() => {
  /*=========================================================
        Carga completa
    =========================================================*/

  async function loadSecurity() {
    const [context, navigation, dashboard] = await Promise.all([
      loadContext(),
      loadNavigation(),
      loadDashboard(),
    ]);

    // Guardar contexto de seguridad (permisos) - CRÍTICO para que hasPermission funcione
    if (context.ok && context.data) {
      Storage.saveSecurityContext(context.data);
    }

    const navigationPayload = navigation?.data?.navigation ?? navigation?.navigation ?? navigation?.data ?? navigation;
    const dashboardPayload = dashboard?.data?.widgets ?? dashboard?.widgets ?? dashboard?.data ?? dashboard;

    const normalizedNavigation = Array.isArray(navigationPayload)
      ? navigationPayload
      : navigationPayload?.navigation ?? [];

    const normalizedDashboard = Array.isArray(dashboardPayload)
      ? dashboardPayload
      : dashboardPayload?.widgets ?? [];

    Storage.saveNavigation(normalizedNavigation);
    Storage.saveDashboard(normalizedDashboard);

    return {
      context,
      navigation,
      dashboard,
    };
  }

  /*=========================================================
        Endpoints
    =========================================================*/

  async function loadPermissionCatalog() {
    return ApiClient.get("/api/v1/security/permissions/");
  }

  async function loadContext() {
    return ApiClient.get("/api/v1/security/context/");
  }

  async function loadNavigation() {
    return ApiClient.get("/api/v1/security/navigation/");
  }

  async function loadDashboard() {
    return ApiClient.get("/api/v1/security/dashboard/");
  }

  /*=========================================================
        Permisos
    =========================================================*/

  function getPermissions() {
    const context = Storage.getSecurityContext();

    if (!context) {
      return {};
    }

    return context.permissions || {};
  }

  function resolvePermission(object, path) {
    // 1. Verificar formato plano: {"users.view": true}
    if (path in object) {
      return object[path] === true;
    }

    // 2. Fallback: formato jerárquico {"users": {"view": true}}
    const keys = path.split(".");
    let current = object;

    for (const key of keys) {
      if (current[key] === undefined) {
        return false;
      }
      current = current[key];
    }

    return current === true;
  }

  function hasPermission(permission) {
    return resolvePermission(getPermissions(), permission);
  }

  function hasPermissions(permissions, requireAll = true) {
    if (!Array.isArray(permissions)) {
      return false;
    }

    return requireAll
      ? permissions.every(hasPermission)
      : permissions.some(hasPermission);
  }

  function applyPermissions() {
    document.querySelectorAll("[data-permission]").forEach((element) => {
      if (!hasPermission(element.dataset.permission)) {
        element.remove();
      }
    });
  }

  function clear() {
    console.info("[Security] limpiado");
  }

  return Object.freeze({
    loadSecurity,

    loadPermissionCatalog,

    loadContext,

    loadNavigation,

    loadDashboard,

    getPermissions,

    hasPermission,

    hasPermissions,

    applyPermissions,

    clear,
  });
})();

export default SecurityService;
