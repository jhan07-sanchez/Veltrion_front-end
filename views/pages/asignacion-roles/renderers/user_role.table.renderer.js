import SecurityService from "../../../../public/assets/js/security/security.service.js";

/**
 * Renderizador para la Tabla de UserRoles.
 */
const UserRoleTableRenderer = (() => {
  let tableBody = null;
  let paginationContainer = null;
  let onPageChangeCallback = null;
  let onActionCallback = null;

  function initialize(onPageChange, onAction) {
    tableBody = document.getElementById("user-roles-table-body");
    paginationContainer = document.getElementById("user-roles-pagination");
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
      tableBody.innerHTML = `<tr><td colspan="4" class="text-center py-4"><div class="spinner-border text-primary" role="status"><span class="sr-only">Cargando...</span></div></td></tr>`;
    }
  }

  function renderError(message) {
    if (tableBody) {
      tableBody.innerHTML = `<tr><td colspan="4" class="text-center text-danger py-4"><i class="fas fa-exclamation-triangle"></i> ${message}</td></tr>`;
    }
  }

  const getAssignmentDate = (record) => {
    const candidate = record.assigned_at || record.assignment_date || record.assigned_date || record.date_assigned || record.assignedOn || record.assigned_on || record.date || record.created_at || record.createdAt;
    if (!candidate) return null;

    const value = typeof candidate === "string" ? candidate.trim() : candidate;
    const normalizedValue = /^[0-9]+$/.test(String(value)) ? Number(value) : value;
    const date = new Date(normalizedValue);

    return Number.isNaN(date.getTime()) ? null : date.toLocaleDateString();
  };

  function renderData(data) {
    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (!data.results || data.results.length === 0) {
      const row = document.createElement("tr");
      const cell = document.createElement("td");
      cell.colSpan = 4;
      cell.className = "text-center text-muted py-4";
      cell.textContent = "No se encontraron asignaciones.";
      row.appendChild(cell);
      tableBody.appendChild(row);
      renderPagination(data);
      return;
    }

    data.results.forEach((ur) => {
      const username = ur.username || "-";
      const rolename = ur.role_name || "-";
      const assignmentDate = getAssignmentDate(ur) || "-";

      const row = document.createElement("tr");

      const usernameCell = document.createElement("td");
      usernameCell.textContent = username;
      row.appendChild(usernameCell);

      const roleCell = document.createElement("td");
      const badge = document.createElement("span");
      badge.className = "badge badge-info";
      badge.textContent = rolename;
      roleCell.appendChild(badge);
      row.appendChild(roleCell);

      const dateCell = document.createElement("td");
      dateCell.textContent = assignmentDate;
      row.appendChild(dateCell);

      const actionCell = document.createElement("td");
      actionCell.className = "text-center";

      if (SecurityService.hasPermission("user_roles.update")) {
        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "btn btn-sm btn-outline-primary mx-1";
        editButton.dataset.action = "edit";
        editButton.dataset.id = ur.id_user_role;
        editButton.title = "Editar";
        const editIcon = document.createElement("i");
        editIcon.className = "fas fa-edit";
        editButton.appendChild(editIcon);
        actionCell.appendChild(editButton);
      }

      if (SecurityService.hasPermission("user_roles.delete")) {
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "btn btn-sm btn-outline-danger mx-1";
        deleteButton.dataset.action = "delete";
        deleteButton.dataset.id = ur.id_user_role;
        deleteButton.title = "Desactivar";
        const deleteIcon = document.createElement("i");
        deleteIcon.className = "fas fa-ban";
        deleteButton.appendChild(deleteIcon);
        actionCell.appendChild(deleteButton);
      }

      row.appendChild(actionCell);
      tableBody.appendChild(row);
    });

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

  return Object.freeze({ initialize, renderLoading, renderError, renderData });
})();

export default UserRoleTableRenderer;
