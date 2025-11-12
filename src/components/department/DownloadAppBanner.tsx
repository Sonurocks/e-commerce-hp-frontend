import React from 'react';

export default function DownloadAppBanner() {
	return (
		<section className="bg-white py-12 px-2">
			<div className="max-w-12xl mx-auto">
				<div className="grid grid-cols-1 md:grid-cols-12 gap-20">
					{/* Left Section: DOWNLOAD THE FARFETCH APP */}
					<div className="flex flex-col md:col-span-6">
						<h2 className="text-xl md:text-3xl font-base text-[var(--color-preto)] mb-4 leading-tight">
							DOWNLOAD THE FARFETCH APP
						</h2>
						<p className="text-sm md:text-sm font-normal  text-[var(--color-preto)] mb-4 leading-relaxed">
							Enjoy exclusive content on our app, including personalised product edits as well as our Visual Search tool for iOS. <a 
								href="#" 
								className="text-sm md:text-sm font-normal text-[var(--color-preto)] underline hover:text-gray-900 transition-colors"
							>
								More about the app
							</a>
						</p>
					</div>

					{/* Right Section: EMAIL ME and SCAN QR CODE in horizontal stack */}
					<div className="flex flex-col md:flex-row gap-8 md:col-span-6 md:items-start">
						{/* EMAIL ME Section */}
						<div className="flex flex-col min-w-[360px] md:-ml-8">
							<h3 className="text-sm md:text-base font-base text-[var(--color-preto)] mb-2">
								EMAIL ME
							</h3>
							<p className="text-sm md:text-sm font-normal text-[var(--color-preto)] mb-4 leading-relaxed whitespace-nowrap">
								Enter your email and we will send you a link to download the free app
							</p>
							<form className="flex flex-col gap-3">
								<input
									type="email"
									placeholder="Email address"
									className="w-full max-w-[320px] border border-black rounded px-4 py-3 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
								/>
								<button 
									type="button" 
									className="self-start bg-black text-white rounded-lg px-5 py-3 text-sm font-normal hover:bg-gray-800 transition-colors"
								>
									Send
								</button>
							</form>
						</div>

						{/* Vertical divider */}
						<div className="hidden md:block w-px h-full bg-gray-300 mx-1"></div>

						{/* SCAN QR CODE Section */}
						<div className="flex flex-col items-start md:items-end">
							<h3 className="text-sm md:text-base font-base text-[var(--color-preto)] mb-4">
								SCAN QR CODE
							</h3>
							<div className="w-[130px] h-[110px] bg-white border-2 border-black flex items-center justify-center">
								{/* QR Code placeholder - you can replace this with an actual QR code image */}
								<svg 
									width="80" 
									height="80" 
									viewBox="0 0 160 160" 
									className="w-full h-full"
									fill="black"
								>
									{/* Simple QR code pattern representation */}
									<rect x="0" y="0" width="160" height="160" fill="white"/>
									<rect x="10" y="10" width="40" height="40" fill="black"/>
									<rect x="20" y="20" width="20" height="20" fill="white"/>
									<rect x="110" y="10" width="40" height="40" fill="black"/>
									<rect x="120" y="20" width="20" height="20" fill="white"/>
									<rect x="10" y="110" width="40" height="40" fill="black"/>
									<rect x="20" y="120" width="20" height="20" fill="white"/>
									<rect x="60" y="60" width="10" height="10" fill="black"/>
									<rect x="80" y="60" width="10" height="10" fill="black"/>
									<rect x="100" y="60" width="10" height="10" fill="black"/>
									<rect x="60" y="80" width="10" height="10" fill="black"/>
									<rect x="100" y="80" width="10" height="10" fill="black"/>
									<rect x="60" y="100" width="10" height="10" fill="black"/>
									<rect x="80" y="100" width="10" height="10" fill="black"/>
									<rect x="100" y="100" width="10" height="10" fill="black"/>
									<rect x="130" y="60" width="10" height="10" fill="black"/>
									<rect x="140" y="70" width="10" height="10" fill="black"/>
									<rect x="130" y="80" width="10" height="10" fill="black"/>
									<rect x="60" y="130" width="10" height="10" fill="black"/>
									<rect x="70" y="140" width="10" height="10" fill="black"/>
									<rect x="80" y="130" width="10" height="10" fill="black"/>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}


