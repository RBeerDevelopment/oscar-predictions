import { ClerkProvider } from "@clerk/nextjs";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

import { Analytics } from "@vercel/analytics/react";
import { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Oscar Predictions 2024",
  description:
    "Collect your Oscar Predictions in one place for the 2024 Academy Awards",
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
    <ClerkProvider>
      <html lang="en" title="Oscar Predictions">
        <body
          className={cn(
            "bg-background font-sans antialiased h-screen flex flex-col",
            fontSans.variable
          )}
        >
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
