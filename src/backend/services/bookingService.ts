import { db } from "../db/db";
import { SeedBooking } from "../db/seedData";

export class BookingService {
  static getBookings(filters?: { creatorId?: string; campaignId?: string }) {
    let result = db.bookings;
    if (filters?.creatorId) {
      result = result.filter((b) => b.creatorId === filters.creatorId);
    }
    if (filters?.campaignId) {
      result = result.filter((b) => b.campaignId === filters.campaignId);
    }
    return result;
  }

  static createBooking(campaignId: string, creatorId: string, price: number): SeedBooking {
    return db.createBooking(campaignId, creatorId, price);
  }

  static updateStatus(bookingId: string, status: SeedBooking["status"], payoutStatus?: SeedBooking["payoutStatus"]) {
    return db.updateBookingStatus(bookingId, status, payoutStatus);
  }

  static submitDraft(bookingId: string, postText: string, mediaUrl?: string, postLink?: string) {
    return db.submitDraft(bookingId, postText, mediaUrl, postLink);
  }

  static addComment(bookingId: string, authorName: string, authorRole: string, message: string) {
    return db.addComment(bookingId, authorName, authorRole, message);
  }
}
