'use client';

import React, { useState, useMemo } from 'react';
import {
  CloudResource,
  ResourceCategory,
  ResourceStatus,
} from '@/types/aws';
import {
  SearchIcon,
  FilterIcon,
  ServerIcon,
  DatabaseIcon,
  HardDriveIcon,
  NetworkIcon,
  ZapIcon,
  ExternalLinkIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  RefreshCwIcon,
  MoreHorizontalIcon,
} from './icons';

const INITIAL_RESOURCES: CloudResource[] = [
  {
    id: 'i-08f31b814a0ec923a',
    name: 'prod-api-cluster-01',
    category: 'Compute',
    service: 'Amazon EC2',
    region: 'us-east-1a',
    status: 'Running',
    specs: 'c6i.2xlarge • 8 vCPU • 16 GiB',
    costMonthly: 245.28,
    uptime: '49d 12h',
    updatedAt: '2 mins ago',
  },
  {
    id: 'i-0b48c6603a199fa0e',
    name: 'prod-worker-queue-consumer',
    category: 'Compute',
    service: 'Amazon EC2',
    region: 'us-east-1b',
    status: 'Running',
    specs: 't4g.xlarge • 4 vCPU • 16 GiB',
    costMonthly: 98.40,
    uptime: '18d 04h',
    updatedAt: '12 mins ago',
  },
  {
    id: 'rds-aurora-cluster-main',
    name: 'aurora-pg-cluster-prod',
    category: 'Database',
    service: 'Amazon Aurora',
    region: 'us-east-1 Multi-AZ',
    status: 'Running',
    specs: 'db.r6g.2xlarge • Multi-AZ Primary',
    costMonthly: 720.00,
    uptime: '120d 08h',
    updatedAt: '1 hour ago',
  },
  {
    id: 'rds-redis-cache-tier',
    name: 'session-cache-elasticache',
    category: 'Database',
    service: 'Amazon ElastiCache',
    region: 'us-east-1',
    status: 'Available',
    specs: 'cache.r6g.large • 3 Nodes Redis 7.0',
    costMonthly: 198.50,
    uptime: '64d 21h',
    updatedAt: '3 hours ago',
  },
  {
    id: 's3-assets-cloud-bucket',
    name: 'app-static-assets-cdn-origin',
    category: 'Storage',
    service: 'Amazon S3',
    region: 'us-east-1',
    status: 'Available',
    specs: '14.8 TB Standard • KMS SSE-S3',
    costMonthly: 340.40,
    uptime: '365d',
    updatedAt: 'Just now',
  },
  {
    id: 's3-cold-archive-backups',
    name: 'database-snapshots-archive',
    category: 'Storage',
    service: 'Amazon S3 Glacier',
    region: 'us-east-1',
    status: 'Available',
    specs: '48.2 TB Glacier Flexible',
    costMonthly: 173.52,
    uptime: '365d',
    updatedAt: '4 hours ago',
  },
  {
    id: 'vpc-main-production',
    name: 'vpc-core-production-east',
    category: 'Network',
    service: 'Amazon VPC',
    region: 'us-east-1',
    status: 'Available',
    specs: 'CIDR 10.100.0.0/16 • 6 Subnets • NAT GW',
    costMonthly: 64.80,
    uptime: '280d',
    updatedAt: '2 days ago',
  },
  {
    id: 'alb-external-ingress',
    name: 'alb-ingress-public-traffic',
    category: 'Network',
    service: 'Elastic Load Balancing',
    region: 'us-east-1',
    status: 'Running',
    specs: 'Application Load Balancer • 4 Listeners',
    costMonthly: 48.00,
    uptime: '92d 16h',
    updatedAt: '10 mins ago',
  },
  {
    id: 'fn-auth-token-validator',
    name: 'auth-jwt-token-verifier',
    category: 'Serverless',
    service: 'AWS Lambda',
    region: 'us-east-1',
    status: 'Available',
    specs: 'Node.js 20.x • 512 MB • ARM64',
    costMonthly: 18.20,
    uptime: '99.99%',
    updatedAt: '25 mins ago',
  },
  {
    id: 'fn-image-optimizer-cdn',
    name: 'image-transform-pipeline',
    category: 'Serverless',
    service: 'AWS Lambda',
    region: 'us-east-1',
    status: 'Warning',
    specs: 'Python 3.12 • 1024 MB • Memory &gt; 85%',
    costMonthly: 42.60,
    uptime: '99.82%',
    updatedAt: '5 mins ago',
  },
  {
    id: 'i-0994fbc2811a47cd9',
    name: 'staging-microservices-host',
    category: 'Compute',
    service: 'Amazon EC2',
    region: 'us-east-1c',
    status: 'Updating',
    specs: 'm6i.xlarge • AMI Rolling Refresh',
    costMonthly: 140.16,
    uptime: '2d 01h',
    updatedAt: '1 min ago',
  },
];

const CATEGORIES: { label: ResourceCategory; icon: React.ComponentType<{ className?: string }> }[] = [
  { label: 'All', icon: FilterIcon },
  { label: 'Compute', icon: ServerIcon },
  { label: 'Database', icon: DatabaseIcon },
  { label: 'Storage', icon: HardDriveIcon },
  { label: 'Network', icon: NetworkIcon },
  { label: 'Serverless', icon: ZapIcon },
];

