
import { Orchestrator, Agent, EntityStatus, Workflow, WorkflowRun, StepRun, Prompt, AuditLog, ResilienceEvent, AgentTask } from './types';

export const MOCK_ORCHESTRATORS: Orchestrator[] = [
  { id: 'o1', name: 'Brain Alpha', status: EntityStatus.IDLE, lastHeartbeat: new Date(), agentCount: 12, autoRecoveryEnabled: true },
  { id: 'o2', name: 'Brain Beta', status: EntityStatus.BUSY, lastHeartbeat: new Date(), agentCount: 10, autoRecoveryEnabled: true },
  { id: 'o3', name: 'Brain Gamma', status: EntityStatus.IDLE, lastHeartbeat: new Date(), agentCount: 8, autoRecoveryEnabled: true },
  { id: 'o4', name: 'Brain Delta', status: EntityStatus.ERROR, lastHeartbeat: new Date(), agentCount: 15, autoRecoveryEnabled: false },
  { id: 'o5', name: 'Brain Epsilon', status: EntityStatus.IDLE, lastHeartbeat: new Date(), agentCount: 5, autoRecoveryEnabled: true },
];

export const MOCK_AGENTS: Agent[] = Array.from({ length: 50 }).map((_, i) => {
  const isDegraded = i % 15 === 0;
  return {
    id: `agent-${i + 1}`,
    orchestratorId: `o${(i % 5) + 1}`,
    type: i % 10 === 0 ? 'agentic' : 'worker',
    status: isDegraded ? EntityStatus.DEGRADED : (Math.random() > 0.8 ? EntityStatus.BUSY : (Math.random() > 0.95 ? EntityStatus.ERROR : EntityStatus.IDLE)),
    capabilityTags: i % 3 === 0 ? ['OCR', 'PDF'] : ['Search', 'Vision', 'Calc'],
    healthScore: isDegraded ? 45 + Math.random() * 20 : 85 + Math.random() * 15,
    lastDiagnostic: '2024-05-20 15:30:00',
    metrics: {
      latency: isDegraded ? 450 + Math.random() * 500 : 40 + Math.random() * 100,
      errorRate: isDegraded ? 5 + Math.random() * 10 : 0.1 + Math.random() * 0.5,
      memoryUsage: 30 + Math.random() * 40,
      cpuUsage: 20 + Math.random() * 60,
      uptime: Math.floor(Math.random() * 86400),
      lastSync: new Date().toISOString(),
    }
  };
});

export const MOCK_TASKS: AgentTask[] = [
  { id: 'tsk-101', label: 'Safety Image Batch #44', assignedTo: 'agent-12', priority: 'high', workflowId: 'wf1' },
  { id: 'tsk-102', label: 'OSHA Compliance OCR', assignedTo: 'agent-7', priority: 'medium', workflowId: 'wf1' },
  { id: 'tsk-103', label: 'Resource Procurement PDF', assignedTo: 'agent-44', priority: 'high', workflowId: 'wf2' },
  { id: 'tsk-104', label: 'Site Map Vectorization', assignedTo: 'agent-3', priority: 'low', workflowId: 'wf3' },
];

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

export const MOCK_RESILIENCE_EVENTS: ResilienceEvent[] = [
  { id: 'ev-1', timestamp: '15:44:01', type: 'HEARTBEAT_TIMEOUT', targetAgentId: 'agent-44', details: 'No response for 30s. Triggering Never-Stop strategy.', severity: 'high' },
  { id: 'ev-2', timestamp: '15:44:02', type: 'STRATEGY_APPLIED', targetAgentId: 'agent-44', details: 'Orphaned task detected: Site_Audit_Step_4. Searching for compatible agent...', severity: 'medium' },
  { id: 'ev-3', timestamp: '15:44:05', type: 'REASSIGNMENT_COMPLETE', targetAgentId: 'agent-12', details: 'Task successfully re-assigned. Workflow continuity maintained.', severity: 'low' },
  { id: 'ev-4', timestamp: '15:44:10', type: 'PROACTIVE_THROTTLING', targetAgentId: 'agent-7', details: 'Latency spike (820ms) detected. Diverting new tasks to standby nodes.', severity: 'medium' },
];
