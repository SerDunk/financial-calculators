export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white py-2 mt-4 sm:py-4">
      <div className="px-4 text-center">
        <p>© {new Date().getFullYear()} GoalSeek. All rights reserved.</p>
      </div>
    </footer>
  );
}
