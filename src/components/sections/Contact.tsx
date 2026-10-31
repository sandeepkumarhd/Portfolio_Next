"use client";

import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Copy, Download, Mail, Send } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { site, socialLinks } from "@/config/site";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Magnetic } from "@/components/effects/Magnetic";
import { Reveal } from "@/components/effects/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const socialIcon = { github: GithubIcon, linkedin: LinkedinIcon, email: Mail } as const;

type FormState = { name: string; email: string; message: string };
const emptyForm: FormState = { name: "", email: "", message: "" };
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const inputClass =
  "peer w-full rounded-2xl border border-line bg-surface-2/60 px-4 pt-6 pb-2.5 text-sm text-fg outline-none transition-colors placeholder:text-transparent focus:border-accent focus:bg-surface-2 aria-[invalid=true]:border-red-400/70";

export function Contact() {
  const reduce = useReducedMotion();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState<"idle" | "opened">("idle");
  const [copied, setCopied] = useState(false);

  function update(field: keyof FormState, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate(): Partial<FormState> {
    const next: Partial<FormState> = {};
    if (form.name.trim().length < 2) next.name = "Please enter your name.";
    if (!emailPattern.test(form.email.trim())) next.email = "Please enter a valid email.";
    if (form.message.trim().length < 10) next.message = "A few more words would help (10+ characters).";
    return next;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    // No backend: hand the message to the visitor's mail app, prefilled.
    const subject = encodeURIComponent(`Project enquiry from ${form.name.trim()}`);
    const body = encodeURIComponent(
      `${form.message.trim()}\n\n— ${form.name.trim()} (${form.email.trim()})`,
    );
    window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
    setStatus("opened");
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* Clipboard may be unavailable; the email is still visible as a link. */
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative mx-auto max-w-6xl scroll-mt-24 px-5 pt-16 pb-14 sm:px-6 sm:pt-28 sm:pb-20 lg:pt-36">
      <div className="relative overflow-hidden rounded-[32px] border border-line bg-surface p-5 sm:p-12 lg:p-16">
        <div
          aria-hidden="true"
          className="animate-blob pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-accent/20 blur-[100px]"
        />
        <div aria-hidden="true" className="grid-bg pointer-events-none absolute inset-0 opacity-50" />

        <div className="relative grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <div>
            <SectionHeading
              id="contact-title"
              eyebrow="Contact"
              title="Have an Interesting Project in Mind?"
              description="Tell me about the product, the team and the timeline. I reply to every serious enquiry, usually within a day or two."
            />

            <Reveal delay={0.2}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <Magnetic>
                  <a
                    href={`mailto:${site.email}`}
                    data-cursor="hover"
                    className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3.5 text-sm font-medium text-bg transition-colors hover:bg-accent hover:text-white"
                  >
                    <Mail size={16} aria-hidden="true" />
                    {site.email}
                  </a>
                </Magnetic>
                <button
                  type="button"
                  onClick={copyEmail}
                  data-cursor="hover"
                  aria-label="Copy email address"
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-line-strong text-muted transition-colors hover:text-fg"
                >
                  {copied ? <Check size={16} className="text-[#5ee7c7]" aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                </button>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <ul className="mt-10 grid gap-3 sm:grid-cols-2">
                {socialLinks
                  .filter((l) => l.id !== "email")
                  .map((link) => {
                    const Icon = socialIcon[link.id];
                    return (
                      <li key={link.id}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-cursor="hover"
                          className="group flex items-center justify-between rounded-2xl border border-line bg-bg/40 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50"
                        >
                          <span className="flex items-center gap-3 text-sm text-fg">
                            <Icon size={18} />
                            {link.label}
                          </span>
                          <ArrowUpRight size={16} aria-hidden="true" className="text-subtle transition-all group-hover:text-fg" />
                        </a>
                      </li>
                    );
                  })}
                <li>
                  <a
                    href={site.resumePath}
                    download="Sandeep-Kumar-Resume.pdf"
                    data-cursor="hover"
                    className="group flex items-center justify-between rounded-2xl border border-line bg-bg/40 px-5 py-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/50"
                  >
                    <span className="flex items-center gap-3 text-sm text-fg">
                      <Download size={18} aria-hidden="true" />
                      Download Resume
                    </span>
                    <ArrowUpRight size={16} aria-hidden="true" className="text-subtle transition-all group-hover:text-fg" />
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            {status === "opened" ? (
              <motion.div
                role="status"
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex h-full min-h-[300px] sm:min-h-[360px] flex-col items-start justify-center rounded-3xl border border-line bg-bg/50 p-8"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent-soft text-accent">
                  <Check size={22} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-tight text-fg">Your mail app should be open.</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Your message is pre-filled. If nothing opened, email{" "}
                  <a href={`mailto:${site.email}`} className="text-fg underline underline-offset-4">
                    {site.email}
                  </a>{" "}
                  directly.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(emptyForm);
                    setStatus("idle");
                  }}
                  className="mt-8 text-sm text-muted underline underline-offset-4 hover:text-fg"
                >
                  Write another message
                </button>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                aria-label="Contact form"
                className="space-y-4 rounded-3xl border border-line bg-bg/50 p-5 sm:p-8"
              >
                <Field
                  id="name"
                  label="Your name"
                  value={form.name}
                  error={errors.name}
                  autoComplete="name"
                  onChange={(v) => update("name", v)}
                />
                <Field
                  id="email"
                  label="Email address"
                  type="email"
                  value={form.email}
                  error={errors.email}
                  autoComplete="email"
                  onChange={(v) => update("email", v)}
                />
                <Field
                  id="message"
                  label="Project details"
                  textarea
                  value={form.message}
                  error={errors.message}
                  onChange={(v) => update("message", v)}
                />

                <div className="pt-2">
                  <Magnetic>
                    <button
                      type="submit"
                      data-cursor="hover"
                      className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-sm font-medium text-white shadow-[0_12px_40px_-14px_rgb(var(--accent-rgb)/0.8)] transition-transform duration-300 hover:-translate-y-0.5"
                    >
                      Send message
                      <Send size={16} aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
                    </button>
                  </Magnetic>
                </div>
                <p className="text-xs text-subtle">Sends through your own mail app. Nothing is stored on this site.</p>
              </form>
            )}
          </Reveal>
        </div>
      </div>

    </section>
  );
}

function Field({
  id,
  label,
  value,
  error,
  onChange,
  type = "text",
  textarea = false,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  error?: string;
  onChange: (v: string) => void;
  type?: string;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const shared = {
    id,
    name: id,
    value,
    placeholder: label,
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? `${id}-error` : undefined,
    autoComplete,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    className: `${inputClass} ${textarea ? "min-h-[150px] resize-y" : ""}`,
  };

  return (
    <div className="relative">
      {/* The label follows the input so the peer-* selectors can reach it. */}
      {textarea ? (
        <textarea {...shared} rows={5} />
      ) : (
        <input {...shared} type={type} />
      )}
      <label htmlFor={id} className="pointer-events-none absolute left-4 top-4 z-10 origin-left text-sm text-muted transition-all duration-200 peer-focus:-translate-y-2.5 peer-focus:scale-[0.8] peer-focus:text-accent peer-[:not(:placeholder-shown)]:-translate-y-2.5 peer-[:not(:placeholder-shown)]:scale-[0.8]">
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}
