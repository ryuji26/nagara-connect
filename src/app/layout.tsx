import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NAGARA PRO | Premium On-Demand Car Detailing",
  description: "Professional car detailing at your doorstep. Powered by NAGARA PRO.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="bg-black-jet min-h-screen">
        {children}
      </body>
    </html>
  );
}
