import React from 'react';
import { Jhumka } from '@/assets';

export default function HeroBanner({ image }: { image: { src: string } }) {
	return (
		<section className="my-12">
			<img src={image.src} alt="Hero banner" className="w-full h-auto rounded bg-gray-100" />
		</section>
	);
}


