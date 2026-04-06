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
  title: "Human-Centered Builder | Small Modules. Real Solutions. 7-Day Launch.",
  description: "Transform messy, real-world workflows into clean, automated modules. Not just AI playground—we build real solutions for real friction. 3 slots per month, 7-day launch protocol.",
  keywords: ["AI Builder", "Automation", "Small Modules", "Real Solutions", "7-Day Launch", "Workflow Automation"],
  authors: [{ name: "Human-Centered Builder" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Human-Centered Builder | Small Modules. Real Solutions.",
    description: "Transform messy, real-world workflows into clean, automated modules.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Human-Centered Builder",
    description: "Small Modules. Real Solutions. 7-Day Launch.",
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
