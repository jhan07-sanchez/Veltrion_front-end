import Routes from "../../core/routes.js";

export const AlertRenderer = (() => {
  const render = (widget, container) => {
    // Determine if it should be an info-box (for alerts requiring attention)
    const alertLevel = widget.alertLevel || "warning";
    
    const html = `
      <div class="col-lg-4 col-md-6 col-sm-12 mb-4">
        <div class="info-box bg-${alertLevel} shadow-sm">
          <span class="info-box-icon"><i class="${widget.icon}"></i></span>
          <div class="info-box-content">
            <span class="info-box-text">${widget.title}</span>
            <span class="info-box-number">${widget.value ?? "0"}</span>
            <div class="progress">
              <div class="progress-bar" style="width: 100%"></div>
            </div>
            <span class="progress-description text-right mt-1">
              <a href="${Routes.resolveRoute(widget.route ?? "#")}" class="text-white">
                Ver detalle <i class="fas fa-arrow-circle-right"></i>
              </a>
            </span>
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", html);
  };

  return Object.freeze({ render });
})();
