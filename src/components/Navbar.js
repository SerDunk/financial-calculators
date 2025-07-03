import Link from "next/link";

export default function Navbar() {
  return (
    <div className="text-[#020288] p-3 flex justify-between items-center">
      <div className="font-semibold text-md">
        <Link href="/">Home</Link>
      </div>
    </div>
  );
}
