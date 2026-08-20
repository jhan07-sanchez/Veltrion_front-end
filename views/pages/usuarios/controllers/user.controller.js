import UserService from "../services/user.service.js";
import UserValidator from "../validators/user.validator.js";
import UserTableRenderer from "../renderers/user.table.renderer.js";
import UserFormRenderer from "../renderers/user.form.renderer.js";
import Routes from "../../../../public/assets/js/core/routes.js";
import Utils from "../../../../public/assets/js/core/utils.js";
import NotificationService from "../../../../public/assets/js/services/notification.service.js";

/**
 * Controlador principal para Usuarios.
 */
const UserController = (() => {
  /*=============================================
    Lista de Usuarios (index.php)
  =============================================*/
  async function initList() {
    UserTableRenderer.initialize(loadPage, handleAction);
    await loadPage(1);
  }

  async function loadPage(page, search = "") {
    UserTableRenderer.renderLoading();
    try {
      const currentSearch = search;

      const response = await UserService.list(page, currentSearch);

      if (response.ok) {
        UserTableRenderer.renderData(response.data);
      } else {
        UserTableRenderer.renderError(response.message || "Error al cargar la lista de usuarios.");
      }
    } catch (error) {
      console.error(error);
      UserTableRenderer.renderError("Error de red al cargar usuarios.");
    }
  }

  function handleAction(action, id) {
    if (action === "edit") {
      Routes.go(`views/pages/usuarios/editar.php?id=${id}`);
    } else if (action === "delete") {
      confirmDelete(id);
    } else if (action === "restore") {
      confirmRestore(id);
    }
  }

  async function confirmDelete(id) {
    const confirmed = await NotificationService.confirm({ text: "¿Está seguro de que desea desactivar este usuario?" });
    if (!confirmed) return;

    try {
      NotificationService.loading("Desactivando usuario...");
      const response = await UserService.remove(id);

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

  async function confirmRestore(id) {
    const confirmed = await NotificationService.confirm({ text: "¿Desea restaurar este usuario?", icon: "question" });
    if (!confirmed) return;

    try {
      NotificationService.loading("Restaurando usuario...");
      const response = await UserService.restore(id);

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

  /*=============================================
    Formularios (Crear y Editar)
  =============================================*/
  function initForm() {
    UserFormRenderer.initialize();
    const form = document.getElementById("user-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      UserFormRenderer.clearErrors();

      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());

      // Client-side validation
      const errors = UserValidator.validateForm(data);
      if (errors) {
        UserFormRenderer.renderErrors(errors);
        return;
      }

      const id = form.dataset.id;
      const isEdit = !!id;

      UserFormRenderer.setLoading(true);
      NotificationService.loading("Procesando...");

      try {
        let response;
        if (isEdit) {
          response = await UserService.update(id, data);
        } else {
          response = await UserService.create(data);
        }

        if (response.ok) {
          NotificationService.apiSuccess(response);
          Routes.go("views/pages/usuarios/index.php");
        } else {
          if (response.status === 400 || response.status === 422) {
            const validationErrors = response.errors || response.data;
            if (validationErrors && typeof validationErrors === 'object') {
              UserFormRenderer.renderErrors(validationErrors);
            }
          }
          NotificationService.apiError(response);
        }
      } catch (error) {
        console.error(error);
        NotificationService.apiError(error);
      } finally {
        UserFormRenderer.setLoading(false);
      }
    });
  }

  async function loadEditData(id) {
    UserFormRenderer.setLoading(true);
    try {
      const response = await UserService.get(id);
      if (response.ok) {
        UserFormRenderer.fillData(response.data);
      } else {
        NotificationService.apiError(response);
        Routes.go("views/pages/usuarios/index.php");
      }
    } catch (error) {
      NotificationService.apiError(error);
    } finally {
      UserFormRenderer.setLoading(false);
    }
  }

  return Object.freeze({
    initList,
    initForm,
    loadEditData,
  });
})();

export default UserController;
