import { Badge } from "@/components/Badge";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { SectionHeader } from "@/components/SectionHeader";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Shield, Zap } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";

type BillingCycle = "monthly" | "annual";

const PLANS = [
  {
    name: "Starter",
    badge: null,
    monthlyPrice: "$18",
    annualPrice: "$14",
    period: "/endpoint/mo",
    desc: "For teams taking their first security steps. Core EDR and threat detection.",
    color: "none" as const,
    features: [
      "Endpoint EDR (up to 100 endpoints)",
      "Real-time threat detection",
      "Basic incident response",
      "Email alerts & reports",
      "8x5 support",
      "SOC2 compliance reporting",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    badge: "Most Popular",
    monthlyPrice: "$38",
    annualPrice: "$30",
    period: "/endpoint/mo",
    desc: "Full-stack security for growing enterprises. Cloud, network, and endpoint unified.",
    color: "green" as const,
    features: [
      "All Starter features",
      "Cloud Security (CNAPP)",
      "Network Detection & Response",
      "Email Protection",
      "Identity Security (ITDR)",
      "Threat Intelligence feeds",
      "Automated playbooks",
      "24x7 SOC support",
      "Dedicated CSM",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    badge: null,
    monthlyPrice: "Custom",
    annualPrice: "Custom",
    period: "contact sales",
    desc: "For large organizations needing custom deployment, SLAs, and compliance coverage.",
    color: "blue" as const,
    features: [
      "All Professional features",
      "Unlimited endpoints",
      "On-premise deployment option",
      "Custom threat intel feeds",
      "FedRAMP / HIPAA compliance",
      "White-glove onboarding",
      "99.99% uptime SLA",
      "Dedicated incident response team",
      "Executive security briefings",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const FAQS = [
  {
    q: "Is there a free trial?",
    a: "Yes. All Starter and Professional plans include a 14-day free trial with full platform access. No credit card required.",
  },
  {
    q: "How is pricing calculated?",
    a: "Pricing is per protected endpoint per month. Volume discounts apply at 500+ and 5,000+ endpoints. Contact us for custom pricing.",
  },
  {
    q: "Can I switch plans?",
    a: "Yes, you can upgrade or downgrade at any time. Changes take effect on your next billing cycle.",
  },
  {
    q: "What compliance certifications does CyberShield hold?",
    a: "CyberShield is SOC2 Type II certified, ISO 27001 certified, and FedRAMP Ready. Healthcare customers benefit from HIPAA-compliant data handling.",
  },
];

export default function Pricing() {
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  return (
    <div>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="blue" dot>
              Transparent Pricing
            </Badge>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight mt-4">
              Security That Scales
              <br />
              <span className="glow-text-blue">With Your Business</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
              Simple per-endpoint pricing with no hidden fees. Start free, scale
              as you grow.
            </p>

            {/* Billing toggle */}
            <div
              className="flex items-center justify-center gap-3 mt-8"
              data-ocid="billing-toggle"
            >
              <button
                type="button"
                onClick={() => setBilling("monthly")}
                className={`text-sm font-mono tracking-wide transition-colors ${
                  billing === "monthly"
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Monthly
              </button>
              <button
                type="button"
                onClick={() =>
                  setBilling(billing === "monthly" ? "annual" : "monthly")
                }
                aria-label="Toggle billing cycle"
                className={`relative w-12 h-6 rounded-full border transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  billing === "annual"
                    ? "bg-primary/20 border-primary/60"
                    : "bg-muted/40 border-border"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-5 h-5 rounded-full transition-all ${
                    billing === "annual"
                      ? "left-[calc(100%-1.375rem)] bg-primary shadow-[0_0_8px_var(--color-primary)]"
                      : "left-0.5 bg-muted-foreground/60"
                  }`}
                />
              </button>
              <button
                type="button"
                onClick={() => setBilling("annual")}
                className={`flex items-center gap-2 text-sm font-mono tracking-wide transition-colors ${
                  billing === "annual"
                    ? "text-foreground font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Annual
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-primary/15 border border-primary/40 text-primary">
                  Save 20%
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Plans */}
      <section className="pb-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {PLANS.map((plan, i) => {
              const displayPrice =
                billing === "annual" ? plan.annualPrice : plan.monthlyPrice;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={plan.popular ? "md:-mt-4 md:mb-4" : ""}
                >
                  <GlassCard
                    glow={plan.color}
                    elevated={plan.popular}
                    className="p-7 h-full flex flex-col"
                    data-ocid={`plan-${plan.name.toLowerCase()}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        {plan.badge && (
                          <Badge variant="neon" dot className="mb-2">
                            {plan.badge}
                          </Badge>
                        )}
                        <h3 className="font-display font-bold text-lg tracking-wide uppercase text-foreground">
                          {plan.name}
                        </h3>
                      </div>
                      {plan.popular && (
                        <div className="w-8 h-8 rounded-lg border border-primary/30 bg-primary/10 flex items-center justify-center">
                          <Shield className="w-4 h-4 text-primary" />
                        </div>
                      )}
                    </div>

                    <div className="mb-4">
                      <motion.span
                        key={`${plan.name}-${billing}`}
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-display font-extrabold text-4xl text-foreground"
                      >
                        {displayPrice}
                      </motion.span>
                      <span className="text-xs font-mono text-muted-foreground ml-1">
                        {plan.period}
                      </span>
                      {billing === "annual" && displayPrice !== "Custom" && (
                        <p className="text-xs font-mono text-primary/70 mt-0.5">
                          Billed annually
                        </p>
                      )}
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {plan.desc}
                    </p>

                    <ul className="space-y-2.5 flex-1 mb-7">
                      {plan.features.map((feat) => (
                        <li
                          key={feat}
                          className="flex items-start gap-2.5 text-sm text-muted-foreground"
                        >
                          <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>

                    <Link to="/contact">
                      <NeonButton
                        variant={
                          plan.popular
                            ? "primary"
                            : plan.color === "blue"
                              ? "secondary"
                              : "outline"
                        }
                        size="md"
                        className="w-full"
                        data-ocid={`plan-cta-${i}`}
                      >
                        {plan.cta} <ArrowRight className="w-3.5 h-3.5" />
                      </NeonButton>
                    </Link>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>

          <p className="text-center text-xs font-mono text-muted-foreground mt-8 tracking-wide">
            All plans include 14-day free trial · No credit card required ·
            Cancel anytime
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[oklch(0.10_0.02_270)]/60 border-y border-white/[0.05]">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="FAQ"
            title="Common"
            titleHighlight="Questions"
            centered
          />
          <div className="mt-12 max-w-2xl mx-auto space-y-4">
            {FAQS.map((faq, i) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard className="p-6" hover data-ocid={`faq-${i}`}>
                  <div className="flex items-start gap-3">
                    <Zap className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-display font-semibold text-sm text-foreground tracking-wide mb-1.5">
                        {faq.q}
                      </p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
