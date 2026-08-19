import RoleService from "../services/role.service.js";
import RoleValidator from "../validators/role.validator.js";
import RoleTableRenderer from "../renderers/role.table.renderer.js";
import RoleFormRenderer from "../renderers/role.form.renderer.js";
import Routes from "../../../../public/assets/js/core/routes.js";
import Utils from "../../../../public/assets/js/core/utils.js";
import SecurityService from "../../../../public/assets/js/security/security.service.js";
import RolePermissionsRenderer from "../renderers/role-permission.renderer.js";

/**
 * Controlador principal para Roles.
 */
const RoleController = (() => {
  /*=============================================
    Lista de Roles
  =============================================*/
  let permissionModules = [];
  async function initList() {
    RoleTableRenderer.initialize(loadPage, handleAction);
    await loadPage(1);
  }

  async function loadPage(page, search = "") {
    RoleTableRenderer.renderLoading();
    try {
      const currentSearch = search;
      
      const response = await RoleService.list(page, currentSearch);
      
      if (response.ok) {
        RoleTableRenderer.renderData(response.data);
      } else {
        RoleTableRenderer.renderError(response.message || "Error al cargar la lista de roles.");
      }
    } catch (error) {
      console.error(error);
      RoleTableRenderer.renderError("Error de red al cargar roles.");
    }
  }

  function handleAction(action, id) {
    if (action === "edit") {
      Routes.go(`views/pages/roles/editar.php?id=${id}`);
    } else if (action === "delete") {
      confirmDelete(id);
    } else if (action === "restore") {
      confirmRestore(id);
    }
  }

  async function confirmDelete(id) {
    if (confirm("¿Está seguro de que desea desactivar este rol?")) {
      try {
        const response = await RoleService.remove(id);
        if (response.ok) {
          alert("Rol desactivado correctamente.");
          loadPage(1);
        } else {
          alert(response.message || "Error al desactivar el rol.");
        }
      } catch (error) {
        alert("Error de red.");
      }
    }
  }

  async function confirmRestore(id) {
    if (confirm("¿Desea restaurar este rol?")) {
      try {
        const response = await RoleService.restore(id);
        if (response.ok) {
          alert("Rol restaurado correctamente.");
          loadPage(1);
        } else {
          alert(response.message || "Error al restaurar el rol.");
        }
      } catch (error) {
        alert("Error de red.");
      }
    }
  }

  /*=============================================
    Formularios
  =============================================*/
  async function initForm() {
    RoleFormRenderer.initialize();
    
    try {
      const catalogResponse = await SecurityService.loadPermissionCatalog();
      if (catalogResponse.ok && catalogResponse.data && catalogResponse.data.modules) {
        permissionModules = catalogResponse.data.modules;
        RolePermissionsRenderer.render(permissionModules, {});
      } else {
        console.error("No se pudo cargar el catálogo de permisos.");
      }
    } catch (e) {
      console.error("Error al cargar el catálogo de permisos", e);
    }

    const form = document.getElementById("role-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      RoleFormRenderer.clearErrors();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      data.permissions = RolePermissionsRenderer.getSelectedPermissions();
      
      const errors = RoleValidator.validateForm(data);
      if (errors) {
        RoleFormRenderer.renderErrors(errors);
        return;
      }

      const id = form.dataset.id;
      const isEdit = !!id;

      RoleFormRenderer.setLoading(true);
      
      try {
        let response;
        if (isEdit) {
          response = await RoleService.update(id, data);
        } else {
          response = await RoleService.create(data);
        }

        if (response.ok) {
          alert(`Rol ${isEdit ? 'actualizado' : 'creado'} correctamente.`);
          Routes.go("views/pages/roles/index.php");
        } else {
          if (response.data && typeof response.data === 'object') {
             RoleFormRenderer.renderErrors(response.data);
          } else {
             alert(response.message || "Ocurrió un error en el servidor.");
          }
        }
      } catch (error) {
        console.error(error);
        alert("Error de conexión al servidor.");
      } finally {
        RoleFormRenderer.setLoading(false);
      }
    });
  }

  async function loadEditData(id) {
    RoleFormRenderer.setLoading(true);
    try {
      const response = await RoleService.get(id);
      if (response.ok) {
        RoleFormRenderer.fillData(response.data);
        if (permissionModules.length > 0) {
          RolePermissionsRenderer.render(permissionModules, response.data.permissions || {});
        }
      } else {
        alert("No se pudo cargar la información del rol.");
        Routes.go("views/pages/roles/index.php");
      }
    } catch (error) {
      alert("Error de conexión.");
    } finally {
      RoleFormRenderer.setLoading(false);
    }
  }

  return Object.freeze({
    initList,
    initForm,
    loadEditData,
  });
})();

export default RoleController;
