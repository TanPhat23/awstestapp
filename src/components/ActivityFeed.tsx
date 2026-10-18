'use client';

import React, { useState } from 'react';
import { ActivityLog } from '@/types/aws';
import {
  ActivityIcon,
  CheckCircleIcon,
  AlertTriangleIcon,
  RefreshCwIcon,
  ExternalLinkIcon,
} from './icons';

const INITIAL_ACTIVITIES: ActivityLog[] = [
  {
    id: 'act-1092',
    action: 'CloudFormation Stack Update',
    target: 'arn:aws:cloudformation:us-east-1:stack/prod-eks-addons',
    service: 'AWS CloudFormation',
    actor: {
      name: 'Sarah Adams',
      email: 's.adams@corp.internal',
      role: 'DevOps Lead',
    },
    timestamp: '4 mins ago',
    status: 'Success',
    details: 'Stack update initiated by GitOps pipeline [commit #b89d42]',
  },
  {
    id: 'act-1091',
    action: 'Auto-scaling Group Scale Out',
    target: 'asg-prod-ingress-workers (+2 instances)',
    service: 'Auto Scaling',
    actor: {
      name: 'AWS AutoScale Bot',
      email: 'autoscaling.amazonaws.com',
      role: 'Service Principal',
    },
    timestamp: '18 mins ago',
    status: 'Success',
    details: 'Target Tracking Policy triggered: Average CPU utilization reached 78%',
  },
  {
    id: 'act-1090',
    action: 'RDS Automated Snapshot Created',
    target: 'rds:aurora-pg-cluster-prod-snapshot-daily',
    service: 'Amazon RDS',
    actor: {
      name: 'AWS Backup Service',
      email: 'backup.amazonaws.com',
      role: 'System',
    },
    timestamp: '1 hour ago',
    status: 'Success',
    details: 'Point-in-time recovery backup created (1.2 TB encrypted snapshot)',
  },
  {
    id: 'act-1089',
    action: 'IAM Policy Attached to Role',
    target: 'role/lambda-s3-rw-execution-policy',
    service: 'AWS IAM',
    actor: {
      name: 'Marcus Chen',
      email: 'm.chen@corp.internal',
      role: 'Cloud Architect',
    },
    timestamp: '2 hours ago',
    status: 'Warning',
    details: 'Least privilege scan flagged wildcards in resource ARN specification',
  },
  {
    id: 'act-1088',
    action: 'CodePipeline Deploy Triggered',
    target: 'pipeline/prod-api-release-v2.14.0',
    service: 'AWS CodePipeline',
    actor: {
      name: 'GitHub Webhook',
      email: 'integration@github.aws',
      role: 'CI/CD Bot',
    },
    timestamp: '3 hours ago',
    status: 'Success',
    details: 'Blue/Green deployment completed zero-downtime cutover on port 443',
  },
  {
    id: 'act-1087',
    action: 'KMS Key Rotation Verified',
    target: 'arn:aws:kms:us-east-1:key/cmk-db-encryption-01',
    service: 'AWS KMS',
    actor: {
      name: 'AWS KMS Daemon',
      email: 'kms.amazonaws.com',
      role: 'Security Engine',
    },
    timestamp: '5 hours ago',
    status: 'Success',
    details: 'Annual cryptographically scheduled key material rotation successful',
  },
];

export function ActivityFeed() {
  const [activities] = useState<ActivityLog[]>(INITIAL_ACTIVITIES);
  const [filterType, setFilterType] = useState<string>('all');

  const filtered = activities.filter((act) => {
    if (filterType === 'all') return true;
    if (filterType === 'warning') return act.status === 'Warning' || act.status === 'Failed';
    if (filterType === 'success') return act.status === 'Success';
    return true;
  });

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
            <ActivityIcon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              CloudWatch &amp; CloudTrail Stream
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Live audit events &amp; deployment history
            </p>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-[11px]">
          <button
            type="button"
            onClick={() => setFilterType('all')}
            className={`px-2 py-0.5 rounded-md font-medium transition ${
              filterType === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setFilterType('warning')}
            className={`px-2 py-0.5 rounded-md font-medium transition ${
              filterType === 'warning'
                ? 'bg-white dark:bg-slate-700 text-amber-600 dark:text-amber-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            Warnings
          </button>
        </div>
      </div>

      <div className="space-y-3.5 mt-2">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 hover:border-slate-200 dark:hover:border-slate-700 transition"
          >
            <div className="mt-0.5 shrink-0">
              {item.status === 'Success' ? (
                <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <CheckCircleIcon className="w-3.5 h-3.5" />
                </div>
              ) : item.status === 'Warning' ? (
                <div className="w-6 h-6 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <AlertTriangleIcon className="w-3.5 h-3.5" />
                </div>
              ) : (
                <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <RefreshCwIcon className="w-3.5 h-3.5 animate-spin" />
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {item.action}
                </span>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">
                  {item.timestamp}
                </span>
              </div>

              <p className="text-[11px] text-slate-600 dark:text-slate-300 font-mono mt-0.5 truncate">
                {item.target}
              </p>

              {item.details && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                  {item.details}
                </p>
              )}

              <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400 pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                <span className="font-medium text-slate-600 dark:text-slate-300">
                  {item.actor.name} <span className="text-slate-400">({item.actor.role})</span>
                </span>
                <span className="px-1.5 py-0.5 rounded bg-slate-200/60 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 font-mono text-[9px]">
                  {item.service}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
        <button
          type="button"
          className="text-xs font-medium text-amber-600 dark:text-amber-400 hover:text-amber-700 inline-flex items-center gap-1 transition"
        >
          <span>View complete CloudTrail event log in AWS Console</span>
          <ExternalLinkIcon className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
}
