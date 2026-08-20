import RoleController from "../controllers/role.controller.js";
import Routes from "../../../../public/assets/js/core/routes.js";
import NotificationService from "../../../../public/assets/js/services/notification.service.js";

/**
 * Enrutador local del módulo Roles.
 */
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.includes("roles/index.php") || path.endsWith("roles/")) {
        RoleController.initList();
    } 
    else if (path.includes("roles/crear.php")) {
        RoleController.initForm();
    }
    else if (path.includes("roles/editar.php")) {
        RoleController.initForm().then(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            if (id) {
                const form = document.getElementById("role-form");
                if (form) form.dataset.id = id;
                RoleController.loadEditData(id);
            } else {
                NotificationService.error("ID de rol no proporcionado.");
                Routes.go("views/pages/roles/index.php");
            }
        });
    }
});
