"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return (
    <div className="w-full max-w-xl px-6 pt-6 pb-0">
      <Link
        href="/"
        className="inline-flex items-center text-sm font-medium text-[#686868] hover:text-[#020288] transition-colors"
      >
        <ChevronLeft size={16} className="mr-1 -ml-1" />
        Back
      </Link>
    </div>
  );
}
