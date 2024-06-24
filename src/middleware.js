import { NextResponse } from "next/server";
import { i18n } from "./i18n-config";
import { match as matchLocale } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

function getLocale(request) {
  const negotiatorHeaders = {};
  request.headers.forEach((value, key) => {
    negotiatorHeaders[key] = value;
  });

  const locales = i18n.locales; // Assuming 'locales' can be a mutable array

  const languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  const locale = matchLocale(languages, locales, i18n.defaultLocale);

  return locale;
}

export function middleware(request) {
  const {
    nextUrl: { search },
  } = request;
  const urlSearchParams = new URLSearchParams(search);
  const params = Object.fromEntries(urlSearchParams.entries());

  const urlParams = "?" + new URLSearchParams(params);

  const pathname = request.nextUrl.pathname;

  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);
    if (locale === i18n.defaultLocale) {
      return NextResponse.rewrite(
        new URL(
          `/${locale}${
            pathname.startsWith("/") ? "" : "/"
          }${pathname}${urlParams}`,
          request.url
        )
      );
    }
    return NextResponse.redirect(
      new URL(
        `/${locale}${
          pathname.startsWith("/") ? "" : "/"
        }${pathname}${urlParams}`,
        request.url
      )
    );
  }
}


export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};


// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|robots.txt).*)"],
// };
