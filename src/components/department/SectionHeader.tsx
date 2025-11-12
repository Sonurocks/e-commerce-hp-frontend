import React from 'react';
import Link from 'next/link';

export default function SectionHeader({ title, cta }: { title: string; cta?: { href: string; label: string } }) {
	return (
		<div className="flex items-center justify-between mb-5">
			<h2 className="text-[18px] font-medium text-gray-900">{title}</h2>
			{cta && (
				<Link href={cta.href} className="bg-white border border-black text-[var(--color-preto)] px-4 py-2 rounded text-sm font-semibold hover:bg-gray-50 transition-colors">
					{cta.label}
				</Link>
			)}
		</div>
	);
}


