import React, { useState } from 'react';
import { 
  FileText, 
  GitMerge, 
  AlertTriangle, 
  Search, 
  CheckCircle2, 
  Building2, 
  ShieldAlert, 
  Sparkles, 
  Layers
} from 'lucide-react';

interface ModuleNode {
  id: string;
  name: string;
  shortDesc: string;
  icon: React.ElementType;
  angle: number; // degrees
  radius: number; // px from center
  color: string;
  tag: string;
}

export const FinSightOrbitalGraphic: React.FC = () => {
  const [activeNode, setActiveNode] = useState<string>('root-cause');

  const modules: ModuleNode[] = [
    {
      id: 'invoice-intel',
      name: 'Invoice Intelligence',
      shortDesc: 'Automated ingestion, OCR & multi-tax line parsing',
      icon: FileText,
      angle: 270, // top
      radius: 175,
      color: '#38bdf8', // sky
      tag: 'Ingestion'
    },
    {
      id: 'three-way-match',
      name: '3-Way Match',
      shortDesc: 'Invoice ↔ PO ↔ GRN line-level reconciliation',
      icon: GitMerge,
      angle: 315, // top right
      radius: 185,
      color: '#60a5fa', // blue
      tag: 'Validation'
    },
    {
      id: 'exception-detection',
      name: 'Exception Detection',
      shortDesc: 'Instant anomaly classification across tolerances',
      icon: AlertTriangle,
      angle: 0, // right
      radius: 175,
      color: '#f59e0b', // amber
      tag: 'Detection'
    },
    {
      id: 'root-cause',
      name: 'Root Cause AI',
      shortDesc: 'Contracts, ERP history & legal clause inspection',
      icon: Search,
      angle: 45, // bottom right
      radius: 185,
      color: '#a855f7', // purple
      tag: 'Reasoning'
    },
    {
      id: 'resolution-ai',
      name: 'Resolution AI',
      shortDesc: 'Explainable next-action recommendations with confidence',
      icon: CheckCircle2,
      angle: 90, // bottom
      radius: 175,
      color: '#10b981', // emerald
      tag: 'Action'
    },
    {
      id: 'supplier-intel',
      name: 'Supplier Intelligence',
      shortDesc: '360° vendor health, exception rates & behavior trends',
      icon: Building2,
      angle: 135, // bottom left
      radius: 185,
      color: '#2dd4bf', // teal
      tag: 'Vendor'
    },
    {
      id: 'risk-detection',
      name: 'Risk & Duplicate AI',
      shortDesc: 'Fuzzy duplicate, bank alteration & payment risk shields',
      icon: ShieldAlert,
      angle: 180, // left
      radius: 175,
      color: '#f43f5e', // rose
      tag: 'Risk'
    },
    {
      id: 'prevention',
      name: 'Prevention Engine',
      shortDesc: 'Self-learning patterns preventing recurring friction',
      icon: Layers,
      angle: 225, // top left
      radius: 185,
      color: '#818cf8', // indigo
      tag: 'Self-Learning'
    }
  ];

  const currentModule = modules.find(m => m.id === activeNode) || modules[3];

  return (
    <div className="relative w-full max-w-[540px] aspect-square mx-auto flex items-center justify-center select-none">
      {/* Background ambient glow layers */}
      <div className="absolute inset-0 bg-gradient-to-tr from-indigo-950/40 via-blue-950/30 to-teal-950/20 rounded-full blur-3xl -z-10" />
      <div className="absolute w-[360px] h-[360px] rounded-full border border-indigo-500/10 animate-[spin_60s_linear_infinite]" />
      <div className="absolute w-[440px] h-[440px] rounded-full border border-slate-700/20 border-dashed animate-[spin_90s_linear_infinite_reverse]" />

      {/* SVG Connecting Web of Intelligence */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 540 540">
        <defs>
          <linearGradient id="orbit-center-glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#2dd4bf" stopOpacity="0.05" />
          </linearGradient>
          <radialGradient id="hub-pulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#818cf8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient background rays */}
        <circle cx="270" cy="270" r="140" fill="url(#hub-pulse)" />

        {/* Connection lines from center (270, 270) to each module */}
        {modules.map((mod) => {
          const rad = (mod.angle * Math.PI) / 180;
          const x = 270 + mod.radius * Math.cos(rad);
          const y = 270 + mod.radius * Math.sin(rad);
          const isActive = mod.id === activeNode;

          return (
            <g key={`line-${mod.id}`}>
              <line
                x1="270"
                y1="270"
                x2={x}
                y2={y}
                stroke={isActive ? mod.color : 'rgba(148, 163, 184, 0.18)'}
                strokeWidth={isActive ? 2 : 1}
                strokeDasharray={isActive ? 'none' : '3 3'}
                className="transition-all duration-300"
              />
              {isActive && (
                <circle cx={x} cy={y} r="5" fill={mod.color} className="animate-ping opacity-75" />
              )}
            </g>
          );
        })}

        {/* Secondary ring connecting adjacent nodes */}
        {modules.map((mod, idx) => {
          const nextMod = modules[(idx + 1) % modules.length];
          const rad1 = (mod.angle * Math.PI) / 180;
          const x1 = 270 + mod.radius * Math.cos(rad1);
          const y1 = 270 + mod.radius * Math.sin(rad1);

          const rad2 = (nextMod.angle * Math.PI) / 180;
          const x2 = 270 + nextMod.radius * Math.cos(rad2);
          const y2 = 270 + nextMod.radius * Math.sin(rad2);

          return (
            <line
              key={`ring-${mod.id}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="rgba(99, 102, 241, 0.12)"
              strokeWidth="1"
            />
          );
        })}
      </svg>

      {/* CENTER HUB: FinSight Intelligence */}
      <div 
        onClick={() => setActiveNode('root-cause')}
        className="relative z-20 w-44 h-44 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-indigo-950/90 border border-indigo-500/30 shadow-2xl shadow-indigo-900/40 p-4 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-300 hover:scale-105 hover:border-indigo-400/50 backdrop-blur-md"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 mb-2.5">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
          Core Engine
        </span>
        <h3 className="text-base font-bold text-white tracking-tight leading-tight mt-0.5">
          FinSight Intelligence
        </h3>
        <p className="text-[11px] text-slate-400 mt-1 line-clamp-1">
          {currentModule.tag}: {currentModule.name}
        </p>
      </div>

      {/* SATELLITE MODULE NODES */}
      {modules.map((mod) => {
        const rad = (mod.angle * Math.PI) / 180;
        const x = 270 + mod.radius * Math.cos(rad);
        const y = 270 + mod.radius * Math.sin(rad);
        const leftPct = (x / 540) * 100;
        const topPct = (y / 540) * 100;
        const isActive = mod.id === activeNode;
        const Icon = mod.icon;

        return (
          <div
            key={mod.id}
            style={{
              left: `${leftPct}%`,
              top: `${topPct}%`,
              transform: 'translate(-50%, -50%)'
            }}
            onClick={() => setActiveNode(mod.id)}
            onMouseEnter={() => setActiveNode(mod.id)}
            className={`absolute z-30 group cursor-pointer transition-all duration-200 ${
              isActive ? 'scale-110 z-40' : 'hover:scale-105 opacity-85 hover:opacity-100'
            }`}
          >
            <div
              className={`flex items-center gap-1.5 sm:gap-2 px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg sm:rounded-xl backdrop-blur-md border shadow-lg transition-all duration-200 ${
                isActive
                  ? 'bg-slate-900/95 border-indigo-400 shadow-indigo-500/20 ring-1 ring-indigo-400/50'
                  : 'bg-slate-900/80 border-slate-700/60 hover:border-slate-500/80'
              }`}
            >
              <div
                className="w-5 h-5 sm:w-7 sm:h-7 rounded-md sm:rounded-lg flex items-center justify-center shrink-0"
                style={{
                  backgroundColor: `${mod.color}18`,
                  color: mod.color
                }}
              >
                <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-[10px] sm:text-xs font-semibold text-slate-100 whitespace-nowrap">
                  {mod.name}
                </span>
                <span className="text-[9px] sm:text-[10px] text-slate-400 hidden md:inline whitespace-nowrap">
                  {mod.tag}
                </span>
              </div>
            </div>
          </div>
        );
      })}

      {/* ACTIVE DETAIL HOVER CARD AT BOTTOM */}
      <div className="absolute -bottom-10 sm:-bottom-8 left-1/2 -translate-x-1/2 z-30 w-[92%] sm:w-full max-w-sm px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-slate-900/95 border border-slate-700/80 backdrop-blur-lg shadow-xl text-center pointer-events-none transition-all duration-300">
        <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-xs font-medium text-cyan-400">
          <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span className="truncate">Active Layer: {currentModule.name}</span>
        </div>
        <p className="text-[10px] sm:text-xs text-slate-300 mt-0.5 line-clamp-2">
          {currentModule.shortDesc}
        </p>
      </div>
    </div>
  );
};
