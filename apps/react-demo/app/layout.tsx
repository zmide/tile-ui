import type { Metadata } from "next";
import "@tile-ui/styles/scss/globals.scss";

export const metadata: Metadata = {
  title: "Tile UI - React Demo",
  description: "基于 SCSS + CSS Module + Hooks API 的轻量级 React 组件库",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>
        {children}
      </body>
    </html>
  );
}
