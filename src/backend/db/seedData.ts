export interface SeedCreator {
  id: string;
  userId: string;
  name: string;
  username: string;
  avatarUrl: string;
  linkedinUrl: string;
  category: string;
  followersCount: number;
  engagementRate: number;
  avgViews: number;
  avgReactions: number;
  avgComments: number;
  topics: string[];
  location: string;
  pricePerPost: number;
  pricePackage3: number;
  verified: boolean;
  bio: string;
  samplePosts: Array<{
    id: string;
    content: string;
    likes: number;
    comments: number;
    shares: number;
    date: string;
  }>;
  audienceData: {
    topIndustries: Array<{ name: string; percentage: number }>;
    topJobTitles: Array<{ title: string; percentage: number }>;
    topLocations: Array<{ country: string; percentage: number }>;
  };
}

export interface SeedBrand {
  id: string;
  userId: string;
  companyName: string;
  website: string;
  industry: string;
  companySize: string;
  logoUrl: string;
}

export interface SeedCampaign {
  id: string;
  brandId: string;
  brandName: string;
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
  status: "DRAFT" | "PENDING" | "ACCEPTED" | "PAYMENT_PENDING" | "ACTIVE" | "CONTENT_REVIEW" | "APPROVED" | "PUBLISHED" | "COMPLETED" | "CANCELLED";
  trackingCode: string;
  createdAt: string;
  clicksCount: number;
  leadsCount: number;
}

export interface SeedBooking {
  id: string;
  campaignId: string;
  creatorId: string;
  agreedPrice: number;
  status: "INVITED" | "PENDING" | "ACCEPTED" | "REJECTED" | "SUBMITTED" | "REVISION_REQUESTED" | "APPROVED" | "PUBLISHED" | "COMPLETED";
  payoutStatus: "PENDING" | "ESCROWED" | "PAID_OUT" | "REFUNDED";
  createdAt: string;
  postText?: string;
  mediaUrl?: string;
  postLink?: string;
  comments?: Array<{
    id: string;
    authorName: string;
    authorRole: string;
    message: string;
    createdAt: string;
  }>;
}

