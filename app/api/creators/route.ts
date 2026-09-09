import { NextResponse } from "next/server";
import { CreatorService } from "@/src/backend/services/creatorService";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") || undefined;
  const category = searchParams.get("category") || undefined;
  const industry = searchParams.get("industry") || undefined;
  const location = searchParams.get("location") || undefined;
  const minFollowers = searchParams.get("minFollowers") ? Number(searchParams.get("minFollowers")) : undefined;
  const maxPrice = searchParams.get("maxPrice") ? Number(searchParams.get("maxPrice")) : undefined;

  const creators = CreatorService.getCreators({
    search,
    category,
    industry,
    location,
    minFollowers,
    maxPrice
  });

  return NextResponse.json({ success: true, count: creators.length, data: creators });
}
