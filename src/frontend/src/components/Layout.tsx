import { Outlet } from "@tanstack/react-router";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Animated grid background */}
      <div
        className="fixed inset-0 pointer-events-none z-0 grid-bg animate-grid-shimmer opacity-100"
        aria-hidden="true"
      />
      {/* Subtle radial gradient overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% -10%, oklch(0.14 0.04 270 / 0.6), transparent)",
        }}
        aria-hidden="true"
      />

      <Header />

      <main className="flex-1 relative z-10 pt-[calc(2.5rem+4rem)] md:pt-[calc(1.75rem+4rem)]">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
