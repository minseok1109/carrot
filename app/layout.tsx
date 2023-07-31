import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import axios from "axios";
import Header from "./components/Header";
import { getUser } from "@/utils/api";
import { cookies } from "next/headers";
import { User } from "@/utils/type";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "상한 당근",
  description: "중고거래를 경매로 바꾸다",
};

axios.defaults.baseURL = "https://backendkwon.shop/";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let user: User | undefined = undefined;
  try {
    if (cookies().get("accessToken")?.value) {
      user = await getUser();
    }
  } catch (error) {
    console.log(error);
  }
  const isLoggedIn = user ? true : false;
  return (
    <html lang="en">
      <body className={`${inter.className} container mx-auto h-screen`}>
        <Header user={user} isLoggedIn={isLoggedIn} />
        {children}
      </body>
    </html>
  );
}
