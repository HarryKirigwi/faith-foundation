'use client';

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";
import Navigation from "./layout/navigation/Navigation";
import FaithFeedsFooter from "./layout/footer/page";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();
  
  // Pages that should not have navigation and footer
  const excludedPages = ['/register', '/login', '/404'];
  const shouldExclude = excludedPages.includes(pathname);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {shouldExclude ? (
          children
        ) : (
          <>
            <Navigation />
            <main>{children}</main>
            <FaithFeedsFooter/>
          </>
        )}
      </body>
    </html>
  );
}