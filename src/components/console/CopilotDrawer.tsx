import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Sparkles, 
  Send, 
  FileText, 
  CheckCircle2, 
  ExternalLink,
  MessageSquare,
  Mail,
  AlertTriangle
} from 'lucide-react';

interface CopilotMessage {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: string;
  citations?: string[];
  actionBtn?: {
    label: string;
    actionType: 'approve' | 'email' | 'inspect';
  };
}

export const CopilotDrawer: React.FC = () => {
  const { 
    isCopilotOpen, 
    setIsCopilotOpen, 
    copilotInitialPrompt, 
    selectedExceptionId,
    exceptions,
    approveRecommendation,
    sendVendorInquiry
  } = useApp();

  const currentException = exceptions.find(e => e.invoiceNumber === selectedExceptionId) || exceptions[0];

  const [inputQuery, setInputQuery] = useState('');
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'm-init',
      sender: 'assistant',
      text: `Hello Sarah. I am analyzing ${currentException.invoiceNumber} (${currentException.vendorName}). What would you like to investigate?`,
      timestamp: 'Just now',
      citations: ['PO-88219', 'MSA-2025-ABC (§4.2)', 'GRN-44910']
    }
  ]);

  const presetQuestions = [
    'Why is this invoice blocked?',
    'Show supporting evidence.',
    'What should I do next?',
    'Find similar cases.',
    'What is the financial impact?',
    'Draft an email to the supplier.',
    'Summarize this exception.'
  ];

  // Handle initial prompt passed from outside
  useEffect(() => {
    if (copilotInitialPrompt && isCopilotOpen) {
      handleUserQuery(copilotInitialPrompt);
    }
  }, [copilotInitialPrompt, isCopilotOpen]);

  const generateAnswer = (query: string): Omit<CopilotMessage, 'id' | 'sender' | 'timestamp'> => {
    const q = query.toLowerCase();

    if (q.includes('why') || q.includes('blocked') || q.includes('reason')) {
      return {
        text: `Invoice #${currentException.invoiceNumber} is blocked due to a Price Mismatch:
• Billed Rate: ₹1,240/unit on SKU-IND-7712
• Purchase Order (PO-88219) Rate: ₹1,180/unit
• Variance: +5.08%, exceeding your configured 2.0% tolerance.
• Legal Contract (MSA-2025-ABC §4.2) locks rate at ₹1,180 through Q4 2026.
Payment is automatically held in ERP to prevent an overpayment of ₹86,400.`,
        citations: ['INV-28491 (Line 1)', 'PO-88219', 'MSA-2025-ABC §4.2'],
        actionBtn: {
          label: 'Approve AI Recommendation (Request Corrected Invoice)',
          actionType: 'approve'
        }
      };
    }

    if (q.includes('evidence') || q.includes('proof')) {
      return {
        text: `FinSight gathered 6 verified pieces of evidence:
1. Invoice #INV-28491: Unit price ₹1,240 for 100 units.
2. PO #PO-88219: Authorized rate ₹1,180 signed by Procurement.
3. GRN #GRN-44910: 95 units physically received on dock (5 in quarantine).
4. Master Agreement: MSA-2025-ABC clause §4.2 confirms price protection.
5. Vendor Ledger: ABC Supplies exhibits a 9.5% historical exception rate.
6. Vector Precedents: Case #EX-19382 with identical ERP sync error.`,
        citations: ['MSA-2025-ABC §4.2', 'PO-88219', 'GRN-44910', 'Vendor Master']
      };
    }

    if (q.includes('email') || q.includes('draft') || q.includes('supplier') || q.includes('vendor')) {
      return {
        text: `Here is the pre-composed dispute draft for Rajesh Nair at ABC Supplies:

Subject: Price Discrepancy Notice: Invoice INV-28491 against PO-88219

Dear ABC Supplies Accounts Team,

During automated 3-way reconciliation of Invoice #INV-28491, our system identified a unit price of ₹1,240 on SKU-IND-7712. 
As stipulated in PO-88219 and Master Services Agreement MSA-2025-ABC (§4.2), the agreed unit price is ₹1,180.

Please issue a revised invoice or credit note for the difference of ₹6,000 (pre-tax) so we may process immediate settlement.

Best regards,
Sarah Morgan | AP Operations`,
        citations: ['Contact: accounts@abcsupplies.com', 'MSA §4.2'],
        actionBtn: {
          label: 'Send Dispute Notice to ABC Supplies Desk',
          actionType: 'email'
        }
      };
    }

    if (q.includes('similar') || q.includes('cases') || q.includes('history')) {
      return {
        text: `Found 2 high-similarity historical precedents in enterprise archives:
• Case #EX-19382 (92% match) - ABC Supplies Ltd.: Vendor ERP pricing table sync bug. Resolved in 1.2 days via corrected invoice.
• Case #EX-18421 (87% match) - TechNova Solutions: Emergency order surcharge. Resolved in 2.1 days via PO amendment.
Based on this history, requesting a corrected invoice has an 89% first-attempt success rate with ABC Supplies.`,
        citations: ['Case #EX-19382', 'Case #EX-18421']
      };
    }

    if (q.includes('impact') || q.includes('financial') || q.includes('risk')) {
      return {
        text: `Financial impact analysis for ${currentException.invoiceNumber}:
• Total Invoice Face Value: ₹86,400
• Overpayment Exposure: ₹6,000 direct rate variance + ₹1,180 GST delta
• Cash Flow Status: Payment halted at ERP staging gate
• Early Payment Discount: 2% cash discount (₹18,400) available if resolved before Oct 12.`,
        citations: ['SAP Payment Gate', 'ERP Cash Terms']
      };
    }

    if (q.includes('what should i do') || q.includes('next') || q.includes('recommend')) {
      return {
        text: `FinSight recommends: "Request a corrected invoice from the supplier."
Confidence: 92%.
Rationale:
1. Vendor contract legally confirms ₹1,180 pricing.
2. Similar Case #EX-19382 took only 1.2 days to receive a revised invoice.
3. Overpayment is prevented while preserving early settlement discount.`,
        citations: ['Decision Model v4', 'MSA-2025-ABC §4.2'],
        actionBtn: {
          label: 'Execute Recommendation Now',
          actionType: 'approve'
        }
      };
    }

    // Default summary
    return {
      text: `Summary of ${currentException.invoiceNumber} from ${currentException.vendorName}:
• Issue: Price Mismatch (+5.08% over PO rate).
• Financial Impact: ₹86,400 face value.
• Root Cause: Vendor billed ₹1,240 instead of contract rate ₹1,180.
• Recommended Action: Request corrected invoice.
Would you like me to approve this recommendation or draft an inquiry email?`,
      citations: ['INV-28491', 'PO-88219', 'MSA-2025-ABC'],
      actionBtn: {
        label: 'Approve Recommendation',
        actionType: 'approve'
      }
    };
  };

  const handleUserQuery = (text: string) => {
    if (!text.trim()) return;

    const userMsg: CopilotMessage = {
      id: 'usr-' + Date.now(),
      sender: 'user',
      text,
      timestamp: 'Just now'
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');

    // Simulate instant AI copilot response
    setTimeout(() => {
      const resp = generateAnswer(text);
      const aiMsg: CopilotMessage = {
        id: 'ai-' + Date.now(),
        sender: 'assistant',
        text: resp.text,
        timestamp: 'Just now',
        citations: resp.citations,
        actionBtn: resp.actionBtn
      };
      setMessages(prev => [...prev, aiMsg]);
    }, 250);
  };

  const handleActionExecute = (actionType: 'approve' | 'email' | 'inspect') => {
    if (actionType === 'approve') {
      approveRecommendation(currentException.invoiceNumber, 'Approved via Copilot Assistant');
      setMessages(prev => [
        ...prev,
        {
          id: 'ai-done-' + Date.now(),
          sender: 'assistant',
          text: `Action executed: Recommendation approved for ${currentException.invoiceNumber}. Exception status updated to 'Resolved' and logged in the immutable audit trail.`,
          timestamp: 'Just now'
        }
      ]);
    } else if (actionType === 'email') {
      sendVendorInquiry(currentException.invoiceNumber, 'Price discrepancy notice dispatched');
      setMessages(prev => [
        ...prev,
        {
          id: 'ai-email-' + Date.now(),
          sender: 'assistant',
          text: `Email dispatched to ABC Supplies billing desk. Follow-up reminder scheduled in 48 hours if no credit note received.`,
          timestamp: 'Just now'
        }
      ]);
    }
  };

  if (!isCopilotOpen) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div 
        onClick={() => setIsCopilotOpen(false)}
        className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 transition-opacity"
        aria-hidden="true"
      />

      <div className="fixed inset-x-0 bottom-0 top-16 sm:top-0 sm:left-auto sm:right-0 z-50 w-full sm:w-[480px] bg-slate-900 border-t sm:border-t-0 sm:border-l border-slate-800 rounded-t-3xl sm:rounded-none shadow-2xl flex flex-col animate-in slide-in-from-bottom sm:slide-in-from-right duration-200">
        {/* Mobile drag handle */}
        <div className="sm:hidden pt-2.5 pb-1 flex justify-center shrink-0">
          <div className="w-12 h-1.5 rounded-full bg-slate-700/80" />
        </div>

        {/* Drawer Header */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center shadow-sm text-white shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-bold text-white tracking-tight">Ask FinSight</h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 font-mono font-medium">
                  Copilot
                </span>
              </div>
              <p className="text-[11px] text-slate-400 truncate">
                Active Context: <strong className="text-slate-200">{currentException.invoiceNumber}</strong> ({currentException.vendorName})
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCopilotOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors cursor-pointer shrink-0"
            aria-label="Close copilot"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

      {/* Suggested Quick Questions */}
      <div className="px-4 py-2.5 border-b border-slate-800/80 bg-slate-900/50 flex items-center gap-2 overflow-x-auto text-xs no-scrollbar">
        <span className="text-[11px] text-slate-400 shrink-0 font-medium">Quick asks:</span>
        {presetQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleUserQuery(q)}
            className="px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white shrink-0 text-[11px] transition-colors cursor-pointer border border-slate-700/60"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Message Chat Feed */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-[90%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                msg.sender === 'user'
                  ? 'bg-indigo-600 text-white rounded-br-none shadow-md'
                  : 'bg-slate-800/90 text-slate-200 border border-slate-700/70 rounded-bl-none shadow-sm'
              }`}
            >
              {msg.text}

              {/* Citations */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
                    Citations:
                  </span>
                  {msg.citations.map((cite, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded bg-slate-900 text-cyan-300 font-mono text-[10px] border border-slate-700"
                    >
                      {cite}
                    </span>
                  ))}
                </div>
              )}

              {/* Action Button inside response */}
              {msg.actionBtn && (
                <div className="mt-3 pt-2.5 border-t border-slate-700/60">
                  <button
                    onClick={() => handleActionExecute(msg.actionBtn!.actionType)}
                    className="w-full py-2 px-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{msg.actionBtn.label}</span>
                  </button>
                </div>
              )}
            </div>
            <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.timestamp}</span>
          </div>
        ))}
      </div>

      {/* Input query field */}
      <div className="p-3 border-t border-slate-800 bg-slate-950/80 backdrop-blur-md">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleUserQuery(inputQuery);
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask about this exception, evidence or vendor..."
            className="flex-1 px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
          <button
            type="submit"
            disabled={!inputQuery.trim()}
            className="p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:hover:bg-indigo-600 text-white transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
      </div>
    </>
  );
};
