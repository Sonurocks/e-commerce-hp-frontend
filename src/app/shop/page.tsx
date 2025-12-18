import React, { Suspense } from "react";
import ShopPage from "@/components/department/ShopPage";

export default function Shop() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShopPage />
    </Suspense>
  );
}

