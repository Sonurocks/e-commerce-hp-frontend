import React from 'react';
import { IoMdHelpCircleOutline } from "react-icons/io";
import { PiCoatHangerBold } from "react-icons/pi";

export default function HelpCards() {
	return (
		<section className=" py-12 px-2">
			<div className="max-w-12xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{/* HOW TO SHOP Card */}
					<div className="border border-gray-300 rounded-lg py-4 px-6 flex flex-col items-start">
						<div className="mb-2">
							<PiCoatHangerBold className="text-[var(--theme-text)]" size={28} />
						</div>
						<h3 className="text-base font-base uppercase text-[var(--color-preto)] mb-1">
							HOW TO SHOP
						</h3>
						<p className="text-normal font-base text-(--color-preto)">
							Your guide to shopping and placing orders
						</p>
					</div>

					{/* FAQS Card */}
					<div className="border border-gray-300 rounded-lg py-4 px-6 flex flex-col items-start">
						<div className="mb-2">
							<IoMdHelpCircleOutline className="text-[var(--theme-text)]" size={28} />
						</div>
						<h3 className="text-base font-base uppercase text-(--color-preto) mb-1">
							FAQS
						</h3>
						<p className="text-normal font-base text-(--color-preto)">
							Your questions answered
						</p>
					</div>

					{/* NEED HELP? Card */}
					<div className="border border-gray-300 rounded-lg py-4 px-6 flex flex-col items-start">
						<div className="mb-2">
							<svg 
								width="28" 
								height="28" 
								viewBox="0 0 24 24" 
								fill="none" 
								stroke="currentColor" 
								strokeWidth="1.5" 
								strokeLinecap="round" 
								strokeLinejoin="round"
								className="text-[var(--theme-text)]"
							>
								<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
							</svg>
						</div>
						<h3 className="text-base font-base uppercase  text-(--color-preto) mb-1">
							NEED HELP?
						</h3>
						<p className="text-normal font-base  text-(--color-preto)">
							Contact our global Customer Service team
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}

