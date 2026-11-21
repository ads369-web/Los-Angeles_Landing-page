import { z } from "zod";

export const PREFERRED_LANGUAGES = ["English", "Japanese", "Chinese", "Spanish"] as const;
export const PRACTITIONER_PREFERENCES = [
  "No preference",
  "Female practitioner",
  "Male practitioner",
] as const;

export const BookingFormSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name (at least 2 characters)."),
  email: z.string().trim().email("Enter an email address in the format you@example.com."),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s\-().]{10,}$/, "Please enter a valid 10-digit US phone number."),
  preferredDate: z.string().min(1, "Please select a preferred date."),
  preferredTime: z.string().min(1, "Please select a preferred time window."),
  preferredLanguage: z.enum(PREFERRED_LANGUAGES),
  practitionerPreference: z.enum(PRACTITIONER_PREFERENCES),
  notes: z.string().max(1500).optional(),
  smsConsent: z.boolean().refine((val) => val === true, {
    message: "Please check the SMS consent box so we can send your confirmation.",
  }),
});

export type BookingFormValues = z.infer<typeof BookingFormSchema>;
