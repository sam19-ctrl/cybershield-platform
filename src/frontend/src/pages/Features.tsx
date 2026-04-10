import { Badge } from "@/components/Badge";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { SectionHeader } from "@/components/SectionHeader";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Cloud,
  Cpu,
  Eye,
  Lock,
  Mail,
  Network,
  Shield,
  X,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";

const PRODUCTS = [
  {
    icon: Cloud,
    name: "Cloud Security",
    badge: "CNAPP",
    color: "green" as const,
    tagline: "Protect every cloud workload",
    desc: "Full-stack cloud-native application protection across AWS, Azure, and GCP. CSPM, CWPP, and container security unified.",
    capabilities: [
      "Misconfig Detection",
      "Container Scanning",
      "IaC Security",
      "Runtime Protection",
    ],
  },
  {
    icon: Network,
    name: "Network Detection",
    badge: "NDR",
    color: "blue" as const,
    tagline: "See what firewalls miss",
    desc: "AI-driven network traffic analysis with full packet inspection. Detect lateral movement, command-and-control, and exfiltration in real time.",
    capabilities: [
      "Full Packet Capture",
      "Encrypted Traffic Analysis",
      "Lateral Movement Detection",
      "OT/IoT Visibility",
    ],
  },
  {
    icon: Mail,
    name: "Email Protection",
    badge: "ICES",
    color: "green" as const,
    tagline: "Stop BEC and phishing at scale",
    desc: "API-based inline protection against phishing, business email compromise, account takeover, and malicious attachments.",
    capabilities: [
      "BEC Detection",
      "Lookalike Domain Blocking",
      "Attachment Sandboxing",
      "Account Takeover Prevention",
    ],
  },
  {
    icon: Cpu,
    name: "Endpoint EDR",
    badge: "EDR/XDR",
    color: "blue" as const,
    tagline: "Next-gen endpoint intelligence",
    desc: "Lightweight agent with kernel-level telemetry, behavioral AI, and automated threat containment for Windows, macOS, and Linux.",
    capabilities: [
      "Behavioral AI Detection",
      "1-Click Isolation",
      "Threat Hunting",
      "Ransomware Rollback",
    ],
  },
  {
    icon: Shield,
    name: "Identity Security",
    badge: "ITDR",
    color: "green" as const,
    tagline: "Zero trust for every identity",
    desc: "Continuous authentication, privilege access management, and identity threat detection across AD, Entra ID, and Okta.",
    capabilities: [
      "AD Attack Detection",
      "Privilege Abuse",
      "MFA Enforcement",
      "Credential Monitoring",
    ],
  },
  {
    icon: Eye,
    name: "Threat Intelligence",
    badge: "CTI",
    color: "blue" as const,
    tagline: "Adversary intelligence at your fingertips",
    desc: "Real-time IOCs, actor profiles, and campaign tracking sourced from 10,000+ global sensors and government partnerships.",
    capabilities: [
      "Actor Profiles",
      "IOC Feeds",
      "Dark Web Monitoring",
      "Sector Advisories",
    ],
  },
];

const COMPARISON_ROWS = [
  {
    feature: "Cloud Security",
    cybershield: true,
    compA: true,
    compB: false,
    compC: false,
  },
  {
    feature: "Network Detection",
    cybershield: true,
    compA: false,
    compB: true,
    compC: false,
  },
  {
    feature: "Email Protection",
    cybershield: true,
    compA: true,
    compB: false,
    compC: true,
  },
  {
    feature: "Endpoint EDR",
    cybershield: true,
    compA: true,
    compB: true,
    compC: true,
  },
  {
    feature: "AI Threat Analyst",
    cybershield: true,
    compA: false,
    compB: false,
    compC: false,
  },
  {
    feature: "Attack Surface Mgmt",
    cybershield: true,
    compA: false,
    compB: true,
    compC: false,
  },
  {
    feature: "Real-time Alerts",
    cybershield: true,
    compA: true,
    compB: true,
    compC: false,
  },
  {
    feature: "Compliance Reports",
    cybershield: true,
    compA: true,
    compB: false,
    compC: true,
  },
  {
    feature: "24/7 Support",
    cybershield: true,
    compA: false,
    compB: false,
    compC: false,
  },
];

