import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { ExceptionType, Priority, RiskLevel } from '../../types';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Download, 
  Bookmark, 
  AlertCircle,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

export const ExceptionsView: React.FC = () => {
  const { exceptions, setActiveConsoleTab, setSelectedExceptionId, addToast } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [selectedSavedView, setSelectedSavedView] = useState<string>('All');

  // Filtered exceptions
  const filteredExceptions = exceptions.filter(exc => {
    // Search match
    const matchesSearch = 
      exc.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exc.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exc.exceptionType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      exc.assignedTo.toLowerCase().includes(searchTerm.toLowerCase());

    // Filter type
    const matchesType = selectedType === 'All' || exc.exceptionType === selectedType;

    // Filter priority
    const matchesPriority = selectedPriority === 'All' || exc.priority === selectedPriority;

    // Saved views
    if (selectedSavedView === 'High Priority' && exc.priority !== 'High' && exc.priority !== 'Critical') return false;
    if (selectedSavedView === 'Price Mismatch' && exc.exceptionType !== 'Price Mismatch') return false;
    if (selectedSavedView === 'Pending Approval' && exc.status !== 'Pending Approval') return false;

    return matchesSearch && matchesType && matchesPriority;
  });

  const handleExportCSV = () => {
    addToast({
      type: 'info',
      title: 'Export Generated',
      message: `Exported ${filteredExceptions.length} AP exceptions to CSV.`
    });
  };

  const handleRowClick = (invoiceNumber: string) => {
    setSelectedExceptionId(invoiceNumber);
    setActiveConsoleTab('exception-detail');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">
            Exceptions
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            142 issues requiring attention across active invoice streams.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Saved Views Segmented Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-medium mr-1 flex items-center gap-1">
          <Bookmark className="w-3.5 h-3.5" />
          <span>Views:</span>
        </span>
        {[
          { label: 'All (142)', val: 'All' },
          { label: 'High Priority (28)', val: 'High Priority' },
          { label: 'Price Mismatches (39)', val: 'Price Mismatch' },
          { label: 'Pending Approval (18)', val: 'Pending Approval' }
        ].map((view) => (
          <button
            key={view.val}
            onClick={() => setSelectedSavedView(view.val)}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors cursor-pointer whitespace-nowrap ${
              selectedSavedView === view.val
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'bg-slate-800/80 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            {view.label}
          </button>
        ))}
      </div>

      {/* Filter & Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3 flex-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by invoice #, vendor, type or assignee..."
              className="w-full pl-9 pr-4 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
            />
          </div>

          {/* Exception Type Dropdown */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="All">All Exception Types</option>
            <option value="Price Mismatch">Price Mismatch</option>
            <option value="Missing GRN">Missing GRN</option>
            <option value="Tax Discrepancy">Tax Discrepancy</option>
            <option value="Quantity Discrepancy">Quantity Discrepancy</option>
            <option value="Duplicate Invoice">Duplicate Invoice</option>
            <option value="Payment Term Conflict">Payment Term Conflict</option>
            <option value="Non-PO Expense">Non-PO Expense</option>
          </select>

          {/* Priority Dropdown */}
          <select
            value={selectedPriority}
            onChange={(e) => setSelectedPriority(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 bg-slate-800/80 border border-slate-700 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-indigo-500 cursor-pointer"
          >
            <option value="All">All Priorities</option>
            <option value="Critical">Critical</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          Showing <span className="text-white font-semibold">{filteredExceptions.length}</span> matching cases
        </div>
      </div>

      {/* Main Table Container */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 shadow-sm overflow-hidden">
        {/* Mobile Exception Cards List (< md screens) */}
        <div className="block md:hidden divide-y divide-slate-800/80">
          {filteredExceptions.map((exc) => {
            const priorityBadge = 
              exc.priority === 'Critical' ? 'bg-rose-500/20 text-rose-300 border-rose-500/30' :
              exc.priority === 'High' ? 'bg-amber-500/20 text-amber-300 border-amber-500/30' :
              'bg-slate-800 text-slate-300 border-slate-700';

            const statusStyles = {
              'Investigating': 'text-purple-300 bg-purple-950/40 border-purple-500/30',
              'Pending Approval': 'text-amber-300 bg-amber-950/40 border-amber-500/30',
              'Recommendation Ready': 'text-cyan-300 bg-cyan-950/40 border-cyan-500/30',
              'Resolved': 'text-emerald-300 bg-emerald-950/40 border-emerald-500/30',
              'Detected': 'text-slate-300 bg-slate-800 border-slate-700',
              'Vendor Contacted': 'text-blue-300 bg-blue-950/40 border-blue-500/30',
              'Escalated': 'text-rose-300 bg-rose-950/40 border-rose-500/30'
            };

            return (
              <div
                key={exc.id}
                onClick={() => handleRowClick(exc.invoiceNumber)}
                className="p-4 hover:bg-slate-800/50 active:bg-slate-800/70 transition-colors cursor-pointer space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-sm">{exc.invoiceNumber}</span>
                    <span className={`text-[10px] font-semibold font-mono px-2 py-0.5 rounded-full border ${priorityBadge}`}>
                      {exc.priority}
                    </span>
                  </div>
                  <span className="text-sm font-mono font-bold text-white">
                    {exc.currency}{exc.amount.toLocaleString()}
                  </span>
                </div>

                <div>
                  <div className="text-xs font-semibold text-slate-200">{exc.vendorName}</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">{exc.exceptionType} · Assigned: {exc.assignedTo}</div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800/60">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-medium border ${statusStyles[exc.status] || 'text-slate-300'}`}>
                      {exc.status}
                    </span>
                    <span className={exc.dueDate === 'Today' ? 'text-rose-400 font-semibold text-[11px]' : 'text-slate-400 text-[11px]'}>
                      Due {exc.dueDate}
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRowClick(exc.invoiceNumber);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inspect</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Table (>= md screens) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/70 border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider text-[11px]">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Priority</th>
                <th className="py-3.5 px-4">Invoice #</th>
                <th className="py-3.5 px-4">Vendor</th>
                <th className="py-3.5 px-4">Exception Type</th>
                <th className="py-3.5 px-4 text-right">Amount</th>
                <th className="py-3.5 px-4">Age</th>
                <th className="py-3.5 px-4">Due Date</th>
                <th className="py-3.5 px-4">Risk</th>
                <th className="py-3.5 px-4">Assigned To</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredExceptions.map((exc) => {
                const priorityStyles = {
                  Critical: 'text-rose-400 font-semibold',
                  High: 'text-amber-400 font-semibold',
                  Medium: 'text-blue-400',
                  Low: 'text-slate-400'
                };

                const statusStyles = {
                  'Investigating': 'text-purple-300 bg-purple-950/40 border-purple-500/30',
                  'Pending Approval': 'text-amber-300 bg-amber-950/40 border-amber-500/30',
                  'Recommendation Ready': 'text-cyan-300 bg-cyan-950/40 border-cyan-500/30',
                  'Resolved': 'text-emerald-300 bg-emerald-950/40 border-emerald-500/30',
                  'Detected': 'text-slate-300 bg-slate-800 border-slate-700',
                  'Vendor Contacted': 'text-blue-300 bg-blue-950/40 border-blue-500/30',
                  'Escalated': 'text-rose-300 bg-rose-950/40 border-rose-500/30'
                };

                return (
                  <tr
                    key={exc.id}
                    onClick={() => handleRowClick(exc.invoiceNumber)}
                    className="hover:bg-slate-800/50 transition-colors cursor-pointer group"
                  >
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <span className={priorityStyles[exc.priority]}>
                        {exc.priority}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="font-mono font-semibold text-white group-hover:text-indigo-400 transition-colors">
                        {exc.invoiceNumber}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-slate-200">
                      {exc.vendorName}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className="text-slate-300 font-medium">
                        {exc.exceptionType}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-right font-mono font-bold text-white tabular-nums">
                      {exc.currency}{exc.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-slate-400">
                      {exc.ageDays} {exc.ageDays === 1 ? 'day' : 'days'}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={exc.dueDate === 'Today' ? 'text-rose-400 font-semibold' : 'text-slate-300'}>
                        {exc.dueDate}
                      </span>
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-slate-300">
                      {exc.risk}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap text-slate-300">
                      {exc.assignedTo}
                    </td>
                    <td className="py-4 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-medium border ${statusStyles[exc.status] || 'text-slate-300'}`}>
                        {exc.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(exc.invoiceNumber);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium group-hover:bg-indigo-600 group-hover:text-white transition-colors"
                      >
                        Inspect →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
