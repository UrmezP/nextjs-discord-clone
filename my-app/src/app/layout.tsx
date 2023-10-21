import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat App made by Urmez",
  description: "Made by Urmez, using Next.js and express.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="md:px-4 md:py-4">
          <h1 className="text-4xl text-center">GlobalChat</h1>
          <br />
          {children}
        </main>
      </body>
    </html>
  );
}
