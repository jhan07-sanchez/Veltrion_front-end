import SecurityService from "../../../../public/assets/js/security/security.service.js";

/**
 * Renderizador para la Tabla de Usuarios.
 */
const UserTableRenderer = (() => {
  let tableBody = null;
  let paginationContainer = null;
  let onPageChangeCallback = null;
  let onActionCallback = null;

  function initialize(onPageChange, onAction) {
    tableBody = document.getElementById("users-table-body");
    paginationContainer = document.getElementById("users-pagination");
    onPageChangeCallback = onPageChange;
    onActionCallback = onAction;

    if (tableBody) {
      tableBody.addEventListener("click", (e) => {
        const btn = e.target.closest("button[data-action]");
        if (!btn) return;

        const action = btn.dataset.action;
        const id = btn.dataset.id;
        if (id && action && onActionCallback) {
          onActionCallback(action, id);
        }
      });
    }

    if (paginationContainer) {
      paginationContainer.addEventListener("click", (e) => {
        e.preventDefault();
        const link = e.target.closest("a.page-link");
        if (!link || link.parentElement.classList.contains("disabled")) return;
        
        const page = link.dataset.page;
        if (page && onPageChangeCallback) {
          onPageChangeCallback(parseInt(page));
        }
      });
    }
  }

  function renderLoading() {
    if (tableBody) {
      tableBody.innerHTML = `<tr><td colspan="7" class="text-center py-4"><div class="spinner-border text-primary" role="status"><span class="sr-only">Cargando...</span></div></td></tr>`;
    }
  }

  function renderError(message) {
    if (tableBody) {
      tableBody.innerHTML = `<tr><td colspan="7" class="text-center text-danger py-4"><i class="fas fa-exclamation-triangle"></i> ${message}</td></tr>`;
    }
  }

  function renderData(data) {
    if (!tableBody) return;

    if (!data.results || data.results.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">No se encontraron usuarios.</td></tr>`;
      renderPagination(data);
      return;
    }

    const html = data.results.map((user) => {
      const statusBadge = user.is_active 
        ? `<span class="badge badge-success">Activo</span>` 
        : `<span class="badge badge-danger">Inactivo</span>`;
      
      // Backend returns roles as array of objects with role_name (from RoleListSerializer)
      const rolesBadge = (user.roles || []).map(r => {
        const roleName = r.role_name || r.name || '-';
        return `<span class="badge badge-info mr-1">${roleName}</span>`;
      }).join("");

      let actionButtons = "";
      
      if (SecurityService.hasPermission("users.update")) {
        actionButtons += `<button class="btn btn-sm btn-outline-primary mx-1" data-action="edit" data-id="${user.id_user}" title="Editar"><i class="fas fa-edit"></i></button>`;
      }
      
      if (user.is_active) {
        if (SecurityService.hasPermission("users.delete")) {
          actionButtons += `<button class="btn btn-sm btn-outline-danger mx-1" data-action="delete" data-id="${user.id_user}" title="Desactivar"><i class="fas fa-ban"></i></button>`;
        }
      } else {
        if (SecurityService.hasPermission("users.update")) {
          actionButtons += `<button class="btn btn-sm btn-outline-success mx-1" data-action="restore" data-id="${user.id_user}" title="Restaurar"><i class="fas fa-undo"></i></button>`;
        }
      }

      return `
        <tr>
          <td>${user.document_number || '-'}</td>
          <td>${user.username}</td>
          <td>${user.first_name} ${user.last_name}</td>
          <td>${user.email}</td>
          <td>${rolesBadge || '-'}</td>
          <td>${statusBadge}</td>
          <td class="text-center">${actionButtons}</td>
        </tr>
      `;
    }).join("");

    tableBody.innerHTML = html;
    renderPagination(data);
  }

  function renderPagination(data) {
    if (!paginationContainer) return;

    const totalPages = data.total_pages || 1;
    const currentPage = data.current_page || 1;

    let html = `<ul class="pagination pagination-sm m-0 float-right">`;
    html += `<li class="page-item ${!data.previous ? 'disabled' : ''}"><a class="page-link" href="#" data-page="${currentPage - 1}">&laquo;</a></li>`;
    for (let i = 1; i <= totalPages; i++) {
      html += `<li class="page-item ${i === currentPage ? 'active' : ''}"><a class="page-link" href="#" data-page="${i}">${i}</a></li>`;
    }
    html += `<li class="page-item ${!data.next ? 'disabled' : ''}"><a class="page-link" href="#" data-page="${currentPage + 1}">&raquo;</a></li>`;
    html += `</ul>`;

    paginationContainer.innerHTML = html;
  }

  return Object.freeze({
    initialize,
    renderLoading,
    renderError,
    renderData,
  });
})();

export default UserTableRenderer;
