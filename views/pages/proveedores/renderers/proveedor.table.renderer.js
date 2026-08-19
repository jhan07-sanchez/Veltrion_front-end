import SecurityService from "../../../../public/assets/js/security/security.service.js";

const ProveedorTableRenderer = (() => {
  let tableBody = null;
  let onActionCallback = null;

  function initialize(onPageChange, onAction) {
    tableBody = document.getElementById("proveedores-table-body");
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
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center py-4"><div class="spinner-border text-primary" role="status"><span class="sr-only">Cargando...</span></div></td></tr>`;
    }
  }

  function renderError(message) {
    if (tableBody) {
      tableBody.innerHTML = `<tr><td colspan="6" class="text-center text-danger py-4"><i class="fas fa-exclamation-triangle"></i> ${message}</td></tr>`;
    }
  }

  function renderData(data) {
    if (!tableBody) return;

    if (window.$.fn.DataTable.isDataTable('#example1')) {
      window.$('#example1').DataTable().destroy();
    }

    if (!data.results || data.results.length === 0) {
      tableBody.innerHTML = "";
    } else {
      const html = data.results.map((proveedor) => {
        const statusBadge = proveedor.is_active 
          ? `<span class="badge badge-success">Activo</span>` 
          : `<span class="badge badge-danger">Inactivo</span>`;
        
        let actionButtons = "";
        
        if (SecurityService.hasPermission("suppliers.update")) {
          actionButtons += `<button class="btn btn-sm btn-outline-primary mx-1" data-action="edit" data-id="${proveedor.id_supplier || proveedor.id}" title="Editar"><i class="fas fa-edit"></i></button>`;
        }
        
        if (proveedor.is_active) {
          if (SecurityService.hasPermission("suppliers.delete")) {
            actionButtons += `<button class="btn btn-sm btn-outline-danger mx-1" data-action="delete" data-id="${proveedor.id_supplier || proveedor.id}" title="Desactivar"><i class="fas fa-ban"></i></button>`;
          }
        } else {
          if (SecurityService.hasPermission("suppliers.update")) {
            actionButtons += `<button class="btn btn-sm btn-outline-success mx-1" data-action="restore" data-id="${proveedor.id_supplier || proveedor.id}" title="Restaurar"><i class="fas fa-undo"></i></button>`;
          }
        }

        const supplierName = proveedor.business_name ? proveedor.business_name : `${proveedor.first_name || ''} ${proveedor.last_name || ''}`;

        return `
          <tr>
            <td>${proveedor.document_type || ''} ${proveedor.document_number || '-'}</td>
            <td><strong>${supplierName}</strong></td>
            <td>${proveedor.email || '-'}</td>
            <td>${proveedor.phone || proveedor.mobile || '-'}</td>
            <td>${statusBadge}</td>
            <td class="text-center">${actionButtons}</td>
          </tr>
        `;
      }).join("");

      tableBody.innerHTML = html;
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

  return Object.freeze({
    initialize,
    renderLoading,
    renderError,
    renderData,
  });
})();

export default ProveedorTableRenderer;
