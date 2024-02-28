import type { Metadata } from "next";
import { Lato, DM_Sans } from 'next/font/google'

import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from '@vercel/analytics/react';

import HeaderComp from "@/components/header/header";

import { AuthContextProvider } from "./context/users";
import NextUIProviderComp from "./ui/nextprovider";

import "@/app/styles/globals.scss";

const lato = Lato({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin']
});

const dm_sans = DM_Sans({
  weight: ['400', '700', '800'],
  style: ['normal'],
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: "Warn",
  description: "warn.group",
  applicationName: "Warn",
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} ${dm_sans.className}`}>
        <NextUIProviderComp>
          <HeaderComp/>

          <AuthContextProvider>
            {children}
          </AuthContextProvider>
        </NextUIProviderComp>

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
