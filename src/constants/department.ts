import { womenJpeg as Women, Belt, kidswear, Skirt, bag as Bag, necklace as Necklace, Shoes, Wallet, Shirt, jacket1, jacket2, bag1, bag2, jean1, jean2, boot1, boot2, menjacket1, menjacket2, shoes1, shoes2, warmer1, warmer2, menjean1, menjean2, kidshoe1, kidshoe2, kidssweater1, kidssweater2, white1, white2, pink1, pink2, partyDress1, partyDress2, partyShoe1, partyShoe2, partyCoat1, partyCoat2, partyJean1, partyJean2, partyWatchMen1, partyWatchMen2, partyBracelet1, partyBracelet2, partyGold1, editorialMenswear, editorialKidswear, trendingBag, trendingDress, trendingHome, trendingLuxury, trendingMenShoe, trendingMen, trendingMenLuxury, trendingBelt, partyGold2, partypinkwatch1, partypinkwatch2, partyWomenRed1, partyWomenRed2, partyCheck1, partyCheck2, partyPolo1, partyPolo2, partyBlack1, partyBlack2 } from "@/assets";

export type DepartmentKey = 'womenswear' | 'menswear' | 'kidswear';



export type Product = {
	id: string;
	title: string;
	subtitle?: string;
	price?: string;
	image: { src: string };
	hoverImage?: { src: string };
	badge?: string;
};

const withBadge = (p: Product): Product => ({ ...p, badge: 'Extra 25% off' });

// Department-specific titles for each section
const featuredTitlesByDept: Record<DepartmentKey, string[]> = {
	womenswear: ['Gold chain bag', 'Sequin skirt', 'Stiletto heels', 'Faux fur coat'],
	menswear: ['Leather belt', 'Oxford shoes', 'Linen shirt', 'Tailored blazer'],
	kidswear: ['Graphic hoodie', 'Light-up sneakers', 'Printed dress', 'Puffer jacket'],
};

const newInTitlesByDept: Record<DepartmentKey, string[]> = {
	womenswear: ['Wrap skirt', 'Shoulder bag', 'Tailored pants', 'Mini clutch'],
	menswear: ['Cargo trousers', 'Crossbody bag', 'Denim jacket', 'Beanie'],
	kidswear: ['Jogger pants', 'Backpack', 'Raincoat', 'Sneaker socks'],
};

const partyTitlesByDept: Record<DepartmentKey, string[]> = {
	womenswear: ['Crystal sandals', 'Bow earrings', 'Platform heel', 'Metallic clutch'],
	menswear: ['Loafers', 'Silk tie', 'Chelsea boots', 'Leather wallet'],
	kidswear: ['Party shoes', 'Bow headband', 'Velcro sandals', 'Mini shoulder bag'],
};

export const partySectionTitleByDept: Record<DepartmentKey, string> = {
	womenswear: 'Statement knitwear',
	menswear: 'Watches and fine jewelry',
	kidswear: 'Party plus-ones',
};

const trendingTitlesByDept: Record<DepartmentKey, string[]> = {
	womenswear: ['PRE-OWNED TREASURES', 'PARTY BRANDS TO KNOW', 'SMALL LUXURIES', 'HOSTING AT HOME'],
	menswear: ['MOST-WANTED SNEAKERS', 'NEUTRAL DENIM', 'SMALL LUXURIES', 'PARTY SHOES AND ACCESSORIES'],
	kidswear: ['Jackets', 'Trainers', 'Hoodies', 'Bags'],
};

const imageByDepartment: Record<DepartmentKey, { src: string }> = {
	womenswear: Women,
	menswear: Belt,
	kidswear: kidswear,
};

const buildList = (titles: string[], img: { src: string }): Product[] =>
	titles.map((t, i) => ({ id: `${t}-${i}`, title: t, image: img }));

