import { NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
import Negotiator from 'negotiator';

let locales = ['en', 'tw'];

function getLocale(request: NextRequest) {
      let headers = request.headers;
      let languages = new Negotiator({headers: {"accept-language": headers.get('accept-language') ?? undefined}}).languages();
      let defaultLocale = 'en';
      
      return match(languages, locales, defaultLocale);
}

export function middleware(request: NextRequest) {
      const pathname = request.nextUrl.pathname;
      const pathnameIsMissingLocale = locales.every(
            (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
      );

      if (pathnameIsMissingLocale) {
            const locale = getLocale(request);

            return NextResponse.redirect(
                  new URL(`/${locale}/${pathname}`, request.url)
            );
      }
}

export const config = {
      matcher: [
            // Skip all internal paths (_next)
            '/((?!_next|static|data).*)',
            // Optional: only run on root (/) URL
            // '/'  
      ],
}