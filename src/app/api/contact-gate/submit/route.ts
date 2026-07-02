import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

const FILLOUT_API_BASE = "https://api.fillout.com/v1/api";
const DEFAULT_CONTACT_FORM_ID = "spuiwXCGzgus";
const DEFAULT_QUESTION_NAME_ID = "jgn2";
const DEFAULT_QUESTION_PHONE_ID = "tvpe";
const DEFAULT_QUESTION_EMAIL_ID = "qeYp";
const DEFAULT_QUESTION_MESSAGE_ID = "254v";

interface SubmissionRequest {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  message?: unknown;
  source?: unknown;
  pageUrl?: unknown;
}

function asTrimmedString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function isValidName(name: string): boolean {
  return /^[\p{L}\p{M}\s.'-]{2,100}$/u.test(name);
}

function isValidPhone(phone: string): boolean {
  return /^[0-9+\-\s()]{9,15}$/.test(phone);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

interface ValidatedPayload {
  name: string;
  phone: string;
  email: string;
  message: string;
  source: string;
  pageUrl: string;
}

function validate(body: SubmissionRequest): { ok: true; data: ValidatedPayload } | { ok: false; error: string } {
  const name = asTrimmedString(body.name);
  const phone = asTrimmedString(body.phone);
  const email = asTrimmedString(body.email);
  const message = asTrimmedString(body.message) ?? "";

  if (!name) return { ok: false, error: "Name is required" };
  if (!isValidName(name)) return { ok: false, error: "Name is invalid" };

  if (!phone) return { ok: false, error: "Phone is required" };
  if (!isValidPhone(phone)) return { ok: false, error: "Phone is invalid" };

  if (!email) return { ok: false, error: "Email is required" };
  if (!isValidEmail(email)) return { ok: false, error: "Email is invalid" };

  return {
    ok: true,
    data: {
      name,
      phone,
      email,
      message,
      source: asTrimmedString(body.source) ?? "summer26-contact-gate",
      pageUrl: asTrimmedString(body.pageUrl) ?? "",
    },
  };
}

interface FilloutQuestion {
  id: string;
  value: unknown;
}

interface FilloutUrlParameter {
  id: string;
  name: string;
  value: string;
}

interface FilloutSubmission {
  questions: FilloutQuestion[];
  urlParameters: FilloutUrlParameter[];
  submissionTime: string;
}

export async function POST(request: NextRequest) {
  const apiKey = process.env.FILLOUT_API_KEY;
  const formId = process.env.FILLOUT_CONTACT_GATE_FORM_ID ?? process.env.NEXT_PUBLIC_FILLOUT_FORM_ID ?? DEFAULT_CONTACT_FORM_ID;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Server is not configured (FILLOUT_API_KEY missing)" },
      { status: 500 },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!raw || typeof raw !== "object") {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const result = validate(raw as SubmissionRequest);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const data = result.data;

  const nameId = process.env.FILLOUT_CONTACT_GATE_QUESTION_NAME_ID ?? DEFAULT_QUESTION_NAME_ID;
  const phoneId = process.env.FILLOUT_CONTACT_GATE_QUESTION_PHONE_ID ?? DEFAULT_QUESTION_PHONE_ID;
  const emailId = process.env.FILLOUT_CONTACT_GATE_QUESTION_EMAIL_ID ?? DEFAULT_QUESTION_EMAIL_ID;
  const messageId = process.env.FILLOUT_CONTACT_GATE_QUESTION_MESSAGE_ID ?? DEFAULT_QUESTION_MESSAGE_ID;
  const sourceParamId = process.env.FILLOUT_CONTACT_GATE_PARAM_SOURCE_ID ?? "source";
  const pageUrlParamId = process.env.FILLOUT_CONTACT_GATE_PARAM_PAGE_URL_ID ?? "page_url";

  const questions: FilloutQuestion[] = [
    { id: nameId, value: data.name },
    { id: phoneId, value: data.phone },
    { id: emailId, value: data.email },
  ];

  if (data.message) {
    questions.push({ id: messageId, value: data.message });
  }

  const submission: FilloutSubmission = {
    questions,
    urlParameters: [
      { id: sourceParamId, name: "source", value: data.source },
      { id: pageUrlParamId, name: "page_url", value: data.pageUrl },
    ],
    submissionTime: new Date().toISOString(),
  };

  const url = `${FILLOUT_API_BASE}/forms/${encodeURIComponent(formId)}/submissions`;

  let filloutRes: Response;
  try {
    filloutRes = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ submissions: [submission] }),
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: "Failed to reach Fillout",
        detail: err instanceof Error ? err.message : "unknown",
      },
      { status: 502 },
    );
  }

  if (!filloutRes.ok) {
    let detail: unknown = null;
    try {
      detail = await filloutRes.json();
    } catch {
      try {
        detail = await filloutRes.text();
      } catch {
        // ignore
      }
    }
    return NextResponse.json(
      {
        error: "Fillout rejected the submission",
        status: filloutRes.status,
        detail,
      },
      { status: 502 },
    );
  }

  const filloutData = await filloutRes.json().catch(() => null);
  return NextResponse.json({ ok: true, fillout: filloutData });
}
