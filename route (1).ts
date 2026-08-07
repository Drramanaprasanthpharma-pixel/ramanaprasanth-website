import { NextRequest, NextResponse } from "next/server";
import { createInteraction, listInteractions } from "@/lib/repository";
import { isAdminAuthorized } from "@/lib/adminAuth";

export async function GET() {
  try {
    const records = await listInteractions();
    return NextResponse.json({ records });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Failed to load records" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const record = await createInteraction(body);
    return NextResponse.json({ record }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message ?? "Failed to create record" }, { status: 500 });
  }
}
