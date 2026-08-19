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

    if (window.$.fn.DataTable.isDataTable('#example1')) {
      window.$('#example1').DataTable().destroy();
    }

    tableBody.innerHTML = "";

    if (!data.results || data.results.length === 0) {
      // DataTables will show empty message
    } else {

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
    }

    try {
      window.$("#example1").DataTable({
        "responsive": true, 
        "lengthChange": false, 
        "autoWidth": false,
        "dom": "<'row'<'col-sm-12 col-md-6'B><'col-sm-12 col-md-6'f>>" +
               "<'row'<'col-sm-12'tr>>" +
               "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"],
        "language": {
          "url": "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"
        }
      });
    } catch(e) {
      console.error("DataTables initialization error:", e);
    }
  }

  // renderPagination removed

  return Object.freeze({ initialize, renderLoading, renderError, renderData });
})();

export default UserRoleTableRenderer;
