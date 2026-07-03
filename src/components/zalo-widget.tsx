"use client";

const ZALO_WIDGET_HTML = `
  <div
    class="zalo-chat-widget"
    data-oaid="3326148659494014741"
    data-welcome-message="Rất vui khi được hỗ trợ bạn!"
    data-autopopup="4"
    data-width="350"
    data-height="420"
  ></div>
`;

export function ZaloWidget() {
  return <div dangerouslySetInnerHTML={{ __html: ZALO_WIDGET_HTML }} suppressHydrationWarning />;
}
