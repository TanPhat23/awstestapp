import React from "react";

interface HeaderProps {
  activeRegion: string;
  onRegionChange: (region: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function Header({
  activeRegion,
  onRegionChange,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800 bg-[#0d1322]/90 px-6 backdrop-blur-md">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-500 font-bold text-sm tracking-wider shadow-inner">
            AWS
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-sm tracking-tight text-white flex items-center gap-1.5">
              CloudOps Console
              <span className="rounded-full bg-emerald-500/10 border border-emerald-500/30 px-1.5 py-0.2 text-[10px] font-medium text-emerald-400">
                Live
              </span>
            </span>
            <span className="text-xs text-slate-400">Production (Account #8492-1049-3921)</span>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Search */}
        <div className="relative hidden md:block w-72">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <input
            type="search"
            aria-label="Filter resources"
            placeholder="Search instances, buckets, functions..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-md border border-slate-800 bg-slate-900/80 py-1.5 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:border-amber-500/60 focus:bg-slate-900 focus:outline-none transition-colors"
          />
        </div>

        {/* Region selector */}
        <div className="flex items-center gap-2 rounded-md border border-slate-800 bg-slate-900/80 px-2.5 py-1.5 text-xs text-slate-300">
          <span className="text-slate-400">Region:</span>
          <select
            value={activeRegion}
            onChange={(e) => onRegionChange(e.target.value)}
            className="bg-transparent font-medium text-slate-200 focus:outline-none cursor-pointer"
            aria-label="Select AWS Region"
          >
            <option value="all" className="bg-slate-900 text-slate-200">Global (All Regions)</option>
            <option value="us-east-1" className="bg-slate-900 text-slate-200">us-east-1 (N. Virginia)</option>
            <option value="us-west-2" className="bg-slate-900 text-slate-200">us-west-2 (Oregon)</option>
            <option value="eu-west-1" className="bg-slate-900 text-slate-200">eu-west-1 (Ireland)</option>
          </select>
        </div>

        {/* Profile / Status avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-xs font-medium text-slate-300 border border-slate-700">
            Dev
          </div>
        </div>
      </div>
    </header>
  );
}
