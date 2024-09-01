import type { Metadata } from "next";
import { Inter, Raleway } from "next/font/google";
import "./globals.css";
import SWRProvider from "@/components/SWRProvider";
import { cn } from "@/lib/utils";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          raleway.variable
        )}
      >
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}