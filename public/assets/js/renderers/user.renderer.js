/**
 * ============================================================
 * Veltrion ERP
 * User Renderer
 * ============================================================
 *
 * Renderiza la información del usuario autenticado
 * en el sidebar.
 *
 * No realiza llamadas HTTP.
 * No maneja JWT.
 * No accede directamente a Storage.
 *
 * ============================================================
 */

const UserRenderer = (() => {
  const render = (user = null) => {
    if (!user) {
      console.warn("[UserRenderer] No existe usuario");

      return;
    }

    const userName = user.full_name || user.username || user.email || "Usuario";
    const userEmail = user.email || "";
    const userAvatar = user.photo || null;

    document.querySelectorAll("[data-user-name]").forEach((element) => {
      element.textContent = userName;
    });

    document.querySelectorAll("[data-user-email]").forEach((element) => {
      element.textContent = userEmail;
    });

    document.querySelectorAll("[data-user-avatar]").forEach((element) => {
      if (userAvatar && element.tagName.toLowerCase() === "img") {
        element.src = userAvatar;
      }
    });

    console.log("[UserRenderer] Usuario cargado:", user);
  };

  return Object.freeze({
    render,
  });
})();

export default UserRenderer;
