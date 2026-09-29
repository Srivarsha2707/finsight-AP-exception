import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, CheckCircle2, Building, Mail, User, ShieldCheck } from 'lucide-react';

export const RequestDemoModal: React.FC = () => {
  const { isDemoModalOpen, setIsDemoModalOpen, navigateToConsole, addToast } = useApp();
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [company, setCompany] = useState('');
  const [annualInvoiceVolume, setAnnualInvoiceVolume] = useState('25,000 - 100,000');
  const [erpSystem, setErpSystem] = useState('SAP S/4HANA');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isDemoModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!workEmail || !fullName || !company) return;

    setIsSubmitted(true);
    addToast({
      type: 'success',
      title: 'Demo Environment Prepared',
      message: `FinSight enterprise demonstration credentials provisioned for ${company}.`
    });
  };

  const handleLaunchConsoleNow = () => {
    setIsDemoModalOpen(false);
    setIsSubmitted(false);
    navigateToConsole('dashboard');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-y-auto max-h-[92vh] p-5 sm:p-6 md:p-8">
        <button
          onClick={() => {
            setIsDemoModalOpen(false);
            setIsSubmitted(false);
          }}
          className="absolute top-5 right-5 text-slate-400 hover:text-white transition-colors p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-cyan-400 mb-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Enterprise Evaluation</span>
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Request a Guided FinSight Demo
            </h3>
            <p className="text-sm text-slate-400 mt-1.5 leading-relaxed">
              Experience how autonomous AP exception investigation resolves invoice price mismatches, missing GRNs, and duplicate risks.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. David Sterling"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Corporate Work Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="name@enterprise.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Company Name
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      placeholder="Acme Global"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1.5">
                    Core ERP System
                  </label>
                  <select
                    value={erpSystem}
                    onChange={(e) => setErpSystem(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                  >
                    <option value="SAP S/4HANA">SAP S/4HANA</option>
                    <option value="Oracle Fusion">Oracle Fusion</option>
                    <option value="NetSuite">Oracle NetSuite</option>
                    <option value="Coupa">Coupa / Workday</option>
                    <option value="Microsoft Dynamics">Microsoft Dynamics</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Annual Invoiced Volume
                </label>
                <select
                  value={annualInvoiceVolume}
                  onChange={(e) => setAnnualInvoiceVolume(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-800/80 border border-slate-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500 transition-colors"
                >
                  <option value="10,000 - 25,000">10,000 - 25,000 invoices/yr</option>
                  <option value="25,000 - 100,000">25,000 - 100,000 invoices/yr</option>
                  <option value="100,000 - 500,000">100,000 - 500,000 invoices/yr</option>
                  <option value="500,000+">500,000+ enterprise scale</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-5 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white font-semibold text-sm shadow-lg shadow-indigo-600/25 transition-all duration-150 cursor-pointer"
                >
                  Schedule Technical Walkthrough
                </button>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={handleLaunchConsoleNow}
                  className="text-xs text-indigo-400 hover:text-indigo-300 underline underline-offset-4 font-medium"
                >
                  Skip schedule and enter live interactive Operations Console →
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white">Demonstration Requested!</h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              Thank you, {fullName}. Our AP Intelligence Architects will reach out to {workEmail} within one business hour.
            </p>
            <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/60 text-left mt-5 text-xs text-slate-400 space-y-1">
              <div><strong className="text-slate-200">Company:</strong> {company}</div>
              <div><strong className="text-slate-200">ERP Selected:</strong> {erpSystem}</div>
              <div><strong className="text-slate-200">Volume:</strong> {annualInvoiceVolume}</div>
            </div>
            <button
              onClick={handleLaunchConsoleNow}
              className="mt-6 w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold shadow-lg shadow-indigo-600/30 transition-all cursor-pointer"
            >
              Launch Live Operations Console Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