export const featuredPromoCardsByDept: Record<DepartmentKey, Product[]> = {
	womenswear: featuredTitlesByDept.womenswear.map((title, i) => {
		const img = [Skirt, Bag, Necklace, Women][i] ?? Women;
		const price = ['$249', '$155', '$129', '$318'][i];
		return withBadge({ id: `w-featured-${i}`, title, image: img, price });
	}),
	menswear: featuredTitlesByDept.menswear.map((title, i) => {
		const img = [Belt, Shoes, Shirt, Wallet][i] ?? Belt;
		const price = ['$120', '$220', '$80', '$350'][i];
		return withBadge({ id: `m-featured-${i}`, title, image: img, price });
	}),
	kidswear: buildList(featuredTitlesByDept.kidswear, imageByDepartment.kidswear).map(withBadge),
};

export const newInProductsByDept: Record<DepartmentKey, Product[]> = {
	womenswear: [
		{ id: 'w-newin-0', title: 'ISABEL MARANT', subtitle: 'Aglae animal-print coat', price: '$1,745', image: jacket1, hoverImage: jacket2, badge: 'New Season' },
		{ id: 'w-newin-1', title: 'Acne Studios', subtitle: 'zip-fastening tote bag', price: '$2,296', image: bag1, hoverImage: bag2 },
		{ id: 'w-newin-2', title: 'OUR LEGACY', subtitle: 'Wata Cut jeans', price: '$872', image: jean1, hoverImage: jean2, badge: 'New Season' },
		{ id: 'w-newin-3', title: 'A.EMERY', subtitle: 'Ophelia pointed-toe boots', price: '$1,575', image: boot1, hoverImage: boot2 },
	],
	menswear: [
		{ id: 'm-newin-0', title: 'Jil Sander', subtitle: 'Melton zip-up wool bomber jacket', price: '$2,248', image: menjacket1, hoverImage: menjacket2 },
		{ id: 'm-newin-1', title: 'Dolce & Gabbana', subtitle: 'Suede Inserts Embossed Logo sneakers', price: '$1,233', image: shoes1, hoverImage: shoes2 ,badge: 'New Season' },
		{ id: 'm-newin-2', title: 'Stone Island', subtitle: 'turtleneck logo-patch sweater', price: '$870', image: warmer1, hoverImage: warmer2,  },
		{ id: 'm-newin-3', title: 'OUR LEGACY', subtitle: 'Third Cut cotton jeans', price: '$860', image: menjean1, hoverImage: menjean2, badge: 'Extra 25% off' },
	],
	kidswear: [
		{ id: 'k-newin-0', title: 'Polo Ralph Lauren Kids', subtitle: 'Polo Bear sweatshirt', price: '$381', image: white1, hoverImage: white2, badge: 'Extra 25% off' },
		{ id: 'k-newin-1', title: 'Moncler Enfant', subtitle: 'Ghany zip-up padded gilet', price: '$783', image: pink1, hoverImage: pink2 },
		{ id: 'k-newin-2', title: 'Golden Goose Kids', subtitle: 'Ball Star calf hair sneakers', price: '$404', image: kidshoe1, hoverImage: kidshoe2, badge: 'New Season' },
		{ id: 'k-newin-3', title: 'Moncler Grenoble', subtitle: 'crew neck sweater', price: '$684', image: kidssweater1, hoverImage: kidssweater2 },
	],
};

