'use client';

import React, { useState } from 'react';
import {
  LayersIcon,
  ServerIcon,
  ActivityIcon,
  ShieldIcon,
  PlusIcon,
  ExternalLinkIcon,
  CheckCircleIcon,
} from './icons';

interface ActionItem {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tag: string;
  tagColor: string;
  primary?: boolean;
}

const QUICK_ACTIONS: ActionItem[] = [
  {
    id: 'deploy-stack',
    title: 'Deploy New Stack',
    description: 'Launch CloudFormation template or CDK cdk8s construct',
    icon: LayersIcon,
    tag: 'CloudFormation',
    tagColor: 'bg-purple-100 dark:bg-purple-950/50 text-purple-700 dark:text-purple-300',
    primary: true,
  },
  {
    id: 'launch-ec2',
    title: 'Launch EC2 Instance',
    description: 'Provision compute with hardened Amazon Linux 2023 AMI',
    icon: ServerIcon,
    tag: 'Compute',
    tagColor: 'bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300',
  },
  {
    id: 'open-cloudwatch',
    title: 'Open CloudWatch',
    description: 'Investigate system metrics, alarms, and X-Ray service maps',
    icon: ActivityIcon,
    tag: 'Observability',
    tagColor: 'bg-blue-100 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300',
  },
  {
    id: 'run-audit',
    title: 'Run Health Audit',
    description: 'Trigger AWS Well-Architected & Security Hub benchmark',
    icon: ShieldIcon,
    tag: 'Compliance',
    tagColor: 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300',
  },
];

export function QuickActions() {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const handleAction = (item: ActionItem) => {
    setActiveModal(item.id);
  };

  const handleExecute = (actionTitle: string) => {
    setActiveModal(null);
    setToastMsg(`Action triggered: "${actionTitle}" execution scheduled.`);
    setTimeout(() => {
      setToastMsg(null);
    }, 3500);
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900/70 p-5 shadow-xs">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="mb-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-xs flex items-center justify-between animate-in fade-in">
          <div className="flex items-center gap-2">
            <CheckCircleIcon className="w-4 h-4 text-emerald-500" />
            <span>{toastMsg}</span>
          </div>
          <button
            type="button"
            onClick={() => setToastMsg(null)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs font-bold"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            Quick Cloud Actions
          </h3>
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            Automated provisioning and operations workflows
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {QUICK_ACTIONS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleAction(item)}
              className={`p-4 rounded-xl text-left border transition-all flex flex-col justify-between group ${
                item.primary
                  ? 'border-amber-500/40 bg-gradient-to-br from-amber-50/40 via-white to-amber-50/20 dark:from-amber-950/20 dark:via-slate-900 dark:to-slate-900 hover:border-amber-500 hover:shadow-md'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-slate-100/70 dark:hover:bg-slate-800/80'
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div
                    className={`p-2 rounded-lg ${
                      item.primary
                        ? 'bg-amber-500 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.tagColor}`}
                  >
                    {item.tag}
                  </span>
                </div>

                <h4 className="font-semibold text-xs text-slate-900 dark:text-slate-100 mt-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="mt-4 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span className="group-hover:translate-x-0.5 transition-transform text-amber-600 dark:text-amber-400">
                  Execute Action →
                </span>
                <PlusIcon className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
              </div>
            </button>
          );
        })}
      </div>

      {/* Confirmation Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl animate-in zoom-in-95 duration-150">
            {(() => {
              const current = QUICK_ACTIONS.find((a) => a.id === activeModal);
              if (!current) return null;
              const Icon = current.icon;
              return (
                <>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">
                        {current.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-mono">
                        Target Region: us-east-1 (Primary)
                      </p>
                    </div>
                  </div>

                  <p className="mt-4 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    You are initiating an automated AWS CloudOps task: <strong>{current.description}</strong>.
                    This operation will be logged to AWS CloudTrail and tagged under the current IAM session.
                  </p>

                  <div className="mt-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-[11px] font-mono text-slate-600 dark:text-slate-400">
                    Execution Mode: Dry-run Pre-check passed • 0 Drift detected
                  </div>

                  <div className="mt-6 flex items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => setActiveModal(null)}
                      className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={() => handleExecute(current.title)}
                      className="px-4 py-2 text-xs font-semibold rounded-lg bg-amber-500 hover:bg-amber-600 text-white shadow-md transition"
                    >
                      Confirm &amp; Dispatch
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
