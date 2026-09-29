import React, { createContext, useContext, useState, ReactNode } from 'react';
import { APException, ApprovalItem, AuditLogEntry, Supplier, Invoice } from '../types';
import { mockExceptions, mockSuppliers, mockInvoices, mockApprovals, mockAuditTimeline, FLAGSHIP_EXCEPTION_ID } from '../data/mockData';

export type ActiveConsoleTab = 
  | 'dashboard'
  | 'exceptions'
  | 'exception-detail'
  | 'invoices'
  | 'approvals'
  | 'investigation'
  | 'hindsight'
  | 'suppliers'
  | 'contracts'
  | 'knowledge'
  | 'analytics'
  | 'risk'
  | 'prevention'
  | 'audit'
  | 'policies'
  | 'integrations'
  | 'settings';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  message: string;
}

interface AppContextType {
  currentView: 'website' | 'console';
  setCurrentView: (view: 'website' | 'console') => void;
  activeConsoleTab: ActiveConsoleTab;
  setActiveConsoleTab: (tab: ActiveConsoleTab) => void;
  selectedExceptionId: string;
  setSelectedExceptionId: (id: string) => void;
  selectedSupplierId: string;
  setSelectedSupplierId: (id: string) => void;
  
  exceptions: APException[];
  suppliers: Supplier[];
  invoices: Invoice[];
  approvals: ApprovalItem[];
  auditLogs: AuditLogEntry[];
  
  // Modals & Drawers
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  copilotInitialPrompt: string;
  setCopilotInitialPrompt: (prompt: string) => void;
  openCopilotWithPrompt: (prompt: string) => void;
  
  isDemoModalOpen: boolean;
  setIsDemoModalOpen: (open: boolean) => void;
  
  // Navigation helper
  navigateToConsole: (tab?: ActiveConsoleTab, exceptionId?: string) => void;
  navigateToWebsite: () => void;
  
  // Actions
  resolveException: (exceptionId: string, resolutionAction: string, note?: string) => void;
  approveRecommendation: (exceptionId: string, comments?: string) => void;
  sendVendorInquiry: (exceptionId: string, emailBody: string) => void;
  
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'website' | 'console'>('website');
  const [activeConsoleTab, setActiveConsoleTab] = useState<ActiveConsoleTab>('dashboard');
  const [selectedExceptionId, setSelectedExceptionId] = useState<string>(FLAGSHIP_EXCEPTION_ID);
  const [selectedSupplierId, setSelectedSupplierId] = useState<string>('VND-10042');
  
  const [exceptions, setExceptions] = useState<APException[]>(mockExceptions);
  const [suppliers] = useState<Supplier[]>(mockSuppliers);
  const [invoices] = useState<Invoice[]>(mockInvoices);
  const [approvals, setApprovals] = useState<ApprovalItem[]>(mockApprovals);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(mockAuditTimeline);
  
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [copilotInitialPrompt, setCopilotInitialPrompt] = useState<string>('');
  const [isDemoModalOpen, setIsDemoModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const openCopilotWithPrompt = (prompt: string) => {
    setCopilotInitialPrompt(prompt);
    setIsCopilotOpen(true);
  };

  const navigateToConsole = (tab: ActiveConsoleTab = 'dashboard', exceptionId?: string) => {
    setCurrentView('console');
    setActiveConsoleTab(tab);
    if (exceptionId) {
      setSelectedExceptionId(exceptionId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToWebsite = () => {
    setCurrentView('website');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const approveRecommendation = (exceptionId: string, comments: string = 'Approved by AP Operations Manager') => {
    setExceptions(prev => prev.map(exc => {
      if (exc.invoiceNumber === exceptionId || exc.id === exceptionId) {
        return {
          ...exc,
          status: 'Resolved',
          auditHistory: [
            {
              id: 'aud-' + Date.now(),
              timestamp: 'Just now',
              actorType: 'Human',
              actorName: 'Sarah Morgan (AP Ops Manager)',
              action: 'Approved AI Recommendation',
              details: `Recommendation approved: "${exc.aiRecommendation}". Comments: ${comments}`
            },
            ...exc.auditHistory
          ]
        };
      }
      return exc;
    }));

    // Update approvals queue
    setApprovals(prev => prev.map(app => 
      (app.invoiceNumber === exceptionId || app.exceptionId === exceptionId) 
        ? { ...app, status: 'Approved' } 
        : app
    ));

    // Append to global audit log
    const newLog: AuditLogEntry = {
      id: 'log-' + Date.now(),
      timestamp: 'Just now',
      actorType: 'Human',
      actorName: 'Sarah Morgan (AP Ops Manager)',
      action: 'Recommendation Approved & Exception Resolved',
      details: `Resolution action executed for ${exceptionId}. Corrected invoice dispatch protocol initiated.`,
      referenceId: exceptionId
    };
    setAuditLogs(prev => [newLog, ...prev]);

    addToast({
      type: 'success',
      title: 'Exception Resolved',
      message: `AI recommendation for ${exceptionId} approved. Vendor notification dispatched.`
    });
  };

  const resolveException = (exceptionId: string, resolutionAction: string, note?: string) => {
    setExceptions(prev => prev.map(exc => {
      if (exc.invoiceNumber === exceptionId || exc.id === exceptionId) {
        return {
          ...exc,
          status: 'Resolved',
          auditHistory: [
            {
              id: 'aud-' + Date.now(),
              timestamp: 'Just now',
              actorType: 'Human',
              actorName: 'Sarah Morgan',
              action: resolutionAction,
              details: note || 'Resolved in FinSight Operations Console'
            },
            ...exc.auditHistory
          ]
        };
      }
      return exc;
    }));

    addToast({
      type: 'success',
      title: 'Case Updated',
      message: `${exceptionId} marked as resolved: ${resolutionAction}`
    });
  };

  const sendVendorInquiry = (exceptionId: string, emailBody: string) => {
    setExceptions(prev => prev.map(exc => {
      if (exc.invoiceNumber === exceptionId || exc.id === exceptionId) {
        return {
          ...exc,
          status: 'Vendor Contacted',
          auditHistory: [
            {
              id: 'aud-' + Date.now(),
              timestamp: 'Just now',
              actorType: 'Human',
              actorName: 'Sarah Morgan',
              action: 'Dispatched Inquiry to Vendor',
              details: `Sent notification regarding unit price variance: ${emailBody.substring(0, 100)}...`
            },
            ...exc.auditHistory
          ]
        };
      }
      return exc;
    }));

    addToast({
      type: 'info',
      title: 'Vendor Inquiry Sent',
      message: `Direct notice delivered to ABC Supplies Key Account Desk.`
    });
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        activeConsoleTab,
        setActiveConsoleTab,
        selectedExceptionId,
        setSelectedExceptionId,
        selectedSupplierId,
        setSelectedSupplierId,
        exceptions,
        suppliers,
        invoices,
        approvals,
        auditLogs,
        isCopilotOpen,
        setIsCopilotOpen,
        copilotInitialPrompt,
        setCopilotInitialPrompt,
        openCopilotWithPrompt,
        isDemoModalOpen,
        setIsDemoModalOpen,
        navigateToConsole,
        navigateToWebsite,
        resolveException,
        approveRecommendation,
        sendVendorInquiry,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
