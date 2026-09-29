import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Settings, 
  Users, 
  ShieldCheck, 
  Bell, 
  Cpu, 
  Lock, 
  Save 
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { addToast } = useApp();
  const [activeTab, setActiveTab] = useState<'users' | 'ai' | 'security'>('ai');
  const [minConfidence, setMinConfidence] = useState(85);
  const [allowAutoResolve, setAllowAutoResolve] = useState(false);

  const handleSave = () => {
    addToast({
      type: 'success',
      title: 'Settings Saved',
      message: 'Workspace configurations updated successfully.'
    });
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Settings & Governance
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage organization members, role-based access controls, and AI agent operating constraints.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Changes</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 text-xs font-semibold">
        {[
          { id: 'ai', label: 'AI Agent Parameters' },
          { id: 'users', label: 'Users & Roles (RBAC)' },
          { id: 'security', label: 'Security & Compliance' }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id as any)}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              activeTab === t.id
                ? 'bg-indigo-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === 'ai' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-6">
          <h3 className="text-base font-bold text-white">AI Reasoning & Automation Constraints</h3>

          <div className="space-y-4 max-w-xl text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-200">Minimum Recommendation Confidence Threshold</span>
                <span className="font-mono font-bold text-cyan-400">{minConfidence}%</span>
              </div>
              <input
                type="range"
                min="70"
                max="98"
                value={minConfidence}
                onChange={(e) => setMinConfidence(parseInt(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <p className="text-[11px] text-slate-400">
                Recommendations with confidence lower than {minConfidence}% will automatically be routed to manual controller review.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">Autonomous Micro-Exception Auto-Resolve</div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Automatically clear minor price variances under ₹500 with &gt;95% confidence.
                </p>
              </div>
              <input
                type="checkbox"
                checked={allowAutoResolve}
                onChange={(e) => setAllowAutoResolve(e.target.checked)}
                className="w-4 h-4 accent-indigo-600 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'users' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
          <h3 className="text-base font-bold text-white">Authorized Finance Operators</h3>
          <div className="space-y-3 text-xs">
            {[
              { name: 'Sarah Morgan', email: 'sarah.m@enterprise.com', role: 'AP Operations Manager', status: 'Active' },
              { name: 'David Chen', email: 'david.c@enterprise.com', role: 'CFO / VP Finance', status: 'Active' },
              { name: 'Elena Rostova', email: 'elena.r@enterprise.com', role: 'Head of Procurement', status: 'Active' }
            ].map((usr, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="font-semibold text-white">{usr.name}</div>
                  <div className="text-[11px] text-slate-400">{usr.email} · {usr.role}</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 font-mono text-[10px]">
                  {usr.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 text-xs">
          <h3 className="text-base font-bold text-white">Security & Audit Isolation</h3>
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-semibold text-white">SOC 2 Type II & ISO 27001 Certification</div>
              <p className="text-slate-400 mt-0.5">Continuous automated compliance monitoring active.</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800">
              <div className="font-semibold text-white">Data Retention & Masking</div>
              <p className="text-slate-400 mt-0.5">Vendor bank account details and personal tax numbers are tokenized on ingestion.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
