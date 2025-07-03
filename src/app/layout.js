import "./globals.css";
import { lexend } from "../../public/fonts";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported by less commonly used
  // interactiveWidget: 'resizes-visual',
};

export const metadata = {
  title: "Financial Calculators",
  description: "Interactive financial calculators for your planning needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={lexend.variable}>
      <body className="bg-[#EFEDF4] min-h-screen flex flex-col sm:items-center justify-center">
        <Navbar />
        <main className=" py-3 px-6 max-w-xl ">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
