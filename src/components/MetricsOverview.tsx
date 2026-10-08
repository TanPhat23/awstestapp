import React from 'react';
import { TaskItem, AgentMetric } from '@/types/task';

interface MetricsOverviewProps {
  tasks: TaskItem[];
  agents: AgentMetric[];
}

export function MetricsOverview({ tasks, agents }: MetricsOverviewProps) {
  const totalTasks = tasks.length;
  const runningTasks = tasks.filter((t) => t.status === 'running').length;
  const completedTasks = tasks.filter((t) => t.status === 'completed').length;
  const failedTasks = tasks.filter((t) => t.status === 'failed').length;

  const avgCpu = Math.round(agents.reduce((acc, a) => acc + a.cpuUsage, 0) / (agents.length || 1));
  const avgMemory = Math.round(agents.reduce((acc, a) => acc + a.memoryUsage, 0) / (agents.length || 1));

  return (
    <section aria-labelledby="metrics-heading" className="space-y-4">
      <h2 id="metrics-heading" className="sr-only">
        Cluster Metrics and Workload Overview
      </h2>

      {/* Grid for Task Counts */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Tasks */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 sm:p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-zinc-400 uppercase tracking-wider">Total Tasks</span>
            <span className="p-1.5 rounded-lg bg-zinc-800 text-zinc-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-zinc-100">{totalTasks}</span>
            <span className="text-xs text-zinc-500 font-mono">managed</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400">Distributed across {agents.length} active agents</div>
        </div>

        {/* Running Tasks */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 sm:p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">Running</span>
            <span className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-blue-400">{runningTasks}</span>
            <span className="text-xs text-blue-400/70 font-mono">in progress</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400">Concurrency lane: 75% capacity</div>
        </div>

        {/* Completed */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 sm:p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Completed</span>
            <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-emerald-400">{completedTasks}</span>
            <span className="text-xs text-emerald-400/70 font-mono">verified</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400">
            Success rate:{' '}
            <span className="font-mono text-zinc-200">
              {totalTasks ? Math.round((completedTasks / (completedTasks + failedTasks || 1)) * 100) : 100}%
            </span>
          </div>
        </div>

        {/* Failed / Alerts */}
        <div className="bg-zinc-900/60 border border-zinc-800/80 rounded-xl p-4 sm:p-5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-rose-400 uppercase tracking-wider">Alerts & Failed</span>
            <span className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-mono font-bold text-rose-400">{failedTasks}</span>
            <span className="text-xs text-rose-400/70 font-mono">errors</span>
          </div>
          <div className="mt-2 text-[11px] text-zinc-400">
            {failedTasks > 0 ? 'Action required: Check logs' : 'All systems clear'}
          </div>
        </div>
      </div>

      {/* Cluster Node / Agent Workload Strip */}
      <div className="bg-zinc-900/40 border border-zinc-800/60 rounded-xl p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Agent Pool Workload</h3>
            <p className="text-xs text-zinc-400">Real-time resource utilization across active workers</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6">
          {agents.map((agent) => (
            <div key={agent.id} className="flex flex-col gap-1 border-l border-zinc-800 pl-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-medium text-zinc-200 truncate">{agent.name}</span>
                <span
                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                    agent.status === 'busy'
                      ? 'bg-amber-400'
                      : agent.status === 'active'
                      ? 'bg-emerald-400'
                      : 'bg-zinc-500'
                  }`}
                  title={`Status: ${agent.status}`}
                />
              </div>
              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-400">
                <span>CPU: {agent.cpuUsage}%</span>
                <span className="text-zinc-600">|</span>
                <span>RAM: {agent.memoryUsage}%</span>
              </div>
              {/* Mini utilization bar */}
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mt-0.5">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    agent.cpuUsage > 80 ? 'bg-rose-500' : agent.cpuUsage > 50 ? 'bg-amber-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${agent.cpuUsage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
