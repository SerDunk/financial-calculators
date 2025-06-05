import Link from "next/link";

const CalculatorCard = ({ title, description, icon, link }) => {
  return (
    <div
      className={`rounded-xl flex justify-between py-4 font-lexend w-full cursor-pointer h-24 drop-shadow-xl `}
      style={{
        background: "linear-gradient(to right, #E3E3E3, #FFFFFF)",
      }}
    >
      <Link href={link}>
        <div className="flex justify-between items-center gap-4 px-4 py-0.5">
          <div className="w-12 h-12">
            <div className="w-10 h-10">{icon}</div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-[#323233] mb-1">
              {title}
            </h3>
            <p className="text-xs text-[#666666]">{description}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CalculatorCard;
