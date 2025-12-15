import React, { Suspense } from "react";
import TrendingPage from "@/components/department/TrendingPage";

export default function Trending() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrendingPage />
    </Suspense>
  );
}

