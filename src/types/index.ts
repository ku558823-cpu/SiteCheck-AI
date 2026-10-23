export type ViewMode = 'desktop' | 'mobile';

export type DesktopTab = 
  | 'analyzer' 
  | 'dashboard' 
  | 'testing-reports' 
  | 'audit-details' 
  | 'ai-assistant' 
  | 'pricing' 
  | 'auth';

export type MobileTab = 
  | 'home' 
  | 'audit' 
  | 'dashboard' 
  | 'ai-agent' 
  | 'reports';

export interface AuditReport {
  id: string;
  domain: string;
  subpath: string;
  env: 'prod' | 'staging' | 'v2.4-rel' | 'production' | 'ci-branch';
  commit: string;
  branch: string;
  timestamp: string;
  duration: string;
  pagesAudited: number;
  viewport: string;
  score: number;
  grade: string;
  status: 'Passed' | 'Flawless' | 'Failed' | 'Needs Attn';
  statusColor: 'tertiary' | 'error' | 'surface-high';
  keyFindings: string[];
  pdfSize: string;
  metrics: {
    lcp: string;
    cls: string;
    inp: string;
    wcagScore: string;
    domShift: string;
    deadLinks: number;
    warnings: number;
    criticalIssues: number;
  };
  trend: number[];
  workerFootprint: {
    engine: string;
    emulation: string;
    edgeCluster: string;
    proxyMode: string;
  };
}

export interface IssueItem {
  id: string;
  title: string;
  path: string;
  severity: 'critical' | 'warning' | 'optimizations';
  category: string;
  device: string;
  recommendation: string;
  domNode: string;
}

export interface ChatMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  codeSnippet?: {
    filename: string;
    lang: string;
    oldCode: string;
    newCode: string;
    explanation: string;
  };
}
