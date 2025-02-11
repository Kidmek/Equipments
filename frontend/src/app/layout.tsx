import type { Metadata } from "next";
import { Lato, Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import BottomNav from "@/components/organisms/BottomNav";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gojo",
  description: "Ethiopian real estate platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${lato.className} ${poppins.className} ${montserrat.className} antialiased h-screen flex flex-col justify-between `}
      >
        <main className="flex-1 overflow-y-auto">{children}</main>
        <BottomNav />
      </body>
    </html>
  );
}
