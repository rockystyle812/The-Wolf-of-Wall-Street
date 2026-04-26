import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Волк с Уолл-стрит | The Wolf of Wall Street",
  description: "Фильм Мартина Скорсезе — история Джордана Белфорта, брокера, который построил финансовую империю на обмане и жадности. Леонардо ДиКаприо, Джона Хилл, Марго Робби.",
  keywords: ["Волк с Уолл-стрит", "Wolf of Wall Street", "Скорсезе", "ДиКаприо", "Белфорт", "Уолл-стрит"],
  icons: {
    icon: "/logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
