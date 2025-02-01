import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Oscar Predictions 2025",
  description:
    "Collect your Oscar Predictions in one place for the 2025 Academy Awards",
  metadataBase: new URL("https://www.oscar-predictions.com"),
  openGraph: {
    type: "website",
    url: new URL("https://www.oscar-predictions.com"),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html lang="en" title="Oscar Predictions" className={inter.className}>
        <body className="bg-background font-sans antialiased h-screen flex flex-col">
          <Header />
          <div className="h-full overflow-y-hidden">{children}</div>
          <Footer />
          <Analytics />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
