import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter-next",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const mazeSnippet = `(function (m, a, z, e) {
  var s, t, u, v;
  try {
    t = m.sessionStorage.getItem('maze-us');
  } catch (err) {}

  if (!t) {
    t = new Date().getTime();
    try {
      m.sessionStorage.setItem('maze-us', t);
    } catch (err) {}
  }

  u = document.currentScript || (function () {
    var w = document.getElementsByTagName('script');
    return w[w.length - 1];
  })();
  v = u && u.nonce;

  s = a.createElement('script');
  s.src = z + '?apiKey=' + e;
  s.async = true;
  if (v) s.setAttribute('nonce', v);
  a.getElementsByTagName('head')[0].appendChild(s);
  m.mazeUniversalSnippetApiKey = e;
})(window, document, 'https://snippet.maze.co/maze-universal-loader.js', 'ef4a4470-f8ef-48ee-856c-3345c0434e34');`;

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
        <Script
          id="maze-universal-snippet"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: mazeSnippet }}
        />
        {children}
      </body>
    </html>
  );
}
