
import React, { useState } from 'react';
import { MOCK_PROMPTS } from '../store';
// Added RefreshCw to imports
import { FileCode, Save, History, ChevronRight, Hash, Play, Code, Rocket, CheckCircle, Edit3, RefreshCw } from 'lucide-react';
import { Prompt } from '../types';

const PromptLab: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt>(MOCK_PROMPTS[0]);
  const [content, setContent] = useState(`## System Instruction\nYou are an Elite Safety Inspector agent. Your goal is to analyze construction site images for OSHA violations.\n\n## Constraints\n- Focus on scaffolding and fall protection.\n- Provide specific violation codes.\n- Output in structured JSON.`);
  const [isPublishing, setIsPublishing] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setSelectedPrompt({
        ...selectedPrompt,
        liveVersion: selectedPrompt.draftVersion || selectedPrompt.liveVersion,
        draftVersion: undefined,
        hasUnpublishedChanges: false
      });
      setIsPublishing(false);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex gap-6 overflow-hidden animate-in fade-in duration-500">
      {/* List */}
      <div className="w-80 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
          <h3 className="font-bold text-white text-sm uppercase tracking-wider">Prompt Library</h3>
          <button className="text-blue-500 hover:text-blue-400 text-xs font-bold">+ NEW</button>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {MOCK_PROMPTS.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPrompt(p)}
              className={`w-full flex items-center justify-between p-3 rounded-xl transition-all relative ${
                selectedPrompt.id === p.id 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3 text-left">
                <div className="relative">
                  <FileCode size={18} />
                  {p.hasUnpublishedChanges && (
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full border border-slate-900"></span>
                  )}
                </div>
                <div>
                  <div className="font-semibold text-xs leading-none flex items-center gap-2">
                    {p.slug}
                  </div>
                  <div className={`text-[10px] mt-1 flex items-center gap-2 ${selectedPrompt.id === p.id ? 'text-blue-100' : 'text-slate-500'}`}>
                    <span>{p.liveVersion}</span>
                    {p.hasUnpublishedChanges && (
                      <span className="px-1.5 py-0.5 rounded-sm bg-amber-500/20 text-amber-500 font-bold border border-amber-500/30 text-[8px] uppercase">Draft</span>
                    )}
                  </div>
                </div>
              </div>
              <ChevronRight size={14} className={selectedPrompt.id === p.id ? 'opacity-100' : 'opacity-0'} />
            </button>
          ))}
        </div>
      </div>

      {/* Editor Area */}
      <div className="flex-1 flex flex-col bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="bg-slate-950 p-4 border-b border-slate-800 flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg">
              <Hash size={14} className="text-slate-500" />
              <span className="text-xs font-mono text-slate-300 font-bold">{selectedPrompt.slug}</span>
            </div>
            
            <div className="flex items-center gap-3 h-8 px-1 bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
               <div className={`px-2 py-1 flex items-center gap-1.5 rounded-md ${!selectedPrompt.hasUnpublishedChanges ? 'bg-slate-800 text-white ring-1 ring-slate-700' : 'text-slate-500'}`}>
                 <CheckCircle size={12} className={!selectedPrompt.hasUnpublishedChanges ? 'text-emerald-500' : ''} />
                 <span className="text-[10px] font-bold uppercase tracking-tight">Live: {selectedPrompt.liveVersion}</span>
               </div>
               {selectedPrompt.hasUnpublishedChanges && (
                 <div className="px-2 py-1 flex items-center gap-1.5 rounded-md bg-amber-500/10 text-amber-500 ring-1 ring-amber-500/40">
                   <Edit3 size={12} />
                   <span className="text-[10px] font-bold uppercase tracking-tight">Draft: {selectedPrompt.draftVersion}</span>
                 </div>
               )}
            </div>
          </div>
          <div className="flex gap-2">
            <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 border border-slate-700">
              <History size={14} /> Diff
            </button>
            
            {selectedPrompt.hasUnpublishedChanges && (
              <button 
                onClick={handlePublish}
                disabled={isPublishing}
                className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20 hover:bg-emerald-500 transition-all disabled:opacity-50"
              >
                {isPublishing ? (
                  <RefreshCw size={14} className="animate-spin" />
                ) : (
                  <Rocket size={14} />
                )}
                Publish Draft
              </button>
            )}

            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/20">
              <Save size={14} /> Save Draft
            </button>
          </div>
        </div>
        
        <div className="flex-1 relative">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full h-full bg-slate-900 p-8 font-mono text-sm text-slate-300 outline-none resize-none selection:bg-blue-500/30"
            spellCheck={false}
          />
          <div className="absolute top-4 right-4 space-y-2">
            <div className="bg-slate-950/80 backdrop-blur p-4 rounded-xl border border-slate-800 w-64 shadow-2xl">
              <h5 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Variables</h5>
              <div className="space-y-2">
                {['SITE_NAME', 'IMAGE_URL', 'OSHA_DB'].map(v => (
                  <div key={v} className="flex items-center justify-between text-[11px] bg-slate-900 p-2 rounded-lg border border-slate-800">
                    <code className="text-blue-400">{`{{${v}}}`}</code>
                    <button className="text-slate-600 hover:text-white"><Code size={12} /></button>
                  </div>
                ))}
              </div>
            </div>
            <button className="w-full bg-emerald-600/10 hover:bg-emerald-600/20 text-emerald-500 p-3 rounded-xl border border-emerald-500/20 text-xs font-bold flex items-center justify-center gap-2 transition-all">
              <Play size={14} /> Run Simulation
            </button>
          </div>
        </div>

        <div className="p-3 bg-slate-950 border-t border-slate-800 flex justify-between items-center text-[10px] text-slate-500">
          <div className="flex gap-4">
            <span>Lines: {content.split('\n').length}</span>
            <span>Words: {content.split(' ').length}</span>
            {selectedPrompt.hasUnpublishedChanges && (
              <span className="text-amber-500 font-bold">• You have unpublished changes</span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>Cloud Synchronized</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromptLab;
