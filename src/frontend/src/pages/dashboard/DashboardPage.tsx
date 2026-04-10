import { Badge } from "@/components/Badge";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { GlassCard } from "@/components/GlassCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { StatusIndicator } from "@/components/StatusIndicator";
import {
  useGetSystemStatus,
  useListActivities,
  useListAnalyses,
  useListScans,
} from "@/hooks/useQueries";
import type { APIStatus, ActivityEntry, Scan, SystemStatus } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Bot,
  BrainCircuit,
  Clock,
  Cpu,
  Database,
  FileBarChart2,
  Globe,
  Network,
  Radar,
  Search,
  Shield,
  ShieldAlert,
  TrendingUp,
  Wifi,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useRef } from "react";

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const diff = Date.now() - ms;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return new Date(ms).toLocaleDateString();
}

function eventTypeColor(eventType: string): string {
  switch (eventType) {
    case "ScanStarted":
      return "text-primary";
    case "ScanComplete":
      return "text-[oklch(0.75_0.2_145)]";
    case "VulnFound":
      return "text-[oklch(0.66_0.2_70)]";
    case "ThreatDetected":
      return "text-destructive";
    case "APIHit":
      return "text-accent";
    default:
      return "text-muted-foreground";
  }
}

function eventTypeBg(eventType: string): string {
  switch (eventType) {
    case "ScanStarted":
      return "bg-primary/10 border-primary/20";
    case "ScanComplete":
      return "bg-[oklch(0.75_0.2_145)]/10 border-[oklch(0.75_0.2_145)]/20";
    case "VulnFound":
      return "bg-[oklch(0.66_0.2_70)]/10 border-[oklch(0.66_0.2_70)]/20";
    case "ThreatDetected":
      return "bg-destructive/10 border-destructive/20";
    case "APIHit":
      return "bg-accent/10 border-accent/20";
    default:
      return "bg-muted/10 border-border/20";
  }
}

function eventTypeIcon(eventType: string) {
  const cls = `w-3 h-3 ${eventTypeColor(eventType)}`;
  switch (eventType) {
    case "ScanStarted":
      return <Radar className={cls} />;
    case "ScanComplete":
      return <Shield className={cls} />;
    case "VulnFound":
      return <AlertTriangle className={cls} />;
    case "ThreatDetected":
      return <ShieldAlert className={cls} />;
    case "APIHit":
      return <Zap className={cls} />;
    default:
      return <Activity className={cls} />;
  }
}

function severityToVariant(
  s: string,
): "critical" | "danger" | "warning" | "muted" | "success" {
  switch (s.toLowerCase()) {
    case "critical":
      return "critical";
    case "high":
      return "danger";
    case "medium":
      return "warning";
    case "low":
      return "muted";
    default:
      return "muted";
  }
}

function riskColor(score: number): string {
  if (score >= 75) return "oklch(0.75 0.2 145)";
  if (score >= 50) return "oklch(0.66 0.2 70)";
  return "oklch(0.6 0.28 25)";
}

function riskLabel(score: number): string {
  if (score >= 80) return "EXCELLENT";
  if (score >= 65) return "GOOD";
  if (score >= 50) return "MODERATE";
  if (score >= 35) return "AT RISK";
  return "CRITICAL";
}

// ── Stat Card ─────────────────────────────────────────────────────────────────
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  accent?: string;
  delay: number;
  isLoading?: boolean;
}

