import React from "react";
import { StorageBucket } from "@/data/mockData";

interface StorageViewProps {
  buckets: StorageBucket[];
}

export function StorageView({ buckets }: StorageViewProps) {
  return (
    <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-800/80 px-6 py-4 gap-2">
        <div>
          <h2 className="text-base font-semibold text-white">Amazon S3 Buckets</h2>
          <p className="text-xs text-slate-400">
            Object storage, lifecycle policies, and encryption compliance.
          </p>
        </div>
        <div className="text-xs text-slate-400">
          Showing <span className="font-semibold text-slate-200">{buckets.length}</span> buckets
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-800 bg-slate-950/40 text-slate-400 uppercase tracking-wider text-[11px]">
            <tr>
              <th scope="col" className="px-6 py-3 font-medium">Bucket Name</th>
              <th scope="col" className="px-6 py-3 font-medium">Region</th>
              <th scope="col" className="px-6 py-3 font-medium">Objects</th>
              <th scope="col" className="px-6 py-3 font-medium">Size</th>
              <th scope="col" className="px-6 py-3 font-medium">Storage Class</th>
              <th scope="col" className="px-6 py-3 font-medium">Default Encryption</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-300">
            {buckets.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-slate-500">
                  No matching buckets found.
                </td>
              </tr>
            ) : (
              buckets.map((b) => (
                <tr key={b.name} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded bg-amber-500/10 text-amber-500 font-bold text-[10px]">
                        S3
                      </div>
                      <span className="font-medium text-slate-100">{b.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3.5 text-slate-400 font-mono text-[11px]">
                    {b.region}
                  </td>
                  <td className="px-6 py-3.5 font-mono">
                    {b.objectsCount.toLocaleString()}
                  </td>
                  <td className="px-6 py-3.5 font-mono text-slate-200 font-medium">
                    {b.sizeGb > 1000
                      ? `${(b.sizeGb / 1000).toFixed(1)} TB`
                      : `${b.sizeGb.toFixed(1)} GB`}
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="rounded bg-slate-800 px-2 py-0.5 text-[11px] text-slate-300">
                      {b.storageClass}
                    </span>
                  </td>
                  <td className="px-6 py-3.5">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 font-medium text-[11px]">
                      <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      {b.encryption}
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
