import Navbar from "../components/Navbar";
import "./globals.css";
import { lexend } from "../../public/fonts";

export const metadata = {
  title: "Financial Calculators",
  description: "Interactive financial calculators for your planning needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={lexend.variable}>
      <body className="bg-[#EFEDF4] min-h-screen flex flex-col justify-center">
        <Navbar />
        <main className="container mx-auto py-4 flex-grow">{children}</main>
        <footer className="bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white py-2 mt-4 sm:py-4">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} GoalSeek. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
