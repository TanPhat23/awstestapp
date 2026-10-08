'use client';

import React, { useState } from 'react';
import { TaskItem, TaskStatus, TaskPriority } from '@/types/task';

interface TaskTableProps {
  tasks: TaskItem[];
  selectedStatus: 'all' | TaskStatus;
  onSelectStatus: (status: 'all' | TaskStatus) => void;
  selectedAgent: string;
  onSelectAgent: (agent: string) => void;
  availableAgents: string[];
  onViewLogs: (task: TaskItem) => void;
  onTogglePause: (taskId: string) => void;
  onRetryTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function TaskTable({
  tasks,
  selectedStatus,
  onSelectStatus,
  selectedAgent,
  onSelectAgent,
  availableAgents,
  onViewLogs,
  onTogglePause,
  onRetryTask,
  onDeleteTask,
}: TaskTableProps) {
  const [expandedTaskId, setExpandedTaskId] = useState<string | null>(null);

  const statusTabs: Array<{ id: 'all' | TaskStatus; label: string }> = [
    { id: 'all', label: 'All Tasks' },
    { id: 'running', label: 'Running' },
    { id: 'queued', label: 'Queued' },
    { id: 'completed', label: 'Completed' },
    { id: 'failed', label: 'Failed' },
    { id: 'paused', label: 'Paused' },
  ];

  const getPriorityBadge = (priority: TaskPriority) => {
    switch (priority) {
      case 'critical':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            Critical
          </span>
        );
      case 'high':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            High
          </span>
        );
      case 'medium':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Medium
          </span>
        );
      case 'low':
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-medium bg-zinc-800 text-zinc-400 border border-zinc-700/60">
            Low
          </span>
        );
    }
  };

  const getStatusBadge = (status: TaskStatus) => {
    switch (status) {
      case 'running':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Running
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Completed
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
            Failed
          </span>
        );
      case 'paused':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            Paused
          </span>
        );
      case 'queued':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800 text-zinc-400 border border-zinc-700">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
            Queued
          </span>
        );
    }
  };

  return (
    <section aria-labelledby="task-board-heading" className="space-y-4">
      {/* Control bar: Tabs + Agent Filter */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-zinc-800 pb-3">
        {/* Status Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto py-1">
          {statusTabs.map((tab) => {
            const isActive = selectedStatus === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => onSelectStatus(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/60'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Filter by Assigned Agent */}
        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="agent-filter-select" className="text-xs text-zinc-400">
            Agent:
          </label>
          <select
            id="agent-filter-select"
            value={selectedAgent}
            onChange={(e) => onSelectAgent(e.target.value)}
            className="px-2.5 py-1.5 bg-zinc-900 border border-zinc-800 rounded-lg text-xs text-zinc-200 focus:outline-none focus:border-zinc-600 font-sans cursor-pointer"
          >
            <option value="all">All Agents</option>
            {availableAgents.map((ag) => (
              <option key={ag} value={ag}>
                {ag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Empty State */}
      {tasks.length === 0 ? (
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-12 text-center">
          <div className="w-12 h-12 rounded-full bg-zinc-800/80 mx-auto flex items-center justify-center text-zinc-400 mb-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-zinc-200">No tasks found</h3>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto">
            No agent tasks match the selected filters or search query. Try clearing filters or create a new task.
          </p>
        </div>
      ) : (
        /* Task Table / Cards */
        <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl overflow-hidden shadow-sm">
          {/* Desktop Table Header */}
          <div className="hidden lg:grid lg:grid-cols-12 gap-4 px-5 py-3 bg-zinc-900/80 border-b border-zinc-800 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
            <div className="col-span-4">Task Details</div>
            <div className="col-span-2">Assigned Agent</div>
            <div className="col-span-2">Progress & Step</div>
            <div className="col-span-1">Priority</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          <div className="divide-y divide-zinc-800/60">
            {tasks.map((task) => {
              const isExpanded = expandedTaskId === task.id;

              return (
                <div key={task.id} className="transition-colors hover:bg-zinc-900/30">
                  {/* Row */}
                  <div className="p-4 sm:p-5 lg:grid lg:grid-cols-12 lg:gap-4 lg:items-center">
                    {/* Task Title & Meta */}
                    <div className="lg:col-span-4 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-semibold text-zinc-400">{task.id}</span>
                        {/* Mobile priority tag */}
                        <div className="lg:hidden">{getPriorityBadge(task.priority)}</div>
                        <div className="lg:hidden ml-auto">{getStatusBadge(task.status)}</div>
                      </div>
                      <h4 className="text-sm font-semibold text-zinc-100 leading-snug hover:text-emerald-400 transition-colors">
                        {task.title}
                      </h4>
                      <div className="text-xs text-zinc-500 flex items-center gap-2">
                        <span>Started {task.startedAt}</span>
                        <span>•</span>
                        <span>Duration: {task.duration}</span>
                      </div>
                    </div>

                    {/* Assigned Agent */}
                    <div className="mt-3 lg:mt-0 lg:col-span-2">
                      <div className="text-xs font-medium text-zinc-200">{task.agent}</div>
                      <div className="text-[11px] text-zinc-500">{task.agentRole}</div>
                    </div>

                    {/* Progress Bar & Current Step */}
                    <div className="mt-3 lg:mt-0 lg:col-span-2 space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-[11px] text-zinc-400 truncate max-w-[130px]" title={task.currentStep}>
                          {task.currentStep}
                        </span>
                        <span className="font-mono text-xs text-zinc-300 ml-1">{task.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-300 ${
                            task.status === 'failed'
                              ? 'bg-rose-500'
                              : task.status === 'completed'
                              ? 'bg-emerald-500'
                              : task.status === 'paused'
                              ? 'bg-amber-500'
                              : 'bg-blue-500'
                          }`}
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Priority (Desktop) */}
                    <div className="hidden lg:block lg:col-span-1">{getPriorityBadge(task.priority)}</div>

                    {/* Status (Desktop) */}
                    <div className="hidden lg:block lg:col-span-1">{getStatusBadge(task.status)}</div>

                    {/* Actions */}
                    <div className="mt-4 lg:mt-0 lg:col-span-2 flex items-center justify-end gap-1.5">
                      {/* Pause / Resume action */}
                      {task.status === 'running' && (
                        <button
                          type="button"
                          onClick={() => onTogglePause(task.id)}
                          title="Pause execution"
                          aria-label={`Pause task ${task.id}`}
                          className="p-1.5 rounded-md text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      )}

                      {task.status === 'paused' && (
                        <button
                          type="button"
                          onClick={() => onTogglePause(task.id)}
                          title="Resume execution"
                          aria-label={`Resume task ${task.id}`}
                          className="p-1.5 rounded-md text-zinc-400 hover:text-blue-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </button>
                      )}

                      {/* Retry action */}
                      {(task.status === 'failed' || task.status === 'completed') && (
                        <button
                          type="button"
                          onClick={() => onRetryTask(task.id)}
                          title="Retry task execution"
                          aria-label={`Retry task ${task.id}`}
                          className="p-1.5 rounded-md text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 transition-colors cursor-pointer"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                      )}

                      {/* Logs Modal Trigger */}
                      <button
                        type="button"
                        onClick={() => onViewLogs(task)}
                        className="px-2.5 py-1 text-xs font-mono font-medium rounded-md bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
                      >
                        Logs
                      </button>

                      {/* Expand / Quick Details Toggle */}
                      <button
                        type="button"
                        onClick={() => setExpandedTaskId(isExpanded ? null : task.id)}
                        aria-expanded={isExpanded}
                        aria-label={`Expand details for ${task.id}`}
                        className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
                      >
                        <svg
                          className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Inline Collapsible Drawer */}
                  {isExpanded && (
                    <div className="px-5 py-4 bg-zinc-950/60 border-t border-zinc-800/80 space-y-3 animate-fade-in">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-zinc-400 gap-2">
                        <span className="font-semibold text-zinc-300 uppercase tracking-wider text-[11px]">
                          Quick Telemetry Preview
                        </span>
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() => onViewLogs(task)}
                            className="text-emerald-400 hover:underline cursor-pointer"
                          >
                            Open Complete Log Console →
                          </button>
                          <button
                            type="button"
                            onClick={() => onDeleteTask(task.id)}
                            className="text-rose-400 hover:underline cursor-pointer"
                          >
                            Purge Task
                          </button>
                        </div>
                      </div>

                      {task.payloadSummary && (
                        <div className="p-2.5 bg-zinc-900 border border-zinc-800/60 rounded text-xs font-mono text-zinc-300">
                          {task.payloadSummary}
                        </div>
                      )}

                      {/* Last log preview */}
                      {task.logs.length > 0 && (
                        <div className="text-xs font-mono text-zinc-400 bg-zinc-900/80 p-2.5 rounded border border-zinc-800/60 flex items-center justify-between">
                          <span className="truncate">
                            Latest: [{task.logs[task.logs.length - 1].timestamp}]{' '}
                            <span className="text-zinc-300">{task.logs[task.logs.length - 1].message}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </section>
  );
}