export const INITIAL_CREATORS: SeedCreator[] = [
  {
    id: "cr_1",
    userId: "u_creator_1",
    name: "Sarah Jenkins",
    username: "sarah-jenkins",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80",
    linkedinUrl: "https://linkedin.com/in/sarahjenkins-tech",
    category: "SaaS & B2B Tech",
    followersCount: 48500,
    engagementRate: 4.9,
    avgViews: 14200,
    avgReactions: 620,
    avgComments: 115,
    topics: ["B2B SaaS", "Product Growth", "AI Tools", "Tech Leadership"],
    location: "San Francisco, CA",
    pricePerPost: 850,
    pricePackage3: 2200,
    verified: true,
    bio: "Senior Product Strategist & Tech Writer. Sharing daily insights on SaaS scaling, PLG tactics, and enterprise software leadership to 48k+ founders and VP-level executives.",
    samplePosts: [
      {
        id: "post_1",
        content: "Most B2B SaaS companies fail at PLG because they view self-serve as a product feature instead of a business model.\n\nHere are 5 counter-intuitive lessons we learned scaling to $10M ARR:\n1. Your free trial shouldn't be feature-gated.\n2. Time-to-value > onboarding completion rate.\n3. Sales should step in ONLY after product qualified leads trigger usage spikes.",
        likes: 840,
        comments: 142,
        shares: 68,
        date: "2 days ago"
      },
      {
        id: "post_2",
        content: "AI tools won't replace product managers, but product managers who leverage custom AI workflows will replace those who don't.\n\nHere is our exact prompt architecture for automated customer sentiment analysis 🚀",
        likes: 1210,
        comments: 189,
        shares: 112,
        date: "1 week ago"
      }
    ],
    audienceData: {
      topIndustries: [
        { name: "Computer Software", percentage: 42 },
        { name: "Information Technology", percentage: 28 },
        { name: "Marketing & Advertising", percentage: 15 },
        { name: "Financial Services", percentage: 15 }
      ],
      topJobTitles: [
        { title: "VP of Product / Head of Product", percentage: 34 },
        { title: "Founder & CEO", percentage: 29 },
        { title: "Senior Software Engineer", percentage: 22 },
        { title: "Growth Manager", percentage: 15 }
      ],
      topLocations: [
        { country: "United States", percentage: 65 },
        { country: "United Kingdom", percentage: 18 },
        { country: "Canada", percentage: 10 },
        { country: "Germany", percentage: 7 }
      ]
    }
  },
  {
    id: "cr_2",
    userId: "u_creator_2",
    name: "Alex Rivera",
    username: "alex-rivera",
    avatarUrl: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80",
    linkedinUrl: "https://linkedin.com/in/alexrivera-growth",
    category: "Marketing & Sales",
    followersCount: 72000,
    engagementRate: 5.4,
    avgViews: 22000,
    avgReactions: 950,
    avgComments: 180,
    topics: ["B2B Marketing", "Outbound Sales", "Demand Gen", "Cold Email"],
    location: "New York, NY",
    pricePerPost: 1200,
    pricePackage3: 3100,
    verified: true,
    bio: "Head of Growth & B2B Creator. I break down outbound engines, pipeline velocity, and modern demand generation strategies for tech companies.",
    samplePosts: [
      {
        id: "post_3",
        content: "Cold email in 2026 is dead... unless you personalize based on intent signals, not just job titles.\n\nHere is how we generated 48 qualified enterprise demos last month without a single automated blast.",
        likes: 1450,
        comments: 230,
        shares: 140,
        date: "3 days ago"
      }
    ],
    audienceData: {
      topIndustries: [
        { name: "Marketing & Advertising", percentage: 48 },
        { name: "Software Development", percentage: 32 },
        { name: "Sales & Recruiting", percentage: 20 }
      ],
      topJobTitles: [
        { title: "VP of Marketing / CMO", percentage: 38 },
        { title: "Head of Sales / CRO", percentage: 32 },
        { title: "Growth Specialist", percentage: 30 }
      ],
      topLocations: [
        { country: "United States", percentage: 72 },
        { country: "United Kingdom", percentage: 14 },
        { country: "Australia", percentage: 14 }
      ]
    }
  },
  {
    id: "cr_3",
    userId: "u_creator_3",
    name: "Elena Rostova",
    username: "elena-rostova",
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80",
    linkedinUrl: "https://linkedin.com/in/elenarostova-fintech",
    category: "Finance & Fintech",
    followersCount: 36000,
    engagementRate: 4.2,
    avgViews: 11500,
    avgReactions: 490,
    avgComments: 82,
    topics: ["Fintech", "CFO Insights", "Corporate Treasury", "Startup Valuation"],
    location: "London, UK",
    pricePerPost: 700,
    pricePackage3: 1800,
    verified: true,
    bio: "Former Investment Banker turned Fractional CFO for High-Growth Startups. Advisory on capital allocation, burn rate control, and treasury tech.",
    samplePosts: [
      {
        id: "post_4",
        content: "The top reason Series A startups run out of runway early isn't lack of sales — it's unoptimized SaaS stack spending.\n\nAudit your tool subscriptions quarterly. Here is the spreadsheet framework we use.",
        likes: 620,
        comments: 94,
        shares: 45,
        date: "4 days ago"
      }
    ],
    audienceData: {
      topIndustries: [
        { name: "Financial Services", percentage: 55 },
        { name: "Venture Capital & Private Equity", percentage: 25 },
        { name: "Technology", percentage: 20 }
      ],
      topJobTitles: [
        { title: "Chief Financial Officer (CFO)", percentage: 41 },
        { title: "VP Finance & Controller", percentage: 35 },
        { title: "Managing Director / Partner", percentage: 24 }
      ],
      topLocations: [
        { country: "United Kingdom", percentage: 45 },
        { country: "United States", percentage: 35 },
        { country: "Switzerland", percentage: 20 }
      ]
    }
  },
  {
    id: "cr_4",
    userId: "u_creator_4",
    name: "Marcus Vance",
    username: "marcus-vance",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80",
    linkedinUrl: "https://linkedin.com/in/marcusvance-ai",
    category: "AI & Engineering",
    followersCount: 94000,
    engagementRate: 6.1,
    avgViews: 38000,
    avgReactions: 1850,
    avgComments: 340,
    topics: ["Generative AI", "LLM Architecture", "DevOps", "AI Infrastructure"],
    location: "Austin, TX",
    pricePerPost: 1500,
    pricePackage3: 3800,
    verified: true,
    bio: "AI Architect & Tech Influencer. Helping enterprise dev teams build scalable AI agents, fine-tune LLMs, and optimize cloud infrastructure costs.",
    samplePosts: [
      {
        id: "post_5",
        content: "Deploying autonomous AI agents into production without deterministic evaluation frameworks is asking for a security outage.\n\nHere are 3 open-source guardrail tools every CTO should mandate in 2026.",
        likes: 2400,
        comments: 410,
        shares: 310,
        date: "Yesterday"
      }
    ],
    audienceData: {
      topIndustries: [
        { name: "Artificial Intelligence", percentage: 52 },
        { name: "Cloud Infrastructure", percentage: 30 },
        { name: "Cybersecurity", percentage: 18 }
      ],
      topJobTitles: [
        { title: "Chief Technology Officer (CTO)", percentage: 44 },
        { title: "Staff AI Engineer", percentage: 32 },
        { title: "VP of Engineering", percentage: 24 }
      ],
      topLocations: [
        { country: "United States", percentage: 70 },
        { country: "Germany", percentage: 15 },
        { country: "India", percentage: 15 }
      ]
    }
  }
];

