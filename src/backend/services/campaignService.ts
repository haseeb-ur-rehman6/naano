import { db } from "../db/db";
import { SeedCampaign } from "../db/seedData";

export interface CreateCampaignPayload {
  brandId?: string;
  brandName?: string;
  name: string;
  productName: string;
  description: string;
  objective: string;
  targetIndustry: string;
  targetRoles: string;
  companySize: string;
  targetLocation: string;
  totalBudget: number;
  requiredCreators: number;
  topics: string[];
  selectedCreatorIds?: string[];
}

export class CampaignService {
  static getCampaigns(brandId?: string) {
    if (brandId) {
      return db.campaigns.filter((c) => c.brandId === brandId);
    }
    return db.campaigns;
  }

  static getCampaignById(id: string) {
    return db.campaigns.find((c) => c.id === id);
  }

  static createCampaign(payload: CreateCampaignPayload): SeedCampaign {
    const trackingCode = `${payload.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-${Math.floor(100 + Math.random() * 900)}`;

    const campaign = db.addCampaign({
      brandId: payload.brandId || "u_brand_1",
      brandName: payload.brandName || "Acme Analytics",
      name: payload.name,
      productName: payload.productName,
      description: payload.description,
      objective: payload.objective,
      targetIndustry: payload.targetIndustry,
      targetRoles: payload.targetRoles,
      companySize: payload.companySize,
      targetLocation: payload.targetLocation,
      totalBudget: payload.totalBudget,
      requiredCreators: payload.requiredCreators,
      topics: payload.topics,
      status: "ACTIVE",
      trackingCode
    });

    // If creators selected, create pending bookings for each
    if (payload.selectedCreatorIds && payload.selectedCreatorIds.length > 0) {
      payload.selectedCreatorIds.forEach((cId) => {
        const creator = db.getCreatorByUsername(cId);
        const price = creator ? creator.pricePerPost : Math.round(payload.totalBudget / payload.requiredCreators);
        db.createBooking(campaign.id, cId, price);
      });
    }

    return campaign;
  }

  static generateAIBrief(prompt: string) {
    return {
      name: `Growth Campaign for ${prompt.slice(0, 20)}...`,
      description: `Target top B2B decisions makers and key opinion leaders to drive qualified trial signups for ${prompt}.`,
      objective: "Leads",
      targetRoles: "VP of Product, Head of Growth, CTO, Director of IT",
      targetIndustry: "Computer Software & AI",
      suggestedTopics: ["B2B SaaS", "AI Tools", "Product Growth"],
      recommendedBudget: 2500
    };
  }
}
