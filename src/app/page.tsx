'use client';

import React, { useState } from 'react';
import { Header } from '@/components/Header';
import { MetricCards } from '@/components/MetricCards';
import { QuickActions } from '@/components/QuickActions';
import { ResourceTable } from '@/components/ResourceTable';
import { ActivityFeed } from '@/components/ActivityFeed';
import {
  CloudIcon,
  ShieldIcon,
  ServerIcon,
  DatabaseIcon,
  HardDriveIcon,
  ZapIcon,
  ExternalLinkIcon,
  RefreshCwIcon,
} from '@/components/icons';

export default function Home() {
  const [currentRegion, setCurrentRegion] = useState('us-east-1');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 700);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/70 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans">
      {/* Top AWS Console Header */}
      <Header
        currentRegion={currentRegion}
        onRegionChange={(region) => setCurrentRegion(region)}
      />

      {/* Main Dashboard Canvas */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Welcome & Command Bar Banner */}
        <section
          aria-label="Overview Banner"
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-6 sm:p-7 shadow-lg border border-slate-800"
        >
          {/* Subtle decorative mesh background lines */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#f59e0b_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded bg-amber-500/20 text-amber-400 border border-amber-500/30">
                  Global Infrastructure
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Region: <span className="text-amber-400 font-bold">{currentRegion}</span>
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
                AWS Cloud Operations Hub
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                Centralized monitoring and unified management across Compute, Relational Aurora
                Databases, S3 Objects, and Serverless workloads.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                type="button"
                onClick={handleRefresh}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 transition"
              >
                <RefreshCwIcon className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-amber-400' : ''}`} />
                <span>Sync Telemetry</span>
              </button>

              <a
                href="https://console.aws.amazon.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-white shadow-md transition"
              >
                <span>AWS Root Console</span>
                <ExternalLinkIcon className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* Quick status mini telemetry strip */}
          <div className="relative z-10 mt-6 pt-4 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="flex items-center gap-2 text-slate-300">
              <ServerIcon className="w-4 h-4 text-amber-400" />
              <span>42 EC2 Instances Healthy</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <DatabaseIcon className="w-4 h-4 text-sky-400" />
              <span>Aurora Multi-AZ Synced</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <HardDriveIcon className="w-4 h-4 text-emerald-400" />
              <span>S3 99.999999999% Durability</span>
            </div>
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldIcon className="w-4 h-4 text-indigo-400" />
              <span>IAM &amp; GuardDuty Protected</span>
            </div>
          </div>
        </section>

        {/* 1. High-Impact KPI Stat Cards */}
        <MetricCards />

        {/* 2. Quick Cloud Action Shortcuts */}
        <QuickActions />

        {/* 3. Main Operational Sections: Resources & Activity Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Resource Inventory (2 cols on wide screen) */}
          <div className="lg:col-span-2 space-y-6">
            <ResourceTable />
          </div>

          {/* Audit & Deployment Stream (1 col on wide screen) */}
          <div className="lg:col-span-1 space-y-6">
            <ActivityFeed />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/40 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <CloudIcon className="w-4 h-4 text-amber-500" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              AWS CloudOps Infrastructure Platform
            </span>
            <span className="text-slate-400">• v2.4.0-prod</span>
          </div>

          <div className="flex items-center gap-6 text-[11px] text-slate-400">
            <span>Security Compliance: SOC2 / ISO27001</span>
            <span>CloudWatch Agent: Healthy</span>
            <span className="font-mono">us-east-1a / 1b / 1c</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
