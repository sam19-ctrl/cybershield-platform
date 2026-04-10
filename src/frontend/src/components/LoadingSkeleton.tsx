import { cn } from "@/lib/utils";
import type { LoadingSkeletonProps } from "@/types";

function SkeletonLine({
  className,
  style,
}: { className?: string; style?: React.CSSProperties }) {
  return (
    <div
      className={cn("h-4 rounded bg-muted/40 animate-pulse", className)}
      style={style}
    />
  );
}

function CardSkeleton() {
  return (
    <div className="card-depth rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-muted/40 animate-pulse" />
        <div className="flex-1 space-y-2">
          <SkeletonLine className="w-1/2" />
          <SkeletonLine className="w-1/3 h-3" />
        </div>
      </div>
      <SkeletonLine className="w-full h-8" />
      <SkeletonLine className="w-3/4 h-3" />
    </div>
  );
}

function StatSkeleton() {
  return (
    <div className="card-depth rounded-xl p-5 space-y-3">
      <SkeletonLine className="w-1/3 h-3" />
      <SkeletonLine className="w-1/2 h-8" />
      <SkeletonLine className="w-2/3 h-3" />
    </div>
  );
}

function TableSkeleton({ rows }: { rows: number }) {
  const colWidths = [40, 25, 20, 15];
  return (
    <div className="space-y-2">
      <div className="flex gap-4 pb-3 border-b border-border/40">
        {colWidths.map((w) => (
          <SkeletonLine key={w} style={{ width: `${w}%` }} className="h-3" />
        ))}
      </div>
      {Array.from({ length: rows }, (_, i) => `row-${i}`).map((key) => (
        <div key={key} className="flex gap-4 py-2.5 border-b border-border/20">
          <SkeletonLine style={{ width: "40%" }} />
          <SkeletonLine style={{ width: "25%" }} />
          <SkeletonLine style={{ width: "20%" }} />
          <SkeletonLine style={{ width: "15%" }} />
        </div>
      ))}
    </div>
  );
}

function TextSkeleton({ rows }: { rows: number }) {
  const widths = ["100%", "83%", "80%", "67%", "75%"];
  return (
    <div className="space-y-2.5">
      {Array.from({ length: rows }, (_, i) => `text-${i}`).map((key, i) => (
        <SkeletonLine key={key} style={{ width: widths[i % widths.length] }} />
      ))}
    </div>
  );
}

function ListSkeleton({ rows }: { rows: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }, (_, i) => `list-${i}`).map((key) => (
        <div
          key={key}
          className="flex items-center gap-3 p-3 rounded-lg border border-border/20"
        >
          <div className="w-8 h-8 rounded-full bg-muted/40 animate-pulse shrink-0" />
          <div className="flex-1 space-y-1.5">
            <SkeletonLine className="w-2/3" />
            <SkeletonLine className="w-1/3 h-3" />
          </div>
          <SkeletonLine className="w-16 h-5 rounded-full" />
        </div>
      ))}
    </div>
  );
}

export function LoadingSkeleton({
  variant = "card",
  rows = 4,
  className,
}: LoadingSkeletonProps) {
  return (
    <div className={cn("w-full", className)}>
      {variant === "card" && <CardSkeleton />}
      {variant === "stat" && <StatSkeleton />}
      {variant === "table" && <TableSkeleton rows={rows} />}
      {variant === "text" && <TextSkeleton rows={rows} />}
      {variant === "list" && <ListSkeleton rows={rows} />}
    </div>
  );
}

export function LoadingSkeletonGrid({
  count = 3,
  variant = "card",
  className,
}: {
  count?: number;
  variant?: LoadingSkeletonProps["variant"];
  className?: string;
}) {
  return (
    <div className={cn("grid gap-4", className)}>
      {Array.from({ length: count }, (_, i) => `grid-${i}`).map((key) => (
        <LoadingSkeleton key={key} variant={variant} />
      ))}
    </div>
  );
}
