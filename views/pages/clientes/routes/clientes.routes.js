import ClienteController from "../controllers/cliente.controller.js";
import Routes from "../../../../public/assets/js/core/routes.js";
import NotificationService from "../../../../public/assets/js/services/notification.service.js";

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.includes("clientes/index.php") || path.endsWith("clientes/")) {
        ClienteController.initList();
    } 
    else if (path.includes("clientes/crear.php")) {
        ClienteController.initForm();
    }
    else if (path.includes("clientes/editar.php")) {
        ClienteController.initForm();
        
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) {
            const form = document.getElementById("cliente-form");
            if (form) form.dataset.id = id;
            ClienteController.loadEditData(id);
        } else {
            NotificationService.error("ID de cliente no proporcionado.");
            Routes.go("views/pages/clientes/index.php");
        }
    }
});
