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

export function trackFillForm(data?: MetaEventData): void {
  void data;
  // Meta Pixel is not configured in this project.
}

export function trackCartUsm(data?: MetaEventData): void {
  void data;
  // Meta Pixel is not configured in this project.
}
