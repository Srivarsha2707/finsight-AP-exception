import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  History, 
  Cpu, 
  User, 
  Server, 
  Filter, 
  Search,
  CheckCircle2,
  FileText,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  UserCheck
} from 'lucide-react';

export const AuditLogView: React.FC = () => {
  const { auditLogs } = useApp();
  const [filterActor, setFilterActor] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredLogs = auditLogs.filter(log => {
    const matchesActor = filterActor === 'All' || log.actorType === filterActor;
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actorName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesActor && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Immutable Audit Trail & Governance
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Complete cryptographic audit log distinguishing AI recommendations, human authorizations, and final outcomes.
          </p>
        </div>

        <div className="flex items-center gap-1 p-1 bg-slate-800 rounded-xl border border-slate-700 text-xs self-start sm:self-auto overflow-x-auto">
          {['All', 'AI', 'Human', 'System'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterActor(type)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition-colors cursor-pointer ${
                filterActor === type ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* HINDSIGHT LEARNING & GOVERNANCE MODEL */}
      <div className="p-5 sm:p-6 rounded-2xl bg-slate-900 border border-indigo-500/30 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-3">
          <div className="text-[11px] font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Explainable Learning Loop: AI Suggests → Human Authorizes → Hindsight Learns</span>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1">
            <UserCheck className="w-3.5 h-3.5" />
            <span>Strict Human-in-the-Loop Enforced</span>
          </span>
        </div>

        {/* 6 Stage Loop */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
          {[
            { tag: 'AI', label: 'AI Recommendation', color: 'text-indigo-400 border-indigo-500/40 bg-indigo-950/60' },
            { tag: 'Human', label: 'Human Decision', color: 'text-emerald-400 border-emerald-500/40 bg-emerald-950/60' },
            { tag: 'ERP', label: 'Actual Resolution', color: 'text-slate-300 border-slate-700 bg-slate-950/80' },
            { tag: 'DB', label: 'Outcome Recorded', color: 'text-cyan-400 border-cyan-500/40 bg-cyan-950/60' },
            { tag: 'Memory', label: 'Hindsight Knowledge', color: 'text-violet-400 border-violet-500/40 bg-violet-950/60' },
            { tag: 'Future', label: 'Future Recommendations', color: 'text-teal-400 border-teal-500/40 bg-teal-950/60' }
          ].map((stage, idx, arr) => (
            <React.Fragment key={stage.label}>
              <div className={`p-3 rounded-xl border shrink-0 min-w-[145px] ${stage.color}`}>
                <div className="text-[10px] font-mono font-bold uppercase tracking-wider opacity-75">{stage.tag}</div>
                <div className="font-bold mt-0.5">{stage.label}</div>
              </div>
              {idx < arr.length - 1 && (
                <ArrowRight className="w-4 h-4 text-slate-500 shrink-0 mx-0.5" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Search Input */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search audit actions, invoice references, or actor names..."
            className="w-full pl-9 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* Vertical Timeline Card */}
      <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm">
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
          {filteredLogs.map((log) => {
            const actorBadges = {
              AI: {
                icon: Cpu,
                color: 'text-indigo-400 bg-indigo-950/80 border-indigo-500/40',
                dot: 'bg-indigo-500'
              },
              Human: {
                icon: User,
                color: 'text-emerald-400 bg-emerald-950/80 border-emerald-500/40',
                dot: 'bg-emerald-500'
              },
              System: {
                icon: Server,
                color: 'text-cyan-400 bg-cyan-950/80 border-cyan-500/40',
                dot: 'bg-cyan-500'
              }
            };

            const actorCfg = actorBadges[log.actorType] || actorBadges.AI;
            const ActorIcon = actorCfg.icon;

            return (
              <div key={log.id} className="relative group">
                {/* Timeline node circle */}
                <div className={`absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full ${actorCfg.dot} flex items-center justify-center text-slate-950 shadow-md ring-4 ring-slate-900`}>
                  <ActorIcon className="w-3.5 h-3.5" />
                </div>

                <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 hover:border-slate-700 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${actorCfg.color}`}>
                        {log.actorType} Action
                      </span>
                      <span className="font-semibold text-white">{log.actorName}</span>
                    </div>
                    <span className="text-slate-400 font-mono text-[11px]">{log.timestamp}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-100 mt-1">
                    {log.action}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                    {log.details}
                  </p>

                  {log.referenceId && (
                    <div className="mt-2 text-[11px] font-mono text-indigo-400">
                      Ref: #{log.referenceId}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
