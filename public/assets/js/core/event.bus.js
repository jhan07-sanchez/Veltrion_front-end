/**
 * @fileoverview Bus de eventos de la aplicación.
 */

const EventBus = (() => {
  const events = new Map();

  const on = (event, callback) => {
    if (!events.has(event)) {
      events.set(event, []);
    }

    events.get(event).push(callback);
  };

  const off = (event, callback) => {
    if (!events.has(event)) {
      return;
    }

    events.set(
      event,
      events.get(event).filter((fn) => fn !== callback),
    );
  };

  const emit = (event, payload = null) => {
    if (!events.has(event)) {
      return;
    }

    events.get(event).forEach((callback) => {
      callback(payload);
    });
  };

  return {
    on,

    off,

    emit,
  };
})();
