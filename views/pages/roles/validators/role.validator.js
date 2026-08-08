/**
 * Validador Frontend de Rol.
 */
const RoleValidator = (() => {
  function validateForm(data) {
    const errors = {};

    if (!data.role_name || data.role_name.trim() === "") {
      errors.role_name = ["El nombre del rol es obligatorio."];
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  return Object.freeze({
    validateForm,
  });
})();

export default RoleValidator;
