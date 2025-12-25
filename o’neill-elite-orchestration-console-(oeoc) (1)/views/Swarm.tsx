
import React, { useState } from 'react';
import { MOCK_AGENTS } from '../store';
import StatusBadge from '../components/StatusBadge';
import { Users, Filter, Terminal, Info } from 'lucide-react';

const Swarm: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);

  const agent = selectedAgent ? MOCK_AGENTS.find(a => a.id === selectedAgent) : null;

  return (
    <div className="space-y-6 relative h-full">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">The Swarm</h2>
          <p className="text-slate-400 text-sm mt-1">Granular oversight of 50+ specialized worker nodes.</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 mr-2">Sort by type:</span>
          <button className="p-2 bg-slate-900 border border-slate-800 rounded-lg text-slate-400 hover:text-white">
            <Filter size={18} />
          </button>
        </div>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-10 gap-3">
        {MOCK_AGENTS.map((agent) => (
          <button
            key={agent.id}
            onClick={() => setSelectedAgent(agent.id)}
            className={`aspect-square rounded-xl border-2 transition-all flex flex-col items-center justify-center p-2 group ${
              selectedAgent === agent.id 
                ? 'border-blue-500 bg-blue-500/5' 
                : 'border-slate-800 bg-slate-900 hover:border-slate-700'
            }`}
          >
            <div className={`w-3 h-3 rounded-full mb-2 ${
              agent.status === 'IDLE' ? 'bg-slate-600' : 
              agent.status === 'BUSY' ? 'bg-blue-400 animate-pulse' : 
              'bg-red-500 shadow-lg shadow-red-500/20'
            }`} />
            <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-200">
              {agent.id.replace('agent-', '#')}
            </span>
          </button>
        ))}
      </div>

      {/* Side Drawer for Agent Details */}
      {selectedAgent && agent && (
        <div className="fixed inset-y-0 right-0 w-96 bg-slate-900 border-l border-slate-800 shadow-2xl z-50 animate-in slide-in-from-right duration-300">
          <div className="p-6 h-full flex flex-col">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-white">Agent Insight</h3>
              <button 
                onClick={() => setSelectedAgent(null)}
                className="text-slate-500 hover:text-white text-2xl"
              >
                &times;
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-6">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                <div className="flex justify-between items-center mb-4">
                  <StatusBadge status={agent.status} />
                  <span className="text-[10px] font-mono text-slate-500">{agent.id}</span>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 uppercase tracking-widest">Type</span>
                    <span className="text-blue-400 font-bold uppercase">{agent.type}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500 uppercase tracking-widest">Parent</span>
                    <span className="text-slate-300">Orchestrator {agent.orchestratorId}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Terminal size={14} /> Live Logs
                </h4>
                <div className="bg-black rounded-lg p-4 font-mono text-[11px] h-64 overflow-y-auto border border-slate-800 text-emerald-500">
                  <p className="opacity-50">[2024-05-20 15:44:01] Booting sequence initialized...</p>
                  <p className="opacity-70 text-slate-300">[2024-05-20 15:44:02] Connecting to Redis Pub/Sub...</p>
                  <p className="text-blue-400">[2024-05-20 15:44:02] Connected. Listening on swarm:events</p>
                  <p className="opacity-70 text-slate-300">[2024-05-20 15:44:05] Heartbeat emitted. Delta: 0ms</p>
                  {agent.status === 'BUSY' && (
                    <p className="animate-pulse mt-2 text-amber-400">&gt; Processing Workflow #run-1 Step #3...</p>
                  )}
                  {agent.status === 'ERROR' && (
                    <p className="mt-2 text-red-400 font-bold">FATAL: API_CONNECTION_TIMEOUT at line 542</p>
                  )}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Info size={14} /> Capabilities
                </h4>
                <div className="flex flex-wrap gap-2">
                  {agent.capabilityTags.map(tag => (
                    <span key={tag} className="bg-slate-800 text-slate-300 px-3 py-1 rounded-md text-[10px] font-medium border border-slate-700">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 mt-6 grid grid-cols-2 gap-3">
              <button className="bg-slate-800 hover:bg-slate-700 text-white py-3 rounded-xl text-sm font-semibold">
                Reset State
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/20">
                Execute Test
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Swarm;
