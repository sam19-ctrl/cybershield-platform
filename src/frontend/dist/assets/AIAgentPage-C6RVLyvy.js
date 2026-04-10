import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, g as Bot, e as cn, N as NeonButton, b as Network, h as AnimatePresence, G as Globe, i as LoaderCircle, S as Shield, C as ChevronRight, k as ChevronDown, R as Radar, Z as Zap } from "./index-p-_K6v2l.js";
import { G as GlassCard, B as Badge } from "./GlassCard-BR9c0p-Q.js";
import { E as ErrorState, a as EmptyState, T as TriangleAlert } from "./ErrorState-kscm9ILp.js";
import { L as LoadingSkeleton, S as Search } from "./LoadingSkeleton-D4IbASRV.js";
import { f as useAnalyzeTarget, e as useListAnalyses } from "./useQueries-DgJaspKQ.js";
import { C as Clock } from "./clock-BEXnusk5.js";
import { D as Download } from "./download-BdS0PI1q.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
      key: "ep3f8r"
    }
  ],
  ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" }],
  ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }]
];
const Brain = createLucideIcon("brain", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",
      key: "1gvzjb"
    }
  ],
  ["path", { d: "M9 18h6", key: "x1upvd" }],
  ["path", { d: "M10 22h4", key: "ceow96" }]
];
const Lightbulb = createLucideIcon("lightbulb", __iconNode);
const SCAN_MODES = [
  { id: "quick", label: "Quick Recon" },
  { id: "full", label: "Full Scan" },
  { id: "deep", label: "Deep Analysis" },
  { id: "custom", label: "Custom" }
];
const STAGE_DESCRIPTIONS = {
  RECON: "Gathering OSINT data & DNS records...",
  SCAN: "Port scanning & service detection...",
  ANALYZE: "Correlating findings with CVE database...",
  EXPLOIT: "Mapping attack surfaces & paths..."
};
function buildStages(isPending, isDone) {
  const defs = [
    { id: "RECON", label: "Recon", icon: Search },
    { id: "SCAN", label: "Scan", icon: Radar },
    { id: "ANALYZE", label: "Analyze", icon: Brain },
    { id: "EXPLOIT", label: "Exploit", icon: Zap }
  ];
  return defs.map((d, i) => ({
    ...d,
    description: STAGE_DESCRIPTIONS[d.id],
    status: isDone ? "done" : isPending ? i === 0 ? "done" : i === 1 ? "done" : i === 2 ? "active" : "pending" : "pending"
  }));
}
function AIBrainNetwork({
  analysis,
  idle
}) {
  const [hovered, setHovered] = reactExports.useState(null);
  const nodes = analysis ? [
    { id: "t0", x: 160, y: 100, type: "target", label: analysis.target },
    { id: "s1", x: 60, y: 40, type: "service", label: "HTTP :80" },
    { id: "s2", x: 270, y: 30, type: "service", label: "SSH :22" },
    { id: "s3", x: 290, y: 165, type: "service", label: "DNS :53" },
    { id: "s4", x: 50, y: 160, type: "service", label: "HTTPS :443" },
    ...analysis.vulnerabilities.slice(0, 4).map((v, i) => ({
      id: `v${i}`,
      x: [90, 200, 230, 70][i] ?? 90,
      y: [145, 55, 130, 55][i] ?? 80,
      type: "vuln",
      label: v.title.slice(0, 18)
    }))
  ] : [
    { id: "c0", x: 160, y: 100, type: "target", label: "TARGET" },
    { id: "c1", x: 60, y: 50, type: "service", label: "Node" },
    { id: "c2", x: 260, y: 50, type: "service", label: "Node" },
    { id: "c3", x: 270, y: 150, type: "service", label: "Node" },
    { id: "c4", x: 50, y: 150, type: "service", label: "Node" }
  ];
  const edges = analysis ? [
    { from: "t0", to: "s1" },
    { from: "t0", to: "s2" },
    { from: "t0", to: "s3" },
    { from: "t0", to: "s4" },
    ...analysis.vulnerabilities.slice(0, 4).map((_, i) => ({
      from: "t0",
      to: `v${i}`,
      danger: true
    }))
  ] : [
    { from: "c0", to: "c1" },
    { from: "c0", to: "c2" },
    { from: "c0", to: "c3" },
    { from: "c0", to: "c4" },
    { from: "c1", to: "c2" },
    { from: "c3", to: "c4" }
  ];
  const nodePos = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full h-[200px] rounded-lg bg-muted/5 border border-border/20 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      viewBox: "0 0 320 200",
      className: "w-full h-full",
      "aria-label": "AI brain network visualization",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "AI Brain Network" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "glow-blue", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "2.5", result: "coloredBlur" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "coloredBlur" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("filter", { id: "glow-red", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("feGaussianBlur", { stdDeviation: "2", result: "coloredBlur" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("feMerge", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "coloredBlur" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("feMergeNode", { in: "SourceGraphic" })
            ] })
          ] })
        ] }),
        edges.map((e) => {
          const from = nodePos[e.from];
          const to = nodePos[e.to];
          if (!from || !to) return null;
          return /* @__PURE__ */ jsxRuntimeExports.jsx(
            "line",
            {
              x1: from.x,
              y1: from.y,
              x2: to.x,
              y2: to.y,
              stroke: e.danger ? "oklch(0.6 0.28 25)" : "oklch(0.67 0.3 257)",
              strokeWidth: e.danger ? "1.2" : "0.8",
              strokeOpacity: e.danger ? 0.5 : 0.3,
              strokeDasharray: e.danger ? "4 3" : void 0
            },
            `${e.from}-${e.to}`
          );
        }),
        nodes.map((node) => {
          const r = node.type === "target" ? 18 : node.type === "service" ? 10 : 7;
          const fill = node.type === "target" ? "oklch(0.67 0.3 257)" : node.type === "service" ? "oklch(0.55 0.25 287)" : "oklch(0.6 0.28 25)";
          const isHov = hovered === node.id;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: node.x,
                cy: node.y,
                r: r + 6,
                fill,
                fillOpacity: isHov ? 0.15 : 0.06
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "circle",
              {
                cx: node.x,
                cy: node.y,
                r,
                fill,
                fillOpacity: 0.2,
                stroke: fill,
                strokeWidth: "1.5",
                filter: node.type === "target" ? "url(#glow-blue)" : node.type === "vuln" ? "url(#glow-red)" : void 0,
                style: { cursor: "pointer" },
                onMouseEnter: () => setHovered(node.id),
                onMouseLeave: () => setHovered(null)
              }
            ),
            node.type === "target" && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: node.x,
                y: node.y + 4,
                textAnchor: "middle",
                fontSize: "7",
                fontFamily: "monospace",
                fill: "oklch(0.96 0.01 258)",
                fillOpacity: 0.9,
                children: "TARGET"
              }
            ),
            isHov && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: node.x,
                y: node.y - r - 6,
                textAnchor: "middle",
                fontSize: "7",
                fontFamily: "monospace",
                fill: "oklch(0.96 0.01 258)",
                fillOpacity: 0.9,
                children: node.label.slice(0, 20)
              }
            )
          ] }, node.id);
        }),
        idle && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "160",
            cy: "100",
            r: "60",
            fill: "none",
            stroke: "oklch(0.67 0.3 257)",
            strokeWidth: "0.5",
            strokeOpacity: "0.2",
            strokeDasharray: "4 8"
          }
        )
      ]
    }
  ) });
}
function ThinkingPipeline({
  isPending,
  isDone
}) {
  const stages = buildStages(isPending, isDone);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute left-[19px] top-8 bottom-8 w-px bg-border/20" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: stages.map((stage, i) => {
      const isActive = stage.status === "active";
      const isStageDone = stage.status === "done";
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -8 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: i * 0.1 },
          className: cn(
            "relative flex items-start gap-3 p-3 rounded-lg transition-smooth",
            isActive && "bg-accent/8 border border-accent/20",
            isStageDone && "bg-primary/5",
            !isActive && !isStageDone && "opacity-40"
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "relative flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-500",
                  isStageDone && "bg-primary/15 border-primary/40 shadow-[0_0_12px_rgba(79,140,255,0.3)]",
                  isActive && "bg-accent/15 border-accent/40 shadow-[0_0_14px_rgba(122,92,255,0.4)]",
                  !isActive && !isStageDone && "bg-muted/5 border-border/20"
                ),
                children: isStageDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-primary" }) : isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 text-accent animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(stage.icon, { className: "w-4 h-4 text-muted-foreground/50" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0 pt-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: cn(
                      "font-mono text-xs font-bold tracking-widest uppercase",
                      isStageDone && "text-primary",
                      isActive && "text-accent",
                      !isActive && !isStageDone && "text-muted-foreground"
                    ),
                    children: stage.label
                  }
                ),
                isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "neon", dot: true, children: "Live" })
              ] }),
              (isActive || isStageDone) && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground mt-0.5 leading-relaxed", children: stage.description })
            ] })
          ]
        },
        stage.id
      );
    }) })
  ] });
}
function IdleBrainState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      className: "flex flex-col items-center justify-center py-8 gap-5",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center justify-center", children: [
          [0, 1, 2, 3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "absolute w-1.5 h-1.5 rounded-full bg-primary/60",
              style: {
                transform: `rotate(${i * 60}deg) translateX(38px)`,
                animation: `spin ${3 + i * 0.5}s linear infinite`,
                boxShadow: "0 0 6px rgba(79,140,255,0.8)"
              }
            },
            i
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-20 h-20 rounded-full border border-primary/10 animate-ping" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute w-14 h-14 rounded-full border border-accent/15 animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 border border-primary/30 shadow-[0_0_20px_rgba(79,140,255,0.25)]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-6 h-6 text-primary glow-primary" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm font-semibold text-primary tracking-widest uppercase glow-primary", children: "AI READY" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Enter a target to begin analysis" })
        ] })
      ]
    }
  );
}
function SeverityBadge({ severity }) {
  const s = severity.toLowerCase();
  if (s === "critical") return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "critical", children: "Critical" });
  if (s === "high") return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "danger", children: "High" });
  if (s === "medium") return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "warning", children: "Medium" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "muted", children: "Low" });
}
function VulnerabilityItem({
  vuln,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, x: 12 },
      animate: { opacity: 1, x: 0 },
      transition: { delay: index * 0.07 },
      className: "p-3 rounded-lg border border-border/25 bg-muted/5 hover:border-border/40 transition-smooth space-y-2",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs font-semibold text-foreground leading-snug flex-1 min-w-0", children: vuln.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SeverityBadge, { severity: vuln.severity })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-relaxed", children: vuln.description }),
        vuln.recommendation && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 pt-1.5 border-t border-border/15", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-3 h-3 text-accent shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-accent/80 leading-relaxed", children: vuln.recommendation })
        ] })
      ]
    }
  );
}
function AnimatedRiskScore({ score }) {
  const [displayed, setDisplayed] = reactExports.useState(0);
  const color = score >= 70 ? "text-destructive drop-shadow-[0_0_10px_rgba(255,77,77,0.6)]" : score >= 40 ? "text-[oklch(0.85_0.18_70)] drop-shadow-[0_0_10px_rgba(255,176,32,0.5)]" : "text-[oklch(0.75_0.2_145)] drop-shadow-[0_0_10px_rgba(0,220,100,0.4)]";
  const label = score >= 70 ? "HIGH RISK" : score >= 40 ? "MEDIUM" : "LOW RISK";
  const labelColor = score >= 70 ? "text-destructive" : score >= 40 ? "text-[oklch(0.85_0.18_70)]" : "text-[oklch(0.75_0.2_145)]";
  reactExports.useEffect(() => {
    let frame;
    let start = null;
    const duration = 900;
    function animate(ts) {
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
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5 p-4 rounded-xl bg-muted/8 border border-border/25", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-shrink-0 w-20 h-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 100", className: "w-full h-full -rotate-90", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Risk score gauge" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "50",
            cy: "50",
            r: "40",
            fill: "none",
            stroke: "oklch(0.22 0.02 270)",
            strokeWidth: "8"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "circle",
          {
            cx: "50",
            cy: "50",
            r: "40",
            fill: "none",
            stroke: score >= 70 ? "oklch(0.6 0.28 25)" : score >= 40 ? "oklch(0.66 0.2 70)" : "oklch(0.75 0.2 145)",
            strokeWidth: "8",
            strokeLinecap: "round",
            strokeDasharray: circumference,
            strokeDashoffset: dashOffset,
            style: { transition: "stroke-dashoffset 0.05s linear" }
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-display text-xl font-bold ${color}`, children: displayed }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-1", children: "Risk Score" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: `font-mono text-sm font-bold tracking-wider ${labelColor}`,
          children: label
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 mt-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] text-muted-foreground uppercase tracking-widest", children: "Network" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 rounded-full bg-muted/20 mt-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-primary rounded-full transition-all duration-700",
              style: { width: `${Math.min(score * 1.1, 100)}%` }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] text-muted-foreground uppercase tracking-widest", children: "Web" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 rounded-full bg-muted/20 mt-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-accent rounded-full transition-all duration-700",
              style: { width: `${Math.min(score * 0.85, 100)}%` }
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] text-muted-foreground uppercase tracking-widest", children: "API" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-1 rounded-full bg-muted/20 mt-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "h-full bg-destructive rounded-full transition-all duration-700",
              style: { width: `${Math.min(score * 0.7, 100)}%` }
            }
          ) })
        ] })
      ] })
    ] })
  ] });
}
function AnalysisResultPanel({ analysis }) {
  const [thinkingOpen, setThinkingOpen] = reactExports.useState(false);
  const riskScore = Number(analysis.riskScore);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 overflow-y-auto max-h-[calc(100vh-240px)] pr-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/15", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5 text-primary flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-primary truncate", children: analysis.target }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "neon", className: "ml-auto flex-shrink-0", children: "Complete" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedRiskScore, { score: riskScore }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2.5 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-3 h-3" }),
        "Vulnerabilities (",
        analysis.vulnerabilities.length,
        ")"
      ] }),
      analysis.vulnerabilities.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 p-3 rounded-lg bg-[oklch(0.75_0.2_145)]/8 border border-[oklch(0.75_0.2_145)]/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-4 h-4 text-[oklch(0.75_0.2_145)] flex-shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-[oklch(0.75_0.2_145)]", children: "No vulnerabilities detected" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: analysis.vulnerabilities.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(VulnerabilityItem, { vuln: v, index: i }, `${v.title}-${i}`)) })
    ] }),
    analysis.suggestions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2.5 flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lightbulb, { className: "w-3 h-3" }),
        "Suggestions (",
        analysis.suggestions.length,
        ")"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: analysis.suggestions.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: 8 },
          animate: { opacity: 1, x: 0 },
          transition: { delay: i * 0.07 },
          className: "flex items-start gap-2 text-xs text-foreground/80 p-2.5 rounded-lg hover:bg-muted/5 transition-smooth",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-primary font-bold w-4 shrink-0 mt-0.5", children: String(i + 1).padStart(2, "0") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3 text-primary shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "leading-relaxed", children: s })
          ]
        },
        s.slice(0, 30)
      )) })
    ] }),
    analysis.thinking && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setThinkingOpen((o) => !o),
          className: "w-full flex items-center justify-between p-3 rounded-lg border border-border/20 hover:border-accent/30 bg-muted/5 transition-smooth",
          "data-ocid": "thinking-toggle",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-3.5 h-3.5 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground tracking-widest uppercase", children: "AI Reasoning Transcript" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ChevronDown,
              {
                className: cn(
                  "w-3.5 h-3.5 text-muted-foreground transition-transform duration-200",
                  thinkingOpen && "rotate-180"
                )
              }
            )
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
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 p-3 rounded-lg bg-muted/5 border border-accent/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground leading-relaxed font-mono whitespace-pre-wrap", children: analysis.thinking }) })
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      NeonButton,
      {
        variant: "outline",
        size: "sm",
        className: "w-full",
        "data-ocid": "export-report-btn",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
          "Export Report"
        ]
      }
    )
  ] });
}
function PastAnalysesList({
  analyses,
  isLoading,
  activeId,
  onSelect
}) {
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, { variant: "list", rows: 3 });
  if (analyses.length === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      EmptyState,
      {
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-5 h-5 text-muted-foreground" }),
        title: "No analyses yet",
        description: "Run your first target analysis to see history here."
      }
    );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5 max-h-52 overflow-y-auto", children: analyses.slice(0, 10).map((a) => {
    const risk = Number(a.riskScore);
    const isActive = activeId === a.id;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.button,
      {
        type: "button",
        onClick: () => onSelect(a),
        whileHover: { x: 2 },
        "data-ocid": `past-analysis-${String(a.id)}`,
        className: cn(
          "w-full text-left p-2.5 rounded-lg border transition-smooth group",
          isActive ? "border-accent/40 bg-accent/8 shadow-[0_0_12px_rgba(122,92,255,0.15)]" : "border-border/20 hover:border-primary/30 hover:bg-primary/3"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-foreground truncate flex-1", children: a.target }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: cn(
                  "font-mono text-[10px] font-bold px-1.5 py-0.5 rounded",
                  risk >= 70 ? "text-destructive bg-destructive/10" : risk >= 40 ? "text-[oklch(0.85_0.18_70)] bg-[oklch(0.85_0.18_70)]/10" : "text-[oklch(0.75_0.2_145)] bg-[oklch(0.75_0.2_145)]/10"
                ),
                children: risk
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-2.5 h-2.5 text-muted-foreground/50" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] text-muted-foreground/60", children: [
              a.vulnerabilities.length,
              " vulns"
            ] })
          ] })
        ]
      },
      String(a.id)
    );
  }) });
}
function AIAgentPage() {
  var _a;
  const [target, setTarget] = reactExports.useState("");
  const [scanMode, setScanMode] = reactExports.useState("quick");
  const [activeAnalysis, setActiveAnalysis] = reactExports.useState(null);
  const inputRef = reactExports.useRef(null);
  const analyzeMutation = useAnalyzeTarget();
  const analysesQuery = useListAnalyses();
  const analyses = analysesQuery.data ?? [];
  async function handleAnalyze() {
    if (!target.trim()) return;
    try {
      const result = await analyzeMutation.mutateAsync({
        target: target.trim(),
        context: scanMode
      });
      if (result.ok) setActiveAnalysis(result.ok);
    } catch {
    }
  }
  const isPending = analyzeMutation.isPending;
  const isDone = !!activeAnalysis;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_1.8fr_1.2fr] gap-5 min-h-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, x: -16 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.4 },
        className: "space-y-4",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 border border-accent/25", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-3.5 h-3.5 text-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xs tracking-widest uppercase text-foreground", children: "Target Input" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "ai-target-input",
                    className: "font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2 block",
                    children: "IP / Domain / URL"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    ref: inputRef,
                    id: "ai-target-input",
                    type: "text",
                    value: target,
                    onChange: (e) => setTarget(e.target.value),
                    placeholder: "192.168.1.1 or target.com",
                    "data-ocid": "ai-agent-target-input",
                    className: "w-full px-3 py-2.5 rounded-lg bg-muted/8 border border-border/30 text-sm text-foreground font-mono placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-primary/50 focus:border-primary/40 transition-smooth",
                    onKeyDown: (e) => e.key === "Enter" && handleAnalyze(),
                    disabled: isPending
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-2", children: "Scan Mode" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-1.5", children: SCAN_MODES.map((mode) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setScanMode(mode.id),
                    "data-ocid": `scan-mode-${mode.id}`,
                    disabled: isPending,
                    className: cn(
                      "px-2 py-2 rounded-lg font-mono text-[10px] tracking-wide border transition-all text-center",
                      scanMode === mode.id ? "bg-primary/12 border-primary/35 text-primary shadow-[0_0_8px_rgba(79,140,255,0.2)]" : "bg-muted/5 border-border/20 text-muted-foreground hover:border-border/40 hover:text-foreground"
                    ),
                    children: mode.label
                  },
                  mode.id
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                NeonButton,
                {
                  className: "w-full",
                  onClick: handleAnalyze,
                  loading: isPending,
                  loadingText: "Analyzing...",
                  disabled: !target.trim() || isPending,
                  "data-ocid": "ai-agent-analyze-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Bot, { className: "w-4 h-4" }),
                    "Analyze Target"
                  ]
                }
              ),
              analyzeMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                ErrorState,
                {
                  message: ((_a = analyzeMutation.error) == null ? void 0 : _a.message) ?? "Analysis failed"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[10px] text-muted-foreground tracking-widest uppercase mb-3 flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Network, { className: "w-3 h-3" }),
              "History (",
              analyses.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              PastAnalysesList,
              {
                analyses,
                isLoading: analysesQuery.isLoading,
                activeId: (activeAnalysis == null ? void 0 : activeAnalysis.id) ?? null,
                onSelect: setActiveAnalysis
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4, delay: 0.1 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          GlassCard,
          {
            depth: true,
            gradient: true,
            innerGlow: true,
            className: "p-5 h-full flex flex-col gap-5",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 border border-primary/25", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "w-3.5 h-3.5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xs tracking-widest uppercase text-foreground", children: "AI Thinking Timeline" }),
                isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-accent animate-pulse" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-accent tracking-widest", children: "RUNNING" })
                ] }),
                isDone && !isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "ml-auto flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-primary tracking-widest", children: "COMPLETE" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: isPending || isDone ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    ThinkingPipeline,
                    {
                      isPending,
                      isDone: isDone && !isPending
                    }
                  )
                },
                "pipeline"
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  exit: { opacity: 0 },
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(IdleBrainState, {})
                },
                "idle"
              ) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/20" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: "w-3.5 h-3.5 text-primary/60" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground tracking-widest uppercase", children: "AI Brain Visual" }),
                  activeAnalysis && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto font-mono text-[10px] text-primary/60", children: [
                    activeAnalysis.vulnerabilities.length,
                    " vuln nodes"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(AIBrainNetwork, { analysis: activeAnalysis, idle: !activeAnalysis })
              ] }),
              isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0 },
                  animate: { opacity: 1 },
                  className: "p-3 rounded-lg bg-accent/5 border border-accent/15",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-3 h-3 text-accent animate-spin" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-accent tracking-widest uppercase", children: "Processing" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground leading-relaxed", children: "Correlating OSINT data with CVE database. Analyzing open ports and service fingerprints for known vulnerabilities..." })
                  ]
                }
              )
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, x: 16 },
        animate: { opacity: 1, x: 0 },
        transition: { duration: 0.4, delay: 0.2 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5 h-full flex flex-col", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-7 h-7 rounded-lg bg-primary/10 border border-primary/25", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xs tracking-widest uppercase text-foreground", children: "AI Output" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              exit: { opacity: 0 },
              className: "space-y-4",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, { variant: "stat" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, { variant: "card" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, { variant: "list", rows: 3 }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin text-accent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: "AI analyzing target..." })
                ] })
              ]
            },
            "loading"
          ) : activeAnalysis ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 10 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.35 },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnalysisResultPanel, { analysis: activeAnalysis })
            },
            String(activeAnalysis.id)
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0 },
              animate: { opacity: 1 },
              className: "h-full flex items-center justify-center",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                EmptyState,
                {
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8 text-muted-foreground/40" }),
                  title: "No analysis results",
                  description: "Enter a target and run analysis to see AI-powered vulnerability findings here.",
                  "data-ocid": "output-empty-state"
                }
              )
            },
            "empty"
          ) }) })
        ] })
      }
    )
  ] });
}
export {
  AIAgentPage as default
};
