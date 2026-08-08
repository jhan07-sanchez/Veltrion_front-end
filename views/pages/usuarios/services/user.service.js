import ApiClient from "../../../../public/assets/js/core/api.client.js";
import { UsersConfig } from "../config/users.config.js";

/**
 * Servicio exclusivo para la entidad Usuario.
 */
const UserService = (() => {
  async function list(page = 1, search = "") {
    const queryParams = new URLSearchParams({ page });
    if (search) {
      queryParams.append("search", search);
    }
    return ApiClient.get(`${UsersConfig.API_URL}?${queryParams.toString()}`);
  }

  async function get(id) {
    return ApiClient.get(`${UsersConfig.API_URL}${id}/`);
  }

  async function create(data) {
    return ApiClient.post(UsersConfig.API_URL, data);
  }

  async function update(id, data) {
    return ApiClient.put(`${UsersConfig.API_URL}${id}/`, data);
  }

  async function remove(id) {
    return ApiClient.delete(`${UsersConfig.API_URL}${id}/`);
  }

  async function restore(id) {
    return ApiClient.post(`${UsersConfig.API_URL}${id}/restore/`);
  }

  return Object.freeze({
    list,
    get,
    create,
    update,
    remove,
    restore,
  });
})();

export default UserService;
