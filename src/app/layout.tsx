import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const siteUrl = "https://www.dsc-utp.site";
const siteName = "ML Laboratory | DSC UTP";
const siteDescription =
  "Comunidad universitaria de Machine Learning, Inteligencia Artificial y Ciencia de Datos en la UTP. Aprende, colabora y construye soluciones reales que impactan el mundo.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${siteName} — Comunidad de IA y Data Science`,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  keywords: [
    "Machine Learning",
    "Inteligencia Artificial",
    "Data Science",
    "UTP",
    "DSC UTP",
    "Peru",
    "Deep Learning",
    "Redes Neuronales",
    "Ciencia de Datos",
    "comunidad IA universitaria",
    "ML Laboratory",
    "aprender machine learning Peru",
    "Computer Vision",
    "LLM",
    "MLOps",
  ],
  authors: [{ name: "ML Laboratory DSC UTP", url: siteUrl }],
  creator: "ML Laboratory DSC UTP",
  publisher: "ML Laboratory DSC UTP",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: siteUrl,
    siteName,
    title: `${siteName} — Comunidad de IA y Data Science`,
    description: siteDescription,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ML Laboratory DSC UTP — Comunidad de Inteligencia Artificial",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteName} — Comunidad de IA`,
    description: siteDescription,
    images: ["/og-image.png"],
  },
  category: "education",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${siteUrl}/#organization`,
      name: "ML Laboratory DSC UTP",
      alternateName: ["ML Laboratory", "DSC UTP", "Data Science Community UTP"],
      url: siteUrl,
      description: siteDescription,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/og-image.png`,
      },
      memberOf: {
        "@type": "CollegeOrUniversity",
        name: "Universidad Tecnológica del Perú",
        alternateName: "UTP",
      },
      address: {
        "@type": "PostalAddress",
        addressLocality: "Lima",
        addressCountry: "PE",
      },
      knowsAbout: [
        "Machine Learning",
        "Inteligencia Artificial",
        "Data Science",
        "Deep Learning",
        "Redes Neuronales",
        "Computer Vision",
        "MLOps",
        "LLM",
        "Ciencia de Datos",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "es",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: `${siteUrl}/blog?q={search_term_string}`,
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: `${siteName} — Comunidad de IA y Data Science`,
      description: siteDescription,
      inLanguage: "es",
      isPartOf: { "@id": `${siteUrl}/#website` },
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "¿Qué es ML Laboratory DSC UTP?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ML Laboratory es la comunidad universitaria de Machine Learning, Inteligencia Artificial y Ciencia de Datos de la Universidad Tecnológica del Perú (UTP), parte del programa Developer Student Clubs (DSC).",
          },
        },
        {
          "@type": "Question",
          name: "¿Cómo puedo unirme a ML Laboratory?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Puedes unirte a ML Laboratory completando el formulario de contacto en nuestra página web, asistiendo a nuestros eventos o presentando una ponencia sobre IA o Data Science.",
          },
        },
        {
          "@type": "Question",
          name: "¿Qué aprendo en ML Laboratory DSC UTP?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "En ML Laboratory aprenderás Machine Learning, Deep Learning, Redes Neuronales, Computer Vision, LLMs, MLOps, Ciencia de Datos aplicada y desarrollo de soluciones reales de Inteligencia Artificial.",
          },
        },
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning className="dark selection:bg-foreground selection:text-background">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Material Symbols — preload then apply non-blocking */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0&display=swap"
          as="style"
          // @ts-expect-error onLoad is valid for preload link
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0&display=swap"
          />
        </noscript>
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} bg-background text-foreground min-h-screen font-sans`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
