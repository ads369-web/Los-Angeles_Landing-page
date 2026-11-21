"use client";

import React, { useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import type { Language, LocalizedContent } from "@/data/lpCopy";
import { BookingFormSchema } from "@/lib/bookingSchema";

interface BookingFormProps {
  lang: Language;
  copy: LocalizedContent["booking"]["form"];
}

let cachedTodayIso = "";
function getTodaySnapshot(): string {
  if (typeof window === "undefined") return "";
  if (!cachedTodayIso) {
    cachedTodayIso = new Date().toISOString().split("T")[0];
  }
  return cachedTodayIso;
}
function getTodayServerSnapshot(): string {
  return "";
}
function noopSubscribe(): () => void {
  return () => {};
}

const DEFAULT_BOOKING_STATE = {
  fullName: "",
  email: "",
  phone: "",
  preferredDate: "",
  preferredTime: "",
  preferredLanguage: "English" as "English" | "Japanese" | "Chinese" | "Spanish",
  practitionerPreference: "No preference" as "No preference" | "Female practitioner" | "Male practitioner",
  notes: "",
  smsConsent: false,
};

function mapUiLangToFormLang(lang: Language): "English" | "Japanese" | "Chinese" | "Spanish" {
  switch (lang) {
    case "ja":
      return "Japanese";
    case "zh":
      return "Chinese";
    case "es":
      return "Spanish";
    default:
      return "English";
  }
}

export default function BookingForm({ lang, copy }: BookingFormProps) {
  const todayIso = useSyncExternalStore(noopSubscribe, getTodaySnapshot, getTodayServerSnapshot);
  const [formValues, setFormValues] = useState(DEFAULT_BOOKING_STATE);
  const [languageTouched, setLanguageTouched] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  const effectivePreferredLanguage = languageTouched
    ? formValues.preferredLanguage
    : mapUiLangToFormLang(lang);

  const effectivePreferredTime = formValues.preferredTime || copy.timeOptions[0];

  const handleBookingSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFieldErrors({});
    setSubmitMessage("");

    const payload = {
      ...formValues,
      preferredLanguage: effectivePreferredLanguage,
      preferredTime: effectivePreferredTime,
    };

    const parsed = BookingFormSchema.safeParse(payload);
    if (!parsed.success) {
      setFieldErrors(parsed.error.flatten().fieldErrors);
      setSubmitStatus("error");
      setSubmitMessage(copy.validationNotice);
      return;
    }

    setSubmitStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!res.ok) {
        const errData = (await res.json().catch(() => null)) as {
          fieldErrors?: Record<string, string[]>;
        } | null;
        if (errData?.fieldErrors) {
          setFieldErrors(errData.fieldErrors);
        }
        setSubmitStatus("error");
        setSubmitMessage(copy.errorFallback);
        return;
      }

      if (typeof window !== "undefined") {
        const gtagFn = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
        if (typeof gtagFn === "function") {
          gtagFn("event", "conversion", {
            send_to: "AW-853490942/rYqNCMjM_vYZEN7b_5YD",
          });
        }
      }

      setSubmitStatus("success");
      setSubmitMessage(copy.successBody);
      setFormValues(DEFAULT_BOOKING_STATE);
      setLanguageTouched(false);
    } catch {
      setSubmitStatus("error");
      setSubmitMessage(copy.errorFallback);
    }
  };

  if (submitStatus === "success") {
    return (
      <div className="rounded-3xl bg-white border border-[#5B8266]/40 p-8 sm:p-10 text-center shadow-retro space-y-4">
        <div className="w-12 h-12 rounded-full bg-[#EBF2ED] text-[#5B8266] flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6" aria-hidden="true" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-[#1A1816]">{copy.successTitle}</h3>
        <p className="text-sm text-[#5C554F] max-w-lg mx-auto leading-relaxed">{submitMessage || copy.successBody}</p>
        <button
          type="button"
          onClick={() => setSubmitStatus("idle")}
          className="inline-flex items-center justify-center rounded-full border border-[#E5E0D8] px-5 py-2.5 text-xs font-semibold text-[#1A1816] hover:bg-[#FAF6F0] cursor-pointer"
        >
          {copy.successReset}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleBookingSubmit}
      noValidate
      className="rounded-3xl bg-white border border-[#E5E0D8] p-6 sm:p-10 shadow-retro space-y-6"
    >
      {submitStatus === "error" && submitMessage && (
        <div
          role="alert"
          className="rounded-2xl bg-[#FEF2F2] border border-[#FECACA] p-4 text-xs sm:text-sm text-[#991B1B]"
        >
          {submitMessage}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold text-[#1A1816] mb-1.5">
            {copy.fullName} *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            minLength={2}
            value={formValues.fullName}
            onChange={(e) => setFormValues((s) => ({ ...s, fullName: e.target.value }))}
            placeholder={copy.fullNamePlaceholder}
            aria-invalid={Boolean(fieldErrors.fullName)}
            aria-describedby={fieldErrors.fullName ? "fullName-error" : undefined}
            className={`booking-field-control w-full rounded-xl border border-[#D8D0C4] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#1A1816] ${
              fieldErrors.fullName ? "user-invalid-fallback" : ""
            }`}
          />
          {fieldErrors.fullName && (
            <p id="fullName-error" className="text-xs text-[#B91C1C] mt-1">
              {fieldErrors.fullName[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-[#1A1816] mb-1.5">
            {copy.email} *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={formValues.email}
            onChange={(e) => setFormValues((s) => ({ ...s, email: e.target.value }))}
            placeholder={copy.emailPlaceholder}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className={`booking-field-control w-full rounded-xl border border-[#D8D0C4] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#1A1816] ${
              fieldErrors.email ? "user-invalid-fallback" : ""
            }`}
          />
          {fieldErrors.email && (
            <p id="email-error" className="text-xs text-[#B91C1C] mt-1">
              {fieldErrors.email[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-xs font-semibold text-[#1A1816] mb-1.5">
            {copy.phone} *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={formValues.phone}
            onChange={(e) => setFormValues((s) => ({ ...s, phone: e.target.value }))}
            placeholder={copy.phonePlaceholder}
            aria-invalid={Boolean(fieldErrors.phone)}
            aria-describedby={fieldErrors.phone ? "phone-error" : undefined}
            className={`booking-field-control w-full rounded-xl border border-[#D8D0C4] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#1A1816] ${
              fieldErrors.phone ? "user-invalid-fallback" : ""
            }`}
          />
          {fieldErrors.phone && (
            <p id="phone-error" className="text-xs text-[#B91C1C] mt-1">
              {fieldErrors.phone[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="preferredDate" className="block text-xs font-semibold text-[#1A1816] mb-1.5">
            {copy.preferredDate} *
          </label>
          <input
            id="preferredDate"
            name="preferredDate"
            type="date"
            required
            min={todayIso || undefined}
            value={formValues.preferredDate}
            onChange={(e) => setFormValues((s) => ({ ...s, preferredDate: e.target.value }))}
            aria-invalid={Boolean(fieldErrors.preferredDate)}
            aria-describedby={fieldErrors.preferredDate ? "preferredDate-error" : undefined}
            className={`booking-field-control w-full rounded-xl border border-[#D8D0C4] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#1A1816] ${
              fieldErrors.preferredDate ? "user-invalid-fallback" : ""
            }`}
          />
          {fieldErrors.preferredDate && (
            <p id="preferredDate-error" className="text-xs text-[#B91C1C] mt-1">
              {fieldErrors.preferredDate[0]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="preferredTime" className="block text-xs font-semibold text-[#1A1816] mb-1.5">
            {copy.preferredTime} *
          </label>
          <select
            id="preferredTime"
            name="preferredTime"
            value={effectivePreferredTime}
            onChange={(e) => setFormValues((s) => ({ ...s, preferredTime: e.target.value }))}
            className="booking-field-control w-full rounded-xl border border-[#D8D0C4] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#1A1816]"
          >
            {copy.timeOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="preferredLanguage" className="block text-xs font-semibold text-[#1A1816] mb-1.5">
            {copy.preferredLanguage} *
          </label>
          <select
            id="preferredLanguage"
            name="preferredLanguage"
            value={effectivePreferredLanguage}
            onChange={(e) => {
              setLanguageTouched(true);
              setFormValues((s) => ({
                ...s,
                preferredLanguage: e.target.value as "English" | "Japanese" | "Chinese" | "Spanish",
              }));
            }}
            className="booking-field-control w-full rounded-xl border border-[#D8D0C4] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#1A1816]"
          >
            {copy.languageOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <p className="text-[11px] text-[#6C655E] mt-1">{copy.languageHint}</p>
        </div>
      </div>

      <fieldset className="space-y-2">
        <legend className="text-xs font-semibold text-[#1A1816]">{copy.practitionerPreference}</legend>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {copy.practitionerOptions.map((opt) => {
            const checked = formValues.practitionerPreference === opt.value;
            return (
              <label
                key={opt.value}
                className={`flex items-center gap-2.5 rounded-xl border px-3.5 py-2.5 text-xs sm:text-sm cursor-pointer transition-colors ${
                  checked
                    ? "border-[#DE7356] bg-[#FDE8DF]/40 text-[#1A1816] font-semibold"
                    : "border-[#D8D0C4] bg-[#FBF9F5] text-[#5C554F] hover:bg-white"
                }`}
              >
                <input
                  type="radio"
                  name="practitionerPreference"
                  value={opt.value}
                  checked={checked}
                  onChange={() =>
                    setFormValues((s) => ({
                      ...s,
                      practitionerPreference: opt.value,
                    }))
                  }
                  className="accent-[#DE7356]"
                />
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="notes" className="block text-xs font-semibold text-[#1A1816] mb-1.5">
          {copy.notes}
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={3}
          value={formValues.notes}
          onChange={(e) => setFormValues((s) => ({ ...s, notes: e.target.value }))}
          placeholder={copy.notesPlaceholder}
          className="booking-field-control w-full rounded-xl border border-[#D8D0C4] bg-[#FBF9F5] px-4 py-2.5 text-sm text-[#1A1816]"
        />
      </div>

      <div>
        <label className="flex items-start gap-3 text-xs text-[#5C554F] leading-relaxed cursor-pointer">
          <input
            type="checkbox"
            name="smsConsent"
            checked={formValues.smsConsent}
            onChange={(e) => setFormValues((s) => ({ ...s, smsConsent: e.target.checked }))}
            aria-invalid={Boolean(fieldErrors.smsConsent)}
            className="mt-0.5 w-4 h-4 accent-[#DE7356] shrink-0"
          />
          <span>
            {copy.smsConsentPrefix}
            <Link href="/privacy" className="underline text-[#9A5B25] hover:text-[#1A1816]">
              {copy.smsConsentPrivacyLink}
            </Link>
            {copy.smsConsentSuffix}
          </span>
        </label>
        {fieldErrors.smsConsent && (
          <p className="text-xs text-[#B91C1C] mt-1">{fieldErrors.smsConsent[0]}</p>
        )}
      </div>

      <div className="pt-2 space-y-3">
        <button
          type="submit"
          disabled={submitStatus === "submitting"}
          className="w-full py-4 px-6 rounded-full bg-[#DE7356] hover:bg-[#C86348] text-white font-semibold text-sm sm:text-base shadow-retro-btn transition-colors cursor-pointer"
        >
          {submitStatus === "submitting" ? copy.submitting : copy.submit}
        </button>
        <p className="text-[11px] text-[#6C655E] leading-relaxed flex items-start gap-2">
          <ShieldCheck className="w-4 h-4 shrink-0 text-[#5B8266] mt-0.5" aria-hidden="true" />
          <span>{copy.medicalNotice}</span>
        </p>
      </div>
    </form>
  );
}