export const partyPlusOnesByDept: Record<DepartmentKey, Product[]> = {
	womenswear: [
		{ id: 'w-party-0', title: 'Valentino Garavani', subtitle: 'virgin wool sweater', price: '$1,750', image: partyWomenRed1, hoverImage: partyWomenRed2, badge: 'New Season' },
		{ id: 'w-party-1', title: 'GANNI', subtitle: 'flower-crochet sweater', price: '$743', image:  partyBlack1, hoverImage: partyBlack2},
		{ id: 'w-party-2', title: 'Polo Ralph Lauren', subtitle: 'Ralph Lauren Sweaters', price: '$1,209', image: partyPolo1, hoverImage: partyPolo2, badge: 'Extra 25% off' },
		{ id: 'w-party-3', title: 'KHAITE', subtitle: 'Anders argyle sweater', price: '$3,069', image:partyCheck1, hoverImage:partyCheck2  },
	],
	menswear: [
		{ id: 'm-party-0', title: 'Versace', subtitle: 'Greca GMT 41mm', price: '$1,848', image: partyWatchMen1, hoverImage: partyWatchMen2, badge: 'Extra 25% off' },
		{ id: 'm-party-1', title: 'D1 Milano', subtitle: 'Skeleton Bracelet 41.5mm', price: '$820', image: partypinkwatch1, hoverImage: partypinkwatch2, badge: 'Extra 25% off' },
		{ id: 'm-party-2', title: 'Nialaya Jewelry', subtitle: 'rectangle tennis bracelet', price: '$249', image: partyBracelet2, hoverImage: partyBracelet1, badge: 'Extra 25% off' },
		{ id: 'm-party-3', title: 'Tom Wood', subtitle: 'Lou chain necklace', price: '$2,693', image: partyGold1, hoverImage: partyGold2, badge: 'Extra 25% off' },
	],
	kidswear: [
		{ id: 'k-party-0', title: 'Tulleen', subtitle: 'beaded-embellishment dress', price: '$475', image: partyDress1, hoverImage: partyDress2, badge: 'Extra 25% off' },
		{ id: 'k-party-1', title: 'Dolce & Gabbana Kids', subtitle: 'nappa-leather ballet flats', price: '$648', image: partyShoe1, hoverImage: partyShoe2, badge: 'New Season' },
		{ id: 'k-party-2', title: 'Marni Kids', subtitle: 'single-breasted blazer', price: '$462', image: partyCoat1, hoverImage: partyCoat2, badge: 'Extra 25% off' },
		{ id: 'k-party-3', title: 'Balmain Kids', subtitle: 'gold-button velvet trousers', price: '$783', image: partyJean1, hoverImage: partyJean2 },
	],
};

export const trendingNowByDept: Record<DepartmentKey, Product[]> = {
	womenswear: [
		{ id: 'w-trending-0', title: 'PRE-OWNED TREASURES', image: trendingBag },
		{ id: 'w-trending-1', title: 'PARTY BRANDS TO KNOW', image: trendingDress },
		{ id: 'w-trending-2', title: 'SMALL LUXURIES', image: trendingLuxury },
		{ id: 'w-trending-3', title: 'HOSTING AT HOME', image: trendingHome },
	],
	menswear: [
		{ id: 'm-trending-0', title: 'MOST-WANTED SNEAKERS', image: trendingMenShoe },
		{ id: 'm-trending-1', title: 'NEUTRAL DENIM', image: trendingMen },
		{ id: 'm-trending-2', title: 'SMALL LUXURIES', image: trendingMenLuxury },
		{ id: 'm-trending-3', title: 'PARTY SHOES AND ACCESSORIES', image: trendingBelt },
	],
	kidswear: buildList(trendingTitlesByDept.kidswear, imageByDepartment.kidswear),
};

export type EditorialFeatureData = {
	image: { src: string };
	title: string;
	description: string;
};

export const editorialFeatureByDept: Record<DepartmentKey, EditorialFeatureData> = {
	womenswear: {
		image: imageByDepartment.womenswear,
		title: "How to master party season",
		description: "Perfect styles to see every dress code, courtesy of Cherina Hreem and more.",
	},
	menswear: {
		image: editorialMenswear,
		title: "Check, please",
		description: "Meet the brands defining the plaid revival, featuring AMI Paris and more.",
	},
	kidswear: {
		image: editorialKidswear,
		title: "Meet the most wanted",
		description: "From AMI Paris to Burberry, great gifts come in small sizes",
	},
};


