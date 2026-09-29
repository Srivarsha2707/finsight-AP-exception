export type Priority = 'Critical' | 'High' | 'Medium' | 'Low';
export type RiskLevel = 'Critical' | 'High' | 'Medium' | 'Low';
export type ExceptionType = 
  | 'Price Mismatch'
  | 'Missing GRN'
  | 'Quantity Discrepancy'
  | 'Tax Discrepancy'
  | 'Duplicate Invoice'
  | 'Payment Term Conflict'
  | 'Non-PO Expense'
  | 'Vendor Bank Change';

export type ExceptionStatus = 
  | 'Detected'
  | 'Investigating'
  | 'Recommendation Ready'
  | 'Pending Approval'
  | 'Vendor Contacted'
  | 'Resolved'
  | 'Escalated';

export interface LineItem {
  id: string;
  itemCode: string;
  description: string;
  invoiceQty: number;
  poQty: number;
  grnQty: number;
  invoiceUnitPrice: number;
  poUnitPrice: number;
  currency: string;
  unitVariancePct: number;
  totalInvoiceAmount: number;
  totalPoAmount: number;
  status: 'matched' | 'mismatch' | 'partial';
}

export interface MatchData {
  invoiceNumber: string;
  invoiceDate: string;
  poNumber: string;
  poDate: string;
  grnNumber: string;
  grnDate: string;
  currency: string;
  invoiceTotal: number;
  poTotal: number;
  grnTotalUnits: number;
  invoiceTotalUnits: number;
  poTotalUnits: number;
  priceVariancePct: number;
  allowedPriceTolerancePct: number;
  allowedQtyTolerancePct: number;
  lineItems: LineItem[];
}

export interface AIInvestigationStep {
  stepNumber: number;
  title: string;
  description: string;
  evidenceRef: string;
  status: 'completed' | 'in-progress' | 'flagged';
  timestamp: string;
  confidencePct: number;
  findingSummary: string;
}

export interface SimilarCase {
  caseId: string;
  vendor: string;
  exceptionType: ExceptionType;
  similarityPct: number;
  dateResolved: string;
  rootCause: string;
  resolution: string;
  resolutionDays: number;
  resolvedBy: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorType: 'AI' | 'Human' | 'System';
  actorName: string;
  action: string;
  details: string;
  referenceId?: string;
}

export interface Supplier {
  id: string;
  name: string;
  code: string;
  category: string;
  healthScore: number;
  totalInvoices: number;
  exceptionRate: number;
  openExceptions: number;
  avgResolutionDays: number;
  totalSpendYTD: number;
  contactEmail: string;
  contactName: string;
  status: 'active' | 'review' | 'restricted';
  recurringIssueAlert?: string;
  paymentTerms: string;
}

export interface APException {
  id: string;
  invoiceNumber: string;
  vendorName: string;
  vendorCode: string;
  exceptionType: ExceptionType;
  amount: number;
  currency: string;
  priority: Priority;
  risk: RiskLevel;
  status: ExceptionStatus;
  ageDays: number;
  dueDate: string;
  assignedTeam: string;
  assignedTo: string;
  financialImpact: number;
  
  // Investigation details
  unitInvoicePrice?: number;
  unitPoPrice?: number;
  priceVariancePct?: number;
  allowedTolerancePct?: number;
  
  aiFinding: string;
  aiRecommendation: string;
  aiConfidencePct: number;
  recommendedOwner: string;
  evidenceCount: number;
  
  matchingData: MatchData;
  investigationSteps: AIInvestigationStep[];
  similarCases: SimilarCase[];
  auditHistory: AuditLogEntry[];
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  vendorName: string;
  vendorCode: string;
  invoiceDate: string;
  dueDate: string;
  poNumber?: string;
  subtotal: number;
  tax: number;
  total: number;
  currency: string;
  paymentTerms: string;
  matchStatus: '3-Way Matched' | '2-Way Matched' | 'Discrepancy' | 'Non-PO' | 'Pending Extraction';
  exceptionStatus?: ExceptionStatus;
  glAccountSuggestion?: {
    accountCode: string;
    accountName: string;
    costCenter: string;
    department: string;
    confidencePct: number;
    basisCount: number;
  };
  lineItems: LineItem[];
}

export interface ApprovalItem {
  id: string;
  exceptionId: string;
  invoiceNumber: string;
  vendorName: string;
  amount: number;
  currency: string;
  exceptionType: ExceptionType;
  aiRecommendation: string;
  requestedBy: string;
  requestedDate: string;
  dueDate: string;
  priority: Priority;
  status: 'Pending' | 'Approved' | 'Rejected' | 'Escalated';
  confidencePct: number;
}

export interface RiskAnomaly {
  id: string;
  title: string;
  riskLevel: RiskLevel;
  type: 'Duplicate Invoice' | 'Price Drift' | 'Vendor Change' | 'Frequency Spurt' | 'Early Payment Opportunity';
  vendorName: string;
  affectedAmount: number;
  currency: string;
  description: string;
  suggestedAction: string;
  detectedDate: string;
  savingsOpportunity?: number;
}

export interface HindsightCase {
  caseId: string;
  exceptionType: ExceptionType;
  vendorName: string;
  amount: number;
  currency: string;
  rootCause: string;
  previousAction: string;
  outcome: string;
  resolutionTime: string;
  similarityPct: number;
  humanDecision: string;
  preventionTakeaway: string;
  resolvedDate: string;
  invoiceRef: string;
  poRef: string;
  keyLearning: string;
}

export interface HindsightPattern {
  id: string;
  exceptionType: ExceptionType;
  title: string;
  totalSimilarCases: number;
  breakdown: {
    label: string;
    count: number;
    pct: number;
  }[];
  primaryRootCause: string;
  recommendedPrevention: string;
  affectedValueFormatted: string;
  riskLevel: RiskLevel;
}
