'use client';

import React, { useState } from 'react';
import { Product } from '@/constants/department';
import { GoHeart } from 'react-icons/go';

export default function ProductCard({ product, showBadge = false }: { product: Product; showBadge?: boolean }) {
	const [isHovered, setIsHovered] = useState(false);
	const [isWishlisted, setIsWishlisted] = useState(false);
	const currentImage = isHovered && product.hoverImage ? product.hoverImage : product.image;

	const handleWishlistClick = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		setIsWishlisted(!isWishlisted);
	};

	const isImageBadge = product.badge === 'Extra 25% off';
	const isTextBadge = product.badge && product.badge !== 'Extra 25% off';

	return (
		<article className="group">
			<div className="relative bg-gray w-full h-[400px] flex items-center justify-center">
				<button
					onClick={handleWishlistClick}
					className="absolute top-2 right-2 z-10 p-2 bg-white/80 hover:bg-white rounded-full transition-colors"
					aria-label="Add to wishlist"
				>
					<GoHeart 
						className={`w-5 h-5 ${isWishlisted ? 'fill-black text-[var(--color-preto)]"' : 'text-(--color-preto)'}`} 
						strokeWidth={1.0}
					/>
				</button>
				{showBadge && isImageBadge && (
					<div className="absolute top-2 left-2 z-10">
						<p className="text-[15px] text-gray-500 bg-white/80 px-2 py-1">{product.badge}</p>
					</div>
				)}
				<img 
					src={currentImage.src} 
					alt={product.title} 
					className="max-w-full max-h-full object-contain"
					onMouseEnter={() => setIsHovered(true)}
					onMouseLeave={() => setIsHovered(false)}
				/>
			</div>
			<div className="mt-2">
				<div className="h-5 mb-1">
					{showBadge && isTextBadge && (
						<p className="text-[15px] text-gray-500">{product.badge}</p>
					)}
				</div>
				<h3 className="text-m text-(--color-preto) font-semibold">{product.title}</h3>
				{product.subtitle && <p className="text-sm text-(--color-preto)">{product.subtitle}</p>}
				{product.price && <p className="text-sm text-(--color-preto) mt-3">{product.price}</p>}
			</div>
		</article>
	);
}


