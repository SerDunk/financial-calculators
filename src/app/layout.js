import Navbar from "../components/Navbar";
import "./globals.css";

export const metadata = {
  title: "Financial Calculators",
  description: "Interactive financial calculators for your planning needs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-white min-h-screen flex flex-col">
        <Navbar />
        <main className="container mx-auto px-4 py-8 flex-grow">
          {children}
        </main>
        <footer className="bg-purple-800 text-white py-6">
          <div className="container mx-auto px-4 text-center">
            <p>© {new Date().getFullYear()} GoalSeek. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
