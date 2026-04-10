import { cn } from "@/lib/utils";
import { Badge } from "./Badge";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  centered = false,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("space-y-4", centered && "text-center", className)}>
      {eyebrow && (
        <div className={cn("flex", centered && "justify-center")}>
          <Badge variant="neon" dot>
            {eyebrow}
          </Badge>
        </div>
      )}
      <h2
        className={cn(
          "font-display font-bold tracking-tight leading-tight",
          "text-3xl md:text-4xl lg:text-5xl text-foreground",
        )}
      >
        {titleHighlight ? (
          <>
            {title} <span className="glow-text">{titleHighlight}</span>
          </>
        ) : (
          title
        )}
      </h2>
      {subtitle && (
        <p
          className={cn(
            "text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl",
            centered && "mx-auto",
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
