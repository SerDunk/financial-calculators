import "./globals.css";
import { lexend } from "../../public/fonts";

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
        <main className=" py-3 flex-grow px-6 max-w-xl">{children}</main>
        <footer className="bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white py-2 mt-4 sm:py-4">
          <div className="px-4 text-center">
            <p>© {new Date().getFullYear()} GoalSeek. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
