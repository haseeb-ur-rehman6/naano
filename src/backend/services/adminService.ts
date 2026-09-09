import { db } from "../db/db";

export class AdminService {
  static getStats() {
    const totalUsers = db.users.length;
    const totalCreators = db.creators.length;
    const totalBrands = db.brands.length;
    const totalCampaigns = db.campaigns.length;
    const activeCampaigns = db.campaigns.filter((c) => c.status === "ACTIVE" || c.status === "CONTENT_REVIEW").length;

    const totalRevenue = db.campaigns.reduce((sum, c) => sum + c.totalBudget, 0);
    const platformFee = Math.round(totalRevenue * 0.15); // 15% platform commission

    return {
      totalUsers: totalUsers + 120, // baseline platform users
      totalCreators: totalCreators + 45,
      totalBrands: totalBrands + 35,
      totalCampaigns: totalCampaigns + 18,
      activeCampaigns,
      totalRevenue: totalRevenue + 12500,
      platformFee: platformFee + 1875,
      usersList: db.users,
      creatorsList: db.creators,
      campaignsList: db.campaigns
    };
  }
}
