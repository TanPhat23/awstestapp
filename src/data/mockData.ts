export type InstanceStatus = "running" | "stopped" | "pending" | "terminated";

export interface ComputeInstance {
  id: string;
  name: string;
  type: string;
  region: string;
  ip: string;
  cpuUsage: number;
  memoryUsage: number;
  status: InstanceStatus;
  uptime: string;
}

export interface StorageBucket {
  name: string;
  region: string;
  objectsCount: number;
  sizeGb: number;
  storageClass: "Standard" | "Intelligent-Tiering" | "Glacier";
  encryption: "SSE-S3" | "SSE-KMS";
}

export interface LambdaFunction {
  name: string;
  runtime: string;
  invocations24h: number;
  errorRate: number;
  avgDurationMs: number;
  status: "active" | "throttled" | "degraded";
}

export interface MetricSummary {
  totalMonthlyCost: number;
  costChangePercent: number;
  activeInstances: number;
  totalStorageTb: number;
  lambdaRequestsMillions: number;
  systemHealth: "Optimal" | "Warning" | "Critical";
}

export const INITIAL_INSTANCES: ComputeInstance[] = [
  {
    id: "i-08a9f23c4a1e90",
    name: "api-prod-gateway-01",
    type: "c6i.xlarge",
    region: "us-east-1",
    ip: "54.210.144.12",
    cpuUsage: 42,
    memoryUsage: 68,
    status: "running",
    uptime: "24d 14h",
  },
  {
    id: "i-09b3e14d5e2a81",
    name: "worker-pool-node-04",
    type: "m6i.2xlarge",
    region: "us-east-1",
    ip: "54.210.198.88",
    cpuUsage: 79,
    memoryUsage: 84,
    status: "running",
    uptime: "12d 6h",
  },
  {
    id: "i-01c7a88b1f4c72",
    name: "db-replica-aurora-sync",
    type: "r6g.2xlarge",
    region: "us-west-2",
    ip: "35.160.72.105",
    cpuUsage: 28,
    memoryUsage: 54,
    status: "running",
    uptime: "49d 2h",
  },
  {
    id: "i-03f4c65e89a319",
    name: "staging-cluster-agent-01",
    type: "t4g.medium",
    region: "eu-west-1",
    ip: "52.48.91.240",
    cpuUsage: 8,
    memoryUsage: 31,
    status: "stopped",
    uptime: "0d 0h",
  },
  {
    id: "i-05e8d12b74c204",
    name: "analytics-batch-executor",
    type: "c7g.2xlarge",
    region: "us-east-1",
    ip: "54.89.201.17",
    cpuUsage: 91,
    memoryUsage: 76,
    status: "running",
    uptime: "3d 18h",
  },
];

export const INITIAL_BUCKETS: StorageBucket[] = [
  {
    name: "prod-cloud-assets-pipeline",
    region: "us-east-1",
    objectsCount: 1420580,
    sizeGb: 2840.5,
    storageClass: "Standard",
    encryption: "SSE-KMS",
  },
  {
    name: "telemetry-raw-logs-archive",
    region: "us-east-1",
    objectsCount: 8940020,
    sizeGb: 14250.2,
    storageClass: "Intelligent-Tiering",
    encryption: "SSE-S3",
  },
  {
    name: "db-daily-snapshots-backup",
    region: "us-west-2",
    objectsCount: 365,
    sizeGb: 5820.0,
    storageClass: "Glacier",
    encryption: "SSE-KMS",
  },
  {
    name: "frontend-spa-production-origin",
    region: "global",
    objectsCount: 1840,
    sizeGb: 3.4,
    storageClass: "Standard",
    encryption: "SSE-S3",
  },
];

export const INITIAL_LAMBDAS: LambdaFunction[] = [
  {
    name: "auth-jwt-token-verifier",
    runtime: "Node.js 20.x",
    invocations24h: 4890200,
    errorRate: 0.02,
    avgDurationMs: 42,
    status: "active",
  },
  {
    name: "image-thumbnail-processor",
    runtime: "Python 3.11",
    invocations24h: 124500,
    errorRate: 0.15,
    avgDurationMs: 310,
    status: "active",
  },
  {
    name: "stripe-webhook-dispatcher",
    runtime: "Go 1.x",
    invocations24h: 38200,
    errorRate: 0.00,
    avgDurationMs: 18,
    status: "active",
  },
  {
    name: "sqs-deadletter-cleaner",
    runtime: "Node.js 20.x",
    invocations24h: 1400,
    errorRate: 1.84,
    avgDurationMs: 1250,
    status: "degraded",
  },
];

export const METRIC_SUMMARY: MetricSummary = {
  totalMonthlyCost: 4892.45,
  costChangePercent: -3.8,
  activeInstances: 4,
  totalStorageTb: 22.9,
  lambdaRequestsMillions: 5.05,
  systemHealth: "Optimal",
};

