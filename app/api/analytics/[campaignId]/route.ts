import { NextResponse } from "next/server";
import { AnalyticsService } from "@/src/backend/services/analyticsService";

export async function GET(req: Request, { params }: { params: Promise<{ campaignId: string }> }) {
  const { campaignId } = await params;
  const analytics = AnalyticsService.getCampaignAnalytics(campaignId);
  return NextResponse.json({ success: true, data: analytics });
}
