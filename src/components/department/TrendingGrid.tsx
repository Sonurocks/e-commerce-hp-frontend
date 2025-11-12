import React from 'react';
import { Product } from '@/constants/department';

export default function TrendingGrid({ items }: { items: Product[] }) {
	return (
		<section className="my-10">
			<h3 className="text-[16px] text-gray-900 mb-4">Trending now</h3>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
				{items.map((t) => (
					<div key={t.id} className="rounded overflow-hidden border border-gray-200">
						<img src={t.image.src} alt={t.title} className="w-full h-auto bg-gray-100" />
					</div>
				))}
			</div>
		</section>
	);
}


