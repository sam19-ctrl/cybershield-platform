import { Badge } from "@/components/Badge";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { SectionHeader } from "@/components/SectionHeader";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  CheckCircle2,
  ChevronRight,
  Eye,
  Globe,
  Lock,
  Shield,
  Users,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const FEATURES = [
  {
    icon: Shield,
    title: "Real-Time Monitoring",
    desc: "24/7 AI-powered threat monitoring across all attack surfaces with sub-millisecond response.",
    glow: "green" as const,
  },
  {
    icon: BarChart3,
    title: "AI-Powered Analytics",
    desc: "Machine learning models trained on 10B+ threat signals identify zero-day exploits before they land.",
    glow: "blue" as const,
  },
  {
    icon: Zap,
    title: "Incident Response",
    desc: "Automated playbooks and one-click isolation contain breaches in under 60 seconds.",
    glow: "green" as const,
  },
  {
    icon: Globe,
    title: "Global Threat Intel",
    desc: "Shared intelligence from 10,000+ enterprise customers and government partners worldwide.",
    glow: "blue" as const,
  },
  {
    icon: Lock,
    title: "Zero Trust Access",
    desc: "Continuous identity verification and least-privilege enforcement across every endpoint.",
    glow: "green" as const,
  },
  {
    icon: Eye,
    title: "Dark Web Monitor",
    desc: "Continuous surveillance of dark web forums for leaked credentials and breach intel.",
    glow: "blue" as const,
  },
];

const STATS = [
  { value: "847K+", label: "Threats Blocked Today", color: "text-primary" },
  { value: "<0.3ms", label: "AI Response Time", color: "text-secondary" },
  { value: "10,000+", label: "Enterprise Customers", color: "text-primary" },
  { value: "99.99%", label: "Platform Uptime SLA", color: "text-secondary" },
];

const TRUST_LOGOS = [
  "Fortune 500 Enterprises",
  "Top 10 US Banks",
  "Federal Agencies",
  "Healthcare Networks",
  "Critical Infrastructure",
];

const TESTIMONIALS = [
  {
    quote:
      "CyberShield reduced our incident response time by 94%. The AI threat detection is genuinely ahead of anything we tested.",
    name: "Sarah Chen",
    title: "CISO, Global Financial Corp",
    avatar: "SC",
  },
  {
    quote:
      "We blocked a nation-state APT in real-time. CyberShield's threat intelligence was the difference between a breach and a near-miss.",
    name: "Marcus Webb",
    title: "VP Security, TechCorp Fortune 50",
    avatar: "MW",
  },
];

