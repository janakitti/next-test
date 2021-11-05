import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  await timeout(2000);
  return NextResponse.rewrite("https://janakittis-top-notch-site.webflow.io/");
}
