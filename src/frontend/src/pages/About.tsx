import { Badge } from "@/components/Badge";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { SectionHeader } from "@/components/SectionHeader";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Award, Globe, Shield, Users, Zap } from "lucide-react";
import { motion } from "motion/react";

const VALUES = [
  {
    icon: Zap,
    title: "Innovation",
    desc: "Forward-thinking AI-driven security that anticipates tomorrow's threats, not just today's.",
    color: "green" as const,
  },
  {
    icon: Shield,
    title: "Trust",
    desc: "SOC2 Type II and ISO 27001 certified, privacy-first architecture that your compliance team will love.",
    color: "blue" as const,
  },
  {
    icon: Globe,
    title: "Resilience",
    desc: "99.99% uptime SLA with always-on protection — because threats don't respect business hours.",
    color: "green" as const,
  },
];

const TEAM = [
  {
    name: "Elena Vasquez",
    title: "CEO & Co-Founder",
    bio: "Former NSA TAO operator. Built threat-hunting programs at three Fortune 50 companies.",
    initials: "EV",
  },
  {
    name: "James Park",
    title: "CTO & Co-Founder",
    bio: "Former Google Project Zero researcher. PhD in adversarial machine learning from MIT.",
    initials: "JP",
  },
  {
    name: "Priya Nair",
    title: "VP Engineering",
    bio: "Previously led security infrastructure at Cloudflare and Netflix. 20 years in distributed systems.",
    initials: "PN",
  },
  {
    name: "Marcus Webb",
    title: "Chief Security Officer",
    bio: "Former CISO at three Fortune 100 companies. US Army Cyber Command veteran.",
    initials: "MW",
  },
  {
    name: "Sarah Chen",
    title: "VP Product",
    bio: "Cybersecurity product leader with a decade building detection platforms at CrowdStrike and Palo Alto.",
    initials: "SC",
  },
  {
    name: "David Kim",
    title: "Head of Threat Intel",
    bio: "Published researcher tracking APT groups across Asia-Pacific. Former FireEye Mandiant.",
    initials: "DK",
  },
];

const MILESTONES = [
  {
    year: "2019",
    event:
      "Founded in San Francisco by former NSA and Google security engineers",
  },
  {
    year: "2020",
    event: "Launched AI-powered EDR — blocked 50M threats in first 90 days",
  },
  {
    year: "2021",
    event: "Series A: $42M. Expanded to cloud security and network detection",
  },
  {
    year: "2022",
    event: "FedRAMP Authorization — deployed across 3 federal agencies",
  },
  {
    year: "2023",
    event: "Series B: $120M. Reached 5,000+ enterprise customers globally",
  },
  {
    year: "2024",
    event: "10,000+ customers, 847K+ threats blocked daily, 99.99% uptime",
  },
];

export default function About() {
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
              Our Mission
            </Badge>
            <h1 className="font-display font-extrabold text-4xl md:text-6xl tracking-tight mt-4">
              Built by Defenders.
              <br />
              <span className="glow-text">For Defenders.</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mt-4">
              CyberShield was founded by former NSA, Google, and military cyber
              operators who believe the defender advantage is real — with the
              right tools.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <Link to="/contact">
                <NeonButton variant="primary" size="lg" data-ocid="about-cta">
                  Join Our Team <ArrowRight className="w-4 h-4" />
                </NeonButton>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="Core Values"
            title="What We"
            titleHighlight="Stand For"
            centered
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <GlassCard
                    glow={v.color}
                    hover
                    className="p-6 h-full text-center space-y-3"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl border mx-auto flex items-center justify-center ${
                        v.color === "green"
                          ? "border-primary/30 bg-primary/10"
                          : "border-secondary/30 bg-secondary/10"
                      }`}
                    >
                      <Icon
                        className={`w-5 h-5 ${v.color === "green" ? "text-primary" : "text-secondary"}`}
                      />
                    </div>
                    <h3 className="font-display font-bold text-sm tracking-wider uppercase text-foreground">
                      {v.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {v.desc}
                    </p>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-[oklch(0.10_0.02_270)]/60 border-y border-white/[0.05]">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="Our Journey"
            title="Building the"
            titleHighlight="Future of Security"
            centered
          />
          <div className="mt-12 max-w-2xl mx-auto space-y-0">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex gap-6 pb-8 last:pb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-4 h-4 text-primary" />
                  </div>
                  {i < MILESTONES.length - 1 && (
                    <div className="flex-1 w-px bg-gradient-to-b from-primary/30 to-transparent mt-2" />
                  )}
                </div>
                <div className="pt-2 pb-4">
                  <span className="font-display font-bold text-primary text-sm tracking-wider">
                    {m.year}
                  </span>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {m.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeader
            eyebrow="Leadership"
            title="The Team"
            titleHighlight="Behind the Shield"
            centered
          />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {TEAM.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <GlassCard hover className="p-6" data-ocid={`team-${i}`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl border border-primary/30 bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <span className="font-display font-bold text-primary text-sm">
                        {member.initials}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <p className="font-display font-bold text-sm tracking-wide text-foreground uppercase">
                        {member.name}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {member.title}
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
