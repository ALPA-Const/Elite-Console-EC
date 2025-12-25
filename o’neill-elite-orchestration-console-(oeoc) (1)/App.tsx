
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import Orchestrators from './views/Orchestrators';
import Swarm from './views/Swarm';
import Workflows from './views/Workflows';
import Executions from './views/Executions';
import PromptLab from './views/PromptLab';
import AuditVault from './views/AuditVault';
import { Bell, Search, User } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'orchestrators': return <Orchestrators />;
      case 'swarm': return <Swarm />;
      case 'workflows': return <Workflows />;
      case 'executions': return <Executions />;
      case 'prompts': return <PromptLab />;
      case 'audit': return <AuditVault />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col">
        {/* Global Header */}
        <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-md bg-opacity-80">
          <div className="flex items-center gap-4 bg-slate-900 px-4 py-1.5 rounded-lg border border-slate-800 w-96">
            <Search size={16} className="text-slate-500" />
            <input 
              type="text" 
              placeholder="Query swarm telemetry..." 
              className="bg-transparent border-none outline-none text-sm text-slate-200 w-full placeholder:text-slate-600"
            />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Live: Production</span>
            </div>
            
            <div className="h-6 w-[1px] bg-slate-800"></div>
            
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
            </button>
            
            <button className="flex items-center gap-3 pl-4 border-l border-slate-800 group">
              <div className="text-right">
                <p className="text-xs font-bold text-slate-200 leading-none">Admin User</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Root Access</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:border-slate-500 transition-all overflow-hidden">
                <img src="https://picsum.photos/40/40" alt="Avatar" />
              </div>
            </button>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 p-8 overflow-y-auto">
          {renderContent()}
        </div>
        
        {/* Footer Info */}
        <footer className="h-8 bg-slate-950 border-t border-slate-800 flex items-center justify-between px-8 text-[10px] text-slate-600 font-mono">
          <div>O’Neill Elite Orchestration Console v4.0.0-build.829</div>
          <div className="flex gap-4">
            <span>Latency: 42ms</span>
            <span>API: Healthy</span>
            <span>Swarms: Stable</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
