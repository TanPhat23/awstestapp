'use client';

import React from 'react';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onOpenNewTaskModal: () => void;
  activeAgentsCount: number;
}

export function Navbar({
  searchQuery,
  onSearchChange,
  onOpenNewTaskModal,
  activeAgentsCount,
}: NavbarProps) {
  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Status Cluster */}
          <div className="flex items-center gap-3 sm:gap-6 min-w-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-zinc-700/60 flex items-center justify-center shadow-inner">
                <svg
                  className="w-4 h-4 text-emerald-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
              </div>
              <div className="leading-none truncate">
                <span className="text-sm font-semibold tracking-tight text-zinc-100 flex items-center gap-2">
                  Agent Task Manager
                  <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    v2.4
                  </span>
                </span>
                <span className="hidden sm:block text-[11px] text-zinc-400 font-mono mt-0.5">
                  Cluster Orchestration & Runtime
                </span>
              </div>
            </div>

            {/* Health indicators */}
            <div className="hidden md:flex items-center gap-2 border-l border-zinc-800 pl-4 text-xs">
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Cluster: Healthy
              </span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 font-mono text-[11px]">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                Agents: {activeAgentsCount} Active
              </span>
            </div>
          </div>

          {/* Search bar & Actions */}
          <div className="flex items-center gap-3">
            <div className="relative w-40 sm:w-64 md:w-80">
              <label htmlFor="task-search-input" className="sr-only">
                Search tasks by ID, title, or agent
              </label>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                id="task-search-input"
                type="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search tasks, agents, logs..."
                className="w-full pl-9 pr-3 py-1.5 bg-zinc-900/90 border border-zinc-800 rounded-md text-xs sm:text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-500 font-sans transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchChange('')}
                  aria-label="Clear search query"
                  className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-zinc-500 hover:text-zinc-300"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              )}
            </div>

            {/* New Task Trigger Button */}
            <button
              type="button"
              onClick={onOpenNewTaskModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-semibold rounded-md text-xs sm:text-sm shadow-sm transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-zinc-950"
            >
              <svg
                className="w-4 h-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>New Task</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
