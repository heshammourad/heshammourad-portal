import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const proxy = auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isReadingList = nextUrl.pathname.startsWith("/reading-list");
  const isSpotifyTools = nextUrl.pathname.startsWith("/spotify-tools");

  if (isReadingList) {
    if (!isLoggedIn) {
      // Redirect to portal login
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", nextUrl.pathname + nextUrl.search);
      return NextResponse.redirect(loginUrl);
    }

    const isDev = process.env.NODE_ENV === "development";
    const READING_LIST_URL = process.env.READING_LIST_URL || (isDev ? "http://localhost:3001" : "https://heshammourad-reading-list.vercel.app");
    const targetUrl = new URL(nextUrl.pathname + nextUrl.search, READING_LIST_URL);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("host", targetUrl.host);
    requestHeaders.set("x-from-portal", "true");
    if (process.env.PORTAL_SECRET) {
      requestHeaders.set("x-portal-secret", process.env.PORTAL_SECRET);
    }

    return NextResponse.rewrite(targetUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  if (isSpotifyTools) {
    const isDev = process.env.NODE_ENV === "development";
    const SPOTIFY_TOOLS_URL = process.env.SPOTIFY_TOOLS_URL || (isDev ? "http://localhost:3002" : "https://heshammourad-spotify.vercel.app");
    const targetUrl = new URL(nextUrl.pathname + nextUrl.search, SPOTIFY_TOOLS_URL);

    const requestHeaders = new Headers(req.headers);
    requestHeaders.set("host", targetUrl.host);
    requestHeaders.set("x-from-portal", "true");
    if (process.env.PORTAL_SECRET) {
      requestHeaders.set("x-portal-secret", process.env.PORTAL_SECRET);
    }

    return NextResponse.rewrite(targetUrl, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
