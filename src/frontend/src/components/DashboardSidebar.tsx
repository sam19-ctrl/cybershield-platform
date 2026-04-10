import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Activity,
  Bot,
  FileBarChart2,
  Globe,
  LayoutDashboard,
  Radar,
  Shield,
} from "lucide-react";
import { StatusIndicator } from "./StatusIndicator";

const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "AI Agent", href: "/dashboard/ai-agent", icon: Bot },
  { label: "Scan Center", href: "/dashboard/scan-center", icon: Radar },
  { label: "Threat Intel", href: "/dashboard/threat-intel", icon: Globe },
  { label: "Reports", href: "/dashboard/reports", icon: FileBarChart2 },
];

interface SidebarNavLinkProps {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
}

function SidebarNavLink({
  href,
  label,
  icon: Icon,
  isActive,
}: SidebarNavLinkProps) {
  return (
    <Link
      to={href}
      data-ocid={`sidebar-nav-${label.toLowerCase().replace(/\s+/g, "-")}`}
      className={cn(
        "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
        isActive
          ? "bg-primary/15 text-primary border border-primary/25 shadow-[0_0_12px_rgba(79,140,255,0.15)]"
          : "text-muted-foreground hover:text-foreground hover:bg-accent/10 hover:border-accent/20 border border-transparent",
      )}
    >
      <Icon
        className={cn(
          "w-4.5 h-4.5 shrink-0",
          isActive
            ? "text-primary drop-shadow-[0_0_6px_rgba(79,140,255,0.6)]"
            : "",
        )}
      />
      <span className="font-mono tracking-wide">{label}</span>
      {isActive && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
      )}
    </Link>
  );
}

export function DashboardSidebar() {
  const router = useRouterState();
  const currentPath = router.location.pathname;

  return (
    <aside
      className="fixed left-0 top-0 h-screen w-[260px] flex flex-col z-30 border-r border-border/40"
      style={{
        background:
          "linear-gradient(180deg, oklch(0.10 0.02 270) 0%, oklch(0.08 0.01 258) 100%)",
      }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-border/40">
        <div className="relative w-8 h-8 flex items-center justify-center">
          <Shield className="w-8 h-8 text-primary drop-shadow-[0_0_10px_rgba(79,140,255,0.7)]" />
        </div>
        <div>
          <span className="font-display font-bold text-base text-foreground tracking-wider uppercase glow-primary">
            CyberShield
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Activity className="w-2.5 h-2.5 text-primary" />
            <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
              Platform v2.0
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto scrollbar-none">
        <p className="px-3 mb-3 font-mono text-[9px] text-muted-foreground/60 tracking-[0.2em] uppercase">
          Main Navigation
        </p>
        {navItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? currentPath === "/dashboard"
              : currentPath.startsWith(item.href);
          return (
            <SidebarNavLink key={item.href} {...item} isActive={isActive} />
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-4 border-t border-border/40 space-y-3">
        <div className="flex items-center justify-between px-1">
          <StatusIndicator
            status="online"
            label="Systems Operational"
            size="sm"
          />
        </div>
        <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/10 border border-border/20">
          <span className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
            Build
          </span>
          <span className="font-mono text-[10px] text-primary tracking-widest">
            2025.04.PROD
          </span>
        </div>
      </div>
    </aside>
  );
}
