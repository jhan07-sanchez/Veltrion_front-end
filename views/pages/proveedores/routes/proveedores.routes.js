import ProveedorController from "../controllers/proveedor.controller.js";
import Routes from "../../../../public/assets/js/core/routes.js";

document.addEventListener("DOMContentLoaded", () => {
    const path = window.location.pathname;

    if (path.includes("proveedores/index.php") || path.endsWith("proveedores/")) {
        ProveedorController.initList();
    } 
    else if (path.includes("proveedores/crear.php")) {
        ProveedorController.initForm();
    }
    else if (path.includes("proveedores/editar.php")) {
        ProveedorController.initForm();
        
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) {
            const form = document.getElementById("proveedor-form");
            if (form) form.dataset.id = id;
            ProveedorController.loadEditData(id);
        } else {
            alert("ID de proveedor no proporcionado.");
            Routes.go("views/pages/proveedores/index.php");
        }
    }
});
