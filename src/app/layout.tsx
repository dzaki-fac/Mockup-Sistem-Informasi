import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter-next",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SIPANDAI — Sistem Informasi Pengetahuan dan Administrasi Informasi",
  description:
    "Prototype Knowledge Management System untuk mendukung Smart Governance Kelurahan Tembalang, Kota Semarang. Data dummy untuk keperluan presentasi dan usability testing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white font-sans text-black">
        {children}
      </body>
    </html>
  );
}
