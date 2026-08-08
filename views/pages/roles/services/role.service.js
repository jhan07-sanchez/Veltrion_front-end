import ApiClient from "../../../../public/assets/js/core/api.client.js";
import { RolesConfig } from "../config/roles.config.js";

/**
 * Servicio exclusivo para la entidad Rol.
 */
const RoleService = (() => {
  async function list(page = 1, search = "") {
    const queryParams = new URLSearchParams({ page });
    if (search) {
      queryParams.append("search", search);
    }
    return ApiClient.get(`${RolesConfig.API_URL}?${queryParams.toString()}`);
  }

  async function get(id) {
    return ApiClient.get(`${RolesConfig.API_URL}${id}/`);
  }

  async function create(data) {
    return ApiClient.post(RolesConfig.API_URL, data);
  }

  async function update(id, data) {
    return ApiClient.put(`${RolesConfig.API_URL}${id}/`, data);
  }

  async function remove(id) {
    return ApiClient.delete(`${RolesConfig.API_URL}${id}/`);
  }

  async function restore(id) {
    return ApiClient.post(`${RolesConfig.API_URL}${id}/restore/`);
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

export default RoleService;
