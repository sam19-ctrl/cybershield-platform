// ── Marketing types ──────────────────────────────────────────────────────────
export interface NavItem {
  label: string;
  href: string;
}

export interface MegaMenuItem {
  label: string;
  description: string;
  href: string;
  icon: string;
}

export interface MegaMenuGroup {
  title: string;
  items: MegaMenuItem[];
}

export interface MegaMenuData {
  [key: string]: MegaMenuGroup[];
}

export interface FooterColumn {
  title: string;
  links: NavItem[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
}

// ── Component variant types ───────────────────────────────────────────────────
export type BadgeVariant =
  | "neon"
  | "blue"
  | "muted"
  | "danger"
  | "warning"
  | "critical"
  | "success";
export type NeonButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger";

// ── Dashboard / backend domain types ─────────────────────────────────────────
export type ScanStatus = "pending" | "running" | "completed" | "failed";
export type ScanMode = "quick" | "full" | "stealth" | "aggressive";
export type SeverityLevel = "critical" | "high" | "medium" | "low" | "info";
export type RiskLevel = "critical" | "high" | "medium" | "low";

export interface Finding {
  id: bigint;
  title: string;
  description: string;
  severity: string;
  cvssScore: number;
  findingType: string;
  port?: bigint;
  protocol?: string;
}

export interface Scan {
  id: bigint;
  target: string;
  mode: string;
  status: string;
  progress: bigint;
  startedAt: bigint;
  completedAt?: bigint;
  findings: Finding[];
}

export interface ThreatEntry {
  id: bigint;
  indicator: string;
  indicatorType: string;
  riskLevel: string;
  description: string;
  source: string;
  detectedAt: bigint;
}

export interface ThreatResult {
  found: boolean;
  entry?: ThreatEntry;
  relatedThreats: ThreatEntry[];
}

export interface AIVulnerability {
  title: string;
  description: string;
  severity: string;
  recommendation: string;
}

export interface AIAnalysis {
  id: bigint;
  target: string;
  riskScore: bigint;
  vulnerabilities: AIVulnerability[];
  suggestions: string[];
  thinking: string;
  completedAt: bigint;
}

export interface ActivityEntry {
  id: bigint;
  message: string;
  severity: string;
  eventType: string;
  timestamp: bigint;
}

export interface APIStatus {
  name: string;
  status: string;
  responseTime: bigint;
  lastChecked: bigint;
}

export interface SystemStatus {
  activeScans: bigint;
  queueSize: bigint;
  aiEngineStatus: string;
  securityScore: bigint;
  apiStatuses: APIStatus[];
}

// ── Component prop types ──────────────────────────────────────────────────────
export interface LoadingSkeletonProps {
  variant?: "card" | "table" | "text" | "stat" | "list";
  rows?: number;
  className?: string;
}

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export interface StatusIndicatorProps {
  status: "online" | "offline" | "warning" | "unknown";
  label?: string;
  pulse?: boolean;
  size?: "sm" | "md" | "lg";
}

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}
