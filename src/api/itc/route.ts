// src/app/api/itc/route.ts
import { NextResponse } from "next/server";
import { mockPotentialByCountry, mockPotentialByMarket, mockPotentialByProduct } from "@/data/exportPotential";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const kind = searchParams.get("kind");
  const iso2 = searchParams.get("iso2") as "BW"|"MW"|"NA"|"ZM"|"ZW";

  // TODO: when ITC grants API access, call their endpoint here with your key.
  // e.g., const epm = await fetch(`${process.env.ITC_API_BASE}?...`, { headers: { Authorization: `Bearer ${process.env.ITC_API_KEY}` } })

  let data = [];
  if (kind === "country") data = (mockPotentialByCountry as any)[iso2] || [];
  else if (kind === "product") data = (mockPotentialByProduct as any)[iso2] || [];
  else if (kind === "market") data = (mockPotentialByMarket as any)[iso2] || [];

  return NextResponse.json(data);
}