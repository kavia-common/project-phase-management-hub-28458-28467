import React from 'react';
import { PhaseForm } from '../components/PhaseForm';
import { PhaseList } from '../components/PhaseList';

/**
 * PUBLIC_INTERFACE
 * PhasePage
 * Manages CRUD-lite for items in a specific phase. All state persists to localStorage
 * via the useLocalPhases hook in parent App.
 * Props:
 * - phase: { id, name, description }
 * - items: Array<PhaseItem>
 * - onAdd: (payload) => void
 * - onUpdate: (itemId, updates) => void
 * - onDelete: (itemId) => void
 * - onBack: () => void
 */
export function PhasePage({ phase, items, onAdd, onUpdate, onDelete }) {
  return (
    <div className="grid" style={{ gap: 20 }}>
      <div className="card" style={{ background: 'var(--grad-2), #fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 20 }}>{phase.name}</div>
            <div style={{ color: 'var(--color-muted)', marginTop: 4 }}>{phase.description}</div>
          </div>
        </div>
        <div style={{ height: 12 }} />
        <PhaseForm onSubmit={onAdd} />
      </div>

      <div className="grid" style={{ gap: 12 }}>
        <PhaseList items={items} onUpdate={onUpdate} onDelete={onDelete} />
      </div>
    </div>
  );
}
