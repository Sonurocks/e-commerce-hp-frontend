import React from 'react';
import { Product } from '@/constants/department';

export default function TrendingGrid({ items }: { items: Product[] }) {
	return (
		<section className="my-10">
			<h3 className="text-[20px] text-(--color-preto) mb-10">Trending now</h3>
			<div className="grid grid-cols-2 md:grid-cols-4 gap-6">
				{items.map((t) => (
					<div key={t.id}>
						<img src={t.image.src} alt={t.title} className="w-full h-auto" />
						<div className="mt-2 text-left">
							<p className="text-sm font-base text-(--color-preto) ">{t.title}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}


