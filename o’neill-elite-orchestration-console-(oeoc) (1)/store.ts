
import { Orchestrator, Agent, EntityStatus, Workflow, WorkflowRun, StepRun, Prompt, AuditLog } from './types';

export const MOCK_ORCHESTRATORS: Orchestrator[] = [
  { id: 'o1', name: 'Brain Alpha', status: EntityStatus.IDLE, lastHeartbeat: new Date(), agentCount: 12, autoRecoveryEnabled: true },
  { id: 'o2', name: 'Brain Beta', status: EntityStatus.BUSY, lastHeartbeat: new Date(), agentCount: 10, autoRecoveryEnabled: true },
  { id: 'o3', name: 'Brain Gamma', status: EntityStatus.IDLE, lastHeartbeat: new Date(), agentCount: 8, autoRecoveryEnabled: true },
  { id: 'o4', name: 'Brain Delta', status: EntityStatus.ERROR, lastHeartbeat: new Date(), agentCount: 15, autoRecoveryEnabled: false },
  { id: 'o5', name: 'Brain Epsilon', status: EntityStatus.IDLE, lastHeartbeat: new Date(), agentCount: 5, autoRecoveryEnabled: true },
];

export const MOCK_AGENTS: Agent[] = Array.from({ length: 50 }).map((_, i) => ({
  id: `agent-${i + 1}`,
  orchestratorId: `o${(i % 5) + 1}`,
  type: i % 10 === 0 ? 'agentic' : 'worker',
  status: Math.random() > 0.8 ? EntityStatus.BUSY : (Math.random() > 0.95 ? EntityStatus.ERROR : EntityStatus.IDLE),
  capabilityTags: i % 3 === 0 ? ['OCR', 'PDF'] : ['Search', 'Vision', 'Calc'],
}));

export const MOCK_WORKFLOWS: Workflow[] = [
  { id: 'wf1', title: 'Site Inspection Logic', version: 'v1.2.4', steps: 12 },
  { id: 'wf2', title: 'Procurement Pipeline', version: 'v2.0.1', steps: 8 },
  { id: 'wf3', title: 'Safety Audit Loop', version: 'v0.9.8', steps: 15 },
];

export const MOCK_RUNS: WorkflowRun[] = [
  { id: 'run-1', workflowId: 'wf1', workflowTitle: 'Site Inspection Logic', status: EntityStatus.IN_PROGRESS, startedAt: '2024-05-20 14:00', progress: 45 },
  { id: 'run-2', workflowId: 'wf2', workflowTitle: 'Procurement Pipeline', status: EntityStatus.COMPLETED, startedAt: '2024-05-20 12:30', completedAt: '2024-05-20 12:45', progress: 100 },
  { id: 'run-3', workflowId: 'wf3', workflowTitle: 'Safety Audit Loop', status: EntityStatus.FAILED, startedAt: '2024-05-20 13:15', progress: 20 },
];

export const MOCK_STEP_RUNS: StepRun[] = [
  { id: 's1', runId: 'run-1', agentId: 'agent-1', label: 'Image Analysis', status: EntityStatus.COMPLETED, startTime: 0, duration: 15 },
  { id: 's2', runId: 'run-1', agentId: 'agent-2', label: 'OCR Extraction', status: EntityStatus.COMPLETED, startTime: 15, duration: 20 },
  { id: 's3', runId: 'run-1', agentId: 'agent-3', label: 'Compliance Check', status: EntityStatus.IN_PROGRESS, startTime: 35, duration: 40 },
  { id: 's4', runId: 'run-1', agentId: 'agent-4', label: 'Report Generation', status: EntityStatus.PENDING, startTime: 75, duration: 10 },
];

export const MOCK_PROMPTS: Prompt[] = [
  { id: 'p1', slug: 'inspector-reasoning', liveVersion: 'v14', draftVersion: 'v15', hasUnpublishedChanges: true, updatedAt: '2024-05-20' },
  { id: 'p2', slug: 'safety-evaluator', liveVersion: 'v22', hasUnpublishedChanges: false, updatedAt: '2024-05-19' },
  { id: 'p3', slug: 'procurement-bot-v2', liveVersion: 'v03', draftVersion: 'v04', hasUnpublishedChanges: true, updatedAt: '2024-05-18' },
];

export const MOCK_AUDITS: AuditLog[] = [
  { id: 'a1', entityType: 'Prompt', entityId: 'p1', action: 'Update Version', userId: 'usr-44', timestamp: '2024-05-20 15:22:10' },
  { id: 'a2', entityType: 'Orchestrator', entityId: 'o4', action: 'Kill Switch', userId: 'admin', timestamp: '2024-05-20 14:05:01' },
  { id: 'a3', entityType: 'Workflow', entityId: 'wf1', action: 'Execute', userId: 'op-01', timestamp: '2024-05-20 14:00:00' },
];