export const INITIAL_BRANDS: SeedBrand[] = [
  {
    id: "br_1",
    userId: "u_brand_1",
    companyName: "Acme Analytics",
    website: "https://acmeanalytics.io",
    industry: "Computer Software",
    companySize: "50-200 employees",
    logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80"
  },
  {
    id: "br_2",
    userId: "u_brand_2",
    companyName: "FlowStack AI",
    website: "https://flowstack.ai",
    industry: "Artificial Intelligence",
    companySize: "11-50 employees",
    logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80"
  }
];

export const INITIAL_CAMPAIGNS: SeedCampaign[] = [
  {
    id: "cmp_101",
    brandId: "u_brand_1",
    brandName: "Acme Analytics",
    name: "Q3 Enterprise Analytics Launch",
    productName: "Acme Insight Cloud 3.0",
    description: "Promote Acme Analytics new real-time enterprise telemetry dashboard to CTOs, VPs of Engineering, and Data Directors.",
    objective: "Leads",
    targetIndustry: "Computer Software",
    targetRoles: "CTO, VP of Engineering, Head of Data",
    companySize: "50-500 employees",
    targetLocation: "United States, Europe",
    totalBudget: 2500,
    requiredCreators: 2,
    topics: ["B2B SaaS", "Tech Leadership", "AI Tools"],
    status: "ACTIVE",
    trackingCode: "acme-q3-launch-891",
    createdAt: new Date(Date.now() - 5 * 86400000).toISOString(),
    clicksCount: 342,
    leadsCount: 28
  },
  {
    id: "cmp_102",
    brandId: "u_brand_2",
    brandName: "FlowStack AI",
    name: "AI Agent Workflow Awareness",
    productName: "FlowStack Agent Studio",
    description: "Demonstrate how dev teams build custom RAG pipelines and autonomous agents 10x faster.",
    objective: "Product Launch",
    targetIndustry: "Artificial Intelligence",
    targetRoles: "Staff AI Engineer, CTO",
    companySize: "11-100 employees",
    targetLocation: "Global",
    totalBudget: 1500,
    requiredCreators: 1,
    topics: ["Generative AI", "LLM Architecture"],
    status: "CONTENT_REVIEW",
    trackingCode: "flowstack-ai-442",
    createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    clicksCount: 189,
    leadsCount: 14
  }
];

export const INITIAL_BOOKINGS: SeedBooking[] = [
  {
    id: "bk_201",
    campaignId: "cmp_101",
    creatorId: "cr_1",
    agreedPrice: 850,
    status: "APPROVED",
    payoutStatus: "ESCROWED",
    createdAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    postText: "We spent 3 months trying to build custom telemetry dashboards in-house until we plugged in @Acme Analytics.\n\nHere is how their real-time query engine reduced our metric latency from 14s to 120ms without doubling cloud costs.",
    mediaUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80",
    postLink: "https://linkedin.com/posts/sarahjenkins-acme-review",
    comments: [
      {
        id: "comm_1",
        authorName: "Acme Brand Team",
        authorRole: "BRAND",
        message: "Looks fantastic! The screenshot really highlights the latency metrics cleanly.",
        createdAt: new Date(Date.now() - 3 * 86400000).toISOString()
      },
      {
        id: "comm_2",
        authorName: "Sarah Jenkins",
        authorRole: "CREATOR",
        message: "Thanks! Scheduling this for publish tomorrow at 9 AM EST.",
        createdAt: new Date(Date.now() - 2 * 86400000).toISOString()
      }
    ]
  },
  {
    id: "bk_202",
    campaignId: "cmp_102",
    creatorId: "cr_4",
    agreedPrice: 1500,
    status: "SUBMITTED",
    payoutStatus: "ESCROWED",
    createdAt: new Date(Date.now() - 1 * 86400000).toISOString(),
    postText: "Building production RAG pipelines is 80% data cleaning and 20% prompt tuning.\n\nHere is how @FlowStack AI simplifies vector index management for enterprise LLMs.",
    mediaUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&auto=format&fit=crop&q=80",
    comments: [
      {
        id: "comm_3",
        authorName: "Marcus Vance",
        authorRole: "CREATOR",
        message: "Draft submitted for review. Let me know if you want any messaging tweaks on the prompt tuning part.",
        createdAt: new Date(Date.now() - 1 * 86400000).toISOString()
      }
    ]
  }
];
