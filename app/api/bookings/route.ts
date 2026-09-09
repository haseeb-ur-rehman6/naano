import { NextResponse } from "next/server";
import { BookingService } from "@/src/backend/services/bookingService";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const creatorId = searchParams.get("creatorId") || undefined;
  const campaignId = searchParams.get("campaignId") || undefined;

  const bookings = BookingService.getBookings({ creatorId, campaignId });
  return NextResponse.json({ success: true, data: bookings });
}

export async function POST(req: Request) {
  try {
    const { campaignId, creatorId, price } = await req.json();
    const booking = BookingService.createBooking(campaignId, creatorId, price);
    return NextResponse.json({ success: true, data: booking });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
