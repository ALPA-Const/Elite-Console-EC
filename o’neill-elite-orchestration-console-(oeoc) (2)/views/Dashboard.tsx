
import React, { useState } from 'react';
import { 
  Cpu, Users, Layers, Activity, AlertCircle, 
  ShieldCheck, Mail, Smartphone, RefreshCw, BellRing, Brain, Heart, Power, 
  TrendingUp, Zap, Ghost, Play
} from 'lucide-react';
import StatCard from '../components/StatCard';
import { useResilience } from '../contexts/ResilienceContext';
import { EntityStatus } from '../types';

const Dashboard: React.FC = () => {
  const [isResyncing, setIsResyncing] = useState(false);
  // Destructuring setIsNeverStopEnabled which was missing and causing a reference error on line 169
  const { 
    agents, tasks, events, isAIThinking, aiReasoning, 
    globalEmergencyStop, toggleEmergencyStop, isNeverStopEnabled,
    setIsNeverStopEnabled,
    triggerSwarmWorkflow, activeWorkflowProgress 
  } = useResilience();

  // Calculate Swarm Health Metrics
  const degradedCount = agents.filter(a => a.status === EntityStatus.DEGRADED || (a.status === EntityStatus.BUSY && a.metrics.latency > 300)).length;
  const errorCount = agents.filter(a => a.status === EntityStatus.ERROR).length;
  const totalHealth = agents.reduce((acc, curr) => acc + curr.healthScore, 0);
  const avgHealth = Math.round(totalHealth / agents.length);
  const isHealthLow = avgHealth < 75;

  const triggerResync = () => {
    setIsResyncing(true);
    setTimeout(() => {
      setIsResyncing(false);
    }, 1500);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            Command Center 
            {isNeverStopEnabled && !globalEmergencyStop && (
              <span className="flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 text-[9px] font-black px-2.5 py-1 rounded-full border border-emerald-500/20 tracking-widest animate-pulse uppercase">
                Autonomous
              </span>
            )}
          </h2>
          <p className="text-slate-400 text-sm mt-1">Real-time oversight of the OEOC construction swarm.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={triggerSwarmWorkflow}
            disabled={activeWorkflowProgress > 0 || globalEmergencyStop}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black uppercase tracking-[0.2em] flex items-center gap-2 shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50 transition-all"
          >
            <Play size={16} fill="currentColor" />
            {activeWorkflowProgress > 0 ? 'Workflow In-Progress' : 'Trigger Swarm Workflow'}
          </button>
          
          <button 
            onClick={toggleEmergencyStop}
            className={`px-5 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-lg active:scale-95 ${
              globalEmergencyStop 
              ? 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-emerald-500/20' 
              : 'bg-red-600 text-white hover:bg-red-500 shadow-red-500/20'
            }`}
          >
            <Power size={18} />
            {globalEmergencyStop ? 'Resume Swarm' : 'Global Kill Switch'}
          </button>
        </div>
      </header>

      {/* Active Workflow Progress Bar */}
      {activeWorkflowProgress > 0 && (
        <div className="bg-slate-900 border border-blue-500/30 p-6 rounded-3xl animate-in slide-in-from-top-4 duration-300 shadow-2xl shadow-blue-500/10">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg animate-pulse">
                <Layers size={18} className="text-white" />
              </div>
              <div>
                <h4 className="text-xs font-black text-white uppercase tracking-widest">Active Site Inspection Swarm (50 Nodes)</h4>
                <p className="text-[10px] text-slate-500 uppercase font-bold mt-0.5">Automated Workflow #WF-SWARM-101</p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-black text-white">{activeWorkflowProgress}%</span>
              <span className="text-[10px] text-slate-500 block font-bold uppercase tracking-tighter">Overall Progress</span>
            </div>
          </div>
          <div className="h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
            <div 
              className="h-full bg-blue-500 transition-all duration-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-pulse" 
              style={{ width: `${activeWorkflowProgress}%` }}
            ></div>
          </div>
          <div className="flex justify-between mt-3 text-[9px] font-black text-slate-600 uppercase tracking-widest">
            <span>Stage: Node Analysis</span>
            <span>Target: 50/50 Done</span>
          </div>
        </div>
      )}

      {/* AI Manager Status Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className={`lg:col-span-3 border p-6 rounded-3xl flex items-center justify-between shadow-inner transition-all duration-500 overflow-hidden relative ${
          globalEmergencyStop ? 'bg-red-600/5 border-red-500/20' : 
          isAIThinking ? 'bg-purple-600/10 border-purple-500/30' : 'bg-slate-900 border-slate-800'
        }`}>
          {isAIThinking && (
            <div className="absolute top-0 left-0 h-1 bg-purple-500 animate-progress-stripes w-full"></div>
          )}
          
          <div className="flex items-center gap-6 relative z-10">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-2xl ${
              globalEmergencyStop ? 'bg-red-600 text-white' :
              isAIThinking ? 'bg-purple-600 text-white animate-pulse' : 'bg-blue-600 text-white'
            }`}>
              {globalEmergencyStop ? <Zap size={28} /> : isAIThinking ? <Brain size={28} /> : <ShieldCheck size={28} />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-sm font-black text-white uppercase tracking-widest">
                  {globalEmergencyStop ? 'Sentinel: Locked' : isAIThinking ? 'Sentinel: Reasoning' : 'Sentinel: Vigilant'}
                </h4>
                {isAIThinking && (
                   <span className="text-[10px] text-purple-400 font-bold bg-purple-400/10 px-2 py-0.5 rounded border border-purple-400/20 uppercase tracking-tighter">Gemini Resilience Thread</span>
                )}
              </div>
              <p className="text-xs text-slate-400 max-w-xl line-clamp-2 italic">
                {globalEmergencyStop ? 'All operational threads are manually halted. Monitoring suspended.' :
                 isAIThinking ? aiReasoning : 'Continuity manager is scanning for heartbeat staleness and performance drift across 50 nodes.'}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-end gap-3 shrink-0 ml-8 border-l border-slate-800/50 pr-8">
            <div className="flex gap-4">
              <div className="text-center">
                <span className="text-[9px] text-slate-500 font-black uppercase block tracking-widest">Mesh Stability</span>
                <span className={`text-sm font-bold ${avgHealth > 80 ? 'text-emerald-500' : 'text-amber-500'}`}>{avgHealth}%</span>
              </div>
              <div className="text-center">
                <span className="text-[9px] text-slate-500 font-black uppercase block tracking-widest">Heartbeat</span>
                <span className="text-sm font-bold text-blue-500 font-mono">152ms</span>
              </div>
            </div>
            <button 
              onClick={triggerResync}
              disabled={isAIThinking || globalEmergencyStop}
              className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-white flex items-center gap-1.5 transition-colors disabled:opacity-20"
            >
              <RefreshCw size={12} className={isResyncing ? 'animate-spin' : ''} /> Force Sync
            </button>
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <TrendingUp size={18} />
            </div>
            <span className="text-[11px] font-black text-slate-300 uppercase tracking-widest">Never-Stop Mode</span>
          </div>
          <div className="flex items-center justify-between">
            <span className={`text-2xl font-black ${isNeverStopEnabled ? 'text-emerald-500' : 'text-slate-600'}`}>
              {isNeverStopEnabled ? 'ENABLED' : 'OFFLINE'}
            </span>
            <div 
              onClick={() => setIsNeverStopEnabled(!isNeverStopEnabled)}
              className={`w-12 h-6 rounded-full relative transition-all shadow-inner border border-slate-700 cursor-pointer ${isNeverStopEnabled ? 'bg-emerald-600' : 'bg-slate-800'}`}
            >
               <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isNeverStopEnabled ? 'right-1' : 'left-1'}`} />
            </div>
          </div>
          <p className="text-[10px] text-slate-500 mt-4 leading-relaxed font-medium italic">Auto-migrates tasks if heartbeat > 10s.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <StatCard label="Live Orchestrators" value={globalEmergencyStop ? "0 / 5" : "4 / 5"} trend="Mesh-X" isTrendUp={!globalEmergencyStop} icon={<Cpu size={20} />} />
        <StatCard label="Swarm Capacity" value={agents.length} trend="Peak" isTrendUp={true} icon={<Users size={20} />} />
        <StatCard label="Active Tasks" value={tasks.length} trend="In-Flight" isTrendUp={true} icon={<Layers size={20} />} />
        <StatCard 
          label="Mesh Health" 
          value={`${avgHealth}%`} 
          trend={errorCount > 0 ? `${errorCount} Faults` : 'Stable'} 
          isTrendUp={errorCount === 0} 
          icon={<Heart size={20} className={isHealthLow ? 'text-red-500' : 'text-emerald-500'} />} 
        />
        <StatCard label="Autonomous Recoveries" value={events.filter(e => e.type === 'REASSIGNMENT_COMPLETE').length} trend="Total" isTrendUp={true} icon={<ShieldCheck size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl lg:col-span-2 flex flex-col h-[450px]">
          <div className="flex justify-between items-center mb-6 px-2">
             <h4 className="text-white font-black text-xs uppercase tracking-widest flex items-center gap-2">
              <Activity size={18} className="text-blue-500" />
              Continuity Stream
            </h4>
            <div className="flex items-center gap-2 text-slate-500">
              <span className={`w-2 h-2 rounded-full bg-blue-500 animate-pulse`}></span>
              <span className="text-[10px] font-bold uppercase tracking-widest">Live Feedback</span>
            </div>
          </div>
          
          <div className="flex-1 space-y-3 font-mono text-[11px] overflow-y-auto pr-2 custom-scrollbar">
             {events.length === 0 ? (
               <div className="h-full flex flex-col items-center justify-center opacity-20 italic">
                 <ShieldCheck size={48} className="mb-4" />
                 System nominal. Monitoring mesh...
               </div>
             ) : events.map((log) => (
               <div key={log.id} className={`p-4 rounded-xl border flex gap-4 transition-all hover:bg-slate-800/50 ${
                 log.severity === 'high' ? 'bg-red-500/5 border-red-500/20 shadow-lg shadow-red-500/5' : 
                 log.severity === 'medium' ? 'bg-amber-500/5 border-amber-500/20' : 
                 'bg-slate-950/50 border-slate-800'
               }`}>
                 <div className="pt-0.5">
                   {log.type === 'HEARTBEAT_TIMEOUT' ? <Ghost className="text-red-500" size={14} /> : 
                    log.type === 'REASSIGNMENT_COMPLETE' ? <ShieldCheck className="text-emerald-500" size={14} /> :
                    <Activity className="text-blue-400" size={14} />}
                 </div>
                 <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-black uppercase tracking-tighter ${
                        log.severity === 'high' ? 'text-red-400' :
                        log.type === 'STRATEGY_APPLIED' ? 'text-purple-400' :
                        log.type === 'REASSIGNMENT_COMPLETE' ? 'text-emerald-400' : 'text-blue-400'
                      }`}>
                        {log.type.replace(/_/g, ' ')}
                      </span>
                      <span className="text-slate-600 text-[10px]">[{log.timestamp}]</span>
                    </div>
                    <p className="text-slate-400 leading-relaxed font-medium">
                      <span className="text-slate-200 bg-slate-800 px-1 rounded mr-2 uppercase font-black text-[9px]">{log.targetAgentId}</span>
                      {log.details}
                    </p>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-8 rounded-3xl relative overflow-hidden flex flex-col h-[450px]">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
            <BellRing size={120} className="text-blue-500" />
          </div>
          <h4 className="text-white font-black mb-6 flex items-center gap-2 relative z-10 uppercase tracking-[0.2em] text-xs">
            Operational Health
          </h4>
          
          <div className="space-y-6 relative z-10 flex-1">
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800 shadow-inner">
               <div className="flex justify-between items-center mb-3">
                 <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest">Error flux (24h)</span>
                 <span className="text-emerald-500 text-xs font-bold">Stable</span>
               </div>
               <div className="flex items-end gap-1 h-12">
                  {[40, 30, 45, 60, 20, 15, 25, 35, 10, 5, 8, 12, 18, 4].map((h, i) => (
                    <div key={i} className="flex-1 bg-blue-600/20 rounded-t-sm relative group">
                       <div 
                         className="absolute bottom-0 w-full bg-blue-500/60 rounded-t-sm group-hover:bg-blue-400 transition-all" 
                         style={{ height: `${h}%` }}
                       ></div>
                    </div>
                  ))}
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center text-center">
                 <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Unresponsive</span>
                 <span className="text-2xl font-black text-red-500">{errorCount}</span>
              </div>
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center text-center">
                 <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest mb-1">Continuity</span>
                 <span className="text-2xl font-black text-white">99.9</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Self-Healing Loop</span>
                 <div className="flex gap-1">
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                   <span className="w-1.5 h-1.5 rounded-full bg-slate-800"></span>
                 </div>
               </div>
               <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                 <div className="h-full bg-emerald-500 w-[75%] transition-all"></div>
               </div>
            </div>

            <div className="mt-auto pt-6 border-t border-slate-800/50 flex flex-col items-center gap-2">
               <Brain size={24} className="text-purple-500" />
               <span className="text-[9px] text-slate-600 font-black uppercase tracking-widest">AI Oversight Layer Active</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
