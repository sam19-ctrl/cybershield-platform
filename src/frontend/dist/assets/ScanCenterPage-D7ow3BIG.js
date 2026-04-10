import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, R as Radar, f as StatusIndicator, N as NeonButton, Z as Zap, A as Activity, S as Shield, h as AnimatePresence, G as Globe, l as FileText, i as LoaderCircle, C as ChevronRight, k as ChevronDown } from "./index-p-_K6v2l.js";
import { G as GlassCard, B as Badge } from "./GlassCard-BR9c0p-Q.js";
import { E as ErrorState, a as EmptyState, T as TriangleAlert } from "./ErrorState-kscm9ILp.js";
import { L as LoadingSkeleton, S as Search } from "./LoadingSkeleton-D4IbASRV.js";
import { g as useCreateScan, d as useListScans } from "./useQueries-DgJaspKQ.js";
import { W as Wifi } from "./wifi-DM-NocU9.js";
import { C as CircleCheck } from "./circle-check-BfASjlh5.js";
import { C as CircleAlert } from "./circle-alert-34-6wqPd.js";
import { C as Clock } from "./clock-BEXnusk5.js";
import { E as Eye } from "./eye-ovx43pT0.js";
import { I as Info } from "./info-CBsvrnkN.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }]
];
const CircleDot = createLucideIcon("circle-dot", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M12 19h8", key: "baeox8" }],
  ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
];
const Terminal = createLucideIcon("terminal", __iconNode);
const PIPELINE_STAGES = [
  { id: "recon", label: "Recon", icon: Search, desc: "DNS & WHOIS lookup" },
  { id: "subdomain", label: "Subdomain", icon: Globe, desc: "Enum subdomains" },
  { id: "scan", label: "Scan", icon: Radar, desc: "Port & service scan" },
  { id: "vuln", label: "Vuln", icon: TriangleAlert, desc: "CVE analysis" },
  { id: "report", label: "Report", icon: FileText, desc: "Generate report" }
];
const SCAN_MODES = ["quick", "full", "stealth", "aggressive"];
function buildLogs(target, findings) {
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
    "[00:00:27] Vulnerability check running..."
  ];
  const findingLogs = findings.slice(0, 4).map((f, i) => {
    const prefix = f.severity.toLowerCase() === "critical" || f.severity.toLowerCase() === "high" ? "[!] FINDING" : "[*] FINDING";
    const time = `00:00:${30 + i * 4}`.slice(0, 8);
    return `[${time}] ${prefix}: ${f.title || f.findingType} — ${f.severity.toUpperCase()}`;
  });
  return [
    ...base,
    ...findingLogs,
    `[DONE] Scan complete ── ${findings.length} finding${findings.length !== 1 ? "s" : ""} identified`
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
  "    Ready. Select a target to begin."
];
function formatTimestamp(ts) {
  const ms = Number(ts / 1000000n);
  const diff = Date.now() - ms;
  if (diff < 6e4) return "just now";
  if (diff < 36e5) return `${Math.floor(diff / 6e4)}m ago`;
  return new Date(ms).toLocaleDateString();
}
function getSeverityColor(severity) {
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
function getSeverityBadge(severity) {
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
function ScanPipeline({ activeStep }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-start justify-between gap-1 overflow-x-auto pb-2", children: PIPELINE_STAGES.map((stage, i) => {
    const Icon = stage.icon;
    const isDone = i < activeStep;
    const isActive = i === activeStep;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-start gap-1 flex-1 min-w-0",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1.5 flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                animate: isActive ? {
                  boxShadow: [
                    "0 0 0px rgba(122,92,255,0)",
                    "0 0 16px rgba(122,92,255,0.7)",
                    "0 0 8px rgba(122,92,255,0.4)"
                  ]
                } : isDone ? { boxShadow: "0 0 10px rgba(79,140,255,0.4)" } : {},
                transition: {
                  duration: 1.5,
                  repeat: isActive ? Number.POSITIVE_INFINITY : 0
                },
                className: `relative flex items-center justify-center w-9 h-9 rounded-xl border transition-all duration-500 shrink-0 ${isActive ? "bg-accent/20 border-accent/60 text-accent" : isDone ? "bg-primary/15 border-primary/40 text-primary" : "bg-muted/10 border-border/20 text-muted-foreground/40"}`,
                children: isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4" }) : isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    animate: { rotate: 360 },
                    transition: {
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear"
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4" })
                  }
                ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: `font-mono text-[10px] tracking-widest uppercase font-semibold ${isActive ? "text-accent" : isDone ? "text-primary" : "text-muted-foreground/40"}`,
                  children: stage.label
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] text-muted-foreground/30 mt-0.5 hidden sm:block", children: stage.desc })
            ] })
          ] }),
          i < PIPELINE_STAGES.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mt-4 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-6 h-[2px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-border/20 rounded-full" }),
              isDone && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { scaleX: 0 },
                  animate: { scaleX: 1 },
                  className: "absolute inset-0 bg-primary rounded-full origin-left",
                  style: { boxShadow: "0 0 4px rgba(79,140,255,0.8)" }
                }
              ),
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  animate: { opacity: [0.3, 1, 0.3] },
                  transition: {
                    duration: 1.2,
                    repeat: Number.POSITIVE_INFINITY
                  },
                  className: "absolute inset-0 bg-accent/60 rounded-full"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChevronRight,
              {
                className: `w-3 h-3 shrink-0 -ml-1 ${isDone ? "text-primary" : isActive ? "text-accent/60" : "text-muted-foreground/20"}`
              }
            )
          ] })
        ]
      },
      stage.id
    );
  }) }) });
}
function TerminalView({
  scan,
  isLaunching
}) {
  const [visibleLines, setVisibleLines] = reactExports.useState([]);
  const [cursorVisible, setCursorVisible] = reactExports.useState(true);
  const scrollRef = reactExports.useRef(null);
  const isActive = isLaunching || (scan == null ? void 0 : scan.status) === "running";
  const isIdle = !scan && !isLaunching;
  const scanTarget = (scan == null ? void 0 : scan.target) ?? "";
  const scanFindings = (scan == null ? void 0 : scan.findings) ?? [];
  const scanId = (scan == null ? void 0 : scan.id) ?? null;
  reactExports.useEffect(() => {
    if (isIdle) {
      setVisibleLines(IDLE_LINES);
      return;
    }
    if (scanId === null) return;
    const targetLines = buildLogs(scanTarget, scanFindings);
    setVisibleLines([]);
    let i = 0;
    const timers = [];
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
  reactExports.useEffect(() => {
    const t = setInterval(() => setCursorVisible((v) => !v), 530);
    return () => clearInterval(t);
  }, []);
  reactExports.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  });
  function getLineColor(line) {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl overflow-hidden border border-border/20 bg-black/80 flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-2.5 bg-muted/5 border-b border-border/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-destructive/70 hover:bg-destructive transition-colors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-[oklch(0.66_0.2_70)]/70 hover:bg-[oklch(0.66_0.2_70)] transition-colors" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-full bg-[oklch(0.75_0.2_145)]/70 hover:bg-[oklch(0.75_0.2_145)] transition-colors" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/50", children: scan ? `paia-scan-${scan.id}.log` : "paia-terminal" }) }),
      isActive && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            animate: { opacity: [1, 0.3, 1] },
            transition: { duration: 1, repeat: Number.POSITIVE_INFINITY },
            className: "w-2 h-2 rounded-full bg-[oklch(0.75_0.2_145)]"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-[oklch(0.75_0.2_145)] tracking-widest", children: "LIVE" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        ref: scrollRef,
        className: "flex-1 p-4 overflow-y-auto font-mono text-xs space-y-1",
        style: { minHeight: "220px", maxHeight: "280px" },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: visibleLines.map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, x: -6 },
              animate: { opacity: 1, x: 0 },
              transition: { duration: 0.15 },
              className: `leading-relaxed ${getLineColor(line)}`,
              children: line || " "
            },
            `log-line-${i}-${line.slice(0, 16)}`
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[oklch(0.75_0.2_145)]/60", children: "$" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `inline-block w-2 h-4 bg-[oklch(0.75_0.2_145)] transition-opacity duration-100 ${cursorVisible ? "opacity-100" : "opacity-0"}`
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-1.5 border-t border-border/10 bg-muted/5 flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground/30", children: isActive ? "SCANNING" : scan ? "COMPLETE" : "READY" }),
      scan && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border/20", children: "·" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground/30", children: scan.target })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[9px] text-muted-foreground/20 ml-auto", children: [
        visibleLines.length,
        " lines"
      ] })
    ] })
  ] });
}
function FindingCard({ finding }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      className: "rounded-lg border border-border/20 bg-muted/5 overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setExpanded((e) => !e),
            className: "w-full flex items-start gap-3 p-3 text-left hover:bg-muted/10 transition-colors",
            "data-ocid": `finding-card-${finding.id}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `shrink-0 mt-0.5 ${getSeverityColor(finding.severity)}`,
                  children: finding.severity.toLowerCase() === "critical" || finding.severity.toLowerCase() === "high" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4" }) : finding.severity.toLowerCase() === "medium" ? /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground truncate", children: finding.title || finding.findingType }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: getSeverityBadge(finding.severity), children: finding.severity }),
                finding.cvssScore > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground", children: [
                  "CVSS ",
                  finding.cvssScore.toFixed(1)
                ] }),
                finding.port && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground/60", children: [
                  ":",
                  String(finding.port),
                  finding.protocol ? `/${finding.protocol}` : ""
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                ChevronDown,
                {
                  className: `w-3.5 h-3.5 text-muted-foreground/40 shrink-0 transition-transform ${expanded ? "rotate-180" : ""}`
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { height: 0, opacity: 0 },
            animate: { height: "auto", opacity: 1 },
            exit: { height: 0, opacity: 0 },
            transition: { duration: 0.2 },
            className: "overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pb-3 pt-0 border-t border-border/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground leading-relaxed mt-2", children: finding.description || "No additional details available." }) })
          }
        ) })
      ]
    }
  );
}
function ScanDetailPanel({
  scan,
  isLaunching
}) {
  const findings = (scan == null ? void 0 : scan.findings) ?? [];
  const criticalCount = findings.filter(
    (f) => f.severity.toLowerCase() === "critical"
  ).length;
  const highCount = findings.filter(
    (f) => f.severity.toLowerCase() === "high"
  ).length;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, { className: "w-4 h-4 text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm tracking-widest uppercase text-foreground", children: "Terminal" }),
      scan && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Badge,
        {
          variant: scan.status === "running" ? "neon" : scan.status === "completed" ? "success" : scan.status === "failed" ? "danger" : "muted",
          dot: scan.status === "running",
          children: scan.status
        }
      ),
      scan && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto font-mono text-[10px] text-muted-foreground truncate max-w-[120px]", children: scan.target })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TerminalView, { scan, isLaunching }),
    scan && findings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3.5 h-3.5 text-primary" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground uppercase tracking-widest", children: "Findings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "muted", children: findings.length }),
        criticalCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "critical", children: [
          criticalCount,
          " crit"
        ] }),
        highCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "danger", children: [
          highCount,
          " high"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 max-h-64 overflow-y-auto pr-1", children: findings.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(FindingCard, { finding: f }, String(f.id))) })
    ] }),
    !scan && !isLaunching && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex items-center justify-center py-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleDot, { className: "w-6 h-6 text-muted-foreground/20 mx-auto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground/40", children: "Select a scan to view details" })
    ] }) })
  ] });
}
function ScanRow({
  scan,
  onClick,
  isSelected
}) {
  const progress = Number(scan.progress);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 4 },
      animate: { opacity: 1, y: 0 },
      className: `group p-4 rounded-xl border transition-smooth cursor-pointer ${isSelected ? "border-primary/40 bg-primary/5 shadow-[0_0_16px_rgba(79,140,255,0.1)]" : "border-border/20 bg-muted/5 hover:border-primary/20 hover:bg-primary/3 hover:translate-y-[-1px]"}`,
      onClick,
      "data-ocid": `scan-row-${scan.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: `p-2 rounded-lg border shrink-0 transition-smooth ${scan.status === "running" ? "bg-primary/10 border-primary/30" : scan.status === "completed" ? "bg-[oklch(0.75_0.2_145)]/10 border-[oklch(0.75_0.2_145)]/30" : scan.status === "failed" ? "bg-destructive/10 border-destructive/30" : "bg-muted/10 border-border/20"}`,
                children: scan.status === "running" ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 text-primary animate-spin" }) : scan.status === "completed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-4 h-4 text-[oklch(0.75_0.2_145)]" }) : scan.status === "failed" ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-destructive" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { className: "w-4 h-4 text-muted-foreground" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3 h-3 text-muted-foreground/50 shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-foreground truncate", children: scan.target })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/60 uppercase tracking-widest", children: scan.mode }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border/30", children: "·" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-2.5 h-2.5 text-muted-foreground/40" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/40", children: formatTimestamp(scan.startedAt) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-1.5 shrink-0", children: [
            scan.status === "running" && /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIndicator, { status: "online", size: "sm", pulse: true }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: scan.status === "completed" ? "success" : scan.status === "running" ? "neon" : scan.status === "failed" ? "danger" : "muted",
                dot: scan.status === "running",
                children: scan.status
              }
            )
          ] })
        ] }),
        scan.status === "running" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground/50 uppercase tracking-widest", children: "Progress" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[9px] text-primary", children: [
              progress,
              "%"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1 rounded-full bg-muted/20 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "h-full rounded-full bg-primary",
              initial: { width: 0 },
              animate: { width: `${progress}%` },
              transition: { duration: 0.8, ease: "easeOut" },
              style: { boxShadow: "0 0 8px rgba(79,140,255,0.7)" }
            }
          ) })
        ] }),
        scan.findings.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3 pt-3 border-t border-border/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3 h-3 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground/50", children: [
            scan.findings.length,
            " findings"
          ] }),
          scan.findings.some(
            (f) => f.severity.toLowerCase() === "critical"
          ) && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "critical", className: "text-[9px] py-0", children: [
            scan.findings.filter(
              (f) => f.severity.toLowerCase() === "critical"
            ).length,
            " ",
            "crit"
          ] }),
          scan.findings.some((f) => f.severity.toLowerCase() === "high") && /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "danger", className: "text-[9px] py-0", children: [
            scan.findings.filter((f) => f.severity.toLowerCase() === "high").length,
            " ",
            "high"
          ] })
        ] })
      ]
    }
  );
}
function ScanCenterPage() {
  var _a;
  const [target, setTarget] = reactExports.useState("");
  const [scanMode, setScanMode] = reactExports.useState("quick");
  const [selectedScan, setSelectedScan] = reactExports.useState(null);
  const createScanMutation = useCreateScan();
  const scansQuery = useListScans();
  const scans = scansQuery.data ?? [];
  const activeStep = createScanMutation.isPending ? 2 : (selectedScan == null ? void 0 : selectedScan.status) === "running" ? Math.min(4, Math.max(1, Math.floor(Number(selectedScan.progress) / 20))) : (selectedScan == null ? void 0 : selectedScan.status) === "completed" ? 5 : 0;
  async function handleScan() {
    if (!target.trim()) return;
    try {
      const result = await createScanMutation.mutateAsync({
        target: target.trim(),
        scanMode
      });
      if (result.__kind__ === "ok") {
        setSelectedScan(result.ok);
        setTarget("");
      }
    } catch {
    }
  }
  reactExports.useEffect(() => {
    if (!selectedScan || !scans.length) return;
    const fresh = scans.find((s) => s.id === selectedScan.id);
    if (fresh) setSelectedScan(fresh);
  }, [scans, selectedScan]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { duration: 0.4 },
      className: "space-y-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, innerGlow: true, className: "p-5 h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm tracking-widest uppercase text-foreground", children: "New Scan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusIndicator, { status: "online", size: "sm", pulse: true }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "scan-target",
                    className: "font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2 block",
                    children: "Target"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "scan-target",
                    type: "text",
                    value: target,
                    onChange: (e) => setTarget(e.target.value),
                    placeholder: "192.168.1.0/24 or example.com",
                    "data-ocid": "scan-target-input",
                    className: "w-full px-3 py-2.5 rounded-lg bg-black/30 border border-border/30 text-sm text-foreground font-mono placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition-smooth",
                    onKeyDown: (e) => e.key === "Enter" && handleScan()
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("fieldset", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("legend", { className: "font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2 block", children: "Scan Mode" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: SCAN_MODES.map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setScanMode(mode),
                    "data-ocid": `scan-mode-${mode}`,
                    className: `px-3 py-2 rounded-lg font-mono text-[11px] tracking-widest uppercase border transition-all ${scanMode === mode ? "bg-primary/15 border-primary/40 text-primary shadow-[0_0_8px_rgba(79,140,255,0.3)]" : "bg-muted/5 border-border/20 text-muted-foreground/60 hover:border-border/40 hover:text-muted-foreground"}`,
                    children: mode
                  },
                  mode
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                NeonButton,
                {
                  className: "w-full",
                  onClick: handleScan,
                  loading: createScanMutation.isPending,
                  loadingText: "Launching...",
                  disabled: !target.trim(),
                  "data-ocid": "launch-scan-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4" }),
                    "Launch Scan"
                  ]
                }
              ),
              createScanMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                ErrorState,
                {
                  message: (_a = createScanMutation.error) == null ? void 0 : _a.message,
                  className: "mt-2"
                }
              )
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5 h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm tracking-widest uppercase text-foreground", children: "Scan Pipeline" }),
              activeStep > 0 && activeStep < 5 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "neon", dot: true, children: "Active" }),
              activeStep === 5 && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", children: "Complete" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScanPipeline, { activeStep }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 p-3 rounded-lg bg-muted/5 border border-border/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] text-muted-foreground/60 leading-relaxed", children: [
              activeStep === 0 && "Pipeline idle — configure a target above and press Launch Scan to begin.",
              activeStep === 1 && "Recon phase: collecting DNS, WHOIS, and passive intelligence data.",
              activeStep === 2 && "Subdomain enumeration in progress — discovering attack surface...",
              activeStep === 3 && "Port scanning: probing services across all TCP/UDP ports.",
              activeStep === 4 && "Vulnerability analysis: correlating findings against CVE database.",
              activeStep === 5 && "Scan complete — report generated. Review findings in the panel."
            ] }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-5 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5 h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-sm tracking-widest uppercase text-foreground", children: "All Scans" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "muted", children: scans.length }),
              scansQuery.isFetching && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-3 h-3 text-primary animate-pulse" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground/50", children: "Live" })
              ] })
            ] }),
            scansQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, { variant: "list", rows: 4 }) : scansQuery.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { onRetry: () => scansQuery.refetch() }) : scans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { className: "w-6 h-6 text-muted-foreground/40" }),
                title: "No scans yet",
                description: "Launch your first scan to start detecting vulnerabilities.",
                action: {
                  label: "Start first scan",
                  onClick: () => {
                    var _a2;
                    return (_a2 = document.querySelector(
                      "[data-ocid='scan-target-input']"
                    )) == null ? void 0 : _a2.focus();
                  }
                },
                "data-ocid": "scans-empty-state"
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-[520px] overflow-y-auto pr-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: scans.map((scan) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              ScanRow,
              {
                scan,
                onClick: () => setSelectedScan(scan),
                isSelected: (selectedScan == null ? void 0 : selectedScan.id) === scan.id
              },
              String(scan.id)
            )) }) })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { depth: true, innerGlow: true, className: "p-5 h-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ScanDetailPanel,
            {
              scan: selectedScan,
              isLaunching: createScanMutation.isPending
            }
          ) }) })
        ] })
      ]
    }
  );
}
export {
  ScanCenterPage as default
};
