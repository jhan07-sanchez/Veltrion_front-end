import UserService from "../services/user.service.js";
import UserValidator from "../validators/user.validator.js";
import UserTableRenderer from "../renderers/user.table.renderer.js";
import UserFormRenderer from "../renderers/user.form.renderer.js";
import Routes from "../../../../public/assets/js/core/routes.js";
import Utils from "../../../../public/assets/js/core/utils.js";

/**
 * Controlador principal para Usuarios.
 */
const UserController = (() => {
  /*=============================================
    Lista de Usuarios (index.php)
  =============================================*/
  async function initList() {
    UserTableRenderer.initialize(loadPage, handleAction);
    Utils.attachSearchControl("search-users", () => loadPage(1));
    await loadPage(1);
  }

  async function loadPage(page, search = "") {
    UserTableRenderer.renderLoading();
    try {
      const searchInput = document.getElementById("search-users");
      const currentSearch = search || (searchInput ? searchInput.value : "");
      
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
    } else if (action === "restore") {      confirmRestore(id);
    }
  }

  async function confirmDelete(id) {
    if (confirm("¿Está seguro de que desea desactivar este usuario?")) {
      try {
        const response = await UserService.remove(id);
        if (response.ok) {
          alert("Usuario desactivado correctamente.");
          loadPage(1); // Reload current search/page ideally, but 1 is safe
        } else {
          alert(response.message || "Error al desactivar el usuario.");
        }
      } catch (error) {
        alert("Error de red.");
      }
    }
  }

  async function confirmRestore(id) {
    if (confirm("¿Desea restaurar este usuario?")) {
      try {
        const response = await UserService.restore(id);
        if (response.ok) {
          alert("Usuario restaurado correctamente.");
          loadPage(1);
        } else {
          alert(response.message || "Error al restaurar el usuario.");
        }
      } catch (error) {
        alert("Error de red.");
      }
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
      
      try {
        let response;
        if (isEdit) {
          response = await UserService.update(id, data);
        } else {
          response = await UserService.create(data);
        }

        if (response.ok) {
          alert(`Usuario ${isEdit ? 'actualizado' : 'creado'} correctamente.`);
          Routes.go("views/pages/usuarios/index.php");
        } else {
          // Si el backend devuelve errores de validacion (400 o 422)
          if (response.data && typeof response.data === 'object') {
             UserFormRenderer.renderErrors(response.data);
          } else {
             alert(response.message || "Ocurrió un error en el servidor.");
          }
        }
      } catch (error) {
        console.error(error);
        alert("Error de conexión al servidor.");
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
        alert("No se pudo cargar la información del usuario.");
        Routes.go("views/pages/usuarios/index.php");
      }
    } catch (error) {
      alert("Error de conexión.");
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
