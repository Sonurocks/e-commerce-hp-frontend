import React from 'react';

export default function DownloadAppBanner() {
	return (
		<section className="my-12 rounded border border-gray-200 p-6">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
				<div className="md:col-span-2">
					<h3 className="text-sm font-medium text-gray-900 mb-2">DOWNLOAD THE FARFETCH APP</h3>
					<p className="text-sm text-gray-600">
						Buy now or later with ease. Receive personalized product alerts and track your orders.
					</p>
					<form className="mt-4 flex gap-3">
						<input
							type="email"
							placeholder="Enter your email"
							className="w-full md:w-96 border border-gray-300 px-3 py-2 text-sm"
						/>
						<button type="button" className="px-4 py-2 text-sm bg-black text-white">
							Send link
						</button>
					</form>
				</div>
				<div className="flex md:justify-end">
					<div className="w-28 h-28 border border-gray-300 rounded flex items-center justify-center text-xs text-gray-600">
						QR CODE
					</div>
				</div>
			</div>
		</section>
	);
}


