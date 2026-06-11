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
    <html lang="ja" style={{ colorScheme: "light" }}>
      <body className={`${geist.className} min-h-screen antialiased`} style={{ backgroundColor: "#f9fafb", color: "#111111" }}>
        <QuizProvider>
          <div className="mx-auto max-w-lg px-4 py-8">
            {children}
          </div>
        </QuizProvider>
      </body>
    </html>
  );
}
