"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

const ConditionalHeader = () => {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";

  if (isAboutPage) {
    return null;
  }

  return <Header />;
};

export default ConditionalHeader;

