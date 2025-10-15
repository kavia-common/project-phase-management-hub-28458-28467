import React from 'react';
import { useTheme } from '../theme';

/**
 * PUBLIC_INTERFACE
 * Header
 * Top bar with page title and quick actions.
 * Props:
 * - title: string
 * - subtitle?: string
 * - onMenuToggle: fn (toggles sidebar on small screens)
 * - onNavigate: fn
 * - isPhaseView: boolean
 */
export function Header({ title, subtitle, onMenuToggle, onNavigate, isPhaseView }) {
  const { mode, toggle } = useTheme();

  return (
    <>
      <button
        className="btn ghost"
        onClick={onMenuToggle}
        aria-label="Toggle menu"
        style={{ marginRight: 8 }}
      >
        ☰
      </button>
      <div style={{ display: 'grid', gap: 2 }}>
        <div className="header-title">{title}</div>
        {subtitle && (
          <div style={{ color: 'var(--color-muted)', fontSize: 13 }}>
            {subtitle}
          </div>
        )}
      </div>

      <div className="header-actions">
        {isPhaseView && (
          <button className="btn ghost" onClick={() => onNavigate('dashboard')}>
            ← Back
          </button>
        )}
        <button className="btn secondary" onClick={toggle} aria-label="Toggle theme">
          {mode === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </div>
    </>
  );
}
