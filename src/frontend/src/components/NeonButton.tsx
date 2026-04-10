import { cn } from "@/lib/utils";
import type { NeonButtonVariant } from "@/types";
import { type VariantProps, cva } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const neonButtonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-display font-semibold tracking-wider uppercase text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 cursor-pointer select-none",
  {
    variants: {
      variant: {
        primary: [
          "bg-primary text-primary-foreground",
          "border border-primary/50",
          "shadow-[0_0_12px_rgba(79,140,255,0.4)] hover:shadow-[0_0_24px_rgba(79,140,255,0.7)]",
          "hover:brightness-110 hover:scale-[1.02]",
        ],
        secondary: [
          "bg-transparent text-secondary border border-secondary/60",
          "shadow-[0_0_8px_rgba(122,92,255,0.3)] hover:shadow-[0_0_20px_rgba(122,92,255,0.6)]",
          "hover:bg-secondary/10 hover:scale-[1.02]",
        ],
        outline: [
          "bg-transparent text-foreground border border-border/60",
          "hover:border-primary/60 hover:text-primary hover:shadow-[0_0_12px_rgba(79,140,255,0.4)]",
          "hover:scale-[1.02]",
        ],
        ghost: [
          "bg-transparent text-muted-foreground border-transparent",
          "hover:text-primary hover:bg-primary/5",
        ],
        danger: [
          "bg-destructive/10 text-destructive border border-destructive/40",
          "shadow-[0_0_8px_rgba(255,77,77,0.2)] hover:shadow-[0_0_20px_rgba(255,77,77,0.5)]",
          "hover:bg-destructive/20 hover:scale-[1.02]",
        ],
      },
      size: {
        sm: "h-8 px-4 text-xs rounded-md",
        md: "h-10 px-6 rounded-md",
        lg: "h-12 px-8 text-base rounded-lg",
        xl: "h-14 px-10 text-lg rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

export interface NeonButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof neonButtonVariants> {
  variant?: NeonButtonVariant;
  loading?: boolean;
  loadingText?: string;
}

export function NeonButton({
  className,
  variant,
  size,
  children,
  loading = false,
  loadingText,
  disabled,
  ...props
}: NeonButtonProps) {
  return (
    <button
      className={cn(neonButtonVariants({ variant, size }), className)}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {loading && loadingText ? loadingText : children}
    </button>
  );
}
