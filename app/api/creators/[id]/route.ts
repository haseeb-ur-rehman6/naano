import { NextResponse } from "next/server";
import { CreatorService } from "@/src/backend/services/creatorService";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const creator = CreatorService.getCreatorByUsername(id);

  if (!creator) {
    return NextResponse.json({ success: false, error: "Creator not found" }, { status: 404 });
  }

  return NextResponse.json({ success: true, data: creator });
}
