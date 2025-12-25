
import React, { useState } from 'react';
import { Cpu, Users, Layers, Activity, AlertCircle, ShieldCheck, Mail, Smartphone, RefreshCw } from 'lucide-react';
import StatCard from '../components/StatCard';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const data = [
  { name: '08:00', load: 40 },
  { name: '10:00', load: 60 },
  { name: '12:00', load: 85 },
  { name: '14:00', load: 70 },
  { name: '16:00', load: 95 },
  { name: '18:00', load: 50 },
];

const activityData = [
  { day: 'Mon', tasks: 120 },
  { day: 'Tue', tasks: 150 },
  { day: 'Wed', tasks: 180 },
  { day: 'Thu', tasks: 110 },
  { day: 'Fri', tasks: 220 },
  { day: 'Sat', tasks: 90 },
  { day: 'Sun', tasks: 60 },
];

const Dashboard: React.FC = () => {
  const [notifEnabled, setNotifEnabled] = useState({ email: true, sms: false });

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Command Center</h2>
          <p className="text-slate-400 text-sm mt-1">Real-time health monitoring of the swarm.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-700 transition-colors border border-slate-700">
            Export Logs
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition-colors shadow-lg shadow-red-500/20">
            Global Kill Switch
          </button>
        </div>
      </header>

      {/* Resilience Alert Bar */}
      <div className="bg-blue-600/10 border border-blue-500/20 p-4 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <ShieldCheck size={18} className="text-white" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white leading-none">Agentic Resilience Active</h4>
            <p className="text-xs text-blue-400 mt-1">The "Never-Stop" engine is monitoring heartbeats across 50 nodes.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
           <div className="text-right">
            <span className="text-[10px] text-blue-400 uppercase tracking-widest font-bold">Orphaned Tasks Recovered</span>
            <div className="text-xl font-bold text-white">12</div>
          </div>
          <button className="bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-bold py-2 px-3 rounded-lg flex items-center gap-2 transition-all">
            <RefreshCw size={12} /> RE-SYNC HEARTBEATS
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Active Orchestrators" value="4 / 5" trend="Live" isTrendUp={true} icon={<Cpu size={20} />} />
        <StatCard label="Swarm Capacity" value="50 Nodes" trend="Peak" isTrendUp={true} icon={<Users size={20} />} />
        <StatCard label="Running Workflows" value="12" trend="+3" isTrendUp={true} icon={<Layers size={20} />} />
        <StatCard label="Alerts (24h)" value="0" trend="Clear" isTrendUp={true} icon={<AlertCircle size={20} />} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl lg:col-span-2">
          <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
            <Activity size={18} className="text-blue-500" />
            System Load Distribution
          </h4>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorLoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="load" stroke="#3b82f6" fillOpacity={1} fill="url(#colorLoad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Agentic Notification Settings */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h4 className="text-white font-semibold mb-6 flex items-center gap-2">
            <AlertCircle size={18} className="text-amber-500" />
            Agentic Notifications
          </h4>
          <p className="text-xs text-slate-400 mb-6 italic leading-relaxed">
            Configure how the Agentic AI communicates critical workflow updates and auto-recovery reports.
          </p>
          <div className="space-y-4">
            <div className={`p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${notifEnabled.email ? 'bg-blue-600/5 border-blue-500/40' : 'bg-slate-950 border-slate-800 opacity-60'}`}
                 onClick={() => setNotifEnabled(prev => ({ ...prev, email: !prev.email }))}>
              <div className="flex items-center gap-3">
                <Mail size={18} className={notifEnabled.email ? 'text-blue-400' : 'text-slate-500'} />
                <span className={`text-sm font-medium ${notifEnabled.email ? 'text-white' : 'text-slate-500'}`}>Email Updates</span>
              </div>
              <div className={`w-8 h-4 rounded-full relative transition-all ${notifEnabled.email ? 'bg-blue-600' : 'bg-slate-700'}`}>
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${notifEnabled.email ? 'right-0.5' : 'left-0.5'}`} />
              </div>
            </div>

            <div className={`p-4 rounded-xl border transition-all flex items-center justify-between cursor-pointer ${notifEnabled.sms ? 'bg-blue-600/5 border-blue-500/40' : 'bg-slate-950 border-slate-800 opacity-60'}`}
                 onClick={() => setNotifEnabled(prev => ({ ...prev, sms: !prev.sms }))}>
              <div className="flex items-center gap-3">
                <Smartphone size={18} className={notifEnabled.sms ? 'text-blue-400' : 'text-slate-500'} />
                <span className={`text-sm font-medium ${notifEnabled.sms ? 'text-white' : 'text-slate-500'}`}>SMS Notifications</span>
              </div>
              <div className={`w-8 h-4 rounded-full relative transition-all ${notifEnabled.sms ? 'bg-blue-600' : 'bg-slate-700'}`}>
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${notifEnabled.sms ? 'right-0.5' : 'left-0.5'}`} />
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800">
               <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mb-3">Recent Agent Updates</div>
               <div className="space-y-3">
                 <div className="text-[11px] text-slate-400 border-l-2 border-emerald-500 pl-3 py-1">
                   <span className="text-emerald-500 font-bold">RECOVERED:</span> Workflow #run-3 step re-assigned to agent-22.
                 </div>
                 <div className="text-[11px] text-slate-400 border-l-2 border-blue-500 pl-3 py-1">
                   <span className="text-blue-500 font-bold">INFO:</span> Prompt v15 draft passed 98% of safety tests.
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
