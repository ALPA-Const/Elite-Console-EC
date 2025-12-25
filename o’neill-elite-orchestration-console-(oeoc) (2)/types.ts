
export enum EntityStatus {
  IDLE = 'IDLE',
  BUSY = 'BUSY',
  ERROR = 'ERROR',
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING = 'WAITING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED',
  DEGRADED = 'DEGRADED'
}

export interface AgentMetrics {
  latency: number; // ms
  errorRate: number; // %
  memoryUsage: number; // %
  cpuUsage: number; // %
  uptime: number; // seconds
  lastSync: string; // ISO timestamp
}

export interface Agent {
  id: string;
  orchestratorId: string;
  type: 'agentic' | 'worker';
  status: EntityStatus;
  capabilityTags: string[];
  healthScore: number; // 0-100
  lastDiagnostic?: string;
  metrics: AgentMetrics;
}

export interface AgentTask {
  id: string;
  label: string;
  assignedTo: string; // Agent ID
  priority: 'low' | 'medium' | 'high';
  workflowId: string;
}

export interface Orchestrator {
  id: string;
  name: string;
  status: EntityStatus;
  lastHeartbeat: Date;
  agentCount: number;
  autoRecoveryEnabled: boolean;
}

export interface Workflow {
  id: string;
  title: string;
  version: string;
  steps: number;
}

export interface WorkflowRun {
  id: string;
  workflowId: string;
  workflowTitle: string;
  status: EntityStatus;
  startedAt: string;
  completedAt?: string;
  progress: number;
}

export interface StepRun {
  id: string;
  runId: string;
  agentId: string;
  status: EntityStatus;
  label: string;
  startTime: number; // offset in seconds
  duration: number; // in seconds
}

export interface Prompt {
  id: string;
  slug: string;
  liveVersion: string;
  draftVersion?: string;
  hasUnpublishedChanges: boolean;
  updatedAt: string;
}

export interface AuditLog {
  id: string;
  entityType: string;
  entityId: string;
  action: string;
  userId: string;
  timestamp: string;
}

export interface NotificationSettings {
  email: boolean;
  sms: boolean;
  alertThreshold: 'ERROR' | 'ALL';
}

export interface ResilienceEvent {
  id: string;
  timestamp: string;
  type: 'FAULT_DETECTED' | 'STRATEGY_APPLIED' | 'REASSIGNMENT_COMPLETE' | 'HEARTBEAT_TIMEOUT' | 'PROACTIVE_THROTTLING' | 'DIAGNOSTIC_FAILURE' | 'REASSIGNMENT_INITIATED';
  targetAgentId: string;
  details: string;
  severity: 'low' | 'medium' | 'high';
}
