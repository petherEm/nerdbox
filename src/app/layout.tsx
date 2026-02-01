import type { Metadata } from "next";
import { IBM_Plex_Mono, Inter } from "next/font/google";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import "./globals.css";
import { ThemeProvider } from "next-themes";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
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
    <ClerkProvider
      appearance={{
        theme: dark,
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <body className={`${inter.variable} ${plexMono.variable} antialiased`}>
          <ThemeProvider
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            attribute="class"
          >
            <SignedOut>
              <SignInButton />
              <SignUpButton>
                <button className="bg-rose-500 text-white p-2">Sign Up</button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>

            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
