import React, { Suspense } from "react";
import DrawerLinkPage from "@/components/department/DrawerLinkPage";

export default function HolidaySeasonPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DrawerLinkPage />
    </Suspense>
  );
}

