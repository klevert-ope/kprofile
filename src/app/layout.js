import { IBM_Plex_Mono } from "next/font/google";
import "./globals.css";

const ibmPlexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "klevert@dubai — klevertopee.app",
  description:
    "KLEVERT OPEE // Systems Engineer. High-availability trading engines, multi-tenant APIs, and agentic orchestration.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <meta
          name="format-detection"
          content="telephone=no, date=no, email=no, address=no"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="dark" />
        <meta name="theme-color" content="#070908" />
      </head>
      <body className={`${ibmPlexMono.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
