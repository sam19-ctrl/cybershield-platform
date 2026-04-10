import { Badge } from "@/components/Badge";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { GlassCard } from "@/components/GlassCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { NeonButton } from "@/components/NeonButton";
import { StatusIndicator } from "@/components/StatusIndicator";
import { useCreateScan, useListScans } from "@/hooks/useQueries";
import type { Finding, Scan } from "@/types";
import {
  Activity,
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleDot,
  Clock,
  Eye,
  FileText,
  Globe,
  Info,
  Loader2,
  Radar,
  Search,
  Shield,
  Terminal,
  Wifi,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Pipeline config ───────────────────────────────────────────────────────────
const PIPELINE_STAGES = [
  { id: "recon", label: "Recon", icon: Search, desc: "DNS & WHOIS lookup" },
  { id: "subdomain", label: "Subdomain", icon: Globe, desc: "Enum subdomains" },
  { id: "scan", label: "Scan", icon: Radar, desc: "Port & service scan" },
  { id: "vuln", label: "Vuln", icon: AlertTriangle, desc: "CVE analysis" },
  { id: "report", label: "Report", icon: FileText, desc: "Generate report" },
] as const;

const SCAN_MODES = ["quick", "full", "stealth", "aggressive"] as const;

// ── Log generation ─────────────────────────────────────────────────────────────
function buildLogs(target: string, findings: Finding[]): string[] {
  const base = [
    "[00:00:01] Initializing scan engine for target...",
    `[00:00:02] Target: ${target || "unknown"}`,
    "[00:00:03] Resolving DNS records...",
    "[00:00:05] DNS A record → 104.21.32.88",
    "[00:00:07] Port scan started (1-65535)...",
    "[00:00:12] Scanning ports with SYN technique",
    "[00:00:15] Port 22   OPEN ── SSH detected",
    "[00:00:16] Port 80   OPEN ── HTTP detected",
    "[00:00:17] Port 443  OPEN ── HTTPS/TLS detected",
    "[00:00:20] Port 8080 OPEN ── HTTP-proxy detected",
    "[00:00:23] Service fingerprinting running...",
    "[00:00:25] SSH banner: OpenSSH_8.2p1 Ubuntu",
    "[00:00:27] Vulnerability check running...",
  ];

  const findingLogs = findings.slice(0, 4).map((f, i) => {
    const prefix =
      f.severity.toLowerCase() === "critical" ||
      f.severity.toLowerCase() === "high"
        ? "[!] FINDING"
        : "[*] FINDING";
    const time = `00:00:${30 + i * 4}`.slice(0, 8);
    return `[${time}] ${prefix}: ${f.title || f.findingType} — ${f.severity.toUpperCase()}`;
  });

  return [
    ...base,
    ...findingLogs,
    `[DONE] Scan complete ── ${findings.length} finding${findings.length !== 1 ? "s" : ""} identified`,
  ];
}

const IDLE_LINES = [
  "    ██████╗  █████╗ ██╗ █████╗",
  "    ██╔══██╗██╔══██╗██║██╔══██╗",
  "    ██████╔╝███████║██║███████║",
  "    ██╔═══╝ ██╔══██║██║██╔══██║",
  "    ██║     ██║  ██║██║██║  ██║",
  "    ╚═╝     ╚═╝  ╚═╝╚═╝╚═╝  ╚═╝",
  "",
  "    PAIA SCAN SYSTEM v2.0",
  "    ─────────────────────────────────",
  "    Passive AI Infiltration Agent",
  "    Ready. Select a target to begin.",
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const diff = Date.now() - ms;
  if (diff < 60_000) return "just now";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  return new Date(ms).toLocaleDateString();
}

function getSeverityColor(severity: string) {
  switch (severity.toLowerCase()) {
    case "critical":
      return "text-destructive";
    case "high":
      return "text-[oklch(0.85_0.18_70)]";
    case "medium":
      return "text-[oklch(0.85_0.15_55)]";
    case "low":
      return "text-[oklch(0.75_0.2_145)]";
    default:
      return "text-muted-foreground";
  }
}

function getSeverityBadge(
  severity: string,
): "critical" | "danger" | "warning" | "success" | "muted" {
  switch (severity.toLowerCase()) {
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

// ── Scan Pipeline ─────────────────────────────────────────────────────────────
function ScanPipeline({ activeStep }: { activeStep: number }) {
  return (
    <div className="w-full">
      <div className="flex items-start justify-between gap-1 overflow-x-auto pb-2">
        {PIPELINE_STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const isDone = i < activeStep;
          const isActive = i === activeStep;

          return (
            <div
              key={stage.id}
              className="flex items-start gap-1 flex-1 min-w-0"
            >
              {/* Stage node */}
              <div className="flex flex-col items-center gap-1.5 flex-1 min-w-0">
                <motion.div
                  animate={
                    isActive
                      ? {
                          boxShadow: [
                            "0 0 0px rgba(122,92,255,0)",
                            "0 0 16px rgba(122,92,255,0.7)",
                            "0 0 8px rgba(122,92,255,0.4)",
                          ],
                        }
                      : isDone
                        ? { boxShadow: "0 0 10px rgba(79,140,255,0.4)" }
                        : {}
                  }
                  transition={{
                    duration: 1.5,
                    repeat: isActive ? Number.POSITIVE_INFINITY : 0,
                  }}
                  className={`relative flex items-center justify-center w-9 h-9 rounded-xl border transition-all duration-500 shrink-0 ${
                    isActive
                      ? "bg-accent/20 border-accent/60 text-accent"
                      : isDone
                        ? "bg-primary/15 border-primary/40 text-primary"
                        : "bg-muted/10 border-border/20 text-muted-foreground/40"
                  }`}
                >
                  {isDone ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isActive ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "linear",
                      }}
                    >
                      <Loader2 className="w-4 h-4" />
                    </motion.div>
                  ) : (
                    <Icon className="w-4 h-4" />
                  )}
                </motion.div>

                <div className="text-center">
                  <p
                    className={`font-mono text-[10px] tracking-widest uppercase font-semibold ${
                      isActive
                        ? "text-accent"
                        : isDone
                          ? "text-primary"
                          : "text-muted-foreground/40"
                    }`}
                  >
                    {stage.label}
                  </p>
                  <p className="font-mono text-[9px] text-muted-foreground/30 mt-0.5 hidden sm:block">
                    {stage.desc}
                  </p>
                </div>
              </div>

              {/* Connector line */}
              {i < PIPELINE_STAGES.length - 1 && (
                <div className="flex items-center mt-4 shrink-0">
                  <div className="relative w-6 h-[2px]">
                    <div className="absolute inset-0 bg-border/20 rounded-full" />
                    {isDone && (
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        className="absolute inset-0 bg-primary rounded-full origin-left"
                        style={{ boxShadow: "0 0 4px rgba(79,140,255,0.8)" }}
                      />
                    )}
                    {isActive && (
                      <motion.div
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{
                          duration: 1.2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                        className="absolute inset-0 bg-accent/60 rounded-full"
                      />
                    )}
                  </div>
                  <ChevronRight
                    className={`w-3 h-3 shrink-0 -ml-1 ${
                      isDone
                        ? "text-primary"
                        : isActive
                          ? "text-accent/60"
                          : "text-muted-foreground/20"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Terminal ──────────────────────────────────────────────────────────────────
function TerminalView({
  scan,
  isLaunching,
}: {
  scan: Scan | null;
  isLaunching: boolean;
}) {
  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  const isActive = isLaunching || scan?.status === "running";
  const isIdle = !scan && !isLaunching;
  const scanTarget = scan?.target ?? "";
  const scanFindings = scan?.findings ?? [];
  const scanId = scan?.id ?? null;

  // Animate log lines appearing
  useEffect(() => {
    if (isIdle) {
      setVisibleLines(IDLE_LINES);
      return;
    }
    if (scanId === null) return;

    const targetLines = buildLogs(scanTarget, scanFindings);
    setVisibleLines([]);

    let i = 0;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function addNext() {
      if (i < targetLines.length) {
        const idx = i;
        const delay = idx * 180 + 80;
        const t = setTimeout(() => {
          setVisibleLines((prev) => [...prev, targetLines[idx]]);
        }, delay);
        timers.push(t);
        i++;
        addNext();
      }
    }
    addNext();

    return () => timers.forEach(clearTimeout);
  }, [scanId, isIdle, scanTarget, scanFindings]);

  // Blink cursor
  useEffect(() => {
    const t = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(t);
  }, []);

  // Auto-scroll (keyed on length so we don't need the array itself)
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });

  function getLineColor(line: string) {
    if (line.startsWith("[!]") || line.includes("FINDING"))
      return "text-[oklch(0.85_0.18_70)]";
    if (line.startsWith("[DONE]")) return "text-[oklch(0.75_0.2_145)]";
    if (line.startsWith("    ██")) return "text-primary/60";
    if (line.startsWith("    PAIA")) return "text-primary font-semibold";
    if (line.startsWith("    ─") || line.startsWith("    Ready"))
      return "text-muted-foreground/50";
    if (line.startsWith("    Passive")) return "text-muted-foreground/40";
    if (line.startsWith("[+]")) return "text-[oklch(0.75_0.2_145)]";
    if (line.startsWith("[*]")) return "text-primary";
    return "text-[oklch(0.75_0.2_145)]/80";
  }

  return (
    <div className="rounded-xl overflow-hidden border border-border/20 bg-black/80 flex flex-col">
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 bg-muted/5 border-b border-border/20">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-destructive/70 hover:bg-destructive transition-colors" />
          <div className="w-3 h-3 rounded-full bg-[oklch(0.66_0.2_70)]/70 hover:bg-[oklch(0.66_0.2_70)] transition-colors" />
          <div className="w-3 h-3 rounded-full bg-[oklch(0.75_0.2_145)]/70 hover:bg-[oklch(0.75_0.2_145)] transition-colors" />
        </div>
        <div className="flex-1 text-center">
          <span className="font-mono text-[10px] text-muted-foreground/50">
            {scan ? `paia-scan-${scan.id}.log` : "paia-terminal"}
          </span>
        </div>
        {isActive && (
          <div className="flex items-center gap-1.5">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              className="w-2 h-2 rounded-full bg-[oklch(0.75_0.2_145)]"
            />
            <span className="font-mono text-[9px] text-[oklch(0.75_0.2_145)] tracking-widest">
              LIVE
            </span>
          </div>
        )}
      </div>

      {/* Log output */}
      <div
        ref={scrollRef}
        className="flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1"
        style={{ minHeight: "220px", maxHeight: "280px" }}
      >
        <AnimatePresence initial={false}>
          {visibleLines.map((line, i) => (
            <motion.div
              key={`log-line-${i}-${line.slice(0, 16)}`}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15 }}
              className={`leading-relaxed ${getLineColor(line)}`}
            >
              {line || "\u00A0"}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Cursor */}
        <div className="flex items-center gap-1.5 mt-1">
          <span className="text-[oklch(0.75_0.2_145)]/60">$</span>
          <span
            className={`inline-block w-2 h-4 bg-[oklch(0.75_0.2_145)] transition-opacity duration-100 ${
              cursorVisible ? "opacity-100" : "opacity-0"
            }`}
          />
        </div>
      </div>

      {/* Status bar */}
      <div className="px-4 py-1.5 border-t border-border/10 bg-muted/5 flex items-center gap-3">
        <span className="font-mono text-[9px] text-muted-foreground/30">
          {isActive ? "SCANNING" : scan ? "COMPLETE" : "READY"}
        </span>
        {scan && (
          <>
            <span className="text-border/20">·</span>
            <span className="font-mono text-[9px] text-muted-foreground/30">
              {scan.target}
            </span>
          </>
        )}
        <span className="font-mono text-[9px] text-muted-foreground/20 ml-auto">
          {visibleLines.length} lines
        </span>
      </div>
    </div>
  );
}

// ── Finding card ──────────────────────────────────────────────────────────────
function FindingCard({ finding }: { finding: Finding }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-lg border border-border/20 bg-muted/5 overflow-hidden"
    >
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="w-full flex items-start gap-3 p-3 text-left hover:bg-muted/10 transition-colors"
        data-ocid={`finding-card-${finding.id}`}
      >
        <div
          className={`shrink-0 mt-0.5 ${getSeverityColor(finding.severity)}`}
        >
          {finding.severity.toLowerCase() === "critical" ||
          finding.severity.toLowerCase() === "high" ? (
            <AlertCircle className="w-4 h-4" />
          ) : finding.severity.toLowerCase() === "medium" ? (
            <AlertTriangle className="w-4 h-4" />
          ) : (
            <Info className="w-4 h-4" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-mono text-xs text-foreground truncate">
              {finding.title || finding.findingType}
            </span>
            <Badge variant={getSeverityBadge(finding.severity)}>
              {finding.severity}
            </Badge>
            {finding.cvssScore > 0 && (
              <span className="font-mono text-[10px] text-muted-foreground">
                CVSS {finding.cvssScore.toFixed(1)}
              </span>
            )}
            {finding.port && (
              <span className="font-mono text-[10px] text-muted-foreground/60">
                :{String(finding.port)}
                {finding.protocol ? `/${finding.protocol}` : ""}
              </span>
            )}
          </div>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground/40 shrink-0 transition-transform ${
            expanded ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-3 pt-0 border-t border-border/10">
              <p className="font-mono text-xs text-muted-foreground leading-relaxed mt-2">
                {finding.description || "No additional details available."}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ── Scan detail (right panel) ─────────────────────────────────────────────────
function ScanDetailPanel({
  scan,
  isLaunching,
}: {
  scan: Scan | null;
  isLaunching: boolean;
}) {
  const findings = scan?.findings ?? [];
  const criticalCount = findings.filter(
    (f) => f.severity.toLowerCase() === "critical",
  ).length;
  const highCount = findings.filter(
    (f) => f.severity.toLowerCase() === "high",
  ).length;

  return (
    <div className="flex flex-col gap-4 h-full">
      {/* Terminal header */}
      <div className="flex items-center gap-2">
        <Terminal className="w-4 h-4 text-primary" />
        <h3 className="font-display font-semibold text-sm tracking-widest uppercase text-foreground">
          Terminal
        </h3>
        {scan && (
          <Badge
            variant={
              scan.status === "running"
                ? "neon"
                : scan.status === "completed"
                  ? "success"
                  : scan.status === "failed"
                    ? "danger"
                    : "muted"
            }
            dot={scan.status === "running"}
          >
            {scan.status}
          </Badge>
        )}
        {scan && (
          <span className="ml-auto font-mono text-[10px] text-muted-foreground truncate max-w-[120px]">
            {scan.target}
          </span>
        )}
      </div>

      <TerminalView scan={scan} isLaunching={isLaunching} />

      {/* Findings */}
      {scan && findings.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-3.5 h-3.5 text-primary" />
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
              Findings
            </span>
            <Badge variant="muted">{findings.length}</Badge>
            {criticalCount > 0 && (
              <Badge variant="critical">{criticalCount} crit</Badge>
            )}
            {highCount > 0 && <Badge variant="danger">{highCount} high</Badge>}
          </div>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
            {findings.map((f) => (
              <FindingCard key={String(f.id)} finding={f} />
            ))}
          </div>
        </div>
      )}

      {/* No scan selected idle */}
      {!scan && !isLaunching && (
        <div className="flex-1 flex items-center justify-center py-4">
          <div className="text-center space-y-2">
            <CircleDot className="w-6 h-6 text-muted-foreground/20 mx-auto" />
            <p className="font-mono text-xs text-muted-foreground/40">
              Select a scan to view details
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Scan row ──────────────────────────────────────────────────────────────────
function ScanRow({
  scan,
  onClick,
  isSelected,
}: {
  scan: Scan;
  onClick: () => void;
  isSelected: boolean;
}) {
  const progress = Number(scan.progress);

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      className={`group p-4 rounded-xl border transition-smooth cursor-pointer ${
        isSelected
          ? "border-primary/40 bg-primary/5 shadow-[0_0_16px_rgba(79,140,255,0.1)]"
          : "border-border/20 bg-muted/5 hover:border-primary/20 hover:bg-primary/3 hover:translate-y-[-1px]"
      }`}
      onClick={onClick}
      data-ocid={`scan-row-${scan.id}`}
    >
      <div className="flex items-start justify-between gap-3">
        {/* Icon + target */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className={`p-2 rounded-lg border shrink-0 transition-smooth ${
              scan.status === "running"
                ? "bg-primary/10 border-primary/30"
                : scan.status === "completed"
                  ? "bg-[oklch(0.75_0.2_145)]/10 border-[oklch(0.75_0.2_145)]/30"
                  : scan.status === "failed"
                    ? "bg-destructive/10 border-destructive/30"
                    : "bg-muted/10 border-border/20"
            }`}
          >
            {scan.status === "running" ? (
              <Loader2 className="w-4 h-4 text-primary animate-spin" />
            ) : scan.status === "completed" ? (
              <CheckCircle2 className="w-4 h-4 text-[oklch(0.75_0.2_145)]" />
            ) : scan.status === "failed" ? (
              <AlertCircle className="w-4 h-4 text-destructive" />
            ) : (
              <Radar className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-muted-foreground/50 shrink-0" />
              <p className="font-mono text-sm text-foreground truncate">
                {scan.target}
              </p>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest">
                {scan.mode}
              </span>
              <span className="text-border/30">·</span>
              <Clock className="w-2.5 h-2.5 text-muted-foreground/40" />
              <span className="font-mono text-[10px] text-muted-foreground/40">
                {formatTimestamp(scan.startedAt)}
              </span>
            </div>
          </div>
        </div>

        {/* Status */}
        <div className="flex flex-col items-end gap-1.5 shrink-0">
          {scan.status === "running" && (
            <StatusIndicator status="online" size="sm" pulse />
          )}
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

      {/* Progress bar (running) */}
      {scan.status === "running" && (
        <div className="mt-3">
          <div className="flex justify-between mb-1">
            <span className="font-mono text-[9px] text-muted-foreground/50 uppercase tracking-widest">
              Progress
            </span>
            <span className="font-mono text-[9px] text-primary">
              {progress}%
            </span>
          </div>
          <div className="h-1 rounded-full bg-muted/20 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={{ boxShadow: "0 0 8px rgba(79,140,255,0.7)" }}
            />
          </div>
        </div>
      )}

      {/* Findings summary */}
      {scan.findings.length > 0 && (
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/10">
          <FileText className="w-3 h-3 text-muted-foreground/40" />
          <span className="font-mono text-[10px] text-muted-foreground/50">
            {scan.findings.length} findings
          </span>
          {scan.findings.some(
            (f) => f.severity.toLowerCase() === "critical",
          ) && (
            <Badge variant="critical" className="text-[9px] py-0">
              {
                scan.findings.filter(
                  (f) => f.severity.toLowerCase() === "critical",
                ).length
              }{" "}
              crit
            </Badge>
          )}
          {scan.findings.some((f) => f.severity.toLowerCase() === "high") && (
            <Badge variant="danger" className="text-[9px] py-0">
              {
                scan.findings.filter((f) => f.severity.toLowerCase() === "high")
                  .length
              }{" "}
              high
            </Badge>
          )}
        </div>
      )}
    </motion.div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function ScanCenterPage() {
  const [target, setTarget] = useState("");
  const [scanMode, setScanMode] = useState<string>("quick");
  const [selectedScan, setSelectedScan] = useState<Scan | null>(null);

  const createScanMutation = useCreateScan();
  const scansQuery = useListScans();
  const scans = scansQuery.data ?? [];

  // activeStep for pipeline: 0=idle, 1-5 per stage
  const activeStep = createScanMutation.isPending
    ? 2
    : selectedScan?.status === "running"
      ? Math.min(4, Math.max(1, Math.floor(Number(selectedScan.progress) / 20)))
      : selectedScan?.status === "completed"
        ? 5
        : 0;

  async function handleScan() {
    if (!target.trim()) return;
    try {
      const result = await createScanMutation.mutateAsync({
        target: target.trim(),
        scanMode,
      });
      if (result.__kind__ === "ok") {
        setSelectedScan(result.ok);
        setTarget("");
      }
    } catch {
      // handled by mutation state
    }
  }

  // Sync selected scan with live data
  useEffect(() => {
    if (!selectedScan || !scans.length) return;
    const fresh = scans.find((s) => s.id === selectedScan.id);
    if (fresh) setSelectedScan(fresh);
  }, [scans, selectedScan]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-5"
    >
      {/* ── TOP SECTION ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* New Scan Form */}
        <div className="lg:col-span-2">
          <GlassCard depth innerGlow className="p-5 h-full">
            <div className="flex items-center gap-2 mb-5">
              <Radar className="w-4 h-4 text-primary" />
              <h3 className="font-display font-semibold text-sm tracking-widest uppercase text-foreground">
                New Scan
              </h3>
              <div className="ml-auto">
                <StatusIndicator status="online" size="sm" pulse />
              </div>
            </div>

            <div className="space-y-4">
              {/* Target */}
              <div>
                <label
                  htmlFor="scan-target"
                  className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2 block"
                >
                  Target
                </label>
                <input
                  id="scan-target"
                  type="text"
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  placeholder="192.168.1.0/24 or example.com"
                  data-ocid="scan-target-input"
                  className="w-full px-3 py-2.5 rounded-lg bg-black/30 border border-border/30 text-sm text-foreground font-mono placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition-smooth"
                  onKeyDown={(e) => e.key === "Enter" && handleScan()}
                />
              </div>

              {/* Mode */}
              <fieldset>
                <legend className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2 block">
                  Scan Mode
                </legend>
                <div className="grid grid-cols-2 gap-2">
                  {SCAN_MODES.map((mode) => (
                    <button
                      type="button"
                      key={mode}
                      onClick={() => setScanMode(mode)}
                      data-ocid={`scan-mode-${mode}`}
                      className={`px-3 py-2 rounded-lg font-mono text-[11px] tracking-widest uppercase border transition-all ${
                        scanMode === mode
                          ? "bg-primary/15 border-primary/40 text-primary shadow-[0_0_8px_rgba(79,140,255,0.3)]"
                          : "bg-muted/5 border-border/20 text-muted-foreground/60 hover:border-border/40 hover:text-muted-foreground"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </fieldset>

              <NeonButton
                className="w-full"
                onClick={handleScan}
                loading={createScanMutation.isPending}
                loadingText="Launching..."
                disabled={!target.trim()}
                data-ocid="launch-scan-btn"
              >
                <Zap className="w-4 h-4" />
                Launch Scan
              </NeonButton>

              {createScanMutation.isError && (
                <ErrorState
                  message={createScanMutation.error?.message}
                  className="mt-2"
                />
              )}
            </div>
          </GlassCard>
        </div>

        {/* Pipeline Visual */}
        <div className="lg:col-span-3">
          <GlassCard depth className="p-5 h-full">
            <div className="flex items-center gap-2 mb-5">
              <Activity className="w-4 h-4 text-accent" />
              <h3 className="font-display font-semibold text-sm tracking-widest uppercase text-foreground">
                Scan Pipeline
              </h3>
              {activeStep > 0 && activeStep < 5 && (
                <Badge variant="neon" dot>
                  Active
                </Badge>
              )}
              {activeStep === 5 && <Badge variant="success">Complete</Badge>}
            </div>
            <ScanPipeline activeStep={activeStep} />

            {/* Stage description */}
            <div className="mt-4 p-3 rounded-lg bg-muted/5 border border-border/10">
              <p className="font-mono text-[10px] text-muted-foreground/60 leading-relaxed">
                {activeStep === 0 &&
                  "Pipeline idle — configure a target above and press Launch Scan to begin."}
                {activeStep === 1 &&
                  "Recon phase: collecting DNS, WHOIS, and passive intelligence data."}
                {activeStep === 2 &&
                  "Subdomain enumeration in progress — discovering attack surface..."}
                {activeStep === 3 &&
                  "Port scanning: probing services across all TCP/UDP ports."}
                {activeStep === 4 &&
                  "Vulnerability analysis: correlating findings against CVE database."}
                {activeStep === 5 &&
                  "Scan complete — report generated. Review findings in the panel."}
              </p>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* ── BOTTOM SECTION ── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* Scans list */}
        <div className="lg:col-span-2">
          <GlassCard depth className="p-5 h-full">
            <div className="flex items-center gap-2 mb-5">
              <Shield className="w-4 h-4 text-primary" />
              <h3 className="font-display font-semibold text-sm tracking-widest uppercase text-foreground">
                All Scans
              </h3>
              <Badge variant="muted">{scans.length}</Badge>
              {scansQuery.isFetching && (
                <div className="ml-auto flex items-center gap-1.5">
                  <Wifi className="w-3 h-3 text-primary animate-pulse" />
                  <span className="font-mono text-[9px] text-muted-foreground/50">
                    Live
                  </span>
                </div>
              )}
            </div>

            {scansQuery.isLoading ? (
              <LoadingSkeleton variant="list" rows={4} />
            ) : scansQuery.isError ? (
              <ErrorState onRetry={() => scansQuery.refetch()} />
            ) : scans.length === 0 ? (
              <EmptyState
                icon={<Radar className="w-6 h-6 text-muted-foreground/40" />}
                title="No scans yet"
                description="Launch your first scan to start detecting vulnerabilities."
                action={{
                  label: "Start first scan",
                  onClick: () =>
                    document
                      .querySelector<HTMLInputElement>(
                        "[data-ocid='scan-target-input']",
                      )
                      ?.focus(),
                }}
                data-ocid="scans-empty-state"
              />
            ) : (
              <div className="space-y-3 max-h-[520px] overflow-y-auto pr-0.5">
                <AnimatePresence mode="popLayout">
                  {scans.map((scan) => (
                    <ScanRow
                      key={String(scan.id)}
                      scan={scan}
                      onClick={() => setSelectedScan(scan)}
                      isSelected={selectedScan?.id === scan.id}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Terminal + Findings */}
        <div className="lg:col-span-3">
          <GlassCard depth innerGlow className="p-5 h-full">
            <ScanDetailPanel
              scan={selectedScan}
              isLaunching={createScanMutation.isPending}
            />
          </GlassCard>
        </div>
      </div>
    </motion.div>
  );
}
