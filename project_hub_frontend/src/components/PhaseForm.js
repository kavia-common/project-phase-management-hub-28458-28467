import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * PhaseForm
 * Simple create form with fields: title, description, status.
 * Props:
 * - onSubmit: ({ title, description, status }) => void
 */
export function PhaseForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');

  const canSubmit = title.trim().length > 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!canSubmit) return;
    onSubmit({ title: title.trim(), description: description.trim(), status });
    setTitle('');
    setDescription('');
    setStatus('todo');
  };

  return (
    <form onSubmit={handleSubmit} className="grid" style={{ gap: 12 }}>
      <div className="grid" style={{ gap: 8 }}>
        <input
          className="input"
          placeholder="Item title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-label="Item title"
        />
        <textarea
          className="textarea"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          aria-label="Item description"
        />
      </div>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
        <select
          className="select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          aria-label="Status"
          style={{ maxWidth: 220 }}
        >
          <option value="todo">Todo</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
        </select>
        <button className="btn" type="submit" disabled={!canSubmit} aria-disabled={!canSubmit}>
          Add item
        </button>
      </div>
    </form>
  );
}
