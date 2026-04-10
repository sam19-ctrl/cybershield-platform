import { c as createLucideIcon, j as jsxRuntimeExports, m as motion, L as Link, N as NeonButton, Z as Zap, S as Shield, G as Globe } from "./index-p-_K6v2l.js";
import { B as Badge, G as GlassCard } from "./GlassCard-BR9c0p-Q.js";
import { S as SectionHeader } from "./SectionHeader-D-B60MDL.js";
import { A as ArrowRight } from "./arrow-right-Cx2Bhjvp.js";
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
      d: "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526",
      key: "1yiouv"
    }
  ],
  ["circle", { cx: "12", cy: "8", r: "6", key: "1vp47v" }]
];
const Award = createLucideIcon("award", __iconNode);
const VALUES = [
  {
    icon: Zap,
    title: "Innovation",
    desc: "Forward-thinking AI-driven security that anticipates tomorrow's threats, not just today's.",
    color: "green"
  },
  {
    icon: Shield,
    title: "Trust",
    desc: "SOC2 Type II and ISO 27001 certified, privacy-first architecture that your compliance team will love.",
    color: "blue"
  },
  {
    icon: Globe,
    title: "Resilience",
    desc: "99.99% uptime SLA with always-on protection — because threats don't respect business hours.",
    color: "green"
  }
];
const TEAM = [
  {
    name: "Elena Vasquez",
    title: "CEO & Co-Founder",
    bio: "Former NSA TAO operator. Built threat-hunting programs at three Fortune 50 companies.",
    initials: "EV"
  },
  {
    name: "James Park",
    title: "CTO & Co-Founder",
    bio: "Former Google Project Zero researcher. PhD in adversarial machine learning from MIT.",
    initials: "JP"
  },
  {
    name: "Priya Nair",
    title: "VP Engineering",
    bio: "Previously led security infrastructure at Cloudflare and Netflix. 20 years in distributed systems.",
    initials: "PN"
  },
  {
    name: "Marcus Webb",
    title: "Chief Security Officer",
    bio: "Former CISO at three Fortune 100 companies. US Army Cyber Command veteran.",
    initials: "MW"
  },
  {
    name: "Sarah Chen",
    title: "VP Product",
    bio: "Cybersecurity product leader with a decade building detection platforms at CrowdStrike and Palo Alto.",
    initials: "SC"
  },
  {
    name: "David Kim",
    title: "Head of Threat Intel",
    bio: "Published researcher tracking APT groups across Asia-Pacific. Former FireEye Mandiant.",
    initials: "DK"
  }
];
const MILESTONES = [
  {
    year: "2019",
    event: "Founded in San Francisco by former NSA and Google security engineers"
  },
  {
    year: "2020",
    event: "Launched AI-powered EDR — blocked 50M threats in first 90 days"
  },
  {
    year: "2021",
    event: "Series A: $42M. Expanded to cloud security and network detection"
  },
  {
    year: "2022",
    event: "FedRAMP Authorization — deployed across 3 federal agencies"
  },
  {
    year: "2023",
    event: "Series B: $120M. Reached 5,000+ enterprise customers globally"
  },
  {
    year: "2024",
    event: "10,000+ customers, 847K+ threats blocked daily, 99.99% uptime"
  }
];
function About() {
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
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "neon", dot: true, children: "Our Mission" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-extrabold text-4xl md:text-6xl tracking-tight mt-4", children: [
              "Built by Defenders.",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "glow-text", children: "For Defenders." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-2xl mx-auto mt-4", children: "CyberShield was founded by former NSA, Google, and military cyber operators who believe the defender advantage is real — with the right tools." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-4 mt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(NeonButton, { variant: "primary", size: "lg", "data-ocid": "about-cta", children: [
              "Join Our Team ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
            ] }) }) })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeader,
        {
          eyebrow: "Core Values",
          title: "What We",
          titleHighlight: "Stand For",
          centered: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid grid-cols-1 md:grid-cols-3 gap-5", children: VALUES.map((v, i) => {
        const Icon = v.icon;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 25 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.1 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GlassCard,
              {
                glow: v.color,
                hover: true,
                className: "p-6 h-full text-center space-y-3",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `w-12 h-12 rounded-xl border mx-auto flex items-center justify-center ${v.color === "green" ? "border-primary/30 bg-primary/10" : "border-secondary/30 bg-secondary/10"}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Icon,
                        {
                          className: `w-5 h-5 ${v.color === "green" ? "text-primary" : "text-secondary"}`
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-sm tracking-wider uppercase text-foreground", children: v.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: v.desc })
                ]
              }
            )
          },
          v.title
        );
      }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-[oklch(0.10_0.02_270)]/60 border-y border-white/[0.05]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeader,
        {
          eyebrow: "Our Journey",
          title: "Building the",
          titleHighlight: "Future of Security",
          centered: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 max-w-2xl mx-auto space-y-0", children: MILESTONES.map((m, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: i % 2 === 0 ? -20 : 20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.1 },
          className: "flex gap-6 pb-8 last:pb-0",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Award, { className: "w-4 h-4 text-primary" }) }),
              i < MILESTONES.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-px bg-gradient-to-b from-primary/30 to-transparent mt-2" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2 pb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary text-sm tracking-wider", children: m.year }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 leading-relaxed", children: m.event })
            ] })
          ]
        },
        m.year
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeader,
        {
          eyebrow: "Leadership",
          title: "The Team",
          titleHighlight: "Behind the Shield",
          centered: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5", children: TEAM.map((member, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.08 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { hover: true, className: "p-6", "data-ocid": `team-${i}`, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-xl border border-primary/30 bg-primary/10 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-primary text-sm", children: member.initials }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-sm tracking-wide text-foreground uppercase", children: member.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground truncate", children: member.title })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: member.bio })
          ] })
        },
        member.name
      )) })
    ] }) })
  ] });
}
export {
  About as default
};
