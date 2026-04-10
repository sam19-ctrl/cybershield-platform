import { Badge } from "@/components/Badge";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { GlassCard } from "@/components/GlassCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { NeonButton } from "@/components/NeonButton";
import { useListAnalyses, useListScans } from "@/hooks/useQueries";
import type { AIAnalysis, AIVulnerability, Finding, Scan } from "@/types";
import {
  AlertTriangle,
  ArrowRight,
  Bot,
  ChevronDown,
  ChevronRight,
  Circle,
  Download,
  FileBarChart2,
  Globe,
  Minus,
  Plus,
  Radar,
  Share2,
  Shield,
  ShieldAlert,
  Target,
  Wifi,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatDateTime(ts: bigint): string {
  return new Date(Number(ts / 1_000_000n)).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getDuration(start: bigint, end?: bigint): string {
  if (!end) return "—";
  const ms = Number((end - start) / 1_000_000n);
  if (ms < 60000) return `${Math.round(ms / 1000)}s`;
  return `${Math.round(ms / 60000)}m`;
}

function severityVariant(
  sev: string,
): "critical" | "danger" | "warning" | "success" | "muted" {
  switch (sev.toLowerCase()) {
    case "critical":
      return "critical";
    case "high":
      return "danger";
    case "medium":
      return "warning";
    case "low":
      return "success";
    default:
      return "muted";
  }
}

function overallRisk(
  findings: Finding[],
): "critical" | "high" | "medium" | "low" {
  if (findings.some((f) => f.severity.toLowerCase() === "critical"))
    return "critical";
  if (findings.some((f) => f.severity.toLowerCase() === "high")) return "high";
  if (findings.some((f) => f.severity.toLowerCase() === "medium"))
    return "medium";
  return "low";
}

function riskFromScore(score: number): "critical" | "high" | "medium" | "low" {
  if (score >= 80) return "critical";
  if (score >= 60) return "high";
  if (score >= 40) return "medium";
  return "low";
}

function riskToBadge(
  risk: "critical" | "high" | "medium" | "low",
): "critical" | "danger" | "warning" | "success" {
  switch (risk) {
    case "critical":
      return "critical";
    case "high":
      return "danger";
    case "medium":
      return "warning";
    case "low":
      return "success";
  }
}

// ── Types for report items ────────────────────────────────────────────────────

type ReportItem =
  | { kind: "scan"; data: Scan }
  | { kind: "ai"; data: AIAnalysis };

// ── Sidebar report list item ──────────────────────────────────────────────────

function ReportListItem({
  item,
  selected,
  onClick,
  index,
}: {
  item: ReportItem;
  selected: boolean;
  onClick: () => void;
  index: number;
}) {
  const isScan = item.kind === "scan";
  const scan = isScan ? item.data : null;
  const ai = !isScan ? item.data : null;

  const target = scan ? scan.target : ai!.target;
  const date = scan ? formatDate(scan.startedAt) : formatDate(ai!.completedAt);
  const risk =
    scan && scan.findings.length > 0
      ? overallRisk(scan.findings)
      : ai
        ? riskFromScore(Number(ai.riskScore))
        : "low";

  return (
    <motion.button
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.04 }}
      onClick={onClick}
      data-ocid={`report-list-item-${index}`}
      className={`w-full text-left p-3 rounded-lg border transition-smooth cursor-pointer group ${
        selected
          ? "border-primary/50 bg-primary/10 shadow-[0_0_12px_rgba(79,140,255,0.2)]"
          : "border-border/30 bg-card/30 hover:border-primary/30 hover:bg-primary/5"
      }`}
    >
      <div className="flex items-start gap-2.5">
        <div
          className={`mt-0.5 p-1.5 rounded-md shrink-0 ${
            isScan
              ? "bg-primary/10 border border-primary/20"
              : "bg-accent/10 border border-accent/20"
          }`}
        >
          {isScan ? (
            <Radar className="w-3 h-3 text-primary" />
          ) : (
            <Bot className="w-3 h-3 text-accent" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-mono text-xs font-semibold text-foreground truncate">
            {target}
          </p>
          <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
            {date} · {isScan ? "Scan" : "AI Analysis"}
          </p>
        </div>
        <Badge variant={riskToBadge(risk)} dot={risk === "critical"}>
          {risk}
        </Badge>
      </div>
      {selected && (
        <div className="flex items-center gap-1 mt-2 text-primary">
          <ChevronRight className="w-3 h-3" />
          <span className="font-mono text-[10px]">Viewing</span>
        </div>
      )}
    </motion.button>
  );
}

// ── Security Score Ring ───────────────────────────────────────────────────────

function ScoreRing({ score, size = 80 }: { score: number; size?: number }) {
  const r = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score)) / 100;
  const dash = circ * pct;
  const color = score >= 80 ? "#FF4D4D" : score >= 60 ? "#FFB020" : "#4F8CFF";
  const label =
    score >= 80
      ? "CRITICAL"
      : score >= 60
        ? "HIGH"
        : score >= 40
          ? "MEDIUM"
          : "LOW";
  const labelColor =
    score >= 80
      ? "text-destructive"
      : score >= 60
        ? "text-[oklch(0.66_0.2_70)]"
        : "text-primary";

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          className="-rotate-90"
          aria-label={`Security score: ${score}`}
          role="img"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke="oklch(0.22 0.02 270)"
            strokeWidth="6"
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circ}
            initial={{ strokeDashoffset: circ }}
            animate={{ strokeDashoffset: circ - dash }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            style={{
              filter: `drop-shadow(0 0 6px ${color}99)`,
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-lg font-bold text-foreground leading-none">
            {score}
          </span>
        </div>
      </div>
      <span
        className={`font-mono text-[10px] font-semibold mt-1 ${labelColor}`}
      >
        {label}
      </span>
    </div>
  );
}

// ── Posture Gauge ─────────────────────────────────────────────────────────────

function PostureGauge({
  critical,
  total,
}: { critical: number; total: number }) {
  const ratio = total === 0 ? 0 : critical / total;
  const color =
    ratio > 0.2
      ? "bg-destructive shadow-[0_0_6px_rgba(255,77,77,0.5)]"
      : ratio > 0.05
        ? "bg-[oklch(0.66_0.2_70)]"
        : "bg-[oklch(0.75_0.2_145)]";
  const label =
    ratio > 0.2 ? "Critical Risk" : ratio > 0.05 ? "Elevated Risk" : "Good";

  return (
    <div>
      <div className="flex justify-between mb-1.5">
        <span className="font-mono text-[10px] text-muted-foreground">
          Security Posture
        </span>
        <span className="font-mono text-[10px] text-foreground/80">
          {label}
        </span>
      </div>
      <div className="h-2.5 rounded-full bg-muted/20 overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(5, (1 - ratio) * 100)}%` }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="font-mono text-[10px] text-muted-foreground/60">
          At risk
        </span>
        <span className="font-mono text-[10px] text-muted-foreground/60">
          Secure
        </span>
      </div>
    </div>
  );
}

// ── Attack Path Diagram ───────────────────────────────────────────────────────

function AttackPathDiagram({ findings }: { findings: Finding[] }) {
  const criticalFindings = findings.filter(
    (f) => f.severity.toLowerCase() === "critical",
  );
  const hasCritical = criticalFindings.length > 0;

  if (!hasCritical) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center">
        <div className="p-4 rounded-full bg-[oklch(0.75_0.2_145)]/10 border border-[oklch(0.75_0.2_145)]/20 mb-3">
          <Shield className="w-7 h-7 text-[oklch(0.75_0.2_145)]" />
        </div>
        <p className="font-mono text-xs text-muted-foreground">
          No attack paths identified
        </p>
        <p className="font-mono text-[10px] text-muted-foreground/60 mt-1">
          No critical vulnerabilities found
        </p>
      </div>
    );
  }

  const entry = criticalFindings[0];

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox="0 0 560 120"
        className="w-full"
        style={{ minWidth: 480 }}
        role="img"
        aria-label="Attack path diagram"
      >
        {/* Defs */}
        <defs>
          <marker
            id="arrow-red"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="#FF4D4D" />
          </marker>
          <marker
            id="arrow-green"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <path d="M0,0 L0,6 L8,3 z" fill="oklch(0.75 0.2 145)" />
          </marker>
          <filter id="glow-red">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Nodes */}
        {/* Attacker */}
        <rect
          x="10"
          y="35"
          width="90"
          height="50"
          rx="8"
          fill="oklch(0.18 0.02 270)"
          stroke="#FF4D4D"
          strokeWidth="1.5"
        />
        <text
          x="55"
          y="58"
          textAnchor="middle"
          fill="#FF4D4D"
          fontSize="9"
          fontFamily="monospace"
          fontWeight="600"
        >
          ATTACKER
        </text>
        <text
          x="55"
          y="72"
          textAnchor="middle"
          fill="#FF4D4D"
          fontSize="7.5"
          fontFamily="monospace"
          opacity="0.7"
        >
          External
        </text>

        {/* Entry point */}
        <rect
          x="155"
          y="30"
          width="100"
          height="60"
          rx="8"
          fill="oklch(0.18 0.02 270)"
          stroke="#FFB020"
          strokeWidth="1.5"
        />
        <text
          x="205"
          y="55"
          textAnchor="middle"
          fill="#FFB020"
          fontSize="8.5"
          fontFamily="monospace"
          fontWeight="600"
        >
          ENTRY POINT
        </text>
        <text
          x="205"
          y="68"
          textAnchor="middle"
          fill="#FFB020"
          fontSize="7"
          fontFamily="monospace"
          opacity="0.8"
        >
          {entry.port ? `:${entry.port}` : entry.findingType.slice(0, 12)}
        </text>
        <text
          x="205"
          y="80"
          textAnchor="middle"
          fill="#FFB020"
          fontSize="6.5"
          fontFamily="monospace"
          opacity="0.6"
        >
          {entry.protocol ?? "TCP"}
        </text>

        {/* Pivot */}
        <rect
          x="310"
          y="35"
          width="90"
          height="50"
          rx="8"
          fill="oklch(0.18 0.02 270)"
          stroke="#FF4D4D"
          strokeWidth="1.5"
        />
        <text
          x="355"
          y="58"
          textAnchor="middle"
          fill="#FF4D4D"
          fontSize="8.5"
          fontFamily="monospace"
          fontWeight="600"
        >
          LATERAL
        </text>
        <text
          x="355"
          y="72"
          textAnchor="middle"
          fill="#FF4D4D"
          fontSize="7"
          fontFamily="monospace"
          opacity="0.7"
        >
          Movement
        </text>

        {/* Target asset */}
        <rect
          x="455"
          y="30"
          width="95"
          height="60"
          rx="8"
          fill="oklch(0.18 0.02 270)"
          stroke="#4F8CFF"
          strokeWidth="1.5"
        />
        <text
          x="502"
          y="55"
          textAnchor="middle"
          fill="#4F8CFF"
          fontSize="8.5"
          fontFamily="monospace"
          fontWeight="600"
        >
          TARGET
        </text>
        <text
          x="502"
          y="68"
          textAnchor="middle"
          fill="#4F8CFF"
          fontSize="7"
          fontFamily="monospace"
          opacity="0.8"
        >
          Internal
        </text>
        <text
          x="502"
          y="80"
          textAnchor="middle"
          fill="#4F8CFF"
          fontSize="6.5"
          fontFamily="monospace"
          opacity="0.6"
        >
          Asset
        </text>

        {/* Attack arrows */}
        <line
          x1="100"
          y1="60"
          x2="153"
          y2="60"
          stroke="#FF4D4D"
          strokeWidth="1.5"
          markerEnd="url(#arrow-red)"
          strokeDasharray="4 2"
          filter="url(#glow-red)"
        />
        <line
          x1="255"
          y1="60"
          x2="308"
          y2="60"
          stroke="#FF4D4D"
          strokeWidth="1.5"
          markerEnd="url(#arrow-red)"
          strokeDasharray="4 2"
          filter="url(#glow-red)"
        />
        <line
          x1="400"
          y1="60"
          x2="453"
          y2="60"
          stroke="#FF4D4D"
          strokeWidth="1.5"
          markerEnd="url(#arrow-red)"
          strokeDasharray="4 2"
          filter="url(#glow-red)"
        />

        {/* Labels */}
        <text
          x="127"
          y="53"
          textAnchor="middle"
          fill="#FF4D4D"
          fontSize="7"
          fontFamily="monospace"
          opacity="0.7"
        >
          exploit
        </text>
        <text
          x="282"
          y="53"
          textAnchor="middle"
          fill="#FF4D4D"
          fontSize="7"
          fontFamily="monospace"
          opacity="0.7"
        >
          pivot
        </text>
        <text
          x="427"
          y="53"
          textAnchor="middle"
          fill="#FF4D4D"
          fontSize="7"
          fontFamily="monospace"
          opacity="0.7"
        >
          escalate
        </text>

        {/* CVE label at entry */}
        <text
          x="205"
          y="104"
          textAnchor="middle"
          fill="#FFB020"
          fontSize="7.5"
          fontFamily="monospace"
          opacity="0.9"
        >
          {`CVSS ${entry.cvssScore.toFixed(1)}`}
        </text>
      </svg>
    </div>
  );
}

