import type { Metadata } from "next";
import { Inter } from 'next/font/google'
import { SpeedInsights } from "@vercel/speed-insights/next"

import SplineComp from "@/components/spline/spline";
import HeaderComp from "@/components/header/header";

import "@/app/globals.css";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Warn",
  description: "warn.group",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <HeaderComp/>
        <SplineComp/>
        {children}
        <SpeedInsights />
      </body>
    </html>
  );
}
