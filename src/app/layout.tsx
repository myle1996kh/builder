import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Decompose | Break It Down. Ship It Fast.",
  description: "Every problem can be decomposed. Once it is decomposed, it can be solved. Problem-first AI implementation — 7-day delivery, 3 slots per month.",
  keywords: ["Decompose", "AI Implementation", "Automation", "Workflow", "Problem Solving", "7-Day Launch"],
  authors: [{ name: "Decompose" }],
  icons: {
    icon: "/favicon.png",
  },
  openGraph: {
    title: "Decompose | Break It Down. Ship It Fast.",
    description: "Every problem can be decomposed. Once it is decomposed, it can be solved.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Decompose",
    description: "Break It Down. Ship It Fast.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
