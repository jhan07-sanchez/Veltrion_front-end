/**
 * Renderizador para formularios de Asignación de Roles.
 * Backend fields: "user" (FK id) and "role" (FK id)
 */
const UserRoleFormRenderer = (() => {
  let form = null;
  let submitBtn = null;
  let userSelect = null;
  let roleSelect = null;
  
  function initialize() {
    form = document.getElementById("user-role-form");
    if (form) {
      submitBtn = form.querySelector('button[type="submit"]');
      userSelect = form.querySelector('select[name="user"]');
      roleSelect = form.querySelector('select[name="role"]');
    }
  }

  function renderOptions(selectElement, items, valueKey, labelKey, defaultText) {
    if (!selectElement) return;
    let html = `<option value="">${defaultText}</option>`;
    if (items && items.length > 0) {
      html += items.map(item => `<option value="${item[valueKey]}">${item[labelKey]}</option>`).join("");
    }
    selectElement.innerHTML = html;
  }

  function populateUsers(users) {
    renderOptions(userSelect, users, "id_user", "username", "Seleccione un Usuario...");
  }

  function populateRoles(roles) {
    // Backend RoleListSerializer returns role_name
    renderOptions(roleSelect, roles, "id_role", "role_name", "Seleccione un Rol...");
  }

  function renderErrors(errors) {
    clearErrors();
    if (!form || !errors) return;
    for (const [field, messages] of Object.entries(errors)) {
      const input = form.querySelector(`[name="${field}"]`);
      if (input) {
        input.classList.add("is-invalid");
        const errorContainer = document.createElement("div");
        errorContainer.className = "invalid-feedback";
        errorContainer.innerText = Array.isArray(messages) ? messages[0] : messages;
        input.parentNode.appendChild(errorContainer);
      }
    }
  }

  function clearErrors() {
    if (!form) return;
    form.querySelectorAll(".is-invalid").forEach(i => i.classList.remove("is-invalid"));
    form.querySelectorAll(".invalid-feedback").forEach(c => c.remove());
  }

  function setLoading(isLoading) {
    if (!submitBtn) return;
    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status"></span> Guardando...`;
    } else {
      submitBtn.disabled = false;
      if (submitBtn.dataset.originalText) submitBtn.innerHTML = submitBtn.dataset.originalText;
    }
  }

  function fillData(userRole) {
    if (!form || !userRole) return;
    // Backend UserRoleDetailSerializer returns "user" and "role" as FK IDs
    if (userSelect && userRole.user !== undefined) userSelect.value = userRole.user;
    if (roleSelect && userRole.role !== undefined) roleSelect.value = userRole.role;
  }

  return Object.freeze({ initialize, populateUsers, populateRoles, renderErrors, clearErrors, setLoading, fillData });
})();

export default UserRoleFormRenderer;
