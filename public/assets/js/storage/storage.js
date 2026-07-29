/**
 * @fileoverview Administrador centrar de almacenamiento.
 * 
 * @description
 * Responsable de gestionar la sesion del usuario:
 * 
 * - Access token JWT
 * - Refresh token JWT
 * - Usuario autenticado
 * 
 * No contiene logica de negocio.
 * No muestra mensajes.
 * No realiza peticiones HTTP.
 */

const Storage = (() => {
  /**
   * Claves utilizadas en localStorage.
   *
   * Centralizadas para evitar errores
   * por escritura manual.
   */
  const KEYS = {
    ACCESS_TOKEN: "veltrion_access_token",

    REFRESH_TOKEN: "veltrion_refresh_token",

    USER: "veltrion_user",
  };

  /**
   * Guarda tokens JWT.
   *
   * @param {string} accessToken
   * @param {string} refreshToken
   */
  const saveTokens = (accessToken, refreshToken) => {
    localStorage.setItem(KEYS.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(KEYS.REFRESH_TOKEN, refreshToken);
  };

  /**
   * Obtiene access token.
   *
   * @returns {string|null}
   */
  const getAccessToken = () => {
    return localStorage.getItem(KEYS.ACCESS_TOKEN);
  };

  /**
   * Obtiene el refresh token.
   *
   * @returns {string|null}
   */
  const getRefreshToken = () => {
    return localStorage.getItem(KEYS.REFRESH_TOKEN);
  };

  /**
   * Guarda usuario autenticado.
   *
   * Guarda exactamente la informacion enviada por el back-end.
   * @param {Object} user
   */
  const saveUser = (user) => {
    localStorage.setItem(KEYS.USER, JSON.stringify(user));
  };

  /**
   * Recupera usuario autenticado.
   *
   * @returns {Object|null}
   */
  const getUser = () => {
    const user = localStorage.getItem(KEYS.USER);

    if(!user){
        return null;
    }

    try {
        return JSON.parse(user);
    }catch(error){
        return null;
    }
  };


  /**
   * Verifica si existe sesion activa.
   * 
   * No valida JWT.
   * Solo verifica almacenamiento.
   * 
   * @returns {boolean}
   */
  const hasSesion = () => {
    return Boolean(getAccessToken());
  };



  /**
   * Elimina toda la sesion.
   */
  const cleanSesion = () => {
    Object.values(KEYS).forEach(key => {
        localStorage.removeItem(key);
    });
  };



  /**
   * Devuelve toda la sesion actual.
   * 
   * Util para debugging.
   * 
   * @returns {Object}
   */
  const getSesion = () => {
    return{
        accessToken: getAccessToken(),
        refreshToken: getRefreshToken(),
        user: getUser()
    };
  };



  return {
    saveTokens,
    getAccessToken,
    getRefreshToken,
    saveUser,
    getUser,
    hasSesion,
    cleanSesion,
    getSesion
  };

})();
