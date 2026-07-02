import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SALE_OPEN_AT = Date.parse("2026-07-03T09:00:00+07:00");

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/sumer26") {
    return NextResponse.redirect(new URL("/summer26", request.url));
  }

  if (pathname === "/summer26-list" && Date.now() < SALE_OPEN_AT) {
    const response = NextResponse.rewrite(new URL("/summer26/countdown", request.url));
    response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/summer26-list", "/sumer26"],
};
