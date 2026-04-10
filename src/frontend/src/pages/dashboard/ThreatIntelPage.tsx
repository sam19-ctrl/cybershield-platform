import { Badge } from "@/components/Badge";
import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { GlassCard } from "@/components/GlassCard";
import { LoadingSkeleton } from "@/components/LoadingSkeleton";
import { NeonButton } from "@/components/NeonButton";
import {
  useAddThreatEntry,
  useListThreats,
  useLookupThreat,
} from "@/hooks/useQueries";
import { cn } from "@/lib/utils";
import type { ThreatEntry } from "@/types";
import {
  Activity,
  AlertOctagon,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Database,
  ExternalLink,
  Globe,
  Hash,
  Info,
  Link,
  Loader2,
  Plus,
  Search,
  Shield,
  ShieldAlert,
  ShieldCheck,
  Siren,
  X,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const INDICATOR_TYPES = ["ip", "domain", "url", "hash", "email"] as const;
const RISK_LEVELS = ["critical", "high", "medium", "low"] as const;

function formatTimestamp(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatRelative(ts: bigint): string {
  const ms = Number(ts / 1_000_000n);
  const diffMin = Math.floor((Date.now() - ms) / 60000);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  return `${Math.floor(diffH / 24)}d ago`;
}

function riskVariant(
  level: string,
): "critical" | "danger" | "warning" | "muted" {
  switch (level.toLowerCase()) {
    case "critical":
      return "critical";
    case "high":
      return "danger";
    case "medium":
      return "warning";
    default:
      return "muted";
  }
}

function riskBarColor(level: string): string {
  switch (level.toLowerCase()) {
    case "critical":
      return "bg-destructive shadow-[0_0_8px_rgba(255,77,77,0.7)]";
    case "high":
      return "bg-[oklch(0.72_0.22_55)] shadow-[0_0_8px_rgba(255,140,20,0.6)]";
    case "medium":
      return "bg-[oklch(0.85_0.18_90)] shadow-[0_0_8px_rgba(255,210,50,0.5)]";
    case "low":
      return "bg-primary shadow-[0_0_8px_rgba(79,140,255,0.5)]";
    default:
      return "bg-muted-foreground";
  }
}

function riskGlowClass(level: string): string {
  switch (level.toLowerCase()) {
    case "critical":
      return "hover:border-destructive/50 hover:shadow-[0_0_20px_rgba(255,77,77,0.2)]";
    case "high":
      return "hover:border-[oklch(0.72_0.22_55)]/50 hover:shadow-[0_0_20px_rgba(255,140,20,0.15)]";
    case "medium":
      return "hover:border-[oklch(0.85_0.18_90)]/50 hover:shadow-[0_0_20px_rgba(255,210,50,0.12)]";
    default:
      return "hover:border-primary/40 hover:shadow-[0_0_20px_rgba(79,140,255,0.15)]";
  }
}

function IndicatorIcon({
  type,
  className,
}: { type: string; className?: string }) {
  const cls = cn("w-4 h-4", className);
  switch (type.toLowerCase()) {
    case "ip":
      return <Shield className={cls} />;
    case "domain":
      return <Globe className={cls} />;
    case "url":
      return <Link className={cls} />;
    case "hash":
      return <Hash className={cls} />;
    default:
      return <AlertOctagon className={cls} />;
  }
}

// ── Unified Intelligence Threat Card ──────────────────────────────────────────
function ThreatFeedCard({
  threat,
  index,
}: { threat: ThreatEntry; index: number }) {
  const riskBar = riskBarColor(threat.riskLevel);
  const glowHover = riskGlowClass(threat.riskLevel);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
      className={cn(
        "group relative flex rounded-xl overflow-hidden",
        "border border-border/30 bg-card/50 backdrop-blur-sm",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:bg-card/70",
        glowHover,
      )}
      data-ocid={`threat-card-${threat.id}`}
    >
      {/* Colored left risk bar */}
      <div className={cn("w-1 shrink-0 rounded-l-xl", riskBar)} />

      {/* Content */}
      <div className="flex-1 p-4 min-w-0">
        {/* Top row */}
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="p-1.5 rounded-md bg-muted/20 border border-border/20 shrink-0">
              <IndicatorIcon
                type={threat.indicatorType}
                className="text-muted-foreground"
              />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-sm text-foreground font-semibold truncate leading-tight">
                {threat.indicator}
              </p>
              <span className="font-mono text-[10px] text-muted-foreground/70 uppercase tracking-widest">
                {threat.indicatorType}
              </span>
            </div>
          </div>
          <Badge
            variant={riskVariant(threat.riskLevel)}
            className="shrink-0 mt-0.5"
          >
            {threat.riskLevel}
          </Badge>
        </div>

        {/* Description */}
        <p className="text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2">
          {threat.description}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2.5 border-t border-border/20">
          <div className="flex items-center gap-1.5 text-muted-foreground/60">
            <Database className="w-3 h-3" />
            <span className="font-mono text-[10px] truncate max-w-[100px]">
              {threat.source}
            </span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground/60">
            <Clock className="w-3 h-3" />
            <span className="font-mono text-[10px]">
              {formatRelative(threat.detectedAt)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ── Lookup result: full unified intelligence card ─────────────────────────────
function LookupResultCard({
  entry,
  relatedThreats,
}: { entry: ThreatEntry; relatedThreats: ThreatEntry[] }) {
  const riskBar = riskBarColor(entry.riskLevel);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="mt-4 pt-4 border-t border-border/30 space-y-3"
    >
      <div className="flex items-center gap-2 mb-1">
        <div className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" />
        <span className="font-mono text-xs text-destructive font-bold tracking-widest uppercase">
          Threat Identified
        </span>
      </div>

      {/* Main threat card */}
      <div className="flex rounded-xl overflow-hidden border border-destructive/30 bg-destructive/5">
        <div className={cn("w-1.5 shrink-0", riskBar)} />
        <div className="flex-1 p-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="font-mono text-base font-bold text-foreground break-all">
                {entry.indicator}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={riskVariant(entry.riskLevel)}>
                  {entry.riskLevel}
                </Badge>
                <span className="font-mono text-[10px] text-muted-foreground/70 uppercase tracking-widest border border-border/30 px-1.5 py-0.5 rounded">
                  {entry.indicatorType}
                </span>
              </div>
            </div>
            <ShieldAlert className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {entry.description}
          </p>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-border/20">
            <div>
              <p className="font-mono text-[9px] text-muted-foreground/50 tracking-widest uppercase mb-0.5">
                Source
              </p>
              <p className="font-mono text-xs text-foreground/80">
                {entry.source}
              </p>
            </div>
            <div>
              <p className="font-mono text-[9px] text-muted-foreground/50 tracking-widest uppercase mb-0.5">
                Detected
              </p>
              <p className="font-mono text-xs text-foreground/80">
                {formatTimestamp(entry.detectedAt)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related threats */}
      {relatedThreats.length > 0 && (
        <div>
          <p className="font-mono text-[9px] text-muted-foreground/60 tracking-widest uppercase mb-2">
            Related Indicators ({relatedThreats.length})
          </p>
          <div className="space-y-1.5">
            {relatedThreats.slice(0, 3).map((t) => (
              <div
                key={String(t.id)}
                className="flex items-center justify-between p-2.5 rounded-lg border border-border/20 bg-muted/5 gap-2"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div
                    className={cn(
                      "w-0.5 h-4 rounded-full shrink-0",
                      riskBarColor(t.riskLevel),
                    )}
                  />
                  <span className="font-mono text-xs text-foreground truncate">
                    {t.indicator}
                  </span>
                </div>
                <Badge
                  variant={riskVariant(t.riskLevel)}
                  className="text-[9px] shrink-0"
                >
                  {t.riskLevel}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ── Add Threat Modal ──────────────────────────────────────────────────────────
function AddThreatModal({ onClose }: { onClose: () => void }) {
  const addMutation = useAddThreatEntry();
  const [form, setForm] = useState({
    indicator: "",
    indicatorType: "ip",
    riskLevel: "medium",
    description: "",
    source: "",
  });

  async function handleSubmit() {
    if (!form.indicator || !form.description || !form.source) return;
    await addMutation.mutateAsync(form);
    onClose();
  }

  const inputCls =
    "w-full px-3 py-2.5 rounded-lg bg-muted/10 border border-border/40 text-sm text-foreground font-mono placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-smooth";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale: 0.95, y: 10 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.95, y: 10 }}
        className="w-full max-w-md"
      >
        <GlassCard depth gradient className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-md bg-primary/10 border border-primary/20">
                <Plus className="w-3.5 h-3.5 text-primary" />
              </div>
              <h3 className="font-display font-bold text-sm tracking-widest uppercase text-foreground">
                Add Threat Indicator
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg hover:bg-muted/20 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="modal-indicator"
                className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-1.5 block"
              >
                Indicator
              </label>
              <input
                id="modal-indicator"
                type="text"
                value={form.indicator}
                onChange={(e) =>
                  setForm({ ...form, indicator: e.target.value })
                }
                placeholder="IP, domain, URL, hash..."
                data-ocid="threat-indicator-input"
                className={inputCls}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="modal-type"
                  className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-1.5 block"
                >
                  Type
                </label>
                <select
                  id="modal-type"
                  value={form.indicatorType}
                  onChange={(e) =>
                    setForm({ ...form, indicatorType: e.target.value })
                  }
                  data-ocid="modal-type-select"
                  className={inputCls}
                >
                  {INDICATOR_TYPES.map((t) => (
                    <option key={t} value={t}>
                      {t.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="modal-risk"
                  className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-1.5 block"
                >
                  Risk
                </label>
                <select
                  id="modal-risk"
                  value={form.riskLevel}
                  onChange={(e) =>
                    setForm({ ...form, riskLevel: e.target.value })
                  }
                  data-ocid="modal-risk-select"
                  className={inputCls}
                >
                  {RISK_LEVELS.map((r) => (
                    <option key={r} value={r}>
                      {r.toUpperCase()}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label
                htmlFor="modal-source"
                className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-1.5 block"
              >
                Source
              </label>
              <input
                id="modal-source"
                type="text"
                value={form.source}
                onChange={(e) => setForm({ ...form, source: e.target.value })}
                placeholder="Shodan, VirusTotal, manual..."
                data-ocid="threat-source-input"
                className={inputCls}
              />
            </div>
            <div>
              <label
                htmlFor="modal-desc"
                className="font-mono text-xs text-muted-foreground tracking-widest uppercase mb-1.5 block"
              >
                Description
              </label>
              <textarea
                id="modal-desc"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                rows={3}
                placeholder="Describe the threat indicator..."
                data-ocid="threat-description-input"
                className={cn(inputCls, "resize-none")}
              />
            </div>
            <NeonButton
              className="w-full"
              onClick={handleSubmit}
              loading={addMutation.isPending}
              loadingText="Adding entry..."
              disabled={!form.indicator || !form.description || !form.source}
              data-ocid="add-threat-submit-btn"
            >
              <Plus className="w-4 h-4" />
              Add Threat Entry
            </NeonButton>
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  );
}

// ── Summary Stat Card ─────────────────────────────────────────────────────────
function StatCard({
  label,
  value,
  icon: Icon,
  colorClass,
  glowClass,
  index,
}: {
  label: string;
  value: number | string;
  icon: React.ComponentType<{ className?: string }>;
  colorClass: string;
  glowClass: string;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35 }}
    >
      <GlassCard
        depth
        className={cn(
          "p-4 transition-all duration-300 hover:-translate-y-1 group",
          glowClass,
        )}
      >
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-[10px] text-muted-foreground/70 tracking-widest uppercase">
            {label}
          </p>
          <div
            className={cn("p-1.5 rounded-md border bg-opacity-10", colorClass)}
          >
            <Icon className={cn("w-3.5 h-3.5", colorClass)} />
          </div>
        </div>
        <p className={cn("font-display text-3xl font-bold", colorClass)}>
          {value}
        </p>
      </GlassCard>
    </motion.div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function ThreatIntelPage() {
  const [filterType, setFilterType] = useState<string>("all");
  const [filterRisk, setFilterRisk] = useState<string>("all");
  const [showAddModal, setShowAddModal] = useState(false);
  const [lookupQuery, setLookupQuery] = useState("");
  const [lookupType, setLookupType] = useState("ip");

  const threatsQuery = useListThreats();
  const lookupMutation = useLookupThreat();
  const threats = threatsQuery.data ?? [];

  const filtered = threats.filter((t) => {
    const matchType = filterType === "all" || t.indicatorType === filterType;
    const matchRisk =
      filterRisk === "all" || t.riskLevel.toLowerCase() === filterRisk;
    return matchType && matchRisk;
  });

  const criticalCount = threats.filter(
    (t) => t.riskLevel.toLowerCase() === "critical",
  ).length;
  const highCount = threats.filter(
    (t) => t.riskLevel.toLowerCase() === "high",
  ).length;
  const sourcesCount = new Set(threats.map((t) => t.source)).size;

  const stats = [
    {
      label: "Total IOCs",
      value: threats.length,
      icon: Database,
      colorClass: "text-primary",
      glowClass:
        "hover:border-primary/40 hover:shadow-[0_0_20px_rgba(79,140,255,0.15)]",
    },
    {
      label: "Critical Threats",
      value: criticalCount,
      icon: Siren,
      colorClass: "text-destructive",
      glowClass:
        "hover:border-destructive/40 hover:shadow-[0_0_20px_rgba(255,77,77,0.15)]",
    },
    {
      label: "High Risk",
      value: highCount,
      icon: AlertTriangle,
      colorClass: "text-[oklch(0.72_0.22_55)]",
      glowClass:
        "hover:border-[oklch(0.72_0.22_55)]/40 hover:shadow-[0_0_20px_rgba(255,140,20,0.12)]",
    },
    {
      label: "Intel Sources",
      value: sourcesCount,
      icon: Activity,
      colorClass: "text-accent",
      glowClass:
        "hover:border-accent/40 hover:shadow-[0_0_20px_rgba(122,92,255,0.15)]",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="font-display text-xl font-bold text-foreground tracking-wide flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-destructive" />
            Threat Intelligence
          </h1>
          <p className="text-xs text-muted-foreground/70 font-mono mt-0.5">
            IOC monitoring · Unified intelligence lookup · Real-time feed
          </p>
        </div>
        <NeonButton
          variant="secondary"
          size="sm"
          onClick={() => setShowAddModal(true)}
          data-ocid="add-threat-btn"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Entry
        </NeonButton>
      </motion.div>

      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <StatCard key={s.label} {...s} index={i} />
        ))}
      </div>

      {/* Top: Lookup tool + result */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <GlassCard depth gradient className="p-5">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-md bg-accent/10 border border-accent/20">
              <Zap className="w-3.5 h-3.5 text-accent" />
            </div>
            <h2 className="font-display font-bold text-sm tracking-widest uppercase text-foreground">
              Unified Threat Lookup
            </h2>
            <span className="font-mono text-[9px] text-muted-foreground/50 tracking-widest uppercase border border-border/30 px-1.5 py-0.5 rounded">
              Live
            </span>
          </div>

          <div className="flex gap-3 items-end flex-wrap">
            <div className="flex-1 min-w-[160px]">
              <label
                htmlFor="lookup-indicator"
                className="font-mono text-[10px] text-muted-foreground/60 tracking-widest uppercase mb-1.5 block"
              >
                Indicator (IP · Domain · Hash · URL)
              </label>
              <input
                id="lookup-indicator"
                type="text"
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && lookupQuery.trim()) {
                    lookupMutation.mutate({
                      indicator: lookupQuery,
                      indicatorType: lookupType,
                    });
                  }
                }}
                placeholder="192.168.1.1, malware.exe, evil.com..."
                data-ocid="lookup-indicator-input"
                className="w-full px-3 py-2.5 rounded-lg bg-muted/10 border border-border/40 text-sm text-foreground font-mono placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-smooth"
              />
            </div>
            <div className="w-36">
              <label
                htmlFor="lookup-type"
                className="font-mono text-[10px] text-muted-foreground/60 tracking-widest uppercase mb-1.5 block"
              >
                Type
              </label>
              <select
                id="lookup-type"
                value={lookupType}
                onChange={(e) => setLookupType(e.target.value)}
                data-ocid="lookup-type-select"
                className="w-full px-3 py-2.5 rounded-lg bg-muted/10 border border-border/40 text-sm text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary/50 transition-smooth"
              >
                {INDICATOR_TYPES.map((t) => (
                  <option key={t} value={t}>
                    {t.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            <NeonButton
              onClick={() =>
                lookupMutation.mutate({
                  indicator: lookupQuery,
                  indicatorType: lookupType,
                })
              }
              loading={lookupMutation.isPending}
              loadingText="Searching..."
              disabled={!lookupQuery.trim()}
              data-ocid="lookup-search-btn"
              className="h-[42px] shrink-0"
            >
              <Search className="w-4 h-4" />
              Lookup Threat
            </NeonButton>
          </div>

          {/* Lookup in progress */}
          {lookupMutation.isPending && (
            <div className="mt-4 flex items-center gap-2 p-3 rounded-lg bg-muted/10 border border-border/20">
              <Loader2 className="w-4 h-4 animate-spin text-accent" />
              <span className="font-mono text-xs text-muted-foreground">
                Querying threat intelligence database...
              </span>
            </div>
          )}

          {/* Lookup result */}
          <AnimatePresence mode="wait">
            {lookupMutation.data &&
              !lookupMutation.isPending &&
              (lookupMutation.data.found && lookupMutation.data.entry ? (
                <LookupResultCard
                  key="found"
                  entry={lookupMutation.data.entry}
                  relatedThreats={lookupMutation.data.relatedThreats}
                />
              ) : (
                <motion.div
                  key="clean"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 pt-4 border-t border-border/30"
                >
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-[oklch(0.75_0.2_145)]/8 border border-[oklch(0.75_0.2_145)]/25">
                    <ShieldCheck className="w-5 h-5 text-[oklch(0.75_0.2_145)] shrink-0" />
                    <div>
                      <p className="font-mono text-sm font-bold text-[oklch(0.75_0.2_145)]">
                        Clean — No Threats Detected
                      </p>
                      <p className="font-mono text-xs text-muted-foreground/60 mt-0.5">
                        <span className="text-foreground/70">
                          {lookupQuery}
                        </span>{" "}
                        is not present in our threat database.
                      </p>
                    </div>
                    <CheckCircle2 className="w-5 h-5 text-[oklch(0.75_0.2_145)]/50 ml-auto shrink-0" />
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
        </GlassCard>
      </motion.div>

      {/* Threat Feed section */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28 }}
      >
        <GlassCard depth className="p-5">
          {/* Feed header + filters */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
            <div className="flex items-center gap-2">
              <AlertOctagon className="w-4 h-4 text-destructive" />
              <h2 className="font-display font-bold text-sm tracking-widest uppercase text-foreground">
                Live Threat Feed
              </h2>
              <Badge variant="muted">{filtered.length} entries</Badge>
            </div>

            {/* Filter pills */}
            <div className="flex flex-wrap gap-2">
              {/* Risk filter */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/10 border border-border/20">
                {["all", ...RISK_LEVELS].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setFilterRisk(level)}
                    data-ocid={`filter-risk-${level}`}
                    className={cn(
                      "px-2.5 py-1 rounded-md font-mono text-[10px] tracking-widest uppercase transition-all duration-200",
                      filterRisk === level
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : "text-muted-foreground/60 hover:text-foreground hover:bg-muted/20",
                    )}
                  >
                    {level === "all" ? "All" : level}
                  </button>
                ))}
              </div>

              {/* Type filter */}
              <div className="flex items-center gap-1 p-1 rounded-lg bg-muted/10 border border-border/20">
                {["all", ...INDICATOR_TYPES].map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setFilterType(type)}
                    data-ocid={`filter-type-${type}`}
                    className={cn(
                      "px-2.5 py-1 rounded-md font-mono text-[10px] tracking-widest uppercase transition-all duration-200",
                      filterType === type
                        ? "bg-accent/20 text-accent border border-accent/30"
                        : "text-muted-foreground/60 hover:text-foreground hover:bg-muted/20",
                    )}
                  >
                    {type === "all" ? "All" : type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Feed content */}
          {threatsQuery.isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {Array.from({ length: 6 }, (_, i) => `sk-${i}`).map((k) => (
                <LoadingSkeleton key={k} variant="list" rows={1} />
              ))}
            </div>
          ) : threatsQuery.isError ? (
            <ErrorState onRetry={() => threatsQuery.refetch()} />
          ) : filtered.length === 0 ? (
            <EmptyState
              icon={<ShieldCheck className="w-7 h-7 text-muted-foreground" />}
              title={
                filterRisk !== "all" || filterType !== "all"
                  ? "No matching threats"
                  : "No threats tracked"
              }
              description={
                filterRisk !== "all" || filterType !== "all"
                  ? "Try adjusting the risk or type filters to see more entries."
                  : "Add your first threat indicator to start building your intelligence database."
              }
              action={
                filterRisk === "all" && filterType === "all"
                  ? {
                      label: "Add First Entry",
                      onClick: () => setShowAddModal(true),
                    }
                  : undefined
              }
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((threat, i) => (
                  <ThreatFeedCard
                    key={String(threat.id)}
                    threat={threat}
                    index={i}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </GlassCard>
      </motion.div>

      {/* Info bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/15"
      >
        <Info className="w-3.5 h-3.5 text-primary/60 shrink-0" />
        <p className="font-mono text-[10px] text-muted-foreground/60">
          Threat data refreshes every 5 seconds. All IOCs are matched against
          global threat intelligence feeds including Shodan, VirusTotal, and
          internal watchlists.
        </p>
      </motion.div>

      {/* Add Threat Modal */}
      <AnimatePresence>
        {showAddModal && (
          <AddThreatModal onClose={() => setShowAddModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
