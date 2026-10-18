export type ResourceCategory = 'All' | 'Compute' | 'Database' | 'Storage' | 'Network' | 'Serverless';

export type ResourceStatus = 'Running' | 'Available' | 'Warning' | 'Updating' | 'Stopped';

export interface CloudResource {
  id: string;
  name: string;
  category: Exclude<ResourceCategory, 'All'>;
  service: string; // e.g. 'Amazon EC2', 'Amazon Aurora', 'Amazon S3', 'AWS Lambda', 'Amazon VPC'
  region: string;
  status: ResourceStatus;
  specs: string; // e.g. 'c6i.2xlarge • 8 vCPU • 16GB', 'Multi-AZ PostgreSQL 15.3', '14.8 TB Standard'
  costMonthly: number;
  uptime: string;
  updatedAt: string;
}

export interface MetricStat {
  id: string;
  title: string;
  value: string;
  subValue?: string;
  change: string;
  isPositive: boolean; // whether the change is considered healthy/good
  trend: 'up' | 'down' | 'neutral';
  timeframe: string;
  chartData?: number[];
}

export interface ActivityLog {
  id: string;
  action: string;
  target: string;
  service: string;
  actor: {
    name: string;
    email: string;
    avatar?: string;
    role: string;
  };
  timestamp: string;
  status: 'Success' | 'In Progress' | 'Failed' | 'Warning';
  details?: string;
}

export interface QuickActionItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge?: string;
  shortcut?: string;
  category: 'compute' | 'serverless' | 'monitoring' | 'security';
}

export interface AwsRegion {
  id: string;
  name: string;
  location: string;
  pingMs?: number;
  isPrimary?: boolean;
}
