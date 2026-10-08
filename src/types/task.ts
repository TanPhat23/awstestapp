export type TaskStatus = 'running' | 'queued' | 'completed' | 'failed' | 'paused';
export type TaskPriority = 'critical' | 'high' | 'medium' | 'low';

export interface TaskLogEntry {
  id: string;
  timestamp: string;
  level: 'info' | 'warn' | 'error' | 'success';
  message: string;
}

export interface TaskItem {
  id: string;
  title: string;
  agent: string;
  agentRole: string;
  status: TaskStatus;
  priority: TaskPriority;
  progress: number; // 0 - 100
  currentStep: string;
  startedAt: string;
  duration: string;
  logs: TaskLogEntry[];
  payloadSummary?: string;
}

export interface AgentMetric {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'idle' | 'busy';
  activeTaskCount: number;
  cpuUsage: number;
  memoryUsage: number;
}
