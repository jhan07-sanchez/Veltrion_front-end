export const LayoutBuilder = (() => {
  const build = (container) => {
    container.innerHTML = `
      <!-- Fila 1: KPIs (4 columnas) -->
      <div class="col-12"><div class="row" id="dashboard-kpi-row"></div></div>
      
      <!-- Fila 2: Gráficos (2 columnas) -->
      <div class="col-12"><div class="row mt-2" id="dashboard-chart-row"></div></div>
      
      <!-- Fila 3: Listas y Alertas (2 columnas) -->
      <div class="col-12"><div class="row mt-2" id="dashboard-list-row"></div></div>
      
      <!-- Fila 4: Tablas y Actividad ERP (2 columnas) -->
      <div class="col-12"><div class="row mt-2" id="dashboard-table-row"></div></div>
    `;
    return {
      kpiRow: container.querySelector("#dashboard-kpi-row"),
      chartRow: container.querySelector("#dashboard-chart-row"),
      listRow: container.querySelector("#dashboard-list-row"),
      tableRow: container.querySelector("#dashboard-table-row"),
    };
  };

  const renderEmptyState = (container) => {
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-info">
          No hay widgets disponibles o no tiene permisos para visualizarlos.
        </div>
      </div>
    `;
  };

  return Object.freeze({
    build,
    renderEmptyState
  });
})();
