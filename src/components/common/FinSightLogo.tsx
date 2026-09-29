import React from 'react';

interface FinSightLogoProps {
  className?: string;
  variant?: 'light' | 'dark' | 'mono';
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
}

export const FinSightLogo: React.FC<FinSightLogoProps> = ({
  className = '',
  variant = 'dark',
  size = 'md',
  showTagline = false
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  const textSizes = {
    sm: 'text-base',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* FinSight Lens / Node Intelligence Mark */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-indigo-600 via-blue-600 to-teal-400 p-[1.5px] shadow-sm shadow-indigo-500/20">
          <div className="w-full h-full rounded-[10px] bg-slate-950 flex items-center justify-center">
            {/* Geometric Financial Prism / Aperture */}
            <svg
              className="w-3/5 h-3/5 text-transparent"
              viewBox="0 0 24 24"
              fill="none"
              stroke="url(#finsight-grad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <defs>
                <linearGradient id="finsight-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#38bdf8" />
                  <stop offset="50%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#2dd4bf" />
                </linearGradient>
              </defs>
              <polygon points="12 2 2 8.5 2 15.5 12 22 22 15.5 22 8.5 12 2" />
              <line x1="12" y1="22" x2="12" y2="15.5" />
              <polyline points="22 8.5 12 15.5 2 8.5" />
              <polyline points="12 2 12 8.5 22 8.5" opacity="0.6" />
            </svg>
          </div>
        </div>
        {/* Subtle glowing center intelligence spark */}
        <div className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#38bdf8]" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center tracking-tight font-bold">
          <span className={`font-extrabold tracking-tight ${textSizes[size]} ${variant === 'light' ? 'text-slate-900' : 'text-white'}`}>
            FIN<span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">SIGHT</span>
          </span>
          <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-teal-400" />
        </div>
        {showTagline && (
          <span className="text-[10px] uppercase tracking-wider text-slate-400 font-medium -mt-1">
            AP Exception Intelligence
          </span>
        )}
      </div>
    </div>
  );
};
