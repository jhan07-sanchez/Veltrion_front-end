/**
 * @fileoverview Constantes globales de Veltrion ERP.
 *
 * Centraliza los valores compartidos por toda la aplicación.
 */

const Constants = Object.freeze({
  HTTP: Object.freeze({
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    PATCH: "PATCH",
    DELETE: "DELETE",
  }),

  EVENTS: Object.freeze({
    LOGIN: "auth:login",

    LOGOUT: "auth:logout",

    SESSION_EXPIRED: "session:expired",

    NAVIGATION_UPDATED: "navigation:updated",

    DASHBOARD_UPDATED: "dashboard:updated",
  }),

  STORAGE_KEYS: Object.freeze({
    ACCESS_TOKEN: "veltrion_access_token",

    REFRESH_TOKEN: "veltrion_refresh_token",

    USER: "veltrion_user",

    SECURITY_CONTEXT: "veltrion_security_context",
  }),

  CSS: Object.freeze({
    HIDDEN: "d-none",

    DISABLED: "disabled",

    ACTIVE: "active",
  }),
});
