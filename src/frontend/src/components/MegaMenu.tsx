import { cn } from "@/lib/utils";
import type { MegaMenuData } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  BookOpen,
  Briefcase,
  Building2,
  ChevronDown,
  Cloud,
  Cpu,
  FileText,
  Mail,
  Network,
  Shield,
  Users,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const MEGA_MENU_DATA: MegaMenuData = {
  Platform: [
    {
      title: "Security Products",
      items: [
        {
          label: "Cloud Security",
          description: "Protect multi-cloud environments and SaaS workloads",
          href: "/features",
          icon: "Cloud",
        },
        {
          label: "Network Detection",
          description: "AI-driven NDR with full packet inspection",
          href: "/features",
          icon: "Network",
        },
        {
          label: "Email Protection",
          description: "Stop phishing, BEC, and email-borne threats",
          href: "/features",
          icon: "Mail",
        },
        {
          label: "Endpoint EDR",
          description: "Next-gen endpoint detection and response",
          href: "/features",
          icon: "Cpu",
        },
      ],
    },
  ],
  Solutions: [
    {
      title: "By Industry",
      items: [
        {
          label: "Financial Services",
          description: "Protect trading systems and customer data",
          href: "/features",
          icon: "Building2",
        },
        {
          label: "Healthcare",
          description: "HIPAA-compliant security for health data",
          href: "/features",
          icon: "Shield",
        },
        {
          label: "Government",
          description: "FedRAMP-ready for public sector agencies",
          href: "/features",
          icon: "Briefcase",
        },
        {
          label: "Enterprise",
          description: "Unified security platform for large organizations",
          href: "/features",
          icon: "Users",
        },
      ],
    },
  ],
  Resources: [
    {
      title: "Learn",
      items: [
        {
          label: "Documentation",
          description: "Technical guides and API references",
          href: "/about",
          icon: "BookOpen",
        },
        {
          label: "Blog",
          description: "Threat intelligence and security research",
          href: "/about",
          icon: "FileText",
        },
        {
          label: "Case Studies",
          description: "See how enterprises stay protected",
          href: "/about",
          icon: "Briefcase",
        },
        {
          label: "About Us",
          description: "Our mission, team, and security philosophy",
          href: "/about",
          icon: "Users",
        },
      ],
    },
  ],
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Cloud,
  Network,
  Mail,
  Cpu,
  Building2,
  Shield,
  Briefcase,
  Users,
  BookOpen,
  FileText,
};

interface MegaMenuProps {
  label: string;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function MegaMenu({ label, isOpen, onToggle, onClose }: MegaMenuProps) {
  const menuData = MEGA_MENU_DATA[label];
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  if (!menuData) return null;

  const allItems = menuData.flatMap((g) => g.items);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "flex items-center gap-1 font-body text-sm font-medium tracking-wide",
          "text-muted-foreground hover:text-foreground transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded px-1 py-1",
          isOpen && "text-primary",
        )}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {label}
        <ChevronDown
          className={cn(
            "w-3.5 h-3.5 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div
          className={cn(
            "absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[520px] z-50",
            "glass border border-white/10 rounded-xl p-5 shadow-glow-sm",
            "grid grid-cols-2 gap-2",
          )}
        >
          {/* Decorative top border */}
          <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

          {allItems.map((item) => {
            const Icon = ICON_MAP[item.icon] ?? Shield;
            return (
              <Link
                key={item.label}
                to={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-start gap-3 p-3 rounded-lg group",
                  "hover:bg-primary/5 hover:border-primary/20 border border-transparent",
                  "transition-all duration-200",
                )}
              >
                <div className="mt-0.5 w-8 h-8 rounded-md border border-primary/20 bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:border-primary/40 group-hover:shadow-glow-sm transition-all">
                  <Icon className="w-4 h-4 text-primary" />
                </div>
                <div className="min-w-0">
                  <p className="font-display text-xs font-semibold tracking-wider text-foreground uppercase group-hover:text-primary transition-colors">
                    {item.label}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
