import Routes from "../../core/routes.js";

export const ListRenderer = (() => {
  const render = (widget, container) => {
    const items = Array.isArray(widget.value) ? widget.value : [];
    
    let listHtml = items.map(item => `
      <li class="d-flex justify-content-between align-items-center mb-3">
        <div>
          ${item.icon ? `<i class="${item.icon} text-${item.color || 'secondary'} mr-2"></i>` : ''}
          <span class="font-weight-600 text-dark">${item.label}</span>
        </div>
        <div>
          <span class="badge badge-${item.badge || item.color || 'primary'} px-2 py-1" style="font-size: 0.9em;">${item.value}</span>
        </div>
      </li>
    `).join('');

    if (items.length === 0) {
      listHtml = '<li class="text-center text-muted py-3">No hay datos disponibles</li>';
    }

    const html = `
      <div class="col-lg-6 col-xl-4 mb-4">
        <div class="card h-100 shadow-sm border-0" style="border-radius: 0.75rem;">
          <div class="card-header border-0 bg-white pt-4 pb-2" style="border-radius: 0.75rem 0.75rem 0 0;">
            <h3 class="card-title font-weight-bold text-dark mb-0">
              <i class="${widget.icon} mr-2 text-${widget.color || 'primary'}"></i>${widget.title}
            </h3>
          </div>
          <div class="card-body pt-3 pb-4 px-4">
            <ul class="list-unstyled mb-0">
              ${listHtml}
            </ul>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", html);
  };

  return Object.freeze({ render });
})();
