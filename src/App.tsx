import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { PublicWebsite } from './components/website/PublicWebsite';
import { ConsoleLayout } from './components/console/ConsoleLayout';
import { DashboardView } from './components/console/DashboardView';
import { ExceptionsView } from './components/console/ExceptionsView';
import { ExceptionDetailView } from './components/console/ExceptionDetailView';
import { InvoicesView } from './components/console/InvoicesView';
import { ApprovalsView } from './components/console/ApprovalsView';
import { SuppliersView } from './components/console/SuppliersView';
import { InvestigationView } from './components/console/InvestigationView';
import { HindsightView } from './components/console/HindsightView';
import { AnalyticsView } from './components/console/AnalyticsView';
import { RiskAnomaliesView } from './components/console/RiskAnomaliesView';
import { PreventionView } from './components/console/PreventionView';
import { KnowledgeView } from './components/console/KnowledgeView';
import { AuditLogView } from './components/console/AuditLogView';
import { PoliciesView } from './components/console/PoliciesView';
import { IntegrationsView } from './components/console/IntegrationsView';
import { SettingsView } from './components/console/SettingsView';
import { ToastContainer } from './components/common/ToastContainer';

const AppContent: React.FC = () => {
  const { currentView, activeConsoleTab } = useApp();

  if (currentView === 'website') {
    return (
      <>
        <PublicWebsite />
        <ToastContainer />
      </>
    );
  }

  // Inside Operations Console
  const renderConsoleView = () => {
    switch (activeConsoleTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'exceptions':
        return <ExceptionsView />;
      case 'exception-detail':
        return <ExceptionDetailView />;
      case 'invoices':
        return <InvoicesView />;
      case 'approvals':
        return <ApprovalsView />;
      case 'suppliers':
      case 'contracts':
        return <SuppliersView />;
      case 'investigation':
        return <InvestigationView />;
      case 'hindsight':
        return <HindsightView />;
      case 'analytics':
        return <AnalyticsView />;
      case 'risk':
        return <RiskAnomaliesView />;
      case 'prevention':
        return <PreventionView />;
      case 'knowledge':
        return <KnowledgeView />;
      case 'audit':
        return <AuditLogView />;
      case 'policies':
        return <PoliciesView />;
      case 'integrations':
        return <IntegrationsView />;
      case 'settings':
        return <SettingsView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <ConsoleLayout>
      {renderConsoleView()}
      <ToastContainer />
    </ConsoleLayout>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
