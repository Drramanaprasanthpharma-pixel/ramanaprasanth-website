import { NextRequest, NextResponse } from "next/server";
import { findInteraction } from "@/lib/repository";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const drugA = searchParams.get("drugA")?.trim();
  const drugB = searchParams.get("drugB")?.trim();

  if (!drugA) {
    return NextResponse.json({ error: "drugA is required" }, { status: 400 });
  }

  try {
    // Single-drug search: return null match with a message; the UI treats
    // this as "no interaction on file" rather than an error, since a lone
    // drug has no pair to check.
    if (!drugB) {
      return NextResponse.json({ record: null, mode: "single" });
    }

    const record = await findInteraction(drugA, drugB);
    return NextResponse.json({ record, mode: "pair" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Search failed" }, { status: 500 });
  }
}
