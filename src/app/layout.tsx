import type { Metadata } from "next";
import { Oxanium, Source_Code_Pro, Source_Serif_4 } from "next/font/google";

import { Providers } from "@/components/providers";

import "./globals.css";

const oxanium = Oxanium({
  variable: "--font-oxanium",
  subsets: ["latin"],
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-source-code",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Nerdbox v1",
  description: "The only code editor you will ever need.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${oxanium.variable} ${sourceCodePro.variable} ${sourceSerif.variable} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
