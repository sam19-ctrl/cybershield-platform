import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Shield, Twitter } from "lucide-react";

const FOOTER_COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Press & Media", href: "/about" },
      { label: "Partner Program", href: "/about" },
      { label: "Trust Center", href: "/about" },
    ],
  },
  {
    title: "Products",
    links: [
      { label: "Cloud Security", href: "/features" },
      { label: "Network Detection", href: "/features" },
      { label: "Email Protection", href: "/features" },
      { label: "Endpoint EDR", href: "/features" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/about" },
      { label: "Blog", href: "/about" },
      { label: "Case Studies", href: "/about" },
      { label: "Threat Intelligence", href: "/about" },
      { label: "Security Advisory", href: "/about" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Get a Demo", href: "/contact" },
      { label: "Sales Inquiry", href: "/contact" },
      { label: "Support Portal", href: "/contact" },
      { label: "Incident Response", href: "/contact" },
      { label: "Status Page", href: "/contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer
      className="relative bg-[oklch(0.07_0.01_258)] border-t border-white/[0.06]"
      data-ocid="site-footer"
    >
      {/* Neon divider top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Main footer content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand column */}
          <div className="md:col-span-1 space-y-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg border border-primary/40 bg-primary/10 flex items-center justify-center">
                <Shield className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display font-bold text-sm tracking-widest uppercase text-foreground">
                Cyber<span className="text-primary">Shield</span>
              </span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Enterprise-grade AI security platform protecting critical
              infrastructure worldwide.
            </p>
            {/* SOC2 / compliance badges */}
            <div className="flex flex-wrap gap-2">
              {["SOC2", "ISO 27001", "FedRAMP"].map((cert) => (
                <span
                  key={cert}
                  className="text-[10px] font-mono text-muted-foreground border border-border px-2 py-0.5 rounded-sm bg-muted/20 tracking-wider"
                >
                  {cert}
                </span>
              ))}
            </div>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { Icon: Github, label: "GitHub" },
                { Icon: Linkedin, label: "LinkedIn" },
                { Icon: Twitter, label: "Twitter" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="/contact"
                  aria-label={label}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 transition-all"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {FOOTER_COLUMNS.map((col) => (
            <div key={col.title} className="space-y-4">
              {/* Column title with neon accent */}
              <h4 className="font-display font-semibold text-xs tracking-widest uppercase text-foreground flex items-center gap-2">
                <span className="w-4 h-px bg-primary/60 inline-block" />
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.href}
                      className="text-xs text-muted-foreground hover:text-primary transition-colors leading-relaxed"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.05] bg-[oklch(0.06_0.01_258)]">
        <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted-foreground font-mono">
            © {year} CyberShield Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <a href="/contact" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <span className="text-border">|</span>
            <a href="/contact" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
            <span className="text-border">|</span>
            <a
              href={utmLink}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              Built with caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
