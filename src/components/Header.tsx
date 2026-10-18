'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  CloudIcon,
  SearchIcon,
  BellIcon,
  ChevronDownIcon,
  CheckCircleIcon,
  GlobeIcon,
  ExternalLinkIcon,
} from './icons';
import { AwsRegion } from '@/types/aws';

export const AWS_REGIONS: AwsRegion[] = [
  { id: 'us-east-1', name: 'US East (N. Virginia)', location: 'Virginia, USA', pingMs: 18, isPrimary: true },
  { id: 'us-east-2', name: 'US East (Ohio)', location: 'Ohio, USA', pingMs: 24 },
  { id: 'us-west-2', name: 'US West (Oregon)', location: 'Oregon, USA', pingMs: 46 },
  { id: 'eu-west-1', name: 'Europe (Ireland)', location: 'Dublin, Ireland', pingMs: 72 },
  { id: 'eu-central-1', name: 'Europe (Frankfurt)', location: 'Frankfurt, Germany', pingMs: 81 },
  { id: 'ap-northeast-1', name: 'Asia Pacific (Tokyo)', location: 'Tokyo, Japan', pingMs: 120 },
];

interface HeaderProps {
  currentRegion?: string;
  onRegionChange?: (regionId: string) => void;
  onSearch?: (query: string) => void;
}

export function Header({
  currentRegion = 'us-east-1',
  onRegionChange,
  onSearch,
}: HeaderProps) {
  const [selectedRegion, setSelectedRegion] = useState(currentRegion);
  const [isRegionOpen, setIsRegionOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const regionRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);

  const activeRegion = AWS_REGIONS.find((r) => r.id === selectedRegion) || AWS_REGIONS[0];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (regionRef.current && !regionRef.current.contains(e.target as Node)) {
        setIsRegionOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectRegion = (regionId: string) => {
    setSelectedRegion(regionId);
    setIsRegionOpen(false);
    onRegionChange?.(regionId);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Brand */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 shadow-md shadow-amber-500/20 text-white font-bold">
              <CloudIcon className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-slate-900 dark:text-slate-100 text-lg">
                  AWS <span className="text-amber-500 font-extrabold">CloudOps</span>
                </span>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700">
                  Console
                </span>
              </div>
              <p className="hidden md:block text-[11px] text-slate-500 dark:text-slate-400">
                Production Environment • Acc 4829-1092-3814
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              <input
                type="text"
                value={searchVal}
                onChange={handleSearchChange}
                placeholder="Search resources, services, tags (e.g. EC2, prod-db)..."
                aria-label="Search AWS resources"
                className="w-full pl-9 pr-4 py-1.5 text-xs sm:text-sm rounded-lg bg-slate-100 dark:bg-slate-800/80 border border-transparent dark:border-slate-700/60 focus:border-amber-500/50 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none transition-all focus:ring-2 focus:ring-amber-500/20"
              />
              <kbd className="hidden lg:inline-flex absolute right-2.5 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-slate-200/60 dark:bg-slate-700/60 rounded border border-slate-300 dark:border-slate-600">
                ⌘K
              </kbd>
            </div>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Health Status Pill */}
            <div className="hidden lg:flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/60 text-emerald-700 dark:text-emerald-400 text-xs font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>All Systems Normal</span>
            </div>

            {/* Region Selector */}
            <div className="relative" ref={regionRef}>
              <button
                type="button"
                onClick={() => setIsRegionOpen(!isRegionOpen)}
                className="flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                aria-expanded={isRegionOpen}
                aria-haspopup="true"
                aria-label="Select AWS region"
              >
                <GlobeIcon className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span className="font-mono text-xs font-semibold">{activeRegion.id}</span>
                <ChevronDownIcon className={`w-3.5 h-3.5 text-slate-400 transition-transform ${isRegionOpen ? 'rotate-180' : ''}`} />
              </button>

              {isRegionOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400 border-b border-slate-100 dark:border-slate-800">
                    Select AWS Region
                  </div>
                  <div className="max-h-64 overflow-y-auto py-1">
                    {AWS_REGIONS.map((region) => {
                      const isSelected = region.id === activeRegion.id;
                      return (
                        <button
                          key={region.id}
                          onClick={() => handleSelectRegion(region.id)}
                          className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between transition hover:bg-slate-100 dark:hover:bg-slate-800 ${
                            isSelected ? 'bg-amber-50/60 dark:bg-amber-950/30 text-amber-600 dark:text-amber-400 font-medium' : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div>
                            <div className="font-mono font-semibold">{region.id}</div>
                            <div className="text-[11px] text-slate-400">{region.name}</div>
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px]">
                            {region.pingMs && (
                              <span className="font-mono text-[10px] text-slate-400">{region.pingMs}ms</span>
                            )}
                            {isSelected && <CheckCircleIcon className="w-3.5 h-3.5 text-amber-500" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                type="button"
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 rounded-lg text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                aria-label="View notifications"
              >
                <BellIcon className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                </span>
              </button>

              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-3 z-50">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                      CloudWatch Alarms
                    </span>
                    <span className="text-[10px] bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 px-1.5 py-0.5 rounded font-mono font-semibold">
                      2 active
                    </span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                      <div className="font-medium text-slate-800 dark:text-slate-200">
                        RDS CPUUtilization &gt; 80%
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        prod-aurora-cluster-writer • 4m ago
                      </p>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
                      <div className="font-medium text-slate-800 dark:text-slate-200">
                        Lambda Concurrency Spike
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        payment-processor-fn • 18m ago
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Avatar */}
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="relative group cursor-pointer">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-white font-semibold text-xs ring-2 ring-white dark:ring-slate-900 shadow">
                  SA
                </div>
              </div>
              <div className="hidden xl:block text-left text-xs leading-tight">
                <p className="font-semibold text-slate-800 dark:text-slate-200">Sarah Adams</p>
                <p className="text-[11px] text-slate-400 font-mono">DevOps Lead</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
