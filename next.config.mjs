/** @type {import('next').NextConfig} */
const nextConfig = {
	output: "standalone",
	productionBrowserSourceMaps: false,
	reactProductionProfiling: true,
	compress: true,
	turbopack: {
		root: process.cwd(),
	},
};

export default nextConfig;
