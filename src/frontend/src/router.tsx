import { DashboardLayout } from "@/components/DashboardLayout";
import { Layout } from "@/components/Layout";
import {
  createRootRoute,
  createRoute,
  createRouter,
  redirect,
} from "@tanstack/react-router";
import { Suspense, lazy } from "react";

// Marketing pages
const HomePage = lazy(() => import("@/pages/Home"));
const FeaturesPage = lazy(() => import("@/pages/Features"));
const PricingPage = lazy(() => import("@/pages/Pricing"));
const AboutPage = lazy(() => import("@/pages/About"));
const ContactPage = lazy(() => import("@/pages/Contact"));

// Dashboard pages
const DashboardPage = lazy(() => import("@/pages/dashboard/DashboardPage"));
const AIAgentPage = lazy(() => import("@/pages/dashboard/AIAgentPage"));
const ScanCenterPage = lazy(() => import("@/pages/dashboard/ScanCenterPage"));
const ThreatIntelPage = lazy(() => import("@/pages/dashboard/ThreatIntelPage"));
const ReportsPage = lazy(() => import("@/pages/dashboard/ReportsPage"));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin shadow-[0_0_15px_rgba(79,140,255,0.5)]" />
        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
          Loading...
        </span>
      </div>
    </div>
  );
}

function DashboardLoader() {
  return (
    <div className="flex-1 flex items-center justify-center min-h-[50vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 rounded-full border-2 border-primary border-t-transparent animate-spin shadow-[0_0_15px_rgba(79,140,255,0.5)]" />
        <span className="font-mono text-xs text-muted-foreground tracking-widest uppercase">
          Initializing...
        </span>
      </div>
    </div>
  );
}

// ── Root routes ───────────────────────────────────────────────────────────────
const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <HomePage />
    </Suspense>
  ),
});

const featuresRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/features",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <FeaturesPage />
    </Suspense>
  ),
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pricing",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <PricingPage />
    </Suspense>
  ),
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/about",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <AboutPage />
    </Suspense>
  ),
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <ContactPage />
    </Suspense>
  ),
});

// ── Dashboard layout route ────────────────────────────────────────────────────
const dashboardLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/dashboard",
  component: DashboardLayout,
});

const dashboardIndexRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<DashboardLoader />}>
      <DashboardPage />
    </Suspense>
  ),
});

const aiAgentRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/ai-agent",
  component: () => (
    <Suspense fallback={<DashboardLoader />}>
      <AIAgentPage />
    </Suspense>
  ),
});

const scanCenterRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/scan-center",
  component: () => (
    <Suspense fallback={<DashboardLoader />}>
      <ScanCenterPage />
    </Suspense>
  ),
});

const threatIntelRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/threat-intel",
  component: () => (
    <Suspense fallback={<DashboardLoader />}>
      <ThreatIntelPage />
    </Suspense>
  ),
});

const reportsRoute = createRoute({
  getParentRoute: () => dashboardLayoutRoute,
  path: "/reports",
  component: () => (
    <Suspense fallback={<DashboardLoader />}>
      <ReportsPage />
    </Suspense>
  ),
});

const catchAllRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  beforeLoad: () => {
    throw redirect({ to: "/" });
  },
  component: () => null,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  featuresRoute,
  pricingRoute,
  aboutRoute,
  contactRoute,
  dashboardLayoutRoute.addChildren([
    dashboardIndexRoute,
    aiAgentRoute,
    scanCenterRoute,
    threatIntelRoute,
    reportsRoute,
  ]),
  catchAllRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
