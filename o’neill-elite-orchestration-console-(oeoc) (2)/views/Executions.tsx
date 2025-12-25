
import React from 'react';
import { MOCK_RUNS, MOCK_STEP_RUNS } from '../store';
import StatusBadge from '../components/StatusBadge';
import { Play, Pause, Square, ExternalLink } from 'lucide-react';

const Executions: React.FC = () => {
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Live Executions</h2>
          <p className="text-slate-400 text-sm mt-1">Real-time Gantt tracking of active workflow pipelines.</p>
        </div>
        <div className="bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800 text-[10px] text-slate-500 font-mono">
          Refreshed: 15:45:02
        </div>
      </header>

      <div className="space-y-6">
        {MOCK_RUNS.map((run) => (
          <div key={run.id} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                  <Play size={20} className={run.status === 'IN_PROGRESS' ? 'animate-pulse' : ''} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg leading-tight">{run.workflowTitle}</h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[10px] font-mono text-slate-500">{run.id}</span>
                    <span className="text-slate-700">•</span>
                    <span className="text-[10px] text-slate-500">Started: {run.startedAt}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-1">Status</div>
                  <StatusBadge status={run.status} size="sm" />
                </div>
                <div className="w-48">
                   <div className="flex justify-between text-[10px] text-slate-500 mb-1 font-mono">
                    <span>PROGRESS</span>
                    <span>{run.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full transition-all duration-500 ${run.status === 'FAILED' ? 'bg-red-500' : 'bg-blue-500'}`}
                      style={{ width: `${run.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="flex gap-2">
                   <button className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg transition-colors border border-slate-700">
                    <Pause size={14} />
                  </button>
                  <button className="p-2 bg-slate-800 hover:bg-red-900/40 text-slate-400 hover:text-red-400 rounded-lg transition-colors border border-slate-700">
                    <Square size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-6 bg-slate-900/50">
              <div className="relative border-l border-slate-800 ml-4 pl-8 space-y-6">
                {MOCK_STEP_RUNS.map((step) => (
                  <div key={step.id} className="relative group">
                    <div className={`absolute -left-[41px] top-1.5 w-4 h-4 rounded-full border-4 border-slate-950 z-10 ${
                      step.status === 'COMPLETED' ? 'bg-emerald-500' :
                      step.status === 'IN_PROGRESS' ? 'bg-blue-500' :
                      step.status === 'FAILED' ? 'bg-red-500' : 'bg-slate-800'
                    }`}></div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-semibold text-sm text-slate-200">{step.label}</span>
                          <StatusBadge status={step.status} size="sm" />
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[10px] text-slate-500">Agent: <span className="text-slate-300 font-mono">{step.agentId}</span></span>
                          <span className="text-slate-700">•</span>
                          <span className="text-[10px] text-slate-500">Duration: {step.duration}s</span>
                        </div>
                      </div>

                      <div className="w-[60%] flex items-center gap-4">
                        <div className="flex-1 h-2 bg-slate-800/50 rounded-full relative overflow-hidden group-hover:bg-slate-800 transition-colors">
                          <div 
                            className={`absolute h-full rounded-full ${
                              step.status === 'COMPLETED' ? 'bg-emerald-500/40' :
                              step.status === 'IN_PROGRESS' ? 'bg-blue-500/80 animate-pulse' :
                              'bg-slate-700'
                            }`}
                            style={{ 
                              left: `${step.startTime * 2}%`, 
                              width: `${step.duration * 2}%` 
                            }}
                          ></div>
                        </div>
                        <button className="text-slate-600 hover:text-slate-300 transition-colors opacity-0 group-hover:opacity-100">
                          <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Executions;
