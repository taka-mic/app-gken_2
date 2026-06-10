import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { QuizProvider } from "@/context/QuizContext";

const geist = Geist({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "G検定 対策アプリ",
  description: "JDLA G検定シラバス準拠の四択一問一答学習アプリ",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={`${geist.className} bg-gray-50 min-h-screen antialiased`}>
        <QuizProvider>
          <div className="mx-auto max-w-lg px-4 py-8">
            {children}
          </div>
        </QuizProvider>
      </body>
    </html>
  );
}
