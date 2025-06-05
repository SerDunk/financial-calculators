import CalculatorCard from "../components/CalculatorCard";
import { calculatorData } from "@/constants/calculatorData";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#EFEDF4] py-3 font-lexend sm:py-5 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center sm:mb-10 mb-8">
          <h1 className="sm:text-4xl text-2xl font-bold text-[#2D14A0] mb-4">
            Financial Calculators
          </h1>
          <p className="sm:text-lg text-md text-gray-600 max-w-2xl mx-auto">
            Always follow your gut feelings and only after you have crunched
            some numbers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculatorData.map((calculator) => (
            <CalculatorCard
              key={calculator.id}
              title={calculator.title}
              description={calculator.description}
              icon={calculator.icon}
              link={calculator.link}
              status={calculator.status}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
