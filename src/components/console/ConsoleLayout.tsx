import React, { useState } from 'react';
import { useApp, ActiveConsoleTab } from '../../context/AppContext';
import { FinSightLogo } from '../common/FinSightLogo';
import { CopilotDrawer } from './CopilotDrawer';
import { 
  LayoutDashboard, 
  AlertCircle, 
  FileText, 
  CheckSquare, 
  Search, 
  Building2, 
  FileCode2, 
  BookOpen, 
  BarChart3, 
  ShieldAlert, 
  Layers, 
  History, 
  Sliders, 
  Network, 
  Settings, 
  Sparkles, 
  Bell, 
  HelpCircle, 
  ChevronRight, 
  ArrowLeft,
  X,
  Menu
} from 'lucide-react';

interface ConsoleLayoutProps {
  children: React.ReactNode;
}

export const ConsoleLayout: React.FC<ConsoleLayoutProps> = ({ children }) => {
  const { 
    activeConsoleTab, 
    setActiveConsoleTab, 
    navigateToWebsite, 
    setIsCopilotOpen,
    openCopilotWithPrompt,
    selectedExceptionId
  } = useApp();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const navGroups: {
    label: string;
    items: {
      id: ActiveConsoleTab;
      label: string;
      icon: React.ElementType;
      badge?: string | number;
      badgeColor?: string;
    }[];
  }[] = [
    {
      label: 'Overview',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      label: 'Operations',
      items: [
        { id: 'exceptions', label: 'Exceptions', icon: AlertCircle, badge: '142', badgeColor: 'bg-rose-500/20 text-rose-300' },
        { id: 'invoices', label: 'Invoices', icon: FileText },
        { id: 'approvals', label: 'Approvals', icon: CheckSquare, badge: '18', badgeColor: 'bg-amber-500/20 text-amber-300' }
      ]
    },
    {
      label: 'Intelligence',
      items: [
        { id: 'investigation', label: 'Investigation', icon: Search },
        { id: 'hindsight', label: 'Hindsight', icon: History, badge: 'NEW', badgeColor: 'bg-indigo-500/20 text-indigo-300' },
        { id: 'suppliers', label: 'Suppliers', icon: Building2 },
        { id: 'contracts', label: 'Contracts', icon: FileCode2 },
        { id: 'knowledge', label: 'Knowledge', icon: BookOpen }
      ]
    },
    {
      label: 'Insights',
      items: [
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'risk', label: 'Risk & Anomalies', icon: ShieldAlert },
        { id: 'prevention', label: 'Prevention', icon: Layers }
      ]
    },
    {
      label: 'Governance',
      items: [
        { id: 'audit', label: 'Audit Log', icon: History },
        { id: 'policies', label: 'Policies', icon: Sliders }
      ]
    },
    {
      label: 'System',
      items: [
        { id: 'integrations', label: 'Integrations', icon: Network },
        { id: 'settings', label: 'Settings', icon: Settings }
      ]
    }
  ];

  const getBreadcrumbTitle = () => {
    switch (activeConsoleTab) {
      case 'dashboard': return 'Overview / Dashboard';
      case 'exceptions': return 'Operations / Exceptions';
      case 'exception-detail': return `Operations / Exceptions / ${selectedExceptionId}`;
      case 'invoices': return 'Operations / Invoices';
      case 'approvals': return 'Operations / Approvals';
      case 'investigation': return 'Intelligence / AI Investigation Agent';
      case 'hindsight': return 'Intelligence / Hindsight Intelligence';
      case 'suppliers': return 'Intelligence / Supplier Center (ABC Supplies)';
      case 'contracts': return 'Intelligence / Active Contracts';
      case 'knowledge': return 'Intelligence / Knowledge Playbooks';
      case 'analytics': return 'Insights / Executive AP Analytics';
      case 'risk': return 'Insights / Risk & Anomaly Intelligence';
      case 'prevention': return 'Insights / Recurring Issue Prevention';
      case 'audit': return 'Governance / Immutable Audit Log';
      case 'policies': return 'Governance / Tolerances & Rules';
      case 'integrations': return 'System / ERP & Procurement Connectors';
      case 'settings': return 'System / Workspace Settings';
      default: return 'Operations / Console';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex antialiased">
      {/* MOBILE BACKDROP OVERLAY */}
      {isMobileMenuOpen && (
        <div 
          onClick={() => setIsMobileMenuOpen(false)}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm z-30 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* SIDEBAR NAVIGATION - Deep Navy / Indigo Palette */}
      <aside 
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#0a0f1d] border-r border-slate-800/80 flex flex-col transition-transform duration-200 lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="h-16 px-5 border-b border-slate-800/80 flex items-center justify-between">
          <button 
            onClick={() => setActiveConsoleTab('dashboard')} 
            className="cursor-pointer"
          >
            <FinSightLogo size="sm" />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Categories */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 custom-scroll">
          {navGroups.map((grp, gIdx) => (
            <div key={gIdx}>
              <div className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                {grp.label}
              </div>
              <div className="space-y-0.5">
                {grp.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeConsoleTab === item.id || 
                    (item.id === 'exceptions' && activeConsoleTab === 'exception-detail');

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveConsoleTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-gradient-to-r from-indigo-600/30 to-blue-600/20 text-white border-l-2 border-indigo-400 font-semibold shadow-sm'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                        <span className="truncate">{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${item.badgeColor || 'bg-slate-800 text-slate-300'}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* User Profile at bottom: Sarah Morgan */}
        <div className="p-3 border-t border-slate-800/80 bg-slate-950/70">
          <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-900/60 border border-slate-800">
            <img
              src="/src/assets/images/sarah_morgan_avatar_1790658730802.jpg"
              alt="Sarah Morgan"
              className="w-9 h-9 rounded-lg object-cover border border-slate-700 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold text-white truncate">
                Sarah Morgan
              </div>
              <div className="text-[11px] text-slate-400 truncate">
                AP Operations Manager
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400 shrink-0 shadow-[0_0_6px_#34d399]" />
          </div>

          <button
            onClick={navigateToWebsite}
            className="w-full mt-2 flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-lg text-[11px] text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors"
          >
            <ArrowLeft className="w-3 h-3" />
            <span>Back to Public Website</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
        {/* TOP BAR */}
        <header className="sticky top-0 z-30 h-16 bg-slate-950/90 backdrop-blur-xl border-b border-slate-800/80 px-3 sm:px-6 flex items-center justify-between gap-2 sm:gap-4">
          {/* Left: Mobile trigger, Brand Logo (mobile) & Breadcrumbs */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden text-slate-300 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 cursor-pointer"
              aria-label="Open navigation drawer"
            >
              <Menu className="w-5 h-5" />
            </button>

            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center shrink-0">
              <button onClick={() => setActiveConsoleTab('dashboard')} className="cursor-pointer">
                <FinSightLogo size="sm" />
              </button>
            </div>

            <div className="hidden sm:flex text-xs text-slate-400 items-center gap-1.5 truncate">
              <ChevronRight className="w-3.5 h-3.5 text-slate-600 shrink-0" />
              <span className="text-indigo-400 font-medium truncate">{getBreadcrumbTitle()}</span>
            </div>
          </div>

          {/* Right: Global Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3">
            {/* Global Search Input (Desktop) */}
            <div className="relative hidden md:block w-52 lg:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Search invoices, POs, vendors..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
              />
            </div>

            {/* Mobile Search Toggle */}
            <button
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Global AI Copilot Button: "✦ Ask FinSight" */}
            <button
              onClick={() => openCopilotWithPrompt('')}
              className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white text-xs font-semibold shadow-md shadow-indigo-600/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Ask FinSight</span>
              <span className="sm:hidden text-[11px]">Ask</span>
            </button>

            {/* Notifications Popover Toggle */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="relative p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
              </button>

              {showNotifications && (
                <div className="fixed sm:absolute right-2 sm:right-0 top-16 sm:top-full mt-1 w-[calc(100vw-1rem)] max-w-xs sm:w-80 p-3 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl z-50">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <span className="text-xs font-bold text-white">Notifications (3 New)</span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-[10px] text-slate-400 hover:text-white"
                    >
                      Clear all
                    </button>
                  </div>
                  <div className="mt-2 space-y-2 text-xs">
                    <div 
                      onClick={() => {
                        setShowNotifications(false);
                        setActiveConsoleTab('exception-detail');
                      }}
                      className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <div className="font-semibold text-rose-300">High Risk Exception Flagged</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">INV-28491 (ABC Supplies) rate variance exceeds 2.0% tolerance.</div>
                    </div>
                    <div 
                      onClick={() => {
                        setShowNotifications(false);
                        setActiveConsoleTab('risk');
                      }}
                      className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <div className="font-semibold text-amber-300">Duplicate Payment Quarantined</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">INV-28520 has 98% match with previously settled invoice.</div>
                    </div>
                    <div 
                      onClick={() => {
                        setShowNotifications(false);
                        setActiveConsoleTab('risk');
                      }}
                      className="p-2 rounded-lg bg-slate-800/60 hover:bg-slate-800 cursor-pointer transition-colors"
                    >
                      <div className="font-semibold text-emerald-300">Early Settlement Opportunity</div>
                      <div className="text-[11px] text-slate-400 mt-0.5">2% prompt discount available (₹18,400 potential savings).</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Profile Thumbnail */}
            <div className="relative lg:hidden">
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="p-0.5 rounded-lg border border-slate-700 cursor-pointer"
                aria-label="User Profile"
              >
                <img
                  src="/src/assets/images/sarah_morgan_avatar_1790658730802.jpg"
                  alt="Sarah Morgan"
                  className="w-7 h-7 rounded object-cover"
                />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-52 p-3 bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl backdrop-blur-xl z-50 animate-in fade-in">
                  <div className="pb-2 border-b border-slate-800">
                    <div className="text-xs font-bold text-white">Sarah Morgan</div>
                    <div className="text-[11px] text-slate-400">AP Operations Manager</div>
                  </div>
                  <div className="mt-2 space-y-1">
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        setActiveConsoleTab('settings');
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg"
                    >
                      Settings & Profile
                    </button>
                    <button
                      onClick={() => {
                        setShowUserMenu(false);
                        navigateToWebsite();
                      }}
                      className="w-full text-left px-2 py-1.5 text-xs text-indigo-400 hover:text-indigo-300 hover:bg-slate-800 rounded-lg flex items-center gap-1.5"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Back to Public Site</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Help / Guidance (Desktop) */}
            <button
              onClick={() => setActiveConsoleTab('knowledge')}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors cursor-pointer hidden md:block"
              title="Knowledge Base & SOPs"
            >
              <HelpCircle className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Mobile Search Overlay Bar */}
        {isMobileSearchOpen && (
          <div className="sticky top-16 z-20 p-3 bg-slate-900 border-b border-slate-800 shadow-xl md:hidden animate-in slide-in-from-top-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search invoices, POs, vendors..."
                className="w-full pl-9 pr-8 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                autoFocus
              />
              <button
                onClick={() => setIsMobileSearchOpen(false)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* VIEWPORT CANVAS */}
        <main className="flex-1 p-3 sm:p-6 lg:p-8 bg-slate-900/50">
          {children}
        </main>
      </div>

      {/* COPILOT DRAWER */}
      <CopilotDrawer />
    </div>
  );
};
