import { c as createLucideIcon, r as reactExports, A as Activity, j as jsxRuntimeExports, m as motion, N as NeonButton, Z as Zap, i as LoaderCircle, h as AnimatePresence, e as cn, X, G as Globe, S as Shield } from "./index-p-_K6v2l.js";
import { G as GlassCard, B as Badge } from "./GlassCard-BR9c0p-Q.js";
import { T as TriangleAlert, E as ErrorState, a as EmptyState } from "./ErrorState-kscm9ILp.js";
import { S as Search, L as LoadingSkeleton } from "./LoadingSkeleton-D4IbASRV.js";
import { h as useListThreats, i as useLookupThreat, j as useAddThreatEntry } from "./useQueries-DgJaspKQ.js";
import { D as Database } from "./database-BqXkCoMF.js";
import { S as ShieldAlert } from "./shield-alert-BGigyO-F.js";
import { P as Plus } from "./plus-BuqoNeCG.js";
import { C as CircleCheck } from "./circle-check-BfASjlh5.js";
import { I as Info } from "./info-CBsvrnkN.js";
import { C as Clock } from "./clock-BEXnusk5.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$4 = [
  ["line", { x1: "4", x2: "20", y1: "9", y2: "9", key: "4lhtct" }],
  ["line", { x1: "4", x2: "20", y1: "15", y2: "15", key: "vyu0kd" }],
  ["line", { x1: "10", x2: "8", y1: "3", y2: "21", key: "1ggp8o" }],
  ["line", { x1: "16", x2: "14", y1: "3", y2: "21", key: "weycgp" }]
];
const Hash = createLucideIcon("hash", __iconNode$4);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71", key: "1cjeqo" }],
  ["path", { d: "M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71", key: "19qd67" }]
];
const Link = createLucideIcon("link", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M12 16h.01", key: "1drbdi" }],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  [
    "path",
    {
      d: "M15.312 2a2 2 0 0 1 1.414.586l4.688 4.688A2 2 0 0 1 22 8.688v6.624a2 2 0 0 1-.586 1.414l-4.688 4.688a2 2 0 0 1-1.414.586H8.688a2 2 0 0 1-1.414-.586l-4.688-4.688A2 2 0 0 1 2 15.312V8.688a2 2 0 0 1 .586-1.414l4.688-4.688A2 2 0 0 1 8.688 2z",
      key: "1fd625"
    }
  ]
];
const OctagonAlert = createLucideIcon("octagon-alert", __iconNode$2);
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
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
];
const ShieldCheck = createLucideIcon("shield-check", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7 18v-6a5 5 0 1 1 10 0v6", key: "pcx96s" }],
  [
    "path",
    { d: "M5 21a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-1a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2z", key: "1b4s83" }
  ],
  ["path", { d: "M21 12h1", key: "jtio3y" }],
  ["path", { d: "M18.5 4.5 18 5", key: "g5sp9y" }],
  ["path", { d: "M2 12h1", key: "1uaihz" }],
  ["path", { d: "M12 2v1", key: "11qlp1" }],
  ["path", { d: "m4.929 4.929.707.707", key: "1i51kw" }],
  ["path", { d: "M12 12v6", key: "3ahymv" }]
];
const Siren = createLucideIcon("siren", __iconNode);
const INDICATOR_TYPES = ["ip", "domain", "url", "hash", "email"];
const RISK_LEVELS = ["critical", "high", "medium", "low"];
function formatTimestamp(ts) {
  const ms = Number(ts / 1000000n);
  return new Date(ms).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function formatRelative(ts) {
  const ms = Number(ts / 1000000n);
  const diffMin = Math.floor((Date.now() - ms) / 6e4);
  if (diffMin < 1) return "just now";
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffH = Math.floor(diffMin / 60);
  if (diffH < 24) return `${diffH}h ago`;
  return `${Math.floor(diffH / 24)}d ago`;
}
function riskVariant(level) {
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
function riskBarColor(level) {
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
function riskGlowClass(level) {
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
  className
}) {
  const cls = cn("w-4 h-4", className);
  switch (type.toLowerCase()) {
    case "ip":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: cls });
    case "domain":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Globe, { className: cls });
    case "url":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { className: cls });
    case "hash":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Hash, { className: cls });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(OctagonAlert, { className: cls });
  }
}
function ThreatFeedCard({
  threat,
  index
}) {
  const riskBar = riskBarColor(threat.riskLevel);
  const glowHover = riskGlowClass(threat.riskLevel);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.3, delay: index * 0.05, ease: "easeOut" },
      className: cn(
        "group relative flex rounded-xl overflow-hidden",
        "border border-border/30 bg-card/50 backdrop-blur-sm",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:bg-card/70",
        glowHover
      ),
      "data-ocid": `threat-card-${threat.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("w-1 shrink-0 rounded-l-xl", riskBar) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-4 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-md bg-muted/20 border border-border/20 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                IndicatorIcon,
                {
                  type: threat.indicatorType,
                  className: "text-muted-foreground"
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm text-foreground font-semibold truncate leading-tight", children: threat.indicator }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/70 uppercase tracking-widest", children: threat.indicatorType })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: riskVariant(threat.riskLevel),
                className: "shrink-0 mt-0.5",
                children: threat.riskLevel
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed mb-3 line-clamp-2", children: threat.description }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-2.5 border-t border-border/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Database, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] truncate max-w-[100px]", children: threat.source })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px]", children: formatRelative(threat.detectedAt) })
            ] })
          ] })
        ] })
      ]
    }
  );
}
function LookupResultCard({
  entry,
  relatedThreats
}) {
  const riskBar = riskBarColor(entry.riskLevel);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: 8, scale: 0.98 },
      animate: { opacity: 1, y: 0, scale: 1 },
      className: "mt-4 pt-4 border-t border-border/30 space-y-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-destructive font-bold tracking-widest uppercase", children: "Threat Identified" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex rounded-xl overflow-hidden border border-destructive/30 bg-destructive/5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("w-1.5 shrink-0", riskBar) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 p-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-base font-bold text-foreground break-all", children: entry.indicator }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: riskVariant(entry.riskLevel), children: entry.riskLevel }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[10px] text-muted-foreground/70 uppercase tracking-widest border border-border/30 px-1.5 py-0.5 rounded", children: entry.indicatorType })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-5 h-5 text-destructive shrink-0 mt-0.5" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: entry.description }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-2 pt-2 border-t border-border/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] text-muted-foreground/50 tracking-widest uppercase mb-0.5", children: "Source" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-foreground/80", children: entry.source })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[9px] text-muted-foreground/50 tracking-widest uppercase mb-0.5", children: "Detected" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-foreground/80", children: formatTimestamp(entry.detectedAt) })
              ] })
            ] })
          ] })
        ] }),
        relatedThreats.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-[9px] text-muted-foreground/60 tracking-widest uppercase mb-2", children: [
            "Related Indicators (",
            relatedThreats.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1.5", children: relatedThreats.slice(0, 3).map((t) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between p-2.5 rounded-lg border border-border/20 bg-muted/5 gap-2",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "w-0.5 h-4 rounded-full shrink-0",
                        riskBarColor(t.riskLevel)
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground truncate", children: t.indicator })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: riskVariant(t.riskLevel),
                    className: "text-[9px] shrink-0",
                    children: t.riskLevel
                  }
                )
              ]
            },
            String(t.id)
          )) })
        ] })
      ]
    }
  );
}
function AddThreatModal({ onClose }) {
  const addMutation = useAddThreatEntry();
  const [form, setForm] = reactExports.useState({
    indicator: "",
    indicatorType: "ip",
    riskLevel: "medium",
    description: "",
    source: ""
  });
  async function handleSubmit() {
    if (!form.indicator || !form.description || !form.source) return;
    await addMutation.mutateAsync(form);
    onClose();
  }
  const inputCls = "w-full px-3 py-2.5 rounded-lg bg-muted/10 border border-border/40 text-sm text-foreground font-mono placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-smooth";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm",
      onClick: (e) => e.target === e.currentTarget && onClose(),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { scale: 0.95, y: 10 },
          animate: { scale: 1, y: 0 },
          exit: { scale: 0.95, y: 10 },
          className: "w-full max-w-md",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, gradient: true, className: "p-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-md bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm tracking-widest uppercase text-foreground", children: "Add Threat Indicator" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onClose,
                  className: "p-1.5 rounded-lg hover:bg-muted/20 text-muted-foreground hover:text-foreground transition-colors",
                  "aria-label": "Close modal",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "modal-indicator",
                    className: "font-mono text-xs text-muted-foreground tracking-widest uppercase mb-1.5 block",
                    children: "Indicator"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "modal-indicator",
                    type: "text",
                    value: form.indicator,
                    onChange: (e) => setForm({ ...form, indicator: e.target.value }),
                    placeholder: "IP, domain, URL, hash...",
                    "data-ocid": "threat-indicator-input",
                    className: inputCls
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "modal-type",
                      className: "font-mono text-xs text-muted-foreground tracking-widest uppercase mb-1.5 block",
                      children: "Type"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      id: "modal-type",
                      value: form.indicatorType,
                      onChange: (e) => setForm({ ...form, indicatorType: e.target.value }),
                      "data-ocid": "modal-type-select",
                      className: inputCls,
                      children: INDICATOR_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, children: t.toUpperCase() }, t))
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "label",
                    {
                      htmlFor: "modal-risk",
                      className: "font-mono text-xs text-muted-foreground tracking-widest uppercase mb-1.5 block",
                      children: "Risk"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "select",
                    {
                      id: "modal-risk",
                      value: form.riskLevel,
                      onChange: (e) => setForm({ ...form, riskLevel: e.target.value }),
                      "data-ocid": "modal-risk-select",
                      className: inputCls,
                      children: RISK_LEVELS.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r, children: r.toUpperCase() }, r))
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "modal-source",
                    className: "font-mono text-xs text-muted-foreground tracking-widest uppercase mb-1.5 block",
                    children: "Source"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "modal-source",
                    type: "text",
                    value: form.source,
                    onChange: (e) => setForm({ ...form, source: e.target.value }),
                    placeholder: "Shodan, VirusTotal, manual...",
                    "data-ocid": "threat-source-input",
                    className: inputCls
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "modal-desc",
                    className: "font-mono text-xs text-muted-foreground tracking-widest uppercase mb-1.5 block",
                    children: "Description"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    id: "modal-desc",
                    value: form.description,
                    onChange: (e) => setForm({ ...form, description: e.target.value }),
                    rows: 3,
                    placeholder: "Describe the threat indicator...",
                    "data-ocid": "threat-description-input",
                    className: cn(inputCls, "resize-none")
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                NeonButton,
                {
                  className: "w-full",
                  onClick: handleSubmit,
                  loading: addMutation.isPending,
                  loadingText: "Adding entry...",
                  disabled: !form.indicator || !form.description || !form.source,
                  "data-ocid": "add-threat-submit-btn",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
                    "Add Threat Entry"
                  ]
                }
              )
            ] })
          ] })
        }
      )
    }
  );
}
function StatCard({
  label,
  value,
  icon: Icon,
  colorClass,
  glowClass,
  index
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { delay: index * 0.07, duration: 0.35 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlassCard,
        {
          depth: true,
          className: cn(
            "p-4 transition-all duration-300 hover:-translate-y-1 group",
            glowClass
          ),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground/70 tracking-widest uppercase", children: label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: cn("p-1.5 rounded-md border bg-opacity-10", colorClass),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: cn("w-3.5 h-3.5", colorClass) })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: cn("font-display text-3xl font-bold", colorClass), children: value })
          ]
        }
      )
    }
  );
}
function ThreatIntelPage() {
  const [filterType, setFilterType] = reactExports.useState("all");
  const [filterRisk, setFilterRisk] = reactExports.useState("all");
  const [showAddModal, setShowAddModal] = reactExports.useState(false);
  const [lookupQuery, setLookupQuery] = reactExports.useState("");
  const [lookupType, setLookupType] = reactExports.useState("ip");
  const threatsQuery = useListThreats();
  const lookupMutation = useLookupThreat();
  const threats = threatsQuery.data ?? [];
  const filtered = threats.filter((t) => {
    const matchType = filterType === "all" || t.indicatorType === filterType;
    const matchRisk = filterRisk === "all" || t.riskLevel.toLowerCase() === filterRisk;
    return matchType && matchRisk;
  });
  const criticalCount = threats.filter(
    (t) => t.riskLevel.toLowerCase() === "critical"
  ).length;
  const highCount = threats.filter(
    (t) => t.riskLevel.toLowerCase() === "high"
  ).length;
  const sourcesCount = new Set(threats.map((t) => t.source)).size;
  const stats = [
    {
      label: "Total IOCs",
      value: threats.length,
      icon: Database,
      colorClass: "text-primary",
      glowClass: "hover:border-primary/40 hover:shadow-[0_0_20px_rgba(79,140,255,0.15)]"
    },
    {
      label: "Critical Threats",
      value: criticalCount,
      icon: Siren,
      colorClass: "text-destructive",
      glowClass: "hover:border-destructive/40 hover:shadow-[0_0_20px_rgba(255,77,77,0.15)]"
    },
    {
      label: "High Risk",
      value: highCount,
      icon: TriangleAlert,
      colorClass: "text-[oklch(0.72_0.22_55)]",
      glowClass: "hover:border-[oklch(0.72_0.22_55)]/40 hover:shadow-[0_0_20px_rgba(255,140,20,0.12)]"
    },
    {
      label: "Intel Sources",
      value: sourcesCount,
      icon: Activity,
      colorClass: "text-accent",
      glowClass: "hover:border-accent/40 hover:shadow-[0_0_20px_rgba(122,92,255,0.15)]"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -6 },
        animate: { opacity: 1, y: 0 },
        className: "flex items-center justify-between",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display text-xl font-bold text-foreground tracking-wide flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, { className: "w-5 h-5 text-destructive" }),
              "Threat Intelligence"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/70 font-mono mt-0.5", children: "IOC monitoring · Unified intelligence lookup · Real-time feed" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            NeonButton,
            {
              variant: "secondary",
              size: "sm",
              onClick: () => setShowAddModal(true),
              "data-ocid": "add-threat-btn",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                "Add Entry"
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: stats.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(StatCard, { ...s, index: i }, s.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.2 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, gradient: true, className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-md bg-accent/10 border border-accent/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-3.5 h-3.5 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm tracking-widest uppercase text-foreground", children: "Unified Threat Lookup" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[9px] text-muted-foreground/50 tracking-widest uppercase border border-border/30 px-1.5 py-0.5 rounded", children: "Live" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 items-end flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-[160px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "lookup-indicator",
                  className: "font-mono text-[10px] text-muted-foreground/60 tracking-widest uppercase mb-1.5 block",
                  children: "Indicator (IP · Domain · Hash · URL)"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  id: "lookup-indicator",
                  type: "text",
                  value: lookupQuery,
                  onChange: (e) => setLookupQuery(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter" && lookupQuery.trim()) {
                      lookupMutation.mutate({
                        indicator: lookupQuery,
                        indicatorType: lookupType
                      });
                    }
                  },
                  placeholder: "192.168.1.1, malware.exe, evil.com...",
                  "data-ocid": "lookup-indicator-input",
                  className: "w-full px-3 py-2.5 rounded-lg bg-muted/10 border border-border/40 text-sm text-foreground font-mono placeholder:text-muted-foreground/30 focus:outline-none focus:ring-1 focus:ring-primary/50 transition-smooth"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-36", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "lookup-type",
                  className: "font-mono text-[10px] text-muted-foreground/60 tracking-widest uppercase mb-1.5 block",
                  children: "Type"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "select",
                {
                  id: "lookup-type",
                  value: lookupType,
                  onChange: (e) => setLookupType(e.target.value),
                  "data-ocid": "lookup-type-select",
                  className: "w-full px-3 py-2.5 rounded-lg bg-muted/10 border border-border/40 text-sm text-foreground font-mono focus:outline-none focus:ring-1 focus:ring-primary/50 transition-smooth",
                  children: INDICATOR_TYPES.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: t, children: t.toUpperCase() }, t))
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              NeonButton,
              {
                onClick: () => lookupMutation.mutate({
                  indicator: lookupQuery,
                  indicatorType: lookupType
                }),
                loading: lookupMutation.isPending,
                loadingText: "Searching...",
                disabled: !lookupQuery.trim(),
                "data-ocid": "lookup-search-btn",
                className: "h-[42px] shrink-0",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "w-4 h-4" }),
                  "Lookup Threat"
                ]
              }
            )
          ] }),
          lookupMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-2 p-3 rounded-lg bg-muted/10 border border-border/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin text-accent" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-muted-foreground", children: "Querying threat intelligence database..." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: lookupMutation.data && !lookupMutation.isPending && (lookupMutation.data.found && lookupMutation.data.entry ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            LookupResultCard,
            {
              entry: lookupMutation.data.entry,
              relatedThreats: lookupMutation.data.relatedThreats
            },
            "found"
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 6 },
              animate: { opacity: 1, y: 0 },
              exit: { opacity: 0 },
              className: "mt-4 pt-4 border-t border-border/30",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-4 rounded-xl bg-[oklch(0.75_0.2_145)]/8 border border-[oklch(0.75_0.2_145)]/25", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-5 h-5 text-[oklch(0.75_0.2_145)] shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-sm font-bold text-[oklch(0.75_0.2_145)]", children: "Clean — No Threats Detected" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono text-xs text-muted-foreground/60 mt-0.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/70", children: lookupQuery }),
                    " ",
                    "is not present in our threat database."
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-[oklch(0.75_0.2_145)]/50 ml-auto shrink-0" })
              ] })
            },
            "clean"
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: 0.28 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { depth: true, className: "p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 mb-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(OctagonAlert, { className: "w-4 h-4 text-destructive" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm tracking-widest uppercase text-foreground", children: "Live Threat Feed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "muted", children: [
                filtered.length,
                " entries"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 p-1 rounded-lg bg-muted/10 border border-border/20", children: ["all", ...RISK_LEVELS].map((level) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setFilterRisk(level),
                  "data-ocid": `filter-risk-${level}`,
                  className: cn(
                    "px-2.5 py-1 rounded-md font-mono text-[10px] tracking-widest uppercase transition-all duration-200",
                    filterRisk === level ? "bg-primary/20 text-primary border border-primary/30" : "text-muted-foreground/60 hover:text-foreground hover:bg-muted/20"
                  ),
                  children: level === "all" ? "All" : level
                },
                level
              )) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-1 p-1 rounded-lg bg-muted/10 border border-border/20", children: ["all", ...INDICATOR_TYPES].map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => setFilterType(type),
                  "data-ocid": `filter-type-${type}`,
                  className: cn(
                    "px-2.5 py-1 rounded-md font-mono text-[10px] tracking-widest uppercase transition-all duration-200",
                    filterType === type ? "bg-accent/20 text-accent border border-accent/30" : "text-muted-foreground/60 hover:text-foreground hover:bg-muted/20"
                  ),
                  children: type === "all" ? "All" : type
                },
                type
              )) })
            ] })
          ] }),
          threatsQuery.isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3", children: Array.from({ length: 6 }, (_, i) => `sk-${i}`).map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSkeleton, { variant: "list", rows: 1 }, k)) }) : threatsQuery.isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorState, { onRetry: () => threatsQuery.refetch() }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            EmptyState,
            {
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-7 h-7 text-muted-foreground" }),
              title: filterRisk !== "all" || filterType !== "all" ? "No matching threats" : "No threats tracked",
              description: filterRisk !== "all" || filterType !== "all" ? "Try adjusting the risk or type filters to see more entries." : "Add your first threat indicator to start building your intelligence database.",
              action: filterRisk === "all" && filterType === "all" ? {
                label: "Add First Entry",
                onClick: () => setShowAddModal(true)
              } : void 0
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: filtered.map((threat, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            ThreatFeedCard,
            {
              threat,
              index: i
            },
            String(threat.id)
          )) }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { delay: 0.5 },
        className: "flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/15",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-3.5 h-3.5 text-primary/60 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground/60", children: "Threat data refreshes every 5 seconds. All IOCs are matched against global threat intelligence feeds including Shodan, VirusTotal, and internal watchlists." })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showAddModal && /* @__PURE__ */ jsxRuntimeExports.jsx(AddThreatModal, { onClose: () => setShowAddModal(false) }) })
  ] });
}
export {
  ThreatIntelPage as default
};
