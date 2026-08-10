/**
 * @fileoverview
 * Renderer encargado de visualizar el catálogo dinámico
 * de permisos y acciones de Veltrion.
 *
 * Responsabilidades:
 *
 * - Renderizar módulos.
 * - Renderizar permisos.
 * - Renderizar acciones.
 * - Gestionar selección de permisos.
 *
 * No realiza peticiones HTTP.
 * No contiene lógica de negocio.
 */

const RolePermissionsRenderer = (() => {
  const containerSelector = "#role-permissions";

  /**
   * Escapa contenido HTML para evitar inyección.
   *
   * @param {string} value
   * @returns {string}
   */
  const escapeHtml = (value) => {
    const div = document.createElement("div");
    div.textContent = value ?? "";
    return div.innerHTML;
  };

  /**
   * Renderiza el catálogo completo.
   *
   * @param {Array} modules
   * @param {Object} selectedPermissions
   */
  const render = (modules = [], selectedPermissions = {}) => {
    const container = document.querySelector(containerSelector);

    if (!container) {
      return;
    }

    if (!modules.length) {
      container.innerHTML = `
                <div class="alert alert-info">
                    No existen permisos disponibles.
                </div>
            `;

      return;
    }

    container.innerHTML = modules
      .map((module) => {
        return renderModule(module, selectedPermissions);
      })
      .join("");

    attachEvents();
  };

  /**
   * Renderiza un módulo.
   *
   * @param {Object} module
   * @param {Object} selectedPermissions
   * @returns {string}
   */
  const renderModule = (module, selectedPermissions) => {
    const permissions = module.permissions ?? [];
    const actions = module.actions ?? [];

    return `
            <div class="card card-outline card-primary mb-3">
                <div class="card-header">
                    <h3 class="card-title">
                        <i class="${escapeHtml(module.icon)} mr-2"></i>
                        ${escapeHtml(module.label)}
                    </h3>

                    <div class="card-tools">
                        <button
                            type="button"
                            class="btn btn-tool"
                            data-toggle="collapse"
                            data-target="#module-${escapeHtml(
                              module.module_id,
                            )}"
                        >
                            <i class="fas fa-chevron-down"></i>
                        </button>
                    </div>
                </div>

                <div
                    id="module-${escapeHtml(module.module_id)}"
                    class="card-body collapse show"
                >
                    ${renderPermissions(permissions, selectedPermissions)}

                    ${renderActions(actions, selectedPermissions)}
                </div>
            </div>
        `;
  };

  /**
   * Renderiza permisos CRUD.
   *
   * @param {Array} permissions
   * @param {Object} selectedPermissions
   * @returns {string}
   */
  const renderPermissions = (permissions, selectedPermissions) => {
    if (!permissions.length) {
      return "";
    }

    return `
            <h5 class="mb-3">
                <i class="fas fa-shield-alt mr-1"></i>
                Permisos
            </h5>

            <div class="row">
                ${permissions
                  .map((permission) => {
                    return renderCheckbox(permission, selectedPermissions);
                  })
                  .join("")}
            </div>
        `;
  };

  /**
   * Renderiza acciones especiales.
   *
   * @param {Array} actions
   * @param {Object} selectedPermissions
   * @returns {string}
   */
  const renderActions = (actions, selectedPermissions) => {
    if (!actions.length) {
      return "";
    }

    return `
            <hr>

            <h5 class="mb-3">
                <i class="fas fa-bolt mr-1"></i>
                Acciones
            </h5>

            <div class="row">
                ${actions
                  .map((action) => {
                    return renderCheckbox(action, selectedPermissions);
                  })
                  .join("")}
            </div>
        `;
  };

  /**
   * Renderiza un checkbox.
   *
   * @param {Object} item
   * @param {Object} selectedPermissions
   * @returns {string}
   */
  const renderCheckbox = (item, selectedPermissions) => {
    const checked = selectedPermissions[item.code] === true ? "checked" : "";

    return `
            <div class="col-md-6 col-lg-4 mb-2">
                <div class="custom-control custom-checkbox">
                    <input
                        type="checkbox"
                        class="custom-control-input"
                        id="permission-${escapeHtml(item.code)}"
                        data-permission-code="${escapeHtml(item.code)}"
                        ${checked}
                    >

                    <label
                        class="custom-control-label"
                        for="permission-${escapeHtml(item.code)}"
                    >
                        ${escapeHtml(item.description)}
                    </label>
                </div>
            </div>
        `;
  };

  /**
   * Registra eventos sobre los checkboxes.
   */
  const attachEvents = () => {
    const container = document.querySelector(containerSelector);

    if (!container) {
      return;
    }

    container.querySelectorAll("[data-permission-code]").forEach((checkbox) => {
      checkbox.addEventListener("change", () => {
        container.dispatchEvent(new CustomEvent("permissions:changed"));
      });
    });
  };

  /**
   * Obtiene los permisos actualmente seleccionados.
   *
   * @returns {Object}
   */
  const getSelectedPermissions = () => {
    const container = document.querySelector(containerSelector);

    if (!container) {
      return {};
    }

    const permissions = {};

    container
      .querySelectorAll("[data-permission-code]:checked")
      .forEach((checkbox) => {
        permissions[checkbox.dataset.permissionCode] = true;
      });

    return permissions;
  };

  return Object.freeze({
    render,
    getSelectedPermissions,
  });
})();

export default RolePermissionsRenderer;
