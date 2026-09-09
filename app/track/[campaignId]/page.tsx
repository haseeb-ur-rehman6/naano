import { use } from "react";
import AnalyticsTrackingView from "@/src/frontend/views/AnalyticsTrackingView";

export default function AnalyticsTrackingPage({ params }: { params: Promise<{ campaignId: string }> }) {
  const resolvedParams = use(params);
  return <AnalyticsTrackingView campaignId={resolvedParams.campaignId} />;
}
