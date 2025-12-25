
import React from 'react';
import { MOCK_AUDITS } from '../store';
import { ShieldCheck, Search, Download } from 'lucide-react';

const AuditVault: React.FC = () => {
  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Audit Vault</h2>
          <p className="text-slate-400 text-sm mt-1">Immutable ledger of all state changes and system actions.</p>
        </div>
        <button className="bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 border border-slate-700">
          <Download size={16} /> Export CSV
        </button>
      </header>

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search by Entity ID, User, or Action..." 
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <select className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-white focus:outline-none outline-none">
            <option>All Entities</option>
            <option>Orchestrator</option>
            <option>Agent</option>
            <option>Prompt</option>
            <option>Workflow</option>
          </select>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-950 text-[10px] uppercase tracking-widest text-slate-500 font-bold">
              <th className="px-6 py-4 border-b border-slate-800">ID</th>
              <th className="px-6 py-4 border-b border-slate-800">Entity</th>
              <th className="px-6 py-4 border-b border-slate-800">Action</th>
              <th className="px-6 py-4 border-b border-slate-800">Actor</th>
              <th className="px-6 py-4 border-b border-slate-800">Timestamp</th>
              <th className="px-6 py-4 border-b border-slate-800 text-right">Details</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {MOCK_AUDITS.map((log) => (
              <tr key={log.id} className="hover:bg-slate-800/50 transition-colors group">
                <td className="px-6 py-4 text-[11px] font-mono text-slate-500">{log.id}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className="bg-slate-800 text-slate-300 px-2 py-0.5 rounded text-[10px] border border-slate-700">{log.entityType}</span>
                    <span className="text-xs font-mono text-slate-400">{log.entityId}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-slate-200 font-medium">{log.action}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs text-blue-400 font-bold">@{log.userId}</span>
                </td>
                <td className="px-6 py-4 text-xs text-slate-500">
                  {log.timestamp}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-slate-500 hover:text-white transition-colors">
                    <ShieldCheck size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="p-4 bg-slate-950 text-center border-t border-slate-800">
          <p className="text-[10px] text-slate-500 font-mono flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            Ledger Verified • SHA-256 Integrity Check Passed
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuditVault;
