import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, ev: NextFetchEvent) {
  return NextResponse.rewrite("https://janakittis-top-notch-site.webflow.io/");
}
