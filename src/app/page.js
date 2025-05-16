import CalculatorCard from "../components/CalculatorCard";
import { calculatorData } from "@/constants/calculatorData";

export default function Home() {
  return (
    <>
      <h1 className="text-4xl font-bold text-purple-800 mb-8 text-center">
        Financial Calculators
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {calculatorData.map((calculator) => (
          <CalculatorCard
            key={calculator.id}
            title={calculator.title}
            description={calculator.description}
            icon={calculator.icon}
            link={calculator.link}
            color={calculator.color}
          />
        ))}
      </div>
    </>
  );
}
