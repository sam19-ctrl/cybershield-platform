import { j as jsxRuntimeExports, e as cn, ay as cva } from "./index-p-_K6v2l.js";
const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-mono text-xs font-medium tracking-widest uppercase px-2.5 py-1 rounded-sm border",
  {
    variants: {
      variant: {
        neon: "text-primary border-primary/40 bg-primary/10 drop-shadow-[0_0_6px_rgba(79,140,255,0.4)]",
        blue: "text-primary border-primary/40 bg-primary/10",
        muted: "text-muted-foreground border-border bg-muted/30",
        danger: "text-destructive border-destructive/40 bg-destructive/10",
        critical: "text-destructive border-destructive/60 bg-destructive/20 drop-shadow-[0_0_6px_rgba(255,77,77,0.5)] animate-pulse",
        warning: "text-[oklch(0.85_0.18_70)] border-[oklch(0.85_0.18_70)]/40 bg-[oklch(0.85_0.18_70)]/10",
        success: "text-[oklch(0.75_0.2_145)] border-[oklch(0.75_0.2_145)]/40 bg-[oklch(0.75_0.2_145)]/10"
      }
    },
    defaultVariants: {
      variant: "neon"
    }
  }
);
function Badge({
  className,
  variant,
  dot,
  children,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: cn(badgeVariants({ variant }), className), ...props, children: [
    dot && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-current animate-pulse" }),
    children
  ] });
}
function GlassCard({
  className,
  children,
  glow = "none",
  hover = false,
  elevated = false,
  depth = false,
  gradient = false,
  innerGlow = false,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn(
        "relative rounded-xl border backdrop-blur-xl transition-smooth",
        "bg-card/60 border-border/40",
        elevated && "bg-card/80 border-primary/20",
        depth && "card-depth",
        hover && "card-depth-hover cursor-pointer",
        gradient && "gradient-border",
        innerGlow && "inner-glow",
        glow === "blue" && "shadow-[0_0_20px_rgba(79,140,255,0.25)] border-primary/30",
        glow === "green" && "shadow-[0_0_20px_rgba(0,220,100,0.25)] border-[oklch(0.75_0.2_145)]/30",
        glow === "purple" && "shadow-[0_0_20px_rgba(122,92,255,0.25)] border-accent/30",
        glow === "danger" && "shadow-[0_0_20px_rgba(255,77,77,0.25)] border-destructive/30",
        className
      ),
      ...props,
      children
    }
  );
}
export {
  Badge as B,
  GlassCard as G
};
