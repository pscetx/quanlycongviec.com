import type { Metadata } from "next";
import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";
import { getServerSession } from "next-auth";
import Link from "next/link";

export const metadata: Metadata = {
  title: "quanlycongviec.vn",
  description: "Website hỗ trợ quản lý công việc",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <nav>{!session}</nav>
        {children}
      </body>
    </html>
  );
}