// ── Finding row (expandable) ──────────────────────────────────────────────────

function FindingRow({ finding }: { finding: Finding }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <tr
        className="border-b border-border/20 hover:bg-primary/5 transition-colors cursor-pointer group"
        onClick={() => setExpanded((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setExpanded((v) => !v);
        }}
        data-ocid={`finding-row-${finding.id}`}
      >
        <td className="py-2.5 px-3">
          <Badge
            variant={severityVariant(finding.severity)}
            className="text-[9px]"
          >
            {finding.severity}
          </Badge>
        </td>
        <td className="py-2.5 px-3">
          <span
            className={`font-mono text-xs font-bold ${
              finding.cvssScore >= 9
                ? "text-destructive"
                : finding.cvssScore >= 7
                  ? "text-[oklch(0.66_0.2_70)]"
                  : finding.cvssScore >= 4
                    ? "text-[oklch(0.85_0.18_70)]"
                    : "text-muted-foreground"
            }`}
          >
            {finding.cvssScore.toFixed(1)}
          </span>
        </td>
        <td className="py-2.5 px-3">
          <span className="font-mono text-xs text-foreground">
            {finding.title}
          </span>
        </td>
        <td className="py-2.5 px-3">
          <span className="font-mono text-[10px] text-muted-foreground">
            {finding.port ? `:${finding.port}` : "—"} {finding.protocol ?? ""}
          </span>
        </td>
        <td className="py-2.5 px-3">
          <div className="flex items-center gap-2">
            <Badge variant="warning" className="text-[9px]">
              Open
            </Badge>
            <button
              type="button"
              className="opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Toggle details"
            >
              {expanded ? (
                <Minus className="w-3 h-3 text-muted-foreground" />
              ) : (
                <Plus className="w-3 h-3 text-muted-foreground" />
              )}
            </button>
          </div>
        </td>
      </tr>
      <AnimatePresence>
        {expanded && (
          <motion.tr
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <td colSpan={5} className="px-3 pb-3">
              <div className="rounded-lg bg-muted/10 border border-border/20 p-3 space-y-2">
                <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                  Description
                </p>
                <p className="text-xs text-foreground/80 leading-relaxed">
                  {finding.description}
                </p>
              </div>
            </td>
          </motion.tr>
        )}
      </AnimatePresence>
    </>
  );
}

