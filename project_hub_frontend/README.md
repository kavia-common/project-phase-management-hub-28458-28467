# Project Hub Frontend (Ocean Professional)

A lightweight React app for managing project phases (0–3) with a modern Ocean Professional theme. No external routing libraries or UI frameworks.

## Features

- Left sidebar, top header, main content area
- Dashboard with overview cards per phase and quick navigation
- Phase pages (0–3) with localStorage-backed CRUD-lite
- Inline editing of title, description, and status
- Lightweight internal router with last view remembered
- Responsive layout: collapsible sidebar, mobile drawer behavior
- Smooth transitions, focus states, rounded corners, subtle gradients
- No new external dependencies (runs on CRA)

## Run

- npm start
- App runs at http://localhost:3000

## Structure

- src/theme.js: Minimal ThemeProvider and hook
- src/router/Router.js: Internal view state ("dashboard" | "phase")
- src/hooks/useLocalPhases.js: LocalStorage CRUD for items
- src/utils/constants.js: Phase metadata (0–3)
- src/utils/storage.js: LocalStorage wrapper
- src/layout/Header.js: Top bar with actions
- src/layout/Sidebar.js: Navigation sidebar with collapse
- src/pages/Dashboard.js: Overview grid with PhaseCard tiles
- src/pages/PhasePage.js: Form + editable list per phase
- src/components/PhaseCard.js: Phase overview card
- src/components/PhaseForm.js: Create form
- src/components/PhaseList.js: Editable list row

## Theme

Ocean Professional palette is defined using CSS variables in src/index.css:

- Primary: #2563EB
- Secondary/Success: #F59E0B
- Error: #EF4444
- Background: #f9fafb
- Surface: #ffffff
- Text: #111827

Gradients and shadows are applied for subtle depth. See src/App.css and src/index.css for utility classes and layout shell.

## Accessibility

- Focus-visible ring via CSS variables
- Button labels and aria-current for navigation
- Mobile sidebar toggle

## Data Model

LocalStorage key prefix: projecthub

- projecthub.phases: { [phaseId]: Array<{ id, title, description, status, createdAt }> }
- projecthub.route.view: 'dashboard' | 'phase'
- projecthub.route.params: { phaseId?: number }
- app.sidebarCollapsed: boolean

## Notes

- No external routing. Internal navigation is handled by AppRouter and persisted.
- Safe to reset data by clearing LocalStorage for prefix "projecthub".

