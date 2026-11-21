import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const SUPPORTED_LANGS = new Set(["en", "ja", "zh", "es"]);

export function proxy(request: NextRequest) {
  const rawLang = request.nextUrl.searchParams.get("lang");
  const lang = rawLang && SUPPORTED_LANGS.has(rawLang) ? rawLang : "en";

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-wdl-lang", lang);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/"],
};
