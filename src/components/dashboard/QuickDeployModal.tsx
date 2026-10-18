"use client";

import React, { useState } from "react";
import { StackTemplate } from "@/types/dashboard";
import { ServiceTypeBadge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { XIcon, CheckCircleIcon, ZapIcon } from "@/components/ui/Icons";

interface QuickDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
  templates: StackTemplate[];
}

export function QuickDeployModal({ isOpen, onClose, templates }: QuickDeployModalProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(templates[0]?.id || "");
  const [environment, setEnvironment] = useState<"dev" | "staging" | "prod">("dev");
  const [stackName, setStackName] = useState("my-awsapp-stack");
  const [isDeploying, setIsDeploying] = useState(false);
  const [deployedSuccess, setDeployedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDeploy = () => {
    setIsDeploying(true);
    setTimeout(() => {
      setIsDeploying(false);
      setDeployedSuccess(true);
      setTimeout(() => {
        setDeployedSuccess(false);
        onClose();
      }, 2000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl p-6 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <ZapIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Provision Cloud Architecture Stack
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Deploy infrastructure-as-code blueprints directly to AWS.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
          >
            <XIcon className="w-5 h-5" />
          </button>
        </div>

        {deployedSuccess ? (
          <div className="py-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center">
              <CheckCircleIcon className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white">
              CloudFormation Stack Initialized!
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
              Stack <span className="font-mono text-amber-500">{stackName}</span> is provisioning in your AWS environment.
            </p>
          </div>
        ) : (
          <div className="mt-4 space-y-5">
            {/* Template Selector */}
            <div>
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-2">
                1. Select Architecture Blueprint
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-48 overflow-y-auto p-1">
                {templates.map((tpl) => (
                  <div
                    key={tpl.id}
                    onClick={() => setSelectedTemplate(tpl.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      selectedTemplate === tpl.id
                        ? "border-amber-500 bg-amber-500/5 shadow-xs"
                        : "border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-xs text-slate-900 dark:text-white">
                        {tpl.name}
                      </span>
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                        {tpl.estimatedCost}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2 mb-2">
                      {tpl.description}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {tpl.services.map((svc) => (
                        <ServiceTypeBadge key={svc} type={svc} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stack Configuration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  2. Stack Identifier
                </label>
                <input
                  type="text"
                  value={stackName}
                  onChange={(e) => setStackName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  3. Target Environment
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(["dev", "staging", "prod"] as const).map((env) => (
                    <button
                      key={env}
                      type="button"
                      onClick={() => setEnvironment(env)}
                      className={`py-2 rounded-lg text-xs capitalize font-medium border cursor-pointer transition-colors ${
                        environment === env
                          ? "border-amber-500 bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold"
                          : "border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                      }`}
                    >
                      {env}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-3">
              <Button variant="outline" size="sm" onClick={onClose} disabled={isDeploying}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleDeploy}
                disabled={isDeploying}
              >
                {isDeploying ? "Synthesizing Template..." : "Confirm & Deploy"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
