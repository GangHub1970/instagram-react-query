import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { SessionProvider } from "next-auth/react";
import QueryContext from "@/contexts/QueryContext";

const sans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Instagram",
    template: "Instagram | %s",
  },
  description: "Instagram Photos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="w-screen h-screen">
      <body
        className={`${sans.className} antialiased flex flex-col w-screen h-screen overflow-y-auto`}
      >
        <SessionProvider>
          <Header />
          <QueryContext>
            <main className="grow w-full bg-neutral-50">{children}</main>
          </QueryContext>
        </SessionProvider>
        <div id="portal" />
      </body>
    </html>
  );
}
