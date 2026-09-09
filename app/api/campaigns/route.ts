import { NextResponse } from "next/server";
import { CampaignService } from "@/src/backend/services/campaignService";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const brandId = searchParams.get("brandId") || undefined;

  const campaigns = CampaignService.getCampaigns(brandId);
  return NextResponse.json({ success: true, data: campaigns });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const campaign = CampaignService.createCampaign(body);
    return NextResponse.json({ success: true, data: campaign });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
