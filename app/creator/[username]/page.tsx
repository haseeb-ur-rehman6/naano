import { use } from "react";
import CreatorProfileView from "@/src/frontend/views/CreatorProfileView";

export default function CreatorProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = use(params);
  return <CreatorProfileView username={resolvedParams.username} />;
}
