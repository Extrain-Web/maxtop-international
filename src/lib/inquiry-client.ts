"use client";

// Sends website inquiries (contact / RFQ / product requests) to the Express
// API → they show up in Admin → Messages.

export interface InquiryInput {
  source: "contact" | "rfq" | "product";
  name?: string;
  email?: string;
  company?: string;
  country?: string;
  phone?: string;
  category?: string;
  quantity?: string;
  message?: string;
  /** honeypot — real users never fill it */
  website?: string;
}

export async function submitInquiry(input: InquiryInput): Promise<{ ok: boolean; error?: string }> {
  try {
    const res = await fetch("/api/public/inquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      console.warn("Inquiry not saved:", data.error ?? res.status);
      return { ok: false, error: data.error ?? "Request failed" };
    }
    return { ok: true };
  } catch (err) {
    console.error("Inquiry failed", err);
    return { ok: false, error: "Network error" };
  }
}

/** Sends a <form>'s fields (by their `name` attribute) as an inquiry. */
export function sendFormInquiry(
  form: HTMLFormElement,
  extra: Partial<InquiryInput> & { source: InquiryInput["source"] }
) {
  const fd = new FormData(form);
  const get = (k: string) => {
    const v = fd.get(k);
    return typeof v === "string" ? v : undefined;
  };
  const sizing = get("sizing");
  return submitInquiry({
    name: get("name"),
    email: get("email"),
    company: get("company"),
    country: get("country"),
    phone: get("phone"),
    quantity: get("quantity") ?? (sizing ? `Sizing: ${sizing}` : undefined),
    message: get("message"),
    website: get("website"),
    ...extra,
  });
}
