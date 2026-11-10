import { Desktop } from "@/components/desktop";
import { site } from "@/lib/site";

export const metadata = {
  title: { absolute: "Klevert Opee — Software Engineer" },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: "Klevert Opee — Software Engineer",
    description: site.description,
    url: "/",
    type: "website",
    images: ["/social.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Klevert Opee — Software Engineer",
    description: site.description,
    images: ["/social.png"],
  },
};

export default function Home() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    jobTitle: "Software Engineer",
    sameAs: [site.github, site.linkedin],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(person).replace(/</g, "\\u003c"),
        }}
      />
      <Desktop />
    </>
  );
}
