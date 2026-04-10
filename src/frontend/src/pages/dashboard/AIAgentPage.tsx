import { Badge } from "@/components/Badge";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { GlassCard } from "@/components/GlassCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { NeonButton } from "@/components/NeonButton";
import { useAnalyzeTarget, useListAnalyses } from "@/hooks/useQueries";
import { cn } from "@/lib/utils";
import type { AIAnalysis, AIVulnerability } from "@/types";
import {
  AlertTriangle,
  Bot,
  Brain,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  Clock,
  Download,
  Globe,
  Lightbulb,
  Loader2,
  Network,
  Radar,
  Search,
  Shield,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────

type StageStatus = "pending" | "active" | "done";

interface ThinkingStage {
  id: string;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  status: StageStatus;
}

// ── Constants ──────────────────────────────────────────────────────────────────

const SCAN_MODES = [
  { id: "quick", label: "Quick Recon" },
  { id: "full", label: "Full Scan" },
  { id: "deep", label: "Deep Analysis" },
  { id: "custom", label: "Custom" },
] as const;

const STAGE_DESCRIPTIONS: Record<string, string> = {
  RECON: "Gathering OSINT data & DNS records...",
  SCAN: "Port scanning & service detection...",
  ANALYZE: "Correlating findings with CVE database...",
  EXPLOIT: "Mapping attack surfaces & paths...",
};

function buildStages(isPending: boolean, isDone: boolean): ThinkingStage[] {
  const defs = [
    { id: "RECON", label: "Recon", icon: Search },
    { id: "SCAN", label: "Scan", icon: Radar },
    { id: "ANALYZE", label: "Analyze", icon: Brain },
    { id: "EXPLOIT", label: "Exploit", icon: Zap },
  ];
  return defs.map((d, i) => ({
    ...d,
    description: STAGE_DESCRIPTIONS[d.id],
    status: isDone
      ? "done"
      : isPending
        ? i === 0
          ? "done"
          : i === 1
            ? "done"
            : i === 2
              ? "active"
              : "pending"
        : "pending",
  }));
}

// ── AI Brain SVG Network ───────────────────────────────────────────────────────

interface BrainNode {
  id: string;
  x: number;
  y: number;
  type: "target" | "service" | "vuln";
  label: string;
}

interface BrainEdge {
  from: string;
  to: string;
  danger?: boolean;
}

function AIBrainNetwork({
  analysis,
  idle,
}: {
  analysis: AIAnalysis | null;
  idle: boolean;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  const nodes: BrainNode[] = analysis
    ? [
        { id: "t0", x: 160, y: 100, type: "target", label: analysis.target },
        { id: "s1", x: 60, y: 40, type: "service", label: "HTTP :80" },
        { id: "s2", x: 270, y: 30, type: "service", label: "SSH :22" },
        { id: "s3", x: 290, y: 165, type: "service", label: "DNS :53" },
        { id: "s4", x: 50, y: 160, type: "service", label: "HTTPS :443" },
        ...analysis.vulnerabilities.slice(0, 4).map((v, i) => ({
          id: `v${i}`,
          x: [90, 200, 230, 70][i] ?? 90,
          y: [145, 55, 130, 55][i] ?? 80,
          type: "vuln" as const,
          label: v.title.slice(0, 18),
        })),
      ]
    : [
        { id: "c0", x: 160, y: 100, type: "target", label: "TARGET" },
        { id: "c1", x: 60, y: 50, type: "service", label: "Node" },
        { id: "c2", x: 260, y: 50, type: "service", label: "Node" },
        { id: "c3", x: 270, y: 150, type: "service", label: "Node" },
        { id: "c4", x: 50, y: 150, type: "service", label: "Node" },
      ];

  const edges: BrainEdge[] = analysis
    ? [
        { from: "t0", to: "s1" },
        { from: "t0", to: "s2" },
        { from: "t0", to: "s3" },
        { from: "t0", to: "s4" },
        ...analysis.vulnerabilities.slice(0, 4).map((_, i) => ({
          from: "t0",
          to: `v${i}`,
          danger: true,
        })),
      ]
    : [
        { from: "c0", to: "c1" },
        { from: "c0", to: "c2" },
        { from: "c0", to: "c3" },
        { from: "c0", to: "c4" },
        { from: "c1", to: "c2" },
        { from: "c3", to: "c4" },
      ];

  const nodePos = Object.fromEntries(nodes.map((n) => [n.id, n]));

  return (
    <div className="relative w-full h-[200px] rounded-lg bg-muted/5 border border-border/20 overflow-hidden">
      <svg
        viewBox="0 0 320 200"
        className="w-full h-full"
        aria-label="AI brain network visualization"
        role="img"
      >
        <title>AI Brain Network</title>
        <defs>
          <filter id="glow-blue">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-red">
            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Edges */}
        {edges.map((e) => {
          const from = nodePos[e.from];
          const to = nodePos[e.to];
          if (!from || !to) return null;
          return (
            <line
              key={`${e.from}-${e.to}`}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke={e.danger ? "oklch(0.6 0.28 25)" : "oklch(0.67 0.3 257)"}
              strokeWidth={e.danger ? "1.2" : "0.8"}
              strokeOpacity={e.danger ? 0.5 : 0.3}
              strokeDasharray={e.danger ? "4 3" : undefined}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const r =
            node.type === "target" ? 18 : node.type === "service" ? 10 : 7;
          const fill =
            node.type === "target"
              ? "oklch(0.67 0.3 257)"
              : node.type === "service"
                ? "oklch(0.55 0.25 287)"
                : "oklch(0.6 0.28 25)";
          const isHov = hovered === node.id;
          return (
            <g key={node.id}>
              <circle
                cx={node.x}
                cy={node.y}
                r={r + 6}
                fill={fill}
                fillOpacity={isHov ? 0.15 : 0.06}
              />
              <circle
                cx={node.x}
                cy={node.y}
                r={r}
                fill={fill}
                fillOpacity={0.2}
                stroke={fill}
                strokeWidth="1.5"
                filter={
                  node.type === "target"
                    ? "url(#glow-blue)"
                    : node.type === "vuln"
                      ? "url(#glow-red)"
                      : undefined
                }
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
              />
              {node.type === "target" && (
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fontSize="7"
                  fontFamily="monospace"
                  fill="oklch(0.96 0.01 258)"
                  fillOpacity={0.9}
                >
                  TARGET
                </text>
              )}
              {isHov && (
                <text
                  x={node.x}
                  y={node.y - r - 6}
                  textAnchor="middle"
                  fontSize="7"
                  fontFamily="monospace"
                  fill="oklch(0.96 0.01 258)"
                  fillOpacity={0.9}
                >
                  {node.label.slice(0, 20)}
                </text>
              )}
            </g>
          );
        })}

        {/* Idle pulsing overlay */}
        {idle && (
          <circle
            cx="160"
            cy="100"
            r="60"
            fill="none"
            stroke="oklch(0.67 0.3 257)"
            strokeWidth="0.5"
            strokeOpacity="0.2"
            strokeDasharray="4 8"
          />
        )}
      </svg>
    </div>
  );
}

// ── Thinking Pipeline ──────────────────────────────────────────────────────────

function ThinkingPipeline({
  isPending,
  isDone,
}: {
  isPending: boolean;
  isDone: boolean;
}) {
  const stages = buildStages(isPending, isDone);

  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute left-[19px] top-8 bottom-8 w-px bg-border/20" />

      <div className="space-y-1">
        {stages.map((stage, i) => {
          const isActive = stage.status === "active";
          const isStageDone = stage.status === "done";
          return (
            <motion.div
              key={stage.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className={cn(
                "relative flex items-start gap-3 p-3 rounded-lg transition-smooth",
                isActive && "bg-accent/8 border border-accent/20",
                isStageDone && "bg-primary/5",
                !isActive && !isStageDone && "opacity-40",
              )}
            >
              {/* Stage icon bubble */}
              <div
                className={cn(
                  "relative flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-500",
                  isStageDone &&
                    "bg-primary/15 border-primary/40 shadow-[0_0_12px_rgba(79,140,255,0.3)]",
                  isActive &&
                    "bg-accent/15 border-accent/40 shadow-[0_0_14px_rgba(122,92,255,0.4)]",
                  !isActive && !isStageDone && "bg-muted/5 border-border/20",
                )}
              >
                {isStageDone ? (
                  <CheckCircle className="w-4 h-4 text-primary" />
                ) : isActive ? (
                  <Loader2 className="w-4 h-4 text-accent animate-spin" />
                ) : (
                  <stage.icon className="w-4 h-4 text-muted-foreground/50" />
                )}
              </div>

              <div className="flex-1 min-w-0 pt-1">
                <div className="flex items-center gap-2">
                  <p
                    className={cn(
                      "font-mono text-xs font-bold tracking-widest uppercase",
                      isStageDone && "text-primary",
                      isActive && "text-accent",
                      !isActive && !isStageDone && "text-muted-foreground",
                    )}
                  >
                    {stage.label}
                  </p>
                  {isActive && (
                    <Badge variant="neon" dot>
                      Live
                    </Badge>
                  )}
                </div>
                {(isActive || isStageDone) && (
                  <p className="text-[11px] text-muted-foreground mt-0.5 leading-relaxed">
                    {stage.description}
                  </p>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ── Idle Brain State ───────────────────────────────────────────────────────────

function IdleBrainState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center py-8 gap-5"
    >
      <div className="relative flex items-center justify-center">
        {/* Orbiting particles */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full bg-primary/60"
            style={{
              transform: `rotate(${i * 60}deg) translateX(38px)`,
              animation: `spin ${3 + i * 0.5}s linear infinite`,
              boxShadow: "0 0 6px rgba(79,140,255,0.8)",
            }}
          />
        ))}
        {/* Pulsing rings */}
        <div className="absolute w-20 h-20 rounded-full border border-primary/10 animate-ping" />
        <div className="absolute w-14 h-14 rounded-full border border-accent/15 animate-pulse" />
        {/* Brain icon */}
        <div className="relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/30 shadow-[0_0_20px_rgba(79,140,255,0.25)]">
          <Brain className="w-6 h-6 text-primary glow-primary" />
        </div>
      </div>
      <div className="text-center space-y-1">
        <p className="font-mono text-sm font-semibold text-primary tracking-widest uppercase glow-primary">
          AI READY
        </p>
        <p className="text-xs text-muted-foreground">
          Enter a target to begin analysis
        </p>
      </div>
    </motion.div>
  );
}

// ── Severity Badge ─────────────────────────────────────────────────────────────

function SeverityBadge({ severity }: { severity: string }) {
  const s = severity.toLowerCase();
  if (s === "critical") return <Badge variant="critical">Critical</Badge>;
  if (s === "high") return <Badge variant="danger">High</Badge>;
  if (s === "medium") return <Badge variant="warning">Medium</Badge>;
  return <Badge variant="muted">Low</Badge>;
}

// ── Vulnerability Item ─────────────────────────────────────────────────────────

function VulnerabilityItem({
  vuln,
  index,
}: {
  vuln: AIVulnerability;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.07 }}
      className="p-3 rounded-lg border border-border/25 bg-muted/5 hover:border-border/40 transition-smooth space-y-2"
    >
      <div className="flex items-start justify-between gap-2">
        <p className="font-mono text-xs font-semibold text-foreground leading-snug flex-1 min-w-0">
          {vuln.title}
        </p>
        <SeverityBadge severity={vuln.severity} />
      </div>
      <p className="text-[11px] text-muted-foreground leading-relaxed">
        {vuln.description}
      </p>
      {vuln.recommendation && (
        <div className="flex items-start gap-2 pt-1.5 border-t border-border/15">
          <Lightbulb className="w-3 h-3 text-accent shrink-0 mt-0.5" />
          <p className="text-[11px] text-accent/80 leading-relaxed">
            {vuln.recommendation}
          </p>
        </div>
      )}
    </motion.div>
  );
}

// ── Animated Risk Score ────────────────────────────────────────────────────────

function AnimatedRiskScore({ score }: { score: number }) {
  const [displayed, setDisplayed] = useState(0);
  const color =
    score >= 70
      ? "text-destructive drop-shadow-[0_0_10px_rgba(255,77,77,0.6)]"
      : score >= 40
        ? "text-[oklch(0.85_0.18_70)] drop-shadow-[0_0_10px_rgba(255,176,32,0.5)]"
        : "text-[oklch(0.75_0.2_145)] drop-shadow-[0_0_10px_rgba(0,220,100,0.4)]";
  const label = score >= 70 ? "HIGH RISK" : score >= 40 ? "MEDIUM" : "LOW RISK";
  const labelColor =
    score >= 70
      ? "text-destructive"
      : score >= 40
        ? "text-[oklch(0.85_0.18_70)]"
        : "text-[oklch(0.75_0.2_145)]";

  // Animate number up
  useEffect(() => {
    let frame: number;
    let start: number | null = null;
    const duration = 900;
    function animate(ts: number) {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setDisplayed(Math.round(progress * score));
      if (progress < 1) frame = requestAnimationFrame(animate);
    }
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [score]);

  const circumference = 2 * Math.PI * 40;
  const dashOffset = circumference * (1 - displayed / 100);

  return (
    <div className="flex items-center gap-5 p-4 rounded-xl bg-muted/8 border border-border/25">
      {/* Arc gauge */}
      <div className="relative flex-shrink-0 w-20 h-20">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          <title>Risk score gauge</title>
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke="oklch(0.22 0.02 270)"
            strokeWidth="8"
          />
          <circle
            cx="50"
            cy="50"
            r="40"
            fill="none"
            stroke={
              score >= 70
                ? "oklch(0.6 0.28 25)"
                : score >= 40
                  ? "oklch(0.66 0.2 70)"
                  : "oklch(0.75 0.2 145)"
            }
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`font-display text-xl font-bold ${color}`}>
            {displayed}
          </span>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-1">
          Risk Score
        </p>
        <p
          className={`font-mono text-sm font-bold tracking-wider ${labelColor}`}
        >
          {label}
        </p>
        <div className="flex gap-3 mt-2">
          <div className="text-center">
            <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
              Network
            </p>
            <div className="w-full h-1 rounded-full bg-muted/20 mt-1 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-700"
                style={{ width: `${Math.min(score * 1.1, 100)}%` }}
              />
            </div>
          </div>
          <div className="text-center">
            <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
              Web
            </p>
            <div className="w-full h-1 rounded-full bg-muted/20 mt-1 overflow-hidden">
              <div
                className="h-full bg-accent rounded-full transition-all duration-700"
                style={{ width: `${Math.min(score * 0.85, 100)}%` }}
              />
            </div>
          </div>
          <div className="text-center">
            <p className="font-mono text-[9px] text-muted-foreground uppercase tracking-widest">
              API
            </p>
            <div className="w-full h-1 rounded-full bg-muted/20 mt-1 overflow-hidden">
              <div
                className="h-full bg-destructive rounded-full transition-all duration-700"
                style={{ width: `${Math.min(score * 0.7, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── AI Output Panel ────────────────────────────────────────────────────────────

function AnalysisResultPanel({ analysis }: { analysis: AIAnalysis }) {
  const [thinkingOpen, setThinkingOpen] = useState(false);
  const riskScore = Number(analysis.riskScore);

  return (
    <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-240px)] pr-1">
      {/* Target header */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/15">
        <Globe className="w-3.5 h-3.5 text-primary flex-shrink-0" />
        <p className="font-mono text-xs text-primary truncate">
          {analysis.target}
        </p>
        <Badge variant="neon" className="ml-auto flex-shrink-0">
          Complete
        </Badge>
      </div>

      {/* Risk Score */}
      <AnimatedRiskScore score={riskScore} />

      {/* Vulnerabilities */}
      <div>
        <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2.5 flex items-center gap-2">
          <AlertTriangle className="w-3 h-3" />
          Vulnerabilities ({analysis.vulnerabilities.length})
        </p>
        {analysis.vulnerabilities.length === 0 ? (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-[oklch(0.75_0.2_145)]/8 border border-[oklch(0.75_0.2_145)]/20">
            <CheckCircle className="w-4 h-4 text-[oklch(0.75_0.2_145)] flex-shrink-0" />
            <span className="text-xs text-[oklch(0.75_0.2_145)]">
              No vulnerabilities detected
            </span>
          </div>
        ) : (
          <div className="space-y-2">
            {analysis.vulnerabilities.map((v, i) => (
              <VulnerabilityItem key={`${v.title}-${i}`} vuln={v} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* Suggestions */}
      {analysis.suggestions.length > 0 && (
        <div>
          <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2.5 flex items-center gap-2">
            <Lightbulb className="w-3 h-3" />
            Suggestions ({analysis.suggestions.length})
          </p>
          <div className="space-y-1.5">
            {analysis.suggestions.map((s, i) => (
              <motion.div
                key={s.slice(0, 30)}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-2 text-xs text-foreground/80 p-2.5 rounded-lg hover:bg-muted/5 transition-smooth"
              >
                <span className="font-mono text-[10px] text-primary font-bold w-4 shrink-0 mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <ChevronRight className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">{s}</span>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Thinking Transcript */}
      {analysis.thinking && (
        <div>
          <button
            type="button"
            onClick={() => setThinkingOpen((o) => !o)}
            className="w-full flex items-center justify-between p-3 rounded-lg border border-border/20 hover:border-accent/30 bg-muted/5 transition-smooth"
            data-ocid="thinking-toggle"
          >
            <div className="flex items-center gap-2">
              <Brain className="w-3.5 h-3.5 text-accent" />
              <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                AI Reasoning Transcript
              </span>
            </div>
            <ChevronDown
              className={cn(
                "w-3.5 h-3.5 text-muted-foreground transition-transform duration-200",
                thinkingOpen && "rotate-180",
              )}
            />
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
                <div className="mt-2 p-3 rounded-lg bg-muted/5 border border-accent/15">
                  <p className="text-[11px] text-muted-foreground leading-relaxed font-mono whitespace-pre-wrap">
                    {analysis.thinking}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Export */}
      <NeonButton
        variant="outline"
        size="sm"
        className="w-full"
        data-ocid="export-report-btn"
      >
        <Download className="w-3.5 h-3.5" />
        Export Report
      </NeonButton>
    </div>
  );
}

// ── Past Analyses List ─────────────────────────────────────────────────────────

function PastAnalysesList({
  analyses,
  isLoading,
  activeId,
  onSelect,
}: {
  analyses: AIAnalysis[];
  isLoading: boolean;
  activeId: bigint | null;
  onSelect: (a: AIAnalysis) => void;
}) {
  if (isLoading) return <LoadingSkeleton variant="list" rows={3} />;
  if (analyses.length === 0)
    return (
      <EmptyState
        icon={<Brain className="w-5 h-5 text-muted-foreground" />}
        title="No analyses yet"
        description="Run your first target analysis to see history here."
      />
    );
  return (
    <div className="space-y-1.5 max-h-52 overflow-y-auto">
      {analyses.slice(0, 10).map((a) => {
        const risk = Number(a.riskScore);
        const isActive = activeId === a.id;
        return (
          <motion.button
            type="button"
            key={String(a.id)}
            onClick={() => onSelect(a)}
            whileHover={{ x: 2 }}
            data-ocid={`past-analysis-${String(a.id)}`}
            className={cn(
              "w-full text-left p-2.5 rounded-lg border transition-smooth group",
              isActive
                ? "border-accent/40 bg-accent/8 shadow-[0_0_12px_rgba(122,92,255,0.15)]"
                : "border-border/20 hover:border-primary/30 hover:bg-primary/3",
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-xs text-foreground truncate flex-1">
                {a.target}
              </p>
              <span
                className={cn(
                  "font-mono text-[10px] font-bold px-1.5 py-0.5 rounded",
                  risk >= 70
                    ? "text-destructive bg-destructive/10"
                    : risk >= 40
                      ? "text-[oklch(0.85_0.18_70)] bg-[oklch(0.85_0.18_70)]/10"
                      : "text-[oklch(0.75_0.2_145)] bg-[oklch(0.75_0.2_145)]/10",
                )}
              >
                {risk}
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Clock className="w-2.5 h-2.5 text-muted-foreground/50" />
              <p className="font-mono text-[10px] text-muted-foreground/60">
                {a.vulnerabilities.length} vulns
              </p>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function AIAgentPage() {
  const [target, setTarget] = useState("");
  const [scanMode, setScanMode] = useState<string>("quick");
  const [activeAnalysis, setActiveAnalysis] = useState<AIAnalysis | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const analyzeMutation = useAnalyzeTarget();
  const analysesQuery = useListAnalyses();
  const analyses = analysesQuery.data ?? [];

  async function handleAnalyze() {
    if (!target.trim()) return;
    try {
      const result = await analyzeMutation.mutateAsync({
        target: target.trim(),
        context: scanMode,
      });
      if (result.ok) setActiveAnalysis(result.ok);
    } catch {
      // handled via mutation state
    }
  }

  const isPending = analyzeMutation.isPending;
  const isDone = !!activeAnalysis;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr_1.2fr] gap-5 min-h-0">
      {/* ── LEFT: Input + Config ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4"
      >
        <GlassCard depth className="p-5">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 border border-accent/25">
              <Bot className="w-3.5 h-3.5 text-accent" />
            </div>
            <h3 className="font-display font-bold text-xs tracking-widest uppercase text-foreground">
              Target Input
            </h3>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="ai-target-input"
                className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2 block"
              >
                IP / Domain / URL
              </label>
              <input
                ref={inputRef}
                id="ai-target-input"
                type="text"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="192.168.1.1 or target.com"
                data-ocid="ai-agent-target-input"
                className="w-full px-3 py-2.5 rounded-lg bg-muted/8 border border-border/30 text-sm text-foreground font-mono placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition-smooth"
                onKeyDown={(e) => e.key === "Enter" && handleAnalyze()}
                disabled={isPending}
              />
            </div>

            <div>
              <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2">
                Scan Mode
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {SCAN_MODES.map((mode) => (
                  <button
                    type="button"
                    key={mode.id}
                    onClick={() => setScanMode(mode.id)}
                    data-ocid={`scan-mode-${mode.id}`}
                    disabled={isPending}
                    className={cn(
                      "px-2 py-2 rounded-lg font-mono text-[10px] tracking-wide border transition-all text-center",
                      scanMode === mode.id
                        ? "bg-primary/12 border-primary/35 text-primary shadow-[0_0_8px_rgba(79,140,255,0.2)]"
                        : "bg-muted/5 border-border/20 text-muted-foreground hover:border-border/40 hover:text-foreground",
                    )}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>

            <NeonButton
              className="w-full"
              onClick={handleAnalyze}
              loading={isPending}
              loadingText="Analyzing..."
              disabled={!target.trim() || isPending}
              data-ocid="ai-agent-analyze-btn"
            >
              <Bot className="w-4 h-4" />
              Analyze Target
            </NeonButton>

            {analyzeMutation.isError && (
              <ErrorState
                message={analyzeMutation.error?.message ?? "Analysis failed"}
              />
            )}
          </div>
        </GlassCard>

        {/* Past Analyses */}
        <GlassCard depth className="p-5">
          <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-3 flex items-center gap-2">
            <Network className="w-3 h-3" />
            History ({analyses.length})
          </p>
          <PastAnalysesList
            analyses={analyses}
            isLoading={analysesQuery.isLoading}
            activeId={activeAnalysis?.id ?? null}
            onSelect={setActiveAnalysis}
          />
        </GlassCard>
      </motion.div>

      {/* ── CENTER: Thinking Timeline + Brain Visual ───────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <GlassCard
          depth
          gradient
          innerGlow
          className="p-5 h-full flex flex-col gap-5"
        >
          {/* Header */}
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 border border-primary/25">
              <Brain className="w-3.5 h-3.5 text-primary" />
            </div>
            <h3 className="font-display font-bold text-xs tracking-widest uppercase text-foreground">
              AI Thinking Timeline
            </h3>
            {isPending && (
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="font-mono text-[10px] text-accent tracking-widest">
                  RUNNING
                </span>
              </div>
            )}
            {isDone && !isPending && (
              <div className="ml-auto flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-primary" />
                <span className="font-mono text-[10px] text-primary tracking-widest">
                  COMPLETE
                </span>
              </div>
            )}
          </div>

          {/* Timeline or idle */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {isPending || isDone ? (
                <motion.div
                  key="pipeline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <ThinkingPipeline
                    isPending={isPending}
                    isDone={isDone && !isPending}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <IdleBrainState />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="border-t border-border/20" />

          {/* AI Brain Network */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Globe className="w-3.5 h-3.5 text-primary/60" />
              <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                AI Brain Visual
              </p>
              {activeAnalysis && (
                <span className="ml-auto font-mono text-[10px] text-primary/60">
                  {activeAnalysis.vulnerabilities.length} vuln nodes
                </span>
              )}
            </div>
            <AIBrainNetwork analysis={activeAnalysis} idle={!activeAnalysis} />
          </div>

          {/* Thinking Excerpt (while running) */}
          {isPending && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-3 rounded-lg bg-accent/5 border border-accent/15"
            >
              <div className="flex items-center gap-2 mb-2">
                <Loader2 className="w-3 h-3 text-accent animate-spin" />
                <p className="font-mono text-[10px] text-accent tracking-widest uppercase">
                  Processing
                </p>
              </div>
              <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">
                Correlating OSINT data with CVE database. Analyzing open ports
                and service fingerprints for known vulnerabilities...
              </p>
            </motion.div>
          )}
        </GlassCard>
      </motion.div>

      {/* ── RIGHT: Output Panel ────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      >
        <GlassCard depth className="p-5 h-full flex flex-col">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 border border-primary/25">
              <Shield className="w-3.5 h-3.5 text-primary" />
            </div>
            <h3 className="font-display font-bold text-xs tracking-widest uppercase text-foreground">
              AI Output
            </h3>
          </div>

          <div className="flex-1 overflow-hidden">
            <AnimatePresence mode="wait">
              {isPending ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <LoadingSkeleton variant="stat" />
                  <LoadingSkeleton variant="card" />
                  <LoadingSkeleton variant="list" rows={3} />
                  <div className="flex items-center gap-2 mt-3">
                    <Loader2 className="w-4 h-4 animate-spin text-accent" />
                    <span className="font-mono text-xs text-muted-foreground">
                      AI analyzing target...
                    </span>
                  </div>
                </motion.div>
              ) : activeAnalysis ? (
                <motion.div
                  key={String(activeAnalysis.id)}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <AnalysisResultPanel analysis={activeAnalysis} />
                </motion.div>
              ) : (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex items-center justify-center"
                >
                  <EmptyState
                    icon={
                      <Shield className="w-8 h-8 text-muted-foreground/40" />
                    }
                    title="No analysis results"
                    description="Enter a target and run analysis to see AI-powered vulnerability findings here."
                    data-ocid="output-empty-state"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </GlassCard>
      </motion.div>
    </div>
  );
}
