import { db } from "../db/db";

export class PaymentService {
  static createCheckoutSession(campaignId: string, amount: number) {
    const stripePaymentId = `cs_stripe_${Date.now()}_${Math.random().toString(36).substring(7)}`;

    // Update associated campaign and bookings
    const campaign = db.campaigns.find((c) => c.id === campaignId);
    if (campaign) {
      campaign.status = "ACTIVE";
    }

    const bookings = db.bookings.filter((b) => b.campaignId === campaignId);
    bookings.forEach((b) => {
      b.payoutStatus = "ESCROWED";
      if (b.status === "PENDING") b.status = "ACCEPTED";
    });

    return {
      success: true,
      stripePaymentId,
      checkoutUrl: `/dashboard/brand?payment=success&campaignId=${campaignId}`,
      amount,
      status: "ESCROWED"
    };
  }

  static getEarnings(creatorId: string) {
    const bookings = db.bookings.filter((b) => b.creatorId === creatorId);

    const completed = bookings
      .filter((b) => b.status === "APPROVED" || b.status === "PUBLISHED" || b.status === "COMPLETED")
      .reduce((sum, b) => sum + b.agreedPrice, 0);

    const pending = bookings
      .filter((b) => b.status === "ACCEPTED" || b.status === "SUBMITTED" || b.status === "REVISION_REQUESTED")
      .reduce((sum, b) => sum + b.agreedPrice, 0);

    return {
      totalEarnings: completed,
      pendingEarnings: pending,
      payoutHistory: bookings.map((b) => ({
        bookingId: b.id,
        campaignId: b.campaignId,
        amount: b.agreedPrice,
        status: b.payoutStatus,
        date: b.createdAt
      }))
    };
  }
}
