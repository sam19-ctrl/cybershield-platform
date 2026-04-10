import { cn } from "@/lib/utils";
import type { BadgeVariant } from "@/types";
import { type VariantProps, cva } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 font-mono text-xs font-medium tracking-widest uppercase px-2.5 py-1 rounded-sm border",
  {
    variants: {
      variant: {
        neon: "text-primary border-primary/40 bg-primary/10 drop-shadow-[0_0_6px_rgba(79,140,255,0.4)]",
        blue: "text-primary border-primary/40 bg-primary/10",
        muted: "text-muted-foreground border-border bg-muted/30",
        danger: "text-destructive border-destructive/40 bg-destructive/10",
        critical:
          "text-destructive border-destructive/60 bg-destructive/20 drop-shadow-[0_0_6px_rgba(255,77,77,0.5)] animate-pulse",
        warning:
          "text-[oklch(0.85_0.18_70)] border-[oklch(0.85_0.18_70)]/40 bg-[oklch(0.85_0.18_70)]/10",
        success:
          "text-[oklch(0.75_0.2_145)] border-[oklch(0.75_0.2_145)]/40 bg-[oklch(0.75_0.2_145)]/10",
      },
    },
    defaultVariants: {
      variant: "neon",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {
  variant?: BadgeVariant;
  dot?: boolean;
}

export function Badge({
  className,
  variant,
  dot,
  children,
  ...props
}: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props}>
      {dot && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      )}
      {children}
    </span>
  );
}
