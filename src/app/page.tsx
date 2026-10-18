"use client";

import React, { useState } from "react";
import { TopNavbar } from "@/components/dashboard/TopNavbar";
import { MetricsOverview } from "@/components/dashboard/MetricsOverview";
import { ResourceExplorer } from "@/components/dashboard/ResourceExplorer";
import { CostAnalytics } from "@/components/dashboard/CostAnalytics";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { QuickDeployModal } from "@/components/dashboard/QuickDeployModal";
import {
  initialMetrics,
  initialResources,
  costBreakdown,
  recentActivityEvents,
  stackTemplates,
} from "@/data/mockData";
import { Button } from "@/components/ui/Button";
import { PlusIcon, ShieldCheckIcon, CloudIcon, ServerIcon, DatabaseIcon } from "@/components/ui/Icons";

export default function Home() {
  const [selectedRegion, setSelectedRegion] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isDeployModalOpen, setIsDeployModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors">
      {/* Top Navigation */}
      <TopNavbar
        onQuickDeployClick={() => setIsDeployModalOpen(true)}
        selectedRegion={selectedRegion}
        onRegionChange={setSelectedRegion}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Welcome & Quick Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                AWS Infrastructure Overview
              </h1>
              <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/60 px-2 py-0.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                All Systems Operational
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Account: <span className="font-mono text-slate-700 dark:text-slate-300">aws-prod-main (4912-8801-4421)</span> · Environment: <span className="font-semibold text-amber-500">Production</span>
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery("");
                setSelectedRegion("all");
              }}
            >
              Reset Filters
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => setIsDeployModalOpen(true)}
            >
              <PlusIcon className="w-4 h-4" />
              Provision Resource
            </Button>
          </div>
        </div>

        {/* 1. KPI Metrics */}
        <section aria-label="Executive Metrics">
          <MetricsOverview metrics={initialMetrics} />
        </section>

        {/* 2. Interactive Resource Explorer */}
        <section aria-label="Cloud Resource Explorer">
          <ResourceExplorer
            resources={initialResources}
            searchQuery={searchQuery}
            selectedRegion={selectedRegion}
          />
        </section>

        {/* 3. Cost Analytics & Estimator */}
        <section aria-label="Cost Analytics and Estimator">
          <CostAnalytics breakdown={costBreakdown} />
        </section>

        {/* 4. Activity Audit Stream */}
        <section aria-label="CloudWatch and Audit Log">
          <ActivityFeed events={recentActivityEvents} />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 py-6 text-xs text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CloudIcon className="w-4 h-4 text-amber-500" />
            <span className="font-medium text-slate-700 dark:text-slate-300">awsapp Cloud Console</span>
            <span>· Next.js 15 App Router & React 19</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <ShieldCheckIcon className="w-3.5 h-3.5" /> SOC2 Type II Certified
            </span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="flex items-center gap-1">
              <ServerIcon className="w-3.5 h-3.5 text-blue-500" /> 12 Clusters
            </span>
            <span className="flex items-center gap-1">
              <DatabaseIcon className="w-3.5 h-3.5 text-indigo-500" /> Multi-AZ Aurora
            </span>
          </div>
        </div>
      </footer>

      {/* Quick Deploy Modal */}
      <QuickDeployModal
        isOpen={isDeployModalOpen}
        onClose={() => setIsDeployModalOpen(false)}
        templates={stackTemplates}
      />
    </div>
  );
}
