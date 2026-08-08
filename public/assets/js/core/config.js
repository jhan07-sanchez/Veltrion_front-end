/**
 * @fileoverview Configuración global de Veltrion ERP.
 *
 * Centraliza todas las constantes de configuración del frontend.
 * Este archivo no contiene lógica de negocio.
 */

const AppConfig = Object.freeze({
  /**
   * Información de la aplicación.
   */
  APP_NAME: "Veltrion ERP",

  VERSION: "1.0.0",

  ENVIRONMENT: "development",

  DEBUG: true,

  /**
   * URL base del frontend.
   */
  BASE_PATCH: "/",

  /**
   * Tiempo máximo para peticiones HTTP.
   */
  REQUEST_TIMEOUT: 30000,

  /**
   * Intervalo de renovación de sesión.
   */
  SESSION_REFRESH_INTERVAL: 300000,

  /**
   * Tiempo máximo de inactividad.
   */
  SESSION_IDLE_TIMEOUT: 1800000,

  /**
   * Selector del contenedor principal.
   */
  APP_CONTAINER: "#app",

  /**
   * Selector del sidebar.
   */
  SIDEBAR_CONTAINER: "#sidebar-menu",

  /**
   * Selector del dashboard.
   */
  DASHBOARD_CONTAINER: "#dashboardWidgets",
});
