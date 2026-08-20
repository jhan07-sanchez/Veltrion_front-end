import Routes from "../../core/routes.js";

export const KpiRenderer = (() => {
  const render = (widget, container) => {
    const html = `
      <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
        <div class="small-box bg-${widget.color || 'info'} shadow-sm">
          <div class="inner">
            <h3>${widget.value ?? "0"}</h3>
            <p>${widget.title}</p>
          </div>
          <div class="icon">
            <i class="${widget.icon}"></i>
          </div>
          <a href="${Routes.resolveRoute(widget.route ?? "#")}" class="small-box-footer">
            Ver más <i class="fas fa-arrow-circle-right"></i>
          </a>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", html);
  };

  return Object.freeze({ render });
})();
