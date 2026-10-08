import React from "react";

export function CostAnalysisView() {
  const breakdown = [
    { service: "Amazon EC2", cost: 2450.8, pct: 50, color: "bg-blue-500" },
    { service: "Amazon S3", cost: 1120.4, pct: 23, color: "bg-amber-500" },
    { service: "AWS Lambda & API GW", cost: 640.25, pct: 13, color: "bg-purple-500" },
    { service: "CloudFront & Networking", cost: 481.0, pct: 10, color: "bg-emerald-500" },
    { service: "CloudWatch & Others", cost: 200.0, pct: 4, color: "bg-slate-500" },
  ];

  return (
    <div className="rounded-xl border border-slate-800/80 bg-slate-900/50 p-6 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
        <div>
          <h2 className="text-base font-semibold text-white">AWS Cost & Usage Intelligence</h2>
          <p className="text-xs text-slate-400">
            Real-time monthly burn rate and forecast analysis across services.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-400">Forecasted month-end:</span>
          <span className="text-sm font-bold text-amber-400 font-mono">$5,410.00</span>
        </div>
      </div>

      {/* Progress bar visual */}
      <div>
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-slate-800">
          {breakdown.map((item) => (
            <div
              key={item.service}
              className={`h-full ${item.color}`}
              style={{ width: `${item.pct}%` }}
              title={`${item.service}: ${item.pct}% ($${item.cost})`}
            />
          ))}
        </div>
      </div>

      {/* Breakdown list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {breakdown.map((item) => (
          <div
            key={item.service}
            className="flex items-center justify-between rounded-lg border border-slate-800/60 bg-slate-950/30 p-3"
          >
            <div className="flex items-center gap-2.5">
              <span className={`h-3 w-3 rounded-full ${item.color}`} />
              <div className="flex flex-col">
                <span className="text-xs font-medium text-slate-200">{item.service}</span>
                <span className="text-[11px] text-slate-500">{item.pct}% of total</span>
              </div>
            </div>
            <div className="font-mono text-xs font-semibold text-white">
              ${item.cost.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
          </div>
        ))}
      </div>

      {/* Recommendation Card */}
      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 flex items-start gap-3">
        <div className="text-amber-400 mt-0.5">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="text-xs space-y-1">
          <div className="font-semibold text-amber-300">AWS Cost Optimizer Suggestion</div>
          <p className="text-slate-300">
            Converting <span className="text-white font-mono">worker-pool-node-04</span> (m6i.2xlarge) to AWS Graviton3 (<span className="text-white font-mono">m7g.2xlarge</span>) will reduce instance costs by ~18% with equivalent or superior throughput.
          </p>
        </div>
      </div>
    </div>
  );
}
