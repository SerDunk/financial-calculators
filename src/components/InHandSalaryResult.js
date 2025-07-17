// InHandSalaryResult.jsx
import React from "react";
import { Calculator } from "lucide-react";
import { formatters } from "@/utils/calculation";

// A reusable component for each line item to keep the code clean
const LineItem = ({
  label,
  amount,
  isDeduction = false,
  isSubtotal = false,
  isFinal = false,
  isNA = false,
}) => (
  <div
    className={`flex justify-between items-center py-2 ${
      isSubtotal || isFinal ? "border-t mt-2 pt-2" : ""
    }`}
  >
    <span
      className={`text-sm ${
        isSubtotal || isFinal ? "font-bold text-[#2C178C]" : "text-gray-600"
      }`}
    >
      {label}
    </span>
    {isNA ? (
      <span className="text-sm font-medium text-gray-400">N/A</span>
    ) : (
      <span
        className={`text-sm font-semibold ${
          isFinal
            ? "text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent"
            : isDeduction
            ? "text-red-500"
            : "text-[#2C178C]"
        }`}
      >
        {isDeduction && "- "}
        {formatters.formatIndianCurrency(amount)}
      </span>
    )}
  </div>
);

const InHandSalaryResult = ({ result, regime }) => {
  if (!result) {
    return (
      <div className="mt-6 p-8 bg-white rounded-2xl ...">
        <Calculator />
        Calculating...
      </div>
    );
  }

  const { breakdown, annualVariablePay } = result;
  const isOldRegime = regime === "old";

  return (
    <div className="sm:mt-2 mt-2 bg-white py-6 px-5 rounded-2xl shadow-lg">
      <h2 className="text-center text-xl font-bold mb-1 text-[#2C178C]">
        Salary Split ({isOldRegime ? "Old" : "New"} Tax Regime)
      </h2>
      <p className="text-center text-xs text-gray-400 mb-6">
        All figures are monthly
      </p>

      <div className="space-y-1">
        {/* Section 1: CTC to Gross Salary */}
        <LineItem label="Monthly CTC" amount={breakdown.monthlyCTC} />
        <LineItem
          label="EPF (Employer's Share)"
          amount={breakdown.epfEmployer}
          isDeduction
        />
        <LineItem label="Gratuity" amount={breakdown.gratuity} isDeduction />
        <LineItem
          label="Gross Salary"
          amount={breakdown.grossSalary}
          isSubtotal
        />

        {/* Section 2: Gross to Taxable Income */}
        <LineItem
          label="Standard Deduction"
          amount={breakdown.standardDeduction}
          isDeduction
        />
        {isOldRegime ? (
          <>
            <LineItem
              label="HRA Exemption"
              amount={breakdown.hraExemption}
              isDeduction
            />
            <LineItem
              label="Investments (80C, 80D..)"
              amount={breakdown.investments}
              isDeduction
            />
          </>
        ) : (
          <>
            <LineItem label="HRA Exemption" isNA />
            <LineItem label="Investments (80C, 80D..)" isNA />
          </>
        )}
        <LineItem
          label="Taxable Income"
          amount={breakdown.taxableIncome}
          isSubtotal
        />

        {/* Section 3: Tax Calculation */}
        <LineItem label="Income Tax" amount={breakdown.incomeTax} />

        {/* Section 4: Final In-Hand Calculation */}
        <div className="bg-indigo-50/50 p-4 mt-4 rounded-xl border border-indigo-100">
          <LineItem label="Gross Salary" amount={breakdown.grossSalary} />
          <LineItem
            label="Income Tax"
            amount={breakdown.incomeTax}
            isDeduction
          />
          <LineItem
            label="EPF (Your Share)"
            amount={breakdown.epfEmployee}
            isDeduction
          />
          <LineItem
            label="Professional Tax"
            amount={breakdown.professionalTax}
            isDeduction
          />
          <LineItem
            label="Monthly In-hand Salary"
            amount={breakdown.monthlyInHand}
            isFinal
          />
        </div>
      </div>

      {annualVariablePay > 0 && (
        <p className="text-center text-xs text-gray-500 mt-6 p-2">
          Your annual bonus of{" "}
          {formatters.formatIndianCurrency(annualVariablePay)} will be paid
          separately and is subject to TDS.
        </p>
      )}
    </div>
  );
};
export default InHandSalaryResult;
