import React from "react";
import { LambdaFunction } from "@/data/mockData";

interface ServerlessViewProps {
  functions: LambdaFunction[];
}

export function ServerlessView({ functions }: ServerlessViewProps) {
  return (
    <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 px-6 py-4 gap-2">
        <div>
          <h2 className="text-base font-semibold text-white">AWS Lambda Serverless Functions</h2>
          <p className="text-xs text-slate-400">
            Invocation traffic, execution latencies, and error rates.
          </p>
        </div>
        <div className="text-xs text-slate-400">
          Showing <span className="font-semibold text-slate-200">{functions.length}</span> functions
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-800 bg-slate-950/40 text-slate-400 uppercase tracking-wider text-[11px]">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">Function</th>
              <th scope="col" className="px-6 py-3 font-medium">Status</th>
              <th scope="col" className="px-6 py-3 font-medium">Runtime</th>
              <th scope="col" className="px-6 py-3 font-medium">Invocations (24h)</th>
              <th scope="col" className="px-6 py-3 font-medium">Avg Latency</th>
              <th scope="col" className="px-6 py-3 font-medium">Error Rate</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {functions.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  No matching functions found.
                </td>
              </tr>
            ) : (
              functions.map((fn) => (
                <tr key={fn.name} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-amber-500/10 text-amber-500 font-bold text-[10px]">
                        λ
                      </div>
                      <span className="font-medium text-slate-100 font-mono text-[12px]">{fn.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[11px] font-medium border ${
                        fn.status === "active"
                          ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                          : "bg-amber-500/10 border-amber-500/20 text-amber-400"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          fn.status === "active" ? "bg-emerald-400" : "bg-amber-400 animate-pulse"
                        }`}
                      />
                      {fn.status}
                    </span>
                  </td>
                  <td className="px-6 py-3.5 text-slate-400 font-mono text-[11px]">
                    {fn.runtime}
                  </td>
                  <td className="px-6 py-3.5 font-mono">
                    {fn.invocations24h.toLocaleString()}
                  </td>
                  <td className="px-6 py-3.5 font-mono text-slate-300">
                    {fn.avgDurationMs} ms
                  </td>
                  <td className="px-6 py-3.5">
                    <span
                      className={`font-mono font-medium ${
                        fn.errorRate > 1 ? "text-rose-400" : fn.errorRate > 0 ? "text-amber-400" : "text-emerald-400"
                      }`}
                    >
                      {fn.errorRate.toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
