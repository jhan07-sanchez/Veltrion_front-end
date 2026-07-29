/**
 * ============================================================
 * Veltrion ERP
 * App Constants
 * ============================================================
 * Configuración global de la aplicación.
 *
 * Este módulo define la identidad del frontend y parámetros
 * generales compartidos por todo el sistema.
 *
 * @author Veltrion
 * @version 1.0.0
 */

/**
 * Configuración global de la aplicación.
 */
export const AppConstants = Object.freeze({
  APP: {
    NAME: "Veltrion ERP",
    VERSION: "1.0.0",
    API_VERSION: "v1",
  },

  ENVIRONMENT: {
    DEVELOPMENT: "development",
    PRODUCTION: "production",
    TEST: "test",
  },

  SETTINGS: {
    DEBUG: true,
    DEFAULT_LANGUAGE: "es",
    DEFAULT_TIMEZONE: "America/Bogota",
    DEFAULT_TIMEOUT: 30000,
  },
});
