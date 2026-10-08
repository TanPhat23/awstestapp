import React from "react";
import { ComputeInstance } from "@/data/mockData";

interface InstanceTableProps {
  instances: ComputeInstance[];
  onToggleStatus: (id: string) => void;
  onRefreshMetric: (id: string) => void;
}

export function InstanceTable({
  instances,
  onToggleStatus,
  onRefreshMetric,
}: InstanceTableProps) {
  return (
    <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 px-6 py-4 gap-2">
        <div>
          <h2 className="text-base font-semibold text-white">EC2 Compute Instances</h2>
          <p className="text-xs text-slate-400">
            Real-time telemetry, resource utilization, and lifecycle controls.
          </p>
        </div>
        <div className="text-xs text-slate-400">
          Showing <span className="font-semibold text-slate-200">{instances.length}</span> instances
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-800 bg-slate-950/40 text-slate-400 uppercase tracking-wider text-[11px]">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">Name & ID</th>
              <th scope="col" className="px-6 py-3 font-medium">Status</th>
              <th scope="col" className="px-6 py-3 font-medium">Type & Region</th>
              <th scope="col" className="px-6 py-3 font-medium">Public IP</th>
              <th scope="col" className="px-6 py-3 font-medium">CPU Util</th>
              <th scope="col" className="px-6 py-3 font-medium">Memory</th>
              <th scope="col" className="px-6 py-3 font-medium">Uptime</th>
              <th scope="col" className="px-6 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {instances.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-8 text-center text-slate-500">
                  No matching instances found for the current query/region.
                </td>
              </tr>
            ) : (
              instances.map((inst) => {
                const isRunning = inst.status === "running";
                return (
                  <tr key={inst.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="px-6 py-3.5">
                      <div className="font-medium text-slate-100">{inst.name}</div>
                      <div className="font-mono text-[11px] text-slate-500">{inst.id}</div>
                    </td>
                    <td className="px-6 py-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium border ${
                          isRunning
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : "bg-slate-700/20 border-slate-700/40 text-slate-400"
                        }`}
                      >
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${
                            isRunning ? "bg-emerald-400 animate-pulse" : "bg-slate-500"
                          }`}
                        />
                        {inst.status}
                      </span>
                    </td>
                    <td className="px-6 py-3.5">
                      <span className="font-mono font-medium text-slate-200">{inst.type}</span>
                      <div className="text-[11px] text-slate-400">{inst.region}</div>
                    </td>
                    <td className="px-6 py-3.5 font-mono text-slate-400">
                      {inst.ip}
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              inst.cpuUsage > 80
                                ? "bg-rose-500"
                                : inst.cpuUsage > 50
                                ? "bg-amber-500"
                                : "bg-emerald-500"
                            }`}
                            style={{ width: `${isRunning ? inst.cpuUsage : 0}%` }}
                          />
                        </div>
                        <span className="font-mono text-[11px] w-7 text-right">
                          {isRunning ? `${inst.cpuUsage}%` : "-"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-blue-500 transition-all duration-500"
                            style={{ width: `${isRunning ? inst.memoryUsage : 0}%` }}
                          />
                        </div>
                        <span className="font-mono text-[11px] w-7 text-right">
                          {isRunning ? `${inst.memoryUsage}%` : "-"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5 font-mono text-[11px] text-slate-400">
                      {inst.uptime}
                    </td>
                    <td className="px-6 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onRefreshMetric(inst.id)}
                          title="Simulate telemetry sync"
                          className="rounded p-1 text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={() => onToggleStatus(inst.id)}
                          className={`rounded px-2 py-1 text-[11px] font-medium transition ${
                            isRunning
                              ? "bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30"
                              : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/30"
                          }`}
                        >
                          {isRunning ? "Stop" : "Start"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
