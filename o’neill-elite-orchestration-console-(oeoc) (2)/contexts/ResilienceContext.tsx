
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Agent, AgentTask, ResilienceEvent, EntityStatus } from '../types';
import { MOCK_AGENTS, MOCK_TASKS, MOCK_RESILIENCE_EVENTS } from '../store';

interface ResilienceContextType {
  agents: Agent[];
  tasks: AgentTask[];
  events: ResilienceEvent[];
  isNeverStopEnabled: boolean;
  setIsNeverStopEnabled: (val: boolean) => void;
  injectFault: (agentId: string) => void;
  recoverAgent: (agentId: string) => void;
  triggerCascadeFailure: () => void;
  triggerStressTest: () => void;
  globalEmergencyStop: boolean;
  toggleEmergencyStop: () => void;
  isAIThinking: boolean;
  aiReasoning: string;
  triggerSwarmWorkflow: () => void;
  activeWorkflowProgress: number;
}

const ResilienceContext = createContext<ResilienceContextType | undefined>(undefined);

export const ResilienceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agents, setAgents] = useState<Agent[]>(MOCK_AGENTS);
  const [tasks, setTasks] = useState<AgentTask[]>(MOCK_TASKS);
  const [events, setEvents] = useState<ResilienceEvent[]>(MOCK_RESILIENCE_EVENTS);
  const [isNeverStopEnabled, setIsNeverStopEnabled] = useState(true);
  const [globalEmergencyStop, setGlobalEmergencyStop] = useState(false);
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [aiReasoning, setAiReasoning] = useState("");
  const [activeWorkflowProgress, setActiveWorkflowProgress] = useState(0);
  
  const processingRef = useRef<Set<string>>(new Set());

  const addEvent = (event: Omit<ResilienceEvent, 'id' | 'timestamp'>) => {
    const newEvent: ResilienceEvent = {
      ...event,
      id: `ev-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      timestamp: new Date().toLocaleTimeString([], { hour12: false }),
    };
    setEvents(prev => [newEvent, ...prev].slice(0, 50));
  };

  const handleReassignment = useCallback(async (orphanedTask: AgentTask, failedAgentId: string, reason: 'FAILURE' | 'STALE' | 'DEGRADED') => {
    if (processingRef.current.has(orphanedTask.id) || globalEmergencyStop) return;
    
    processingRef.current.add(orphanedTask.id);
    setIsAIThinking(true);
    
    const reasonText = reason === 'FAILURE' ? 'Hardware Failure' : reason === 'STALE' ? 'Heartbeat Timeout' : 'Proactive Re-balancing';
    setAiReasoning(`OEOC Manager: ${reasonText} on ${failedAgentId}. Analyzing construction site context...`);

    addEvent({
      type: reason === 'STALE' ? 'HEARTBEAT_TIMEOUT' : 'REASSIGNMENT_INITIATED',
      targetAgentId: failedAgentId,
      details: `Never-Stop continuity engaged for task "${orphanedTask.label}". Source node: ${failedAgentId}.`,
      severity: 'high'
    });

    try {
      // Find healthy candidates with matching capabilities
      const candidates = agents
        .filter(a => a.status === EntityStatus.IDLE && a.healthScore > 75)
        .sort((a, b) => b.healthScore - a.healthScore)
        .slice(0, 5);

      if (candidates.length === 0) {
        throw new Error("Resource Exhaustion: No healthy standby nodes found in mesh.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `
        ROLE: OEOC Construction Swarm Manager.
        SCENARIO: Node ${failedAgentId} experienced ${reasonText}.
        ORPHANED TASK: "${orphanedTask.label}" (Priority: ${orphanedTask.priority})
        
        AVAILABLE NODES:
        ${candidates.map(c => `- ${c.id}: Health ${c.healthScore}%, Tags: [${c.capabilityTags.join(', ')}]`).join('\n')}
        
        DECISION CRITERIA:
        1. Select the node with the best capability match for the task.
        2. Prioritize high health scores.
        
        OUTPUT FORMAT:
        TARGET: [ID]
        THOUGHT: [Logic]
      `;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: { thinkingConfig: { thinkingBudget: 1000 } }
      });

      const text = response.text || "";
      const targetMatch = text.match(/TARGET:\s*([^\n\r]+)/i);
      const thoughtMatch = text.match(/THOUGHT:\s*([^\n\r]+)/i);

      const targetId = targetMatch ? targetMatch[1].trim() : candidates[0].id;
      const thought = thoughtMatch ? thoughtMatch[1].trim() : "Optimal load migration to healthy node.";

      setAiReasoning(`Manager Decision: ${thought}`);
      
      addEvent({
        type: 'STRATEGY_APPLIED',
        targetAgentId: 'AI_MANAGER',
        details: thought,
        severity: 'medium'
      });

      // Simulation of work state migration
      await new Promise(r => setTimeout(r, 1200));

      setTasks(prev => prev.map(t => t.id === orphanedTask.id ? { ...t, assignedTo: targetId } : t));
      setAgents(prev => prev.map(a => {
        if (a.id === targetId) return { ...a, status: EntityStatus.BUSY };
        if (a.id === failedAgentId && reason !== 'FAILURE') return { ...a, status: EntityStatus.IDLE };
        return a;
      }));

      addEvent({
        type: 'REASSIGNMENT_COMPLETE',
        targetAgentId: targetId,
        details: `Task "${orphanedTask.label}" resumed on ${targetId}. Continuity restored in < 3.5s.`,
        severity: 'low'
      });

    } catch (err) {
      console.error("OEOC AI Error:", err);
      addEvent({
        type: 'DIAGNOSTIC_FAILURE',
        targetAgentId: 'SYSTEM',
        details: `Autonomous recovery aborted: ${err instanceof Error ? err.message : 'Unknown exception'}.`,
        severity: 'high'
      });
    } finally {
      processingRef.current.delete(orphanedTask.id);
      setIsAIThinking(false);
      setAiReasoning("");
    }
  }, [agents, globalEmergencyStop]);

  // Main Monitoring Sentinel
  useEffect(() => {
    if (!isNeverStopEnabled || globalEmergencyStop) return;

    const interval = setInterval(() => {
      const now = new Date().getTime();

      // Detect Stale Nodes (> 10s)
      agents.forEach(agent => {
        const lastSyncTime = new Date(agent.metrics.lastSync).getTime();
        const diff = (now - lastSyncTime) / 1000;
        
        if (diff > 10 && agent.status !== EntityStatus.ERROR) {
           const task = tasks.find(t => t.assignedTo === agent.id);
           if (task) handleReassignment(task, agent.id, 'STALE');
        }
      });

      // Detect Hardware/Crash Failures
      const hardFailAgent = agents.find(a => a.status === EntityStatus.ERROR);
      if (hardFailAgent) {
        const task = tasks.find(t => t.assignedTo === hardFailAgent.id);
        if (task) handleReassignment(task, hardFailAgent.id, 'FAILURE');
      }

      // Proactive re-balancing for Degraded performance
      const degradedAgent = agents.find(a => a.status === EntityStatus.DEGRADED && a.healthScore < 40);
      if (degradedAgent) {
        const task = tasks.find(t => t.assignedTo === degradedAgent.id);
        if (task) handleReassignment(task, degradedAgent.id, 'DEGRADED');
      }

    }, 2500);

    return () => clearInterval(interval);
  }, [agents, tasks, isNeverStopEnabled, globalEmergencyStop, handleReassignment]);

  // Progress simulation for workflows
  useEffect(() => {
    if (activeWorkflowProgress > 0 && activeWorkflowProgress < 100 && !globalEmergencyStop) {
      const t = setTimeout(() => {
        setActiveWorkflowProgress(prev => Math.min(100, prev + 1));
      }, 500);
      return () => clearTimeout(t);
    } else if (activeWorkflowProgress === 100) {
      setTimeout(() => {
        setActiveWorkflowProgress(0);
        setTasks(MOCK_TASKS); // Reset tasks
        setAgents(MOCK_AGENTS); // Reset agents
        addEvent({
          type: 'REASSIGNMENT_COMPLETE',
          targetAgentId: 'CLUSTER',
          details: 'Full Swarm Workflow completed successfully. 50/50 agents reached Goal State.',
          severity: 'low'
        });
      }, 3000);
    }
  }, [activeWorkflowProgress, globalEmergencyStop]);

  const triggerSwarmWorkflow = () => {
    if (activeWorkflowProgress > 0) return;
    
    addEvent({
      type: 'REASSIGNMENT_INITIATED',
      targetAgentId: 'SWARM',
      details: 'Triggering High-Scale 50-Agent Site Inspection Workflow.',
      severity: 'medium'
    });

    // Create 50 tasks for 50 agents
    const newTasks: AgentTask[] = agents.map((agent, i) => ({
      id: `task-swarm-${i}`,
      label: `Site Analysis Node ${i+1}`,
      assignedTo: agent.id,
      priority: Math.random() > 0.8 ? 'high' : 'medium',
      workflowId: 'wf-swarm-1'
    }));

    setTasks(newTasks);
    setAgents(prev => prev.map(a => ({ ...a, status: EntityStatus.BUSY })));
    setActiveWorkflowProgress(1);
  };

  const injectFault = (agentId: string) => {
    setAgents(prev => prev.map(a => a.id === agentId ? { ...a, status: EntityStatus.ERROR, healthScore: 0 } : a));
  };

  const recoverAgent = (agentId: string) => {
    setAgents(prev => prev.map(a => a.id === agentId ? { ...a, status: EntityStatus.IDLE, healthScore: 100, metrics: { ...a.metrics, lastSync: new Date().toISOString(), latency: 45 } } : a));
  };

  const triggerCascadeFailure = () => {
    const active = agents.filter(a => a.status === EntityStatus.BUSY || a.status === EntityStatus.IDLE).sort(() => Math.random() - 0.5).slice(0, 5);
    active.forEach(a => injectFault(a.id));
  };

  const triggerStressTest = () => {
    setAgents(prev => prev.map(a => ({
      ...a,
      metrics: { ...a.metrics, latency: a.metrics.latency + 300, cpuUsage: 98 },
      healthScore: Math.max(0, a.healthScore - 30)
    })));
  };

  const toggleEmergencyStop = () => {
    setGlobalEmergencyStop(!globalEmergencyStop);
    if (!globalEmergencyStop) {
       addEvent({
         type: 'DIAGNOSTIC_FAILURE',
         targetAgentId: 'SYSTEM',
         details: 'GLOBAL KILL SWITCH ENGAGED. All autonomous operations locked.',
         severity: 'high'
       });
    }
  };

  return (
    <ResilienceContext.Provider value={{ 
      agents, tasks, events, isNeverStopEnabled, setIsNeverStopEnabled,
      injectFault, recoverAgent, triggerCascadeFailure, triggerStressTest,
      globalEmergencyStop, toggleEmergencyStop, isAIThinking, aiReasoning,
      triggerSwarmWorkflow, activeWorkflowProgress
    }}>
      {children}
    </ResilienceContext.Provider>
  );
};

export const useResilience = () => {
  const context = useContext(ResilienceContext);
  if (!context) throw new Error("useResilience must be used within ResilienceProvider");
  return context;
};
