import type { Metadata } from "next";
import SupportRequestsClient from "@/components/internal/support/SupportRequestsClient";

export const metadata: Metadata = {
  title: "Support requests | Internal",
  description: "Internal support ticket requests",
};

export default function InternalSupportPage() {
  return <SupportRequestsClient />;
}
