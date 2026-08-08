/**
 * ============================================================
 * @fileoverview Sidebar Renderer
 * ------------------------------------------------------------
 * Renderiza dinámicamente el menú lateral utilizando la
 * navegación enviada por el backend.
 *
 * Responsabilidades:
 *  - Construir el sidebar.
 *  - Construir submenús.
 *  - Marcar la ruta activa.
 *
 * No consulta el backend.
 * No valida permisos.
 * No contiene lógica de negocio.
 * ============================================================
 */

import Routes from "../core/routes.js";

const SidebarRenderer = (() => {
  /**
   * Resuelve una ruta proporcionada por el backend a una ruta absoluta del frontend.
   */
  const resolveRoute = (route) => Routes.resolveRoute(route);
  /**
   * Renderiza el sidebar.
   *
   * @param {Array<Object>} navigation
   * @param {string} containerSelector
   */
  const render = (navigation = [], containerSelector = "#sidebarMenu") => {
    const container = document.querySelector(containerSelector);

    if (!container) {
      console.error("[SidebarRenderer] Contenedor no encontrado.");
      return;
    }

    container.innerHTML = "";

    navigation.forEach((module) => {
      container.appendChild(createModule(module));
    });

    activateCurrentRoute();
  };

  /**
   * Crea un módulo principal.
   */
  const createIcon = (iconClass) => {
    const icon = document.createElement("i");
    icon.className = [`nav-icon`, String(iconClass || "").trim()].filter(Boolean).join(" ");
    return icon;
  };

  const createNavLink = (route, title, iconClass, hasExpandIcon = false) => {
    const link = document.createElement("a");
    link.href = resolveRoute(route);
    link.className = "nav-link";

    link.appendChild(createIcon(iconClass));

    const caption = document.createElement("p");
    caption.textContent = String(title || "");

    if (hasExpandIcon) {
      const expandIcon = document.createElement("i");
      expandIcon.className = "right fas fa-angle-left";
      caption.appendChild(expandIcon);
    }

    link.appendChild(caption);
    return link;
  };

  const createModule = (module) => {
    const li = document.createElement("li");
    li.className = "nav-item";

    if (module.children && module.children.length > 0) {
      li.classList.add("has-treeview");
      li.appendChild(createNavLink("#", module.title, module.icon, true));

      const submenu = document.createElement("ul");
      submenu.className = "nav nav-treeview";

      module.children.forEach((child) => {
        submenu.appendChild(createItem(child));
      });

      li.appendChild(submenu);
      return li;
    }

    li.appendChild(createNavLink(module.route, module.title, module.icon));
    return li;
  };

  /**
   * Crea un elemento hijo.
   */
  const createItem = (item) => {
    const li = document.createElement("li");
    li.className = "nav-item";

    li.appendChild(createNavLink(item.route, item.title, item.icon));
    return li;
  };

  /**
   * Marca la ruta actual.
   */
  const activateCurrentRoute = () => {
    document.querySelectorAll("#sidebarMenu a.nav-link").forEach((link) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        return;
      }

      if (Routes.is(href)) {
        link.classList.add("active");

        const tree = link.closest(".nav-treeview");

        if (tree) {
          tree.style.display = "block";

          const parentItem = tree.closest(".nav-item");

          if (parentItem) {
            parentItem.classList.add("menu-open");

            const parentLink = parentItem.querySelector(":scope > .nav-link");

            if (parentLink) {
              parentLink.classList.add("active");
            }
          }
        }
      }
    });
  };

  return Object.freeze({
    render,
  });
})();

export default SidebarRenderer;
