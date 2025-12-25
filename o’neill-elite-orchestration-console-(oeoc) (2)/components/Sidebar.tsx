
import React from 'react';
import { 
  LayoutDashboard, 
  Cpu, 
  Users, 
  Layers, 
  PlayCircle, 
  FileCode, 
  ShieldCheck, 
  Zap,
  Activity,
  Settings
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
    { id: 'orchestrators', label: 'Orchestrators', icon: Cpu },
    { id: 'swarm', label: 'The Swarm', icon: Users },
    { id: 'resilience', label: 'Resilience Engine', icon: Activity },
    { id: 'workflows', label: 'Workflows', icon: Layers },
    { id: 'executions', label: 'Live Executions', icon: PlayCircle },
    { id: 'prompts', label: 'Prompt Lab', icon: FileCode },
    { id: 'audit', label: 'Audit Vault', icon: ShieldCheck },
    { id: 'settings', label: 'System Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-800 flex items-center gap-3">
        <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center shadow-lg shadow-blue-500/20">
          <Zap size={20} className="text-white fill-current" />
        </div>
        <div>
          <h1 className="font-bold text-lg tracking-tight leading-none">OEOC</h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">O'Neill Elite</p>
        </div>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group ${
                isActive 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800'
              }`}
            >
              <Icon size={18} className={isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'} />
              {item.label}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col gap-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">System Integrity</span>
            <span className="text-emerald-500 font-semibold">99.9%</span>
          </div>
          <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 w-[99.9%]"></div>
          </div>
          <p className="text-[10px] text-slate-500 mt-1 italic">Uptime Target: High-Resilience</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
