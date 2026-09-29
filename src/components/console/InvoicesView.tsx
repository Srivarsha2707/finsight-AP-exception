import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  UploadCloud, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Layers, 
  Cpu, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const InvoicesView: React.FC = () => {
  const { invoices, setActiveConsoleTab, setSelectedExceptionId, addToast } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string>(invoices[0].id);
  const [mobileTab, setMobileTab] = useState<'queue' | 'detail'>('queue');

  const activeInvoice = invoices.find(inv => inv.id === selectedInvoiceId) || invoices[0];

  const handleSimulateUpload = () => {
    setIsUploading(true);
    setTimeout(() => {
      setIsUploading(false);
      addToast({
        type: 'success',
        title: 'Invoice Parsed & Reconciled',
        message: 'New invoice INV-28565 extracted with 99.1% OCR confidence and matched against PO-88420.'
      });
    }, 1200);
  };

  const filteredInvoices = invoices.filter(inv =>
    inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inv.vendorName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header & Ingestion Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Invoices & Ingestion Intelligence
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Automated OCR extraction, 2-way/3-way matching, and non-PO GL coding.
          </p>
        </div>

        <button
          onClick={handleSimulateUpload}
          disabled={isUploading}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-600 via-blue-600 to-teal-500 hover:from-indigo-500 hover:to-teal-400 text-white text-xs font-semibold shadow-md shadow-indigo-600/25 transition-all cursor-pointer disabled:opacity-60"
        >
          <UploadCloud className="w-4 h-4" />
          <span>{isUploading ? 'Extracting via Neural OCR...' : 'Upload / Ingest Invoice'}</span>
        </button>
      </div>

      {/* NON-PO INTELLIGENCE SPOTLIGHT CARD */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-indigo-950/70 to-slate-900 border border-indigo-500/30 shadow-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Non-PO Autonomous GL Coding</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight mt-1">
              CloudScale Systems (INV-28533) · ₹1,98,000
            </h3>
            <p className="text-xs text-slate-300 mt-1">
              Invoice received without a purchase order. FinSight analyzed historical invoices and generated coding recommendation:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 w-full lg:w-auto">
            <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs">
              <div className="text-[10px] text-slate-400">Recommended GL Account</div>
              <div className="font-mono font-bold text-white">6200 – Professional Services</div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs">
              <div className="text-[10px] text-slate-400">Cost Center & Dept</div>
              <div className="font-semibold text-white">Engineering (IT)</div>
            </div>
            <div className="px-3 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs">
              <div className="text-[10px] text-emerald-400">Confidence</div>
              <div className="font-mono font-bold text-emerald-300">91% (42 cases)</div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE MASTER-DETAIL TAB SELECTOR */}
      <div className="flex lg:hidden items-center p-1 bg-slate-950 rounded-xl border border-slate-800 text-xs font-semibold">
        <button
          onClick={() => setMobileTab('queue')}
          className={`flex-1 py-2.5 rounded-lg transition-colors cursor-pointer text-center ${
            mobileTab === 'queue' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Invoice Queue ({filteredInvoices.length})
        </button>
        <button
          onClick={() => setMobileTab('detail')}
          className={`flex-1 py-2.5 rounded-lg transition-colors cursor-pointer text-center ${
            mobileTab === 'detail' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
          }`}
        >
          Parsed OCR ({activeInvoice.invoiceNumber})
        </button>
      </div>

      {/* INVOICES MASTER-DETAIL LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Invoice Queue */}
        <div className={`${mobileTab === 'queue' ? 'flex' : 'hidden lg:flex'} lg:col-span-5 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex-col`}>
          <div className="p-4 border-b border-slate-800">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search invoices by number or vendor..."
                className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="divide-y divide-slate-800/80 overflow-y-auto max-h-[580px]">
            {filteredInvoices.map((inv) => {
              const isSelected = inv.id === selectedInvoiceId;
              return (
                <div
                  key={inv.id}
                  onClick={() => {
                    setSelectedInvoiceId(inv.id);
                    setMobileTab('detail');
                  }}
                  className={`p-4 transition-colors cursor-pointer ${
                    isSelected ? 'bg-indigo-950/50 border-l-2 border-indigo-400' : 'hover:bg-slate-800/40'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-mono font-bold text-white">{inv.invoiceNumber}</span>
                    <span className="font-mono font-bold text-slate-200">
                      {inv.currency}{inv.total.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-slate-300 mt-1 font-medium">{inv.vendorName}</div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Terms: {inv.paymentTerms}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      inv.matchStatus === '3-Way Matched'
                        ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/30'
                        : inv.matchStatus === 'Non-PO'
                        ? 'bg-purple-500/10 text-purple-300 border border-purple-500/30'
                        : 'bg-rose-500/10 text-rose-300 border border-rose-500/30'
                    }`}>
                      {inv.matchStatus}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected Invoice Detail & OCR Extraction Preview */}
        <div className={`${mobileTab === 'detail' ? 'flex' : 'hidden lg:flex'} lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 p-4 sm:p-6 shadow-sm flex-col justify-between`}>
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  OCR Extraction Sheet
                </span>
                <h2 className="text-xl font-bold text-white font-mono mt-0.5">
                  {activeInvoice.invoiceNumber}
                </h2>
              </div>
              {activeInvoice.exceptionStatus && (
                <button
                  onClick={() => {
                    setSelectedExceptionId(activeInvoice.invoiceNumber);
                    setActiveConsoleTab('exception-detail');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <span>Open in Exception Detail</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 text-xs">
              <div>
                <div className="text-slate-500">Vendor</div>
                <div className="font-semibold text-white mt-0.5">{activeInvoice.vendorName}</div>
              </div>
              <div>
                <div className="text-slate-500">Invoice Date</div>
                <div className="font-mono text-white mt-0.5">{activeInvoice.invoiceDate}</div>
              </div>
              <div>
                <div className="text-slate-500">Due Date</div>
                <div className="font-mono text-white mt-0.5">{activeInvoice.dueDate}</div>
              </div>
              <div>
                <div className="text-slate-500">PO Ref</div>
                <div className="font-mono text-indigo-400 mt-0.5">{activeInvoice.poNumber || 'NON-PO'}</div>
              </div>
            </div>

            {/* Financial Summary */}
            <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 space-y-2 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span className="font-mono text-white">₹{activeInvoice.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>GST Tax (Applicable):</span>
                <span className="font-mono text-white">₹{activeInvoice.tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-slate-800">
                <span>Total Invoiced:</span>
                <span className="font-mono text-cyan-300">₹{activeInvoice.total.toLocaleString()}</span>
              </div>
            </div>

            {/* Line items list if available */}
            {activeInvoice.lineItems.length > 0 && (
              <div className="mt-5">
                <div className="text-xs font-semibold text-slate-400 mb-2">Parsed Line Items:</div>
                <div className="rounded-xl border border-slate-800 overflow-hidden text-xs">
                  <div className="p-3 bg-slate-950/70 border-b border-slate-800 flex justify-between font-semibold text-slate-400 text-[11px]">
                    <span>Item & Description</span>
                    <span>Qty × Rate</span>
                  </div>
                  {activeInvoice.lineItems.map((li) => (
                    <div key={li.id} className="p-3 flex justify-between items-center text-slate-200">
                      <div>
                        <div className="font-mono font-semibold text-white">{li.itemCode}</div>
                        <div className="text-[11px] text-slate-400">{li.description}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-white">{li.invoiceQty} units @ ₹{li.invoiceUnitPrice}</div>
                        <div className="text-[10px] text-rose-400">PO: ₹{li.poUnitPrice} (+{li.unitVariancePct}%)</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] text-slate-500 flex justify-between">
            <span>Extraction Model: FinSight OCR 2026</span>
            <span>Security: SHA-256 Verified Payload</span>
          </div>
        </div>
      </div>
    </div>
  );
};
