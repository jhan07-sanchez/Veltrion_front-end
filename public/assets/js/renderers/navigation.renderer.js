/**
 * ============================================================
 * Veltrion ERP
 * Navigation Renderer
 * ------------------------------------------------------------
 * Convierte el árbol de navegación generado por el backend
 * en el HTML del sidebar de AdminLTE.
 *
 * Responsabilidad única:
 * Renderizar la navegación.
 *
 * No realiza llamadas HTTP.
 * No consulta Storage.
 * No evalúa permisos.
 * ============================================================
 */

import Routes from "../core/routes.js";

const NavigationRenderer = (() => {
  /**
   * Contenedor del menú.
   *
   * Debe existir en el layout.
   */
  const SIDEBAR_SELECTOR = "[data-sidebar-navigation]";

  /**
   * Renderiza toda la navegación.
   *
   * @param {Array} navigation
   */
  function render(navigation = []) {
    const container = document.querySelector(SIDEBAR_SELECTOR);

    if (!container) {
      return;
    }

    container.innerHTML = "";
    navigation.forEach((node) => {
      container.appendChild(renderNode(node));
    });
  }

  /**
   * Renderiza un nodo.
   */
  function renderNode(node) {
    if (node.children?.length) {
      return renderGroup(node);
    }

    return renderItem(node);
  }

  /**
   * Renderiza un grupo del sidebar.
   */
  function renderGroup(group) {
    const li = document.createElement("li");
    li.className = "nav-item has-treeview";

    const link = document.createElement("a");
    link.href = "#";
    link.className = "nav-link";
    
    const icon = document.createElement("i");
    icon.className = [`nav-icon`, String(group.icon || "").trim()].filter(Boolean).join(" ");

    const caption = document.createElement("p");
    caption.textContent = String(group.title || "");

    const expandIcon = document.createElement("i");
    expandIcon.className = "right fas fa-angle-left";
    caption.appendChild(expandIcon);

    link.append(icon, caption);
    li.appendChild(link);

    const submenu = document.createElement("ul");
    submenu.className = "nav nav-treeview";

    group.children.forEach((child) => {
      submenu.appendChild(renderNode(child));
    });

    li.appendChild(submenu);
    return li;
  }

  /**
   * Renderiza un módulo.
   */
  function renderItem(item) {
    const li = document.createElement("li");
    li.className = "nav-item";

    const link = document.createElement("a");
    link.href = Routes.resolveRoute(item.route);
    link.className = "nav-link";

    const icon = document.createElement("i");
    icon.className = [`nav-icon`, String(item.icon || "").trim()].filter(Boolean).join(" ");

    const caption = document.createElement("p");
    caption.textContent = String(item.title || "");

    link.append(icon, caption);
    li.appendChild(link);

    return li;
  }

  return {
    render,
  };
})();

export default NavigationRenderer;
