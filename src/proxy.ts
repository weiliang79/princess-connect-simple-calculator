import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "tw"];

function getLocale(request: NextRequest) {
  const headers: Record<string, string> = {};
  request.headers.forEach((value, key) => (headers[key] = value));
  const languages = new Negotiator({ headers: headers }).languages();
  const defaultLocale = "en";

  return match(languages, locales, defaultLocale);
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameIsMissingLocale = locales.every(
    (locale) =>
      !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`,
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    return NextResponse.redirect(
      new URL(`/${locale}/${pathname}`, request.url),
    );
  }
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next|static|data).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
