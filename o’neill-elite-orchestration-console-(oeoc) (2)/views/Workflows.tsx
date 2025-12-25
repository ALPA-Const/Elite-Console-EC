
import React from 'react';
import { MOCK_WORKFLOWS } from '../store';
import { Layers, Play, Settings, Copy, Trash2 } from 'lucide-react';
import { useResilience } from '../contexts/ResilienceContext';

const Workflows: React.FC = () => {
  const { triggerSwarmWorkflow, activeWorkflowProgress, globalEmergencyStop } = useResilience();

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Workflow Registry</h2>
          <p className="text-slate-400 text-sm mt-1">Manage the state machine logic for your automated swarms.</p>
        </div>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">
          Build Template
        </button>
      </header>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_WORKFLOWS.map((wf) => (
          <div key={wf.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex items-center justify-between group hover:border-slate-700 transition-all shadow-sm">
            <div className="flex items-center gap-6">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                <Layers size={28} />
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h3 className="text-lg font-bold text-white">{wf.title}</h3>
                  <span className="bg-slate-800 text-slate-500 px-2 py-0.5 rounded text-[10px] font-mono border border-slate-700">{wf.version}</span>
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-xs text-slate-500">{wf.steps} Steps defined</span>
                  <span className="text-slate-700">|</span>
                  <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider italic">State: Validated</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
              <button 
                onClick={triggerSwarmWorkflow}
                disabled={activeWorkflowProgress > 0 || globalEmergencyStop}
                className="p-3 bg-slate-800 hover:bg-blue-600/20 text-blue-500 rounded-xl transition-all border border-slate-700 hover:border-blue-500/50 disabled:opacity-50" 
                title="Run Swarm Deployment"
              >
                <Play size={18} fill="currentColor" />
              </button>
              <button className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl transition-all border border-slate-700" title="Settings">
                <Settings size={18} />
              </button>
              <button className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-xl transition-all border border-slate-700" title="Duplicate">
                <Copy size={18} />
              </button>
              <button className="p-3 bg-slate-800 hover:bg-red-900/30 text-red-500 rounded-xl transition-all border border-slate-700 hover:border-red-500/50" title="Delete">
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-600/5 border border-blue-500/20 p-6 rounded-2xl flex items-start gap-4">
        <div className="bg-blue-600/20 p-3 rounded-xl text-blue-400">
           <Layers size={24} />
        </div>
        <div>
          <h4 className="text-sm font-black text-white uppercase tracking-widest mb-1">Operational Model: Template-to-Run</h4>
          <p className="text-xs text-slate-400 leading-relaxed max-w-2xl">
            Templates are hydrated into live executions upon trigger. The "Never-Stop" AI manager ensures that if a worker node crashes during a step, the task is re-assigned automatically to an available agent with matching capability tags (OCR, Vision, etc).
          </p>
        </div>
      </div>
    </div>
  );
};

export default Workflows;
