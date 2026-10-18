import React from "react";
import { ResourceStatus, ServiceType } from "@/types/dashboard";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "error" | "neutral" | "info" | "purple";
  className?: string;
}

export function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  const variantStyles = {
    default: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-200 dark:border-slate-700",
    success: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
    warning: "bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400 border-amber-200 dark:border-amber-800",
    error: "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400 border-rose-200 dark:border-rose-800",
    neutral: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-700",
    info: "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-400 border-blue-200 dark:border-blue-800",
    purple: "bg-purple-50 text-purple-700 dark:bg-purple-950/50 dark:text-purple-400 border-purple-200 dark:border-purple-800",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}

export function StatusBadge({ status }: { status: ResourceStatus }) {
  switch (status) {
    case "running":
    case "healthy":
      return (
        <Badge variant="success">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="capitalize">{status}</span>
        </Badge>
      );
    case "warning":
      return (
        <Badge variant="warning">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          <span>Warning</span>
        </Badge>
      );
    case "error":
      return (
        <Badge variant="error">
          <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
          <span>Degraded</span>
        </Badge>
      );
    case "stopped":
    default:
      return (
        <Badge variant="neutral">
          <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
          <span>Stopped</span>
        </Badge>
      );
  }
}

export function ServiceTypeBadge({ type }: { type: ServiceType }) {
  const styles: Record<ServiceType, { variant: BadgeProps["variant"]; label: string }> = {
    EC2: { variant: "warning", label: "EC2 Compute" },
    RDS: { variant: "info", label: "RDS Database" },
    S3: { variant: "success", label: "S3 Storage" },
    Lambda: { variant: "purple", label: "Lambda Serverless" },
    ECS: { variant: "info", label: "ECS Fargate" },
    CloudFront: { variant: "purple", label: "CloudFront CDN" },
  };

  const current = styles[type] || { variant: "default", label: type };

  return <Badge variant={current.variant}>{current.label}</Badge>;
}
