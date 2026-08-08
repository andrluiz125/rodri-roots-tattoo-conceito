import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import "./marquee.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://rodri-roots-tattoo-conceito.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Rodri Roots Tattoo | Tatuagens Autorais em São Paulo",
  description: "Tatuagens autorais e projetos personalizados criados com intenção, técnica e cuidado em São Paulo.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Rodri Roots Tattoo | Sua história marcada para sempre",
    description: "Projetos autorais, coberturas e tatuagens personalizadas em São Paulo.",
    url: siteUrl,
    siteName: "Rodri Roots Tattoo",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "/og-rodri-roots.jpg",
        width: 1200,
        height: 630,
        alt: "Rodri Roots Tattoo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rodri Roots Tattoo | Sua história marcada para sempre",
    description: "Projetos autorais, coberturas e tatuagens personalizadas em São Paulo.",
    images: ["/og-rodri-roots.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preload" as="image" href="/images/hero.webp" type="image/webp" media="(min-width: 901px)" />
        <link rel="preload" as="image" href="/images/hero-mobile.webp" type="image/webp" media="(max-width: 900px)" />
      </head>
      <body className={`${inter.variable} ${fraunces.variable} antialiased`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "TattooParlor",
              name: "Rodri Roots Tattoo",
              url: siteUrl,
              logo: `${siteUrl}/images/logo-rodri-roots.webp`,
              image: `${siteUrl}/og-rodri-roots.jpg`,
              sameAs: ["https://www.instagram.com/rodri.roots.tattoo/"],
              address: {
                "@type": "PostalAddress",
                addressLocality: "São Paulo",
                addressRegion: "SP",
                addressCountry: "BR",
              },
              areaServed: "São Paulo",
            }).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
