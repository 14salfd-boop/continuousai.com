import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Continuous AI",
  description: "As AI capabilities grow exponentially, we're shifting from just-in-time prompting to spec-driven development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Molengo&display=swap" rel="stylesheet" />
      </head>
      <body className="font-['Molengo',sans-serif]">
        {children}
      </body>
    </html>
  );
}
