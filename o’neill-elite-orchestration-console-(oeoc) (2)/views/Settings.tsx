
import React, { useState } from 'react';
import { 
  Bell, 
  Mail, 
  Smartphone, 
  Shield, 
  Lock, 
  Globe, 
  Database, 
  Save,
  CheckCircle2,
  AlertTriangle,
  Info
} from 'lucide-react';
import { NotificationSettings } from '../types';

const Settings: React.FC = () => {
  const [notifSettings, setNotifSettings] = useState<NotificationSettings>({
    email: true,
    sms: false,
    alertThreshold: 'ERROR'
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 3000);
    }, 1200);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500 max-w-4xl mx-auto">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">System Settings</h2>
          <p className="text-slate-400 text-sm mt-1">Configure your orchestration console and resilience alerts.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2.5 rounded-xl text-sm font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-blue-500/20 active:scale-95 disabled:opacity-50"
        >
          {isSaving ? <Globe className="animate-spin" size={16} /> : <Save size={16} />}
          {isSaving ? 'Saving Changes...' : 'Save Configuration'}
        </button>
      </header>

      {showSavedToast && (
        <div className="fixed bottom-12 right-12 bg-emerald-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right-10 duration-300 z-50 border border-emerald-400/20">
          <CheckCircle2 size={24} />
          <div>
            <p className="font-bold text-sm">Settings Synchronized</p>
            <p className="text-[11px] opacity-80">All notification channels updated successfully.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        {/* Notification Panel */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="bg-slate-950 p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="bg-blue-600/10 p-2 rounded-lg text-blue-500">
              <Bell size={20} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-none">Resilience Notifications</h3>
              <p className="text-slate-500 text-xs mt-1">Manage how you receive critical swarm recovery alerts.</p>
            </div>
          </div>
          
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Email Toggle */}
              <div className="flex items-start justify-between p-6 bg-slate-950 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors group">
                <div className="flex gap-4">
                  <div className={`p-3 rounded-xl transition-colors ${notifSettings.email ? 'bg-blue-600/10 text-blue-500' : 'bg-slate-900 text-slate-600'}`}>
                    <Mail size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">Email Notifications</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Receive daily resilience summaries and instant critical fault reports.</p>
                  </div>
                </div>
                <div 
                  onClick={() => setNotifSettings(prev => ({ ...prev, email: !prev.email }))}
                  className={`w-12 h-6 rounded-full relative transition-all cursor-pointer ${notifSettings.email ? 'bg-blue-600' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifSettings.email ? 'right-1' : 'left-1'}`} />
                </div>
              </div>

              {/* SMS Toggle */}
              <div className="flex items-start justify-between p-6 bg-slate-950 rounded-2xl border border-slate-800 hover:border-slate-700 transition-colors group">
                <div className="flex gap-4">
                  <div className={`p-3 rounded-xl transition-colors ${notifSettings.sms ? 'bg-blue-600/10 text-blue-500' : 'bg-slate-900 text-slate-600'}`}>
                    <Smartphone size={24} />
                  </div>
                  <div>
                    <h4 className="text-white font-bold">SMS Critical Alerts</h4>
                    <p className="text-xs text-slate-500 mt-1 max-w-[200px]">Instant text alerts for system-wide failures or global kill-switch triggers.</p>
                  </div>
                </div>
                <div 
                  onClick={() => setNotifSettings(prev => ({ ...prev, sms: !prev.sms }))}
                  className={`w-12 h-6 rounded-full relative transition-all cursor-pointer ${notifSettings.sms ? 'bg-blue-600' : 'bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${notifSettings.sms ? 'right-1' : 'left-1'}`} />
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-800">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="flex-1">
                  <h4 className="text-white font-bold mb-2 flex items-center gap-2 text-sm uppercase tracking-widest">
                    Alert Threshold
                    <span className="text-blue-500"><Shield size={14} /></span>
                  </h4>
                  <p className="text-xs text-slate-500 mb-6 leading-relaxed">
                    Define which events trigger a notification. "Critical Only" filters out routine autonomous recoveries.
                  </p>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={() => setNotifSettings(prev => ({ ...prev, alertThreshold: 'ERROR' }))}
                      className={`flex-1 py-4 px-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
                        notifSettings.alertThreshold === 'ERROR' 
                          ? 'border-blue-500 bg-blue-500/5' 
                          : 'border-slate-800 hover:border-slate-700 bg-slate-950'
                      }`}
                    >
                      <AlertTriangle size={20} className={notifSettings.alertThreshold === 'ERROR' ? 'text-blue-500' : 'text-slate-600'} />
                      <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${notifSettings.alertThreshold === 'ERROR' ? 'text-white' : 'text-slate-500'}`}>
                        Critical Only
                      </span>
                      <span className="text-[9px] text-slate-600 text-center font-bold">Errors & Global Failures</span>
                    </button>
                    
                    <button 
                      onClick={() => setNotifSettings(prev => ({ ...prev, alertThreshold: 'ALL' }))}
                      className={`flex-1 py-4 px-6 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
                        notifSettings.alertThreshold === 'ALL' 
                          ? 'border-blue-500 bg-blue-500/5' 
                          : 'border-slate-800 hover:border-slate-700 bg-slate-950'
                      }`}
                    >
                      <Info size={20} className={notifSettings.alertThreshold === 'ALL' ? 'text-blue-500' : 'text-slate-600'} />
                      <span className={`text-[11px] font-black uppercase tracking-[0.2em] ${notifSettings.alertThreshold === 'ALL' ? 'text-white' : 'text-slate-500'}`}>
                        All Events
                      </span>
                      <span className="text-[9px] text-slate-600 text-center font-bold">Includes Proactive Throttling</span>
                    </button>
                  </div>
                </div>

                <div className="md:w-72 bg-slate-950/50 p-6 rounded-2xl border border-slate-800 flex flex-col justify-center">
                   <div className="text-[10px] text-slate-600 font-black uppercase tracking-[0.3em] mb-4 text-center">Audience Distribution</div>
                   <div className="space-y-4">
                     <div className="flex justify-between items-center text-xs">
                       <span className="text-slate-500">Admin Persona</span>
                       <span className="text-emerald-500 font-bold">Full Access</span>
                     </div>
                     <div className="flex justify-between items-center text-xs">
                       <span className="text-slate-500">Operator Hub</span>
                       <span className="text-blue-500 font-bold">Filter Active</span>
                     </div>
                     <div className="flex justify-between items-center text-xs">
                       <span className="text-slate-500">Executive View</span>
                       <span className="text-slate-600 font-bold">Reports Only</span>
                     </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security & Access Panel */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="bg-slate-950 p-6 border-b border-slate-800 flex items-center gap-3">
            <div className="bg-purple-600/10 p-2 rounded-lg text-purple-500">
              <Lock size={20} />
            </div>
            <div>
              <h3 className="text-white font-bold text-lg leading-none">Security & Access Control</h3>
              <p className="text-slate-500 text-xs mt-1">Manage API integrations and RBAC policies.</p>
            </div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800">
               <div className="flex items-center justify-between mb-4">
                 <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest">API Endpoint Sync</h5>
                 <Database size={14} className="text-slate-600" />
               </div>
               <div className="flex items-center gap-2 text-sm text-slate-200 bg-slate-900 p-3 rounded-lg border border-slate-800 font-mono text-[11px]">
                 https://api.oneill-elite.com/v1/sync
               </div>
            </div>
            <div className="p-5 bg-slate-950 rounded-2xl border border-slate-800">
               <div className="flex items-center justify-between mb-4">
                 <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest">Persistence Policy</h5>
                 <Shield size={14} className="text-slate-600" />
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-xs text-slate-500 font-bold">Audit Retention</span>
                 <span className="text-xs text-white font-black">90 DAYS</span>
               </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Settings;
