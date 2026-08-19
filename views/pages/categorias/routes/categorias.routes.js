import CategoriaController from "../controllers/categoria.controller.js";
import Routes from "../../../../public/assets/js/core/routes.js";

document.addEventListener("DOMContentLoaded", async () => {
    const path = window.location.pathname;

    if (path.includes("categorias/index.php") || path.endsWith("categorias/")) {
        CategoriaController.initList();
    } 
    else if (path.includes("categorias/crear.php")) {
        await CategoriaController.initForm();
    }
    else if (path.includes("categorias/editar.php")) {
        await CategoriaController.initForm();
        
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        if (id) {
            const form = document.getElementById("categoria-form");
            if (form) form.dataset.id = id;
            CategoriaController.loadEditData(id);
        } else {
            alert("ID de categoría no proporcionado.");
            Routes.go("views/pages/categorias/index.php");
        }
    }
});
