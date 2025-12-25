
import React from 'react';
import { EntityStatus } from '../types';

interface StatusBadgeProps {
  status: EntityStatus;
  size?: 'sm' | 'md';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = 'md' }) => {
  const getColors = () => {
    switch (status) {
      case EntityStatus.IDLE: return 'bg-slate-800 text-slate-400 border-slate-700';
      case EntityStatus.BUSY:
      case EntityStatus.IN_PROGRESS: return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case EntityStatus.ERROR:
      case EntityStatus.FAILED: return 'bg-red-500/10 text-red-400 border-red-500/20';
      case EntityStatus.COMPLETED: return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case EntityStatus.PENDING:
      case EntityStatus.ASSIGNED:
      case EntityStatus.WAITING: return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case EntityStatus.DEGRADED: return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  const getDot = () => {
    switch (status) {
      case EntityStatus.BUSY:
      case EntityStatus.IN_PROGRESS: return 'bg-blue-400 animate-pulse';
      case EntityStatus.ERROR:
      case EntityStatus.FAILED: return 'bg-red-400';
      case EntityStatus.COMPLETED: return 'bg-emerald-400';
      case EntityStatus.IDLE: return 'bg-slate-500';
      case EntityStatus.DEGRADED: return 'bg-purple-400 animate-bounce';
      default: return 'bg-amber-400';
    }
  };

  return (
    <span className={`inline-flex items-center gap-1.5 border rounded-full font-semibold uppercase tracking-wider ${
      size === 'sm' ? 'px-2 py-0.5 text-[10px]' : 'px-3 py-1 text-[11px]'
    } ${getColors()}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${getDot()}`}></span>
      {status}
    </span>
  );
};

export default StatusBadge;
