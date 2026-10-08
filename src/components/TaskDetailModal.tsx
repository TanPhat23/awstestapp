'use client';

import React, { useState } from 'react';
import { TaskItem } from '@/types/task';

interface TaskDetailModalProps {
  task: TaskItem | null;
  onClose: () => void;
  onAddLog: (taskId: string, message: string) => void;
}

export function TaskDetailModal({ task, onClose, onAddLog }: TaskDetailModalProps) {
  const [newLogText, setNewLogText] = useState('');

  if (!task) return null;

  const handleSendLog = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newLogText.trim()) return;
    onAddLog(task.id, newLogText.trim());
    setNewLogText('');
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="task-detail-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      <div className="relative w-full max-w-3xl bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl flex flex-col max-h-[90vh] z-10 overflow-hidden">
        {/* Modal Header */}
        <div className="p-5 border-b border-zinc-800 flex items-start justify-between gap-4 bg-zinc-950/50">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 border border-zinc-700/50">
                {task.id}
              </span>
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded-full capitalize ${
                  task.status === 'running'
                    ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                    : task.status === 'completed'
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                    : task.status === 'failed'
                    ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    : task.status === 'paused'
                    ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                }`}
              >
                ● {task.status}
              </span>
              <span
                className={`text-[11px] font-mono px-2 py-0.5 rounded uppercase ${
                  task.priority === 'critical'
                    ? 'bg-rose-950/50 text-rose-400 border border-rose-800/40'
                    : task.priority === 'high'
                    ? 'bg-amber-950/50 text-amber-400 border border-amber-800/40'
                    : task.priority === 'medium'
                    ? 'bg-blue-950/50 text-blue-400 border border-blue-800/40'
                    : 'bg-zinc-800 text-zinc-400 border border-zinc-700'
                }`}
              >
                {task.priority} priority
              </span>
            </div>
            <h3 id="task-detail-title" className="text-base sm:text-lg font-semibold text-zinc-100">
              {task.title}
            </h3>
            <p className="text-xs text-zinc-400 mt-0.5">
              Assigned to <span className="text-zinc-200 font-medium">{task.agent}</span> ({task.agentRole})
            </p>
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

        {/* Modal Body / Tab Content */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1 text-sm">
          {/* Progress Banner */}
          <div className="bg-zinc-950 border border-zinc-800/80 rounded-lg p-3 sm:p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">
                Execution Progress
              </span>
              <span className="font-mono text-xs font-semibold text-zinc-200">{task.progress}%</span>
            </div>
            <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all duration-300 ${
                  task.status === 'failed'
                    ? 'bg-rose-500'
                    : task.status === 'completed'
                    ? 'bg-emerald-500'
                    : 'bg-blue-500'
                }`}
                style={{ width: `${task.progress}%` }}
              />
            </div>
            <div className="mt-2 text-xs text-zinc-400 flex items-center justify-between">
              <span className="truncate mr-2">Current Step: <span className="text-zinc-300">{task.currentStep}</span></span>
              <span className="font-mono text-zinc-500 shrink-0">Runtime: {task.duration}</span>
            </div>
          </div>

          {/* Configuration Payload */}
          {task.payloadSummary && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                Execution Scope & Parameters
              </h4>
              <div className="p-3 bg-zinc-950 border border-zinc-800/80 rounded-lg font-mono text-xs text-zinc-300">
                {task.payloadSummary}
              </div>
            </div>
          )}

          {/* Execution Logs Terminal */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Agent Output & Telemetry Logs ({task.logs.length})
              </h4>
              <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live Stream
              </span>
            </div>

            <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 font-mono text-xs space-y-1.5 max-h-56 overflow-y-auto shadow-inner">
              {task.logs.length === 0 ? (
                <div className="text-zinc-600 italic">No output logs recorded yet for this task.</div>
              ) : (
                task.logs.map((log) => (
                  <div key={log.id} className="flex items-start gap-2 leading-relaxed">
                    <span className="text-zinc-500 select-none shrink-0 font-mono">[{log.timestamp}]</span>
                    <span
                      className={`text-[10px] px-1 rounded uppercase select-none shrink-0 ${
                        log.level === 'error'
                          ? 'bg-rose-950 text-rose-400'
                          : log.level === 'warn'
                          ? 'bg-amber-950 text-amber-400'
                          : log.level === 'success'
                          ? 'bg-emerald-950 text-emerald-400'
                          : 'bg-zinc-800 text-zinc-400'
                      }`}
                    >
                      {log.level}
                    </span>
                    <span
                      className={`break-all ${
                        log.level === 'error'
                          ? 'text-rose-300 font-medium'
                          : log.level === 'warn'
                          ? 'text-amber-200'
                          : log.level === 'success'
                          ? 'text-emerald-300'
                          : 'text-zinc-300'
                      }`}
                    >
                      {log.message}
                    </span>
                  </div>
                ))
              )}
            </div>

            {/* Append manual log entry / operator note */}
            <form onSubmit={handleSendLog} className="mt-2 flex gap-2">
              <label htmlFor="modal-operator-note" className="sr-only">
                Append operator note or directive
              </label>
              <input
                id="modal-operator-note"
                type="text"
                value={newLogText}
                onChange={(e) => setNewLogText(e.target.value)}
                placeholder="Send operator directive or manual note to agent log..."
                className="flex-1 px-3 py-1.5 bg-zinc-950 border border-zinc-800 rounded-md text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 font-mono"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded-md transition-colors cursor-pointer shrink-0"
              >
                Append Note
              </button>
            </form>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-zinc-800 bg-zinc-950/50 flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-medium rounded-md transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
