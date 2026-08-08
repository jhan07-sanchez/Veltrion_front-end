/**
 * Renderizador para formularios de Usuario (Crear/Editar).
 */
const UserFormRenderer = (() => {
  let form = null;
  let submitBtn = null;
  
  function initialize() {
    form = document.getElementById("user-form");
    if (form) {
      submitBtn = form.querySelector('button[type="submit"]');
    }
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
    const inputs = form.querySelectorAll(".is-invalid");
    inputs.forEach(input => input.classList.remove("is-invalid"));
    
    const errorContainers = form.querySelectorAll(".invalid-feedback");
    errorContainers.forEach(container => container.remove());
  }

  function setLoading(isLoading) {
    if (!submitBtn) return;
    
    if (isLoading) {
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Cargando...`;
    } else {
      submitBtn.disabled = false;
      if (submitBtn.dataset.originalText) {
        submitBtn.innerHTML = submitBtn.dataset.originalText;
      }
    }
  }

  function fillData(user) {
    if (!form || !user) return;
    
    // Fill the inputs matching name attributes
    const inputs = form.querySelectorAll("input, select");
    inputs.forEach(input => {
      const field = input.name;
      if (field && user[field] !== undefined) {
        input.value = user[field];
      }
    });
  }

  return Object.freeze({
    initialize,
    renderErrors,
    clearErrors,
    setLoading,
    fillData,
  });
})();

export default UserFormRenderer;
