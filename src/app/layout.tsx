import type { Metadata } from "next";
import "./globals.css";
import TabBar from "@/components/layout/TabBar";

export const metadata: Metadata = {
  title: "Nagara Connect | 出張洗車マッチングアプリ",
  description: "「ながら洗車」公式の出張洗車マッチングアプリ。認定パートナーによる高品質な洗車サービスをお届けします。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-nagara-black min-h-screen">
        <div className="mx-auto max-w-[430px] min-h-screen relative bg-nagara-dark shadow-2xl">
          {children}
          <TabBar />
        </div>
      </body>
    </html>
  );
}
