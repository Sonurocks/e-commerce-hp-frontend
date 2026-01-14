import React from "react";
import Link from "next/link";

export default function SectionHeader({
  title,
  cta,
}: {
  title: string;
  cta?: { href: string; label: string };
}) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="text-[22px] font-medium text-(--theme-text)">
        {title}
      </h2>
      {cta && (
        <Link
          href={cta.href}
          className="border  border-[var(--theme-border)]text-(--color-preto) px-4 py-2 rounded text-sm font-semibold transition-colors"
        >
          {cta.label}
        </Link>
      )}
    </div>
  );
}
