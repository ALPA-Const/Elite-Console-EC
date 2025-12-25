
import React, { useState } from 'react';
import { MOCK_PROMPTS } from '../store';
import { 
  FileCode, Save, History, ChevronRight, Hash, Play, 
  Code, Rocket, CheckCircle, Edit3, RefreshCw, AlertTriangle
} from 'lucide-react';
import { Prompt } from '../types';

const PromptLab: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt>(MOCK_PROMPTS[0]);
  const [content, setContent] = useState(`## System Instruction\nYou are an Elite Safety Inspector agent. Your goal is to analyze construction site images for OSHA violations.\n\n## Constraints\n- Focus on scaffolding and fall protection.\n- Provide specific violation codes.\n- Output in structured JSON.`);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    // Simulate API logic: Versioning move and Audit Log entry
    setTimeout(() => {
      setSelectedPrompt({
        ...selectedPrompt,
        liveVersion: selectedPrompt.draftVersion || selectedPrompt.liveVersion,
        draftVersion: undefined,
        hasUnpublishedChanges: false
      });
      setIsPublishing(false);
    }, 1800);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 overflow-hidden animate-in fade-in duration-500">
      {/* Sidebar List */}
      <div className="w-80 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-2xl">
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
          <h3 className="font-black text-white text-[10px] uppercase tracking-[0.2em]">Prompt Registry</h3>
          <button className="text-blue-500 hover:text-blue-400 text-xs font-black uppercase tracking-tighter transition-colors">+ NEW ENTRY</button>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {MOCK_PROMPTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPrompt(p)}
              className={`w-full flex items-center justify-between p-4 rounded-xl transition-all relative group ${
                selectedPrompt.id === p.id 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20' 
                  : 'text-slate-400 hover:bg-slate-800 border border-transparent hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3 text-left">
                <div className="relative">
                  <FileCode size={20} className={selectedPrompt.id === p.id ? 'text-white' : 'text-slate-600 group-hover:text-slate-400'} />
                  {p.hasUnpublishedChanges && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border-2 border-slate-900"></span>
                  )}
                </div>
                <div>
                  <div className="font-bold text-xs leading-none tracking-tight">{p.slug}</div>
                  <div className={`text-[9px] mt-1.5 flex items-center gap-2 font-mono ${selectedPrompt.id === p.id ? 'text-blue-100' : 'text-slate-500'}`}>
                    <span>LIVE: {p.liveVersion}</span>
                    {p.hasUnpublishedChanges && (
                      <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-500 font-black border border-amber-500/30 text-[8px] uppercase tracking-tighter">DRAFT</span>
                    )}
                  </div>
                </div>
              </div>
              <ChevronRight size={14} className={`transition-transform duration-300 ${selectedPrompt.id === p.id ? 'translate-x-0 opacity-100' : '-translate-x-2 opacity-0'}`} />
            </button>
          ))}
        </div>
      </div>

      {/* Editor Surface */}
      <div className="flex-1 flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        <div className="bg-slate-950 p-5 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-5">
             <div className="flex items-center gap-2.5 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl">
              <Hash size={14} className="text-blue-500" />
              <span className="text-xs font-mono text-slate-200 font-black tracking-tight">{selectedPrompt.slug}</span>
            </div>
            
            <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-inner">
               <div className={`px-3 py-1.5 flex items-center gap-2 rounded-lg transition-all ${!selectedPrompt.hasUnpublishedChanges ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'text-slate-600 grayscale opacity-40'}`}>
                 <CheckCircle size={12} className={!selectedPrompt.hasUnpublishedChanges ? 'text-emerald-400' : ''} />
                 <span className="text-[10px] font-black uppercase tracking-widest">LIVE {selectedPrompt.liveVersion}</span>
               </div>
               {selectedPrompt.hasUnpublishedChanges && (
                 <div className="px-3 py-1.5 flex items-center gap-2 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/40 animate-pulse">
                   <Edit3 size={12} />
                   <span className="text-[10px] font-black uppercase tracking-widest">DRAFT {selectedPrompt.draftVersion}</span>
                 </div>
               )}
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 border border-slate-700 transition-colors">
              <History size={14} /> DIFF VIEW
            </button>
            
            {selectedPrompt.hasUnpublishedChanges && (
              <button 
                onClick={handlePublish}
                disabled={isPublishing}
                className="bg-emerald-600 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-emerald-500/30 hover:bg-emerald-500 transition-all disabled:opacity-50 active:scale-95"
              >
                {isPublishing ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <Rocket size={14} />
                )}
                {isPublishing ? 'PUBLISHING...' : 'PUBLISH DRAFT'}
              </button>
            )}

            <button className="bg-blue-600 text-white px-5 py-2 rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-blue-500/30 hover:bg-blue-500 transition-all active:scale-95">
              <Save size={14} /> SAVE WORK
            </button>
          </div>
        </div>
        
        <div className="flex-1 relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full bg-slate-900 p-10 font-mono text-sm text-slate-300 outline-none resize-none selection:bg-blue-500/40 leading-relaxed"
            spellCheck={false}
          />
          <div className="absolute top-6 right-6 space-y-4">
            <div className="bg-slate-950/90 backdrop-blur-md p-5 rounded-2xl border border-slate-800 w-72 shadow-2xl">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Context Injectors</h5>
                <span className="bg-blue-500/10 text-blue-500 text-[8px] px-1.5 py-0.5 rounded font-black border border-blue-500/20">AUTO-DETECT</span>
              </div>
              <div className="space-y-2">
                {['SITE_NAME', 'IMAGE_URL', 'OSHA_DB_REF'].map(v => (
                  <div key={v} className="flex items-center justify-between text-[11px] bg-slate-900/50 p-2.5 rounded-lg border border-slate-800 hover:border-blue-500/30 transition-colors group">
                    <code className="text-blue-400 font-bold group-hover:text-blue-300 transition-colors">{`{{${v}}}`}</code>
                    <button className="text-slate-600 hover:text-white"><Code size={14} /></button>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-400 p-4 rounded-2xl border border-emerald-500/20 text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all shadow-lg active:scale-95 group">
              <div className="bg-emerald-500/20 p-1 rounded group-hover:bg-emerald-500 transition-colors">
                <Play size={14} className="group-hover:text-slate-950" fill="currentColor" />
              </div>
              SIMULATE AGENT RUN
            </button>
            {selectedPrompt.hasUnpublishedChanges && (
               <div className="bg-amber-600/10 border border-amber-500/20 p-4 rounded-2xl flex items-start gap-3">
                 <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
                 <p className="text-[10px] text-amber-200/70 leading-normal">
                   You are currently editing a <span className="text-amber-500 font-bold">Unpublished Draft</span>. Workflow execution will still use version <span className="underline">{selectedPrompt.liveVersion}</span> until published.
                 </p>
               </div>
            )}
          </div>
        </div>

        <div className="px-6 py-3 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          <div className="flex gap-6">
            <span>Lines: {content.split('\n').length}</span>
            <span>Tokens: ~{Math.round(content.length / 4)}</span>
            {selectedPrompt.hasUnpublishedChanges ? (
              <span className="text-amber-500 font-black animate-pulse">● UNSAVED DRAFT CHANGES</span>
            ) : (
              <span className="text-emerald-500">● STABLE STATE</span>
            )}
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/40"></span>
              <span>Sync Status: Nominal</span>
            </div>
            <span className="text-slate-800">|</span>
            <span>Region: US-East-1</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptLab;
