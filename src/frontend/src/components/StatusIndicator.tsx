import { cn } from "@/lib/utils";
import type { StatusIndicatorProps } from "@/types";

const statusConfig: Record<
  StatusIndicatorProps["status"],
  { dot: string; label: string; text: string }
> = {
  online: {
    dot: "bg-[oklch(0.75_0.2_145)]",
    label: "Online",
    text: "text-[oklch(0.75_0.2_145)]",
  },
  offline: {
    dot: "bg-destructive",
    label: "Offline",
    text: "text-destructive",
  },
  warning: {
    dot: "bg-[oklch(0.66_0.2_70)]",
    label: "Warning",
    text: "text-[oklch(0.66_0.2_70)]",
  },
  unknown: {
    dot: "bg-muted-foreground",
    label: "Unknown",
    text: "text-muted-foreground",
  },
};

const sizeMap = {
  sm: "w-1.5 h-1.5",
  md: "w-2 h-2",
  lg: "w-2.5 h-2.5",
};

export function StatusIndicator({
  status,
  label,
  pulse = true,
  size = "md",
}: StatusIndicatorProps) {
  const config = statusConfig[status];
  return (
    <output
      className="inline-flex items-center gap-1.5"
      aria-label={label ?? config.label}
    >
      <span className="relative inline-flex">
        <span className={cn("rounded-full", sizeMap[size], config.dot)} />
        {pulse && status === "online" && (
          <span
            className={cn(
              "absolute inset-0 rounded-full animate-ping opacity-75",
              config.dot,
            )}
          />
        )}
      </span>
      {label !== undefined && (
        <span className={cn("text-xs font-mono font-medium", config.text)}>
          {label}
        </span>
      )}
    </output>
  );
}