function StatCard({
  icon,
  label,
  value,
  sub,
  accent = "primary",
  delay,
  isLoading = false,
}: StatCardProps) {
  const accentBorder =
    accent === "danger"
      ? "hover:border-destructive/40"
      : accent === "warning"
        ? "hover:border-[oklch(0.66_0.2_70)]/40"
        : accent === "accent"
          ? "hover:border-accent/40"
          : "hover:border-primary/40";

  const iconBg =
    accent === "danger"
      ? "bg-destructive/10 border-destructive/20"
      : accent === "warning"
        ? "bg-[oklch(0.66_0.2_70)]/10 border-[oklch(0.66_0.2_70)]/20"
        : accent === "accent"
          ? "bg-accent/10 border-accent/20"
          : "bg-primary/10 border-primary/20";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      <GlassCard
        depth
        hover
        className={`p-5 group ${accentBorder} transition-smooth`}
        data-ocid={`stat-card-${label.toLowerCase().replace(/\s+/g, "-")}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className={`p-2.5 rounded-lg border ${iconBg}`}>{icon}</div>
          <TrendingUp className="w-4 h-4 text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors" />
        </div>
        <p className="font-mono text-[10px] text-muted-foreground tracking-[0.15em] uppercase mb-1.5">
          {label}
        </p>
        {isLoading ? (
          <LoadingSkeleton variant="stat" className="mt-1" />
        ) : (
          <>
            <p className="font-display text-3xl font-bold text-foreground tabular-nums mb-1">
              {value}
            </p>
            {sub && (
              <p className="font-mono text-[10px] text-muted-foreground/60">
                {sub}
              </p>
            )}
          </>
        )}
      </GlassCard>
    </motion.div>
  );
}

// ── Animated Security Score Ring ──────────────────────────────────────────────
function SecurityScoreCard({ score }: { score: bigint }) {
  const pct = Math.min(Number(score), 100);
  const r = 52;
  const circumference = 2 * Math.PI * r;
  const targetDash = (pct / 100) * circumference;
  const color = riskColor(pct);
  const label = riskLabel(pct);

  const subScores = [
    { label: "Network Risk", value: Math.max(pct - 5, 0), icon: Network },
    { label: "Web Risk", value: Math.max(pct - 10, 0), icon: Globe },
    { label: "API Risk", value: Math.max(pct - 8, 0), icon: Database },
  ];

  return (
    <GlassCard depth className="p-5">
      <div className="flex items-center gap-2 mb-5">
        <Shield className="w-4 h-4 text-primary" />
        <h3 className="font-display font-semibold text-xs tracking-[0.15em] uppercase text-foreground">
          Security Score
        </h3>
        <div className="ml-auto">
          <Badge variant="neon">{label}</Badge>
        </div>
      </div>

      {/* Ring */}
      <div className="flex justify-center mb-5">
        <div className="relative w-36 h-36">
          <svg viewBox="0 0 120 120" className="w-full h-full -rotate-90">
            <title>Security score ring</title>
            {/* Track */}
            <circle
              cx="60"
              cy="60"
              r={r}
              fill="none"
              stroke="oklch(0.22 0.02 270)"
              strokeWidth="9"
            />
            {/* Glow layer */}
            <circle
              cx="60"
              cy="60"
              r={r}
              fill="none"
              strokeWidth="9"
              strokeLinecap="round"
              strokeDasharray={`${targetDash} ${circumference}`}
              style={{
                stroke: color,
                filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 16px ${color}40)`,
                transition: "stroke-dasharray 1.4s cubic-bezier(0.22,1,0.36,1)",
              }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-4xl font-bold text-foreground tabular-nums leading-none">
              {pct}
            </span>
            <span className="font-mono text-[9px] text-muted-foreground tracking-widest mt-0.5">
              / 100
            </span>
          </div>
        </div>
      </div>

      {/* Sub-scores */}
      <div className="space-y-3">
        {subScores.map((item) => {
          const barColor = riskColor(item.value);
          return (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-1.5">
                  <item.icon className="w-3 h-3 text-muted-foreground" />
                  <span className="font-mono text-[10px] text-muted-foreground tracking-wide">
                    {item.label}
                  </span>
                </div>
                <span className="font-mono text-xs font-semibold text-foreground">
                  {item.value}
                </span>
              </div>
              <div className="h-1.5 rounded-full bg-muted/20 overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: barColor,
                    boxShadow: `0 0 6px ${barColor}80`,
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: `${item.value}%` }}
                  transition={{
                    duration: 1.2,
                    delay: 0.3,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
}

// ── System Control Panel ──────────────────────────────────────────────────────
function SystemControlPanel({ status }: { status: SystemStatus }) {
  const aiStatus = status.aiEngineStatus === "active" ? "online" : "offline";
  const apiStatuses: APIStatus[] = status.apiStatuses ?? [];

  return (
    <GlassCard depth className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Cpu className="w-4 h-4 text-primary" />
        <h3 className="font-display font-semibold text-xs tracking-[0.15em] uppercase text-foreground">
          System Control
        </h3>
        <div className="ml-auto">
          <StatusIndicator status="online" size="sm" pulse />
        </div>
      </div>

      {/* AI + Scan + Queue row */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        {[
          {
            label: "AI Engine",
            value: status.aiEngineStatus.toUpperCase(),
            status: aiStatus as "online" | "offline",
            icon: BrainCircuit,
          },
          {
            label: "Active Scans",
            value: String(status.activeScans),
            status:
              Number(status.activeScans) > 0
                ? ("online" as const)
                : ("unknown" as const),
            icon: Radar,
          },
          {
            label: "Queue",
            value: `${String(status.queueSize)} tasks`,
            status:
              Number(status.queueSize) > 5
                ? ("warning" as const)
                : ("online" as const),
            icon: Database,
          },
        ].map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-2 p-2.5 rounded-lg bg-muted/5 border border-border/20"
          >
            <item.icon className="w-4 h-4 text-muted-foreground" />
            <StatusIndicator status={item.status} size="sm" />
            <p className="font-mono text-[8px] text-muted-foreground tracking-widest text-center uppercase">
              {item.label}
            </p>
          </div>
        ))}
      </div>

      {/* API Status pills */}
      <div className="border-t border-border/20 pt-3">
        <p className="font-mono text-[9px] text-muted-foreground/50 tracking-[0.15em] uppercase mb-2">
          API Integrations
        </p>
        {apiStatuses.length > 0 ? (
          <div className="space-y-2">
            {apiStatuses.slice(0, 4).map((api) => {
              const isActive = api.status === "active";
              return (
                <div
                  key={api.name}
                  className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-muted/5 border border-border/15"
                >
                  <div className="flex items-center gap-2">
                    <Wifi className="w-3 h-3 text-muted-foreground" />
                    <span className="font-mono text-xs text-muted-foreground">
                      {api.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[9px] text-muted-foreground/50">
                      {String(api.responseTime)}ms
                    </span>
                    <StatusIndicator
                      status={isActive ? "online" : "offline"}
                      size="sm"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          // Static fallback pills showing expected integrations
          <div className="space-y-2">
            {["Shodan", "VirusTotal", "Censys", "AlienVault"].map((name) => (
              <div
                key={name}
                className="flex items-center justify-between px-2.5 py-1.5 rounded-md bg-muted/5 border border-border/15"
              >
                <div className="flex items-center gap-2">
                  <Wifi className="w-3 h-3 text-muted-foreground" />
                  <span className="font-mono text-xs text-muted-foreground">
                    {name}
                  </span>
                </div>
                <StatusIndicator status="unknown" size="sm" />
              </div>
            ))}
          </div>
        )}
      </div>
    </GlassCard>
  );
}

// ── Live Activity Feed ────────────────────────────────────────────────────────
function LiveActivityFeed({ activities }: { activities: ActivityEntry[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const sorted = [...activities]
    .sort((a, b) => (b.timestamp > a.timestamp ? 1 : -1))
    .slice(0, 15);

  if (!sorted.length) {
    return (
      <EmptyState
        icon={<Activity className="w-5 h-5 text-muted-foreground" />}
        title="No activity yet"
        description="Events will appear here as scans run."
      />
    );
  }

  return (
    <div
      ref={scrollRef}
      className="space-y-1.5 max-h-[340px] overflow-y-auto pr-1"
      style={{
        scrollbarWidth: "thin",
        scrollbarColor: "oklch(0.22 0.02 270) transparent",
      }}
      data-ocid="activity-feed-list"
    >
      {sorted.map((entry, i) => (
        <motion.div
          key={String(entry.id)}
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.03, duration: 0.2 }}
          className="flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-muted/5 border border-border/15 hover:border-border/30 transition-smooth"
        >
          <div
            className={`mt-0.5 p-1.5 rounded border shrink-0 ${eventTypeBg(entry.eventType)}`}
          >
            {eventTypeIcon(entry.eventType)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs text-foreground leading-snug break-words">
              {entry.message}
            </p>
            <div className="flex items-center gap-2 mt-1 flex-wrap">
              <span
                className={`font-mono text-[9px] font-semibold tracking-widest uppercase ${eventTypeColor(entry.eventType)}`}
              >
                {entry.eventType}
              </span>
              <span className="font-mono text-[9px] text-muted-foreground/50 flex items-center gap-1">
                <Clock className="w-2 h-2" />
                {formatTimestamp(entry.timestamp)}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ── AI Insight Cards ──────────────────────────────────────────────────────────
const AI_INSIGHTS = [
  {
    id: "ssh",
    icon: "⚠️",
    title: "SSH Brute Force Risk",
    description:
      "Port 22 is open on 3 targets. High exposure to automated SSH brute-force attacks detected in the last 24h.",
    severity: "high" as const,
    source: "Port Scan + AI Analysis",
  },
  {
    id: "dns",
    icon: "🔍",
    title: "Elevated DNS Query Rate",
    description:
      "High DNS lookup rate detected — potential DNS exfiltration channel or misconfigured resolver.",
    severity: "medium" as const,
    source: "Traffic Analysis",
  },
  {
    id: "cve",
    icon: "🛡️",
    title: "CVE-2024-1234 Exposure",
    description:
      "A dependency in your stack matches a known CVE with CVSS 8.2. Patch or workaround recommended.",
    severity: "critical" as const,
    source: "Vulnerability DB",
  },
];

function AIInsightSection() {
  return (
    <GlassCard depth className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <BrainCircuit className="w-4 h-4 text-accent" />
        <h3 className="font-display font-semibold text-xs tracking-[0.15em] uppercase text-foreground">
          AI Insights
        </h3>
        <Badge variant="neon" className="ml-auto">
          {AI_INSIGHTS.length} active
        </Badge>
      </div>
      <div className="space-y-2.5">
        {AI_INSIGHTS.map((insight, i) => (
          <motion.div
            key={insight.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.3 }}
            className={`p-3.5 rounded-lg border transition-smooth cursor-default group
              ${
                insight.severity === "critical"
                  ? "border-destructive/30 bg-destructive/5 hover:border-destructive/50 hover:bg-destructive/10"
                  : insight.severity === "high"
                    ? "border-[oklch(0.66_0.2_70)]/30 bg-[oklch(0.66_0.2_70)]/5 hover:border-[oklch(0.66_0.2_70)]/50"
                    : "border-primary/20 bg-primary/5 hover:border-primary/40"
              }`}
            data-ocid={`ai-insight-${insight.id}`}
          >
            <div className="flex items-start gap-3">
              <span className="text-lg leading-none mt-0.5 shrink-0">
                {insight.icon}
              </span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-mono text-xs font-semibold text-foreground">
                    {insight.title}
                  </p>
                  <Badge variant={severityToVariant(insight.severity)}>
                    {insight.severity}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {insight.description}
                </p>
                <p className="font-mono text-[9px] text-muted-foreground/40 mt-1.5 tracking-wide">
                  Source: {insight.source}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}

// ── Recent Scans ──────────────────────────────────────────────────────────────
function RecentScansCard({
  scans,
  isLoading,
  isError,
  refetch,
}: {
  scans: Scan[];
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
}) {
  return (
    <GlassCard depth className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Search className="w-4 h-4 text-primary" />
          <h3 className="font-display font-semibold text-xs tracking-[0.15em] uppercase text-foreground">
            Recent Scans
          </h3>
        </div>
        <Link
          to="/dashboard/scan-center"
          className="font-mono text-[10px] text-primary hover:text-primary/80 transition-colors tracking-widest uppercase"
          data-ocid="view-all-scans"
        >
          View all →
        </Link>
      </div>

      {isLoading ? (
        <LoadingSkeleton variant="list" rows={4} />
      ) : isError ? (
        <ErrorState onRetry={refetch} />
      ) : scans.length === 0 ? (
        <EmptyState
          icon={<Radar className="w-5 h-5 text-muted-foreground" />}
          title="No scans yet"
          description="Start your first scan to see results here."
          action={{
            label: "Start Scan",
            onClick: () => {
              window.location.href = "/dashboard/scan-center";
            },
          }}
        />
      ) : (
        <div className="space-y-2" data-ocid="scan-list">
          {scans.slice(0, 5).map((scan) => (
            <div
              key={String(scan.id)}
              className="flex items-center justify-between px-3 py-2.5 rounded-lg bg-muted/5 border border-border/15 hover:border-primary/25 hover:bg-primary/3 transition-smooth group"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-1.5 rounded bg-primary/10 border border-primary/20 shrink-0">
                  <Radar className="w-3 h-3 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-xs text-foreground truncate">
                    {scan.target}
                  </p>
                  <p className="font-mono text-[10px] text-muted-foreground/60">
                    {scan.mode} · {formatTimestamp(scan.startedAt)}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-2">
                <span className="font-mono text-[10px] text-muted-foreground/50">
                  {scan.findings.length} findings
                </span>
                <Badge
                  variant={
                    scan.status === "completed"
                      ? "success"
                      : scan.status === "running"
                        ? "neon"
                        : scan.status === "failed"
                          ? "danger"
                          : "muted"
                  }
                  dot={scan.status === "running"}
                >
                  {scan.status}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </GlassCard>
  );
}

// ── Quick Actions ─────────────────────────────────────────────────────────────
const QUICK_LINKS = [
  {
    label: "Scan Center",
    href: "/dashboard/scan-center",
    icon: Radar,
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20 group-hover:border-primary/40",
  },
  {
    label: "AI Agent",
    href: "/dashboard/ai-agent",
    icon: Bot,
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20 group-hover:border-accent/40",
  },
  {
    label: "Threat Intel",
    href: "/dashboard/threat-intel",
    icon: ShieldAlert,
    color: "text-destructive",
    bg: "bg-destructive/10 border-destructive/20 group-hover:border-destructive/40",
  },
  {
    label: "Reports",
    href: "/dashboard/reports",
    icon: FileBarChart2,
    color: "text-[oklch(0.66_0.2_70)]",
    bg: "bg-[oklch(0.66_0.2_70)]/10 border-[oklch(0.66_0.2_70)]/20 group-hover:border-[oklch(0.66_0.2_70)]/40",
  },
];

function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-3">
      {QUICK_LINKS.map((item, i) => (
        <motion.div
          key={item.href}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.06, duration: 0.25 }}
        >
          <Link
            to={item.href}
            data-ocid={`quick-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <GlassCard
              hover
              depth
              className="p-4 flex flex-col items-center gap-2.5 text-center group cursor-pointer"
            >
              <div
                className={`p-2.5 rounded-lg border transition-smooth ${item.bg}`}
              >
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                {item.label}
              </span>
            </GlassCard>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

// ── Main Dashboard Page ───────────────────────────────────────────────────────
export default function DashboardPage() {
  const statusQuery = useGetSystemStatus();
  const activitiesQuery = useListActivities(15n);
  const scansQuery = useListScans();
  const analysesQuery = useListAnalyses();

  const status = statusQuery.data;
  const activities = activitiesQuery.data ?? [];
  const scans = scansQuery.data ?? [];
  const analyses = analysesQuery.data ?? [];

  const completedScans = scans.filter((s) => s.status === "completed").length;

  return (
    <motion.div
      className="space-y-5"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ── Section 1: Top Metrics Row ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Radar className="w-5 h-5 text-primary" />}
          label="Total Scans"
          value={scans.length}
          sub={`${completedScans} completed`}
          accent="primary"
          delay={0}
          isLoading={scansQuery.isLoading}
        />
        <StatCard
          icon={<AlertTriangle className="w-5 h-5 text-destructive" />}
          label="Active Threats"
          value={Number(status?.activeScans ?? 0)}
          sub="active scans running"
          accent="danger"
          delay={0.06}
          isLoading={statusQuery.isLoading}
        />
        <StatCard
          icon={<Shield className="w-5 h-5 text-[oklch(0.75_0.2_145)]" />}
          label="Security Score"
          value={`${Number(status?.securityScore ?? 0)}%`}
          sub={status ? riskLabel(Number(status.securityScore)) : undefined}
          accent="primary"
          delay={0.12}
          isLoading={statusQuery.isLoading}
        />
        <StatCard
          icon={<BrainCircuit className="w-5 h-5 text-accent" />}
          label="AI Analyses"
          value={analyses.length}
          sub="targets analyzed"
          accent="accent"
          delay={0.18}
          isLoading={analysesQuery.isLoading}
        />
      </div>

      {/* ── Sections 2-5: Two-column Layout ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left (2/3): Security Score + AI Insights + Recent Scans + Quick Actions */}
        <div className="lg:col-span-2 space-y-5">
          {/* Security Score + AI Insights row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Section 4: Security Score */}
            {statusQuery.isLoading ? (
              <LoadingSkeleton variant="card" />
            ) : statusQuery.isError ? (
              <ErrorState onRetry={() => statusQuery.refetch()} />
            ) : status ? (
              <SecurityScoreCard score={status.securityScore} />
            ) : null}

            {/* Section 5: AI Insights */}
            <AIInsightSection />
          </div>

          {/* Recent Scans */}
          <RecentScansCard
            scans={scans}
            isLoading={scansQuery.isLoading}
            isError={scansQuery.isError}
            refetch={() => scansQuery.refetch()}
          />

          {/* Quick Actions */}
          <QuickActions />
        </div>

        {/* Right (1/3): System Control + Live Activity */}
        <div className="space-y-5">
          {/* Section 2: System Control Panel */}
          {statusQuery.isLoading ? (
            <LoadingSkeleton variant="card" />
          ) : statusQuery.isError ? (
            <ErrorState onRetry={() => statusQuery.refetch()} />
          ) : status ? (
            <SystemControlPanel status={status} />
          ) : null}

          {/* Section 3: Live Activity Feed */}
          <GlassCard depth className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="w-4 h-4 text-primary" />
              <h3 className="font-display font-semibold text-xs tracking-[0.15em] uppercase text-foreground">
                Live Activity
              </h3>
              <div className="ml-auto flex items-center gap-2">
                <StatusIndicator status="online" size="sm" pulse />
                <span className="font-mono text-[9px] text-muted-foreground/50 tracking-widest">
                  LIVE
                </span>
              </div>
            </div>
            {activitiesQuery.isLoading ? (
              <LoadingSkeleton variant="list" rows={5} />
            ) : activitiesQuery.isError ? (
              <ErrorState onRetry={() => activitiesQuery.refetch()} />
            ) : (
              <LiveActivityFeed activities={activities} />
            )}
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
}
