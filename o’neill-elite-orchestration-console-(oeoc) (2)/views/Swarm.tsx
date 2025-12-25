
import React, { useState, useMemo } from 'react';
import StatusBadge from '../components/StatusBadge';
import { 
  Users, Terminal, Info, ZapOff, Activity, ShieldAlert, 
  BarChart3, Gauge, Thermometer, Database, Code, RefreshCw,
  Globe, Clock, Layers, Copy, Check, Server, Network, ShieldCheck,
  ChevronRight, Braces, Download, Play
} from 'lucide-react';
import { EntityStatus, Agent } from '../types';
import { useResilience } from '../contexts/ResilienceContext';

const Swarm: React.FC = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<string | null>(null);
  const { agents, injectFault, recoverAgent, isAIThinking } = useResilience();
  const [isFaultInjectionMode, setIsFaultInjectionMode] = useState(false);
  const [activeDrawerTab, setActiveDrawerTab] = useState<'telemetry' | 'api'>('telemetry');
  const [isPolling, setIsPolling] = useState(false);
  const [copied, setCopied] = useState(false);

  const selectedAgent = selectedAgentId ? agents.find(a => a.id === selectedAgentId) : null;

  const handleAgentClick = (id: string) => {
    if (isFaultInjectionMode) {
      injectFault(id);
    } else {
      setSelectedAgentId(id);
    }
  };

  const runSelfDiagnostic = (id: string) => {
    setIsPolling(true);
    setTimeout(() => {
      setIsPolling(false);
    }, 800);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const diagnosticJsonResponse = useMemo(() => {
    if (!selectedAgent) return '';
    return JSON.stringify({
      agent_id: selectedAgent.id,
      orchestrator_id: selectedAgent.orchestratorId,
      status: selectedAgent.status,
      health_score: Math.round(selectedAgent.healthScore),
      metrics: {
        cpu_usage_percent: selectedAgent.metrics.cpuUsage.toFixed(2),
        memory_usage_percent: selectedAgent.metrics.memoryUsage.toFixed(2),
        latency_ms: selectedAgent.metrics.latency.toFixed(1),
        error_rate: selectedAgent.metrics.errorRate.toFixed(4),
        uptime_seconds: selectedAgent.metrics.uptime,
        last_sync_iso: selectedAgent.metrics.lastSync
      },
      capabilities: selectedAgent.capabilityTags,
      failover_priority: selectedAgent.type === 'agentic' ? 'high' : 'standard'
    }, null, 2);
  }, [selectedAgent]);

  return (
    <div className="space-y-6 relative h-full animate-in fade-in duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">The Swarm</h2>
          <p className="text-slate-400 text-sm mt-1">Granular oversight of 50+ specialized worker nodes with proactive health metrics.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsFaultInjectionMode(!isFaultInjectionMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
              isFaultInjectionMode 
                ? 'bg-red-600/20 text-red-400 border-red-500/30 ring-2 ring-red-500/20 shadow-lg shadow-red-500/10' 
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-red-400 hover:border-red-500/30 hover:bg-slate-800'
            }`}
          >
            <ZapOff size={14} /> {isFaultInjectionMode ? 'EXIT FAULT MODE' : 'FAULT INJECTION'}
          </button>
        </div>
      </header>

      {isFaultInjectionMode && (
        <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-2xl flex items-center justify-between mb-4 animate-pulse">
           <div className="flex items-center gap-3">
              <ShieldAlert className="text-red-500" size={20} />
              <p className="text-xs text-red-200 font-bold uppercase tracking-widest">Fault Injection Mode Active — Kill nodes to test AI reassignment logic.</p>
           </div>
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-4">
        {agents.map((agent) => (
          <button
            key={agent.id}
            onClick={() => handleAgentClick(agent.id)}
            className={`group relative flex flex-col items-center justify-center p-3 aspect-square rounded-2xl border-2 transition-all overflow-hidden shadow-sm ${
              selectedAgentId === agent.id 
                ? 'border-blue-500 bg-blue-500/10 shadow-blue-500/10 ring-1 ring-blue-500/20' 
                : isFaultInjectionMode && agent.status !== EntityStatus.ERROR
                  ? 'border-red-500/30 bg-red-500/5 hover:border-red-500'
                  : 'border-slate-800 bg-slate-900 hover:border-slate-700 hover:shadow-md'
            }`}
          >
            <div className={`w-3 h-3 rounded-full mb-2 ${
              agent.status === EntityStatus.IDLE ? 'bg-slate-600' : 
              agent.status === EntityStatus.BUSY ? 'bg-blue-400 animate-pulse' : 
              agent.status === EntityStatus.DEGRADED ? 'bg-purple-500 animate-bounce' :
              'bg-red-500'
            }`} />

            <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-200 uppercase font-black tracking-tight">
              {agent.id.replace('agent-', '#')}
            </span>

            <div className="absolute bottom-0 left-0 w-full h-1 bg-slate-800">
              <div 
                className={`h-full transition-all duration-1000 ${
                  agent.healthScore > 80 ? 'bg-emerald-500' :
                  agent.healthScore > 50 ? 'bg-amber-500' : 'bg-red-500'
                }`}
                style={{ width: `${agent.healthScore}%` }}
              />
            </div>

            {agent.status === EntityStatus.ERROR && (
               <div className="absolute inset-0 bg-red-600/20 flex items-center justify-center backdrop-blur-[1px]">
                 <ZapOff size={20} className="text-red-500" />
               </div>
            )}
          </button>
        ))}
      </div>

      {selectedAgentId && selectedAgent && !isFaultInjectionMode && (
        <div className="fixed inset-y-0 right-0 w-[560px] bg-slate-900 border-l border-slate-800 shadow-[0_0_100px_rgba(0,0,0,0.8)] z-50 animate-in slide-in-from-right duration-300">
          <div className="p-10 h-full flex flex-col overflow-hidden">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-4">
                <div className="bg-blue-600/10 p-3 rounded-2xl border border-blue-500/20 text-blue-500 shadow-inner">
                  <Server size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white tracking-tight uppercase">Node {selectedAgent.id.split('-')[1]} Surface</h3>
                  <p className="text-xs text-slate-500 mt-0.5 font-mono flex items-center gap-2">
                    <Globe size={12} className="text-blue-500" />
                    IP: 10.0.{selectedAgent.id.split('-')[1]}.44 <span className="text-slate-700">|</span> V4-MESH-PROTOCOL
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedAgentId(null)}
                className="text-slate-500 hover:text-white transition-all p-2 hover:bg-slate-800 rounded-xl"
              >
                <ChevronRight size={24} />
              </button>
            </div>

            <div className="flex gap-8 border-b border-slate-800 mb-8 overflow-x-auto no-scrollbar shrink-0">
              <button 
                onClick={() => setActiveDrawerTab('telemetry')}
                className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeDrawerTab === 'telemetry' ? 'border-blue-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                <Activity size={14} /> Telemetry Board
              </button>
              <button 
                onClick={() => setActiveDrawerTab('api')}
                className={`pb-4 text-[10px] font-black uppercase tracking-[0.2em] border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
                  activeDrawerTab === 'api' ? 'border-blue-500 text-white' : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                <Code size={14} /> Diagnostics API
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-8 pr-2 custom-scrollbar">
              {activeDrawerTab === 'telemetry' ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between shadow-inner">
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-4">Core Runtime State</span>
                        <StatusBadge status={selectedAgent.status} />
                    </div>
                    <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 flex flex-col justify-between shadow-inner">
                        <span className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-4">Health Index</span>
                        <div className="flex items-end gap-2">
                          <span className={`text-4xl font-black ${
                            selectedAgent.healthScore > 80 ? 'text-emerald-500' :
                            selectedAgent.healthScore > 50 ? 'text-amber-500' : 'text-red-500'
                          }`}>
                            {selectedAgent.healthScore.toFixed(0)}
                          </span>
                          <span className="text-slate-600 text-[10px] font-black mb-1.5 uppercase">Stable</span>
                        </div>
                    </div>
                  </div>

                  {selectedAgent.status === EntityStatus.ERROR && (
                    <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-3xl space-y-4">
                       <div className="flex items-center gap-3 text-red-500">
                          <ShieldAlert size={20} />
                          <h4 className="font-black text-xs uppercase tracking-widest">Node Fault Detected</h4>
                       </div>
                       <p className="text-[11px] text-red-200/70 leading-relaxed">
                         This node is currently non-responsive. The "Never-Stop" Agentic AI manager is attempting to reassign its active workloads to stable nodes in the swarm.
                       </p>
                       <button 
                         onClick={() => recoverAgent(selectedAgent.id)}
                         className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                       >
                         Manual Node Recovery
                       </button>
                    </div>
                  )}

                  <div className="space-y-4">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] flex items-center gap-2 px-1">
                      <BarChart3 size={14} className="text-blue-500" /> Performance Metric Stream
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl group hover:border-blue-500/30 transition-all hover:bg-slate-900/50">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                          <Gauge size={12} className="group-hover:text-blue-400" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Network Latency</span>
                        </div>
                        <div className="text-2xl font-mono text-slate-200 font-bold">{selectedAgent.metrics.latency.toFixed(1)}ms</div>
                      </div>
                      <div className="bg-slate-950 border border-slate-800 p-5 rounded-2xl group hover:border-red-500/30 transition-all hover:bg-slate-900/50">
                        <div className="flex items-center gap-2 text-slate-500 mb-2">
                          <Activity size={12} className="group-hover:text-red-400" />
                          <span className="text-[10px] font-black uppercase tracking-widest">Error Flux</span>
                        </div>
                        <div className="text-2xl font-mono text-slate-200 font-bold">{selectedAgent.metrics.errorRate.toFixed(3)}%</div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                   <div className="bg-slate-950 p-6 rounded-3xl border border-slate-800 shadow-2xl space-y-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="bg-blue-600/10 p-2.5 rounded-xl text-blue-500 border border-blue-500/20 shadow-lg">
                            <Braces size={20} />
                          </div>
                          <div>
                            <h4 className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Endpoint: Diagnostics</h4>
                            <code className="text-xs text-blue-400 font-bold block mt-1">GET /api/v1/diagnostics</code>
                          </div>
                        </div>
                        <div className="flex gap-2">
                           <button 
                             onClick={() => copyToClipboard(diagnosticJsonResponse)}
                             className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 rounded-lg border border-slate-800 transition-colors"
                           >
                             {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                           </button>
                           <button className="p-2 bg-slate-900 hover:bg-slate-800 text-slate-400 rounded-lg border border-slate-800 transition-colors">
                             <Download size={14} />
                           </button>
                        </div>
                      </div>
                      
                      <div className="relative group">
                        <div className="absolute -top-3 left-4 px-2 bg-slate-950 text-[9px] font-black text-slate-500 uppercase tracking-widest">Live Response Body</div>
                        <pre className="p-6 bg-slate-900 rounded-2xl border border-slate-800 font-mono text-[11px] text-emerald-400/90 overflow-x-auto max-h-[400px] custom-scrollbar selection:bg-emerald-500/20">
                          {diagnosticJsonResponse}
                        </pre>
                      </div>

                      <div className="bg-blue-600/5 border border-blue-500/20 p-5 rounded-2xl space-y-3">
                         <div className="flex items-center gap-2 text-blue-400">
                            <Info size={16} />
                            <h5 className="text-[10px] font-black uppercase tracking-widest">Interface Documentation</h5>
                         </div>
                         <p className="text-[11px] text-slate-400 leading-relaxed">
                           This REST interface is polled by the active Orchestrator every 2.5s. It provides granular telemetry including <span className="text-slate-200">CPU Usage</span>, <span className="text-slate-200">RAM allocation</span>, and <span className="text-slate-200">Uptime</span> metrics for the Agentic Resilience Layer.
                         </p>
                      </div>
                   </div>
                </div>
              )}
            </div>

            <div className="pt-8 border-t border-slate-800 mt-8 grid grid-cols-2 gap-4 shrink-0">
              <button 
                onClick={() => recoverAgent(selectedAgent.id)}
                className="bg-slate-800 hover:bg-slate-700 text-slate-300 py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all active:scale-95 border border-slate-700 shadow-lg"
              >
                Full Restart Cycle
              </button>
              <button 
                onClick={() => runSelfDiagnostic(selectedAgent.id)}
                disabled={isPolling}
                className="bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isPolling ? <RefreshCw size={14} className="animate-spin" /> : <Play size={14} />}
                {isPolling ? 'EXECUTING...' : 'TEST ENDPOINT'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Swarm;
