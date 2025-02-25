// Root layout for Next.js app
import AppWalletProvider from "../components/ui/AppWalletProvider";

import { Geist, Geist_Mono } from "next/font/google"; // custom font
import "./globals.css";

// configure the font for global use
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// configure the font for global use
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
 
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode; // children components are passed to this layout
}>) {
  return (
    <html lang="en">
      <body>
        {/* Wrap the app with wallet provider to enable wallet functionality */}
        <AppWalletProvider>{children}</AppWalletProvider>
      </body>
    </html>
  );
}