import React from "react";
import { MetricSummary } from "@/types/dashboard";
import { TrendingUpIcon, TrendingDownIcon, ZapIcon, ShieldCheckIcon, ServerIcon } from "@/components/ui/Icons";

interface MetricsOverviewProps {
  metrics: MetricSummary[];
}

export function MetricsOverview({ metrics }: MetricsOverviewProps) {
  const getIconForIndex = (index: number) => {
    switch (index) {
      case 0:
        return <span className="text-emerald-500 font-bold text-sm">$</span>;
      case 1:
        return <ZapIcon className="w-4 h-4 text-amber-500" />;
      case 2:
        return <ServerIcon className="w-4 h-4 text-blue-500" />;
      case 3:
        return <ShieldCheckIcon className="w-4 h-4 text-indigo-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => (
        <div
          key={idx}
          className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-xs hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {metric.title}
            </span>
            <div className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              {getIconForIndex(idx)}
            </div>
          </div>

          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              {metric.value}
            </span>

            <div
              className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                metric.isPositive
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-rose-500/10 text-rose-600 dark:text-rose-400"
              }`}
            >
              {metric.trend === "up" ? (
                <TrendingUpIcon className="w-3.5 h-3.5" />
              ) : (
                <TrendingDownIcon className="w-3.5 h-3.5" />
              )}
              <span>{metric.trendPercentage}</span>
            </div>
          </div>

          <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
            {metric.subtext}
          </p>

          {/* Subtle colored accent line at top */}
          <div
            className={`absolute top-0 left-0 right-0 h-0.5 ${
              idx === 0
                ? "bg-emerald-500"
                : idx === 1
                ? "bg-amber-500"
                : idx === 2
                ? "bg-blue-500"
                : "bg-indigo-500"
            }`}
          />
        </div>
      ))}
    </div>
  );
}
