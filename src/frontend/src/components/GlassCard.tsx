import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: "none" | "blue" | "purple" | "danger" | "green";
  hover?: boolean;
  elevated?: boolean;
  depth?: boolean;
  gradient?: boolean;
  innerGlow?: boolean;
}

export function GlassCard({
  className,
  children,
  glow = "none",
  hover = false,
  elevated = false,
  depth = false,
  gradient = false,
  innerGlow = false,
  ...props
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl border backdrop-blur-xl transition-smooth",
        "bg-card/60 border-border/40",
        elevated && "bg-card/80 border-primary/20",
        depth && "card-depth",
        hover && "card-depth-hover cursor-pointer",
        gradient && "gradient-border",
        innerGlow && "inner-glow",
        glow === "blue" &&
          "shadow-[0_0_20px_rgba(79,140,255,0.25)] border-primary/30",
        glow === "green" &&
          "shadow-[0_0_20px_rgba(0,220,100,0.25)] border-[oklch(0.75_0.2_145)]/30",
        glow === "purple" &&
          "shadow-[0_0_20px_rgba(122,92,255,0.25)] border-accent/30",
        glow === "danger" &&
          "shadow-[0_0_20px_rgba(255,77,77,0.25)] border-destructive/30",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
