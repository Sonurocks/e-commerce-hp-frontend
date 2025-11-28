import { Metadata } from "next";
import { VendorPortal } from "@/components";

export const metadata: Metadata = {
  title: "Become a Vendor | FARFETCH",
  description:
    "Partner with FARFETCH to reach global customers. Register your business, upload compliance documents, and manage payouts with our vendor portal.",
};

const BecomeAVendorPage = () => {
  return <VendorPortal />;
};

export default BecomeAVendorPage;


