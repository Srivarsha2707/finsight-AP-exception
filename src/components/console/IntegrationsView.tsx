import React from 'react';
import { useApp } from '../../context/AppContext';
import { mockIntegrations } from '../../data/mockData';
import { 
  Network, 
  CheckCircle2, 
  RefreshCw, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';

export const IntegrationsView: React.FC = () => {
  const { addToast } = useApp();

  const handleTestConnection = (intName: string) => {
    addToast({
      type: 'success',
      title: 'Connection Healthy',
      message: `Latency test to ${intName} responded in 42ms with full read/write credentials.`
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Enterprise Connectors & Integrations
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Two-way continuous synchronization with enterprise ERP, procurement engines, and banking gateways.
        </p>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {mockIntegrations.map((item) => {
          const isConnected = item.status === 'Connected';
          return (
            <div
              key={item.id}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm hover:border-slate-700 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 font-mono font-extrabold text-indigo-400 flex items-center justify-center text-sm shadow-inner">
                    {item.logoBadge}
                  </div>
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${
                      isConnected
                        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
                        : 'bg-amber-500/10 text-amber-300 border-amber-500/30'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                  {item.category}
                </div>
                <h3 className="text-base font-bold text-white tracking-tight mt-0.5">
                  {item.name}
                </h3>

                <div className="mt-4 space-y-1 text-xs text-slate-400 font-mono">
                  <div>Sync Status: <span className="text-slate-200">{item.lastSync}</span></div>
                  <div>Throughput: <span className="text-cyan-400">{item.recordsSyncToday}</span></div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => handleTestConnection(item.name)}
                  className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>Test Health</span>
                </button>
                <span className="text-[11px] text-slate-500">API v2.4</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
