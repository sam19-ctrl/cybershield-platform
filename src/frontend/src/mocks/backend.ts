import type {
  AIAnalysisResult,
  ActivityEntry,
  ActivityEventType,
  CreateScanResult,
  ThreatEntry,
  ThreatResult,
  backendInterface,
} from "../backend";
import { ActivityEventType as AET } from "../backend";
import type { SubmitContactInput, ThreatEntryInput } from "../backend";

export const mockBackend: backendInterface = {
  addActivity: async (eventType: AET, message: string, severity: string): Promise<ActivityEntry> => ({
    id: BigInt(Date.now()),
    message,
    severity,
    eventType,
    timestamp: BigInt(Date.now()) * BigInt(1_000_000),
  }),
  listContactSubmissions: async () => [
    {
      id: BigInt(1),
      name: "John Smith",
      email: "john.smith@acme.com",
      company: "Acme Corp",
      message: "We are interested in your enterprise security solution.",
      submittedAt: BigInt(Date.now()) * BigInt(1_000_000),
    },
  ],
  submitContact: async (_input: SubmitContactInput) => ({
    __kind__: "ok" as const,
    ok: BigInt(2),
  }),
  addThreatEntry: async (entry: ThreatEntryInput): Promise<ThreatEntry> => ({
    id: BigInt(1),
    indicator: entry.indicator,
    indicatorType: entry.indicatorType,
    riskLevel: entry.riskLevel,
    description: entry.description,
    source: entry.source,
    detectedAt: BigInt(Date.now()) * BigInt(1_000_000),
  }),
  analyzeTarget: async (target: string, _context: string): Promise<AIAnalysisResult> => ({
    __kind__: "ok" as const,
    ok: {
      id: BigInt(1),
      target,
      riskScore: BigInt(72),
      vulnerabilities: [
        {
          title: "Open SSH Port",
          description: "Port 22 is exposed to the internet",
          severity: "high",
          recommendation: "Restrict SSH access via firewall rules",
        },
      ],
      suggestions: ["Implement IP allowlisting for SSH", "Enable 2FA for all admin accounts"],
      thinking: "Analyzed target for common vulnerabilities and attack vectors.",
      completedAt: BigInt(Date.now()) * BigInt(1_000_000),
    },
  }),
  createScan: async (target: string, scanMode: string): Promise<CreateScanResult> => ({
    __kind__: "ok" as const,
    ok: {
      id: BigInt(1),
      target,
      mode: scanMode,
      status: "running",
      progress: BigInt(0),
      startedAt: BigInt(Date.now()) * BigInt(1_000_000),
      findings: [],
    },
  }),
  getAnalysis: async () => null,
  getScan: async () => null,
  getSystemStatus: async () => ({
    activeScans: BigInt(2),
    queueSize: BigInt(3),
    aiEngineStatus: "active",
    securityScore: BigInt(78),
    apiStatuses: [
      { name: "Shodan", status: "active", responseTime: BigInt(120), lastChecked: BigInt(Date.now()) * BigInt(1_000_000) },
      { name: "VirusTotal", status: "active", responseTime: BigInt(250), lastChecked: BigInt(Date.now()) * BigInt(1_000_000) },
    ],
  }),
  listActivities: async (_limit: bigint): Promise<ActivityEntry[]> => [
    {
      id: BigInt(1),
      message: "Scan started on 192.168.1.1",
      severity: "info",
      eventType: AET.ScanStarted,
      timestamp: BigInt(Date.now()) * BigInt(1_000_000),
    },
    {
      id: BigInt(2),
      message: "Vulnerability found: CVE-2021-41773",
      severity: "high",
      eventType: AET.VulnFound,
      timestamp: BigInt(Date.now() - 60000) * BigInt(1_000_000),
    },
  ],
  listAnalyses: async () => [],
  listScans: async () => [],
  listThreats: async () => [],
  lookupThreat: async (indicator: string, _indicatorType: string): Promise<ThreatResult> => ({
    found: false,
    relatedThreats: [],
  }),
  updateScanStatus: async () => true,
};
