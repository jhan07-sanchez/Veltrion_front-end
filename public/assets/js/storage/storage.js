/**
 * @fileoverview
 * Administrador centralizado del almacenamiento del ERP.
 *
 * Responsable únicamente de persistir información
 * relacionada con la sesión del usuario.
 */

const Storage = (() => {
  const KEYS = Object.freeze({
    ACCESS_TOKEN: "veltrion_access_token",
    REFRESH_TOKEN: "veltrion_refresh_token",
    USER: "veltrion_user",
    SECURITY_CONTEXT: "veltrion_security_context",
    NAVIGATION: "veltrion_navigation",
    DASHBOARD: "veltrion_dashboard",
  });

  /* ===========================
       Helpers privados
    =========================== */

  const save = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const read = (key) => {
    const value = localStorage.getItem(key);

    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch {
      return null;
    }
  };

  /* ===========================
       Tokens
    =========================== */

  const saveTokens = (accessToken, refreshToken) => {
    localStorage.setItem(KEYS.ACCESS_TOKEN, accessToken);
    localStorage.setItem(KEYS.REFRESH_TOKEN, refreshToken);
  };

  const getAccessToken = () => {
    return localStorage.getItem(KEYS.ACCESS_TOKEN);
  };

  const getRefreshToken = () => {
    return localStorage.getItem(KEYS.REFRESH_TOKEN);
  };

  const hasAccessToken = () => {
    return !!getAccessToken();
  };

  /* ===========================
       Usuario
    =========================== */

  const saveUser = (user) => {
    save(KEYS.USER, user);
  };

  const getUser = () => {
    return read(KEYS.USER);
  };

  /* ===========================
       Contexto
    =========================== */

  const saveSecurityContext = (context) => {
    save(KEYS.SECURITY_CONTEXT, context);
  };

  const getSecurityContext = () => {
    return read(KEYS.SECURITY_CONTEXT);
  };

  /* ===========================
       Navegación
    =========================== */

  const saveNavigation = (navigation) => {
    save(KEYS.NAVIGATION, navigation);
  };

  const getNavigation = () => {
    return read(KEYS.NAVIGATION);
  };

  /* ===========================
       Dashboard
    =========================== */

  const saveDashboard = (dashboard) => {
    save(KEYS.DASHBOARD, dashboard);
  };

  const getDashboard = () => {
    return read(KEYS.DASHBOARD);
  };

  /* ===========================
       Limpieza
    =========================== */

  const clear = () => {
    Object.values(KEYS).forEach(localStorage.removeItem.bind(localStorage));
  };

  return Object.freeze({
    saveTokens,
    getAccessToken,
    getRefreshToken,
    hasAccessToken,

    saveUser,
    getUser,

    saveSecurityContext,
    getSecurityContext,

    saveNavigation,
    getNavigation,

    saveDashboard,
    getDashboard,

    clear,
  });
})();

export default Storage;
