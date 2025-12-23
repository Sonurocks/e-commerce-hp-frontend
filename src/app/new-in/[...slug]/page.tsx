import React, { Suspense } from "react";
import DrawerLinkPage from "@/components/department/DrawerLinkPage";

export default function NewInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DrawerLinkPage />
    </Suspense>
  );
}

