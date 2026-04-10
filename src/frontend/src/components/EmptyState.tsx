import { cn } from "@/lib/utils";
import type { EmptyStateProps } from "@/types";
import { ShieldOff } from "lucide-react";
import { NeonButton } from "./NeonButton";

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      data-ocid="empty-state"
      className={cn(
        "flex flex-col items-center justify-center py-16 px-6 text-center",
        "rounded-xl border border-dashed border-border/40",
        "bg-card/20 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mb-4 p-4 rounded-full bg-muted/20 border border-border/30">
        {icon ?? <ShieldOff className="w-8 h-8 text-muted-foreground" />}
      </div>
      <h3 className="font-display text-base font-semibold text-foreground mb-2 tracking-wide">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-6">
          {description}
        </p>
      )}
      {action && (
        <NeonButton
          size="sm"
          onClick={action.onClick}
          data-ocid="empty-state-cta"
        >
          {action.label}
        </NeonButton>
      )}
    </div>
  );
}
