"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <span className="text-purple-800 font-bold text-xl">
                GoalSeek
              </span>
            </Link>
          </div>

          <div className="hidden md:ml-6 md:flex md:items-center md:space-x-8">
            <Link
              href="/"
              className={`${
                pathname === "/"
                  ? "border-b-2 border-purple-600 text-purple-800"
                  : "text-gray-600 hover:text-purple-800"
              } px-3 py-2 text-sm font-medium`}
            >
              Home
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="md:hidden bg-gray-50">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            href="/"
            className={`${
              pathname === "/"
                ? "bg-purple-100 text-purple-800"
                : "text-gray-600 hover:bg-purple-50 hover:text-purple-800"
            } block px-3 py-2 rounded-md text-base font-medium`}
          >
            Home
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
