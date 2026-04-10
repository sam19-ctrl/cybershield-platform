import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown, ChevronRight, Menu, Shield, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NeonButton } from "./NeonButton";

const NAV_SECTIONS = [
  {
    label: "Platform",
    items: [
      "Cloud Security",
      "Network Detection",
      "Email Protection",
      "Endpoint EDR",
    ],
  },
  {
    label: "Solutions",
    items: ["Financial Services", "Healthcare", "Government", "Enterprise"],
  },
  {
    label: "Resources",
    items: ["Documentation", "Blog", "Case Studies", "About Us"],
  },
];

const NAV_LINKS = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const { location } = useRouterState();
  const prevPathRef = useRef(location.pathname);

  useEffect(() => {
    if (prevPathRef.current !== location.pathname) {
      prevPathRef.current = location.pathname;
      setOpen(false);
    }
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const toggleSection = (label: string) => {
    setExpanded((prev) => (prev === label ? null : label));
  };

  const handleOverlayKey = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-border hover:border-primary/40 hover:text-primary transition-all"
        data-ocid="mobile-nav-toggle"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      <div
        role="button"
        tabIndex={-1}
        className={cn(
          "fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none",
        )}
        onClick={() => setOpen(false)}
        onKeyUp={handleOverlayKey}
        aria-label="Close navigation"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-[320px] z-50 md:hidden",
          "bg-[oklch(0.10_0.02_270)] border-l border-white/10",
          "flex flex-col transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-display font-bold text-sm tracking-widest uppercase text-foreground">
              CyberShield
            </span>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="w-8 h-8 flex items-center justify-center rounded-lg border border-border hover:border-primary/40 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <button
                type="button"
                onClick={() => toggleSection(section.label)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                aria-expanded={expanded === section.label}
              >
                <span className="font-display tracking-wide uppercase text-xs">
                  {section.label}
                </span>
                <ChevronDown
                  className={cn(
                    "w-3.5 h-3.5 transition-transform",
                    expanded === section.label && "rotate-180",
                  )}
                />
              </button>
              {expanded === section.label && (
                <div className="ml-3 mt-1 space-y-0.5 border-l border-primary/20 pl-3">
                  {section.items.map((item) => (
                    <Link
                      key={item}
                      to="/features"
                      className="flex items-center gap-2 px-2 py-2 text-xs text-muted-foreground hover:text-primary transition-colors rounded"
                    >
                      <ChevronRight className="w-3 h-3 text-primary/40" />
                      {item}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}

          <div className="h-px bg-border my-2" />

          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="block px-3 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-all font-display tracking-wide uppercase text-xs"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="p-5 border-t border-white/10 space-y-3">
          <Link to="/contact">
            <NeonButton
              variant="primary"
              size="md"
              className="w-full"
              data-ocid="mobile-nav-cta"
            >
              Get Started
            </NeonButton>
          </Link>
          <Link to="/contact">
            <NeonButton variant="ghost" size="md" className="w-full">
              Request Demo
            </NeonButton>
          </Link>
        </div>
      </div>
    </>
  );
}
