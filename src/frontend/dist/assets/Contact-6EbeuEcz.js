import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, m as motion, M as Mail, S as Shield, N as NeonButton, B as Building2, u as ue } from "./index-p-_K6v2l.js";
import { B as Badge, G as GlassCard } from "./GlassCard-BR9c0p-Q.js";
import { S as SectionHeader } from "./SectionHeader-D-B60MDL.js";
import { u as useListContactSubmissions, a as useSubmitContact } from "./useQueries-DgJaspKQ.js";
import { C as Clock } from "./clock-BEXnusk5.js";
import { C as CircleCheck } from "./circle-check-BfASjlh5.js";
import { C as CircleAlert } from "./circle-alert-34-6wqPd.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
      key: "1r0f0z"
    }
  ],
  ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
];
const MapPin = createLucideIcon("map-pin", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z", key: "1lielz" }]
];
const MessageSquare = createLucideIcon("message-square", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
      key: "9njp5v"
    }
  ]
];
const Phone = createLucideIcon("phone", __iconNode);
const CONTACT_CHANNELS = [
  {
    icon: Mail,
    label: "Sales Inquiries",
    value: "sales@cybershield.io",
    color: "green"
  },
  {
    icon: Phone,
    label: "Support Hotline",
    value: "+1 (888) 555-0198",
    color: "blue"
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "San Francisco, CA 94105",
    color: "green"
  },
  {
    icon: Clock,
    label: "Support Hours",
    value: "24/7 for Enterprise",
    color: "blue"
  }
];
const EMPTY_FORM = {
  name: "",
  email: "",
  company: "",
  message: ""
};
function Contact() {
  const [form, setForm] = reactExports.useState(EMPTY_FORM);
  const [submitted, setSubmitted] = reactExports.useState(false);
  const { data: submissions } = useListContactSubmissions();
  const mutation = useSubmitContact();
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.message) {
      ue.error("Please fill out all fields.");
      return;
    }
    mutation.mutate(form, {
      onSuccess: () => {
        setSubmitted(true);
        setForm(EMPTY_FORM);
        ue.success("Message sent! We'll be in touch within 24 hours.");
      },
      onError: (err) => {
        ue.error(err.message || "Failed to send message. Please try again.");
      }
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "py-20 relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4 text-center space-y-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6 },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "blue", dot: true, children: "Get in Touch" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-extrabold text-4xl md:text-5xl tracking-tight mt-4", children: [
              "Let's Secure Your",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "glow-text-blue", children: "Enterprise Together" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg max-w-xl mx-auto mt-4", children: "Talk to our security experts. We'll understand your environment and craft a tailored protection strategy." })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-24 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container mx-auto px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          SectionHeader,
          {
            eyebrow: "Contact",
            title: "Reach Us",
            titleHighlight: "Directly"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 mt-6", children: CONTACT_CHANNELS.map((ch) => {
          const Icon = ch.icon;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            GlassCard,
            {
              glow: ch.color,
              className: "p-4 flex items-center gap-3",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${ch.color === "green" ? "border-primary/30 bg-primary/10" : "border-secondary/30 bg-secondary/10"}`,
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Icon,
                      {
                        className: `w-4 h-4 ${ch.color === "green" ? "text-primary" : "text-secondary"}`
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-[10px] text-muted-foreground tracking-widest uppercase", children: ch.label }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium truncate", children: ch.value })
                ] })
              ]
            },
            ch.label
          );
        }) }),
        submissions && submissions.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "p-4 mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4 text-primary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-mono text-muted-foreground", children: [
            submissions.length,
            " inquiry",
            submissions.length !== 1 ? "ies" : "",
            " received"
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { elevated: true, className: "p-8", children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95 },
          animate: { opacity: 1, scale: 1 },
          className: "text-center py-12 space-y-5",
          "data-ocid": "contact-success",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center mx-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-8 h-8 text-primary" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-bold text-xl tracking-wide text-foreground", children: "Message Received!" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto", children: "Our security team will review your inquiry and respond within 24 business hours." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              NeonButton,
              {
                variant: "outline",
                size: "md",
                onClick: () => setSubmitted(false),
                "data-ocid": "contact-send-another",
                children: "Send Another Message"
              }
            )
          ]
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "form",
        {
          onSubmit: handleSubmit,
          className: "space-y-5",
          "data-ocid": "contact-form",
          noValidate: true,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MessageSquare, { className: "w-4 h-4 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-sm tracking-widest uppercase text-foreground", children: "Send Us a Message" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "name",
                    className: "font-mono text-xs text-muted-foreground tracking-wider uppercase",
                    children: "Full Name *"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "name",
                    name: "name",
                    type: "text",
                    value: form.name,
                    onChange: handleChange,
                    placeholder: "Jane Smith",
                    required: true,
                    className: "w-full h-10 px-3 rounded-lg bg-muted/20 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all",
                    "data-ocid": "contact-input-name"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "email",
                    className: "font-mono text-xs text-muted-foreground tracking-wider uppercase",
                    children: "Work Email *"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "email",
                    name: "email",
                    type: "email",
                    value: form.email,
                    onChange: handleChange,
                    placeholder: "jane@company.com",
                    required: true,
                    className: "w-full h-10 px-3 rounded-lg bg-muted/20 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all",
                    "data-ocid": "contact-input-email"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "company",
                  className: "font-mono text-xs text-muted-foreground tracking-wider uppercase",
                  children: "Company *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Building2, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    id: "company",
                    name: "company",
                    type: "text",
                    value: form.company,
                    onChange: handleChange,
                    placeholder: "Acme Corporation",
                    required: true,
                    className: "w-full h-10 pl-9 pr-3 rounded-lg bg-muted/20 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all",
                    "data-ocid": "contact-input-company"
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "label",
                {
                  htmlFor: "message",
                  className: "font-mono text-xs text-muted-foreground tracking-wider uppercase",
                  children: "Message *"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "textarea",
                {
                  id: "message",
                  name: "message",
                  value: form.message,
                  onChange: handleChange,
                  placeholder: "Tell us about your security needs, current environment, and challenges...",
                  required: true,
                  rows: 5,
                  className: "w-full px-3 py-2.5 rounded-lg bg-muted/20 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all resize-none",
                  "data-ocid": "contact-input-message"
                }
              )
            ] }),
            mutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-destructive text-xs p-3 rounded-lg border border-destructive/30 bg-destructive/10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Unable to send message. Please check your connection and try again." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              NeonButton,
              {
                type: "submit",
                variant: "primary",
                size: "lg",
                className: "w-full",
                disabled: mutation.isPending,
                "data-ocid": "contact-submit",
                children: [
                  mutation.isPending ? "Sending..." : "Send Message",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-muted-foreground text-center", children: "Your data is encrypted and never shared. Secured by CyberShield infrastructure." })
          ]
        }
      ) }) })
    ] }) }) })
  ] });
}
export {
  Contact as default
};
