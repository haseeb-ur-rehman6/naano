import { db } from "../db/db";

export interface RegisterUserPayload {
  accountType: "BRAND" | "CREATOR" | "AGENCY";
  fullName: string;
  email: string;
  password?: string;
  companyName?: string;
  website?: string;
  industry?: string;
  companySize?: string;
  linkedinUrl?: string;
  category?: string;
  followersCount?: number;
  pricePerPost?: number;
  agencyName?: string;
}

export class AuthService {
  static async register(payload: RegisterUserPayload) {
    const user = db.registerUser(payload.email, payload.accountType, payload.fullName);

    // If Creator registration, seed a new profile into db.creators
    if (payload.accountType === "CREATOR" && payload.linkedinUrl) {
      const username = payload.fullName.toLowerCase().replace(/[^a-z0-9]/g, "-") || `creator-${Date.now()}`;
      const newCreator = {
        id: `cr_${Date.now()}`,
        userId: user.id,
        name: payload.fullName,
        username,
        avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80`,
        linkedinUrl: payload.linkedinUrl,
        category: payload.category || "SaaS & Tech",
        followersCount: Number(payload.followersCount) || 12500,
        engagementRate: 4.5,
        avgViews: 8500,
        avgReactions: 420,
        avgComments: 65,
        topics: [payload.category || "Tech Leadership", "Marketing", "SaaS"],
        location: "United States",
        pricePerPost: Number(payload.pricePerPost) || 600,
        pricePackage3: (Number(payload.pricePerPost) || 600) * 2.5,
        verified: true,
        bio: `B2B Content Creator specializing in ${payload.category || "Tech & Growth"}.`,
        samplePosts: [
          {
            id: `sp_${Date.now()}`,
            content: `Excited to join Naano as a verified B2B LinkedIn Creator! Looking forward to partnering with innovative SaaS brands.`,
            likes: 310,
            comments: 42,
            shares: 18,
            date: "Today"
          }
        ],
        audienceData: {
          topIndustries: [{ name: "Technology", percentage: 50 }, { name: "Marketing", percentage: 30 }],
          topJobTitles: [{ title: "Founders & Executives", percentage: 45 }, { title: "Managers", percentage: 35 }],
          topLocations: [{ country: "United States", percentage: 70 }, { country: "United Kingdom", percentage: 20 }]
        }
      };
      db.creators.unshift(newCreator);
    }

    return {
      user,
      token: `mock_jwt_token_${user.id}_${Date.now()}`
    };
  }

  static async login(email: string) {
    const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || {
      id: `u_login_${Date.now()}`,
      email,
      role: "BRAND" as const,
      fullName: email.split("@")[0] || "User"
    };

    return {
      user,
      token: `mock_jwt_token_${user.id}_${Date.now()}`
    };
  }
}
