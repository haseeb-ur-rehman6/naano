import { NextResponse } from "next/server";
import { BookingService } from "@/src/backend/services/bookingService";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const { status, payoutStatus, postText, mediaUrl, postLink, comment } = await req.json();

    if (postText) {
      const updated = BookingService.submitDraft(id, postText, mediaUrl, postLink);
      return NextResponse.json({ success: true, data: updated });
    }

    if (comment) {
      const addedComment = BookingService.addComment(id, comment.authorName, comment.authorRole, comment.message);
      return NextResponse.json({ success: true, comment: addedComment });
    }

    const updated = BookingService.updateStatus(id, status, payoutStatus);
    return NextResponse.json({ success: true, data: updated });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
