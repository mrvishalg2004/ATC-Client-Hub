import type { Metadata } from "next";
import { PT_Sans } from "next/font/google";

import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const ptSans = PT_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: 'ATC Client Hub',
  description: 'A simple tool to organize, track, and manage client projects.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={ptSans.variable}>
      <body className="font-body antialiased">
        {children}
        <Toaster />
      </body>
    </html>
  );
}
