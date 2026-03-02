import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AppConst } from "@/constants/AppConstants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LazySpace – Talk to Strangers Anonymously",
  description:
    "LazySpace is a simple anonymous chat app to connect and talk with strangers in real time.",
  keywords: [
    "anonymous chat",
    "talk to strangers",
    "random chat",
    "online chat",
    "LazySpace",
    "omegle alternative",
    "no login chat",
    "chat with strangers"
  ],
  metadataBase: new URL(AppConst.NEXT_PUBLIC_FRONTEND_URL),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
