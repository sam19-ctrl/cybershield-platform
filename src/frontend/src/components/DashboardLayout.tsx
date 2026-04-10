import { Outlet, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { DashboardSidebar } from "./DashboardSidebar";
import { StatusIndicator } from "./StatusIndicator";

const routeTitles: Record<string, { title: string; subtitle: string }> = {
  "/dashboard": { title: "Dashboard", subtitle: "Security Operations Hub" },
  "/dashboard/ai-agent": {
    title: "AI Agent",
    subtitle: "Intelligent Threat Analysis",
  },
  "/dashboard/scan-center": {
    title: "Scan Center",
    subtitle: "Active Recon & Scanning",
  },
  "/dashboard/threat-intel": {
    title: "Threat Intelligence",
    subtitle: "Global Threat Database",
  },
  "/dashboard/reports": { title: "Reports", subtitle: "Analytics & Insights" },
};

export function DashboardLayout() {
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const pageInfo = routeTitles[currentPath] ?? {
    title: "Dashboard",
    subtitle: "",
  };

  return (
    <div className="min-h-screen flex relative bg-background">
      {/* Animated grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 grid-bg opacity-60"
        aria-hidden="true"
      />
      {/* Radial gradient */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 70% 20%, oklch(0.12 0.04 270 / 0.4), transparent)",
        }}
        aria-hidden="true"
      />

      <DashboardSidebar />

      {/* Main */}
      <div className="flex-1 flex flex-col ml-[260px] min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b border-border/40 backdrop-blur-xl bg-background/80">
          <div>
            <h1 className="font-display font-bold text-xl text-foreground tracking-wider">
              {pageInfo.title}
            </h1>
            <p className="font-mono text-xs text-muted-foreground tracking-widest mt-0.5">
              {pageInfo.subtitle}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <StatusIndicator status="online" label="Live" size="sm" />
            <div className="w-px h-5 bg-border/40" />
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted/10 border border-border/30">
              <span className="font-mono text-xs text-muted-foreground">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 relative z-10 overflow-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPath}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="h-full"
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
