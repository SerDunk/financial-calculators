import Link from "next/link";

const CalculatorCard = ({ title, description, icon, link }) => {
  return (
    <Link href={link}>
      <div
        className={`border-[#323233] rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full font-lexend`}
        style={{
          background: "linear-gradient(to right, #E3E3E3, #FFFFFF)",
        }}
      >
        <div className="flex items-start space-x-4 py-3">
          <div className="sm:w-14 sm:h-14 w-20 h-20">{icon}</div>
          <div>
            <h3 className="sm:text-xl text-lg font-bold text-[#323233] mb-2">
              {title}
            </h3>
            <p className="text-[#666666] sm:text-md text-sm">{description}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CalculatorCard;
