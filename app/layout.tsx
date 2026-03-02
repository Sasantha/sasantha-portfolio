import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { profile } from "@/content/profile";
import { ThemeToggle } from "@/components/theme-toggle";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sasantha-portfolio.vercel.app"),
  title: {
    default: `${profile.name} | ${profile.title}`,
    template: `%s | ${profile.name}`,
  },
  description: profile.summary,
  openGraph: {
    title: `${profile.name} | ${profile.title}`,
    description: profile.summary,
    type: "website",
    locale: "en_US",
    url: "https://sasantha-portfolio.vercel.app",
    siteName: `${profile.name} Portfolio`,
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | ${profile.title}`,
    description: profile.summary,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        </div>
      </body>
    </html>
  );
}
