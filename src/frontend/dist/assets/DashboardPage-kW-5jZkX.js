import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, R as Radar, S as Shield, A as Activity, f as StatusIndicator, b as Network, G as Globe, L as Link, g as Bot, F as FileChartColumn, d as Cpu, r as reactExports, Z as Zap } from "./index-p-_K6v2l.js";
import { G as GlassCard, B as Badge } from "./GlassCard-BR9c0p-Q.js";
import { T as TriangleAlert, E as ErrorState, a as EmptyState } from "./ErrorState-kscm9ILp.js";
import { L as LoadingSkeleton, S as Search } from "./LoadingSkeleton-D4IbASRV.js";
import { b as useGetSystemStatus, c as useListActivities, d as useListScans, e as useListAnalyses } from "./useQueries-DgJaspKQ.js";
import { D as Database } from "./database-BqXkCoMF.js";
import { S as ShieldAlert } from "./shield-alert-BGigyO-F.js";
import { W as Wifi } from "./wifi-DM-NocU9.js";
import { C as Clock } from "./clock-BEXnusk5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  ["path", { d: "M9 13a4.5 4.5 0 0 0 3-4", key: "10igwf" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M12 13h4", key: "1ku699" }],
  ["path", { d: "M12 18h6a2 2 0 0 1 2 2v1", key: "105ag5" }],
  ["path", { d: "M12 8h8", key: "1lhi5i" }],
  ["path", { d: "M16 8V5a2 2 0 0 1 2-2", key: "u6izg6" }],
  ["circle", { cx: "16", cy: "13", r: ".5", key: "ry7gng" }],
  ["circle", { cx: "18", cy: "3", r: ".5", key: "1aiba7" }],
  ["circle", { cx: "20", cy: "21", r: ".5", key: "yhc1fs" }],
  ["circle", { cx: "20", cy: "8", r: ".5", key: "1e43v0" }]
];
const BrainCircuit = createLucideIcon("brain-circuit", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
function formatTimestamp(ts) {
  const ms = Number(ts / 1000000n);
  const diff = Date.now() - ms;
  if (diff < 6e4) return "just now";
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  if (diff < 864e5) return `${Math.floor(diff / 36e5)}h ago`;
  return new Date(ms).toLocaleDateString();
}
function eventTypeColor(eventType) {
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
function eventTypeBg(eventType) {
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
function eventTypeIcon(eventType) {
  const cls = `w-3 h-3 ${eventTypeColor(eventType)}`;
  switch (eventType) {
    case "ScanStarted":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { className: cls });
    case "ScanComplete":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: cls });
    case "VulnFound":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: cls });
    case "ThreatDetected":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: cls });
    case "APIHit":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: cls });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: cls });
  }
}
function severityToVariant(s) {
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
function riskColor(score) {
  if (score >= 75) return "oklch(0.75 0.2 145)";
  if (score >= 50) return "oklch(0.66 0.2 70)";
  return "oklch(0.6 0.28 25)";
}
function riskLabel(score) {
  if (score >= 80) return "EXCELLENT";
  if (score >= 65) return "GOOD";
  if (score >= 50) return "MODERATE";
  if (score >= 35) return "AT RISK";
  return "CRITICAL";
}
function StatCard({
  icon,
  label,
  value,
  sub,
  accent = "primary",
  delay,
  isLoading = false
}) {
  const accentBorder = accent === "danger" ? "hover:border-destructive/40" : accent === "warning" ? "hover:border-[oklch(0.66_0.2_70)]/40" : accent === "accent" ? "hover:border-accent/40" : "hover:border-primary/40";
  const iconBg = accent === "danger" ? "bg-destructive/10 border-destructive/20" : accent === "warning" ? "bg-[oklch(0.66_0.2_70)]/10 border-[oklch(0.66_0.2_70)]/20" : accent === "accent" ? "bg-accent/10 border-accent/20" : "bg-primary/10 border-primary/20";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlassCard,
        {
          depth: true,
          hover: true,
          className: `p-5 group ${accentBorder} transition-smooth`,
          "data-ocid": `stat-card-${label.toLowerCase().replace(/\s+/g, "-")}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2.5 rounded-lg border ${iconBg}`, children: icon }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4 text-muted-foreground/30 group-hover:text-muted-foreground/60 transition-colors" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground tracking-[0.15em] uppercase mb-1.5", children: label }),
            isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, { variant: "stat", className: "mt-1" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl font-bold text-foreground tabular-nums mb-1", children: value }),
              sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground/60", children: sub })
            ] })
          ]
        }
      )
    }
  );
}
function SecurityScoreCard({ score }) {
  const pct = Math.min(Number(score), 100);
  const r = 52;
  const circumference = 2 * Math.PI * r;
  const targetDash = pct / 100 * circumference;
  const color = riskColor(pct);
  const label = riskLabel(pct);
  const subScores = [
    { label: "Network Risk", value: Math.max(pct - 5, 0), icon: Network },
    { label: "Web Risk", value: Math.max(pct - 10, 0), icon: Globe },
    { label: "API Risk", value: Math.max(pct - 8, 0), icon: Database }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xs tracking-[0.15em] uppercase text-foreground", children: "Security Score" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "neon", children: label }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-36 h-36", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 120 120", className: "w-full h-full -rotate-90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Security score ring" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "60",
            cy: "60",
            r,
            fill: "none",
            stroke: "oklch(0.22 0.02 270)",
            strokeWidth: "9"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "60",
            cy: "60",
            r,
            fill: "none",
            strokeWidth: "9",
            strokeLinecap: "round",
            strokeDasharray: `${targetDash} ${circumference}`,
            style: {
              stroke: color,
              filter: `drop-shadow(0 0 8px ${color}) drop-shadow(0 0 16px ${color}40)`,
              transition: "stroke-dasharray 1.4s cubic-bezier(0.22,1,0.36,1)"
            }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-4xl font-bold text-foreground tabular-nums leading-none", children: pct }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground tracking-widest mt-0.5", children: "/ 100" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: subScores.map((item) => {
      const barColor = riskColor(item.value);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-3 h-3 text-muted-foreground" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground tracking-wide", children: item.label })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs font-semibold text-foreground", children: item.value })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted/20 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            className: "h-full rounded-full",
            style: {
              background: barColor,
              boxShadow: `0 0 6px ${barColor}80`
            },
            initial: { width: "0%" },
            animate: { width: `${item.value}%` },
            transition: {
              duration: 1.2,
              delay: 0.3,
              ease: [0.22, 1, 0.36, 1]
            }
          }
        ) })
      ] }, item.label);
    }) })
  ] });
}
function SystemControlPanel({ status }) {
  const aiStatus = status.aiEngineStatus === "active" ? "online" : "offline";
  const apiStatuses = status.apiStatuses ?? [];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Cpu, { className: "w-4 h-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xs tracking-[0.15em] uppercase text-foreground", children: "System Control" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIndicator, { status: "online", size: "sm", pulse: true }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2 mb-4", children: [
      {
        label: "AI Engine",
        value: status.aiEngineStatus.toUpperCase(),
        status: aiStatus,
        icon: BrainCircuit
      },
      {
        label: "Active Scans",
        value: String(status.activeScans),
        status: Number(status.activeScans) > 0 ? "online" : "unknown",
        icon: Radar
      },
      {
        label: "Queue",
        value: `${String(status.queueSize)} tasks`,
        status: Number(status.queueSize) > 5 ? "warning" : "online",
        icon: Database
      }
    ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-2 p-2.5 rounded-lg bg-muted/5 border border-border/20",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-4 h-4 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIndicator, { status: item.status, size: "sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[8px] text-muted-foreground tracking-widest text-center uppercase", children: item.label })
        ]
      },
      item.label
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/20 pt-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] text-muted-foreground/50 tracking-[0.15em] uppercase mb-2", children: "API Integrations" }),
      apiStatuses.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: apiStatuses.slice(0, 4).map((api) => {
        const isActive = api.status === "active";
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-2.5 py-1.5 rounded-md bg-muted/5 border border-border/15",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-3 h-3 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: api.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[9px] text-muted-foreground/50", children: [
                  String(api.responseTime),
                  "ms"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  StatusIndicator,
                  {
                    status: isActive ? "online" : "offline",
                    size: "sm"
                  }
                )
              ] })
            ]
          },
          api.name
        );
      }) }) : (
        // Static fallback pills showing expected integrations
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: ["Shodan", "VirusTotal", "Censys", "AlienVault"].map((name) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center justify-between px-2.5 py-1.5 rounded-md bg-muted/5 border border-border/15",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-3 h-3 text-muted-foreground" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIndicator, { status: "unknown", size: "sm" })
            ]
          },
          name
        )) })
      )
    ] })
  ] });
}
function LiveActivityFeed({ activities }) {
  const scrollRef = reactExports.useRef(null);
  const sorted = [...activities].sort((a, b) => b.timestamp > a.timestamp ? 1 : -1).slice(0, 15);
  if (!sorted.length) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-5 h-5 text-muted-foreground" }),
        title: "No activity yet",
        description: "Events will appear here as scans run."
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref: scrollRef,
      className: "space-y-1.5 max-h-[340px] overflow-y-auto pr-1",
      style: {
        scrollbarWidth: "thin",
        scrollbarColor: "oklch(0.22 0.02 270) transparent"
      },
      "data-ocid": "activity-feed-list",
      children: sorted.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 10 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: i * 0.03, duration: 0.2 },
          className: "flex items-start gap-2.5 px-3 py-2.5 rounded-lg bg-muted/5 border border-border/15 hover:border-border/30 transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `mt-0.5 p-1.5 rounded border shrink-0 ${eventTypeBg(entry.eventType)}`,
                children: eventTypeIcon(entry.eventType)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground leading-snug break-words", children: entry.message }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `font-mono text-[9px] font-semibold tracking-widest uppercase ${eventTypeColor(entry.eventType)}`,
                    children: entry.eventType
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[9px] text-muted-foreground/50 flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-2 h-2" }),
                  formatTimestamp(entry.timestamp)
                ] })
              ] })
            ] })
          ]
        },
        String(entry.id)
      ))
    }
  );
}
const AI_INSIGHTS = [
  {
    id: "ssh",
    icon: "⚠️",
    title: "SSH Brute Force Risk",
    description: "Port 22 is open on 3 targets. High exposure to automated SSH brute-force attacks detected in the last 24h.",
    severity: "high",
    source: "Port Scan + AI Analysis"
  },
  {
    id: "dns",
    icon: "🔍",
    title: "Elevated DNS Query Rate",
    description: "High DNS lookup rate detected — potential DNS exfiltration channel or misconfigured resolver.",
    severity: "medium",
    source: "Traffic Analysis"
  },
  {
    id: "cve",
    icon: "🛡️",
    title: "CVE-2024-1234 Exposure",
    description: "A dependency in your stack matches a known CVE with CVSS 8.2. Patch or workaround recommended.",
    severity: "critical",
    source: "Vulnerability DB"
  }
];
function AIInsightSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "w-4 h-4 text-accent" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xs tracking-[0.15em] uppercase text-foreground", children: "AI Insights" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "neon", className: "ml-auto", children: [
        AI_INSIGHTS.length,
        " active"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: AI_INSIGHTS.map((insight, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: -8 },
        animate: { opacity: 1, x: 0 },
        transition: { delay: 0.3 + i * 0.1, duration: 0.3 },
        className: `p-3.5 rounded-lg border transition-smooth cursor-default group
              ${insight.severity === "critical" ? "border-destructive/30 bg-destructive/5 hover:border-destructive/50 hover:bg-destructive/10" : insight.severity === "high" ? "border-[oklch(0.66_0.2_70)]/30 bg-[oklch(0.66_0.2_70)]/5 hover:border-[oklch(0.66_0.2_70)]/50" : "border-primary/20 bg-primary/5 hover:border-primary/40"}`,
        "data-ocid": `ai-insight-${insight.id}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-lg leading-none mt-0.5 shrink-0", children: insight.icon }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs font-semibold text-foreground", children: insight.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: severityToVariant(insight.severity), children: insight.severity })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: insight.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[9px] text-muted-foreground/40 mt-1.5 tracking-wide", children: [
              "Source: ",
              insight.source
            ] })
          ] })
        ] })
      },
      insight.id
    )) })
  ] });
}
function RecentScansCard({
  scans,
  isLoading,
  isError,
  refetch
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xs tracking-[0.15em] uppercase text-foreground", children: "Recent Scans" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/dashboard/scan-center",
          className: "font-mono text-[10px] text-primary hover:text-primary/80 transition-colors tracking-widest uppercase",
          "data-ocid": "view-all-scans",
          children: "View all →"
        }
      )
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, { variant: "list", rows: 4 }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { onRetry: refetch }) : scans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { className: "w-5 h-5 text-muted-foreground" }),
        title: "No scans yet",
        description: "Start your first scan to see results here.",
        action: {
          label: "Start Scan",
          onClick: () => {
            window.location.href = "/dashboard/scan-center";
          }
        }
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "scan-list", children: scans.slice(0, 5).map((scan) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center justify-between px-3 py-2.5 rounded-lg bg-muted/5 border border-border/15 hover:border-primary/25 hover:bg-primary/3 transition-smooth group",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded bg-primary/10 border border-primary/20 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { className: "w-3 h-3 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-foreground truncate", children: scan.target }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] text-muted-foreground/60", children: [
                scan.mode,
                " · ",
                formatTimestamp(scan.startedAt)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0 ml-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground/50", children: [
              scan.findings.length,
              " findings"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: scan.status === "completed" ? "success" : scan.status === "running" ? "neon" : scan.status === "failed" ? "danger" : "muted",
                dot: scan.status === "running",
                children: scan.status
              }
            )
          ] })
        ]
      },
      String(scan.id)
    )) })
  ] });
}
const QUICK_LINKS = [
  {
    label: "Scan Center",
    href: "/dashboard/scan-center",
    icon: Radar,
    color: "text-primary",
    bg: "bg-primary/10 border-primary/20 group-hover:border-primary/40"
  },
  {
    label: "AI Agent",
    href: "/dashboard/ai-agent",
    icon: Bot,
    color: "text-accent",
    bg: "bg-accent/10 border-accent/20 group-hover:border-accent/40"
  },
  {
    label: "Threat Intel",
    href: "/dashboard/threat-intel",
    icon: ShieldAlert,
    color: "text-destructive",
    bg: "bg-destructive/10 border-destructive/20 group-hover:border-destructive/40"
  },
  {
    label: "Reports",
    href: "/dashboard/reports",
    icon: FileChartColumn,
    color: "text-[oklch(0.66_0.2_70)]",
    bg: "bg-[oklch(0.66_0.2_70)]/10 border-[oklch(0.66_0.2_70)]/20 group-hover:border-[oklch(0.66_0.2_70)]/40"
  }
];
function QuickActions() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-4 gap-3", children: QUICK_LINKS.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: 0.5 + i * 0.06, duration: 0.25 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: item.href,
          "data-ocid": `quick-link-${item.label.toLowerCase().replace(/\s+/g, "-")}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlassCard,
            {
              hover: true,
              depth: true,
              className: "p-4 flex flex-col items-center gap-2.5 text-center group cursor-pointer",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `p-2.5 rounded-lg border transition-smooth ${item.bg}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: `w-4 h-4 ${item.color}` })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground tracking-widest uppercase", children: item.label })
              ]
            }
          )
        }
      )
    },
    item.href
  )) });
}
function DashboardPage() {
  const statusQuery = useGetSystemStatus();
  const activitiesQuery = useListActivities(15n);
  const scansQuery = useListScans();
  const analysesQuery = useListAnalyses();
  const status = statusQuery.data;
  const activities = activitiesQuery.data ?? [];
  const scans = scansQuery.data ?? [];
  const analyses = analysesQuery.data ?? [];
  const completedScans = scans.filter((s) => s.status === "completed").length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      className: "space-y-5",
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { className: "w-5 h-5 text-primary" }),
              label: "Total Scans",
              value: scans.length,
              sub: `${completedScans} completed`,
              accent: "primary",
              delay: 0,
              isLoading: scansQuery.isLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-destructive" }),
              label: "Active Threats",
              value: Number((status == null ? void 0 : status.activeScans) ?? 0),
              sub: "active scans running",
              accent: "danger",
              delay: 0.06,
              isLoading: statusQuery.isLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-[oklch(0.75_0.2_145)]" }),
              label: "Security Score",
              value: `${Number((status == null ? void 0 : status.securityScore) ?? 0)}%`,
              sub: status ? riskLabel(Number(status.securityScore)) : void 0,
              accent: "primary",
              delay: 0.12,
              isLoading: statusQuery.isLoading
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "w-5 h-5 text-accent" }),
              label: "AI Analyses",
              value: analyses.length,
              sub: "targets analyzed",
              accent: "accent",
              delay: 0.18,
              isLoading: analysesQuery.isLoading
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-2 space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
              statusQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, { variant: "card" }) : statusQuery.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { onRetry: () => statusQuery.refetch() }) : status ? /* @__PURE__ */ jsxRuntimeExports.jsx(SecurityScoreCard, { score: status.securityScore }) : null,
              /* @__PURE__ */ jsxRuntimeExports.jsx(AIInsightSection, {})
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              RecentScansCard,
              {
                scans,
                isLoading: scansQuery.isLoading,
                isError: scansQuery.isError,
                refetch: () => scansQuery.refetch()
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(QuickActions, {})
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
            statusQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, { variant: "card" }) : statusQuery.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { onRetry: () => statusQuery.refetch() }) : status ? /* @__PURE__ */ jsxRuntimeExports.jsx(SystemControlPanel, { status }) : null,
            /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-xs tracking-[0.15em] uppercase text-foreground", children: "Live Activity" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIndicator, { status: "online", size: "sm", pulse: true }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground/50 tracking-widest", children: "LIVE" })
                ] })
              ] }),
              activitiesQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, { variant: "list", rows: 5 }) : activitiesQuery.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { onRetry: () => activitiesQuery.refetch() }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LiveActivityFeed, { activities })
            ] })
          ] })
        ] })
      ]
    }
  );
}
export {
  DashboardPage as default
};
