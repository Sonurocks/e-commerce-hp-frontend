import { Women, Belt, kidswear, Skirt, bag as Bag, necklace as Necklace, Shoes, Wallet, Shirt } from "@/assets";

export type DepartmentKey = 'womenswear' | 'menswear' | 'kidswear';



export type Product = {
	id: string;
	title: string;
	subtitle?: string;
	price?: string;
	image: { src: string };
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

const trendingTitlesByDept: Record<DepartmentKey, string[]> = {
	womenswear: ['Coats', 'Heels', 'Blazers', 'Bags'],
	menswear: ['Coats', 'Sneakers', 'Blazers', 'Belts'],
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
	womenswear: buildList(newInTitlesByDept.womenswear, imageByDepartment.womenswear),
	menswear: buildList(newInTitlesByDept.menswear, imageByDepartment.menswear),
	kidswear: buildList(newInTitlesByDept.kidswear, imageByDepartment.kidswear),
};

export const partyPlusOnesByDept: Record<DepartmentKey, Product[]> = {
	womenswear: buildList(partyTitlesByDept.womenswear, imageByDepartment.womenswear),
	menswear: buildList(partyTitlesByDept.menswear, imageByDepartment.menswear),
	kidswear: buildList(partyTitlesByDept.kidswear, imageByDepartment.kidswear),
};

export const trendingNowByDept: Record<DepartmentKey, Product[]> = {
	womenswear: buildList(trendingTitlesByDept.womenswear, imageByDepartment.womenswear),
	menswear: buildList(trendingTitlesByDept.menswear, imageByDepartment.menswear),
	kidswear: buildList(trendingTitlesByDept.kidswear, imageByDepartment.kidswear),
};


