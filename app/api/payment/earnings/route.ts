import { NextResponse } from "next/server";
import { PaymentService } from "@/src/backend/services/paymentService";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const creatorId = searchParams.get("creatorId") || "cr_1";

  const earnings = PaymentService.getEarnings(creatorId);
  return NextResponse.json({ success: true, data: earnings });
}
