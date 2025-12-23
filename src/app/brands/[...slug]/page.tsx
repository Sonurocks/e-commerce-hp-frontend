import React, { Suspense } from "react";
import DrawerLinkPage from "@/components/department/DrawerLinkPage";

export default function BrandPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DrawerLinkPage />
    </Suspense>
  );
}

