import Routes from "../../core/routes.js";

export const TableRenderer = (() => {
  const render = (widget, container) => {
    const headers = Array.isArray(widget.headers) ? widget.headers : [];
    const rows = Array.isArray(widget.value) ? widget.value : [];
    
    const headersHtml = headers.map(h => `<th class="border-top-0 text-muted font-weight-bold">${h}</th>`).join('');
    
    let rowsHtml = rows.map(row => `
      <tr>
        ${Array.isArray(row) ? row.map((cell, idx) => `<td class="align-middle ${idx === 0 ? 'font-weight-bold text-dark' : 'text-secondary'}">${cell}</td>`).join('') : ''}
      </tr>
    `).join('');

    if (rows.length === 0) {
      rowsHtml = `<tr><td colspan="${headers.length || 1}" class="text-center text-muted py-4">No hay datos disponibles</td></tr>`;
    }

    const html = `
      <div class="col-12 mb-4">
        <div class="card shadow-sm border-0" style="border-radius: 0.75rem;">
          <div class="card-header border-0 bg-white pt-4 pb-2" style="border-radius: 0.75rem 0.75rem 0 0;">
            <h3 class="card-title font-weight-bold text-dark mb-0">
              <i class="${widget.icon} mr-2 text-${widget.color || 'primary'}"></i>${widget.title}
            </h3>
          </div>
          <div class="card-body table-responsive p-0 mt-2 px-3 pb-3">
            <table class="table table-hover mb-0">
              <thead>
                <tr>
                  ${headersHtml}
                </tr>
              </thead>
              <tbody>
                ${rowsHtml}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", html);
  };

  return Object.freeze({ render });
})();
