"use client";

import { usePathname } from "next/navigation";
import Footer from "./Footer";

const ConditionalFooter = () => {
  const pathname = usePathname();

  if (pathname === "/about") {
    return null;
  }

  return <Footer />;
};

export default ConditionalFooter;

