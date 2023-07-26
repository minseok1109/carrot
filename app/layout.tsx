import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import axios from "axios";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "상한 당근",
  description: "중고거래를 경매로 바꾸다",
};

axios.defaults.baseURL = "https://backendkwon.shop/";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} container mx-auto`}>
        <Header />
        {children}
      </body>
    </html>
  );
}
