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
    users_total: {
      title: "Usuarios Totales",

      icon: "fas fa-users",

      color: "primary",
    },

    users_active: {
      title: "Usuarios Activos",

      icon: "fas fa-user-check",

      color: "success",
    },

    customers_recent: {
      title: "Clientes Recientes",

      icon: "fas fa-user-plus",

      color: "info",
    },

    customers_total: {
      title: "Total Clientes",

      icon: "fas fa-users",

      color: "primary",
    },

    purchases_pending: {
      title: "Compras Pendientes",

      icon: "fas fa-shopping-cart",

      color: "warning",
    },

    purchases_monthly: {
      title: "Compras del Mes",

      icon: "fas fa-calendar-alt",

      color: "secondary",
    },

    roles_distribution: {
      title: "Distribución de Roles",

      icon: "fas fa-user-shield",

      color: "dark",
    },

    suppliers_active: {
      title: "Proveedores Activos",

      icon: "fas fa-truck",

      color: "success",
    },

    products_low_stock: {
      title: "Productos Bajo Stock",

      icon: "fas fa-exclamation-triangle",

      color: "danger",
    },

    products_total: {
      title: "Total Productos",

      icon: "fas fa-box",

      color: "primary",
    },

    sales_summary: {
      title: "Resumen de Ventas",

      icon: "fas fa-chart-line",

      color: "success",
    },

    sales_monthly: {
      title: "Ventas del Mes",

      icon: "fas fa-chart-bar",

      color: "info",
    },

    inventory_alerts: {
      title: "Alertas de Inventario",

      icon: "fas fa-bell",

      color: "danger",
    },
  };

  /**
   * Inicializa el renderer.
   *
   * @param {string} selector
   */
  const initialize = (selector = "#dashboardWidgets") => {
    container = document.querySelector(selector);

    console.log("[DashboardRenderer] Inicializado:", container);
  };

  /**
   * Renderiza widgets.
   *
   * @param {Array<string>} widgets
   */
  const render = (widgets = []) => {
    if (!container) {
      console.error("[DashboardRenderer] Container no encontrado");

      return;
    }

    container.innerHTML = "";

    if (!Array.isArray(widgets) || widgets.length === 0) {
      renderEmptyState();

      return;
    }

    widgets.forEach((code) => {
      const widget = WIDGET_CONFIG[code];

      if (!widget) {
        console.warn("[DashboardRenderer] Widget no configurado:", code);

        return;
      }

      container.insertAdjacentHTML("beforeend", createWidget(widget));
    });
  };

  /**
   * Construye tarjeta AdminLTE.
   */
  const createWidget = (widget) => {
    return `


        <div class="col-lg-3 col-md-6 col-sm-12 mb-4">


            <div class="small-box bg-${widget.color}">


                <div class="inner">


                    <h3>
                        ${widget.value ?? 0}
                    </h3>


                    <p>
                        ${widget.title}
                    </p>


                </div>



                <div class="icon">

                    <i class="${widget.icon}">
                    </i>

                </div>




                <a href="${Routes.resolveRoute(widget.route ?? "#")}"
                   class="small-box-footer">

                    Ver más

                    <i class="fas fa-arrow-circle-right">
                    </i>

                </a>



            </div>


        </div>


        `;
  };

  /**
   * Estado vacío.
   */
  const renderEmptyState = () => {
    container.innerHTML = `


        <div class="col-12">


            <div class="alert alert-info">


                No hay widgets disponibles.


            </div>


        </div>


        `;
  };

  return Object.freeze({
    initialize,

    render,
  });
})();

export default DashboardRenderer;
