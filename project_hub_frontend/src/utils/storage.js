const PREFIX = 'projecthub';

function key(k) {
  return `${PREFIX}.${k}`;
}

/**
 * PUBLIC_INTERFACE
 * storage
 * Thin wrapper over localStorage with JSON serialization.
 */
export const storage = {
  get: (k) => {
    try {
      const raw = localStorage.getItem(key(k));
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },
  set: (k, v) => {
    try {
      localStorage.setItem(key(k), JSON.stringify(v));
    } catch {
      // ignore quota errors
    }
  },
  remove: (k) => {
    try {
      localStorage.removeItem(key(k));
    } catch {
      // ignore
    }
  }
};
