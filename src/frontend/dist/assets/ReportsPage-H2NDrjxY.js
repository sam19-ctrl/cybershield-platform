import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, F as FileChartColumn, N as NeonButton, u as ue, R as Radar, g as Bot, h as AnimatePresence, m as motion, S as Shield, C as ChevronRight, k as ChevronDown, G as Globe } from "./index-p-_K6v2l.js";
import { B as Badge, G as GlassCard } from "./GlassCard-BR9c0p-Q.js";
import { E as ErrorState, a as EmptyState, T as TriangleAlert } from "./ErrorState-kscm9ILp.js";
import { d as useListScans, e as useListAnalyses } from "./useQueries-DgJaspKQ.js";
import { P as Plus } from "./plus-BuqoNeCG.js";
import { W as Wifi } from "./wifi-DM-NocU9.js";
import { D as Download } from "./download-BdS0PI1q.js";
import { S as ShieldAlert } from "./shield-alert-BGigyO-F.js";
import { A as ArrowRight } from "./arrow-right-Cx2Bhjvp.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
const Circle = createLucideIcon("circle", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M5 12h14", key: "1ays0h" }]];
const Minus = createLucideIcon("minus", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "6", key: "1vlfrh" }],
  ["circle", { cx: "12", cy: "12", r: "2", key: "1c9p78" }]
];
const Target = createLucideIcon("target", __iconNode);
function formatDate(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function formatDateTime(ts) {
  return new Date(Number(ts / 1000000n)).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function getDuration(start, end) {
  if (!end) return "—";
  const ms = Number((end - start) / 1000000n);
  if (ms < 6e4) return `${Math.round(ms / 1e3)}s`;
  return `${Math.round(ms / 6e4)}m`;
}
function severityVariant(sev) {
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
function overallRisk(findings) {
  if (findings.some((f) => f.severity.toLowerCase() === "critical"))
    return "critical";
  if (findings.some((f) => f.severity.toLowerCase() === "high")) return "high";
  if (findings.some((f) => f.severity.toLowerCase() === "medium"))
    return "medium";
  return "low";
}
function riskFromScore(score) {
  if (score >= 80) return "critical";
  if (score >= 60) return "high";
  if (score >= 40) return "medium";
  return "low";
}
function riskToBadge(risk) {
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
function ReportListItem({
  item,
  selected,
  onClick,
  index
}) {
  const isScan = item.kind === "scan";
  const scan = isScan ? item.data : null;
  const ai = !isScan ? item.data : null;
  const target = scan ? scan.target : ai.target;
  const date = scan ? formatDate(scan.startedAt) : formatDate(ai.completedAt);
  const risk = scan && scan.findings.length > 0 ? overallRisk(scan.findings) : ai ? riskFromScore(Number(ai.riskScore)) : "low";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.button,
    {
      initial: { opacity: 0, x: -8 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.04 },
      onClick,
      "data-ocid": `report-list-item-${index}`,
      className: `w-full text-left p-3 rounded-lg border transition-smooth cursor-pointer group ${selected ? "border-primary/50 bg-primary/10 shadow-[0_0_12px_rgba(79,140,255,0.2)]" : "border-border/30 bg-card/30 hover:border-primary/30 hover:bg-primary/5"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `mt-0.5 p-1.5 rounded-md shrink-0 ${isScan ? "bg-primary/10 border border-primary/20" : "bg-accent/10 border border-accent/20"}`,
              children: isScan ? /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { className: "w-3 h-3 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-3 h-3 text-accent" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs font-semibold text-foreground truncate", children: target }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] text-muted-foreground mt-0.5", children: [
              date,
              " · ",
              isScan ? "Scan" : "AI Analysis"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: riskToBadge(risk), dot: risk === "critical", children: risk })
        ] }),
        selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 mt-2 text-primary", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px]", children: "Viewing" })
        ] })
      ]
    }
  );
}
function ScoreRing({ score, size = 80 }) {
  const r = size / 2 - 8;
  const circ = 2 * Math.PI * r;
  const pct = Math.max(0, Math.min(100, score)) / 100;
  const dash = circ * pct;
  const color = score >= 80 ? "#FF4D4D" : score >= 60 ? "#FFB020" : "#4F8CFF";
  const label = score >= 80 ? "CRITICAL" : score >= 60 ? "HIGH" : score >= 40 ? "MEDIUM" : "LOW";
  const labelColor = score >= 80 ? "text-destructive" : score >= 60 ? "text-[oklch(0.66_0.2_70)]" : "text-primary";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", style: { width: size, height: size }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "svg",
        {
          width: size,
          height: size,
          className: "-rotate-90",
          "aria-label": `Security score: ${score}`,
          role: "img",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: size / 2,
                cy: size / 2,
                r,
                fill: "none",
                stroke: "oklch(0.22 0.02 270)",
                strokeWidth: "6"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.circle,
              {
                cx: size / 2,
                cy: size / 2,
                r,
                fill: "none",
                stroke: color,
                strokeWidth: "6",
                strokeLinecap: "round",
                strokeDasharray: circ,
                initial: { strokeDashoffset: circ },
                animate: { strokeDashoffset: circ - dash },
                transition: { duration: 1.2, ease: "easeOut" },
                style: {
                  filter: `drop-shadow(0 0 6px ${color}99)`
                }
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-lg font-bold text-foreground leading-none", children: score }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `font-mono text-[10px] font-semibold mt-1 ${labelColor}`,
        children: label
      }
    )
  ] });
}
function PostureGauge({
  critical,
  total
}) {
  const ratio = total === 0 ? 0 : critical / total;
  const color = ratio > 0.2 ? "bg-destructive shadow-[0_0_6px_rgba(255,77,77,0.5)]" : ratio > 0.05 ? "bg-[oklch(0.66_0.2_70)]" : "bg-[oklch(0.75_0.2_145)]";
  const label = ratio > 0.2 ? "Critical Risk" : ratio > 0.05 ? "Elevated Risk" : "Good";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground", children: "Security Posture" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-foreground/80", children: label })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-2.5 rounded-full bg-muted/20 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        className: `h-full rounded-full ${color}`,
        initial: { width: 0 },
        animate: { width: `${Math.max(5, (1 - ratio) * 100)}%` },
        transition: { duration: 1, ease: "easeOut", delay: 0.3 }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mt-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/60", children: "At risk" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/60", children: "Secure" })
    ] })
  ] });
}
function AttackPathDiagram({ findings }) {
  const criticalFindings = findings.filter(
    (f) => f.severity.toLowerCase() === "critical"
  );
  const hasCritical = criticalFindings.length > 0;
  if (!hasCritical) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-10 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-full bg-[oklch(0.75_0.2_145)]/10 border border-[oklch(0.75_0.2_145)]/20 mb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-7 h-7 text-[oklch(0.75_0.2_145)]" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground", children: "No attack paths identified" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground/60 mt-1", children: "No critical vulnerabilities found" })
    ] });
  }
  const entry = criticalFindings[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 560 120",
      className: "w-full",
      style: { minWidth: 480 },
      role: "img",
      "aria-label": "Attack path diagram",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "marker",
            {
              id: "arrow-red",
              markerWidth: "8",
              markerHeight: "8",
              refX: "6",
              refY: "3",
              orient: "auto",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0,0 L0,6 L8,3 z", fill: "#FF4D4D" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "marker",
            {
              id: "arrow-green",
              markerWidth: "8",
              markerHeight: "8",
              refX: "6",
              refY: "3",
              orient: "auto",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0,0 L0,6 L8,3 z", fill: "oklch(0.75 0.2 145)" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "glow-red", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "2", result: "blur" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "blur" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "10",
            y: "35",
            width: "90",
            height: "50",
            rx: "8",
            fill: "oklch(0.18 0.02 270)",
            stroke: "#FF4D4D",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "55",
            y: "58",
            textAnchor: "middle",
            fill: "#FF4D4D",
            fontSize: "9",
            fontFamily: "monospace",
            fontWeight: "600",
            children: "ATTACKER"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "55",
            y: "72",
            textAnchor: "middle",
            fill: "#FF4D4D",
            fontSize: "7.5",
            fontFamily: "monospace",
            opacity: "0.7",
            children: "External"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "155",
            y: "30",
            width: "100",
            height: "60",
            rx: "8",
            fill: "oklch(0.18 0.02 270)",
            stroke: "#FFB020",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "205",
            y: "55",
            textAnchor: "middle",
            fill: "#FFB020",
            fontSize: "8.5",
            fontFamily: "monospace",
            fontWeight: "600",
            children: "ENTRY POINT"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "205",
            y: "68",
            textAnchor: "middle",
            fill: "#FFB020",
            fontSize: "7",
            fontFamily: "monospace",
            opacity: "0.8",
            children: entry.port ? `:${entry.port}` : entry.findingType.slice(0, 12)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "205",
            y: "80",
            textAnchor: "middle",
            fill: "#FFB020",
            fontSize: "6.5",
            fontFamily: "monospace",
            opacity: "0.6",
            children: entry.protocol ?? "TCP"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "310",
            y: "35",
            width: "90",
            height: "50",
            rx: "8",
            fill: "oklch(0.18 0.02 270)",
            stroke: "#FF4D4D",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "355",
            y: "58",
            textAnchor: "middle",
            fill: "#FF4D4D",
            fontSize: "8.5",
            fontFamily: "monospace",
            fontWeight: "600",
            children: "LATERAL"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "355",
            y: "72",
            textAnchor: "middle",
            fill: "#FF4D4D",
            fontSize: "7",
            fontFamily: "monospace",
            opacity: "0.7",
            children: "Movement"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "rect",
          {
            x: "455",
            y: "30",
            width: "95",
            height: "60",
            rx: "8",
            fill: "oklch(0.18 0.02 270)",
            stroke: "#4F8CFF",
            strokeWidth: "1.5"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "502",
            y: "55",
            textAnchor: "middle",
            fill: "#4F8CFF",
            fontSize: "8.5",
            fontFamily: "monospace",
            fontWeight: "600",
            children: "TARGET"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "502",
            y: "68",
            textAnchor: "middle",
            fill: "#4F8CFF",
            fontSize: "7",
            fontFamily: "monospace",
            opacity: "0.8",
            children: "Internal"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "502",
            y: "80",
            textAnchor: "middle",
            fill: "#4F8CFF",
            fontSize: "6.5",
            fontFamily: "monospace",
            opacity: "0.6",
            children: "Asset"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "100",
            y1: "60",
            x2: "153",
            y2: "60",
            stroke: "#FF4D4D",
            strokeWidth: "1.5",
            markerEnd: "url(#arrow-red)",
            strokeDasharray: "4 2",
            filter: "url(#glow-red)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "255",
            y1: "60",
            x2: "308",
            y2: "60",
            stroke: "#FF4D4D",
            strokeWidth: "1.5",
            markerEnd: "url(#arrow-red)",
            strokeDasharray: "4 2",
            filter: "url(#glow-red)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: "400",
            y1: "60",
            x2: "453",
            y2: "60",
            stroke: "#FF4D4D",
            strokeWidth: "1.5",
            markerEnd: "url(#arrow-red)",
            strokeDasharray: "4 2",
            filter: "url(#glow-red)"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "127",
            y: "53",
            textAnchor: "middle",
            fill: "#FF4D4D",
            fontSize: "7",
            fontFamily: "monospace",
            opacity: "0.7",
            children: "exploit"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "282",
            y: "53",
            textAnchor: "middle",
            fill: "#FF4D4D",
            fontSize: "7",
            fontFamily: "monospace",
            opacity: "0.7",
            children: "pivot"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "427",
            y: "53",
            textAnchor: "middle",
            fill: "#FF4D4D",
            fontSize: "7",
            fontFamily: "monospace",
            opacity: "0.7",
            children: "escalate"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "text",
          {
            x: "205",
            y: "104",
            textAnchor: "middle",
            fill: "#FFB020",
            fontSize: "7.5",
            fontFamily: "monospace",
            opacity: "0.9",
            children: `CVSS ${entry.cvssScore.toFixed(1)}`
          }
        )
      ]
    }
  ) });
}
function FindingRow({ finding }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-border/20 hover:bg-primary/5 transition-colors cursor-pointer group",
        onClick: () => setExpanded((v) => !v),
        onKeyDown: (e) => {
          if (e.key === "Enter" || e.key === " ") setExpanded((v) => !v);
        },
        "data-ocid": `finding-row-${finding.id}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Badge,
            {
              variant: severityVariant(finding.severity),
              className: "text-[9px]",
              children: finding.severity
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `font-mono text-xs font-bold ${finding.cvssScore >= 9 ? "text-destructive" : finding.cvssScore >= 7 ? "text-[oklch(0.66_0.2_70)]" : finding.cvssScore >= 4 ? "text-[oklch(0.85_0.18_70)]" : "text-muted-foreground"}`,
              children: finding.cvssScore.toFixed(1)
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground", children: finding.title }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground", children: [
            finding.port ? `:${finding.port}` : "—",
            " ",
            finding.protocol ?? ""
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-2.5 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "warning", className: "text-[9px]", children: "Open" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                className: "opacity-0 group-hover:opacity-100 transition-opacity",
                "aria-label": "Toggle details",
                children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { className: "w-3 h-3 text-muted-foreground" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3 text-muted-foreground" })
              }
            )
          ] }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.tr,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-3 pb-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-muted/10 border border-border/20 p-3 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground tracking-widest uppercase", children: "Description" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground/80 leading-relaxed", children: finding.description })
        ] }) })
      }
    ) })
  ] });
}
function ScanDetailReport({
  scan,
  aiAnalysis
}) {
  const [aiThinkingOpen, setAiThinkingOpen] = reactExports.useState(false);
  const findings = scan.findings;
  const criticalCount = findings.filter(
    (f) => f.severity.toLowerCase() === "critical"
  ).length;
  const highCount = findings.filter(
    (f) => f.severity.toLowerCase() === "high"
  ).length;
  const risk = findings.length > 0 ? overallRisk(findings) : "low";
  const avgCvss = findings.length > 0 ? findings.reduce((s, f) => s + f.cvssScore, 0) / findings.length : 0;
  const netScore = Math.max(
    0,
    100 - criticalCount * 20 - highCount * 10 - (findings.length - criticalCount - highCount) * 3
  );
  const reportId = `RPT-${String(scan.id).padStart(6, "0")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35 },
      className: "space-y-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { depth: true, gradient: true, className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground tracking-widest uppercase", children: "Security Assessment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/40", children: reportId })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground truncate", children: scan.target }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground", children: [
                "Generated: ",
                formatDateTime(scan.startedAt)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/40", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground", children: [
                "Mode: ",
                scan.mode
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/40", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground", children: [
                "Duration: ",
                getDuration(scan.startedAt, scan.completedAt)
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: riskToBadge(risk), dot: risk === "critical", children: risk.toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              NeonButton,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => ue.info("Export feature coming soon"),
                "data-ocid": "export-pdf-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 mr-1" }),
                  "PDF"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              NeonButton,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => ue.info("Share feature coming soon"),
                "data-ocid": "share-report-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-3.5 h-3.5 mr-1" }),
                  "Share"
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileChartColumn, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold tracking-widest uppercase text-foreground", children: "Executive Summary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "muted", className: "ml-auto font-mono text-[10px]", children: "Non-Technical" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed mb-5", children: findings.length === 0 ? `This security assessment of ${scan.target} found no vulnerabilities. The target appears well-secured against common attack vectors. We recommend scheduling periodic re-assessments to maintain this posture.` : `This security assessment of ${scan.target} identified ${findings.length} vulnerabilit${findings.length > 1 ? "ies" : "y"} across the scanned surface. ${criticalCount > 0 ? `The most critical finding${criticalCount > 1 ? "s involve" : " involves"} ${criticalCount} critical-severity issue${criticalCount > 1 ? "s" : ""} requiring immediate remediation.` : ""} ${highCount > 0 ? `${highCount} high-severity issue${highCount > 1 ? "s were" : " was"} also identified.` : ""} Immediate attention from your security team is recommended to address these risks before they can be exploited.` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 mb-5", children: [
            {
              label: "Total Findings",
              value: findings.length,
              color: "text-foreground"
            },
            {
              label: "Critical Issues",
              value: criticalCount,
              color: "text-destructive"
            },
            {
              label: "Avg CVSS",
              value: avgCvss.toFixed(1),
              color: "text-[oklch(0.66_0.2_70)]"
            }
          ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center p-3 rounded-lg bg-muted/10 border border-border/20",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-display text-2xl font-bold ${m.color}`, children: m.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground mt-0.5", children: m.label })
              ]
            },
            m.label
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(PostureGauge, { critical: criticalCount, total: findings.length })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold tracking-widest uppercase text-foreground", children: "Security Score" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-8 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreRing, { score: netScore, size: 100 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 min-w-[160px] space-y-3", children: [
              {
                label: "Network Risk",
                pct: Math.min(100, criticalCount * 30 + highCount * 15),
                color: "bg-destructive"
              },
              {
                label: "Web Risk",
                pct: Math.min(
                  100,
                  findings.filter(
                    (f) => {
                      var _a, _b, _c;
                      return ((_a = f.findingType) == null ? void 0 : _a.toLowerCase().includes("web")) || ((_b = f.findingType) == null ? void 0 : _b.toLowerCase().includes("xss")) || ((_c = f.findingType) == null ? void 0 : _c.toLowerCase().includes("sql"));
                    }
                  ).length * 25
                ),
                color: "bg-[oklch(0.66_0.2_70)]"
              },
              {
                label: "API Risk",
                pct: Math.min(
                  100,
                  findings.filter(
                    (f) => {
                      var _a, _b;
                      return ((_a = f.findingType) == null ? void 0 : _a.toLowerCase().includes("api")) || ((_b = f.protocol) == null ? void 0 : _b.toLowerCase()) === "http";
                    }
                  ).length * 20
                ),
                color: "bg-accent"
              }
            ].map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between mb-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground", children: r.label }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-foreground/70", children: [
                  r.pct,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full bg-muted/20 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  className: `h-full rounded-full ${r.color}`,
                  initial: { width: 0 },
                  animate: { width: `${r.pct}%` },
                  transition: { duration: 0.9, ease: "easeOut", delay: 0.2 }
                }
              ) })
            ] }, r.label)) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold tracking-widest uppercase text-foreground", children: "Technical Findings" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "muted", className: "ml-auto", children: [
              findings.length,
              " total"
            ] })
          ] }),
          findings.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-muted-foreground" }),
              title: "No findings",
              description: "This scan returned no vulnerabilities."
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/40", children: ["Severity", "CVSS", "Title", "Port/Service", "Status"].map(
              (h) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "th",
                {
                  className: "py-2 px-3 font-mono text-[10px] text-muted-foreground tracking-widest uppercase",
                  children: h
                },
                h
              )
            ) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: findings.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(FindingRow, { finding: f }, String(f.id))) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4 text-destructive" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold tracking-widest uppercase text-foreground", children: "Attack Path Diagram" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AttackPathDiagram, { findings })
        ] }),
        aiAnalysis && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, glow: "purple", className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold tracking-widest uppercase text-foreground", children: "AI Intelligence Report" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "neon", className: "ml-auto font-mono text-[10px]", children: "AI Enhanced" })
          ] }),
          aiAnalysis.vulnerabilities.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2", children: "AI-Identified Vulnerabilities" }),
            aiAnalysis.vulnerabilities.map(
              (v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "p-3 rounded-lg bg-muted/10 border border-border/20",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs font-semibold text-foreground", children: v.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Badge,
                        {
                          variant: severityVariant(v.severity),
                          className: "text-[9px] shrink-0",
                          children: v.severity
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-relaxed mb-2", children: v.description }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-2 rounded bg-primary/5 border border-primary/10", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3 text-primary shrink-0 mt-0.5" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-foreground/70 leading-snug", children: v.recommendation })
                    ] })
                  ]
                },
                `ai-vuln-${v.title}-${i}`
              )
            )
          ] }),
          aiAnalysis.suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2", children: "Recommended Actions" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-2", children: aiAnalysis.suggestions.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "li",
              {
                className: "flex items-start gap-2.5 text-xs text-foreground/80",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-primary font-bold bg-primary/10 rounded px-1.5 py-0.5 shrink-0", children: String(i + 1).padStart(2, "0") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-snug", children: s })
                ]
              },
              `ai-sug-${i}-${s.slice(0, 20)}`
            )) })
          ] }),
          aiAnalysis.thinking && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => setAiThinkingOpen((v) => !v),
                className: "flex items-center gap-2 w-full text-left font-mono text-[10px] text-muted-foreground tracking-widest uppercase hover:text-foreground transition-colors py-2 border-t border-border/20",
                "data-ocid": "ai-thinking-toggle",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ChevronDown,
                    {
                      className: `w-3 h-3 transition-transform ${aiThinkingOpen ? "rotate-180" : ""}`
                    }
                  ),
                  "AI Thinking Transcript"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: aiThinkingOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { height: 0, opacity: 0 },
                animate: { height: "auto", opacity: 1 },
                exit: { height: 0, opacity: 0 },
                transition: { duration: 0.25 },
                className: "overflow-hidden",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-lg bg-muted/5 border border-border/20 font-mono text-[10px] text-muted-foreground leading-relaxed whitespace-pre-wrap mt-2", children: aiAnalysis.thinking })
              }
            ) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { depth: true, className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs font-bold text-foreground", children: "CyberShield Platform" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground/60 max-w-xs leading-relaxed", children: "This report is confidential and intended solely for the authorized recipient. Findings reflect the state at time of scan and may change over time." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] text-muted-foreground", children: [
              "Report ID: ",
              reportId
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] text-muted-foreground/60", children: [
              "Generated: ",
              (/* @__PURE__ */ new Date()).toLocaleDateString()
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground/40", children: "Powered by CyberShield AI Engine" })
          ] })
        ] }) })
      ]
    },
    String(scan.id)
  );
}
function AIDetailReport({ analysis }) {
  const [thinkingOpen, setThinkingOpen] = reactExports.useState(false);
  const risk = riskFromScore(Number(analysis.riskScore));
  const reportId = `AI-${String(analysis.id).padStart(6, "0")}`;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.35 },
      className: "space-y-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { depth: true, gradient: true, className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground tracking-widest uppercase", children: "AI Intelligence Assessment" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/40", children: reportId })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground truncate", children: analysis.target }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground", children: [
                "Completed: ",
                formatDateTime(analysis.completedAt)
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/40", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground", children: [
                analysis.vulnerabilities.length,
                " vulnerabilities"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: riskToBadge(risk), dot: risk === "critical", children: risk.toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              NeonButton,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => ue.info("Export feature coming soon"),
                "data-ocid": "export-ai-pdf-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5 mr-1" }),
                  "PDF"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              NeonButton,
              {
                variant: "ghost",
                size: "sm",
                onClick: () => ue.info("Share feature coming soon"),
                "data-ocid": "share-ai-report-btn",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-3.5 h-3.5 mr-1" }),
                  "Share"
                ]
              }
            )
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileChartColumn, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold tracking-widest uppercase text-foreground", children: "Executive Summary" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed mb-4", children: `AI analysis of ${analysis.target} identified ${analysis.vulnerabilities.length} potential vulnerability${analysis.vulnerabilities.length !== 1 ? "ies" : ""} with a risk score of ${analysis.riskScore}/100. ${analysis.suggestions.length} remediation actions have been recommended to improve security posture.` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [
            {
              label: "Risk Score",
              value: String(analysis.riskScore),
              color: Number(analysis.riskScore) >= 80 ? "text-destructive" : "text-[oklch(0.66_0.2_70)]"
            },
            {
              label: "Vulnerabilities",
              value: String(analysis.vulnerabilities.length),
              color: "text-accent"
            },
            {
              label: "Suggestions",
              value: String(analysis.suggestions.length),
              color: "text-primary"
            }
          ].map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "text-center p-3 rounded-lg bg-muted/10 border border-border/20",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-display text-2xl font-bold ${m.color}`, children: m.value }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground mt-0.5", children: m.label })
              ]
            },
            m.label
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-4 h-4 text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold tracking-widest uppercase text-foreground", children: "Risk Score" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-8", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreRing, { score: Number(analysis.riskScore), size: 100 }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-muted-foreground leading-relaxed", children: "AI-computed risk score based on identified vulnerabilities, their severity, and potential attack surface." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 mt-3 flex-wrap", children: ["critical", "high", "medium", "low"].map((sev) => {
                const n = analysis.vulnerabilities.filter(
                  (v) => v.severity.toLowerCase() === sev
                ).length;
                if (n === 0) return null;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: "flex items-center gap-1 px-2.5 py-1 rounded-full border border-border/30 bg-muted/10",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "w-2 h-2 fill-current text-muted-foreground" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[10px] text-muted-foreground capitalize", children: [
                        sev,
                        ": ",
                        n
                      ] })
                    ]
                  },
                  sev
                );
              }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-4 h-4 text-[oklch(0.66_0.2_70)]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold tracking-widest uppercase text-foreground", children: "AI-Identified Vulnerabilities" })
          ] }),
          analysis.vulnerabilities.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-muted-foreground" }),
              title: "No vulnerabilities found",
              description: "AI analysis found no exploitable vulnerabilities."
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: analysis.vulnerabilities.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "p-3 rounded-lg bg-muted/10 border border-border/20",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs font-semibold text-foreground", children: v.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Badge,
                    {
                      variant: severityVariant(v.severity),
                      className: "text-[9px] shrink-0",
                      children: v.severity
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-relaxed mb-2", children: v.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 p-2 rounded bg-primary/5 border border-primary/10", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3 h-3 text-primary shrink-0 mt-0.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-foreground/70 leading-snug", children: v.recommendation })
                ] })
              ]
            },
            `vuln-${v.title}-${i}`
          )) })
        ] }),
        analysis.suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-4 h-4 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display text-sm font-semibold tracking-widest uppercase text-foreground", children: "Recommended Actions" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-3", children: analysis.suggestions.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "li",
            {
              className: "flex items-start gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] font-bold text-primary bg-primary/10 border border-primary/20 rounded px-2 py-1 shrink-0", children: String(i + 1).padStart(2, "0") }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground/80 leading-snug pt-0.5", children: s })
              ]
            },
            `sug-${i}-${s.slice(0, 20)}`
          )) })
        ] }),
        analysis.thinking && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setThinkingOpen((v) => !v),
              className: "flex items-center gap-2 w-full text-left font-mono text-[10px] text-muted-foreground tracking-widest uppercase hover:text-foreground transition-colors",
              "data-ocid": "thinking-toggle",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  ChevronDown,
                  {
                    className: `w-3.5 h-3.5 transition-transform ${thinkingOpen ? "rotate-180" : ""}`
                  }
                ),
                "AI Thinking Transcript"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: thinkingOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { height: 0, opacity: 0 },
              animate: { height: "auto", opacity: 1 },
              exit: { height: 0, opacity: 0 },
              transition: { duration: 0.25 },
              className: "overflow-hidden",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-lg bg-muted/5 border border-border/20 font-mono text-[10px] text-muted-foreground leading-relaxed whitespace-pre-wrap mt-3", children: analysis.thinking })
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { depth: true, className: "p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-3.5 h-3.5 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs font-bold text-foreground", children: "CyberShield AI Engine" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground/60 max-w-xs leading-relaxed", children: "AI-generated report for informational purposes. Results should be validated by a qualified security professional." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] text-muted-foreground", children: [
              "Report ID: ",
              reportId
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground/60", children: (/* @__PURE__ */ new Date()).toLocaleDateString() })
          ] })
        ] }) })
      ]
    },
    String(analysis.id)
  );
}
function ReportsPage() {
  const scansQuery = useListScans();
  const analysesQuery = useListAnalyses();
  const scans = (scansQuery.data ?? []).filter((s) => s.status === "completed");
  const analyses = analysesQuery.data ?? [];
  const allItems = [
    ...scans.map((s) => ({ kind: "scan", data: s })),
    ...analyses.map((a) => ({ kind: "ai", data: a }))
  ].sort((a, b) => {
    const tsA = a.kind === "scan" ? Number(a.data.startedAt) : Number(a.data.completedAt);
    const tsB = b.kind === "scan" ? Number(b.data.startedAt) : Number(b.data.completedAt);
    return tsB - tsA;
  });
  const [selectedIndex, setSelectedIndex] = reactExports.useState(null);
  const selectedItem = selectedIndex !== null ? allItems[selectedIndex] : null;
  const isLoading = scansQuery.isLoading || analysesQuery.isLoading;
  const isError = scansQuery.isError || analysesQuery.isError;
  const matchingAI = (selectedItem == null ? void 0 : selectedItem.kind) === "scan" ? analyses.find((a) => a.target === selectedItem.data.target) : void 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex h-[calc(100vh-64px)] overflow-hidden gap-0",
      "data-ocid": "reports-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "w-72 shrink-0 flex flex-col border-r border-border/30 bg-card/20 overflow-hidden", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 border-b border-border/30 flex items-center justify-between shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(FileChartColumn, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-sm font-semibold text-foreground tracking-wide", children: "Reports" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "muted", className: "ml-1 font-mono text-[10px]", children: allItems.length })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              NeonButton,
              {
                variant: "outline",
                size: "sm",
                "data-ocid": "new-report-btn",
                onClick: () => ue.info("Navigate to Scan Center to start a new scan"),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3 h-3 mr-1" }),
                  "New"
                ]
              }
            )
          ] }),
          !isLoading && !isError && allItems.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 pt-3 pb-1 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 font-mono text-[10px] text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { className: "w-3 h-3 text-primary/60" }),
              scans.length,
              " Scans"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-px h-3 bg-border/40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-3 h-3 text-accent/60" }),
              analyses.length,
              " AI"
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-y-auto p-3 space-y-2", children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2 pt-1", children: Array.from({ length: 4 }, (_, i) => `sk-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-16 rounded-lg bg-muted/20 animate-pulse"
            },
            k
          )) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            ErrorState,
            {
              message: "Failed to load reports",
              onRetry: () => {
                scansQuery.refetch();
                analysesQuery.refetch();
              }
            }
          ) : allItems.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Wifi, { className: "w-5 h-5 text-muted-foreground" }),
              title: "No reports yet",
              description: "Complete a scan to generate your first report",
              className: "py-10"
            }
          ) : allItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ReportListItem,
            {
              item,
              selected: selectedIndex === i,
              onClick: () => setSelectedIndex(selectedIndex === i ? null : i),
              index: i
            },
            item.kind === "scan" ? `scan-${item.data.id}` : `ai-${item.data.id}`
          )) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 overflow-y-auto p-5 min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: !selectedItem ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            className: "h-full flex items-center justify-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              EmptyState,
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-10 h-10 text-muted-foreground/50" }),
                title: "Select a report to view details",
                description: "Click any report from the sidebar to load its full enterprise-grade assessment",
                className: "border-border/20 max-w-sm",
                "data-ocid": "report-empty-state"
              }
            )
          },
          "empty"
        ) : selectedItem.kind === "scan" ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ScanDetailReport,
              {
                scan: selectedItem.data,
                aiAnalysis: matchingAI
              }
            )
          },
          `scan-detail-${selectedItem.data.id}`
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(AIDetailReport, { analysis: selectedItem.data })
          },
          `ai-detail-${selectedItem.data.id}`
        ) }) })
      ]
    }
  );
}
export {
  ReportsPage as default
};
