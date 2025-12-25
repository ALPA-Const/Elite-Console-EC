
import React from 'react';
import { MOCK_ORCHESTRATORS } from '../store';
import StatusBadge from '../components/StatusBadge';
import { Cpu, RefreshCcw, PowerOff, ShieldCheck, ShieldAlert } from 'lucide-react';

const Orchestrators: React.FC = () => {
  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-white tracking-tight">Orchestrators</h2>
        <p className="text-slate-400 text-sm mt-1">Manage the high-level brain instances controlling the swarm.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_ORCHESTRATORS.map((orc) => (
          <div key={orc.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all flex flex-col justify-between group">
            <div>
              <div className="flex justify-between items-start mb-4">
                <div className="bg-blue-600/10 p-3 rounded-xl border border-blue-500/20 text-blue-500">
                  <Cpu size={24} />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={orc.status} />
                  {orc.autoRecoveryEnabled ? (
                    <span className="text-[9px] text-emerald-500 font-bold uppercase tracking-tighter flex items-center gap-1 bg-emerald-500/5 px-2 py-0.5 rounded-sm border border-emerald-500/20">
                      <ShieldCheck size={10} /> Resilience Active
                    </span>
                  ) : (
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter flex items-center gap-1 bg-slate-800 px-2 py-0.5 rounded-sm border border-slate-700">
                      <ShieldAlert size={10} /> Resilience Disabled
                    </span>
                  )}
                </div>
              </div>
              <h3 className="text-xl font-bold text-white mb-1">{orc.name}</h3>
              <p className="text-xs text-slate-500 font-mono">{orc.id}</p>
              
              <div className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Connected Agents</span>
                  <span className="text-slate-100 font-medium">{orc.agentCount}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Last Heartbeat</span>
                  <span className="text-slate-100 font-medium">Just Now</span>
                </div>
                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Auto-Recovery Mode</span>
                    <div className={`w-8 h-4 rounded-full relative transition-all cursor-pointer ${orc.autoRecoveryEnabled ? 'bg-emerald-600' : 'bg-slate-700'}`}>
                      <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${orc.autoRecoveryEnabled ? 'right-0.5' : 'left-0.5'}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-2">
              <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-all">
                <RefreshCcw size={14} /> Restart
              </button>
              <button className="flex-1 bg-red-600/10 hover:bg-red-600/20 text-red-500 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 border border-red-500/20 transition-all">
                <PowerOff size={14} /> Kill
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orchestrators;
