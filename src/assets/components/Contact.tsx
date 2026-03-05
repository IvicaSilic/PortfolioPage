"use client";

import { useState } from "react";
import { UserIcon, EnvelopeIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
import type { ElementType } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

// ─── API ──────────────────────────────────────────────────────────────────────

async function sendMessage(data: ContactFormData): Promise<void> {
  const res = await fetch("/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to send message");
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

const EMPTY_FORM: ContactFormData = { name: "", email: "", message: "" };

function useContactForm() {
  const [fields, setFields] = useState<ContactFormData>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await sendMessage(fields);
      toast.success("Message sent!");
      setFields(EMPTY_FORM);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return { fields, loading, handleChange, handleSubmit };
}

// ─── FormField ────────────────────────────────────────────────────────────────

interface FormFieldProps {
  id: string;
  label: string;
  icon: ElementType;
  children: React.ReactNode;
}

function FormField({ id, label, icon: Icon, children }: FormFieldProps) {
  return (
    <div className="relative group">
      <label htmlFor={id} className="sr-only">{label}</label>
      <Icon className="w-4 h-4 text-neutral-400 group-focus-within:text-neutral-600 transition-colors absolute left-3.5 top-3.5 pointer-events-none" />
      {children}
    </div>
  );
}

// ─── Constants ────────────────────────────────────────────────────────────────

const INPUT_CLASS =
  "w-full rounded-lg border border-neutral-200 bg-neutral-50 pl-10 pr-4 py-3 text-sm text-neutral-800 placeholder:text-neutral-400 outline-none transition-all focus:border-neutral-400 focus:bg-white focus:ring-2 focus:ring-neutral-100";

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Contact() {
  const { fields, loading, handleChange, handleSubmit } = useContactForm();

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-white px-4 sm:px-6 py-16 pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">

      <div className="w-full max-w-4xl flex flex-col md:flex-row gap-12 items-start">

        {/* ── Left — Form ── */}
        <div className="w-full md:w-3/5">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Contact
            </h1>
            <p className="mt-1.5 text-sm text-neutral-500">
              Fill out the form and I'll get back to you shortly.
            </p>
          </div>

          <div
            className="rounded-xl border border-neutral-200 bg-white p-7"
            style={{ boxShadow: "0 1px 16px 0 rgba(0,0,0,0.06)" }}
          >
            <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">

              <FormField id="name" label="Name" icon={UserIcon}>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  minLength={2}
                  placeholder="Your name"
                  value={fields.name}
                  onChange={handleChange}
                  className={INPUT_CLASS}
                  autoComplete="name"
                />
              </FormField>

              <FormField id="email" label="Email" icon={EnvelopeIcon}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  inputMode="email"
                  required
                  placeholder="your@email.com"
                  value={fields.email}
                  onChange={handleChange}
                  className={INPUT_CLASS}
                  autoComplete="email"
                />
              </FormField>

              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  minLength={10}
                  placeholder="Your message..."
                  value={fields.message}
                  onChange={handleChange}
                  className={`${INPUT_CLASS} pl-4 resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-1 flex items-center justify-center gap-2 rounded-lg bg-neutral-900 text-white text-sm font-medium py-3 px-6 hover:bg-neutral-800 active:scale-[0.99] transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white/70" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    Send message
                    <PaperAirplaneIcon className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          </div>

          <p className="mt-5 text-xs text-neutral-400">
            I typically respond within 24 hours.
          </p>
        </div>

        <div className="w-full md:w-2/5 flex flex-col gap-6 md:pt-16">
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-neutral-400">
            Other Contacts
          </p>
          <div className="flex flex-col gap-3">

            <a
              href="mailto:silic.ivica01@gmail.com"
              className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 hover:border-neutral-400 transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <EnvelopeIcon className="w-4 h-4 text-neutral-600" />
              </div>
              <div>
                <p className="text-xs text-neutral-400">Email</p>
                <p className="text-sm font-medium text-neutral-800">silic.ivica01@gmail.com</p>
              </div>
            </a>

            {/* Phone */}
            <a
              href="tel:+385953356999"
              className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 hover:border-neutral-400 transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <svg className="w-4 h-4 text-neutral-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-neutral-400">Phone</p>
                <p className="text-sm font-medium text-neutral-800">095 335 6999</p>
              </div>
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/385953356999"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 p-4 rounded-xl border border-neutral-200 hover:border-neutral-400 transition-colors group"
            >
              <div className="w-9 h-9 rounded-lg bg-neutral-100 flex items-center justify-center group-hover:bg-neutral-200 transition-colors">
                <svg className="w-4 h-4 text-neutral-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                </svg>
              </div>
              <div>
                <p className="text-xs text-neutral-400">WhatsApp</p>
                <p className="text-sm font-medium text-neutral-800">095 335 6999</p>
              </div>
            </a>

          </div>
        </div>

      </div>
    </div>
  );
}