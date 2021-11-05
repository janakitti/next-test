import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import xmlParser from "fast-xml-parser";

const siteUrl = "https://www.sitemaps.org";
const sitemapLink = siteUrl + `/sitemap.xml`;

interface Sitemap {
  urlset: {
    url: Array<{
      loc: string;
    }>;
  };
}

const buildSitemapTable = async () => {
  const sitemapRes = await fetch(sitemapLink);
  const sitemapText = await sitemapRes.text();
  const xml = xmlParser.parse(sitemapText) as Sitemap;
  const pathTable = new Map<string, string>();
  for (const { loc } of xml.urlset.url) {
    const path = loc.slice(siteUrl.length);
    pathTable.set(path, loc);
  }
  return pathTable;
};

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  const pathTable = await buildSitemapTable();
  if (pathTable.has(req.url)) {
    const url = pathTable.get(req.url)!;
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}