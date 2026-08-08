/**
 * ============================================================
 * Veltrion ERP
 * Layout Manager
 * ------------------------------------------------------------
 * Coordinador principal del layout de la aplicación.
 *
 * Responsabilidades:
 *  - Inicializar la interfaz.
 *  - Mostrar información del usuario.
 *  - Inicializar el sidebar.
 *  - Inicializar el dashboard.
 *  - Registrar el cierre de sesión.
 *
 * No realiza llamadas HTTP ni evalúa permisos.
 * ============================================================
 */

const LayoutManager = (() => {
  /**
   * Inicializa todo el layout.
   */
  function initialize() {
    renderUser();

    renderNavigation();

    renderDashboard();

    registerLogout();
  }

  /**
   * Renderiza la información del usuario.
   */
  function renderUser() {
    const user = SessionManager.getUser();

    if (!user) {
      return;
    }

    document.querySelectorAll("[data-user-name]").forEach((element) => {
      element.textContent = user.full_name || user.username;
    });

    document.querySelectorAll("[data-user-email]").forEach((element) => {
      element.textContent = user.email || "";
    });

    document.querySelectorAll("[data-user-avatar]").forEach((element) => {
      if (user.photo) {
        element.src = user.photo;
      }
    });
  }

  /**
   * Delega el renderizado del sidebar.
   */
  function renderNavigation() {
    const navigation = SessionManager.getNavigation();

    if (!navigation) {
      return;
    }

    NavigationRenderer.render(navigation.navigation);
  }

  /**
   * Delega el renderizado del dashboard.
   */
  function renderDashboard() {
    const dashboard = SessionManager.getDashboard();

    if (!dashboard) {
      return;
    }

    DashboardRenderer.render(dashboard.dashboard);
  }

  /**
   * Registra el evento de cerrar sesión.
   */
  function registerLogout() {
    document.querySelectorAll("[data-action='logout']").forEach((button) => {
      button.addEventListener("click", async (event) => {
        event.preventDefault();

        await SessionManager.logout();

        window.location.replace("login.php");
      });
    });
  }

  /**
   * Refresca completamente el layout.
   */
  function refresh() {
    initialize();
  }

  return {
    initialize,

    refresh,
  };
})();
