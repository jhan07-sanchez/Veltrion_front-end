/**
 * @fileoverview Servicio de autenticacion.
 *
 * @description
 * Responsable de comunicarse con los endpoint de autenticacion
 * del backend y administrar la sesion utilizando Storage.
 *
 * No manipula interfaces.
 * No muestra mensajes.
 * No realiza redirecciones.
 */

import ApiClient from "../core/api.client.js";
import Storage from "../storage/storage.js";

const AuthService = (() => {
  /**
   * Inicia sesion.
   *
   * @param {string} email
   * @param {string} password
   */
  const login = async ({ email, password }) => {
    const response = await ApiClient.post("/api/v1/auth/login/", {
      email,
      password,
    });

    if (!response.success || !response.data) {
      return response;
    }

    const accessToken = response.data.access_token ?? response.data.access;
    const refreshToken = response.data.refresh_token ?? response.data.refresh;
    const currentUser = response.data.user ?? response.data;

    if (accessToken && refreshToken && currentUser) {
      Storage.saveTokens(accessToken, refreshToken);
      Storage.saveUser(currentUser);
    }

    return response;
  };

  /**
   * Obtiene usuario autenticado.
   */
  const me = async () => {
    const response = await ApiClient.get("/api/v1/auth/me/");

    if (response.success && response.data) {
      Storage.saveUser(response.data);
    }

    return response;
  };

  /**
   * Cierra sesión en backend.
   *
   * Invalida el refresh token.
   */
  const logout = async () => {
    const refreshToken = Storage.getRefreshToken();

    if (!refreshToken) {
      return;
    }

    return ApiClient.post("/api/v1/auth/logout/", {
      refresh: refreshToken,
    });
  };
  /**
   * Verifica sesión.
   */
  const isAuthenticated = () => {
    return Storage.hasAccessToken();
  };

  /**
   * Usuario actual.
   */
  const getCurrentUser = () => {
    return Storage.getUser();
  };

  return Object.freeze({
    login,

    logout,

    me,

    isAuthenticated,

    getCurrentUser,
  });
})();

export default AuthService;
