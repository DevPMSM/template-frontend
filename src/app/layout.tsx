import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Nunito,
} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Template Frontend - Prefeitura",
  description:
    "Template de frontend para aplicações web da prefeitura municipal de São Mateus.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} h-screen w-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
