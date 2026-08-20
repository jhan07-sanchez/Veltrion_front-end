import CategoriaService from "../services/categoria.service.js";
import CategoriaTableRenderer from "../renderers/categoria.table.renderer.js";
import Routes from "../../../../public/assets/js/core/routes.js";
import NotificationService from "../../../../public/assets/js/services/notification.service.js";

const CategoriaController = (() => {
  async function initList() {
    CategoriaTableRenderer.initialize(loadPage, handleAction);
    await loadPage(1);
  }

  async function loadPage(page, search = "") {
    CategoriaTableRenderer.renderLoading();
    try {
      const response = await CategoriaService.list(page, search);
      if (response.ok) {
        CategoriaTableRenderer.renderData(response.data);
      } else {
        CategoriaTableRenderer.renderError(response.message || "Error al cargar la lista de categorías.");
      }
    } catch (error) {
      console.error(error);
      CategoriaTableRenderer.renderError("Error de red al cargar categorías.");
    }
  }

  function handleAction(action, id) {
    if (action === "edit") {
      Routes.go(`views/pages/categorias/editar.php?id=${id}`);
    } else if (action === "delete") {
      confirmDelete(id);
    } else if (action === "restore") {
      confirmRestore(id);
    }
  }

  async function confirmDelete(id) {
    const confirmed = await NotificationService.confirm({ text: "¿Está seguro de que desea desactivar esta categoría?" });
    if (!confirmed) return;

    try {
      NotificationService.loading("Desactivando categoría...");
      const response = await CategoriaService.remove(id);
      
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
    const confirmed = await NotificationService.confirm({ text: "¿Desea restaurar esta categoría?", icon: "question" });
    if (!confirmed) return;

    try {
      NotificationService.loading("Restaurando categoría...");
      const response = await CategoriaService.restore(id);
      
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
    const form = document.getElementById("categoria-form");
    if (!form) return;

    // Poblar el select de categorías padre
    try {
      const selectParent = document.getElementById("parent");
      const resCategorias = await CategoriaService.list(1, "");

      // La API devuelve: { ok, success, data: { results: [...] } }
      let categories = [];

      if (resCategorias.ok && resCategorias.data) {
        // Si data tiene results (paginación DRF)
        if (resCategorias.data.results) {
          categories = resCategorias.data.results;
        } 
        // Si data es directamente un array
        else if (Array.isArray(resCategorias.data)) {
          categories = resCategorias.data;
        }
      }



      if (categories.length > 0 && selectParent) {
        let optionsHtml = '<option value="">Ninguna (Raíz)</option>';
        categories.forEach(cat => {
          const catId = cat.id_category || cat.id;
          optionsHtml += `<option value="${catId}">${cat.name}</option>`;
        });
        selectParent.innerHTML = optionsHtml;
      }
    } catch (e) {
      console.error("[Categorias] Error al cargar categorías padre:", e);
    }

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const btnSubmit = document.getElementById("btn-submit");
      const spinner = btnSubmit.querySelector(".spinner-border");
      const id = form.dataset.id;
      
      btnSubmit.disabled = true;
      spinner.classList.remove("d-none");

      const parentValue = document.getElementById("parent").value;
      const data = {
        name: document.getElementById("name").value,
        description: document.getElementById("description").value,
        parent: parentValue ? parentValue : null,
      };

      NotificationService.loading("Procesando...");
      try {
        let response;
        if (id) {
          response = await CategoriaService.update(id, data);
        } else {
          response = await CategoriaService.create(data);
        }

        if (response.ok) {
          NotificationService.apiSuccess(response);
          Routes.go("views/pages/categorias/index.php");
        } else {
          NotificationService.apiError(response);
          btnSubmit.disabled = false;
          spinner.classList.add("d-none");
        }
      } catch (error) {
        console.error(error);
        NotificationService.apiError(error);
        btnSubmit.disabled = false;
        spinner.classList.add("d-none");
      }
    });
  }

  async function loadEditData(id) {
    try {
      const response = await CategoriaService.get(id);
      if (response.ok) {
        const data = response.data;
        document.getElementById("name").value = data.name || "";
        document.getElementById("description").value = data.description || "";
        
        const parentSelect = document.getElementById("parent");
        
        // Evitar que la categoría se elija a sí misma como padre
        Array.from(parentSelect.options).forEach(opt => {
          if (opt.value == id) {
            opt.disabled = true;
          }
        });

        if (data.parent) {
          // El backend puede enviar un ID (data.parent) o un objeto (data.parent.id)
          parentSelect.value = typeof data.parent === 'object' ? (data.parent.id_category || data.parent.id) : data.parent;
        }
      } else {
        NotificationService.apiError(response);
        Routes.go("views/pages/categorias/index.php");
      }
    } catch (error) {
      console.error(error);
      NotificationService.apiError(error);
    }
  }

  return Object.freeze({ initList, initForm, loadEditData });
})();

export default CategoriaController;
