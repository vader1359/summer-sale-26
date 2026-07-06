import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SALE_ENDED_PATH = "/summer26-ended";
const SALE_PATHS = new Set(["/", "/summer26", "/summer26-list", "/sumer26"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (SALE_PATHS.has(pathname)) {
    const response = NextResponse.redirect(new URL(SALE_ENDED_PATH, request.url), 302);
    response.headers.set("Cache-Control", "no-store, max-age=0, must-revalidate");
    return response;
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/summer26", "/summer26-list", "/sumer26"],
};