export default function Features() {
  return (
    <div>
      {/* Hero */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="neon" dot>
              Platform Overview
            </Badge>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight mt-4">
              One Platform.
              <br />
              <span className="glow-text">Total Coverage.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
              CyberShield unifies detection across your entire attack surface —
              cloud, network, endpoint, email, and identity — in a single pane
              of glass.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Products grid */}
      <section className="pb-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCTS.map((product, i) => {
              const Icon = product.icon;
              return (
                <motion.div
                  key={product.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <GlassCard
                    glow={product.color}
                    hover
                    elevated
                    className="p-7 h-full flex flex-col"
                    data-ocid={`product-${i}`}
                  >
                    <div className="flex items-start justify-between mb-5">
                      <div
                        className={`w-11 h-11 rounded-xl border flex items-center justify-center ${
                          product.color === "green"
                            ? "border-primary/30 bg-primary/10"
                            : "border-secondary/30 bg-secondary/10"
                        }`}
                      >
                        <Icon
                          className={`w-5 h-5 ${product.color === "green" ? "text-primary" : "text-secondary"}`}
                        />
                      </div>
                      <Badge
                        variant={product.color === "green" ? "neon" : "blue"}
                      >
                        {product.badge}
                      </Badge>
                    </div>

                    <h3 className="font-display font-bold text-lg tracking-wide text-foreground">
                      {product.name}
                    </h3>
                    <p
                      className={`text-xs font-mono mt-0.5 mb-3 ${product.color === "green" ? "text-primary" : "text-secondary"}`}
                    >
                      {product.tagline}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {product.desc}
                    </p>

                    <ul className="mt-5 space-y-1.5">
                      {product.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <Zap
                            className={`w-3 h-3 flex-shrink-0 ${product.color === "green" ? "text-primary" : "text-secondary"}`}
                          />
                          {cap}
                        </li>
                      ))}
                    </ul>

                    <Link
                      to="/features"
                      hash="feature-comparison"
                      className={`mt-5 pt-4 border-t border-white/[0.06] flex items-center gap-1 text-xs font-mono hover:gap-2 transition-all ${
                        product.color === "green"
                          ? "text-primary"
                          : "text-secondary"
                      }`}
                      data-ocid={`product-learn-more-${i}`}
                    >
                      Learn More <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>

          {/* Comparison Table */}
          <div id="feature-comparison" className="mt-24 scroll-mt-24">
            <SectionHeader
              eyebrow="How We Compare"
              title="CyberShield vs."
              titleHighlight="The Competition"
              centered
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-10 overflow-x-auto"
              data-ocid="comparison-table"
            >
              <GlassCard className="overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/[0.08]">
                      <th className="py-4 px-6 text-left font-display font-bold text-xs tracking-widest uppercase text-muted-foreground w-1/3">
                        Feature
                      </th>
                      <th className="py-4 px-4 text-center font-display font-bold text-xs tracking-widest uppercase text-primary">
                        CyberShield
                      </th>
                      <th className="py-4 px-4 text-center font-display font-bold text-xs tracking-widest uppercase text-muted-foreground">
                        Competitor A
                      </th>
                      <th className="py-4 px-4 text-center font-display font-bold text-xs tracking-widest uppercase text-muted-foreground">
                        Competitor B
                      </th>
                      <th className="py-4 px-4 text-center font-display font-bold text-xs tracking-widest uppercase text-muted-foreground">
                        Competitor C
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON_ROWS.map((row, i) => (
                      <tr
                        key={row.feature}
                        className={`border-b border-white/[0.05] transition-colors hover:bg-white/[0.02] ${i % 2 === 0 ? "" : "bg-white/[0.015]"}`}
                      >
                        <td className="py-3.5 px-6 font-mono text-xs text-foreground/80">
                          {row.feature}
                        </td>
                        {[row.cybershield, row.compA, row.compB, row.compC].map(
                          (val, j) => (
                            <td
                              key={`${row.feature}-${j}`}
                              className="py-3.5 px-4 text-center"
                            >
                              {val ? (
                                <Check className="w-4 h-4 text-primary mx-auto drop-shadow-[0_0_4px_var(--color-primary)]" />
                              ) : (
                                <X className="w-4 h-4 text-destructive/70 mx-auto" />
                              )}
                            </td>
                          ),
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </GlassCard>
            </motion.div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center space-y-4">
            <SectionHeader
              eyebrow="Ready to Deploy?"
              title="See All Features in"
              titleHighlight="Action"
              centered
            />
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Link to="/contact">
                <NeonButton
                  variant="primary"
                  size="lg"
                  data-ocid="features-cta"
                >
                  Request Live Demo <ArrowRight className="w-4 h-4" />
                </NeonButton>
              </Link>
              <Link to="/pricing">
                <NeonButton variant="secondary" size="lg">
                  <Lock className="w-4 h-4" /> View Pricing
                </NeonButton>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
