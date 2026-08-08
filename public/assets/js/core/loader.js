/**
 * @fileoverview Loader global de la aplicación.
 */

const Loader = (() => {
  let element = null;

  const initialize = (selector = "#globalLoader") => {
    element = document.querySelector(selector);
  };

  const show = () => {
    if (!element) {
      return;
    }

    element.classList.remove("d-none");
  };

  const hide = () => {
    if (!element) {
      return;
    }

    element.classList.add("d-none");
  };

  return {
    initialize,

    show,

    hide,
  };
})();
