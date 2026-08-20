import UserController from "../controllers/user.controller.js";
import Routes from "../../../../public/assets/js/core/routes.js";
import NotificationService from "../../../../public/assets/js/services/notification.service.js";

/**
 * Enrutador local del módulo Usuarios.
 * Detecta en qué archivo PHP estamos y ejecuta la lógica correspondiente.
 */
document.addEventListener("DOMContentLoaded", () => {
    // Detectamos la ruta actual por la URL
    const path = window.location.pathname;

    if (path.includes("usuarios/index.php") || path.endsWith("usuarios/")) {
        UserController.initList();
    } 
    else if (path.includes("usuarios/crear.php")) {
        UserController.initForm();
    }
    else if (path.includes("usuarios/editar.php")) {
        UserController.initForm();
        
        // Extraer ID de la URL
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) {
            // Guardamos el ID en el form para que el Controller sepa que es edición
            const form = document.getElementById("user-form");
            if (form) form.dataset.id = id;
            
            UserController.loadEditData(id);
        } else {
            NotificationService.error("ID de usuario no proporcionado.");
            Routes.go("views/pages/usuarios/index.php");
        }
    }
});
