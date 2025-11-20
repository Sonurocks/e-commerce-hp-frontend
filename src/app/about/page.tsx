import React, { Suspense } from "react";
import { About } from "@/components";

const AboutPage = () => {
  return (
    <Suspense fallback={null}>
      <About />
    </Suspense>
  );
};

export default AboutPage;