export default function Home() {
  return (
    <div className="relative">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[calc(100vh-6rem)] flex items-center overflow-hidden">
        {/* Background glow blobs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-0 w-80 h-80 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="space-y-8"
            >
              <Badge variant="neon" dot>
                AI-Powered Threat Detection
              </Badge>

              <h1 className="font-display font-extrabold leading-none tracking-tight text-4xl md:text-5xl xl:text-6xl">
                ENTERPRISE-GRADE
                <br />
                <span className="glow-text">THREAT DETECTION</span>
                <br />
                <span className="text-foreground">& </span>
                <span className="glow-text-blue">RESPONSE</span>
              </h1>

              <p className="text-muted-foreground text-lg leading-relaxed max-w-lg">
                Protect your critical infrastructure with advanced AI-driven
                cybersecurity and real-time threat intelligence. Stay ahead of
                evolving cyber threats with CyberShield's unified security
                platform.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <Link to="/contact">
                  <NeonButton
                    variant="primary"
                    size="lg"
                    data-ocid="hero-cta-primary"
                  >
                    Explore Solutions <ArrowRight className="w-4 h-4" />
                  </NeonButton>
                </Link>
                <Link to="/contact">
                  <NeonButton
                    variant="secondary"
                    size="lg"
                    data-ocid="hero-cta-demo"
                  >
                    Watch Demo
                  </NeonButton>
                </Link>
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                {["SOC2 Type II", "ISO 27001", "FedRAMP Ready"].map((cert) => (
                  <div key={cert} className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span className="text-xs font-mono text-muted-foreground tracking-wide">
                      {cert}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right — threat globe visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
              className="relative flex items-center justify-center"
            >
              <div className="relative w-full max-w-[540px] mx-auto">
                {/* Glow ring behind image */}
                <div className="absolute inset-0 rounded-2xl bg-primary/5 blur-2xl scale-95" />
                <GlassCard glow="green" className="overflow-hidden rounded-2xl">
                  <img
                    src="/assets/generated/hero-threat-globe.dim_900x700.png"
                    alt="Global threat detection map showing real-time security monitoring"
                    className="w-full h-auto block"
                  />
                  {/* Overlay data panels */}
                  <div className="absolute top-4 left-4">
                    <GlassCard className="px-3 py-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                        <span className="font-mono text-xs text-primary tracking-wider">
                          LIVE THREAT FEED
                        </span>
                      </div>
                    </GlassCard>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <GlassCard className="px-3 py-2 rounded-lg">
                      <div className="font-mono text-xs text-foreground space-y-0.5">
                        <div className="flex justify-between gap-6">
                          <span className="text-muted-foreground">
                            Threats/sec
                          </span>
                          <span className="text-primary">+9,847</span>
                        </div>
                        <div className="flex justify-between gap-6">
                          <span className="text-muted-foreground">Blocked</span>
                          <span className="text-secondary">847,293</span>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </GlassCard>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────────── */}
      <section
        className="relative border-y border-white/[0.06] bg-[oklch(0.10_0.02_270)]/80"
        data-ocid="stats-section"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center space-y-1"
              >
                <p
                  className={`font-display font-bold text-3xl md:text-4xl ${stat.color}`}
                >
                  {stat.value}
                </p>
                <p className="text-xs font-mono text-muted-foreground tracking-wider uppercase">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section
        className="py-24 bg-background relative"
        data-ocid="features-section"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <SectionHeader
              eyebrow="Platform Capabilities"
              title="Every Attack Vector."
              titleHighlight="Covered."
              subtitle="CyberShield's unified platform provides end-to-end visibility and automated response across cloud, network, email, and endpoints."
              centered
            />
          </motion.div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard
                    glow={feat.glow}
                    hover
                    className="p-6 h-full"
                    data-ocid={`feature-card-${i}`}
                  >
                    <div
                      className={`w-10 h-10 rounded-lg mb-4 flex items-center justify-center border ${
                        feat.glow === "green"
                          ? "border-primary/30 bg-primary/10"
                          : "border-secondary/30 bg-secondary/10"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${feat.glow === "green" ? "text-primary" : "text-secondary"}`}
                      />
                    </div>
                    <h3 className="font-display font-bold text-sm tracking-wider uppercase text-foreground mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {feat.desc}
                    </p>
                    <Link
                      to="/features"
                      className={`mt-4 flex items-center gap-1 text-xs font-mono hover:gap-2 transition-all ${
                        feat.glow === "green"
                          ? "text-primary"
                          : "text-secondary"
                      }`}
                      data-ocid={`feature-learn-more-${i}`}
                    >
                      Learn More <ChevronRight className="w-3 h-3" />
                    </Link>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TRUSTED BY ────────────────────────────────────────────────────── */}
      <section
        className="py-14 bg-[oklch(0.10_0.02_270)]/60 border-y border-white/[0.05]"
        data-ocid="trust-section"
      >
        <div className="container mx-auto px-4">
          <p className="text-center text-xs font-mono text-muted-foreground tracking-widest uppercase mb-8">
            Trusted by the world's most security-critical organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
            {TRUST_LOGOS.map((name) => (
              <div
                key={name}
                className="font-display font-semibold text-xs tracking-wider uppercase text-muted-foreground/50 hover:text-muted-foreground transition-colors border border-border px-4 py-2 rounded-lg bg-muted/10"
              >
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-background" data-ocid="testimonials-section">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="Customer Stories"
            title="Trusted by Security"
            titleHighlight="Leaders"
            centered
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <GlassCard elevated className="p-7 h-full space-y-5">
                  <div className="flex gap-1">
                    {(["s1", "s2", "s3", "s4", "s5"] as const).map((id) => (
                      <span key={id} className="text-primary text-sm">
                        ★
                      </span>
                    ))}
                  </div>
                  <blockquote className="text-sm text-muted-foreground leading-relaxed italic">
                    "{t.quote}"
                  </blockquote>
                  <div className="flex items-center gap-3 pt-2 border-t border-white/[0.06]">
                    <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center flex-shrink-0">
                      <span className="font-display text-xs font-bold text-primary">
                        {t.avatar}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-xs font-bold tracking-wide text-foreground uppercase">
                        {t.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {t.title}
                      </p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      <section
        className="py-20 relative overflow-hidden"
        data-ocid="cta-section"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5" />
        <div className="absolute inset-0 border-y border-primary/10" />
        <div className="container mx-auto px-4 relative text-center space-y-6">
          <Badge variant="neon" dot>
            Start Your Trial Today
          </Badge>
          <h2 className="font-display font-extrabold text-3xl md:text-5xl tracking-tight">
            Ready to Secure Your <span className="glow-text">Enterprise?</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Join 10,000+ organizations using CyberShield to stop threats before
            they become breaches.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link to="/contact">
              <NeonButton
                variant="primary"
                size="xl"
                data-ocid="cta-banner-primary"
              >
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </NeonButton>
            </Link>
            <Link to="/contact">
              <NeonButton variant="secondary" size="xl">
                <Users className="w-4 h-4" /> Talk to Sales
              </NeonButton>
            </Link>
          </div>
          <p className="text-xs font-mono text-muted-foreground tracking-wider">
            No credit card required · 14-day free trial · Full platform access
          </p>
        </div>
      </section>
    </div>
  );
}
