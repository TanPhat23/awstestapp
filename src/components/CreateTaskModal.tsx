'use client';

import React, { useState } from 'react';
import { TaskItem, TaskPriority } from '@/types/task';

interface CreateTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateTask: (newTask: Omit<TaskItem, 'id' | 'logs' | 'duration' | 'startedAt'>) => void;
  availableAgents: string[];
}

export function CreateTaskModal({
  isOpen,
  onClose,
  onCreateTask,
  availableAgents,
}: CreateTaskModalProps) {
  const [title, setTitle] = useState('');
  const [agent, setAgent] = useState(availableAgents[0] || 'Code Reviewer');
  const [priority, setPriority] = useState<TaskPriority>('medium');
  const [payloadSummary, setPayloadSummary] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Task title is required');
      return;
    }

    const agentRoleMap: Record<string, string> = {
      'Code Reviewer': 'Static Analysis & Style',
      'Security Auditor': 'SAST & Dependency Defense',
      'Builder Bot': 'Build & Artifact Packaging',
      'QA Bot': 'E2E & Integration Tests',
    };

    onCreateTask({
      title: title.trim(),
      agent,
      agentRole: agentRoleMap[agent] || 'Autonomous Agent',
      status: 'queued',
      priority,
      progress: 0,
      currentStep: 'Initializing execution context in task queue',
      payloadSummary: payloadSummary.trim() || 'Default task configuration parameters',
    });

    // Reset form and close
    setTitle('');
    setPayloadSummary('');
    setError('');
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="create-task-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
    >
      {/* Backdrop click dismiss */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl p-6 overflow-hidden z-10">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div>
            <h3 id="create-task-title" className="text-base font-semibold text-zinc-100">
              Dispatch New Task
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">Assign an execution job to an autonomous agent</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {error && (
            <div className="p-2.5 rounded bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="task-title" className="block text-xs font-medium text-zinc-300 mb-1">
              Task Title <span className="text-rose-400">*</span>
            </label>
            <input
              id="task-title"
              type="text"
              required
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (error) setError('');
              }}
              placeholder="e.g., Run memory leak profiler on worker pool"
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-sans"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="task-agent" className="block text-xs font-medium text-zinc-300 mb-1">
                Assigned Agent
              </label>
              <select
                id="task-agent"
                value={agent}
                onChange={(e) => setAgent(e.target.value)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-sm text-zinc-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-sans"
              >
                {availableAgents.map((ag) => (
                  <option key={ag} value={ag}>
                    {ag}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="task-priority" className="block text-xs font-medium text-zinc-300 mb-1">
                Priority Lane
              </label>
              <select
                id="task-priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-sm text-zinc-200 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-sans"
              >
                <option value="low">Low (Background)</option>
                <option value="medium">Medium (Standard)</option>
                <option value="high">High (Elevated)</option>
                <option value="critical">Critical (Immediate)</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="task-payload" className="block text-xs font-medium text-zinc-300 mb-1">
              Configuration / Parameters (Optional)
            </label>
            <textarea
              id="task-payload"
              rows={3}
              value={payloadSummary}
              onChange={(e) => setPayloadSummary(e.target.value)}
              placeholder="e.g. Target branch: main, threshold: 85%, timeout: 15m"
              className="w-full px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-md text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 font-mono text-xs"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-zinc-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-medium rounded-md text-xs sm:text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold rounded-md text-xs sm:text-sm shadow-sm transition-colors cursor-pointer"
            >
              Dispatch Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
