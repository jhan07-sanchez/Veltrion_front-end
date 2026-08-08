import ApiClient from "../../../../public/assets/js/core/api.client.js";
import { UserRolesConfig } from "../config/user_roles.config.js";
import UserService from "../../usuarios/services/user.service.js";
import RoleService from "../../roles/services/role.service.js";

/**
 * Servicio exclusivo para la entidad UserRole.
 */
const UserRoleService = (() => {
  async function list(page = 1, search = "") {
    const queryParams = new URLSearchParams({ page });
    if (search) {
      queryParams.append("search", search);
    }
    return ApiClient.get(`${UserRolesConfig.API_URL}?${queryParams.toString()}`);
  }

  async function get(id) {
    return ApiClient.get(`${UserRolesConfig.API_URL}${id}/`);
  }

  async function create(data) {
    return ApiClient.post(UserRolesConfig.API_URL, data);
  }

  async function update(id, data) {
    return ApiClient.put(`${UserRolesConfig.API_URL}${id}/`, data);
  }

  async function remove(id) {
    return ApiClient.delete(`${UserRolesConfig.API_URL}${id}/`);
  }

  async function getAllUsers() {
    return UserService.list(1, "");
  }

  async function getAllRoles() {
    return RoleService.list(1, "");
  }

  return Object.freeze({
    list,
    get,
    create,
    update,
    remove,
    getAllUsers,
    getAllRoles,
  });
})();

export default UserRoleService;
