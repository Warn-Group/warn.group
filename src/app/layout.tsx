import type { Metadata } from "next";
import "./globals.css";

import SplineComp from "@/components/spline/spline";
import HeaderComp from "@/components/header/header";


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
      <body>
        <HeaderComp/>
        <SplineComp/>
        {children}
      </body>
    </html>
  );
}
