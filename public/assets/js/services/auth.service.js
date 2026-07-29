/**
 * @fileoverview Servicio de autenticacion.
 * 
 * @description
 * Responsable de comunicarse con los endpoint de autenticacion
 * del backend y administrar la sesion utilizando Storage.
 * 
 * No manipula intefaces.
 * No muestra mensajes.
 * No realiza redirecciones.
 */

const AuthService = (() => {
  /**
   * Inicia sesion.
   *
   * @param {string} username
   * @param {string} password
   *
   * @returns {Promise<Object>}
   */
  const login = async (username, password) => {
    const response = await ApiClient.post("/api/v1/auth/login", {
      username,
      password,
    });

    if (
      response.success &&
      response.data &&
      response.data.access_token &&
      response.data.refresh_token &&
      response.data.user
    ) {
      Storage.saveTokens(
        response.data.access_token,
        response.data.refresh_token,
      );

      Storage.saveUser(response.data.user);
    }
    return response;
  };

  /**
   * Obtiene el usuario autenticado.
   *
   * @returns {Promise<Object>}
   */
  const me = async () => {
    const response = await ApiClient.get("/api/v1/auth/me");

    if (response.success && response.data) {
      Storage.saveUser(response.data);
    }
    return response;
  };

  /**
   * Cierra la sesion.
   */
  const logout = () => {
    Storage.clearSesion();
  };

  /**
   * Verifica si existe una sesion.
   *
   * @returns {boolean}
   */
  const isAuthenticated = () => {
    return Storage.hasSesion();
  };

  /**
   * Devuelve el usuario almacenado.
   *
   * @returns {Object|null}
   */
  const getCurrentUser = () => {
    return Storage.getUser();
  };



  return {
    login,
    logout,
    me,
    isAuthenticated,
    getCurrentUser,
  };

})();
