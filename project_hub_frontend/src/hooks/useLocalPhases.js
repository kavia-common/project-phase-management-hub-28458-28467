import { useEffect, useMemo, useState } from 'react';
import { PHASES } from '../utils/constants';
import { storage } from '../utils/storage';

/**
 * PUBLIC_INTERFACE
 * useLocalPhases
 * Provides CRUD-lite operations for phase items backed by localStorage.
 * Shape in storage: { [phaseId]: Array<{ id, title, description, status, createdAt }> }
 */
export function useLocalPhases() {
  const [phases, setPhases] = useState(() => {
    const initial = storage.get('phases');
    if (initial) return initial;
    // initialize keys for phases 0..3
    const seed = {};
    PHASES.forEach(p => { seed[p.id] = []; });
    return seed;
  });

  // Persist
  useEffect(() => {
    storage.set('phases', phases);
  }, [phases]);

  const addItem = (phaseId, { title, description, status }) => {
    setPhases(prev => {
      const list = prev[phaseId] || [];
      const id = Date.now() + Math.floor(Math.random() * 1000);
      const next = { id, title, description, status, createdAt: Date.now() };
      return { ...prev, [phaseId]: [next, ...list] };
    });
  };

  const updateItem = (phaseId, itemId, updates) => {
    setPhases(prev => {
      const list = prev[phaseId] || [];
      const nextList = list.map(it => (it.id === itemId ? { ...it, ...updates } : it));
      return { ...prev, [phaseId]: nextList };
    });
  };

  const removeItem = (phaseId, itemId) => {
    setPhases(prev => {
      const list = prev[phaseId] || [];
      const nextList = list.filter(it => it.id !== itemId);
      return { ...prev, [phaseId]: nextList };
    });
  };

  const stats = useMemo(() => {
    const s = {};
    Object.keys(phases).forEach(k => {
      const list = phases[k] || [];
      s[k] = {
        todo: list.filter(it => it.status === 'todo').length,
        inprogress: list.filter(it => it.status === 'inprogress').length,
        done: list.filter(it => it.status === 'done').length,
      };
    });
    return s;
  }, [phases]);

  return { phases, addItem, updateItem, removeItem, stats };
}
