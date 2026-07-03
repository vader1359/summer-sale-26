import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export const runtime = "nodejs";

type MetaEventName = "fill-summer";
type JsonRecord = Record<string, unknown>;

type MetaEventRequest = {
  event_name: MetaEventName;
  event_id: string;
  event_source_url: string;
  custom_data?: JsonRecord;
};

type MetaUserData = {
  client_ip_address?: string;
  client_user_agent?: string;
  fbp?: string;
  fbc?: string;
};

type MetaPayload = {
  data: Array<{
    event_name: MetaEventName;
    event_time: number;
    event_id: string;
    action_source: "website";
    event_source_url: string;
    user_data: MetaUserData;
    custom_data?: JsonRecord;
  }>;
  access_token: string;
  test_event_code?: string;
};

const META_EVENTS = new Set<MetaEventName>(["fill-summer"]);
const DEFAULT_SITE_URL = "https://sale.nanohome.vn";
const DEFAULT_PIXEL_ID = "484179830726882";

function isRecord(value: unknown): value is JsonRecord {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function asTrimmedString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

function asMetaEventName(value: unknown): MetaEventName | null {
  const eventName = asTrimmedString(value);
  if (!eventName || !META_EVENTS.has(eventName as MetaEventName)) return null;
  return eventName as MetaEventName;
}

function getConfiguredSiteUrl(): URL {
  const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL;

  try {
    return new URL(rawSiteUrl);
  } catch {
    return new URL(DEFAULT_SITE_URL);
  }
}

function normalizeEventSourceUrl(value: unknown, request: NextRequest): string {
  const siteUrl = getConfiguredSiteUrl();
  const rawUrl = asTrimmedString(value) ?? request.headers.get("referer");

  if (!rawUrl) return siteUrl.toString();

  try {
    const eventUrl = new URL(rawUrl);

    if (eventUrl.hostname !== siteUrl.hostname) {
      return new URL(`${eventUrl.pathname}${eventUrl.search}${eventUrl.hash}`, siteUrl).toString();
    }

    return eventUrl.toString();
  } catch {
    return siteUrl.toString();
  }
}

function getClientIp(request: NextRequest): string | undefined {
  const forwardedFor = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return (
    forwardedFor ||
    request.headers.get("cf-connecting-ip")?.trim() ||
    request.headers.get("x-real-ip")?.trim() ||
    undefined
  );
}

function getFbc(eventSourceUrl: string, request: NextRequest): string | undefined {
  const cookieFbc = request.cookies.get("_fbc")?.value;
  if (cookieFbc) return cookieFbc;

  try {
    const fbclid = new URL(eventSourceUrl).searchParams.get("fbclid");
    if (!fbclid) return undefined;
    return `fb.1.${Date.now()}.${fbclid}`;
  } catch {
    return undefined;
  }
}

function omitUndefined<T extends JsonRecord>(record: T): Partial<T> {
  return Object.fromEntries(Object.entries(record).filter(([, value]) => value !== undefined)) as Partial<T>;
}

function parseMetaEventRequest(body: unknown, request: NextRequest): MetaEventRequest | null {
  if (!isRecord(body)) return null;

  const eventName = asMetaEventName(body.event_name);
  const eventId = asTrimmedString(body.event_id);
  if (!eventName || !eventId) return null;

  const eventSourceUrl = normalizeEventSourceUrl(body.event_source_url, request);
  const customData = isRecord(body.custom_data) ? body.custom_data : undefined;

  return {
    event_name: eventName,
    event_id: eventId,
    event_source_url: eventSourceUrl,
    custom_data: customData,
  };
}

export async function POST(request: NextRequest) {
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? DEFAULT_PIXEL_ID;
  const accessToken = process.env.META_CAPI_ACCESS_TOKEN;

  if (!accessToken) {
    return NextResponse.json({ ok: false, error: "META_CAPI_ACCESS_TOKEN is not configured" }, { status: 500 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 });
  }

  const eventRequest = parseMetaEventRequest(body, request);
  if (!eventRequest) {
    return NextResponse.json({ ok: false, error: "Invalid Meta event payload" }, { status: 400 });
  }

  const userData = omitUndefined<MetaUserData>({
    client_ip_address: getClientIp(request),
    client_user_agent: request.headers.get("user-agent")?.trim() || undefined,
    fbp: request.cookies.get("_fbp")?.value,
    fbc: getFbc(eventRequest.event_source_url, request),
  });

  const eventData: MetaPayload["data"][number] = {
    event_name: eventRequest.event_name,
    event_time: Math.floor(Date.now() / 1000),
    event_id: eventRequest.event_id,
    action_source: "website",
    event_source_url: eventRequest.event_source_url,
    user_data: userData,
  };

  if (eventRequest.custom_data) {
    eventData.custom_data = eventRequest.custom_data;
  }

  const payload: MetaPayload = {
    data: [eventData],
    access_token: accessToken,
  };

  const testEventCode = asTrimmedString(process.env.META_CAPI_TEST_EVENT_CODE);
  if (testEventCode) {
    payload.test_event_code = testEventCode;
  }

  let metaResponse: Response;
  try {
    metaResponse = await fetch(`https://graph.facebook.com/v21.0/${encodeURIComponent(pixelId)}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: "Failed to send event to Meta CAPI",
        detail: error instanceof Error ? error.message : "Unknown network error",
      },
      { status: 502 },
    );
  }

  const metaResult: unknown = await metaResponse.json().catch(() => null);

  if (!metaResponse.ok) {
    return NextResponse.json(
      {
        ok: false,
        error: "Meta CAPI rejected the event",
        status: metaResponse.status,
        detail: metaResult,
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, meta: metaResult });
}
