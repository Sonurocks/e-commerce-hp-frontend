"use client";

import { usePathname } from "next/navigation";
import Header from "./Header";

const ConditionalHeader = () => {
  const pathname = usePathname();
  const isAboutPage = pathname === "/about";
  const isLaunchingSoonPage = pathname === "/launching-soon";

  if (isAboutPage || isLaunchingSoonPage) {
    return null;
  }

  return <Header />;
};

export default ConditionalHeader;

