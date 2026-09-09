import { NextResponse } from "next/server";
import { AuthService } from "@/src/backend/services/authService";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = await AuthService.register(body);
    const response = NextResponse.json({ success: true, ...result });

    response.cookies.set("naano_session", result.token, {
      httpOnly: true,
      path: "/",
      maxAge: 86400 * 7
    });

    return response;
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
