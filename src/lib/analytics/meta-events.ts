export interface MetaEventData {
  value?: number;
  currency?: string;
  content_name?: string;
  content_category?: string;
  content_ids?: string[];
  content_type?: string;
  num_items?: number;
  [key: string]: unknown;
}

type FbqFunction = (...args: unknown[]) => void;
type NanohomeMetaCustomEvent = "fill-summer";

declare global {
  interface Window {
    fbq?: FbqFunction;
  }
}

function callFbq(...args: unknown[]): void {
  if (typeof window === "undefined") return;
  if (typeof window.fbq !== "function") return;
  window.fbq(...args);
}

function createEventId(eventName: string): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${eventName}.${crypto.randomUUID()}`;
  }

  return `${eventName}.${Date.now()}.${Math.random().toString(16).slice(2)}`;
}

function trackNanohomeMetaEvent(eventName: NanohomeMetaCustomEvent, customData: MetaEventData = {}): void {
  if (typeof window === "undefined") return;
  const eventID = createEventId(eventName);
  const eventSourceUrl = window.location.href;

  callFbq("trackCustom", eventName, customData, { eventID });

  fetch("/api/meta/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    keepalive: true,
    body: JSON.stringify({
      event_name: eventName,
      event_id: eventID,
      event_source_url: eventSourceUrl,
      custom_data: customData,
    }),
  }).catch(() => {});
}

export function trackFillForm(data?: MetaEventData): void {
  trackNanohomeMetaEvent("fill-summer", data);
}
