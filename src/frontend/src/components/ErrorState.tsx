import { cn } from "@/lib/utils";
import type { ErrorStateProps } from "@/types";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { NeonButton } from "./NeonButton";

export function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      data-ocid="error-state"
      className={cn(
        "flex flex-col items-center justify-center py-14 px-6 text-center",
        "rounded-xl border border-destructive/20",
        "bg-destructive/5 backdrop-blur-sm",
        className,
      )}
    >
      <div className="mb-4 p-4 rounded-full bg-destructive/10 border border-destructive/20">
        <AlertTriangle className="w-8 h-8 text-destructive" />
      </div>
      <h3 className="font-display text-base font-semibold text-destructive mb-2 tracking-wide">
        System Error
      </h3>
      <p className="text-sm text-muted-foreground max-w-xs leading-relaxed mb-6">
        {message}
      </p>
      {onRetry && (
        <NeonButton
          variant="danger"
          size="sm"
          onClick={onRetry}
          data-ocid="error-state-retry"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Retry
        </NeonButton>
      )}
    </div>
  );
}
