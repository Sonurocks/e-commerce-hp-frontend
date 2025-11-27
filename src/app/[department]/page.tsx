import { notFound } from "next/navigation";
import React from "react";
import DepartmentLanding from "@/components/department/DepartmentLanding";
import { DepartmentKey } from "@/constants/department";

export async function generateStaticParams() {
  return [
    { department: "womenswear" },
    { department: "menswear" },
    { department: "kidswear" },
  ];
}

export default async function DepartmentPage({
  params,
}: {
  params: Promise<{ department: string }>;
}) {
  const { department } = await params;
  const key = department as DepartmentKey;
  if (!["womenswear", "menswear", "kidswear"].includes(key)) {
    notFound();
  }

  return <DepartmentLanding department={key} />;
}
