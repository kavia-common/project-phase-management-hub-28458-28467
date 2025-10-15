import React from 'react';
import { PHASES } from '../utils/constants';
import { PhaseCard } from '../components/PhaseCard';

/**
 * PUBLIC_INTERFACE
 * Dashboard
 * Displays overview cards per phase with status counts and navigation.
 * Props:
 * - stats: { [phaseId]: { todo, inprogress, done } }
 * - onOpenPhase: (phaseId: number) => void
 */
export function Dashboard({ stats, onOpenPhase }) {
  return (
    <div className="grid grid-4">
      {PHASES.map(phase => (
        <PhaseCard
          key={phase.id}
          phase={phase}
          stats={stats[phase.id] || { todo: 0, inprogress: 0, done: 0 }}
          onOpen={() => onOpenPhase(phase.id)}
        />
      ))}
    </div>
  );
}
