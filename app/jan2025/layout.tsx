import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Continuous AI - January Dinner",
  description: "San Francisco · January 2025",
  openGraph: {
    type: "website",
    title: "You're Invited — Continuous AI January Dinner",
    description: "San Francisco · January 2025",
    images: [
      {
        url: "/jan2025/og-image.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "You're Invited — Continuous AI January Dinner",
    description: "San Francisco · January 2025",
    images: ["/jan2025/og-image.png"],
  },
};

export default function Jan2025Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        html, body {
          background: #0a0a0b;
          margin: 0;
          padding: 0;
        }
        .jan2025-page {
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .jan2025-page.loaded {
          opacity: 1;
        }
        img {
          max-width: 16px;
          max-height: 16px;
        }
      `}} />
      {children}
    </>
  );
}
