/**
 * Validador Frontend de UserRole.
 * Backend expects fields: "user" and "role" (FK IDs)
 */
const UserRoleValidator = (() => {
  function validateForm(data) {
    const errors = {};

    if (!data.user || data.user.trim() === "") {
      errors.user = ["Debe seleccionar un usuario."];
    }
    
    if (!data.role || data.role.trim() === "") {
      errors.role = ["Debe seleccionar un rol."];
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  return Object.freeze({
    validateForm,
  });
})();

export default UserRoleValidator;