function StatusBadge({ status }: { status: ResourceStatus }) {
  switch (status) {
    case 'Running':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/60">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Running
        </span>
      );
    case 'Available':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800/60">
          <CheckCircleIcon className="w-3 h-3 text-blue-500" />
          Available
        </span>
      );
    case 'Warning':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/60">
          <AlertTriangleIcon className="w-3 h-3 text-amber-500" />
          Warning
        </span>
      );
    case 'Updating':
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-400 border border-purple-200 dark:border-purple-800/60">
          <RefreshCwIcon className="w-3 h-3 text-purple-500 animate-spin" />
          Updating
        </span>
      );
    default:
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
          {status}
        </span>
      );
  }
}

export function ResourceTable() {
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [resources, setResources] = useState<CloudResource[]>(INITIAL_RESOURCES);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
      const matchesStatus = statusFilter === 'All' || res.status === statusFilter;
      const matchesSearch =
        searchQuery.trim() === '' ||
        res.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.specs.toLowerCase().includes(searchQuery.toLowerCase()) ||
        res.region.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    });
  }, [resources, selectedCategory, statusFilter, searchQuery]);

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-xs overflow-hidden">
      {/* Table header bar */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100">
              Active Cloud Infrastructure
            </h2>
            <span className="px-2 py-0.5 text-xs font-semibold rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono">
              {filteredResources.length} items
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time telemetry and resource lifecycle management across AWS Availability Zones
          </p>
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <div className="relative flex-1 sm:w-64">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter by name, ID, or spec..."
              aria-label="Filter resources"
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/80 focus:border-amber-500/50 focus:bg-white dark:focus:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 outline-none transition-all"
            />
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            aria-label="Refresh resource inventory"
            className="p-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition"
          >
            <RefreshCwIcon className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-amber-500' : ''}`} />
          </button>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="px-4 sm:px-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between overflow-x-auto gap-4">
        <div className="flex items-center gap-1 sm:gap-2 py-2">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.label;
            return (
              <button
                key={cat.label}
                type="button"
                onClick={() => setSelectedCategory(cat.label)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-white shadow-xs font-semibold'
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Status filter dropdown */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 shrink-0">
          <span>Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-transparent border border-slate-200 dark:border-slate-700 rounded-md px-2 py-1 text-xs text-slate-700 dark:text-slate-300 outline-none cursor-pointer"
          >
            <option value="All" className="dark:bg-slate-900">All Statuses</option>
            <option value="Running" className="dark:bg-slate-900">Running</option>
            <option value="Available" className="dark:bg-slate-900">Available</option>
            <option value="Warning" className="dark:bg-slate-900">Warning</option>
            <option value="Updating" className="dark:bg-slate-900">Updating</option>
          </select>
        </div>
      </div>

      {/* Interactive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <th className="py-3 px-4 sm:px-6">Resource Name &amp; ID</th>
              <th className="py-3 px-4">Service</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4">Configuration / Specs</th>
              <th className="py-3 px-4">Region</th>
              <th className="py-3 px-4 text-right">Est. Cost/mo</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 text-xs">
            {filteredResources.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-slate-400">
                  <div className="flex flex-col items-center justify-center">
                    <FilterIcon className="w-8 h-8 text-slate-300 dark:text-slate-600 mb-2" />
                    <p className="font-medium text-slate-600 dark:text-slate-300">No resources found</p>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Try adjusting your category filter or search query
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredResources.map((res) => (
                <tr
                  key={res.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                >
                  {/* Name and ID */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-600 group-hover:bg-amber-500 transition-colors" />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                          {res.name}
                        </div>
                        <div className="font-mono text-[11px] text-slate-400 select-all">
                          {res.id}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Service */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {res.service}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <StatusBadge status={res.status} />
                  </td>

                  {/* Specs */}
                  <td className="py-3.5 px-4">
                    <div className="text-slate-600 dark:text-slate-400 max-w-xs truncate" title={res.specs}>
                      {res.specs}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5">
                      Uptime: {res.uptime}
                    </div>
                  </td>

                  {/* Region */}
                  <td className="py-3.5 px-4 whitespace-nowrap font-mono text-slate-500 dark:text-slate-400 text-[11px]">
                    {res.region}
                  </td>

                  {/* Cost */}
                  <td className="py-3.5 px-4 text-right font-mono font-medium text-slate-800 dark:text-slate-200 whitespace-nowrap">
                    ${res.costMonthly.toFixed(2)}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1">
                      <button
                        type="button"
                        className="p-1.5 text-slate-400 hover:text-amber-500 dark:hover:text-amber-400 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        title="Open in AWS Management Console"
                      >
                        <ExternalLinkIcon className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                        title="Resource options"
                      >
                        <MoreHorizontalIcon className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer info */}
      <div className="py-3 px-4 sm:px-6 bg-slate-50/50 dark:bg-slate-900/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
        <div>
          Showing <span className="font-semibold text-slate-700 dark:text-slate-300">{filteredResources.length}</span> of {resources.length} resources
        </div>
        <div className="text-[11px] text-slate-400">
          Last synchronized with AWS API: <span className="font-mono">us-east-1</span> 30s ago
        </div>
      </div>
    </div>
  );
}
