"use client";

import React, { useState } from "react";
import { CloudIcon, BellIcon, SearchIcon, GlobeIcon, PlusIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";

interface TopNavbarProps {
  onQuickDeployClick: () => void;
  selectedRegion: string;
  onRegionChange: (region: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function TopNavbar({
  onQuickDeployClick,
  selectedRegion,
  onRegionChange,
  searchQuery,
  onSearchChange,
}: TopNavbarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & App Title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 shadow-md shadow-amber-500/20">
              <CloudIcon className="w-6 h-6 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                  awsapp
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  Console
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                AWS Infrastructure & Operations
              </p>
            </div>
          </div>

          {/* Search bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search resources, services, or instance IDs..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-sm rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
              />
            </div>
          </div>

          {/* Controls: Region selector, Notification, Quick Deploy */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Region selector */}
            <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-xs text-slate-700 dark:text-slate-300">
              <GlobeIcon className="w-3.5 h-3.5 text-slate-400" />
              <select
                value={selectedRegion}
                onChange={(e) => onRegionChange(e.target.value)}
                aria-label="Select AWS Region"
                className="bg-transparent font-medium focus:outline-none cursor-pointer"
              >
                <option value="all">All Regions</option>
                <option value="us-east-1">us-east-1 (N. Virginia)</option>
                <option value="us-west-2">us-west-2 (Oregon)</option>
                <option value="eu-west-1">eu-west-1 (Ireland)</option>
                <option value="ap-southeast-1">ap-southeast-1 (Singapore)</option>
              </select>
            </div>

            {/* Notification button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="relative p-2 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 transition-colors cursor-pointer"
                aria-label="View notifications"
              >
                <BellIcon className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-amber-500" />
              </button>

              {notificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-3 z-50 text-xs">
                  <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                    <span className="font-semibold text-slate-900 dark:text-white">Recent Notifications</span>
                    <span className="text-[10px] text-amber-500 font-medium">3 unread</span>
                  </div>
                  <div className="space-y-2">
                    <div className="p-2 rounded-lg bg-amber-500/5 border border-amber-500/20">
                      <p className="font-medium text-slate-800 dark:text-slate-200">High memory alert</p>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5">ElastiCache cluster reached 89% RAM capacity.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">24m ago</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                      <p className="font-medium text-slate-800 dark:text-slate-200">Auto-scale completed</p>
                      <p className="text-slate-500 dark:text-slate-400 mt-0.5">2 EC2 instances added to prod-api cluster.</p>
                      <span className="text-[10px] text-slate-400 mt-1 block">1h ago</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Deploy CTA */}
            <Button
              variant="primary"
              size="sm"
              onClick={onQuickDeployClick}
              className="hidden sm:inline-flex"
            >
              <PlusIcon className="w-3.5 h-3.5" />
              Deploy Stack
            </Button>
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="pb-3 md:hidden">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
