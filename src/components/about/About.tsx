"use client"

import React from "react";
import { useSearchParams } from "next/navigation";
import AboutHeader from "./AboutHeader";
import AboutShowcase from "./AboutShowcase";
import AboutFooter from "./AboutFooter";

const About = () => {
  const searchParams = useSearchParams();
  const view = searchParams?.get('view');
  
  // Don't show AboutShowcase and AboutFooter when showing Career or Contact page
  const showMainContent = view !== 'career' && view !== 'contact';

  return (
    <>
      <AboutHeader />
      {showMainContent && (
        <>
          <AboutShowcase />
          <AboutFooter />
        </>
      )}
    </>
  )
}

export default About