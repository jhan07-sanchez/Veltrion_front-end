/**
 * Validador Frontend de Usuario.
 * Se encarga de validaciones rápidas en cliente para evitar viajes innecesarios al servidor.
 */
const UserValidator = (() => {
  function validateForm(data) {
    const errors = {};

    if (!data.username || data.username.trim() === "") {
      errors.username = ["El nombre de usuario es obligatorio."];
    }
    
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      errors.email = ["Ingrese un correo electrónico válido."];
    }

    if (!data.document_number || data.document_number.trim() === "") {
      errors.document_number = ["El número de documento es obligatorio."];
    }

    if (!data.first_name || data.first_name.trim() === "") {
      errors.first_name = ["El nombre es obligatorio."];
    }

    if (!data.last_name || data.last_name.trim() === "") {
      errors.last_name = ["Los apellidos son obligatorios."];
    }

    // Password validation is typically only on create, or if provided on update
    if (data.password !== undefined) {
      if (data.password.trim() === "") {
        errors.password = ["La contraseña es obligatoria."];
      }
      if (data.password !== data.password_confirm) {
        errors.password_confirm = ["Las contraseñas no coinciden."];
      }
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  return Object.freeze({
    validateForm,
  });
})();

export default UserValidator;
