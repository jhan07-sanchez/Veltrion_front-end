import UserRoleService from "../services/user_role.service.js";
import UserRoleValidator from "../validators/user_role.validator.js";
import UserRoleTableRenderer from "../renderers/user_role.table.renderer.js";
import UserRoleFormRenderer from "../renderers/user_role.form.renderer.js";
import Routes from "../../../../public/assets/js/core/routes.js";
import Utils from "../../../../public/assets/js/core/utils.js";
import NotificationService from "../../../../public/assets/js/services/notification.service.js";

/**
 * Controlador principal para UserRoles.
 */
const UserRoleController = (() => {
  async function initList() {
    UserRoleTableRenderer.initialize(loadPage, handleAction);

    await loadPage(1);
  }

  async function loadPage(page, search = "") {
    UserRoleTableRenderer.renderLoading();
    try {
      const currentSearch = search;
      const response = await UserRoleService.list(page, currentSearch);
      if (response.ok) {
        UserRoleTableRenderer.renderData(response.data);
      } else {
        UserRoleTableRenderer.renderError(response.message || "Error al cargar asignaciones.");
      }
    } catch (error) {
      console.error(error);
      UserRoleTableRenderer.renderError("Error de red al cargar asignaciones.");
    }
  }

  function handleAction(action, id) {
    if (action === "edit") {
      Routes.go(`views/pages/asignacion-roles/editar.php?id=${id}`);
    } else if (action === "delete") {
      confirmDelete(id);
    }
  }

  async function confirmDelete(id) {
    const confirmed = await NotificationService.confirm({ text: "¿Está seguro de que desea desactivar esta asignación?" });
    if (!confirmed) return;

    try {
      NotificationService.loading("Desactivando asignación...");
      const response = await UserRoleService.remove(id);
      
      if (response.ok) {
        NotificationService.apiSuccess(response);
        loadPage(1);
      } else {
        NotificationService.apiError(response);
      }
    } catch (error) { 
      NotificationService.apiError(error); 
    }
  }

  async function initForm() {
    UserRoleFormRenderer.initialize();
    await loadSelectOptions();

    const form = document.getElementById("user-role-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      UserRoleFormRenderer.clearErrors();
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      
      const errors = UserRoleValidator.validateForm(data);
      if (errors) { UserRoleFormRenderer.renderErrors(errors); return; }

      const id = form.dataset.id;
      const isEdit = !!id;
      UserRoleFormRenderer.setLoading(true);
      NotificationService.loading("Procesando...");
      
      try {
        const response = isEdit
          ? await UserRoleService.update(id, data)
          : await UserRoleService.create(data);

        if (response.ok) {
          NotificationService.apiSuccess(response);
          Routes.go("views/pages/asignacion-roles/index.php");
        } else {
          if (response.status === 400 || response.status === 422) {
             const validationErrors = response.errors || response.data;
             if (validationErrors && typeof validationErrors === 'object') {
                 UserRoleFormRenderer.renderErrors(validationErrors);
             }
          }
          NotificationService.apiError(response);
        }
      } catch (error) {
        console.error(error);
        NotificationService.apiError(error);
      } finally {
        UserRoleFormRenderer.setLoading(false);
      }
    });
  }

  async function loadSelectOptions() {
    try {
      const [usersResp, rolesResp] = await Promise.all([
        UserRoleService.getAllUsers(),
        UserRoleService.getAllRoles()
      ]);
      if (usersResp.ok && usersResp.data.results) {
        UserRoleFormRenderer.populateUsers(usersResp.data.results);
      }
      if (rolesResp.ok && rolesResp.data.results) {
        UserRoleFormRenderer.populateRoles(rolesResp.data.results);
      }
    } catch (error) {
      console.error("Error cargando opciones de select", error);
    }
  }

  async function loadEditData(id) {
    UserRoleFormRenderer.setLoading(true);
    try {
      const response = await UserRoleService.get(id);
      if (response.ok) {
        UserRoleFormRenderer.fillData(response.data);
      } else {
        NotificationService.apiError(response);
        Routes.go("views/pages/asignacion-roles/index.php");
      }
    } catch (error) { 
      NotificationService.apiError(error); 
    } finally { 
      UserRoleFormRenderer.setLoading(false); 
    }
  }

  return Object.freeze({ initList, initForm, loadEditData });
})();

export default UserRoleController;
