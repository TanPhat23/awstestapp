import React from "react";
import { ActivityEvent } from "@/types/dashboard";
import { ServiceTypeBadge } from "@/components/ui/Badge";
import { AlertTriangleIcon, CheckCircleIcon, ZapIcon } from "@/components/ui/Icons";

interface ActivityFeedProps {
  events: ActivityEvent[];
}

export function ActivityFeed({ events }: ActivityFeedProps) {
  const getSeverityIcon = (severity: ActivityEvent["severity"]) => {
    switch (severity) {
      case "warning":
        return <AlertTriangleIcon className="w-4 h-4 text-amber-500" />;
      case "critical":
        return <AlertTriangleIcon className="w-4 h-4 text-rose-500" />;
      case "success":
        return <CheckCircleIcon className="w-4 h-4 text-emerald-500" />;
      case "info":
      default:
        return <ZapIcon className="w-4 h-4 text-blue-500" />;
    }
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
            CloudWatch & Audit Activity Log
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Chronological audit of deployments, health alerts, and lifecycle operations.
          </p>
        </div>
        <span className="text-[11px] font-mono text-emerald-500 font-medium flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Live Stream
        </span>
      </div>

      <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
        {events.map((evt) => (
          <div key={evt.id} className="py-3.5 first:pt-0 last:pb-0 flex items-start gap-3">
            <div className="mt-0.5 p-1 rounded-md bg-slate-100 dark:bg-slate-800 shrink-0">
              {getSeverityIcon(evt.severity)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <ServiceTypeBadge type={evt.service} />
                  <span className="text-xs font-medium text-slate-800 dark:text-slate-200">
                    {evt.action}
                  </span>
                </div>
                <span className="text-[11px] text-slate-400 whitespace-nowrap">
                  {evt.timeAgo}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-mono">
                Triggered by: {evt.user}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
