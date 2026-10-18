export type ServiceType = "EC2" | "RDS" | "S3" | "Lambda" | "ECS" | "CloudFront";

export type ResourceStatus = "running" | "stopped" | "healthy" | "warning" | "error";

export interface ResourceItem {
  id: string;
  name: string;
  type: ServiceType;
  region: string;
  status: ResourceStatus;
  uptime: string;
  costMonthly: number;
  cpuOrReqs?: string;
  storage?: string;
}

export interface MetricSummary {
  title: string;
  value: string;
  subtext: string;
  trend: "up" | "down" | "neutral";
  trendPercentage: string;
  isPositive: boolean;
}

export interface CostBreakdownItem {
  service: ServiceType;
  amount: number;
  percentage: number;
  color: string;
}

export interface ActivityEvent {
  id: string;
  service: ServiceType;
  action: string;
  user: string;
  timeAgo: string;
  severity: "info" | "warning" | "critical" | "success";
}

export interface StackTemplate {
  id: string;
  name: string;
  description: string;
  services: ServiceType[];
  estimatedCost: string;
  category: "Web" | "Serverless" | "Data & AI" | "Containers";
}
