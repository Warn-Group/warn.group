import type { Metadata } from "next";
import { Lato, DM_Sans } from 'next/font/google'

import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from '@vercel/analytics/react';

import SplineComp from "@/components/spline/spline";
import HeaderComp from "@/components/header/header";

import "@/app/globals.css";

const lato = Lato({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin']
});

const dm_sans = DM_Sans({
  weight: ['700', '800'],
  style: ['normal'],
  subsets: ['latin']
});

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
      <body className={`${lato.className} ${dm_sans.className}`}>
        <HeaderComp/>
        <SplineComp/>
        {children}

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
