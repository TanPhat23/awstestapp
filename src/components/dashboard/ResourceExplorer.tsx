"use client";

import React, { useState, useMemo } from "react";
import { ResourceItem, ServiceType, ResourceStatus } from "@/types/dashboard";
import { StatusBadge, ServiceTypeBadge } from "@/components/ui/Badge";
import { PlayIcon, SquareIcon, RefreshCwIcon, SearchIcon } from "@/components/ui/Icons";

interface ResourceExplorerProps {
  resources: ResourceItem[];
  searchQuery: string;
  selectedRegion: string;
}

export function ResourceExplorer({
  resources: initialResources,
  searchQuery,
  selectedRegion,
}: ResourceExplorerProps) {
  const [resources, setResources] = useState<ResourceItem[]>(initialResources);
  const [activeTab, setActiveTab] = useState<ServiceType | "ALL">("ALL");
  const [statusFilter, setStatusFilter] = useState<ResourceStatus | "ALL">("ALL");
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Filter logic
  const filteredResources = useMemo(() => {
    return resources.filter((item) => {
      // Region filter
      if (selectedRegion !== "all" && item.region !== "Global" && item.region !== selectedRegion) {
        return false;
      }
      // Service Tab filter
      if (activeTab !== "ALL" && item.type !== activeTab) {
        return false;
      }
      // Status filter
      if (statusFilter !== "ALL" && item.status !== statusFilter) {
        return false;
      }
      // Query filter
      if (searchQuery.trim() !== "") {
        const q = searchQuery.toLowerCase();
        const matchName = item.name.toLowerCase().includes(q);
        const matchId = item.id.toLowerCase().includes(q);
        const matchType = item.type.toLowerCase().includes(q);
        if (!matchName && !matchId && !matchType) {
          return false;
        }
      }
      return true;
    });
  }, [resources, activeTab, statusFilter, searchQuery, selectedRegion]);

  const showNotification = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => {
      setFeedbackMessage(null);
    }, 3500);
  };

  const handleToggleState = (id: string) => {
    setResources((prev) =>
      prev.map((r) => {
        if (r.id === id) {
          const nextStatus: ResourceStatus = r.status === "running" ? "stopped" : "running";
          showNotification(`Instance ${r.name} status updated to ${nextStatus}.`);
          return { ...r, status: nextStatus };
        }
        return r;
      })
    );
  };

  const handleRestart = (id: string, name: string) => {
    showNotification(`Restart command sent to ${name}...`);
  };

  return (
    <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 overflow-hidden shadow-xs">
      {/* Table Header controls */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            Active Cloud Resources
            <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
              ({filteredResources.length} matching)
            </span>
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time status, health metrics, and instance lifecycle controls.
          </p>
        </div>

        {/* Status filter dropdown */}
        <div className="flex items-center gap-2">
          <label htmlFor="status-select" className="text-xs text-slate-500 dark:text-slate-400">Status:</label>
          <select
            id="status-select"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ResourceStatus | "ALL")}
            className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
          >
            <option value="ALL">All Statuses</option>
            <option value="running">Running</option>
            <option value="healthy">Healthy</option>
            <option value="warning">Warning</option>
            <option value="stopped">Stopped</option>
          </select>
        </div>
      </div>

      {/* Service Type Tab Bar */}
      <div className="flex items-center gap-1 px-4 sm:px-5 py-2.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 overflow-x-auto text-xs">
        {(["ALL", "EC2", "RDS", "S3", "Lambda", "ECS", "CloudFront"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer whitespace-nowrap ${
              activeTab === tab
                ? "bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 font-semibold"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800/50"
            }`}
          >
            {tab === "ALL" ? "All Services" : tab}
          </button>
        ))}
      </div>

      {/* Floating feedback alert */}
      {feedbackMessage && (
        <div className="mx-4 sm:mx-5 mt-3 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-800 dark:text-amber-300 flex items-center justify-between animate-fadeIn">
          <span>{feedbackMessage}</span>
          <button
            onClick={() => setFeedbackMessage(null)}
            className="font-semibold text-amber-700 dark:text-amber-400 hover:underline text-[11px]"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-900/40 text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <th className="py-3 px-4 sm:px-5">Resource Name & ID</th>
              <th className="py-3 px-4">Service</th>
              <th className="py-3 px-4">Region</th>
              <th className="py-3 px-4">Health / Status</th>
              <th className="py-3 px-4">Utilization</th>
              <th className="py-3 px-4 text-right">Cost / mo</th>
              <th className="py-3 px-4 sm:px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs text-slate-700 dark:text-slate-300">
            {filteredResources.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center text-slate-400">
                  <SearchIcon className="w-6 h-6 mx-auto mb-2 opacity-40" />
                  <p className="font-medium">No resources match the selected filters.</p>
                  <p className="text-[11px] mt-1 text-slate-400">Try adjusting your region, service tab, or search criteria.</p>
                </td>
              </tr>
            ) : (
              filteredResources.map((res) => (
                <tr
                  key={res.id}
                  className="hover:bg-slate-50/75 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3.5 px-4 sm:px-5">
                    <div className="font-medium text-slate-900 dark:text-white">
                      {res.name}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 mt-0.5">
                      {res.id}
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <ServiceTypeBadge type={res.type} />
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-600 dark:text-slate-400">
                    {res.region}
                  </td>
                  <td className="py-3.5 px-4">
                    <StatusBadge status={res.status} />
                  </td>
                  <td className="py-3.5 px-4 text-slate-600 dark:text-slate-400">
                    {res.cpuOrReqs || res.storage || res.uptime}
                  </td>
                  <td className="py-3.5 px-4 text-right font-medium text-slate-900 dark:text-white">
                    ${res.costMonthly.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 sm:px-5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {res.type === "EC2" ? (
                        <button
                          onClick={() => handleToggleState(res.id)}
                          title={res.status === "running" ? "Stop Instance" : "Start Instance"}
                          className={`p-1.5 rounded-md border text-xs cursor-pointer transition-colors ${
                            res.status === "running"
                              ? "border-rose-200 dark:border-rose-800/60 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30"
                              : "border-emerald-200 dark:border-emerald-800/60 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                          }`}
                        >
                          {res.status === "running" ? (
                            <SquareIcon className="w-3.5 h-3.5" />
                          ) : (
                            <PlayIcon className="w-3.5 h-3.5" />
                          )}
                        </button>
                      ) : null}

                      <button
                        onClick={() => handleRestart(res.id, res.name)}
                        title="Sync & inspect status"
                        className="p-1.5 rounded-md border border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      >
                        <RefreshCwIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
