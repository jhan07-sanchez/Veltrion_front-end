import UserRoleController from "../controllers/user_role.controller.js";
import Routes from "../../../../public/assets/js/core/routes.js";

/**
 * Enrutador local del módulo Asignación de Roles.
 */
document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.includes("asignacion-roles/index.php") || path.endsWith("asignacion-roles/")) {
        UserRoleController.initList();
    } 
    else if (path.includes("asignacion-roles/crear.php")) {
        UserRoleController.initForm();
    }
    else if (path.includes("asignacion-roles/editar.php")) {
        UserRoleController.initForm().then(() => {
            const urlParams = new URLSearchParams(window.location.search);
            const id = urlParams.get('id');
            if (id) {
                const form = document.getElementById("user-role-form");
                if (form) form.dataset.id = id;
                UserRoleController.loadEditData(id);
            } else {
                alert("ID de asignación no proporcionado.");
                Routes.go("views/pages/asignacion-roles/index.php");
            }
        });
    }
});
