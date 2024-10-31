import localFont from "next/font/local";
import "./globals.css";
import { CoordsProvider } from "./_context/CoordsContext";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Urbanalyze",
  description: "Find your dream location",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-transparent`}
      >
        <CoordsProvider>{children}</CoordsProvider>
      </body>
    </html>
  );
}
