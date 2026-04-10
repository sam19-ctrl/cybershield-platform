import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Shield, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { MegaMenu } from "./MegaMenu";
import { MobileNav } from "./MobileNav";
import { NeonButton } from "./NeonButton";

const MEGA_MENU_LABELS = ["Platform", "Solutions", "Resources"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggleMenu = (label: string) => {
    setOpenMenu((prev) => (prev === label ? null : label));
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        scrolled
          ? "bg-[oklch(0.10_0.02_270)]/95 backdrop-blur-xl border-b border-white/10 shadow-[0_1px_0_rgba(0,255,65,0.08)]"
          : "bg-[oklch(0.08_0.01_258)]/80 backdrop-blur-md border-b border-white/5",
      )}
      data-ocid="site-header"
    >
      {/* Top alert bar */}
      <div className="bg-primary/10 border-b border-primary/20 px-4 py-1.5 text-center hidden md:flex items-center justify-center gap-2">
        <Zap className="w-3 h-3 text-primary" />
        <span className="text-xs font-mono text-primary tracking-wider">
          LIVE: 847,293 threats neutralized today — AI response time &lt;0.3ms
        </span>
        <Zap className="w-3 h-3 text-primary" />
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group flex-shrink-0"
            data-ocid="header-logo"
          >
            <div className="relative">
              <div className="w-8 h-8 rounded-lg border border-primary/40 bg-primary/10 flex items-center justify-center group-hover:shadow-glow-sm transition-all">
                <Shield className="w-4 h-4 text-primary" />
              </div>
            </div>
            <span className="font-display font-bold text-base tracking-widest uppercase text-foreground group-hover:text-primary transition-colors">
              Cyber<span className="text-primary">Shield</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Main navigation"
          >
            {MEGA_MENU_LABELS.map((label) => (
              <MegaMenu
                key={label}
                label={label}
                isOpen={openMenu === label}
                onToggle={() => toggleMenu(label)}
                onClose={() => setOpenMenu(null)}
              />
            ))}
            <Link
              to="/features"
              className="font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="nav-features"
            >
              Features
            </Link>
            <Link
              to="/pricing"
              className="font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              data-ocid="nav-pricing"
            >
              Pricing
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/contact">
              <NeonButton variant="outline" size="sm" data-ocid="header-login">
                Sign In
              </NeonButton>
            </Link>
            <Link to="/contact">
              <NeonButton variant="primary" size="sm" data-ocid="header-cta">
                Get Started
              </NeonButton>
            </Link>
          </div>

          {/* Mobile Nav */}
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
