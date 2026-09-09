import { NextResponse } from "next/server";
import { PaymentService } from "@/src/backend/services/paymentService";

export async function POST(req: Request) {
  try {
    const { campaignId, amount } = await req.json();
    const result = PaymentService.createCheckoutSession(campaignId, amount);
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
