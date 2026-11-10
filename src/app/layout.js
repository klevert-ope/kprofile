import { site } from "@/lib/site";
import "./globals.css";

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: "%s | " + site.name },
  description: site.description,
  openGraph: { type: "website", siteName: site.name },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
