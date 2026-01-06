import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google"; // Modern sans font
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Violet | Focus Tasks",
  description: "Simple, elegant task management.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jakarta.variable} antialiased font-sans bg-slate-950 text-slate-100`}>
        {children}
      </body>
    </html>
  );
}
