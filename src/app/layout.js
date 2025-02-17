import {Bowlby_One_SC, Montserrat} from "next/font/google";
import "./globals.css";

const bowlbyOneSC = Bowlby_One_SC({
	weight: "400",
	subsets: ["latin"],
	display: "swap",
	variable: "--font-bowlby-one-sc",
});

const montserrat = Montserrat({
	weight: ["400", "700"],
	subsets: ["latin"],
	display: "swap",
	variable: "--font-montserrat",
});

export const metadata = {
	title: "Klevert Opee", description: "Full stack software developer",
};

export default function RootLayout({children}) {
	const currentYear = new Date().getFullYear();

	return (<html lang="en">
	<head>
		<meta name="format-detection"
		      content="telephone=no, date=no, email=no, address=no"/>
		<meta name="viewport"
		      content="width=device-width, initial-scale=1"/>
	</head>
	<body
		className={`${montserrat.className} ${bowlbyOneSC.className} font-[family-name:var(--font-montserrat)] prose-headings:font-[family-name:var(--font-bowlby-one-sc)] p-4 antialiased prose w-full max-w-none min-h-svh flex flex-col`}>
	<main className="flex-1 container m-auto">{children}</main>
	<footer
		className="flex gap-6 flex-wrap items-center justify-center p-4">
		<small>{currentYear} Created By Klevert</small>
	</footer>
	</body>
	</html>);
}
