import ApiClient from "../../../../public/assets/js/core/api.client.js";
import { ClientesConfig } from "../config/clientes.config.js";

const ClienteService = (() => {
  async function list(page = 1, search = "") {
    const queryParams = new URLSearchParams({ page });
    if (search) queryParams.append("search", search);
    return ApiClient.get(`${ClientesConfig.API_URL}?${queryParams.toString()}`);
  }

  async function get(id) {
    return ApiClient.get(`${ClientesConfig.API_URL}${id}/`);
  }

  async function create(data) {
    return ApiClient.post(ClientesConfig.API_URL, data);
  }

  async function update(id, data) {
    return ApiClient.put(`${ClientesConfig.API_URL}${id}/`, data);
  }

  async function remove(id) {
    return ApiClient.delete(`${ClientesConfig.API_URL}${id}/`);
  }

  async function restore(id) {
    return ApiClient.post(`${ClientesConfig.API_URL}${id}/restore/`);
  }

  return Object.freeze({ list, get, create, update, remove, restore });
})();

export default ClienteService;
