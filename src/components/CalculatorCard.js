import Link from "next/link";

const CalculatorCard = ({ title, description, icon, link, color }) => {
  return (
    <Link href={link}>
      <div
        className={`border rounded-lg p-6 hover:shadow-lg transition-shadow duration-300 cursor-pointer h-full bg-[radial-gradient(circle_at_center,_#AB78FF,_#192226)]`}
      >
        <div className="flex items-start space-x-4">
          <div className="text-3xl">{icon}</div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-white">{description}</p>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white">
            Try now →
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CalculatorCard;
