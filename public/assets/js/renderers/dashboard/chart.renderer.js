export const ChartRenderer = (() => {
  const render = (widget, container) => {
    // Generate a unique ID for the canvas
    const canvasId = `chart-${widget.code}-${Date.now()}`;
    
    // We handle empty state explicitly
    const isEmpty = !widget.value || widget.value === 0 || widget.value === "N/A";

    const html = `
      <div class="col-lg-6 col-md-12 mb-4">
        <div class="card">
          <div class="card-header border-0">
            <h3 class="card-title">${widget.title}</h3>
          </div>
          <div class="card-body">
            ${isEmpty 
              ? `<div class="text-center text-muted p-5">
                   <i class="fas fa-chart-line fa-3x mb-3 text-gray"></i>
                   <p>No hay datos registrados en este periodo.</p>
                 </div>`
              : `<canvas id="${canvasId}" style="min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;"></canvas>`
            }
          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", html);

    // If not empty, initialize Chart.js
    if (!isEmpty && typeof Chart !== 'undefined') {
        // Since we don't have real chart data structures from backend yet, 
        // we use a dummy fallback visualization to show it works, using the single value if passed
        // When real time series data comes, backend will send an array of points.
        const ctx = document.getElementById(canvasId).getContext("2d");
        new Chart(ctx, {
            type: widget.chartType || 'bar',
            data: {
                labels: ['Valor Actual'],
                datasets: [{
                    label: widget.title,
                    backgroundColor: '#007bff',
                    data: [widget.value]
                }]
            },
            options: {
                maintainAspectRatio: false,
                responsive: true
            }
        });
    }
  };

  return Object.freeze({ render });
})();
