
export enum EntityStatus {
  IDLE = 'IDLE',
  BUSY = 'BUSY',
  ERROR = 'ERROR',
  PENDING = 'PENDING',
  ASSIGNED = 'ASSIGNED',
  IN_PROGRESS = 'IN_PROGRESS',
  WAITING = 'WAITING',
  COMPLETED = 'COMPLETED',
  FAILED = 'FAILED'
}

export interface Orchestrator {
  id: string;
  name: string;
  status: EntityStatus;
  lastHeartbeat: Date;
  agentCount: number;
  autoRecoveryEnabled: boolean;
}

export interface Agent {
  id: string;
  orchestratorId: string;
  type: 'agentic' | 'worker';
  status: EntityStatus;
  capabilityTags: string[];
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
