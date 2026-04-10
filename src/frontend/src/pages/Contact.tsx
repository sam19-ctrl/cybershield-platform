import type { SubmitContactInput } from "@/backend.d";
import { Badge } from "@/components/Badge";
import { GlassCard } from "@/components/GlassCard";
import { NeonButton } from "@/components/NeonButton";
import { SectionHeader } from "@/components/SectionHeader";
import {
  useListContactSubmissions,
  useSubmitContact,
} from "@/hooks/useQueries";
import {
  AlertCircle,
  Building2,
  CheckCircle2,
  Clock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Shield,
} from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

const CONTACT_CHANNELS = [
  {
    icon: Mail,
    label: "Sales Inquiries",
    value: "sales@cybershield.io",
    color: "green" as const,
  },
  {
    icon: Phone,
    label: "Support Hotline",
    value: "+1 (888) 555-0198",
    color: "blue" as const,
  },
  {
    icon: MapPin,
    label: "Headquarters",
    value: "San Francisco, CA 94105",
    color: "green" as const,
  },
  {
    icon: Clock,
    label: "Support Hours",
    value: "24/7 for Enterprise",
    color: "blue" as const,
  },
];

const EMPTY_FORM: SubmitContactInput = {
  name: "",
  email: "",
  company: "",
  message: "",
};

export default function Contact() {
  const [form, setForm] = useState<SubmitContactInput>(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  const { data: submissions } = useListContactSubmissions();
  const mutation = useSubmitContact();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company || !form.message) {
      toast.error("Please fill out all fields.");
      return;
    }
    mutation.mutate(form, {
      onSuccess: () => {
        setSubmitted(true);
        setForm(EMPTY_FORM);
        toast.success("Message sent! We'll be in touch within 24 hours.");
      },
      onError: (err: Error) => {
        toast.error(err.message || "Failed to send message. Please try again.");
      },
    });
  };

  return (
    <div>
      {/* Hero */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/5 to-transparent pointer-events-none" />
        <div className="container mx-auto px-4 text-center space-y-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="blue" dot>
              Get in Touch
            </Badge>
            <h1 className="font-display font-extrabold text-4xl md:text-5xl tracking-tight mt-4">
              Let's Secure Your
              <br />
              <span className="glow-text-blue">Enterprise Together</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto mt-4">
              Talk to our security experts. We'll understand your environment
              and craft a tailored protection strategy.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="pb-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Contact channels sidebar */}
            <div className="space-y-4">
              <SectionHeader
                eyebrow="Contact"
                title="Reach Us"
                titleHighlight="Directly"
              />
              <div className="space-y-3 mt-6">
                {CONTACT_CHANNELS.map((ch) => {
                  const Icon = ch.icon;
                  return (
                    <GlassCard
                      key={ch.label}
                      glow={ch.color}
                      className="p-4 flex items-center gap-3"
                    >
                      <div
                        className={`w-9 h-9 rounded-lg border flex items-center justify-center flex-shrink-0 ${
                          ch.color === "green"
                            ? "border-primary/30 bg-primary/10"
                            : "border-secondary/30 bg-secondary/10"
                        }`}
                      >
                        <Icon
                          className={`w-4 h-4 ${ch.color === "green" ? "text-primary" : "text-secondary"}`}
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="font-mono text-[10px] text-muted-foreground tracking-widest uppercase">
                          {ch.label}
                        </p>
                        <p className="text-sm text-foreground font-medium truncate">
                          {ch.value}
                        </p>
                      </div>
                    </GlassCard>
                  );
                })}
              </div>

              {/* Submission count */}
              {submissions && submissions.length > 0 && (
                <GlassCard className="p-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-primary" />
                    <span className="text-xs font-mono text-muted-foreground">
                      {submissions.length} inquiry
                      {submissions.length !== 1 ? "ies" : ""} received
                    </span>
                  </div>
                </GlassCard>
              )}
            </div>

            {/* Contact form */}
            <div className="lg:col-span-2">
              <GlassCard elevated className="p-8">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 space-y-5"
                    data-ocid="contact-success"
                  >
                    <div className="w-16 h-16 rounded-full border border-primary/40 bg-primary/10 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-display font-bold text-xl tracking-wide text-foreground">
                      Message Received!
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed max-w-sm mx-auto">
                      Our security team will review your inquiry and respond
                      within 24 business hours.
                    </p>
                    <NeonButton
                      variant="outline"
                      size="md"
                      onClick={() => setSubmitted(false)}
                      data-ocid="contact-send-another"
                    >
                      Send Another Message
                    </NeonButton>
                  </motion.div>
                ) : (
                  <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    data-ocid="contact-form"
                    noValidate
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <MessageSquare className="w-4 h-4 text-primary" />
                      <h2 className="font-display font-bold text-sm tracking-widest uppercase text-foreground">
                        Send Us a Message
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label
                          htmlFor="name"
                          className="font-mono text-xs text-muted-foreground tracking-wider uppercase"
                        >
                          Full Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Jane Smith"
                          required
                          className="w-full h-10 px-3 rounded-lg bg-muted/20 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                          data-ocid="contact-input-name"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label
                          htmlFor="email"
                          className="font-mono text-xs text-muted-foreground tracking-wider uppercase"
                        >
                          Work Email *
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="jane@company.com"
                          required
                          className="w-full h-10 px-3 rounded-lg bg-muted/20 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                          data-ocid="contact-input-email"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="company"
                        className="font-mono text-xs text-muted-foreground tracking-wider uppercase"
                      >
                        Company *
                      </label>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                        <input
                          id="company"
                          name="company"
                          type="text"
                          value={form.company}
                          onChange={handleChange}
                          placeholder="Acme Corporation"
                          required
                          className="w-full h-10 pl-9 pr-3 rounded-lg bg-muted/20 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all"
                          data-ocid="contact-input-company"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label
                        htmlFor="message"
                        className="font-mono text-xs text-muted-foreground tracking-wider uppercase"
                      >
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your security needs, current environment, and challenges..."
                        required
                        rows={5}
                        className="w-full px-3 py-2.5 rounded-lg bg-muted/20 border border-border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/30 transition-all resize-none"
                        data-ocid="contact-input-message"
                      />
                    </div>

                    {mutation.isError && (
                      <div className="flex items-center gap-2 text-destructive text-xs p-3 rounded-lg border border-destructive/30 bg-destructive/10">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>
                          Unable to send message. Please check your connection
                          and try again.
                        </span>
                      </div>
                    )}

                    <NeonButton
                      type="submit"
                      variant="primary"
                      size="lg"
                      className="w-full"
                      disabled={mutation.isPending}
                      data-ocid="contact-submit"
                    >
                      {mutation.isPending ? "Sending..." : "Send Message"}
                      <Shield className="w-4 h-4" />
                    </NeonButton>

                    <p className="text-[11px] text-muted-foreground text-center">
                      Your data is encrypted and never shared. Secured by
                      CyberShield infrastructure.
                    </p>
                  </form>
                )}
              </GlassCard>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
