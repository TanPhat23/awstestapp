'use client';

import React from 'react';
import {
  DollarSignIcon,
  ServerIcon,
  ZapIcon,
  ActivityIcon,
  ArrowUpRightIcon,
  ArrowDownRightIcon,
} from './icons';
import { MetricStat } from '@/types/aws';

const METRICS_DATA: (MetricStat & { icon: React.ComponentType<{ className?: string }> })[] = [
  {
    id: 'spend',
    title: 'Estimated Monthly Spend',
    value: '$12,840.50',
    subValue: 'Budget: $15,000.00',
    change: '-3.2%',
    isPositive: true, // down is good for spend
    trend: 'down',
    timeframe: 'vs last month',
    icon: DollarSignIcon,
    chartData: [45, 52, 48, 55, 50, 47, 43],
  },
  {
    id: 'compute',
    title: 'Active Compute Instances',
    value: '42',
    subValue: '38 EC2 • 4 ECS Tasks',
    change: '+4 new',
    isPositive: true,
    trend: 'up',
    timeframe: 'past 24 hours',
    icon: ServerIcon,
    chartData: [32, 34, 35, 36, 38, 40, 42],
  },
  {
    id: 'serverless',
    title: 'Serverless Invocations (24h)',
    value: '4.82M',
    subValue: 'Avg Latency: 18ms',
    change: '+14.6%',
    isPositive: true,
    trend: 'up',
    timeframe: 'past 24 hours',
    icon: ZapIcon,
    chartData: [2.1, 2.5, 3.2, 3.8, 4.1, 4.4, 4.82],
  },
  {
    id: 'uptime',
    title: 'Cloud Uptime SLA',
    value: '99.985%',
    subValue: 'Target: 99.950%',
    change: '+0.012%',
    isPositive: true,
    trend: 'up',
    timeframe: 'rolling 30d window',
    icon: ActivityIcon,
    chartData: [99.92, 99.94, 99.95, 99.96, 99.97, 99.98, 99.985],
  },
];

export function MetricCards() {
  return (
    <section aria-label="Key Performance Metrics">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS_DATA.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.id}
              className="relative overflow-hidden rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-5 shadow-xs hover:shadow-md transition-shadow group"
            >
              {/* Subtle top accent bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500/0 via-amber-500/40 to-amber-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    {metric.title}
                  </p>
                  <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50 font-mono">
                    {metric.value}
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400">
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              {metric.subValue && (
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                  {metric.subValue}
                </p>
              )}

              {/* Sparkline & Delta */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span
                    className={`inline-flex items-center text-xs font-semibold px-1.5 py-0.5 rounded ${
                      metric.isPositive
                        ? 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40'
                        : 'text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40'
                    }`}
                  >
                    {metric.trend === 'up' ? (
                      <ArrowUpRightIcon className="w-3.5 h-3.5 mr-0.5 inline" />
                    ) : (
                      <ArrowDownRightIcon className="w-3.5 h-3.5 mr-0.5 inline" />
                    )}
                    {metric.change}
                  </span>
                  <span className="text-[11px] text-slate-400">{metric.timeframe}</span>
                </div>

                {/* Micro SVG sparkline */}
                {metric.chartData && (
                  <svg className="w-16 h-5 overflow-visible" viewBox="0 0 70 20">
                    <polyline
                      fill="none"
                      stroke={metric.isPositive ? '#10b981' : '#f43f5e'}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={metric.chartData
                        .map((val, idx) => {
                          const min = Math.min(...metric.chartData!);
                          const max = Math.max(...metric.chartData!);
                          const range = max - min || 1;
                          const x = idx * 11;
                          const y = 18 - ((val - min) / range) * 16;
                          return `${x},${y}`;
                        })
                        .join(' ')}
                    />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
