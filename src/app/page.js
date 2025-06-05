import Image from "next/image";
import Link from "next/link";
import CalculatorCard from "../components/CalculatorCard";
import { calculatorData } from "@/constants/calculatorData";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#EFEDF4] px-3 font-lexend">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header Card */}
        <div
          className="rounded-xl px-6 py-5 text-white relative overflow-hidden"
          style={{
            background:
              "radial-gradient(ellipse 113px 357px at center, #8362D1 -60%, #192226 130%)",
          }}
        >
          {/* Top-right Calculator Icon */}
          <div className="absolute top-3 right-4 w-20 h-20">
            <Image
              src="/calculator.svg"
              alt="Calculator Icon"
              fill
              className="object-contain"
              priority
            />
          </div>

          <h1 className="text-lg font-semibold mb-2 z-10 relative">
            Calculators
          </h1>
          <p className="text-xs text-white z-10 w-50 relative">
            Always follow your gut feeling—but only after you have crunched some
            numbers.
          </p>
        </div>

        {/* Calculator Cards */}
        <div className="flex flex-col gap-5">
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
