/**
 * ============================================================
 * Veltrion ERP
 * Dashboard Renderer
 * ============================================================
 *
 * Renderizador dinámico del dashboard.
 *
 * Responsabilidades:
 *
 * - Recibir widgets enviados por backend.
 * - Resolver configuración visual.
 * - Construir tarjetas AdminLTE.
 *
 * No realiza:
 *
 * - Peticiones HTTP.
 * - Validación de permisos.
 * - Manejo de Storage.
 *
 * ============================================================
 */

import Routes from "../core/routes.js";
import { LayoutBuilder } from "./dashboard/layout.builder.js";
import { KpiRenderer } from "./dashboard/kpi.renderer.js";
import { ChartRenderer } from "./dashboard/chart.renderer.js";
import { AlertRenderer } from "./dashboard/alert.renderer.js";
import { ListRenderer } from "./dashboard/list.renderer.js";
import { TableRenderer } from "./dashboard/table.renderer.js";
import AuthService from "../services/auth.service.js";
import Storage from "../storage/storage.js";

const DashboardRenderer = (() => {
  let container = null;

  /**
   * Configuración visual de widgets.
   *
   * El backend envía únicamente códigos.
   * Ej:
   *
   * users_total
   *
   * Aquí se transforma en:
   *
   * Título
   * Icono
   * Color
   *
   */
  const WIDGET_CONFIG = {
    // Fila 1: KPIs
    sales_summary: { title: "Ventas", icon: "fas fa-cash-register", color: "success", type: "kpi" },
    purchases_summary: { title: "Compras", icon: "fas fa-shopping-cart", color: "info", type: "kpi" },
    products_total: { title: "Productos", icon: "fas fa-box", color: "primary", type: "kpi" },
    inventory_alerts: { title: "Stock", icon: "fas fa-exclamation-triangle", color: "warning", type: "kpi" },

    // Fila 2: Gráficas
    sales_monthly: { title: "Ventas últimos 30 días", icon: "fas fa-chart-line", color: "info", type: "chart", chartType: "line" },
    purchases_monthly: { title: "Ventas vs Compras", icon: "fas fa-chart-bar", color: "secondary", type: "chart", chartType: "bar" },

    // Fila 3: Listas
    needs_attention: { title: "Requiere atención", icon: "fas fa-exclamation-circle", color: "danger", type: "list" },
    top_selling_products: { title: "Productos más vendidos", icon: "fas fa-trophy", color: "warning", type: "list" },

    // Fila 4: Tablas y Listas Administrativas
    latest_sales: { title: "Últimas ventas", icon: "fas fa-receipt", color: "success", type: "table", headers: ["ID", "Cliente", "Monto", "Fecha"] },
    erp_activity: { title: "Actividad del ERP", icon: "fas fa-server", color: "dark", type: "list" },
    
    // Antiguos / Administrativos por defecto (por si acaso el backend los envía solos)
    users_total: { title: "Usuarios Totales", icon: "fas fa-users", color: "primary", type: "kpi" },
    users_active: { title: "Usuarios Activos", icon: "fas fa-user-check", color: "success", type: "kpi" },
    customers_total: { title: "Total Clientes", icon: "fas fa-users", color: "primary", type: "kpi" },
    customers_recent: { title: "Clientes Recientes", icon: "fas fa-user-plus", color: "info", type: "kpi" },
    suppliers_active: { title: "Proveedores Activos", icon: "fas fa-truck", color: "success", type: "kpi" },
    roles_distribution: { title: "Distribución de Roles", icon: "fas fa-user-shield", color: "dark", type: "kpi" },
    products_low_stock: { title: "Productos Bajo Stock", icon: "fas fa-exclamation-triangle", color: "warning", type: "kpi" },
    purchases_pending: { title: "Compras Pendientes", icon: "fas fa-shopping-cart", color: "info", type: "kpi" },
  };

  /**
   * Inicializa el renderer.
   *
   * @param {string} selector
   */
  const initialize = (selector = "#dashboardWidgets") => {
    container = document.querySelector(selector);

    const btnRefresh = document.getElementById("btnRefreshDashboard");
    if (btnRefresh) {
      btnRefresh.addEventListener("click", async () => {
        btnRefresh.disabled = true;
        btnRefresh.innerHTML = '<i class="fas fa-spinner fa-spin mr-1"></i> Actualizando...';
        try {
          const response = await AuthService.me();
          if (response && response.success && response.data) {
             const dashboard = response.data.dashboard;
             if (dashboard) {
               render(dashboard.widgets || dashboard.dashboard || dashboard);
               updateTimestamp();
             }
          }
        } catch (e) {
          console.error("Error updating dashboard", e);
        } finally {
          btnRefresh.disabled = false;
          btnRefresh.innerHTML = '<i class="fas fa-sync-alt mr-1"></i> Actualizar';
        }
      });
    }

    updateTimestamp();

    console.log("[DashboardRenderer] Inicializado:", container);
  };

  const updateTimestamp = () => {
    const lbl = document.getElementById("dashboardLastUpdated");
    if (lbl) {
      const now = new Date();
      const dd = String(now.getDate()).padStart(2, '0');
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const yyyy = now.getFullYear();
      const hh = String(now.getHours()).padStart(2, '0');
      const min = String(now.getMinutes()).padStart(2, '0');
      lbl.innerText = `Última actualización: ${dd}/${mm}/${yyyy} ${hh}:${min}`;
    }
  };

  /**
   * Renderiza widgets.
   *
   * @param {Array<Object|string>} widgets
   */
  const render = (widgets = []) => {
    if (!container) {
      console.error("[DashboardRenderer] Container no encontrado");
      return;
    }

    container.innerHTML = "";

    if (!Array.isArray(widgets) || widgets.length === 0) {
      LayoutBuilder.renderEmptyState(container);
      return;
    }

    const layout = LayoutBuilder.build(container);

    const widgetsList = widgets.widgets || widgets.dashboard || widgets;

    if (!Array.isArray(widgetsList)) return;

    widgetsList.forEach((item) => {
      const code = typeof item === "string" ? item : item.code;
      const value = typeof item === "object" ? item.value : null;

      const widget = WIDGET_CONFIG[code];

      if (!widget) {
        console.warn("[DashboardRenderer] Widget no configurado:", code);
        return;
      }

      // Evitar mutar el objeto global y añadir code + value
      const widgetData = { ...widget, code, value };

      if (widget.type === "kpi") {
        KpiRenderer.render(widgetData, layout.kpiRow);
      } else if (widget.type === "chart") {
        ChartRenderer.render(widgetData, layout.chartRow);
      } else if (widget.type === "list") {
        ListRenderer.render(widgetData, layout.listRow);
      } else if (widget.type === "table") {
        TableRenderer.render(widgetData, layout.tableRow);
      } else {
        console.warn(`[DashboardRenderer] Tipo de widget desconocido: ${widget.type} para ${code}`);
      }
    });
  };

  return Object.freeze({
    initialize,

    render,
  });
})();

export default DashboardRenderer;
