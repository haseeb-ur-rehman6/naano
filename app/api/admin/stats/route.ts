import { NextResponse } from "next/server";
import { AdminService } from "@/src/backend/services/adminService";

export async function GET() {
  const stats = AdminService.getStats();
  return NextResponse.json({ success: true, data: stats });
}
