import Link from "next/link";

const CalculatorCard = ({ title, description, icon, link, status }) => {
  return (
    <Link href={link}>
      <div
        className={`rounded-xl flex items-center justify-between py-4 px-4 font-lexend w-full cursor-pointer h-24 drop-shadow-xl hover:drop-shadow-2xl transition-all duration-200`}
        style={{
          background: "linear-gradient(to right, #E3E3E3, #FFFFFF)",
        }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center">
            <div className="w-10 h-10">{icon}</div>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-[#323233] mb-1">
              {title}
            </h3>
            <p className="text-xs text-[#666666]">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CalculatorCard;
