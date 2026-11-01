import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import { Header } from "./components/Header";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "The Red Carpet",
  description: "New releases and your saved movies",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full">
        <div className="mx-auto w-full max-w-5xl px-4 pb-24">
          <Header />
          <main className="pt-16">{children}</main>
        </div>
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
