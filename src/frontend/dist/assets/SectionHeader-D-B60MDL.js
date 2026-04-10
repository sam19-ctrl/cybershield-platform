import { j as jsxRuntimeExports, e as cn } from "./index-p-_K6v2l.js";
import { B as Badge } from "./GlassCard-BR9c0p-Q.js";
function SectionHeader({
  eyebrow,
  title,
  titleHighlight,
  subtitle,
  centered = false,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("space-y-4", centered && "text-center", className), children: [
    eyebrow && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex", centered && "justify-center"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "neon", dot: true, children: eyebrow }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "h2",
      {
        className: cn(
          "font-display font-bold tracking-tight leading-tight",
          "text-3xl md:text-4xl lg:text-5xl text-foreground"
        ),
        children: titleHighlight ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          title,
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "glow-text", children: titleHighlight })
        ] }) : title
      }
    ),
    subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: cn(
          "text-muted-foreground text-base md:text-lg leading-relaxed max-w-2xl",
          centered && "mx-auto"
        ),
        children: subtitle
      }
    )
  ] });
}
export {
  SectionHeader as S
};
