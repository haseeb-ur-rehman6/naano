// Centralized Frontend API Client Library for Naano B2B Platform

export const authApi = {
  async login(email: string) {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    return res.json();
  },

  async register(payload: any) {
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async logout() {
    const res = await fetch("/api/auth/logout", { method: "POST" });
    return res.json();
  }
};

export const creatorsApi = {
  async getCreators(params?: {
    search?: string;
    category?: string;
    industry?: string;
    location?: string;
    minFollowers?: number;
    maxPrice?: number;
  }) {
    const query = new URLSearchParams();
    if (params?.search) query.append("search", params.search);
    if (params?.category && params.category !== "All") query.append("category", params.category);
    if (params?.industry) query.append("industry", params.industry);
    if (params?.location && params.location !== "All") query.append("location", params.location);
    if (params?.minFollowers) query.append("minFollowers", params.minFollowers.toString());
    if (params?.maxPrice) query.append("maxPrice", params.maxPrice.toString());

    const res = await fetch(`/api/creators?${query.toString()}`);
    return res.json();
  },

  async getCreatorByUsername(username: string) {
    const res = await fetch(`/api/creators/${username}`);
    return res.json();
  }
};

export const campaignsApi = {
  async getCampaigns(brandId?: string) {
    const query = brandId ? `?brandId=${brandId}` : "";
    const res = await fetch(`/api/campaigns${query}`);
    return res.json();
  },

  async createCampaign(payload: any) {
    const res = await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async generateAIBrief(prompt: string) {
    const res = await fetch("/api/campaigns/ai-brief", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt })
    });
    return res.json();
  }
};

export const bookingsApi = {
  async getBookings(filters?: { creatorId?: string; campaignId?: string }) {
    const query = new URLSearchParams();
    if (filters?.creatorId) query.append("creatorId", filters.creatorId);
    if (filters?.campaignId) query.append("campaignId", filters.campaignId);

    const res = await fetch(`/api/bookings?${query.toString()}`);
    return res.json();
  },

  async createBooking(payload: { campaignId: string; creatorId: string; price: number }) {
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return res.json();
  },

  async updateStatus(id: string, payload: any) {
    const res = await fetch(`/api/bookings/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    return res.json();
  }
};

export const paymentApi = {
  async createCheckout(campaignId: string, amount: number) {
    const res = await fetch("/api/payment/create-checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ campaignId, amount })
    });
    return res.json();
  },

  async getEarnings(creatorId: string) {
    const res = await fetch(`/api/payment/earnings?creatorId=${creatorId}`);
    return res.json();
  }
};

export const analyticsApi = {
  async getCampaignAnalytics(campaignId: string) {
    const res = await fetch(`/api/analytics/${campaignId}`);
    return res.json();
  }
};

export const adminApi = {
  async getStats() {
    const res = await fetch("/api/admin/stats");
    return res.json();
  }
};
