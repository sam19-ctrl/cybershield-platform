import { r as reactExports, j as jsxRuntimeExports, m as motion, S as Shield, L as Link, N as NeonButton, Z as Zap } from "./index-p-_K6v2l.js";
import { B as Badge, G as GlassCard } from "./GlassCard-BR9c0p-Q.js";
import { S as SectionHeader } from "./SectionHeader-D-B60MDL.js";
import { C as Check } from "./check-CW8xPOUz.js";
import { A as ArrowRight } from "./arrow-right-Cx2Bhjvp.js";
const PLANS = [
  {
    name: "Starter",
    badge: null,
    monthlyPrice: "$18",
    annualPrice: "$14",
    period: "/endpoint/mo",
    desc: "For teams taking their first security steps. Core EDR and threat detection.",
    color: "none",
    features: [
      "Endpoint EDR (up to 100 endpoints)",
      "Real-time threat detection",
      "Basic incident response",
      "Email alerts & reports",
      "8x5 support",
      "SOC2 compliance reporting"
    ],
    cta: "Start Free Trial",
    popular: false
  },
  {
    name: "Professional",
    badge: "Most Popular",
    monthlyPrice: "$38",
    annualPrice: "$30",
    period: "/endpoint/mo",
    desc: "Full-stack security for growing enterprises. Cloud, network, and endpoint unified.",
    color: "green",
    features: [
      "All Starter features",
      "Cloud Security (CNAPP)",
      "Network Detection & Response",
      "Email Protection",
      "Identity Security (ITDR)",
      "Threat Intelligence feeds",
      "Automated playbooks",
      "24x7 SOC support",
      "Dedicated CSM"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    badge: null,
    monthlyPrice: "Custom",
    annualPrice: "Custom",
    period: "contact sales",
    desc: "For large organizations needing custom deployment, SLAs, and compliance coverage.",
    color: "blue",
    features: [
      "All Professional features",
      "Unlimited endpoints",
      "On-premise deployment option",
      "Custom threat intel feeds",
      "FedRAMP / HIPAA compliance",
      "White-glove onboarding",
      "99.99% uptime SLA",
      "Dedicated incident response team",
      "Executive security briefings"
    ],
    cta: "Contact Sales",
    popular: false
  }
];
const FAQS = [
  {
    q: "Is there a free trial?",
    a: "Yes. All Starter and Professional plans include a 14-day free trial with full platform access. No credit card required."
  },
  {
    q: "How is pricing calculated?",
    a: "Pricing is per protected endpoint per month. Volume discounts apply at 500+ and 5,000+ endpoints. Contact us for custom pricing."
  },
  {
    q: "Can I switch plans?",
    a: "Yes, you can upgrade or downgrade at any time. Changes take effect on your next billing cycle."
  },
  {
    q: "What compliance certifications does CyberShield hold?",
    a: "CyberShield is SOC2 Type II certified, ISO 27001 certified, and FedRAMP Ready. Healthcare customers benefit from HIPAA-compliant data handling."
  }
];
function Pricing() {
  const [billing, setBilling] = reactExports.useState("monthly");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-24 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 text-center space-y-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "blue", dot: true, children: "Transparent Pricing" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-extrabold text-4xl md:text-6xl tracking-tight mt-4", children: [
              "Security That Scales",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "glow-text-blue", children: "With Your Business" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-2xl mx-auto mt-4", children: "Simple per-endpoint pricing with no hidden fees. Start free, scale as you grow." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center justify-center gap-3 mt-8",
                "data-ocid": "billing-toggle",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setBilling("monthly"),
                      className: `text-sm font-mono tracking-wide transition-colors ${billing === "monthly" ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`,
                      children: "Monthly"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setBilling(billing === "monthly" ? "annual" : "monthly"),
                      "aria-label": "Toggle billing cycle",
                      className: `relative w-12 h-6 rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${billing === "annual" ? "bg-primary/20 border-primary/60" : "bg-muted/40 border-border"}`,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: `absolute top-0.5 w-5 h-5 rounded-full transition-all ${billing === "annual" ? "left-[calc(100%-1.375rem)] bg-primary shadow-[0_0_8px_var(--color-primary)]" : "left-0.5 bg-muted-foreground/60"}`
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => setBilling("annual"),
                      className: `flex items-center gap-2 text-sm font-mono tracking-wide transition-colors ${billing === "annual" ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"}`,
                      children: [
                        "Annual",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-primary/15 border border-primary/40 text-primary", children: "Save 20%" })
                      ]
                    }
                  )
                ]
              }
            )
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-24 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto", children: PLANS.map((plan, i) => {
        const displayPrice = billing === "annual" ? plan.annualPrice : plan.monthlyPrice;
        return /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: 30 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { delay: i * 0.1 },
            className: plan.popular ? "md:-mt-4 md:mb-4" : "",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              GlassCard,
              {
                glow: plan.color,
                elevated: plan.popular,
                className: "p-7 h-full flex flex-col",
                "data-ocid": `plan-${plan.name.toLowerCase()}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      plan.badge && /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "neon", dot: true, className: "mb-2", children: plan.badge }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-lg tracking-wide uppercase text-foreground", children: plan.name })
                    ] }),
                    plan.popular && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }) })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.span,
                      {
                        initial: { opacity: 0, y: -6 },
                        animate: { opacity: 1, y: 0 },
                        transition: { duration: 0.2 },
                        className: "font-display font-extrabold text-4xl text-foreground",
                        children: displayPrice
                      },
                      `${plan.name}-${billing}`
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground ml-1", children: plan.period }),
                    billing === "annual" && displayPrice !== "Custom" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-primary/70 mt-0.5", children: "Billed annually" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed mb-6", children: plan.desc }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5 flex-1 mb-7", children: plan.features.map((feat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "li",
                    {
                      className: "flex items-start gap-2.5 text-sm text-muted-foreground",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "w-4 h-4 text-primary flex-shrink-0 mt-0.5" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: feat })
                      ]
                    },
                    feat
                  )) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    NeonButton,
                    {
                      variant: plan.popular ? "primary" : plan.color === "blue" ? "secondary" : "outline",
                      size: "md",
                      className: "w-full",
                      "data-ocid": `plan-cta-${i}`,
                      children: [
                        plan.cta,
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-3.5 h-3.5" })
                      ]
                    }
                  ) })
                ]
              }
            )
          },
          plan.name
        );
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs font-mono text-muted-foreground mt-8 tracking-wide", children: "All plans include 14-day free trial · No credit card required · Cancel anytime" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-[oklch(0.10_0.02_270)]/60 border-y border-white/[0.05]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SectionHeader,
        {
          eyebrow: "FAQ",
          title: "Common",
          titleHighlight: "Questions",
          centered: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 max-w-2xl mx-auto space-y-4", children: FAQS.map((faq, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 15 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { delay: i * 0.08 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-6", hover: true, "data-ocid": `faq-${i}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "w-4 h-4 text-primary flex-shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground tracking-wide mb-1.5", children: faq.q }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: faq.a })
            ] })
          ] }) })
        },
        faq.q
      )) })
    ] }) })
  ] });
}
export {
  Pricing as default
};
