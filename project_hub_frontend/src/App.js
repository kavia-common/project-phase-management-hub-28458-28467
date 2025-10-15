import React, { useEffect, useMemo, useState } from 'react';
import './App.css';
import './index.css';
import { Header } from './layout/Header';
import { Sidebar } from './layout/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { PhasePage } from './pages/PhasePage';
import { useLocalPhases } from './hooks/useLocalPhases';
import { AppRouter } from './router/Router';
import { PHASES } from './utils/constants';
import { ThemeProvider } from './theme';

/**
 * PUBLIC_INTERFACE
 * App
 * The root component providing the application shell with header, sidebar, router view,
 * and shared state providers. Uses a lightweight router based on internal state
 * persisted to localStorage (no external routing libs).
 */
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { view, setView, params } = AppRouter.useRouteState();
  const { phases, addItem, updateItem, removeItem, stats } = useLocalPhases();

  // Persist sidebar collapsed state
  useEffect(() => {
    const saved = localStorage.getItem('app.sidebarCollapsed');
    if (saved) setCollapsed(saved === 'true');
  }, []);
  useEffect(() => {
    localStorage.setItem('app.sidebarCollapsed', String(collapsed));
  }, [collapsed]);

  // Memoized current phase info
  const currentPhase = useMemo(() => {
    if (view !== 'phase') return null;
    const id = params?.phaseId ?? 0;
    return PHASES.find(p => p.id === Number(id));
  }, [view, params]);

  const onNavigate = (nextView, nextParams) => {
    setView(nextView, nextParams);
    setSidebarOpen(false);
  };

  return (
    <ThemeProvider>
      <div className={`app-shell ${collapsed ? 'collapsed' : ''}`}>
        <aside className={`app-sidebar ${sidebarOpen ? 'open' : ''}`}>
          <Sidebar
            collapsed={collapsed}
            onToggleCollapse={() => setCollapsed(v => !v)}
            activeView={view}
            activePhaseId={params?.phaseId}
            onNavigate={onNavigate}
            stats={stats}
          />
        </aside>

        <header className="app-header">
          <Header
            title={view === 'dashboard' ? 'Project Hub Dashboard' : currentPhase?.name || 'Phase'}
            subtitle={view === 'dashboard' ? 'Overview and quick insights' : currentPhase?.description}
            onMenuToggle={() => setSidebarOpen(o => !o)}
            onNavigate={onNavigate}
            isPhaseView={view === 'phase'}
          />
        </header>

        <main className="app-main">
          {view === 'dashboard' && (
            <Dashboard
              stats={stats}
              onOpenPhase={(phaseId) => onNavigate('phase', { phaseId })}
            />
          )}
          {view === 'phase' && currentPhase && (
            <PhasePage
              phase={currentPhase}
              items={phases[currentPhase.id] || []}
              onAdd={(payload) => addItem(currentPhase.id, payload)}
              onUpdate={(itemId, updates) => updateItem(currentPhase.id, itemId, updates)}
              onDelete={(itemId) => removeItem(currentPhase.id, itemId)}
              onBack={() => onNavigate('dashboard')}
            />
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
