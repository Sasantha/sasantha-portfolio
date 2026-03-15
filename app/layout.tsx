import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { profile } from "@/content/profile";
import { targetKeywords } from "@/content/seo";
import { ThemeToggle } from "@/components/theme-toggle";

const siteUrl = "https://spperera.me";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Sasantha Perera | Full-Stack Web Developer in Sri Lanka",
    template: "%s | Sasantha Perera",
  },
  description:
    "Sasantha Perera is a modern full-stack web developer in Sri Lanka helping businesses launch high-converting websites, eCommerce platforms, and custom web applications with Next.js and ASP.NET.",
  keywords: targetKeywords,
  authors: [{ name: profile.name, url: siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "OZxMa6-p35bxHCItQpB6eEenGXy9pVxczKarXWXh7aU",
  },
  openGraph: {
    title: "Sasantha Perera | Full-Stack Web Developer in Sri Lanka",
    description:
      "Hire Sasantha Perera for business websites, eCommerce development, and modern full-stack web apps in Sri Lanka.",
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "spperera.me",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: `${profile.name} portfolio preview`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sasantha Perera | Full-Stack Web Developer in Sri Lanka",
    description:
      "Modern web developer in Sri Lanka for business websites, ecommerce websites, and full-stack app development.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Sasantha Perera Portfolio",
    url: siteUrl,
    inLanguage: "en",
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl}/projects?query={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: siteUrl,
    image: `${siteUrl}/og.png`,
    jobTitle: "Full-Stack Web Developer",
    description:
      "Full-stack web developer in Sri Lanka specializing in business websites, ecommerce platforms, and modern web applications.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Piliyandala",
      addressCountry: "LK",
    },
    sameAs: [
      profile.socials.github,
      profile.socials.linkedin,
      profile.socials.upwork,
      profile.socials.freelancer,
    ],
    knowsAbout: [
      "Next.js",
      "React",
      "Node.js",
      "ASP.NET",
      "Website Design",
      "Web Design",
      "Frontend Development",
      "Backend Development",
      "Ecommerce Website Development",
      "Business Website Development",
      "Full Stack Development",
    ],
    makesOffer: {
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: "Freelance Web Development Services",
        serviceType: "Business Website and Ecommerce Development",
      },
      areaServed: "Sri Lanka",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/contact`,
    },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Sasantha Perera Web Development",
    url: siteUrl,
    image: `${siteUrl}/og.png`,
    areaServed: "Sri Lanka",
    founder: profile.name,
    description:
      "Modern full-stack web development for business websites, ecommerce stores, and custom web apps.",
    serviceType: [
      "Web Developer for Hire",
      "Full Stack Developer for Hire",
      "Front End Developer",
      "Back End Developer",
      "Professional Website Designer",
      "Business Website Development",
      "Ecommerce Website Development",
      "Full-Stack Web Application Development",
    ],
    knowsAbout: ["Next.js", "React", "Node.js", "ASP.NET", "TypeScript"],
    potentialAction: {
      "@type": "ContactAction",
      target: `${siteUrl}/contact`,
      name: "Request a project quote",
    },
  };

  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 sm:px-6 lg:px-8">
          <header className="nav-shell sticky top-0 z-50 mt-3 border border-slate-200/80 bg-white/95 shadow-sm backdrop-blur">
            <nav
              aria-label="Primary"
              className="flex items-center justify-between px-4 py-3 sm:px-6"
            >
              <Link href="/" className="nav-text text-sm font-semibold tracking-wide">
                {profile.name}
              </Link>
              <ul className="nav-text flex items-center gap-4 text-sm text-slate-600 sm:gap-6">
                <li>
                  <Link className="nav-link" href="/#about">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" href="/projects">
                    Projects
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" href="/contact">
                    Contact
                  </Link>
                </li>
                <li>
                  <ThemeToggle />
                </li>
              </ul>
            </nav>
          </header>
          <main className="flex-1 py-10">{children}</main>
          <footer className="border-t border-slate-200 py-6 text-center text-sm text-slate-500">
            <p>(c) {new Date().getFullYear()} {profile.name}. Built with Next.js and Tailwind.</p>
          </footer>
          <Analytics />
        </div>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
      </body>
    </html>
  );
}
