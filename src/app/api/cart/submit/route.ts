import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export const runtime = 'nodejs';

const FILLOUT_API_BASE = 'https://api.fillout.com/v1/api';

interface SubmissionRequest {
  name?: unknown;
  phone?: unknown;
  email?: unknown;
  source?: unknown;
  pageUrl?: unknown;
  cartItems?: unknown;
  total?: unknown;
}

function asTrimmedString(v: unknown): string | null {
  if (typeof v !== 'string') return null;
  const trimmed = v.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function asFiniteNumber(v: unknown): number | null {
  if (typeof v === 'number' && Number.isFinite(v)) return v;
  if (typeof v === 'string' && v.trim()) {
    const parsed = Number(v);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function formatVnd(value: number): string {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(value);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
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
  source: string;
  pageUrl: string;
  cartItems: string;
  total: number | null;
}

function formatCartItem(item: unknown): string {
  if (!isRecord(item)) return String(item);

  const name = asTrimmedString(item.name) ?? asTrimmedString(item.sourceName) ?? 'Unnamed item';
  const subtitle = asTrimmedString(item.subtitle) ?? asTrimmedString(item.sourceDescription);
  const sku = asTrimmedString(item.sku);
  const category = asTrimmedString(item.categoryLabel) ?? asTrimmedString(item.category);
  const quantity = asFiniteNumber(item.quantity) ?? 1;
  const retailPrice = asFiniteNumber(item.retailPrice);
  const preorderPrice = asFiniteNumber(item.preorderPrice);
  const lineTotal = asFiniteNumber(item.lineTotal) ?? (preorderPrice !== null ? preorderPrice * quantity : null);

  const details = [
    subtitle,
    sku ? `SKU: ${sku}` : null,
    category ? `Category: ${category}` : null,
    retailPrice !== null ? `Retail: ${formatVnd(retailPrice)}` : null,
    preorderPrice !== null ? `Pre-order: ${formatVnd(preorderPrice)}` : null,
    lineTotal !== null ? `Line total: ${formatVnd(lineTotal)}` : null,
  ].filter(Boolean);

  return `${name} x${quantity}${details.length ? `\n  ${details.join('\n  ')}` : ''}`;
}

function validate(body: SubmissionRequest): {
  ok: true;
  data: ValidatedPayload;
} | { ok: false; error: string } {
  const name = asTrimmedString(body.name);
  const phone = asTrimmedString(body.phone);
  const email = asTrimmedString(body.email);

  if (!name) return { ok: false, error: 'Name is required' };
  if (!isValidName(name)) return { ok: false, error: 'Name is invalid' };

  if (!phone) return { ok: false, error: 'Phone is required' };
  if (!isValidPhone(phone)) return { ok: false, error: 'Phone is invalid' };

  if (!email) return { ok: false, error: 'Email is required' };
  if (!isValidEmail(email)) return { ok: false, error: 'Email is invalid' };

  const source = asTrimmedString(body.source) ?? 'preorder-cart';
  const pageUrl = asTrimmedString(body.pageUrl) ?? '';
  
  const total = asFiniteNumber(body.total);

  let cartItemsStr = '';
  if (Array.isArray(body.cartItems)) {
    cartItemsStr = body.cartItems.map(formatCartItem).join('\n\n');
  } else {
    cartItemsStr = asTrimmedString(body.cartItems) ?? '';
  }

  if (total !== null) {
    cartItemsStr = cartItemsStr
      ? `${cartItemsStr}\n\nTotal: ${formatVnd(total)}`
      : `Total: ${formatVnd(total)}`;
  }
  
  return {
    ok: true,
    data: { name, phone, email, source, pageUrl, cartItems: cartItemsStr, total },
  };
}

interface FilloutQuestion {
  id?: string;
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
  const formId = process.env.FILLOUT_CART_FORM_ID ?? process.env.NEXT_PUBLIC_FILLOUT_FORM_ID;

  if (!apiKey) {
    return NextResponse.json(
      { error: 'Server is not configured (FILLOUT_API_KEY missing)' },
      { status: 500 },
    );
  }
  if (!formId) {
    return NextResponse.json(
      { error: 'Server is not configured (FILLOUT_FORM_ID missing)' },
      { status: 500 },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  if (!raw || typeof raw !== 'object') {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const result = validate(raw as SubmissionRequest);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  const data = result.data;

  const nameId = process.env.FILLOUT_CART_QUESTION_NAME_ID ?? process.env.FILLOUT_QUESTION_NAME_ID ?? 'rP8z';
  const phoneId = process.env.FILLOUT_CART_QUESTION_PHONE_ID ?? process.env.FILLOUT_QUESTION_PHONE_ID ?? 'j5ou';
  const emailId = process.env.FILLOUT_CART_QUESTION_EMAIL_ID ?? process.env.FILLOUT_QUESTION_EMAIL_ID ?? 'b4Qk';
  const cartItemsId = process.env.FILLOUT_CART_QUESTION_ITEMS_ID ?? 'nNHy';
  const totalId = process.env.FILLOUT_CART_QUESTION_TOTAL_ID;
  const sourceParamId = process.env.FILLOUT_CART_PARAM_SOURCE_ID ?? process.env.FILLOUT_PARAM_SOURCE_ID ?? 'source';
  const pageUrlParamId = process.env.FILLOUT_CART_PARAM_PAGE_URL_ID ?? process.env.FILLOUT_PARAM_PAGE_URL_ID ?? 'page_url';
  
  const questions: FilloutQuestion[] = [
    { id: nameId, value: data.name },
    { id: phoneId, value: data.phone },
    { id: emailId, value: data.email },
    { id: cartItemsId, value: data.cartItems },
  ];

  if (totalId && data.total !== null) {
    questions.push({ id: totalId, value: data.total });
  }

  const submission: FilloutSubmission = {
    questions,
    urlParameters: [
      { id: sourceParamId, name: 'source', value: data.source },
      { id: pageUrlParamId, name: 'page_url', value: data.pageUrl },
    ],
    submissionTime: new Date().toISOString(),
  };

  const url = `${FILLOUT_API_BASE}/forms/${encodeURIComponent(formId)}/submissions`;

  let filloutRes: Response;
  try {
    filloutRes = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ submissions: [submission] }),
    });
  } catch (err) {
    return NextResponse.json(
      {
        error: 'Failed to reach Fillout',
        detail: err instanceof Error ? err.message : 'unknown',
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
        error: 'Fillout rejected the submission',
        status: filloutRes.status,
        detail,
      },
      { status: 502 },
    );
  }

  const filloutData = await filloutRes.json().catch(() => null);
  return NextResponse.json({ ok: true, fillout: filloutData });
}
