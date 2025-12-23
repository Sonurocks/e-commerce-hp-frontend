import React, { Suspense } from "react";
import DrawerLinkPage from "@/components/department/DrawerLinkPage";

export default function ShoesPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DrawerLinkPage />
    </Suspense>
  );
}

