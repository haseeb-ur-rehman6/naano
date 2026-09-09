import { NextResponse } from "next/server";
import { CampaignService } from "@/src/backend/services/campaignService";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const brief = CampaignService.generateAIBrief(prompt || "B2B SaaS product");
    return NextResponse.json({ success: true, data: brief });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
