/**
 * @fileoverview
 * Cliente HTTP centralizado.
 *
 * @description
 * Responsable de toda comunicación entre frontend y backend.
 *
 * El backend es la única fuente de mensajes de negocio.
 * Este cliente no crea mensajes de negocio.
 */

import Storage from "../storage/storage.js";

const ApiClient = (() => {
  const BASE_URL = "http://127.0.0.1:8000";

  /**
   * Ejecuta peticiones HTTP.
   *
   * @param {string} endpoint
   * @param {RequestInit} options
   * @returns {Promise<Object>}
   */
  const request = async (endpoint, options = {}) => {
    const token = Storage.getAccessToken();

    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const config = {
      ...options,
      headers: {
        ...headers,
        ...(options.headers || {}),
      },
    };

    try {
      const response = await fetch(`${BASE_URL}${endpoint}`, config);

      let result = {};

      try {
        result = await response.json();
      } catch {
        result = {};
      }

      return {
        ok: response.ok,
        status: response.status,
        ...result,
      };
    } catch (error) {
      return {
        ok: false,
        status: 0,
        success: false,
        code: "NETWORK_ERROR",
        message: error.message,
        data: null,
        errors: error,
      };
    }
  };

  /**
   * Ejecuta una petición GET.
   */
  const get = (endpoint) => {
    return request(endpoint, {
      method: "GET",
    });
  };

  /**
   * Ejecuta una petición POST.
   */
  const post = (endpoint, body = {}) => {
    return request(endpoint, {
      method: "POST",
      body: JSON.stringify(body),
    });
  };

  /**
   * Ejecuta una petición PUT.
   */
  const put = (endpoint, body = {}) => {
    return request(endpoint, {
      method: "PUT",
      body: JSON.stringify(body),
    });
  };

  /**
   * Ejecuta una petición PATCH.
   */
  const patch = (endpoint, body = {}) => {
    return request(endpoint, {
      method: "PATCH",
      body: JSON.stringify(body),
    });
  };

  /**
   * Ejecuta una petición DELETE.
   */
  const remove = (endpoint) => {
    return request(endpoint, {
      method: "DELETE",
    });
  };

  return Object.freeze({
    get,
    post,
    put,
    patch,
    delete: remove,
  });
})();

export default ApiClient;
