import React from "react";
import { MetricSummary } from "@/data/mockData";

interface MetricsOverviewProps {
  metrics: MetricSummary;
}

export function MetricsOverview({ metrics }: MetricsOverviewProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Metric 1: Monthly Cost */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 transition hover:border-slate-700/80">
        <div className="flex items-center justify-between text-xs font-medium text-slate-400">
          <span>Est. Monthly Spend</span>
          <span className="flex items-center gap-1 text-emerald-400">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            {Math.abs(metrics.costChangePercent)}%
          </span>
        </div>
        <div className="mt-2 text-2xl font-bold tracking-tight text-white">
          ${metrics.totalMonthlyCost.toLocaleString("en-US", { minimumFractionDigits: 2 })}
        </div>
        <div className="mt-1 text-xs text-slate-500">
          Budget limit: $6,000.00 / month
        </div>
      </div>

      {/* Metric 2: EC2 Instances */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 transition hover:border-slate-700/80">
        <div className="flex items-center justify-between text-xs font-medium text-slate-400">
          <span>Active Compute Nodes</span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Healthy
          </span>
        </div>
        <div className="mt-2 text-2xl font-bold tracking-tight text-white">
          {metrics.activeInstances} <span className="text-sm font-normal text-slate-400">instances</span>
        </div>
        <div className="mt-1 text-xs text-slate-500">
          1 stopped • 0 impaired
        </div>
      </div>

      {/* Metric 3: S3 Storage */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 transition hover:border-slate-700/80">
        <div className="flex items-center justify-between text-xs font-medium text-slate-400">
          <span>S3 Total Storage</span>
          <span className="text-xs text-slate-400 font-mono">4 Buckets</span>
        </div>
        <div className="mt-2 text-2xl font-bold tracking-tight text-white">
          {metrics.totalStorageTb} <span className="text-sm font-normal text-slate-400">TB</span>
        </div>
        <div className="mt-1 text-xs text-slate-500">
          10.3M total objects indexed
        </div>
      </div>

      {/* Metric 4: Lambda Invocations */}
      <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-4 transition hover:border-slate-700/80">
        <div className="flex items-center justify-between text-xs font-medium text-slate-400">
          <span>Serverless Executions (24h)</span>
          <span className="text-amber-400 text-xs font-medium">99.98% ok</span>
        </div>
        <div className="mt-2 text-2xl font-bold tracking-tight text-white">
          {metrics.lambdaRequestsMillions}M <span className="text-sm font-normal text-slate-400">invocations</span>
        </div>
        <div className="mt-1 text-xs text-slate-500">
          Avg latency: 46ms across 4 functions
        </div>
      </div>
    </div>
  );
}
