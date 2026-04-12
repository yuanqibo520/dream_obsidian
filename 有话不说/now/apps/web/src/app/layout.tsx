import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { APP_NAME } from "shared";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: APP_NAME,
  description: "个人单词库 · 打卡与掌握曲线（方案 B：玻璃 + 深色统计区）",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={inter.variable}>
      <body className={`${inter.className} min-h-dvh antialiased`}>{children}</body>
    </html>
  );
}
