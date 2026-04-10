import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, L as Link, N as NeonButton, S as Shield, Z as Zap, G as Globe, C as ChevronRight, U as Users } from "./index-p-_K6v2l.js";
import { B as Badge, G as GlassCard } from "./GlassCard-BR9c0p-Q.js";
import { S as SectionHeader } from "./SectionHeader-D-B60MDL.js";
import { A as ArrowRight } from "./arrow-right-Cx2Bhjvp.js";
import { C as CircleCheck } from "./circle-check-BfASjlh5.js";
import { L as Lock } from "./lock-vAOfcSr6.js";
import { E as Eye } from "./eye-ovx43pT0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode);
const FEATURES = [
  {
    icon: Shield,
    title: "Real-Time Monitoring",
    desc: "24/7 AI-powered threat monitoring across all attack surfaces with sub-millisecond response.",
    glow: "green"
  },
  {
    icon: ChartColumn,
    title: "AI-Powered Analytics",
    desc: "Machine learning models trained on 10B+ threat signals identify zero-day exploits before they land.",
    glow: "blue"
  },
  {
    icon: Zap,
    title: "Incident Response",
    desc: "Automated playbooks and one-click isolation contain breaches in under 60 seconds.",
    glow: "green"
  },
  {
    icon: Globe,
    title: "Global Threat Intel",
    desc: "Shared intelligence from 10,000+ enterprise customers and government partners worldwide.",
    glow: "blue"
  },
  {
    icon: Lock,
    title: "Zero Trust Access",
    desc: "Continuous identity verification and least-privilege enforcement across every endpoint.",
    glow: "green"
  },
  {
    icon: Eye,
    title: "Dark Web Monitor",
    desc: "Continuous surveillance of dark web forums for leaked credentials and breach intel.",
    glow: "blue"
  }
];
const STATS = [
  { value: "847K+", label: "Threats Blocked Today", color: "text-primary" },
  { value: "<0.3ms", label: "AI Response Time", color: "text-secondary" },
  { value: "10,000+", label: "Enterprise Customers", color: "text-primary" },
  { value: "99.99%", label: "Platform Uptime SLA", color: "text-secondary" }
];
const TRUST_LOGOS = [
  "Fortune 500 Enterprises",
  "Top 10 US Banks",
  "Federal Agencies",
  "Healthcare Networks",
  "Critical Infrastructure"
];
const TESTIMONIALS = [
  {
    quote: "CyberShield reduced our incident response time by 94%. The AI threat detection is genuinely ahead of anything we tested.",
    name: "Sarah Chen",
    title: "CISO, Global Financial Corp",
    avatar: "SC"
  },
  {
    quote: "We blocked a nation-state APT in real-time. CyberShield's threat intelligence was the difference between a breach and a near-miss.",
    name: "Marcus Webb",
    title: "VP Security, TechCorp Fortune 50",
    avatar: "MW"
  }
];
function Home() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-[calc(100vh-6rem)] flex items-center overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 right-0 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, x: -40 },
            animate: { opacity: 1, x: 0 },
            transition: { duration: 0.7, ease: "easeOut" },
            className: "space-y-8",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "neon", dot: true, children: "AI-Powered Threat Detection" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-extrabold leading-none tracking-tight text-4xl md:text-5xl xl:text-6xl", children: [
                "ENTERPRISE-GRADE",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "glow-text", children: "THREAT DETECTION" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground", children: "& " }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "glow-text-blue", children: "RESPONSE" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed max-w-lg", children: "Protect your critical infrastructure with advanced AI-driven cybersecurity and real-time threat intelligence. Stay ahead of evolving cyber threats with CyberShield's unified security platform." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  NeonButton,
                  {
                    variant: "primary",
                    size: "lg",
                    "data-ocid": "hero-cta-primary",
                    children: [
                      "Explore Solutions ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
                    ]
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  NeonButton,
                  {
                    variant: "secondary",
                    size: "lg",
                    "data-ocid": "hero-cta-demo",
                    children: "Watch Demo"
                  }
                ) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-4 pt-2", children: ["SOC2 Type II", "ISO 27001", "FedRAMP Ready"].map((cert) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3.5 h-3.5 text-primary flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground tracking-wide", children: cert })
              ] }, cert)) })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.92 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.9, ease: "easeOut", delay: 0.2 },
            className: "relative flex items-center justify-center",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-[540px] mx-auto", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl bg-primary/5 blur-2xl scale-95" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { glow: "green", className: "overflow-hidden rounded-2xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/assets/generated/hero-threat-globe.dim_900x700.png",
                    alt: "Global threat detection map showing real-time security monitoring",
                    className: "w-full h-auto block"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-4 left-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "px-3 py-2 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-primary tracking-wider", children: "LIVE THREAT FEED" })
                ] }) }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-4 right-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "px-3 py-2 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-xs text-foreground space-y-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Threats/sec" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "+9,847" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-6", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "Blocked" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary", children: "847,293" })
                  ] })
                ] }) }) })
              ] })
            ] })
          }
        )
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "relative border-y border-white/[0.06] bg-[oklch(0.10_0.02_270)]/80",
        "data-ocid": "stats-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-8", children: STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { delay: i * 0.1 },
              className: "text-center space-y-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: `font-display font-bold text-3xl md:text-4xl ${stat.color}`,
                    children: stat.value
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground tracking-wider uppercase", children: stat.label })
              ]
            },
            stat.label
          )) }) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-24 bg-background relative",
        "data-ocid": "features-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { opacity: 0, y: 30 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                SectionHeader,
                {
                  eyebrow: "Platform Capabilities",
                  title: "Every Attack Vector.",
                  titleHighlight: "Covered.",
                  subtitle: "CyberShield's unified platform provides end-to-end visibility and automated response across cloud, network, email, and endpoints.",
                  centered: true
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", children: FEATURES.map((feat, i) => {
            const Icon = feat.icon;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                initial: { opacity: 0, y: 30 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true },
                transition: { delay: i * 0.1 },
                children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  GlassCard,
                  {
                    glow: feat.glow,
                    hover: true,
                    className: "p-6 h-full",
                    "data-ocid": `feature-card-${i}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "div",
                        {
                          className: `w-10 h-10 rounded-lg mb-4 flex items-center justify-center border ${feat.glow === "green" ? "border-primary/30 bg-primary/10" : "border-secondary/30 bg-secondary/10"}`,
                          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            Icon,
                            {
                              className: `w-5 h-5 ${feat.glow === "green" ? "text-primary" : "text-secondary"}`
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm tracking-wider uppercase text-foreground mb-2", children: feat.title }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: feat.desc }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        Link,
                        {
                          to: "/features",
                          className: `mt-4 flex items-center gap-1 text-xs font-mono hover:gap-2 transition-all ${feat.glow === "green" ? "text-primary" : "text-secondary"}`,
                          "data-ocid": `feature-learn-more-${i}`,
                          children: [
                            "Learn More ",
                            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-3 h-3" })
                          ]
                        }
                      )
                    ]
                  }
                )
              },
              feat.title
            );
          }) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "section",
      {
        className: "py-14 bg-[oklch(0.10_0.02_270)]/60 border-y border-white/[0.05]",
        "data-ocid": "trust-section",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs font-mono text-muted-foreground tracking-widest uppercase mb-8", children: "Trusted by the world's most security-critical organizations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center justify-center gap-6 md:gap-10", children: TRUST_LOGOS.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "font-display font-semibold text-xs tracking-wider uppercase text-muted-foreground/50 hover:text-muted-foreground transition-colors border border-border px-4 py-2 rounded-lg bg-muted/10",
              children: name
            },
            name
          )) })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-24 bg-background", "data-ocid": "testimonials-section", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeader,
        {
          eyebrow: "Customer Stories",
          title: "Trusted by Security",
          titleHighlight: "Leaders",
          centered: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto", children: TESTIMONIALS.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.15 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { elevated: true, className: "p-7 h-full space-y-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: ["s1", "s2", "s3", "s4", "s5"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-sm", children: "★" }, id)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "text-sm text-muted-foreground leading-relaxed italic", children: [
              '"',
              t.quote,
              '"'
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pt-2 border-t border-white/[0.06]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display text-xs font-bold text-primary", children: t.avatar }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-xs font-bold tracking-wide text-foreground uppercase", children: t.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: t.title })
              ] })
            ] })
          ] })
        },
        t.name
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "section",
      {
        className: "py-20 relative overflow-hidden",
        "data-ocid": "cta-section",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 border-y border-primary/10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4 relative text-center space-y-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "neon", dot: true, children: "Start Your Trial Today" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-extrabold text-3xl md:text-5xl tracking-tight", children: [
              "Ready to Secure Your ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "glow-text", children: "Enterprise?" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto", children: "Join 10,000+ organizations using CyberShield to stop threats before they become breaches." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-4 pt-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                NeonButton,
                {
                  variant: "primary",
                  size: "xl",
                  "data-ocid": "cta-banner-primary",
                  children: [
                    "Start Free Trial ",
                    /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-5 h-5" })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(NeonButton, { variant: "secondary", size: "xl", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
                " Talk to Sales"
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground tracking-wider", children: "No credit card required · 14-day free trial · Full platform access" })
          ] })
        ]
      }
    )
  ] });
}
export {
  Home as default
};
