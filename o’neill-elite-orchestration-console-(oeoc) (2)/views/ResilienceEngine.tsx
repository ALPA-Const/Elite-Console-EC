
import React from 'react';
import { 
  ShieldCheck, Activity, Brain, Zap, RefreshCw, 
  AlertTriangle, Cpu, Users, BarChart3, TrendingUp, Search,
  ArrowRight, CheckCircle, Ghost, Server, ZapOff, Sparkles, ActivitySquare
} from 'lucide-react';
import { useResilience } from '../contexts/ResilienceContext';
import { EntityStatus } from '../types';

const ResilienceEngine: React.FC = () => {
  const { 
    agents, 
    tasks, 
    events, 
    isNeverStopEnabled, 
    setIsNeverStopEnabled, 
    isAIThinking, 
    aiReasoning,
    triggerCascadeFailure,
    triggerStressTest,
    globalEmergencyStop
  } = useResilience();
  
  const engineStatus = globalEmergencyStop ? 'halted' : isAIThinking ? 'optimizing' : (agents.some(a => a.status === EntityStatus.ERROR) ? 'alert' : 'nominal');
  const avgHealth = Math.round(agents.reduce((acc, curr) => acc + curr.healthScore, 0) / agents.length);

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Resilience Engine</h2>
          <p className="text-slate-400 text-sm mt-1">Autonomous Manager ensuring "Never-Stop" continuity through proactive monitoring.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={triggerStressTest}
            disabled={globalEmergencyStop}
            className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-slate-400 border border-slate-800 rounded-xl text-xs font-black uppercase tracking-widest hover:text-white hover:border-slate-600 transition-all disabled:opacity-30"
          >
            <ActivitySquare size={14} /> Stress Test Mesh
          </button>
          
          <button 
            onClick={triggerCascadeFailure}
            disabled={globalEmergencyStop}
            className="flex items-center gap-2 px-4 py-2 bg-red-950/30 text-red-400 border border-red-900/50 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-red-900/40 transition-all active:scale-95 disabled:opacity-30"
          >
            <ZapOff size={14} /> Simulate Cascade
          </button>
          
          <div className="flex items-center gap-3 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800">
            <span className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">Never-Stop</span>
            <button 
              onClick={() => setIsNeverStopEnabled(!isNeverStopEnabled)}
              disabled={globalEmergencyStop}
              className={`w-10 h-5 rounded-full relative transition-all shadow-inner disabled:opacity-30 ${isNeverStopEnabled ? 'bg-emerald-600' : 'bg-slate-700'}`}
            >
              <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${isNeverStopEnabled ? 'right-1' : 'left-1'}`} />
            </button>
          </div>
        </div>
      </header>

      {/* AI Manager Status Bar */}
      {isAIThinking && (
        <div className="bg-purple-600/10 border border-purple-500/20 p-4 rounded-2xl flex items-center justify-between animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-4">
            <div className="bg-purple-600 p-2 rounded-lg animate-pulse">
              <Brain size={18} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black text-purple-400 uppercase tracking-widest mb-1">Current Manager Focus</div>
              <p className="text-xs text-slate-200 font-medium italic">"{aiReasoning || 'Analyzing swarm telemetry for optimal task migration...'}"</p>
            </div>
          </div>
          <div className="px-4 py-1.5 bg-purple-500/10 border border-purple-500/30 rounded-full flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping"></span>
            <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">GEMINI_REASONING_ACTIVE</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Core AI Manager Panel */}
        <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl flex flex-col items-center text-center shadow-lg relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
              <Brain size={120} />
           </div>
           
           <div className={`w-24 h-24 rounded-full flex items-center justify-center mb-6 border-4 shadow-2xl transition-all duration-1000 ${
             engineStatus === 'nominal' ? 'bg-emerald-500/10 border-emerald-500 shadow-emerald-500/20' :
             engineStatus === 'optimizing' ? 'bg-purple-500/10 border-purple-500 animate-pulse shadow-purple-500/20' :
             engineStatus === 'halted' ? 'bg-red-600/10 border-red-600 shadow-red-500/20' :
             'bg-red-500/10 border-red-500 shadow-red-500/20'
           }`}>
             {engineStatus === 'nominal' && <ShieldCheck size={48} className="text-emerald-500" />}
             {engineStatus === 'optimizing' && <Sparkles size={48} className="text-purple-400 animate-bounce" />}
             {engineStatus === 'halted' && <ZapOff size={48} className="text-red-600" />}
             {engineStatus === 'alert' && <AlertTriangle size={48} className="text-red-500" />}
           </div>
           
           <h3 className="text-xl font-black text-white uppercase tracking-wider mb-2">Agentic Oversight</h3>
           <p className="text-[11px] text-slate-400 leading-relaxed mb-8 px-2 uppercase tracking-tight opacity-70">
             {globalEmergencyStop ? "Manager thread is locked by manual override." :
              isAIThinking ? "Manager is re-routing workloads to optimize health." : "AI Manager is observing heartbeat signals."}
           </p>

           <div className="w-full space-y-4 relative z-10">
             <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left">
                <span className="text-[9px] text-slate-600 uppercase font-black tracking-widest block mb-2">Active Strategy</span>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white uppercase">{globalEmergencyStop ? 'HALTED' : 'AI-Mesh Recovery'}</span>
                  <div className="flex gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${isAIThinking ? 'bg-purple-500 animate-ping' : globalEmergencyStop ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                  </div>
                </div>
             </div>
             
             <div className="flex justify-between items-center text-[10px] bg-slate-950 p-4 rounded-xl border border-slate-800">
               <span className="text-slate-500 uppercase font-black tracking-widest">Total Recoveries</span>
               <span className="text-blue-400 font-black text-sm">{events.filter(e => e.type === 'REASSIGNMENT_COMPLETE').length}</span>
             </div>
             <div className="flex justify-between items-center text-[10px] bg-slate-950 p-4 rounded-xl border border-slate-800">
               <span className="text-slate-500 uppercase font-black tracking-widest">Mesh Health</span>
               <span className={`font-black text-sm ${avgHealth > 80 ? 'text-emerald-500' : 'text-amber-500'}`}>{avgHealth}%</span>
             </div>
           </div>
        </div>

        {/* Live Continuity Matrix */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-lg">
          <div className="bg-slate-950 p-5 border-b border-slate-800 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Activity className="text-blue-500" size={20} />
              <h4 className="text-sm font-black text-white uppercase tracking-widest">Continuity Decision Feed</h4>
            </div>
            <div className="flex items-center gap-4">
               <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500">
                 <Server size={14} /> Mesh Nodes: {agents.length}
               </div>
               <span className={`text-[9px] px-2 py-1 rounded-md font-black border uppercase tracking-widest ${
                 isNeverStopEnabled && !globalEmergencyStop ? 'bg-blue-600/10 text-blue-500 border-blue-500/20' : 'bg-slate-800 text-slate-500 border-slate-700'
               }`}>
                 {globalEmergencyStop ? 'LOCKED' : isNeverStopEnabled ? 'NEVER-STOP ENABLED' : 'MANUAL OVERRIDE'}
               </span>
            </div>
          </div>
          
          <div className="flex-1 p-0 overflow-hidden flex flex-col">
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 overflow-y-auto custom-scrollbar h-[400px]">
              <div className="space-y-6">
                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Autonomous State Changes</h5>
                <div className="space-y-4">
                  {events.length === 0 ? (
                    <div className="text-center py-20 opacity-20 italic text-sm">Waiting for continuity events...</div>
                  ) : events.map((ev) => (
                    <div key={ev.id} className={`p-4 rounded-xl border flex gap-4 transition-all hover:bg-slate-800/40 group ${
                      ev.severity === 'high' ? 'bg-red-500/5 border-red-500/20 shadow-lg shadow-red-500/5' : 
                      ev.severity === 'medium' ? 'bg-amber-500/5 border-amber-500/20' : 
                      'bg-slate-950/50 border-slate-800'
                    }`}>
                      <div className="pt-1">
                        {ev.type === 'HEARTBEAT_TIMEOUT' || ev.type === 'FAULT_DETECTED' ? <Ghost className="text-red-500" size={16} /> :
                         ev.type === 'STRATEGY_APPLIED' ? <Brain className="text-purple-500" size={16} /> :
                         ev.type === 'REASSIGNMENT_COMPLETE' ? <CheckCircle className="text-emerald-500" size={16} /> :
                         <Activity className="text-slate-500" size={16} />}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <span className={`text-[10px] font-black uppercase tracking-widest ${
                            ev.type === 'HEARTBEAT_TIMEOUT' || ev.type === 'FAULT_DETECTED' ? 'text-red-400' :
                            ev.type === 'REASSIGNMENT_COMPLETE' ? 'text-emerald-400' : 
                            ev.type === 'STRATEGY_APPLIED' ? 'text-purple-400' : 'text-blue-400'
                          }`}>
                            {ev.type.replace(/_/g, ' ')}
                          </span>
                          <span className="text-[10px] text-slate-600 font-mono">[{ev.timestamp}]</span>
                        </div>
                        <p className="text-[11px] text-slate-300 mt-2 leading-relaxed opacity-90">{ev.details}</p>
                        <div className="mt-2 flex items-center gap-2">
                           <span className="text-[9px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-500 font-mono">{ev.targetAgentId}</span>
                           <ArrowRight size={10} className="text-slate-700" />
                           <span className="text-[9px] text-slate-600 uppercase font-black tracking-widest">Resilience Pivot</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <div>
                   <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-4">Task Allocation Matrix</h5>
                   <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
                      {tasks.map((task) => (
                        <div key={task.id} className="flex items-center justify-between p-3 bg-slate-900/50 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                          <div>
                            <div className="text-[11px] font-bold text-white mb-1">{task.label}</div>
                            <div className="flex items-center gap-2">
                               <span className="text-[9px] font-mono text-slate-500">{task.id}</span>
                               <span className="text-slate-700">•</span>
                               <span className={`text-[9px] font-black uppercase tracking-tighter ${
                                 task.priority === 'high' ? 'text-red-400' : 'text-blue-400'
                               }`}>{task.priority}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                             <div className="text-right">
                               <div className="text-[8px] text-slate-600 uppercase font-black tracking-widest mb-0.5">Executor</div>
                               <div className="text-[10px] font-mono text-blue-400 font-bold">{task.assignedTo}</div>
                             </div>
                             <div className="w-8 h-8 rounded-lg bg-blue-600/10 flex items-center justify-center border border-blue-500/20 text-blue-500">
                               <Users size={16} />
                             </div>
                          </div>
                        </div>
                      ))}
                   </div>
                </div>

                <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 flex flex-col">
                   <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
                     <TrendingUp size={12} /> Optimization Efficiency
                   </h5>
                   <div className="flex-1 flex justify-around items-end gap-2 mb-4 h-24">
                      {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex-1 bg-slate-800 rounded-t-lg relative group">
                          <div 
                            className={`absolute bottom-0 w-full rounded-t-lg transition-all duration-700 ${isAIThinking ? 'bg-purple-500/60' : 'bg-blue-500/60 group-hover:bg-blue-400'}`} 
                            style={{ height: `${20 + Math.random() * 80}%` }}
                          ></div>
                        </div>
                      ))}
                   </div>
                   <div className="text-[9px] text-slate-600 text-center uppercase tracking-[0.2em] font-black">Autonomous Recovery Speed (12h)</div>
                </div>
              </div>
            </div>
            
            <div className="mt-auto p-6 bg-slate-950/80 border-t border-slate-800 flex justify-around shadow-inner backdrop-blur-sm">
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-bold uppercase mb-1 tracking-widest opacity-80">Autonomous Fixes</div>
                <div className="text-2xl font-black text-emerald-500 text-glow">{events.filter(e => e.type === 'REASSIGNMENT_COMPLETE').length}</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-bold uppercase mb-1 tracking-widest opacity-80">Orphaned Tasks</div>
                <div className="text-2xl font-black text-blue-500 text-glow">0</div>
              </div>
              <div className="text-center">
                <div className="text-[10px] text-slate-500 font-bold uppercase mb-1 tracking-widest opacity-80">Swarm Uptime</div>
                <div className="text-2xl font-black text-white text-glow">{globalEmergencyStop ? '0.00%' : '99.99%'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResilienceEngine;
