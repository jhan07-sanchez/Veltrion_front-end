import ApiClient from "../../../../public/assets/js/core/api.client.js";
import { CategoriasConfig } from "../config/categorias.config.js";

const CategoriaService = (() => {
  async function list(page = 1, search = "") {
    const queryParams = new URLSearchParams({ page });
    if (search) queryParams.append("search", search);
    return ApiClient.get(`${CategoriasConfig.API_URL}?${queryParams.toString()}`);
  }

  async function get(id) {
    return ApiClient.get(`${CategoriasConfig.API_URL}${id}/`);
  }

  async function create(data) {
    return ApiClient.post(CategoriasConfig.API_URL, data);
  }

  async function update(id, data) {
    return ApiClient.put(`${CategoriasConfig.API_URL}${id}/`, data);
  }

  async function remove(id) {
    return ApiClient.delete(`${CategoriasConfig.API_URL}${id}/`);
  }

  async function restore(id) {
    return ApiClient.post(`${CategoriasConfig.API_URL}${id}/restore/`);
  }

  return Object.freeze({ list, get, create, update, remove, restore });
})();

export default CategoriaService;
