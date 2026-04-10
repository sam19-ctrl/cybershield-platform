import { j as jsxRuntimeExports, m as motion, a as Cloud, b as Network, M as Mail, d as Cpu, S as Shield, Z as Zap, L as Link, X, N as NeonButton } from "./index-p-_K6v2l.js";
import { B as Badge, G as GlassCard } from "./GlassCard-BR9c0p-Q.js";
import { S as SectionHeader } from "./SectionHeader-D-B60MDL.js";
import { E as Eye } from "./eye-ovx43pT0.js";
import { A as ArrowRight } from "./arrow-right-Cx2Bhjvp.js";
import { C as Check } from "./check-CW8xPOUz.js";
import { L as Lock } from "./lock-vAOfcSr6.js";
const PRODUCTS = [
  {
    icon: Cloud,
    name: "Cloud Security",
    badge: "CNAPP",
    color: "green",
    tagline: "Protect every cloud workload",
    desc: "Full-stack cloud-native application protection across AWS, Azure, and GCP. CSPM, CWPP, and container security unified.",
    capabilities: [
      "Misconfig Detection",
      "Container Scanning",
      "IaC Security",
      "Runtime Protection"
    ]
  },
  {
    icon: Network,
    name: "Network Detection",
    badge: "NDR",
    color: "blue",
    tagline: "See what firewalls miss",
    desc: "AI-driven network traffic analysis with full packet inspection. Detect lateral movement, command-and-control, and exfiltration in real time.",
    capabilities: [
      "Full Packet Capture",
      "Encrypted Traffic Analysis",
      "Lateral Movement Detection",
      "OT/IoT Visibility"
    ]
  },
  {
    icon: Mail,
    name: "Email Protection",
    badge: "ICES",
    color: "green",
    tagline: "Stop BEC and phishing at scale",
    desc: "API-based inline protection against phishing, business email compromise, account takeover, and malicious attachments.",
    capabilities: [
      "BEC Detection",
      "Lookalike Domain Blocking",
      "Attachment Sandboxing",
      "Account Takeover Prevention"
    ]
  },
  {
    icon: Cpu,
    name: "Endpoint EDR",
    badge: "EDR/XDR",
    color: "blue",
    tagline: "Next-gen endpoint intelligence",
    desc: "Lightweight agent with kernel-level telemetry, behavioral AI, and automated threat containment for Windows, macOS, and Linux.",
    capabilities: [
      "Behavioral AI Detection",
      "1-Click Isolation",
      "Threat Hunting",
      "Ransomware Rollback"
    ]
  },
  {
    icon: Shield,
    name: "Identity Security",
    badge: "ITDR",
    color: "green",
    tagline: "Zero trust for every identity",
    desc: "Continuous authentication, privilege access management, and identity threat detection across AD, Entra ID, and Okta.",
    capabilities: [
      "AD Attack Detection",
      "Privilege Abuse",
      "MFA Enforcement",
      "Credential Monitoring"
    ]
  },
  {
    icon: Eye,
    name: "Threat Intelligence",
    badge: "CTI",
    color: "blue",
    tagline: "Adversary intelligence at your fingertips",
    desc: "Real-time IOCs, actor profiles, and campaign tracking sourced from 10,000+ global sensors and government partnerships.",
    capabilities: [
      "Actor Profiles",
      "IOC Feeds",
      "Dark Web Monitoring",
      "Sector Advisories"
    ]
  }
];
const COMPARISON_ROWS = [
  {
    feature: "Cloud Security",
    cybershield: true,
    compA: true,
    compB: false,
    compC: false
  },
  {
    feature: "Network Detection",
    cybershield: true,
    compA: false,
    compB: true,
    compC: false
  },
  {
    feature: "Email Protection",
    cybershield: true,
    compA: true,
    compB: false,
    compC: true
  },
  {
    feature: "Endpoint EDR",
    cybershield: true,
    compA: true,
    compB: true,
    compC: true
  },
  {
    feature: "AI Threat Analyst",
    cybershield: true,
    compA: false,
    compB: false,
    compC: false
  },
  {
    feature: "Attack Surface Mgmt",
    cybershield: true,
    compA: false,
    compB: true,
    compC: false
  },
  {
    feature: "Real-time Alerts",
    cybershield: true,
    compA: true,
    compB: true,
    compC: false
  },
  {
    feature: "Compliance Reports",
    cybershield: true,
    compA: true,
    compB: false,
    compC: true
  },
  {
    feature: "24/7 Support",
    cybershield: true,
    compA: false,
    compB: false,
    compC: false
  }
];
function Features() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 text-center space-y-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "neon", dot: true, children: "Platform Overview" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-extrabold text-4xl md:text-6xl tracking-tight mt-4", children: [
              "One Platform.",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "glow-text", children: "Total Coverage." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-2xl mx-auto mt-4", children: "CyberShield unifies detection across your entire attack surface — cloud, network, endpoint, email, and identity — in a single pane of glass." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-24 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: PRODUCTS.map((product, i) => {
        const Icon = product.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.08 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GlassCard,
              {
                glow: product.color,
                hover: true,
                elevated: true,
                className: "p-7 h-full flex flex-col",
                "data-ocid": `product-${i}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "div",
                      {
                        className: `w-11 h-11 rounded-xl border flex items-center justify-center ${product.color === "green" ? "border-primary/30 bg-primary/10" : "border-secondary/30 bg-secondary/10"}`,
                        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Icon,
                          {
                            className: `w-5 h-5 ${product.color === "green" ? "text-primary" : "text-secondary"}`
                          }
                        )
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Badge,
                      {
                        variant: product.color === "green" ? "neon" : "blue",
                        children: product.badge
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg tracking-wide text-foreground", children: product.name }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: `text-xs font-mono mt-0.5 mb-3 ${product.color === "green" ? "text-primary" : "text-secondary"}`,
                      children: product.tagline
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed flex-1", children: product.desc }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 space-y-1.5", children: product.capabilities.map((cap) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "li",
                    {
                      className: "flex items-center gap-2 text-xs text-muted-foreground",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Zap,
                          {
                            className: `w-3 h-3 flex-shrink-0 ${product.color === "green" ? "text-primary" : "text-secondary"}`
                          }
                        ),
                        cap
                      ]
                    },
                    cap
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/features",
                      hash: "feature-comparison",
                      className: `mt-5 pt-4 border-t border-white/[0.06] flex items-center gap-1 text-xs font-mono hover:gap-2 transition-all ${product.color === "green" ? "text-primary" : "text-secondary"}`,
                      "data-ocid": `product-learn-more-${i}`,
                      children: [
                        "Learn More ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                      ]
                    }
                  )
                ]
              }
            )
          },
          product.name
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { id: "feature-comparison", className: "mt-24 scroll-mt-24", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            eyebrow: "How We Compare",
            title: "CyberShield vs.",
            titleHighlight: "The Competition",
            centered: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: 0.1 },
            className: "mt-10 overflow-x-auto",
            "data-ocid": "comparison-table",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-white/[0.08]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-4 px-6 text-left font-display font-bold text-xs tracking-widest uppercase text-muted-foreground w-1/3", children: "Feature" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-4 px-4 text-center font-display font-bold text-xs tracking-widest uppercase text-primary", children: "CyberShield" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-4 px-4 text-center font-display font-bold text-xs tracking-widest uppercase text-muted-foreground", children: "Competitor A" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-4 px-4 text-center font-display font-bold text-xs tracking-widest uppercase text-muted-foreground", children: "Competitor B" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "py-4 px-4 text-center font-display font-bold text-xs tracking-widest uppercase text-muted-foreground", children: "Competitor C" })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: COMPARISON_ROWS.map((row, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "tr",
                {
                  className: `border-b border-white/[0.05] transition-colors hover:bg-white/[0.02] ${i % 2 === 0 ? "" : "bg-white/[0.015]"}`,
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "py-3.5 px-6 font-mono text-xs text-foreground/80", children: row.feature }),
                    [row.cybershield, row.compA, row.compB, row.compC].map(
                      (val, j) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "td",
                        {
                          className: "py-3.5 px-4 text-center",
                          children: val ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-primary mx-auto drop-shadow-[0_0_4px_var(--color-primary)]" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4 text-destructive/70 mx-auto" })
                        },
                        `${row.feature}-${j}`
                      )
                    )
                  ]
                },
                row.feature
              )) })
            ] }) })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 text-center space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            eyebrow: "Ready to Deploy?",
            title: "See All Features in",
            titleHighlight: "Action",
            centered: true
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-4 mt-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            NeonButton,
            {
              variant: "primary",
              size: "lg",
              "data-ocid": "features-cta",
              children: [
                "Request Live Demo ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
              ]
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/pricing", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(NeonButton, { variant: "secondary", size: "lg", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-4 h-4" }),
            " View Pricing"
          ] }) })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  Features as default
};