// ── Scan Detail Report ────────────────────────────────────────────────────────

function ScanDetailReport({
  scan,
  aiAnalysis,
}: { scan: Scan; aiAnalysis?: AIAnalysis }) {
  const [aiThinkingOpen, setAiThinkingOpen] = useState(false);
  const findings = scan.findings;
  const criticalCount = findings.filter(
    (f) => f.severity.toLowerCase() === "critical",
  ).length;
  const highCount = findings.filter(
    (f) => f.severity.toLowerCase() === "high",
  ).length;
  const risk = findings.length > 0 ? overallRisk(findings) : "low";
  const avgCvss =
    findings.length > 0
      ? findings.reduce((s, f) => s + f.cvssScore, 0) / findings.length
      : 0;
  const netScore = Math.max(
    0,
    100 -
      criticalCount * 20 -
      highCount * 10 -
      (findings.length - criticalCount - highCount) * 3,
  );
  const reportId = `RPT-${String(scan.id).padStart(6, "0")}`;

  return (
    <motion.div
      key={String(scan.id)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-5"
    >
      {/* 1. Report Header */}
      <GlassCard depth gradient className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="w-4 h-4 text-primary" />
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                Security Assessment
              </span>
              <span className="font-mono text-[10px] text-muted-foreground/40">
                {reportId}
              </span>
            </div>
            <h2 className="font-display text-lg font-bold text-foreground truncate">
              {scan.target}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="font-mono text-[10px] text-muted-foreground">
                Generated: {formatDateTime(scan.startedAt)}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground/40">
                ·
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                Mode: {scan.mode}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground/40">
                ·
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                Duration: {getDuration(scan.startedAt, scan.completedAt)}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Badge variant={riskToBadge(risk)} dot={risk === "critical"}>
              {risk.toUpperCase()}
            </Badge>
            <NeonButton
              variant="ghost"
              size="sm"
              onClick={() => toast.info("Export feature coming soon")}
              data-ocid="export-pdf-btn"
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              PDF
            </NeonButton>
            <NeonButton
              variant="ghost"
              size="sm"
              onClick={() => toast.info("Share feature coming soon")}
              data-ocid="share-report-btn"
            >
              <Share2 className="w-3.5 h-3.5 mr-1" />
              Share
            </NeonButton>
          </div>
        </div>
      </GlassCard>

      {/* 2. Executive Summary */}
      <GlassCard depth className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <FileBarChart2 className="w-4 h-4 text-primary" />
          <h3 className="font-display text-sm font-semibold tracking-widest uppercase text-foreground">
            Executive Summary
          </h3>
          <Badge variant="muted" className="ml-auto font-mono text-[10px]">
            Non-Technical
          </Badge>
        </div>

        <p className="text-sm text-foreground/80 leading-relaxed mb-5">
          {findings.length === 0
            ? `This security assessment of ${scan.target} found no vulnerabilities. The target appears well-secured against common attack vectors. We recommend scheduling periodic re-assessments to maintain this posture.`
            : `This security assessment of ${scan.target} identified ${findings.length} vulnerabilit${findings.length > 1 ? "ies" : "y"} across the scanned surface. ${criticalCount > 0 ? `The most critical finding${criticalCount > 1 ? "s involve" : " involves"} ${criticalCount} critical-severity issue${criticalCount > 1 ? "s" : ""} requiring immediate remediation.` : ""} ${highCount > 0 ? `${highCount} high-severity issue${highCount > 1 ? "s were" : " was"} also identified.` : ""} Immediate attention from your security team is recommended to address these risks before they can be exploited.`}
        </p>

        <div className="grid grid-cols-3 gap-3 mb-5">
          {[
            {
              label: "Total Findings",
              value: findings.length,
              color: "text-foreground",
            },
            {
              label: "Critical Issues",
              value: criticalCount,
              color: "text-destructive",
            },
            {
              label: "Avg CVSS",
              value: avgCvss.toFixed(1),
              color: "text-[oklch(0.66_0.2_70)]",
            },
          ].map((m) => (
            <div
              key={m.label}
              className="text-center p-3 rounded-lg bg-muted/10 border border-border/20"
            >
              <p className={`font-display text-2xl font-bold ${m.color}`}>
                {m.value}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        <PostureGauge critical={criticalCount} total={findings.length} />
      </GlassCard>

      {/* 3. Security Score Card */}
      <GlassCard depth className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert className="w-4 h-4 text-primary" />
          <h3 className="font-display text-sm font-semibold tracking-widest uppercase text-foreground">
            Security Score
          </h3>
        </div>
        <div className="flex items-center gap-8 flex-wrap">
          <ScoreRing score={netScore} size={100} />
          <div className="flex-1 min-w-[160px] space-y-3">
            {[
              {
                label: "Network Risk",
                pct: Math.min(100, criticalCount * 30 + highCount * 15),
                color: "bg-destructive",
              },
              {
                label: "Web Risk",
                pct: Math.min(
                  100,
                  findings.filter(
                    (f) =>
                      f.findingType?.toLowerCase().includes("web") ||
                      f.findingType?.toLowerCase().includes("xss") ||
                      f.findingType?.toLowerCase().includes("sql"),
                  ).length * 25,
                ),
                color: "bg-[oklch(0.66_0.2_70)]",
              },
              {
                label: "API Risk",
                pct: Math.min(
                  100,
                  findings.filter(
                    (f) =>
                      f.findingType?.toLowerCase().includes("api") ||
                      f.protocol?.toLowerCase() === "http",
                  ).length * 20,
                ),
                color: "bg-accent",
              },
            ].map((r) => (
              <div key={r.label}>
                <div className="flex justify-between mb-1">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {r.label}
                  </span>
                  <span className="font-mono text-[10px] text-foreground/70">
                    {r.pct}%
                  </span>
                </div>
                <div className="h-1.5 rounded-full bg-muted/20 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${r.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${r.pct}%` }}
                    transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </GlassCard>

      {/* 4. Technical Details Table */}
      <GlassCard depth className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-4 h-4 text-primary" />
          <h3 className="font-display text-sm font-semibold tracking-widest uppercase text-foreground">
            Technical Findings
          </h3>
          <Badge variant="muted" className="ml-auto">
            {findings.length} total
          </Badge>
        </div>

        {findings.length === 0 ? (
          <EmptyState
            icon={<Shield className="w-5 h-5 text-muted-foreground" />}
            title="No findings"
            description="This scan returned no vulnerabilities."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-border/40">
                  {["Severity", "CVSS", "Title", "Port/Service", "Status"].map(
                    (h) => (
                      <th
                        key={h}
                        className="py-2 px-3 font-mono text-[10px] text-muted-foreground tracking-widest uppercase"
                      >
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody>
                {findings.map((f) => (
                  <FindingRow key={String(f.id)} finding={f} />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </GlassCard>

      {/* 5. Attack Path */}
      <GlassCard depth className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <ArrowRight className="w-4 h-4 text-destructive" />
          <h3 className="font-display text-sm font-semibold tracking-widest uppercase text-foreground">
            Attack Path Diagram
          </h3>
        </div>
        <AttackPathDiagram findings={findings} />
      </GlassCard>

      {/* 6. AI Insights (if available) */}
      {aiAnalysis && (
        <GlassCard depth glow="purple" className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Bot className="w-4 h-4 text-accent" />
            <h3 className="font-display text-sm font-semibold tracking-widest uppercase text-foreground">
              AI Intelligence Report
            </h3>
            <Badge variant="neon" className="ml-auto font-mono text-[10px]">
              AI Enhanced
            </Badge>
          </div>

          {/* AI Vulnerabilities */}
          {aiAnalysis.vulnerabilities.length > 0 && (
            <div className="mb-4 space-y-2">
              <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2">
                AI-Identified Vulnerabilities
              </p>
              {aiAnalysis.vulnerabilities.map(
                (v: AIVulnerability, i: number) => (
                  <div
                    key={`ai-vuln-${v.title}-${i}`}
                    className="p-3 rounded-lg bg-muted/10 border border-border/20"
                  >
                    <div className="flex items-start justify-between gap-2 mb-1.5">
                      <p className="font-mono text-xs font-semibold text-foreground">
                        {v.title}
                      </p>
                      <Badge
                        variant={severityVariant(v.severity)}
                        className="text-[9px] shrink-0"
                      >
                        {v.severity}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">
                      {v.description}
                    </p>
                    <div className="flex items-start gap-2 p-2 rounded bg-primary/5 border border-primary/10">
                      <Shield className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                      <p className="text-[10px] text-foreground/70 leading-snug">
                        {v.recommendation}
                      </p>
                    </div>
                  </div>
                ),
              )}
            </div>
          )}

          {/* AI Suggestions */}
          {aiAnalysis.suggestions.length > 0 && (
            <div className="mb-4">
              <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2">
                Recommended Actions
              </p>
              <ol className="space-y-2">
                {aiAnalysis.suggestions.map((s, i) => (
                  <li
                    key={`ai-sug-${i}-${s.slice(0, 20)}`}
                    className="flex items-start gap-2.5 text-xs text-foreground/80"
                  >
                    <span className="font-mono text-[10px] text-primary font-bold bg-primary/10 rounded px-1.5 py-0.5 shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-snug">{s}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* AI Thinking (collapsible) */}
          {aiAnalysis.thinking && (
            <div>
              <button
                type="button"
                onClick={() => setAiThinkingOpen((v) => !v)}
                className="flex items-center gap-2 w-full text-left font-mono text-[10px] text-muted-foreground tracking-widest uppercase hover:text-foreground transition-colors py-2 border-t border-border/20"
                data-ocid="ai-thinking-toggle"
              >
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${aiThinkingOpen ? "rotate-180" : ""}`}
                />
                AI Thinking Transcript
              </button>
              <AnimatePresence>
                {aiThinkingOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="p-3 rounded-lg bg-muted/5 border border-border/20 font-mono text-[10px] text-muted-foreground leading-relaxed whitespace-pre-wrap mt-2">
                      {aiAnalysis.thinking}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </GlassCard>
      )}

      {/* 7. Report Footer */}
      <GlassCard depth className="p-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span className="font-display text-xs font-bold text-foreground">
                CyberShield Platform
              </span>
            </div>
            <p className="font-mono text-[10px] text-muted-foreground/60 max-w-xs leading-relaxed">
              This report is confidential and intended solely for the authorized
              recipient. Findings reflect the state at time of scan and may
              change over time.
            </p>
          </div>
          <div className="text-right space-y-1">
            <p className="font-mono text-[10px] text-muted-foreground">
              Report ID: {reportId}
            </p>
            <p className="font-mono text-[10px] text-muted-foreground/60">
              Generated: {new Date().toLocaleDateString()}
            </p>
            <p className="font-mono text-[10px] text-muted-foreground/40">
              Powered by CyberShield AI Engine
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// ── AI Analysis Detail Report ─────────────────────────────────────────────────

function AIDetailReport({ analysis }: { analysis: AIAnalysis }) {
  const [thinkingOpen, setThinkingOpen] = useState(false);
  const risk = riskFromScore(Number(analysis.riskScore));
  const reportId = `AI-${String(analysis.id).padStart(6, "0")}`;

  return (
    <motion.div
      key={String(analysis.id)}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-5"
    >
      {/* Header */}
      <GlassCard depth gradient className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Bot className="w-4 h-4 text-accent" />
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                AI Intelligence Assessment
              </span>
              <span className="font-mono text-[10px] text-muted-foreground/40">
                {reportId}
              </span>
            </div>
            <h2 className="font-display text-lg font-bold text-foreground truncate">
              {analysis.target}
            </h2>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="font-mono text-[10px] text-muted-foreground">
                Completed: {formatDateTime(analysis.completedAt)}
              </span>
              <span className="font-mono text-[10px] text-muted-foreground/40">
                ·
              </span>
              <span className="font-mono text-[10px] text-muted-foreground">
                {analysis.vulnerabilities.length} vulnerabilities
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Badge variant={riskToBadge(risk)} dot={risk === "critical"}>
              {risk.toUpperCase()}
            </Badge>
            <NeonButton
              variant="ghost"
              size="sm"
              onClick={() => toast.info("Export feature coming soon")}
              data-ocid="export-ai-pdf-btn"
            >
              <Download className="w-3.5 h-3.5 mr-1" />
              PDF
            </NeonButton>
            <NeonButton
              variant="ghost"
              size="sm"
              onClick={() => toast.info("Share feature coming soon")}
              data-ocid="share-ai-report-btn"
            >
              <Share2 className="w-3.5 h-3.5 mr-1" />
              Share
            </NeonButton>
          </div>
        </div>
      </GlassCard>

      {/* Executive Summary */}
      <GlassCard depth className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <FileBarChart2 className="w-4 h-4 text-primary" />
          <h3 className="font-display text-sm font-semibold tracking-widest uppercase text-foreground">
            Executive Summary
          </h3>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed mb-4">
          {`AI analysis of ${analysis.target} identified ${analysis.vulnerabilities.length} potential vulnerability${analysis.vulnerabilities.length !== 1 ? "ies" : ""} with a risk score of ${analysis.riskScore}/100. ${analysis.suggestions.length} remediation actions have been recommended to improve security posture.`}
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Risk Score",
              value: String(analysis.riskScore),
              color:
                Number(analysis.riskScore) >= 80
                  ? "text-destructive"
                  : "text-[oklch(0.66_0.2_70)]",
            },
            {
              label: "Vulnerabilities",
              value: String(analysis.vulnerabilities.length),
              color: "text-accent",
            },
            {
              label: "Suggestions",
              value: String(analysis.suggestions.length),
              color: "text-primary",
            },
          ].map((m) => (
            <div
              key={m.label}
              className="text-center p-3 rounded-lg bg-muted/10 border border-border/20"
            >
              <p className={`font-display text-2xl font-bold ${m.color}`}>
                {m.value}
              </p>
              <p className="font-mono text-[10px] text-muted-foreground mt-0.5">
                {m.label}
              </p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Score */}
      <GlassCard depth className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <ShieldAlert className="w-4 h-4 text-accent" />
          <h3 className="font-display text-sm font-semibold tracking-widest uppercase text-foreground">
            Risk Score
          </h3>
        </div>
        <div className="flex items-center gap-8">
          <ScoreRing score={Number(analysis.riskScore)} size={100} />
          <div className="flex-1 space-y-1">
            <p className="font-mono text-xs text-muted-foreground leading-relaxed">
              AI-computed risk score based on identified vulnerabilities, their
              severity, and potential attack surface.
            </p>
            <div className="flex gap-2 mt-3 flex-wrap">
              {["critical", "high", "medium", "low"].map((sev) => {
                const n = analysis.vulnerabilities.filter(
                  (v) => v.severity.toLowerCase() === sev,
                ).length;
                if (n === 0) return null;
                return (
                  <div
                    key={sev}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-full border border-border/30 bg-muted/10"
                  >
                    <Circle className="w-2 h-2 fill-current text-muted-foreground" />
                    <span className="font-mono text-[10px] text-muted-foreground capitalize">
                      {sev}: {n}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Vulnerabilities */}
      <GlassCard depth className="p-5">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="w-4 h-4 text-[oklch(0.66_0.2_70)]" />
          <h3 className="font-display text-sm font-semibold tracking-widest uppercase text-foreground">
            AI-Identified Vulnerabilities
          </h3>
        </div>
        {analysis.vulnerabilities.length === 0 ? (
          <EmptyState
            icon={<Shield className="w-5 h-5 text-muted-foreground" />}
            title="No vulnerabilities found"
            description="AI analysis found no exploitable vulnerabilities."
          />
        ) : (
          <div className="space-y-3">
            {analysis.vulnerabilities.map((v, i) => (
              <div
                key={`vuln-${v.title}-${i}`}
                className="p-3 rounded-lg bg-muted/10 border border-border/20"
              >
                <div className="flex items-start justify-between gap-2 mb-1.5">
                  <p className="font-mono text-xs font-semibold text-foreground">
                    {v.title}
                  </p>
                  <Badge
                    variant={severityVariant(v.severity)}
                    className="text-[9px] shrink-0"
                  >
                    {v.severity}
                  </Badge>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed mb-2">
                  {v.description}
                </p>
                <div className="flex items-start gap-2 p-2 rounded bg-primary/5 border border-primary/10">
                  <Shield className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                  <p className="text-[10px] text-foreground/70 leading-snug">
                    {v.recommendation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {/* Suggestions */}
      {analysis.suggestions.length > 0 && (
        <GlassCard depth className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="w-4 h-4 text-primary" />
            <h3 className="font-display text-sm font-semibold tracking-widest uppercase text-foreground">
              Recommended Actions
            </h3>
          </div>
          <ol className="space-y-3">
            {analysis.suggestions.map((s, i) => (
              <li
                key={`sug-${i}-${s.slice(0, 20)}`}
                className="flex items-start gap-3"
              >
                <span className="font-mono text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 rounded px-2 py-1 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-sm text-foreground/80 leading-snug pt-0.5">
                  {s}
                </span>
              </li>
            ))}
          </ol>
        </GlassCard>
      )}

      {/* Thinking transcript */}
      {analysis.thinking && (
        <GlassCard depth className="p-5">
          <button
            type="button"
            onClick={() => setThinkingOpen((v) => !v)}
            className="flex items-center gap-2 w-full text-left font-mono text-[10px] text-muted-foreground tracking-widest uppercase hover:text-foreground transition-colors"
            data-ocid="thinking-toggle"
          >
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform ${thinkingOpen ? "rotate-180" : ""}`}
            />
            AI Thinking Transcript
          </button>
          <AnimatePresence>
            {thinkingOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="p-3 rounded-lg bg-muted/5 border border-border/20 font-mono text-[10px] text-muted-foreground leading-relaxed whitespace-pre-wrap mt-3">
                  {analysis.thinking}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </GlassCard>
      )}

      {/* Footer */}
      <GlassCard depth className="p-4">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Bot className="w-3.5 h-3.5 text-accent" />
              <span className="font-display text-xs font-bold text-foreground">
                CyberShield AI Engine
              </span>
            </div>
            <p className="font-mono text-[10px] text-muted-foreground/60 max-w-xs leading-relaxed">
              AI-generated report for informational purposes. Results should be
              validated by a qualified security professional.
            </p>
          </div>
          <div className="text-right space-y-1">
            <p className="font-mono text-[10px] text-muted-foreground">
              Report ID: {reportId}
            </p>
            <p className="font-mono text-[10px] text-muted-foreground/60">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function ReportsPage() {
  const scansQuery = useListScans();
  const analysesQuery = useListAnalyses();

  const scans = (scansQuery.data ?? []).filter((s) => s.status === "completed");
  const analyses = analysesQuery.data ?? [];

  const allItems: ReportItem[] = [
    ...scans.map((s): ReportItem => ({ kind: "scan", data: s })),
    ...analyses.map((a): ReportItem => ({ kind: "ai", data: a })),
  ].sort((a, b) => {
    const tsA =
      a.kind === "scan" ? Number(a.data.startedAt) : Number(a.data.completedAt);
    const tsB =
      b.kind === "scan" ? Number(b.data.startedAt) : Number(b.data.completedAt);
    return tsB - tsA;
  });

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedItem = selectedIndex !== null ? allItems[selectedIndex] : null;

  const isLoading = scansQuery.isLoading || analysesQuery.isLoading;
  const isError = scansQuery.isError || analysesQuery.isError;

  // Find matching AI analysis for a selected scan
  const matchingAI =
    selectedItem?.kind === "scan"
      ? analyses.find((a) => a.target === selectedItem.data.target)
      : undefined;

  return (
    <div
      className="flex h-[calc(100vh-64px)] overflow-hidden gap-0"
      data-ocid="reports-page"
    >
      {/* LEFT SIDEBAR */}
      <aside className="w-72 shrink-0 flex flex-col border-r border-border/30 bg-card/20 overflow-hidden">
        {/* Sidebar header */}
        <div className="p-4 border-b border-border/30 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <FileBarChart2 className="w-4 h-4 text-primary" />
            <h2 className="font-display text-sm font-semibold text-foreground tracking-wide">
              Reports
            </h2>
            <Badge variant="muted" className="ml-1 font-mono text-[10px]">
              {allItems.length}
            </Badge>
          </div>
          <NeonButton
            variant="outline"
            size="sm"
            data-ocid="new-report-btn"
            onClick={() =>
              toast.info("Navigate to Scan Center to start a new scan")
            }
          >
            <Plus className="w-3 h-3 mr-1" />
            New
          </NeonButton>
        </div>

        {/* Section labels */}
        {!isLoading && !isError && allItems.length > 0 && (
          <div className="px-4 pt-3 pb-1 shrink-0">
            <div className="flex items-center gap-3 font-mono text-[10px] text-muted-foreground">
              <div className="flex items-center gap-1">
                <Radar className="w-3 h-3 text-primary/60" />
                {scans.length} Scans
              </div>
              <div className="w-px h-3 bg-border/40" />
              <div className="flex items-center gap-1">
                <Bot className="w-3 h-3 text-accent/60" />
                {analyses.length} AI
              </div>
            </div>
          </div>
        )}

        {/* Report list */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {isLoading ? (
            <div className="space-y-2 pt-1">
              {Array.from({ length: 4 }, (_, i) => `sk-${i}`).map((k) => (
                <div
                  key={k}
                  className="h-16 rounded-lg bg-muted/20 animate-pulse"
                />
              ))}
            </div>
          ) : isError ? (
            <ErrorState
              message="Failed to load reports"
              onRetry={() => {
                scansQuery.refetch();
                analysesQuery.refetch();
              }}
            />
          ) : allItems.length === 0 ? (
            <EmptyState
              icon={<Wifi className="w-5 h-5 text-muted-foreground" />}
              title="No reports yet"
              description="Complete a scan to generate your first report"
              className="py-10"
            />
          ) : (
            allItems.map((item, i) => (
              <ReportListItem
                key={
                  item.kind === "scan"
                    ? `scan-${item.data.id}`
                    : `ai-${item.data.id}`
                }
                item={item}
                selected={selectedIndex === i}
                onClick={() => setSelectedIndex(selectedIndex === i ? null : i)}
                index={i}
              />
            ))
          )}
        </div>
      </aside>

      {/* RIGHT MAIN PANEL */}
      <main className="flex-1 overflow-y-auto p-5 min-w-0">
        <AnimatePresence mode="wait">
          {!selectedItem ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex items-center justify-center"
            >
              <EmptyState
                icon={<Shield className="w-10 h-10 text-muted-foreground/50" />}
                title="Select a report to view details"
                description="Click any report from the sidebar to load its full enterprise-grade assessment"
                className="border-border/20 max-w-sm"
                data-ocid="report-empty-state"
              />
            </motion.div>
          ) : selectedItem.kind === "scan" ? (
            <motion.div
              key={`scan-detail-${selectedItem.data.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ScanDetailReport
                scan={selectedItem.data}
                aiAnalysis={matchingAI}
              />
            </motion.div>
          ) : (
            <motion.div
              key={`ai-detail-${selectedItem.data.id}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <AIDetailReport analysis={selectedItem.data} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
