import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { mockKnowledgeArticles } from '../../data/mockData';
import { 
  BookOpen, 
  Search, 
  FileText, 
  ArrowRight, 
  Sparkles, 
  ExternalLink 
} from 'lucide-react';

export const KnowledgeView: React.FC = () => {
  const { setSelectedExceptionId, setActiveConsoleTab } = useApp();
  const [searchTerm, setSearchTerm] = useState('price mismatch');

  const filteredArticles = mockKnowledgeArticles.filter(art =>
    art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    art.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    art.summary.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Resolution Knowledge Center
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Institutional resolution memory: standard operating procedures, historical case precedents, and policy guidelines.
        </p>
      </div>

      {/* Search Input Bar */}
      <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3">
        <Search className="w-5 h-5 text-indigo-400 shrink-0" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search SOPs, case precedents, policy rules (e.g. 'price mismatch')..."
          className="flex-1 bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="text-xs text-slate-400 hover:text-white"
          >
            Clear
          </button>
        )}
      </div>

      {/* Precedent Quick Links */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="text-slate-500">Popular queries:</span>
        {['price mismatch', 'missing grn', 'reverse charge gst', 'non-po saas'].map(tag => (
          <button
            key={tag}
            onClick={() => setSearchTerm(tag)}
            className="px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 hover:text-white transition-colors cursor-pointer border border-slate-700/60"
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            className="p-6 rounded-2xl bg-slate-900 border border-slate-800 shadow-sm hover:border-slate-700 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                <span className="text-cyan-400 font-semibold">{art.category}</span>
                <span className="font-mono">{art.readTime} read</span>
              </div>
              <h3 className="text-base font-bold text-white tracking-tight">
                {art.title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                {art.summary}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono">
                {art.precedentsCount} precedent cases indexed
              </span>
              <button
                onClick={() => {
                  setSelectedExceptionId('INV-28491');
                  setActiveConsoleTab('exception-detail');
                }}
                className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Open Precedent #EX-19382</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
