
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './views/Dashboard';
import Orchestrators from './views/Orchestrators';
import Swarm from './views/Swarm';
import Workflows from './views/Workflows';
import Executions from './views/Executions';
import PromptLab from './views/PromptLab';
import AuditVault from './views/AuditVault';
import ResilienceEngine from './views/ResilienceEngine';
import Settings from './views/Settings';
import { Bell, Search, ShieldCheck, Cpu, Brain } from 'lucide-react';
import { ResilienceProvider, useResilience } from './contexts/ResilienceContext';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { isAIThinking } = useResilience();

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard />;
      case 'orchestrators': return <Orchestrators />;
      case 'swarm': return <Swarm />;
      case 'workflows': return <Workflows />;
      case 'executions': return <Executions />;
      case 'prompts': return <PromptLab />;
      case 'audit': return <AuditVault />;
      case 'resilience': return <ResilienceEngine />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Global Header */}
        <header className="h-16 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-8 sticky top-0 z-40 backdrop-blur-md bg-opacity-80">
          <div className="flex items-center gap-4 bg-slate-900 px-4 py-1.5 rounded-xl border border-slate-800 w-96 shadow-inner">
            <Search size={16} className="text-slate-500" />
            <input 
              type="text" 
              placeholder="Query swarm telemetry..." 
              className="bg-transparent border-none outline-none text-sm text-slate-200 w-full placeholder:text-slate-600 font-medium"
            />
          </div>
          
          <div className="flex items-center gap-6">
            {isAIThinking && (
              <div className="flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 rounded-full animate-pulse">
                <Brain size={14} className="text-purple-400" />
                <span className="text-[10px] font-black text-purple-400 uppercase tracking-widest">AI Thinking...</span>
              </div>
            )}
            
            <div className="flex items-center gap-4 border-r border-slate-800 pr-6">
               <div className="flex flex-col items-end">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Resilience Manager</span>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="text-[11px] font-bold text-white uppercase tracking-tighter italic">NOMINAL</span>
                  </div>
               </div>
               <div className="bg-slate-900 p-2 rounded-lg border border-slate-800">
                  <ShieldCheck size={18} className="text-blue-500" />
               </div>
            </div>
            
            <button className="relative text-slate-400 hover:text-white transition-colors">
              <Bell size={20} />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-blue-500 rounded-full border-2 border-slate-950 shadow-lg shadow-blue-500/40"></span>
            </button>
            
            <button 
              onClick={() => setActiveTab('settings')}
              className="flex items-center gap-3 pl-2 group transition-all"
            >
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-slate-200 leading-none">Admin User</p>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-widest font-bold">Root Access</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center text-slate-400 group-hover:border-blue-500/50 transition-all overflow-hidden shadow-lg">
                <img src="https://picsum.photos/40/40" alt="Avatar" />
              </div>
            </button>
          </div>
        </header>

        {/* View Content */}
        <div className="flex-1 p-8 overflow-y-auto bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </div>
        
        {/* Footer Info */}
        <footer className="h-8 bg-slate-950 border-t border-slate-800 flex items-center justify-between px-8 text-[10px] text-slate-600 font-mono tracking-widest shrink-0">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
            OEOC CORE v4.0.0-PROD
          </div>
          <div className="flex gap-6 uppercase font-black">
            <span className="flex items-center gap-1.5"><Cpu size={12} className="text-blue-500" /> Latency: 42ms</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={12} className="text-emerald-500" /> Resilience: 100%</span>
            <span className="text-slate-800">|</span>
            <span>Swarms: Stable</span>
          </div>
        </footer>
      </main>
    </div>
  );
};

const App: React.FC = () => (
  <ResilienceProvider>
    <AppContent />
  </ResilienceProvider>
);

export default App;
