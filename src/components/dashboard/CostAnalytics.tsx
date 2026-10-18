"use client";

import React, { useState } from "react";
import { CostBreakdownItem } from "@/types/dashboard";

interface CostAnalyticsProps {
  breakdown: CostBreakdownItem[];
}

export function CostAnalytics({ breakdown }: CostAnalyticsProps) {
  // Interactive budget calculator states
  const [instancesCount, setInstancesCount] = useState(6);
  const [dbTier, setDbTier] = useState<"standard" | "memory" | "serverless">("serverless");
  const [storageGB, setStorageGB] = useState(1500);

  // Dynamic estimate calculation
  const ec2Estimate = instancesCount * 28.5;
  const dbEstimate = dbTier === "standard" ? 180 : dbTier === "memory" ? 340 : 120;
  const storageEstimate = (storageGB * 0.023) + 15;
  const totalCalculated = ec2Estimate + dbEstimate + storageEstimate;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Current Spend Distribution */}
      <div className="lg:col-span-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
              Current Spend by Service
            </h3>
            <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
              Month to Date
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Breakdown across provisioned cloud infrastructure.
          </p>

          {/* Stacked bar visualizer */}
          <div className="mt-4 w-full h-3 rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-800">
            {breakdown.map((item) => (
              <div
                key={item.service}
                className={`${item.color} h-full transition-all`}
                style={{ width: `${item.percentage}%` }}
                title={`${item.service}: $${item.amount} (${item.percentage}%)`}
              />
            ))}
          </div>

          {/* Breakdown legend list */}
          <div className="mt-4 grid grid-cols-2 gap-2.5">
            {breakdown.map((item) => (
              <div
                key={item.service}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="font-medium text-slate-700 dark:text-slate-300">
                    {item.service}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    ${item.amount.toFixed(0)}
                  </span>
                  <span className="text-[10px] text-slate-400 ml-1">
                    ({item.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
          <span>Cost Optimization Recommendation:</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-medium">
            Save ~$240/mo with Compute Savings Plans
          </span>
        </div>
      </div>

      {/* Interactive Architecture Spend Estimator */}
      <div className="lg:col-span-6 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
            Architecture Cost Estimator
          </h3>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-amber-500/10 text-amber-600 dark:text-amber-400">
            Interactive
          </span>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Adjust scale parameters to forecast monthly infrastructure costs.
        </p>

        <div className="mt-4 space-y-4">
          {/* Slider: Instances */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="text-slate-700 dark:text-slate-300">EC2 / ECS Tasks: {instancesCount}</span>
              <span className="text-slate-500">${ec2Estimate.toFixed(0)}/mo</span>
            </div>
            <input
              type="range"
              min={1}
              max={30}
              value={instancesCount}
              onChange={(e) => setInstancesCount(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Radio / Toggle: Database Tier */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1.5">
              <span className="text-slate-700 dark:text-slate-300">Aurora Database Tier</span>
              <span className="text-slate-500">${dbEstimate}/mo</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {(["serverless", "standard", "memory"] as const).map((tier) => (
                <button
                  key={tier}
                  onClick={() => setDbTier(tier)}
                  className={`py-1.5 px-2 rounded-lg text-xs capitalize font-medium border cursor-pointer transition-colors ${
                    dbTier === tier
                      ? "border-amber-500 bg-amber-500/10 text-amber-700 dark:text-amber-300 font-semibold"
                      : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {tier}
                </button>
              ))}
            </div>
          </div>

          {/* Slider: Storage */}
          <div>
            <div className="flex justify-between text-xs font-medium mb-1">
              <span className="text-slate-700 dark:text-slate-300">S3 Storage: {storageGB} GB</span>
              <span className="text-slate-500">${storageEstimate.toFixed(0)}/mo</span>
            </div>
            <input
              type="range"
              min={100}
              max={10000}
              step={100}
              value={storageGB}
              onChange={(e) => setStorageGB(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Estimated total card */}
        <div className="mt-4 p-3 rounded-lg bg-slate-900 dark:bg-slate-950 text-white flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">Projected Total</span>
            <span className="text-xl font-bold tracking-tight text-amber-400">
              ${totalCalculated.toFixed(2)}
              <span className="text-xs text-slate-400 font-normal"> / month</span>
            </span>
          </div>
          <span className="text-xs text-slate-400">
            Based on on-demand AWS standard pricing
          </span>
        </div>
      </div>
    </div>
  );
}
