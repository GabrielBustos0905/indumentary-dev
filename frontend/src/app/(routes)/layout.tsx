import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Footer } from "@/components/Footer";
import { HeaderWrapper } from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Indumentary Dev",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <HeaderWrapper />
        {children}
        <Footer />
      </body>
    </html>
  );
}
