"use client";

import React, { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { MetricsOverview } from "@/components/MetricsOverview";
import { InstanceTable } from "@/components/InstanceTable";
import { StorageView } from "@/components/StorageView";
import { ServerlessView } from "@/components/ServerlessView";
import { CostAnalysisView } from "@/components/CostAnalysisView";
import {
  INITIAL_INSTANCES,
  INITIAL_BUCKETS,
  INITIAL_LAMBDAS,
  METRIC_SUMMARY,
  ComputeInstance,
  StorageBucket,
  LambdaFunction,
} from "@/data/mockData";

type TabType = "all" | "compute" | "storage" | "serverless" | "cost";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabType>("all");
  const [activeRegion, setActiveRegion] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [instances, setInstances] = useState<ComputeInstance[]>(INITIAL_INSTANCES);
  const [buckets] = useState<StorageBucket[]>(INITIAL_BUCKETS);
  const [lambdas] = useState<LambdaFunction[]>(INITIAL_LAMBDAS);

  // Filter instances by region and search
  const filteredInstances = useMemo(() => {
    return instances.filter((inst) => {
      const matchRegion = activeRegion === "all" || inst.region === activeRegion;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch =
        !query ||
        inst.name.toLowerCase().includes(query) ||
        inst.id.toLowerCase().includes(query) ||
        inst.type.toLowerCase().includes(query) ||
        inst.ip.includes(query);
      return matchRegion && matchSearch;
    });
  }, [instances, activeRegion, searchQuery]);

  // Filter buckets by region and search
  const filteredBuckets = useMemo(() => {
    return buckets.filter((b) => {
      const matchRegion = activeRegion === "all" || b.region === "global" || b.region === activeRegion;
      const query = searchQuery.toLowerCase().trim();
      const matchSearch = !query || b.name.toLowerCase().includes(query);
      return matchRegion && matchSearch;
    });
  }, [buckets, activeRegion, searchQuery]);

  // Filter lambdas by search
  const filteredLambdas = useMemo(() => {
    return lambdas.filter((fn) => {
      const query = searchQuery.toLowerCase().trim();
      return !query || fn.name.toLowerCase().includes(query) || fn.runtime.toLowerCase().includes(query);
    });
  }, [lambdas, searchQuery]);

  // Toggle instance status
  const handleToggleStatus = (id: string) => {
    setInstances((prev) =>
      prev.map((inst) => {
        if (inst.id === id) {
          const nextStatus = inst.status === "running" ? "stopped" : "running";
          return {
            ...inst,
            status: nextStatus,
            cpuUsage: nextStatus === "running" ? Math.floor(Math.random() * 40) + 10 : 0,
            memoryUsage: nextStatus === "running" ? Math.floor(Math.random() * 40) + 20 : 0,
          };
        }
        return inst;
      })
    );
  };

  // Randomize instance cpu usage slightly to simulate real telemetry sync
  const handleRefreshMetric = (id: string) => {
    setInstances((prev) =>
      prev.map((inst) => {
        if (inst.id === id && inst.status === "running") {
          return {
            ...inst,
            cpuUsage: Math.floor(Math.random() * 70) + 15,
            memoryUsage: Math.floor(Math.random() * 50) + 35,
          };
        }
        return inst;
      })
    );
  };

  const dynamicSummary = useMemo(() => {
    const runningCount = instances.filter((i) => i.status === "running").length;
    return {
      ...METRIC_SUMMARY,
      activeInstances: runningCount,
    };
  }, [instances]);

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-amber-500/30 selection:text-amber-200">
      {/* Top Console Navigation Bar */}
      <Header
        activeRegion={activeRegion}
        onRegionChange={setActiveRegion}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Banner with quick cluster context */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900/90 to-amber-950/20 p-5 shadow-sm">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight text-white">
                AWS Infrastructure Hub
              </h1>
              <span className="rounded bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-xs font-mono font-medium text-amber-400">
                us-east-1a
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl">
              Comprehensive telemetry, resource allocation, and operations console across cloud compute instances, serverless functions, and storage assets.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                // simulate full telemetry reload
                setInstances((prev) =>
                  prev.map((inst) => ({
                    ...inst,
                    cpuUsage: inst.status === "running" ? Math.floor(Math.random() * 75) + 15 : 0,
                  }))
                );
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/80 px-3.5 py-2 text-xs font-medium text-slate-200 hover:bg-slate-700 transition"
            >
              <svg className="w-3.5 h-3.5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Sync Telemetry
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-amber-500 hover:bg-amber-400 px-3.5 py-2 text-xs font-medium text-slate-950 transition font-semibold"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
              </svg>
              Launch Instance
            </button>
          </div>
        </div>

        {/* Global Key Metrics */}
        <MetricsOverview metrics={dynamicSummary} />

        {/* Nav Tabs */}
        <div className="flex border-b border-slate-800 space-x-1 sm:space-x-4 overflow-x-auto text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`py-3 px-3 font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === "all"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            All Resources
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("compute")}
            className={`py-3 px-3 font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === "compute"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            EC2 Instances ({filteredInstances.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("storage")}
            className={`py-3 px-3 font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === "storage"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            S3 Storage ({filteredBuckets.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("serverless")}
            className={`py-3 px-3 font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === "serverless"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Lambda ({filteredLambdas.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("cost")}
            className={`py-3 px-3 font-medium border-b-2 transition whitespace-nowrap ${
              activeTab === "cost"
                ? "border-amber-500 text-amber-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            Cost & Usage
          </button>
        </div>

        {/* Tab Content Display */}
        <div className="space-y-6">
          {(activeTab === "all" || activeTab === "compute") && (
            <InstanceTable
              instances={filteredInstances}
              onToggleStatus={handleToggleStatus}
              onRefreshMetric={handleRefreshMetric}
            />
          )}

          {(activeTab === "all" || activeTab === "storage") && (
            <StorageView buckets={filteredBuckets} />
          )}

          {(activeTab === "all" || activeTab === "serverless") && (
            <ServerlessView functions={filteredLambdas} />
          )}

          {(activeTab === "all" || activeTab === "cost") && (
            <CostAnalysisView />
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/60 px-6 py-4 text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span>AWS CloudOps Engine v2.4</span>
          <span>•</span>
          <span className="flex items-center gap-1.5 text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            All AWS Systems Operational
          </span>
        </div>
        <div>Connected via IAM Role: CloudOpsAdminAccess</div>
      </footer>
    </div>
  );
}
