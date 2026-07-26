import type { Metadata } from "next";
import { Fira_Code, Fira_Sans } from "next/font/google";
import "./globals.css";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
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
    <html lang="es">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Material Symbols — stylesheet directo para SSR compatible */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,200,0,0&display=swap"
        />
      </head>
      <body className={`${firaSans.variable} ${firaCode.variable} bg-background text-foreground min-h-screen font-sans`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-white focus:px-4 focus:py-2 focus:text-primary-strong focus:shadow-lg">
          Ir al contenido principal
        </a>
        {children}
      </body>
    </html>
  );
}
