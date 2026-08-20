import ClienteService from "../services/cliente.service.js";
import ClienteTableRenderer from "../renderers/cliente.table.renderer.js";
import Routes from "../../../../public/assets/js/core/routes.js";
import NotificationService from "../../../../public/assets/js/services/notification.service.js";

const ClienteController = (() => {
  async function initList() {
    ClienteTableRenderer.initialize(loadPage, handleAction);
    await loadPage(1);
  }

  async function loadPage(page, search = "") {
    ClienteTableRenderer.renderLoading();
    try {
      const response = await ClienteService.list(page, search);
      if (response.ok) {
        ClienteTableRenderer.renderData(response.data);
      } else {
        ClienteTableRenderer.renderError(response.message || "Error al cargar la lista de clientes.");
      }
    } catch (error) {
      console.error(error);
      ClienteTableRenderer.renderError("Error de red al cargar clientes.");
    }
  }

  function handleAction(action, id) {
    if (action === "edit") {
      Routes.go(`views/pages/clientes/editar.php?id=${id}`);
    } else if (action === "delete") {
      confirmDelete(id);
    } else if (action === "restore") {
      confirmRestore(id);
    }
  }

  async function confirmDelete(id) {
    const confirmed = await NotificationService.confirm({ text: "¿Está seguro de que desea desactivar este cliente?" });
    if (!confirmed) return;

    try {
      NotificationService.loading("Desactivando cliente...");
      const response = await ClienteService.remove(id);
      
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
    const confirmed = await NotificationService.confirm({ text: "¿Desea restaurar este cliente?", icon: "question" });
    if (!confirmed) return;

    try {
      NotificationService.loading("Restaurando cliente...");
      const response = await ClienteService.restore(id);
      
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
    const form = document.getElementById("cliente-form");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      
      const btnSubmit = document.getElementById("btn-submit");
      const spinner = btnSubmit.querySelector(".spinner-border");
      const id = form.dataset.id;
      
      btnSubmit.disabled = true;
      spinner.classList.remove("d-none");

      const data = {
        document_type: document.getElementById("document_type").value,
        document_number: document.getElementById("document_number").value,
        business_name: document.getElementById("business_name").value,
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        mobile: document.getElementById("mobile").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value,
        country: document.getElementById("country").value,
        notes: document.getElementById("notes").value,
      };

      NotificationService.loading("Procesando...");
      try {
        let response;
        if (id) {
          response = await ClienteService.update(id, data);
        } else {
          response = await ClienteService.create(data);
        }

        if (response.ok) {
          NotificationService.apiSuccess(response);
          Routes.go("views/pages/clientes/index.php");
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
      const response = await ClienteService.get(id);
      if (response.ok) {
        const data = response.data;
        document.getElementById("document_type").value = data.document_type || "CC";
        document.getElementById("document_number").value = data.document_number || "";
        document.getElementById("business_name").value = data.business_name || "";
        document.getElementById("first_name").value = data.first_name || "";
        document.getElementById("last_name").value = data.last_name || "";
        document.getElementById("email").value = data.email || "";
        document.getElementById("phone").value = data.phone || "";
        document.getElementById("mobile").value = data.mobile || "";
        document.getElementById("address").value = data.address || "";
        document.getElementById("city").value = data.city || "";
        document.getElementById("country").value = data.country || "";
        document.getElementById("notes").value = data.notes || "";
      } else {
        NotificationService.apiError(response);
        Routes.go("views/pages/clientes/index.php");
      }
    } catch (error) {
      console.error(error);
      NotificationService.apiError(error);
    }
  }

  return Object.freeze({ initList, initForm, loadEditData });
})();

export default ClienteController;
