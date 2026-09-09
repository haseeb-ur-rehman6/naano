import { INITIAL_CREATORS, INITIAL_BRANDS, INITIAL_CAMPAIGNS, INITIAL_BOOKINGS, SeedCreator, SeedBrand, SeedCampaign, SeedBooking } from "./seedData";

// In-memory data store backed by Prisma-compatible types
class DatabaseStore {
  public creators: SeedCreator[] = [...INITIAL_CREATORS];
  public brands: SeedBrand[] = [...INITIAL_BRANDS];
  public campaigns: SeedCampaign[] = [...INITIAL_CAMPAIGNS];
  public bookings: SeedBooking[] = [...INITIAL_BOOKINGS];
  public users: Array<{
    id: string;
    email: string;
    role: "BRAND" | "CREATOR" | "AGENCY" | "ADMIN";
    fullName: string;
  }> = [
    { id: "u_brand_1", email: "brand@acme.com", role: "BRAND", fullName: "Acme Brand Admin" },
    { id: "u_creator_1", email: "sarah@jenkins.tech", role: "CREATOR", fullName: "Sarah Jenkins" },
    { id: "u_agency_1", email: "contact@growthagency.com", role: "AGENCY", fullName: "Growth Peak Agency" },
    { id: "u_admin_1", email: "admin@naano.com", role: "ADMIN", fullName: "Naano Admin" }
  ];

  public notifications: Array<{
    id: string;
    userId: string;
    title: string;
    message: string;
    link?: string;
    read: boolean;
    createdAt: string;
  }> = [
    {
      id: "notif_1",
      userId: "u_creator_1",
      title: "New Campaign Invitation",
      message: "Acme Analytics invited you to join Q3 Enterprise Analytics Launch ($850).",
      link: "/dashboard/creator",
      read: false,
      createdAt: new Date().toISOString()
    },
    {
      id: "notif_2",
      userId: "u_brand_1",
      title: "Content Draft Submitted",
      message: "Marcus Vance submitted a draft for FlowStack Agent Studio.",
      link: "/dashboard/brand",
      read: false,
      createdAt: new Date().toISOString()
    }
  ];

  public clickEvents: Array<{
    id: string;
    campaignId: string;
    ipAddress?: string;
    userAgent?: string;
    country?: string;
    timestamp: string;
  }> = [
    { id: "clk_1", campaignId: "cmp_101", country: "United States", timestamp: new Date(Date.now() - 3600000).toISOString() },
    { id: "clk_2", campaignId: "cmp_101", country: "United Kingdom", timestamp: new Date(Date.now() - 7200000).toISOString() },
    { id: "clk_3", campaignId: "cmp_102", country: "Germany", timestamp: new Date(Date.now() - 14400000).toISOString() }
  ];

  // Helper methods
  public getCreators(filters?: {
    search?: string;
    category?: string;
    industry?: string;
    location?: string;
    minFollowers?: number;
    maxPrice?: number;
  }): SeedCreator[] {
    let result = [...this.creators];
    if (!filters) return result;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.bio.toLowerCase().includes(q) ||
          c.category.toLowerCase().includes(q) ||
          c.topics.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (filters.category && filters.category !== "All") {
      result = result.filter((c) => c.category.toLowerCase() === filters.category!.toLowerCase());
    }

    if (filters.minFollowers) {
      result = result.filter((c) => c.followersCount >= filters.minFollowers!);
    }

    if (filters.maxPrice) {
      result = result.filter((c) => c.pricePerPost <= filters.maxPrice!);
    }

    if (filters.location && filters.location !== "All") {
      result = result.filter((c) => c.location.toLowerCase().includes(filters.location!.toLowerCase()));
    }

    return result;
  }

  public getCreatorByUsername(username: string): SeedCreator | undefined {
    return this.creators.find((c) => c.username.toLowerCase() === username.toLowerCase() || c.id === username);
  }

  public addCampaign(campaign: Omit<SeedCampaign, "id" | "createdAt" | "clicksCount" | "leadsCount">): SeedCampaign {
    const newCamp: SeedCampaign = {
      ...campaign,
      id: `cmp_${Date.now()}`,
      createdAt: new Date().toISOString(),
      clicksCount: 0,
      leadsCount: 0
    };
    this.campaigns.unshift(newCamp);
    return newCamp;
  }

  public createBooking(campaignId: string, creatorId: string, price: number): SeedBooking {
    const newBooking: SeedBooking = {
      id: `bk_${Date.now()}`,
      campaignId,
      creatorId,
      agreedPrice: price,
      status: "PENDING",
      payoutStatus: "PENDING",
      createdAt: new Date().toISOString(),
      comments: []
    };
    this.bookings.unshift(newBooking);
    return newBooking;
  }

  public updateBookingStatus(
    bookingId: string,
    status: SeedBooking["status"],
    payoutStatus?: SeedBooking["payoutStatus"]
  ): SeedBooking | null {
    const b = this.bookings.find((item) => item.id === bookingId);
    if (!b) return null;
    b.status = status;
    if (payoutStatus) b.payoutStatus = payoutStatus;
    return b;
  }

  public submitDraft(bookingId: string, postText: string, mediaUrl?: string, postLink?: string): SeedBooking | null {
    const b = this.bookings.find((item) => item.id === bookingId);
    if (!b) return null;
    b.postText = postText;
    b.mediaUrl = mediaUrl;
    b.postLink = postLink;
    b.status = "SUBMITTED";
    return b;
  }

  public addComment(bookingId: string, authorName: string, authorRole: string, message: string) {
    const b = this.bookings.find((item) => item.id === bookingId);
    if (!b) return null;
    if (!b.comments) b.comments = [];
    const comment = {
      id: `comm_${Date.now()}`,
      authorName,
      authorRole,
      message,
      createdAt: new Date().toISOString()
    };
    b.comments.push(comment);
    return comment;
  }

  public registerUser(email: string, role: "BRAND" | "CREATOR" | "AGENCY", fullName: string) {
    const existing = this.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) return existing;
    const newUser = {
      id: `u_${Date.now()}`,
      email,
      role,
      fullName
    };
    this.users.push(newUser);
    return newUser;
  }
}

// Global singleton instance
export const db = new DatabaseStore();
