import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * PhaseList
 * Renders items with inline editable fields (title, description, status).
 * Props:
 * - items: Array<{ id, title, description, status }>
 * - onUpdate: (id, updates) => void
 * - onDelete: (id) => void
 */
export function PhaseList({ items, onUpdate, onDelete }) {
  if (!items || items.length === 0) {
    return <div className="empty">No items yet. Add your first item to get started.</div>;
  }

  return (
    <div className="grid" style={{ gap: 10 }}>
      {items.map(item => (
        <Row key={item.id} item={item} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </div>
  );
}

function Row({ item, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState({ title: item.title, description: item.description, status: item.status });

  const save = () => {
    onUpdate(item.id, draft);
    setEditing(false);
  };

  const cancel = () => {
    setDraft({ title: item.title, description: item.description, status: item.status });
    setEditing(false);
  };

  return (
    <div className="list-item">
      <div>
        {editing ? (
          <div className="grid" style={{ gap: 8 }}>
            <input
              className="input"
              value={draft.title}
              onChange={(e) => setDraft(d => ({ ...d, title: e.target.value }))}
              placeholder="Title"
            />
            <textarea
              className="textarea"
              value={draft.description}
              onChange={(e) => setDraft(d => ({ ...d, description: e.target.value }))}
              placeholder="Description"
            />
          </div>
        ) : (
          <div>
            <div style={{ fontWeight: 700 }}>{item.title}</div>
            <div style={{ color: 'var(--color-muted)', marginTop: 4 }}>{item.description}</div>
          </div>
        )}
      </div>

      <div>
        {editing ? (
          <select
            className="select"
            value={draft.status}
            onChange={(e) => setDraft(d => ({ ...d, status: e.target.value }))}
          >
            <option value="todo">Todo</option>
            <option value="inprogress">In Progress</option>
            <option value="done">Done</option>
          </select>
        ) : (
          <span className={`status-pill status-${item.status}`}>
            {item.status === 'todo' ? 'Todo' : item.status === 'inprogress' ? 'In Progress' : 'Done'}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        {editing ? (
          <>
            <button className="btn" onClick={save}>Save</button>
            <button className="btn ghost" onClick={cancel}>Cancel</button>
          </>
        ) : (
          <>
            <button className="btn ghost" onClick={() => setEditing(true)}>Edit</button>
            <button
              className="btn ghost"
              style={{ color: 'var(--color-error)', borderColor: 'rgba(239,68,68,0.25)' }}
              onClick={() => onDelete(item.id)}
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  );
}
