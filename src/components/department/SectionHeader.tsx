import React from 'react';
import Link from 'next/link';

export default function SectionHeader({ title, cta }: { title: string; cta?: { href: string; label: string } }) {
	return (
		<div className="flex items-center justify-between mb-5">
			<h2 className="text-[18px] font-medium text-gray-900">{title}</h2>
			{cta && (
				<Link href={cta.href} className="text-xs border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">
					{cta.label}
				</Link>
			)}
		</div>
	);
}


