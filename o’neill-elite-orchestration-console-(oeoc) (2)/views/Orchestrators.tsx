
import React, { useState, useEffect } from 'react';
import { MOCK_ORCHESTRATORS, MOCK_AGENTS } from '../store';
import StatusBadge from '../components/StatusBadge';
import { Cpu, RefreshCcw, PowerOff, ShieldCheck, ShieldAlert, Activity, Heart, Terminal, Search, ArrowRight, Gauge, Database, Clock, AlertCircle } from 'lucide-react';
import { EntityStatus } from '../types';

interface PollLog {
  id: string;
  timestamp: string;
  agentId: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILURE';
  latency: number;
  endpoint: string;
  metrics: {
    cpu: string;
    ram: string;
    uptime: string;
    errorRate: string;
  };
}

const Orchestrators: React.FC = () => {
  const [pollLogs, setPollLogs] = useState<PollLog[]>([]);

  // Simulate real-time polling logs from /api/v1/diagnostics
  useEffect(() => {
    const interval = setInterval(() => {
      const randomAgent = MOCK_AGENTS[Math.floor(Math.random() * MOCK_AGENTS.length)];
      const newLog: PollLog = {
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
        agentId: randomAgent.id,
        status: randomAgent.status === EntityStatus.ERROR ? 'FAILURE' : (randomAgent.status === EntityStatus.DEGRADED ? 'WARNING' : 'SUCCESS'),
        latency: Math.floor(Math.random() * 150) + (randomAgent.status === EntityStatus.DEGRADED ? 400 : 20),
        endpoint: `/api/v1/diagnostics`,
        metrics: {
          cpu: `${randomAgent.metrics.cpuUsage.toFixed(1)}%`,
          ram: `${randomAgent.metrics.memoryUsage.toFixed(1)}%`,
          uptime: `${Math.floor(randomAgent.metrics.uptime / 3600)}h ${Math.floor((randomAgent.metrics.uptime % 3600) / 60)}m`,
          errorRate: `${randomAgent.metrics.errorRate.toFixed(3)}%`
        }
      };
      setPollLogs(prev => [newLog, ...prev].slice(0, 10));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex justify-between items-end">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Orchestrators</h2>
          <p className="text-slate-400 text-sm mt-1">Manage high-level brain instances and their proactive diagnostic polling loops.</p>
        </div>
        <div className="flex gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 bg-slate-900 px-4 py-2 rounded-xl border border-slate-800 shadow-inner">
          <span className="text-blue-500">Standard API Interface:</span> /api/v1/diagnostics
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {MOCK_ORCHESTRATORS.map((orc) => (
          <div key={orc.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-all flex flex-col justify-between group shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity pointer-events-none">
              <Cpu size={120} />
            </div>
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div className="bg-blue-600/10 p-3 rounded-2xl border border-blue-500/20 text-blue-500 group-hover:scale-110 transition-transform shadow-lg">
                  <Cpu size={24} />
                </div>
                <div className="flex flex-col items-end gap-2">
                  <StatusBadge status={orc.status} />
                  {orc.autoRecoveryEnabled ? (
                    <span className="text-[9px] text-emerald-500 font-black uppercase tracking-widest flex items-center gap-1.5 bg-emerald-500/5 px-2.5 py-1 rounded-lg border border-emerald-500/20 shadow-sm">
                      <ShieldCheck size={10} /> Resilience Active
                    </span>
                  ) : (
                    <span className="text-[9px] text-slate-500 font-black uppercase tracking-widest flex items-center gap-1.5 bg-slate-800 px-2.5 py-1 rounded-lg border border-slate-700 shadow-sm">
                      <ShieldAlert size={10} /> Resilience Disabled
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-black text-white mb-1 uppercase tracking-tight">{orc.name}</h3>
              <p className="text-[10px] text-slate-500 font-mono mb-6 bg-slate-950/50 inline-block px-2 py-0.5 rounded border border-slate-800">{orc.id}</p>
              
              <div className="space-y-4">
                <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-800 shadow-inner">
                  <div className="flex justify-between items-center text-[10px] mb-4 font-black uppercase tracking-[0.2em]">
                    <span className="text-slate-500 flex items-center gap-2"><Activity size={12} className="text-blue-500" /> Endpoint Polling</span>
                    <span className="text-emerald-500 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                      Active
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                       <span className="text-[9px] text-slate-500 uppercase font-black block mb-1.5 tracking-widest text-center">GET Calls</span>
                       <span className="text-sm font-mono text-white font-bold text-center block">1,242 / hr</span>
                    </div>
                    <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 hover:border-slate-700 transition-colors">
                       <span className="text-[9px] text-slate-500 uppercase font-black block mb-1.5 tracking-widest text-center">API Faults</span>
                       <span className="text-sm font-mono text-amber-500 font-bold text-center block">0</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between p-3 bg-slate-950/30 rounded-xl border border-slate-800/50">
                    <span className="text-[10px] text-slate-400 uppercase tracking-widest font-black">Autonomous Mesh Scan</span>
                    <div className={`w-9 h-5 rounded-full relative transition-all cursor-pointer ${orc.autoRecoveryEnabled ? 'bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.4)]' : 'bg-slate-700'}`}>
                      <div className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all ${orc.autoRecoveryEnabled ? 'right-1' : 'left-1'}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 flex gap-3 relative z-10">
              <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-200 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-slate-700 transition-all active:scale-95">
                <RefreshCcw size={14} /> RESTART POLLER
              </button>
              <button className="flex-1 bg-red-600/10 hover:bg-red-600/20 text-red-500 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 border border-red-500/20 transition-all active:scale-95">
                <PowerOff size={14} /> SYSTEM KILL
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-slate-950 p-6 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500/10 p-2 rounded-lg text-emerald-500 border border-emerald-500/20">
              <Terminal size={18} />
            </div>
            <div>
              <h4 className="text-sm font-black text-white uppercase tracking-widest">Global Proactive Diagnostic Feed</h4>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-0.5">Streaming telemetry from Agent /api/v1/diagnostics REST endpoints</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right">
                <span className="text-[9px] text-slate-500 uppercase font-black tracking-widest block">Mesh Status</span>
                <span className="text-xs font-mono text-emerald-500 font-black tracking-tighter">SECURE</span>
             </div>
             <button className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white hover:border-slate-700 transition-all shadow-lg">
               <Search size={16} />
             </button>
          </div>
        </div>
        <div className="p-2 overflow-x-auto min-h-[400px]">
          <table className="w-full text-left border-separate border-spacing-y-2 px-2">
            <thead>
              <tr className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">
                <th className="px-6 py-2">Timestamp</th>
                <th className="px-6 py-2">Source Node</th>
                <th className="px-6 py-2">Metrics Body</th>
                <th className="px-6 py-2">Error Rate</th>
                <th className="px-6 py-2">Uptime</th>
                <th className="px-6 py-2">RTT</th>
                <th className="px-6 py-2 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="font-mono text-[11px]">
              {pollLogs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-20 text-slate-600 animate-pulse italic">Awaiting first proactive signal...</td>
                </tr>
              ) : (
                pollLogs.map(log => (
                  <tr key={log.id} className="bg-slate-950/40 hover:bg-slate-800/40 transition-all rounded-xl border border-slate-800 group">
                    <td className="px-6 py-4 text-slate-500 rounded-l-xl">[{log.timestamp}]</td>
                    <td className="px-6 py-4">
                      <span className="text-slate-300 font-bold group-hover:text-blue-400 transition-colors flex items-center gap-2">
                        {log.agentId} <ArrowRight size={10} className="text-slate-700" />
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-blue-400 font-black text-[10px]">
                          <Gauge size={10} /> CPU: {log.metrics.cpu}
                        </span>
                        <span className="flex items-center gap-1 text-purple-400 font-black text-[10px]">
                          <Database size={10} /> RAM: {log.metrics.ram}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-slate-400 font-bold">
                        <AlertCircle size={10} className={parseFloat(log.metrics.errorRate) > 0.5 ? 'text-amber-500' : 'text-slate-600'} />
                        {log.metrics.errorRate}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Clock size={10} className="text-slate-600" />
                        {log.metrics.uptime}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`font-black ${log.latency > 300 ? 'text-amber-500' : 'text-slate-400'}`}>
                        {log.latency}ms
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right rounded-r-xl">
                      <span className={`px-2 py-1 rounded-md text-[9px] font-black border uppercase tracking-widest ${
                        log.status === 'SUCCESS' ? 'text-emerald-500 bg-emerald-500/5 border-emerald-500/20' :
                        log.status === 'WARNING' ? 'text-amber-500 bg-amber-500/5 border-amber-500/20' :
                        'text-red-500 bg-red-500/5 border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
                      }`}>
                        {log.status === 'SUCCESS' ? 'OK 200' : log.status === 'WARNING' ? 'DEGRADED 200' : 'ERROR 500'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orchestrators;
