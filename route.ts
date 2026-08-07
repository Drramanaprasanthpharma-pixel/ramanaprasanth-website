import { NextRequest, NextResponse } from "next/server";
import { searchDrugs } from "@/lib/data/drugs";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") ?? "";
  const results = searchDrugs(q);
  return NextResponse.json({ results });
}
