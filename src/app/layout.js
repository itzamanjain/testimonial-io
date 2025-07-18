import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Testimonials",
  description: "Get testimonials from your customers",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-transparent">
       
        {children}</body>
    </html>
  );
}
