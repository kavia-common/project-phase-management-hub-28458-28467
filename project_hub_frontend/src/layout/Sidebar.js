import React from 'react';
import { PHASES } from '../utils/constants';

/**
 * PUBLIC_INTERFACE
 * Sidebar
 * Left navigation with brand, dashboard link, and phase links.
 * Props:
 * - collapsed: boolean
 * - onToggleCollapse: fn
 * - activeView: 'dashboard' | 'phase'
 * - activePhaseId: number
 * - onNavigate: (view, params?) => void
 * - stats: { [phaseId]: { todo, inprogress, done } }
 */
export function Sidebar({
  collapsed,
  onToggleCollapse,
  activeView,
  activePhaseId,
  onNavigate,
  stats,
}) {
  return (
    <div>
      <div className="sidebar-brand" aria-label="Project Hub">
        <div
          style={{
            width: 34,
            height: 34,
            borderRadius: 10,
            background: 'linear-gradient(135deg, rgba(37,99,235,0.85), rgba(245,158,11,0.85))',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontWeight: 800,
            boxShadow: '0 8px 20px rgba(37,99,235,0.35)',
          }}
        >
          PH
        </div>
        {!collapsed && <span>Project Hub</span>}
        <button
          className="btn ghost"
          style={{ marginLeft: 'auto', padding: '6px 8px' }}
          onClick={onToggleCollapse}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          {collapsed ? '»' : '«'}
        </button>
      </div>

      <nav className="sidebar-nav">
        <button
          className={`sidebar-link ${activeView === 'dashboard' ? 'active' : ''}`}
          onClick={() => onNavigate('dashboard')}
          aria-current={activeView === 'dashboard' ? 'page' : undefined}
        >
          <span role="img" aria-label="dashboard">📊</span>
          {!collapsed && <span>Dashboard</span>}
        </button>

        <div style={{ height: 8 }} />

        {PHASES.map(p => {
          const s = stats[p.id] || { todo: 0, inprogress: 0, done: 0 };
          const active = activeView === 'phase' && Number(activePhaseId) === p.id;
          return (
            <button
              key={p.id}
              className={`sidebar-link ${active ? 'active' : ''}`}
              onClick={() => onNavigate('phase', { phaseId: p.id })}
              aria-current={active ? 'page' : undefined}
            >
              <span role="img" aria-label="folder">🗂️</span>
              {!collapsed && (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, width: '100%', justifyContent: 'space-between' }}>
                  <span>{p.name}</span>
                  <span className="badge" aria-label="open items">
                    <span role="img" aria-label="todo">⏳</span>{s.todo + s.inprogress}
                  </span>
                </span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
