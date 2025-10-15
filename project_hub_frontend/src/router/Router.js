import { useEffect, useState } from 'react';
import { storage } from '../utils/storage';

/**
 * PUBLIC_INTERFACE
 * AppRouter
 * Provides a minimal internal route state without external dependencies.
 * Persists last view to localStorage.
 *
 * Views:
 * - 'dashboard'
 * - 'phase' with params: { phaseId: number }
 */
export const AppRouter = {
  useRouteState() {
    const [view, setViewState] = useState(() => {
      const saved = storage.get('route.view') || 'dashboard';
      return saved;
    });
    const [params, setParams] = useState(() => storage.get('route.params') || {});

    useEffect(() => {
      storage.set('route.view', view);
      storage.set('route.params', params);
    }, [view, params]);

    const setView = (v, p = {}) => {
      setViewState(v);
      setParams(p);
    };

    return { view, setView, params };
  },
};
