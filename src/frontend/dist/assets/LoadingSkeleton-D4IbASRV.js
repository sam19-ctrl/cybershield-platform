import { c as createLucideIcon, j as jsxRuntimeExports, e as cn } from "./index-p-_K6v2l.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
];
const Search = createLucideIcon("search", __iconNode);
function SkeletonLine({
  className,
  style
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: cn("h-4 rounded bg-muted/40 animate-pulse", className),
      style
    }
  );
}
function CardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-depth rounded-xl p-5 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded-lg bg-muted/40 animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLine, { className: "w-1/2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLine, { className: "w-1/3 h-3" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLine, { className: "w-full h-8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLine, { className: "w-3/4 h-3" })
  ] });
}
function StatSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-depth rounded-xl p-5 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLine, { className: "w-1/3 h-3" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLine, { className: "w-1/2 h-8" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLine, { className: "w-2/3 h-3" })
  ] });
}
function TableSkeleton({ rows }) {
  const colWidths = [40, 25, 20, 15];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-4 pb-3 border-b border-border/40", children: colWidths.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLine, { style: { width: `${w}%` }, className: "h-3" }, w)) }),
    Array.from({ length: rows }, (_, i) => `row-${i}`).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 py-2.5 border-b border-border/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLine, { style: { width: "40%" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLine, { style: { width: "25%" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLine, { style: { width: "20%" } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLine, { style: { width: "15%" } })
    ] }, key))
  ] });
}
function TextSkeleton({ rows }) {
  const widths = ["100%", "83%", "80%", "67%", "75%"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: Array.from({ length: rows }, (_, i) => `text-${i}`).map((key, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLine, { style: { width: widths[i % widths.length] } }, key)) });
}
function ListSkeleton({ rows }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: Array.from({ length: rows }, (_, i) => `list-${i}`).map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-center gap-3 p-3 rounded-lg border border-border/20",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-full bg-muted/40 animate-pulse shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLine, { className: "w-2/3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLine, { className: "w-1/3 h-3" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonLine, { className: "w-16 h-5 rounded-full" })
      ]
    },
    key
  )) });
}
function LoadingSkeleton({
  variant = "card",
  rows = 4,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: cn("w-full", className), children: [
    variant === "card" && /* @__PURE__ */ jsxRuntimeExports.jsx(CardSkeleton, {}),
    variant === "stat" && /* @__PURE__ */ jsxRuntimeExports.jsx(StatSkeleton, {}),
    variant === "table" && /* @__PURE__ */ jsxRuntimeExports.jsx(TableSkeleton, { rows }),
    variant === "text" && /* @__PURE__ */ jsxRuntimeExports.jsx(TextSkeleton, { rows }),
    variant === "list" && /* @__PURE__ */ jsxRuntimeExports.jsx(ListSkeleton, { rows })
  ] });
}
export {
  LoadingSkeleton as L,
  Search as S
};
