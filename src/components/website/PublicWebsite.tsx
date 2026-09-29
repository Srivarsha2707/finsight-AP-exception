import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FinSightLogo } from '../common/FinSightLogo';
import { FinSightOrbitalGraphic } from './FinSightOrbitalGraphic';
import { RequestDemoModal } from './RequestDemoModal';
import { 
  ArrowRight, 
  ChevronDown, 
  FileCheck, 
  Search, 
  ShieldCheck, 
  Cpu, 
  Users, 
  TrendingUp, 
  BarChart3, 
  Layers, 
  AlertCircle, 
  Sparkles, 
  Building2, 
  CheckCircle2, 
  FileText, 
  Lock, 
  ExternalLink,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';

export const PublicWebsite: React.FC = () => {
  const { navigateToConsole, setIsDemoModalOpen } = useApp();
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState<number>(4); // Default to AI Investigation
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  // 10-step horizontal workflow
  const workflowSteps = [
    { title: 'Invoice Received', desc: 'Ingested via PDF, API or ERP mailbox', icon: FileText },
    { title: 'AI Extraction', desc: 'Precision OCR & multi-line validation', icon: Cpu },
    { title: '2-Way / 3-Way Match', desc: 'Automated reconciliation with PO & GRN', icon: Layers },
    { title: 'Exception Detected', desc: 'Tolerance check flags price mismatch', icon: AlertCircle },
    { title: 'AI Investigation', desc: 'Cross-checks contracts & vendor history', icon: Search },
    { title: 'Recommendation', desc: 'Generates explainable action plan', icon: Sparkles },
    { title: 'Human Approval', desc: 'AP Manager reviews supporting proof', icon: Users },
    { title: 'Resolution', desc: 'Dispatches notice or updates PO', icon: CheckCircle2 },
    { title: 'Learning', desc: 'Model adapts from human approval override', icon: TrendingUp },
    { title: 'Prevention', desc: 'Prevents repeat variance from vendor', icon: ShieldCheck }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-indigo-500/30 selection:text-indigo-200">
      {/* 1. PUBLIC WEBSITE TOP NAVIGATION */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-8">
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="cursor-pointer text-left"
            >
              <FinSightLogo size="md" />
            </button>

            {/* Zone 2: Navigation Links with Hover Dropdowns */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium text-slate-300">
              <button 
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="px-3 py-2 rounded-lg hover:text-white transition-colors"
              >
                Home
              </button>

              {/* Platform Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('platform')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'platform' ? null : 'platform')}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-white transition-colors cursor-pointer"
                >
                  <span>Platform</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
                {activeDropdown === 'platform' && (
                  <div className="absolute top-full left-0 w-72 p-3 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-1 z-50">
                    <div className="space-y-1">
                      {[
                        { name: 'AP Automation', desc: 'Straight-through invoice processing' },
                        { name: 'Exception Intelligence', desc: 'Real-time anomaly identification' },
                        { name: 'AI Investigation', desc: 'Root cause legal & ERP analysis' },
                        { name: 'Resolution Engine', desc: 'Explainable next-best actions' },
                        { name: 'Supplier Intelligence', desc: 'Vendor health & recurrence rates' },
                        { name: 'Analytics', desc: 'CFO AP exposure & recovery metrics' },
                        { name: 'Audit & Compliance', desc: 'Granular AI and human action trails' },
                        { name: 'Integrations', desc: 'SAP, Oracle, NetSuite & Coupa' }
                      ].map((item, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setActiveDropdown(null);
                            navigateToConsole('dashboard');
                          }}
                          className="w-full text-left p-2 rounded-lg hover:bg-slate-800/80 transition-colors group"
                        >
                          <div className="text-xs font-semibold text-slate-200 group-hover:text-cyan-400">
                            {item.name}
                          </div>
                          <div className="text-[11px] text-slate-400">{item.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Solutions Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('solutions')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'solutions' ? null : 'solutions')}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-white transition-colors cursor-pointer"
                >
                  <span>Solutions</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
                {activeDropdown === 'solutions' && (
                  <div className="absolute top-full left-0 w-64 p-3 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-1 z-50">
                    <div className="space-y-1">
                      {[
                        'Finance Teams',
                        'Accounts Payable',
                        'Procurement Operations',
                        'Controllers',
                        'CFO Office',
                        'Enterprise Operations'
                      ].map((sol, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setActiveDropdown(null);
                            navigateToConsole('analytics');
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                          {sol}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Intelligence Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('intelligence')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'intelligence' ? null : 'intelligence')}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-white transition-colors cursor-pointer"
                >
                  <span>Intelligence</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
                {activeDropdown === 'intelligence' && (
                  <div className="absolute top-full left-0 w-64 p-3 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-1 z-50">
                    <div className="space-y-1">
                      {[
                        'Exception Insights',
                        'Root Cause Analysis',
                        'Risk & Anomaly Detection',
                        'Recurring Issues',
                        'Resolution Intelligence',
                        'Financial Impact'
                      ].map((intel, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setActiveDropdown(null);
                            navigateToConsole('investigation');
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                          {intel}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Resources Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setActiveDropdown('resources')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button 
                  onClick={() => setActiveDropdown(activeDropdown === 'resources' ? null : 'resources')}
                  className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-white transition-colors cursor-pointer"
                >
                  <span>Resources</span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>
                {activeDropdown === 'resources' && (
                  <div className="absolute top-full left-0 w-60 p-3 bg-slate-900 border border-slate-800 rounded-xl shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-1 z-50">
                    <div className="space-y-1">
                      {[
                        'Product Overview',
                        'AI in Accounts Payable',
                        'Exception Management Guide',
                        'Case Studies',
                        'Documentation',
                        'Frequently Asked Questions'
                      ].map((res, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setActiveDropdown(null);
                            navigateToConsole('knowledge');
                          }}
                          className="w-full text-left px-3 py-2 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                        >
                          {res}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button 
                onClick={() => {
                  const el = document.getElementById('why-finsight');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-3 py-2 rounded-lg hover:text-white transition-colors"
              >
                Company
              </button>
            </nav>
          </div>

          {/* Zone 3: Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigateToConsole('dashboard')}
              className="text-xs font-medium text-slate-300 hover:text-white transition-colors px-2.5 sm:px-3 py-2 cursor-pointer"
            >
              Sign In
            </button>
            
            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-200 bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 rounded-xl transition-all cursor-pointer"
            >
              Request Demo
            </button>

            <button
              onClick={() => navigateToConsole('dashboard')}
              className="hidden xs:flex items-center gap-2 px-3.5 sm:px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 rounded-xl shadow-lg shadow-indigo-600/25 transition-all duration-150 cursor-pointer"
            >
              <span className="hidden sm:inline">Launch Console</span>
              <span className="sm:hidden">Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Navigation Drawer Toggle */}
            <button
              onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
              className="p-2 text-slate-300 hover:text-white rounded-xl hover:bg-slate-800 lg:hidden cursor-pointer transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div 
            onClick={() => setIsMobileNavOpen(false)}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-slate-950 border-l border-slate-800 p-6 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-right duration-200 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <FinSightLogo size="sm" />
                <button
                  onClick={() => setIsMobileNavOpen(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-6 space-y-1">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 px-3 mb-2">
                  Platform & Solutions
                </div>
                {[
                  { label: 'Platform Architecture', tab: 'dashboard' as const, hash: '#platform-section' },
                  { label: 'Exceptions Management', tab: 'exceptions' as const },
                  { label: 'AI Investigation Agent', tab: 'investigation' as const },
                  { label: 'Approval Automation', tab: 'approvals' as const },
                  { label: 'Supplier Intelligence', tab: 'suppliers' as const },
                  { label: 'Risk & Anomalies', tab: 'risk' as const },
                  { label: 'Audit Trail', tab: 'audit' as const },
                ].map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsMobileNavOpen(false);
                      if (item.hash) {
                        const el = document.getElementById(item.hash.replace('#', ''));
                        el?.scrollIntoView({ behavior: 'smooth' });
                      } else {
                        navigateToConsole(item.tab);
                      }
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-slate-600" />
                  </button>
                ))}

                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 px-3 mt-6 mb-2">
                  Company & Resources
                </div>
                <button
                  onClick={() => {
                    setIsMobileNavOpen(false);
                    navigateToConsole('knowledge');
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>Knowledge Center</span>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
                <button
                  onClick={() => {
                    setIsMobileNavOpen(false);
                    const el = document.getElementById('why-finsight');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-900 transition-colors flex items-center justify-between cursor-pointer"
                >
                  <span>About FinSight</span>
                  <ChevronRight className="w-4 h-4 text-slate-600" />
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-800 space-y-3">
              <button
                onClick={() => {
                  setIsMobileNavOpen(false);
                  setIsDemoModalOpen(true);
                }}
                className="w-full py-3 px-4 text-center rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-sm font-semibold text-white transition-colors cursor-pointer"
              >
                Request Enterprise Demo
              </button>
              <button
                onClick={() => {
                  setIsMobileNavOpen(false);
                  navigateToConsole('dashboard');
                }}
                className="w-full py-3 px-4 text-center rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 text-sm font-semibold text-white shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Launch Operations Console</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden">
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b0f_1px,transparent_1px),linear-gradient(to_bottom,#1e293b0f_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Headline and Positioning */}
            <div className="lg:col-span-6 flex flex-col text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-950/70 border border-indigo-500/30 text-indigo-300 text-xs font-medium w-fit mb-5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                <span>Next-Generation AP Exception Intelligence</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] text-balance">
                Turn AP Exceptions Into{' '}
                <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
                  Intelligent Resolutions
                </span>
              </h1>

              <p className="mt-4 sm:mt-6 text-sm sm:text-base lg:text-lg text-slate-300 leading-relaxed max-w-xl">
                FinSight uses AI to detect, investigate, explain and resolve Accounts Payable exceptions — while keeping finance teams in control.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  onClick={() => navigateToConsole('dashboard')}
                  className="flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition-all duration-150 cursor-pointer w-full sm:w-auto"
                >
                  <span>Explore FinSight</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setIsDemoModalOpen(true)}
                  className="px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700/80 transition-all duration-150 cursor-pointer text-center w-full sm:w-auto"
                >
                  Request a Demo
                </button>
              </div>

              {/* Core Philosophy Chain */}
              <div className="mt-10 pt-6 border-t border-slate-800/80">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Operating Philosophy
                </div>
                <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-300">
                  <span className="font-semibold text-white">DETECT</span>
                  <span className="text-slate-600">→</span>
                  <span>UNDERSTAND</span>
                  <span className="text-slate-600">→</span>
                  <span className="font-semibold text-indigo-300">INVESTIGATE</span>
                  <span className="text-slate-600">→</span>
                  <span>RECOMMEND</span>
                  <span className="text-slate-600">→</span>
                  <span>APPROVE</span>
                  <span className="text-slate-600">→</span>
                  <span className="font-semibold text-emerald-400">RESOLVE</span>
                  <span className="text-slate-600">→</span>
                  <span>LEARN</span>
                  <span className="text-slate-600">→</span>
                  <span className="font-semibold text-cyan-300">PREVENT</span>
                </div>
              </div>
            </div>

            {/* Right Column: Original Connected Orbital Graphic */}
            <div className="lg:col-span-6 flex justify-center items-center">
              <FinSightOrbitalGraphic />
            </div>
          </div>
        </div>
      </section>

      {/* 3. VALUE METRICS SECTION */}
      <section className="border-y border-slate-800/80 bg-slate-900/60 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-8 gap-2">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Intelligence Across Every AP Exception
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Real-time exception surface telemetry across enterprise ERP streams (Sample demonstration telemetry)
              </p>
            </div>
            <button
              onClick={() => navigateToConsole('exceptions')}
              className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1"
            >
              <span>View live queue in Console</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Metric 1 */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-sm shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Open Exceptions</span>
                <span className="text-rose-400 font-mono">+12.4%</span>
              </div>
              <div className="mt-3 text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                142
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Active discrepancies undergoing investigation
              </p>
            </div>

            {/* Metric 2 */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-sm shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>High Priority</span>
                <span className="text-amber-400 font-mono">-4.2%</span>
              </div>
              <div className="mt-3 text-3xl sm:text-4xl font-extrabold text-amber-400 font-mono tabular-nums">
                28
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Due within 24 hours or payment blocked
              </p>
            </div>

            {/* Metric 3 */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-sm shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Amount at Risk</span>
                <span className="text-indigo-400 font-mono">+8.7%</span>
              </div>
              <div className="mt-3 text-3xl sm:text-4xl font-extrabold text-white font-mono tabular-nums">
                ₹4.2M
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Total exposure across mismatched line rates
              </p>
            </div>

            {/* Metric 4 */}
            <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800/80 backdrop-blur-sm shadow-lg">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Resolved This Week</span>
                <span className="text-emerald-400 font-mono">+14%</span>
              </div>
              <div className="mt-3 text-3xl sm:text-4xl font-extrabold text-emerald-400 font-mono tabular-nums">
                86%
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Without operational escalations or friction
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE PLATFORM SECTION */}
      <section id="platform-section" className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
              Enterprise Architecture
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              One Intelligence Layer Across AP
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-3 leading-relaxed">
              Traditional AP tools merely flag errors. FinSight reconstructs the commercial truth behind every invoice, PO, and contract.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Invoice Intelligence',
                desc: 'AI-powered invoice extraction and validation with multi-line tax and tolerance cross-checks.',
                icon: FileCheck,
                color: 'text-sky-400',
                border: 'border-sky-500/20',
                tab: 'invoices' as const
              },
              {
                title: 'Exception Intelligence',
                desc: 'Detect and classify invoice exceptions automatically across 2-way and 3-way matching rules.',
                icon: AlertCircle,
                color: 'text-amber-400',
                border: 'border-amber-500/20',
                tab: 'exceptions' as const
              },
              {
                title: 'Investigation Agent',
                desc: 'Understand why an exception happened using contextual legal evidence, PO history, and ERP notes.',
                icon: Search,
                color: 'text-purple-400',
                border: 'border-purple-500/20',
                tab: 'investigation' as const
              },
              {
                title: 'Resolution Engine',
                desc: 'Recommend and guide the appropriate resolution with confidence scores and automated vendor drafts.',
                icon: CheckCircle2,
                color: 'text-emerald-400',
                border: 'border-emerald-500/20',
                tab: 'approvals' as const
              },
              {
                title: 'Supplier Intelligence',
                desc: 'Understand supplier behavior, invoice accuracy history, and recurring exception frequency.',
                icon: Building2,
                color: 'text-teal-400',
                border: 'border-teal-500/20',
                tab: 'suppliers' as const
              },
              {
                title: 'Prevention Intelligence',
                desc: 'Identify systematic vendor pricing drifts and contractual inconsistencies to eliminate future friction.',
                icon: ShieldCheck,
                color: 'text-indigo-400',
                border: 'border-indigo-500/20',
                tab: 'prevention' as const
              }
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <div
                  key={i}
                  onClick={() => navigateToConsole(card.tab)}
                  className={`p-7 rounded-2xl bg-slate-900/70 border ${card.border} hover:bg-slate-900 transition-all duration-200 cursor-pointer group flex flex-col justify-between`}
                >
                  <div>
                    <div className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center ${card.color} mb-5 group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-bold text-white tracking-tight group-hover:text-cyan-300 transition-colors">
                      {card.title}
                    </h3>
                    <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                      {card.desc}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-slate-300 group-hover:text-white">
                    <span>Inspect capability</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. AP INTELLIGENCE WORKFLOW PIPELINE */}
      <section className="py-20 bg-slate-900/40 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
              End-to-End Governance
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              AP Intelligence Workflow
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              From raw ingestion to self-learning prevention: how modern finance teams automate exception handling.
            </p>
          </div>

          {/* Horizontal interactive workflow pipeline */}
          <div className="text-center sm:hidden mb-2 text-[11px] font-mono text-cyan-400/90 flex items-center justify-center gap-1">
            <span>← Swipe to explore all 10 stages →</span>
          </div>
          <div className="overflow-x-auto pb-4 pt-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="flex items-center min-w-[980px] justify-between relative px-2">
              {/* Connecting line */}
              <div className="absolute top-7 left-8 right-8 h-0.5 bg-slate-800 -z-0" />

              {workflowSteps.map((step, idx) => {
                const Icon = step.icon;
                const isSelected = idx === activeWorkflowIndex;
                return (
                  <div 
                    key={idx}
                    onClick={() => setActiveWorkflowIndex(idx)}
                    className="relative z-10 flex flex-col items-center text-center cursor-pointer group w-24 shrink-0"
                  >
                    <div 
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-200 ${
                        isSelected
                          ? 'bg-gradient-to-tr from-indigo-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30 ring-2 ring-indigo-400'
                          : 'bg-slate-900 border border-slate-700/80 text-slate-400 group-hover:text-white group-hover:border-slate-500'
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-300 mt-2 leading-tight">
                      {step.title}
                    </span>
                    <span className="text-[9px] text-slate-500 mt-0.5">
                      Step 0{idx + 1}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Active workflow step detail panel */}
          <div className="mt-6 sm:mt-8 p-5 sm:p-6 rounded-2xl bg-slate-900 border border-indigo-500/30 max-w-2xl mx-auto shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
                {React.createElement(workflowSteps[activeWorkflowIndex].icon, { className: 'w-6 h-6' })}
              </div>
              <div>
                <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                  Step 0{activeWorkflowIndex + 1} Spotlight
                </div>
                <h4 className="text-base font-bold text-white mt-0.5">
                  {workflowSteps[activeWorkflowIndex].title}
                </h4>
                <p className="text-xs text-slate-300 mt-1">
                  {workflowSteps[activeWorkflowIndex].desc}
                </p>
              </div>
            </div>
            <button
              onClick={() => navigateToConsole('investigation')}
              className="w-full sm:w-auto shrink-0 px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer text-center"
            >
              Test in Console →
            </button>
          </div>
        </div>
      </section>

      {/* 6. AI AGENT SECTION WITH REALISTIC DEMO CASE */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-medium mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Explainable Reasoning</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
                An AI Agent That Doesn't Just Flag Exceptions.
              </h2>
              <p className="mt-4 text-base text-slate-300 leading-relaxed">
                FinSight investigates the context behind every exception, gathers evidence, explains the root cause and recommends what should happen next.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  'Autonomous 3-way matching across ERP, PO, and GRN slips',
                  'Instant contract cross-referencing for pricing and rebate clauses',
                  'Synthesizes vendor precedent to deliver explainable recommendations',
                  'Retains human controller signoff before dispatching to ERP or vendors'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center gap-4">
                <button
                  onClick={() => navigateToConsole('exception-detail', 'INV-28491')}
                  className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/30 cursor-pointer"
                >
                  <span>Open This Case in Console</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right side: Interactive Exception Example Card */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl bg-slate-900 border border-slate-700/80 shadow-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-rose-500/20 border-b border-l border-rose-500/40 text-rose-300 text-[11px] font-bold rounded-bl-xl uppercase tracking-wider font-mono">
                  Price Mismatch
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-400 mb-4">
                  <span className="font-semibold text-white">Invoice #INV-28491</span>
                  <span>·</span>
                  <span>ABC Supplies Ltd.</span>
                  <span>·</span>
                  <span className="text-amber-400 font-medium">Due Today</span>
                </div>

                {/* Price variance grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div>
                    <div className="text-[11px] text-slate-400">Invoice Rate</div>
                    <div className="text-lg font-bold text-rose-400 font-mono tabular-nums">
                      ₹1,240 <span className="text-xs font-normal text-slate-400">/ unit</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">PO Price</div>
                    <div className="text-lg font-bold text-white font-mono tabular-nums">
                      ₹1,180 <span className="text-xs font-normal text-slate-400">/ unit</span>
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Variance</div>
                    <div className="text-lg font-bold text-rose-400 font-mono tabular-nums">
                      +5.08%
                    </div>
                  </div>
                  <div>
                    <div className="text-[11px] text-slate-400">Tolerance</div>
                    <div className="text-lg font-bold text-slate-300 font-mono tabular-nums">
                      2.00%
                    </div>
                  </div>
                </div>

                {/* AI Finding statement */}
                <div className="mt-5 p-4 rounded-xl bg-indigo-950/40 border border-indigo-500/30">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-300 uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>AI Investigation Finding</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed">
                    "Invoice pricing does not match the current purchase order. The supplier contract (MSA-2025-ABC §4.2) also confirms unit rate is locked at ₹1,180 per unit through Q4."
                  </p>
                </div>

                {/* Evidence found chips */}
                <div className="mt-5">
                  <div className="text-xs font-semibold text-slate-400 mb-2">
                    Evidence Verified by FinSight:
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium">
                      ✓ Invoice #INV-28491
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium">
                      ✓ Purchase Order #PO-88219
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium">
                      ✓ Contract (MSA §4.2)
                    </span>
                    <span className="flex items-center gap-1 px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-medium">
                      ✓ Vendor History (27 cases)
                    </span>
                  </div>
                </div>

                {/* Recommendation box */}
                <div className="mt-6 pt-5 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[11px] text-slate-400">Next Action Recommendation</div>
                    <div className="text-sm font-bold text-emerald-400 flex items-center gap-2">
                      <span>"Request corrected invoice from supplier"</span>
                      <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 text-emerald-300">
                        92% Confidence
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => navigateToConsole('exception-detail', 'INV-28491')}
                      className="px-3.5 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 transition-colors cursor-pointer"
                    >
                      Review Evidence
                    </button>
                    <button
                      onClick={() => navigateToConsole('exception-detail', 'INV-28491')}
                      className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-semibold text-white transition-colors cursor-pointer"
                    >
                      View Recommendation
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY FINSIGHT SECTION */}
      <section id="why-finsight" className="py-20 bg-slate-900/60 border-y border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
              Autonomous Cycle
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              From Detection to Prevention
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2">
              Transform AP from a reactive firefighting team into a strategic, autonomous finance operation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                stage: 'Detect',
                color: 'text-amber-400',
                border: 'border-amber-500/30',
                bg: 'bg-amber-950/20',
                desc: 'Identify exceptions automatically across rates, quantities, taxes, and duplicate checks in seconds.'
              },
              {
                stage: 'Investigate',
                color: 'text-purple-400',
                border: 'border-purple-500/30',
                bg: 'bg-purple-950/20',
                desc: 'Understand what happened and why by cross-referencing contracts, POs, GRNs, and vendor behavior.'
              },
              {
                stage: 'Resolve',
                color: 'text-emerald-400',
                border: 'border-emerald-500/30',
                bg: 'bg-emerald-950/20',
                desc: 'Guide teams toward the right action with one-click approvals, dispute notices, or PO amendments.'
              },
              {
                stage: 'Prevent',
                color: 'text-cyan-400',
                border: 'border-cyan-500/30',
                bg: 'bg-cyan-950/20',
                desc: 'Identify recurring supplier patterns and contract ambiguities before they become future exceptions.'
              }
            ].map((item, i) => (
              <div 
                key={i} 
                className={`p-6 rounded-2xl bg-slate-900 border ${item.border} flex flex-col justify-between`}
              >
                <div>
                  <div className={`text-xs font-bold uppercase tracking-wider ${item.color} mb-1`}>
                    Stage 0{i + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight mt-1">
                    {item.stage}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-3 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 font-mono">
                  Autonomous Phase
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. SUPPLIER & MANAGEMENT INTELLIGENCE PREVIEWS */}
      <section className="py-20 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Supplier Intelligence Preview Card */}
            <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    Supplier Intelligence
                  </div>
                  <span className="text-xs text-slate-400 font-mono">360° Partner Health</span>
                </div>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Vendor Behavior & Anomaly Tracking
                </h3>
                <p className="text-sm text-slate-400 mt-2">
                  Diagnose supplier-level pricing drift, invoice accuracy trends, and resolution times across your entire vendor master.
                </p>

                <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">ABC Supplies Ltd. Health Score</span>
                    <span className="font-bold text-emerald-400 font-mono">92 / 100</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Historical Exception Rate</span>
                    <span className="font-bold text-rose-400 font-mono">9.5% (High Variance)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Average Resolution Turnaround</span>
                    <span className="font-bold text-slate-200 font-mono">1.8 Days</span>
                  </div>
                  <div className="text-xs p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300">
                    ⚠ Recurring pattern: 27 price mismatches over 90 days (₹1.8M affected).
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigateToConsole('suppliers')}
                className="mt-6 text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
              >
                <span>Explore Supplier Center in Console</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Management / CFO Intelligence Preview Card */}
            <div className="p-8 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                    Executive AP Intelligence
                  </div>
                  <span className="text-xs text-slate-400 font-mono">CFO Operations View</span>
                </div>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Macro Financial Impact & Risk Recovery
                </h3>
                <p className="text-sm text-slate-400 mt-2">
                  Gain boardroom-ready visibility into cash at risk, recovered discounts, and automated versus human intervention rates.
                </p>

                <div className="mt-6 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Total Exception Exposure</div>
                    <div className="text-2xl font-bold text-white font-mono mt-1">₹12.4M</div>
                    <div className="text-[10px] text-slate-500 mt-1">Across active fiscal quarter</div>
                  </div>
                  <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Impact Recovered / Avoided</div>
                    <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">₹4.8M</div>
                    <div className="text-[10px] text-emerald-500/80 mt-1">Overpayment prevented</div>
                  </div>
                </div>

                <div className="mt-4 p-3 rounded-xl bg-slate-950/50 border border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Autonomous Resolution Rate</span>
                  <span className="font-bold text-cyan-400 font-mono">76.4%</span>
                </div>
              </div>

              <button
                onClick={() => navigateToConsole('analytics')}
                className="mt-6 text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Executive Analytics in Console</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. SECURITY & ENTERPRISE GOVERNANCE */}
      <section className="py-16 bg-slate-900/40 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Enterprise Governance & Security
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              Engineered with immutable audit trails and strict segregation of duties for global controllers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { title: 'Role-Based Access', desc: 'Granular permissions for AP, Procurement, and CFO', icon: Lock },
              { title: 'Human in the Loop', desc: 'Mandatory approval signoffs for high financial values', icon: Users },
              { title: 'Immutable Audit Log', desc: 'Every AI decision and human override logged', icon: FileText },
              { title: 'AI Transparency', desc: 'Every recommendation displays exact evidence cited', icon: Sparkles },
              { title: 'Tolerances & Rules', desc: 'Configurable variance thresholds by supplier tier', icon: ShieldCheck },
              { title: 'Enterprise Connectors', desc: 'Native two-way sync with SAP, Oracle & Coupa', icon: Layers }
            ].map((sec, i) => {
              const Icon = sec.icon;
              return (
                <div key={i} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-left">
                  <Icon className="w-5 h-5 text-indigo-400 mb-2" />
                  <h4 className="text-xs font-bold text-white">{sec.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-1 leading-snug">{sec.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 10. FINAL CTA SECTION */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-indigo-950/60 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Make Every AP Exception Actionable.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed">
            Eliminate invoice delays, prevent supplier friction, and capture early payment discounts with explainable AI intelligence.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => navigateToConsole('dashboard')}
              className="flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white font-semibold text-sm shadow-xl shadow-indigo-600/30 transition-all cursor-pointer"
            >
              <span>Explore Platform</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsDemoModalOpen(true)}
              className="px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-sm border border-slate-700 transition-colors cursor-pointer"
            >
              Request Demo
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <FinSightLogo size="sm" />
            <span className="text-slate-600">|</span>
            <span>Detect. Investigate. Resolve. Prevent.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-slate-400">
            <button onClick={() => navigateToConsole('dashboard')} className="hover:text-white transition-colors">
              Console
            </button>
            <button onClick={() => navigateToConsole('exceptions')} className="hover:text-white transition-colors">
              Exceptions
            </button>
            <button onClick={() => navigateToConsole('suppliers')} className="hover:text-white transition-colors">
              Suppliers
            </button>
            <button onClick={() => navigateToConsole('analytics')} className="hover:text-white transition-colors">
              Analytics
            </button>
            <button onClick={() => navigateToConsole('policies')} className="hover:text-white transition-colors">
              Policies
            </button>
            <button onClick={() => navigateToConsole('audit')} className="hover:text-white transition-colors">
              Audit
            </button>
          </div>

          <div className="text-slate-500">
            © 2026 FinSight Technologies Inc. Commercial Enterprise AP Intelligence.
          </div>
        </div>
      </footer>

      {/* REQUEST DEMO MODAL */}
      <RequestDemoModal />
    </div>
  );
};
