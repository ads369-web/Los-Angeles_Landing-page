import { NextResponse } from "next/server";
import { Resend } from "resend";
import { BookingFormSchema } from "@/lib/bookingSchema";

function escapeHtml(raw: string): string {
  return raw
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = BookingFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Missing or invalid required fields",
          fieldErrors: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const {
      fullName,
      email,
      phone,
      preferredDate,
      preferredTime,
      preferredLanguage,
      practitionerPreference,
      notes,
      smsConsent,
    } = parsed.data;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 503 }
      );
    }

    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: "LA Spiritual Center <noreply@la.worlddivinelight.org>",
      to: "losangeles@worlddivinelight.org",
      replyTo: email,
      subject: `New Reservation Request from ${fullName} (${preferredLanguage})`,
      html: `
        <h2>New Session Reservation Request</h2>
        <p><strong>Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone / SMS:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Preferred Date:</strong> ${escapeHtml(preferredDate)}</p>
        <p><strong>Preferred Time:</strong> ${escapeHtml(preferredTime)}</p>
        <p><strong>Preferred Language:</strong> ${escapeHtml(preferredLanguage)}</p>
        <p><strong>Practitioner Preference:</strong> ${escapeHtml(practitionerPreference)}</p>
        <p><strong>SMS & Schedule Consent:</strong> ${smsConsent ? "Consented (TCPA unchecked-default)" : "No"}</p>
        <p><strong>Notes / Questions:</strong></p>
        <p>${notes ? escapeHtml(notes).replace(/\n/g, "<br>") : "(None)"}</p>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }
}
