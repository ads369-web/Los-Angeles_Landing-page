declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-1695WNK4CX";

export const GOOGLE_ADS_ID =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-853490942";

export const GOOGLE_ADS_LABEL =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_LABEL || "9QrACOzDsvocEP75_JYD";

export const CONVERSION_LABELS = {
  form_submit: GOOGLE_ADS_LABEL,
  phone_click: "",
  sms_click: "",
};

function gtagFire(...args: unknown[]) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag(...args);
  }
}

/** GA4 generate_lead + Google Ads conversion (call after booking POST succeeds) */
export function trackFormSubmit(params?: {
  language?: string;
  practitionerPreference?: string;
}) {
  gtagFire("event", "generate_lead", {
    language: params?.language || "English",
    practitioner_preference: params?.practitionerPreference || "No preference",
  });
  if (GOOGLE_ADS_ID && GOOGLE_ADS_LABEL) {
    gtagFire("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${GOOGLE_ADS_LABEL}`,
    });
  }
}

/** GA4 click_phone tracking */
export function trackPhoneClick(location?: unknown) {
  const loc = typeof location === "string" ? location : "contact_link";
  gtagFire("event", "click_phone", {
    phone_number: "+16268615069",
    location: loc,
  });
  if (CONVERSION_LABELS.phone_click && GOOGLE_ADS_ID) {
    gtagFire("event", "conversion", {
      send_to: `${GOOGLE_ADS_ID}/${CONVERSION_LABELS.phone_click}`,
    });
  }
}

/** GA4 click_email tracking */
export function trackEmailClick(location?: unknown) {
  const loc = typeof location === "string" ? location : "contact_link";
  gtagFire("event", "click_email", {
    email: "losangeles@worlddivinelight.org",
    location: loc,
  });
}

/** GA4 click SMS link helper */
export function trackSmsClick() {
  gtagFire("event", "click_sms", {
    phone_number: "+16268615069",
  });
}
