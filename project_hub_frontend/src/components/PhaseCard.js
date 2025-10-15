import React from 'react';

/**
 * PUBLIC_INTERFACE
 * PhaseCard
 * Shows a phase title, description and status counts. Click navigates.
 * Props:
 * - phase: { id, name, description }
 * - stats: { todo, inprogress, done }
 * - onOpen: () => void
 */
export function PhaseCard({ phase, stats, onOpen }) {
  const total = (stats.todo || 0) + (stats.inprogress || 0) + (stats.done || 0);

  return (
    <button className="phase-card" onClick={onOpen} aria-label={`Open ${phase.name}`}>
      <div className="title">{phase.name}</div>
      <div className="desc">{phase.description}</div>
      <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
        <span className="badge"><span>All</span> {total}</span>
        <span className="badge"><span>Todo</span> {stats.todo || 0}</span>
        <span className="badge"><span>Doing</span> {stats.inprogress || 0}</span>
        <span className="badge"><span>Done</span> {stats.done || 0}</span>
      </div>
    </button>
  );
}
