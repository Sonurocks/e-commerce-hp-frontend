import React from 'react';
import { Product } from '@/constants/department';

export default function ProductCard({ product, showBadge = false }: { product: Product; showBadge?: boolean }) {
	return (
		<article className="group">
			<div className="relative">
				{showBadge && product.badge && (
					<span className="absolute left-2 top-2 z-10 text-[11px] bg-gray-100 border border-gray-300 text-gray-800 px-2 py-0.5 rounded">
						{product.badge}
					</span>
				)}
				<img src={product.image.src} alt={product.title} className="w-full h-[400px] g-gray-100" />
			</div>
			<div className="mt-2">
				<h3 className="text-sm text-gray-900">{product.title}</h3>
				{product.subtitle && <p className="text-xs text-gray-500">{product.subtitle}</p>}
				{product.price && <p className="text-sm text-gray-900 mt-0.5">{product.price}</p>}
			</div>
		</article>
	);
}


