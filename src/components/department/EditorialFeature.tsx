import React from 'react';
import Link from 'next/link';

import { Jhumka } from '@/assets';

export default function EditorialFeature({ 
	image, 
	title, 
	description 
}: { 
	image: { src: string };
	title?: string;
	description?: string;
}) {
	const defaultTitle = "How to master party season";
	const defaultDescription = "Perfect styles to see every dress code, courtesy of Cherina Hreem and more.";
	
	return (
		<section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center my-16">
			<div>
				<h3 className="text-[18px] text-gray-900 mb-3">{title || defaultTitle}</h3>
				<p className="text-sm text-gray-600 mb-4">
					{description || defaultDescription}
				</p>
				<Link href="#" className="text-xs border border-gray-300 px-4 py-1.5 rounded hover:bg-gray-50">
					Shop Now
				</Link>
			</div>
			<div className="w-full">
				<img src={image.src} alt="Editorial feature" className="w-full h-auto rounded bg-gray-100" />
			</div>
		</section>
	);
}


