import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google"; // Added Inter for main font
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});


export const metadata: Metadata = {
  title: "Campus Amigo - Your Student Buddy",
  description: "Find meals, share notes, get PYQs and event updates.",
};

import { getCurrentUser } from "@/app/actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userRaw = await getCurrentUser();
  // Serialize to avoid passing Date objects to Client Component
  const user = userRaw ? { ...userRaw, createdAt: userRaw.createdAt.toISOString() } : null;

  return (
    <html lang="en" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased min-h-full flex flex-col font-sans bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50`}
      >
        <Navbar user={user} />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
