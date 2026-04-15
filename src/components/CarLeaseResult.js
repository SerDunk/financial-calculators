import { Calculator, Car } from "lucide-react";

const CarLeaseResult = ({ result, comparisonPeriod }) => {
  if (!result) {
    return (
      <div className="mt-6 p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center text-gray-500">
          <Calculator className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-lg font-medium mb-2 text-[#2C178C]">
            Awaiting Comparison...
          </h3>
          <p className="text-sm">
            Your Lease vs. Loan analysis will appear here.
          </p>
        </div>
      </div>
    );
  }

  const isLeasingBetter = result?.betterOption === "Leasing";
  const tenure = result?.displayedTenure || comparisonPeriod;
  const wealthDiff = result?.wealthDifference || 0;

  return (
    <div className="sm:mt-2 mt-4 sm:text-sm bg-white py-6 px-5 rounded-2xl shadow-lg">
      <div className="text-center mb-6">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 shadow-[0px_4px_10px_rgba(0,0,0,0.1)]"
          style={{
            background: isLeasingBetter ? "linear-gradient(135deg, #FF9A9E 0%, #FECFEF 99%, #FECFEF 100%)" : "linear-gradient(to right, #4facfe 0%, #00f2fe 100%)",
          }}
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
             <Car size={24} className={isLeasingBetter ? "text-pink-500" : "text-blue-500"} />
          </div>
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent mb-2">
          {result.betterOption} is Better
        </h2>
        <p className="text-sm text-[#666666]">
          You could save{" "}
          <span className="font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
            ₹{Math.round(wealthDiff).toLocaleString("en-IN")}
          </span>{" "}
          over {tenure} years
        </p>
      </div>

      <div className="space-y-4">
        {/* Leasing Card */}
        <div
          className={`rounded-2xl p-5 border-2 bg-[#F9F9FB] ${
            isLeasingBetter ? "border-[#FF9A9E]" : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-[#FF9A9E] to-[#FECFEF] rounded-xl flex items-center justify-center mr-3 shadow-sm">
                <Car className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-[#2C178C]">Corporate Lease</h3>
                <p className="text-xs text-[#666666]">Save tax, pay rent</p>
              </div>
            </div>
            {isLeasingBetter && (
              <div className="bg-[#FF9A9E] text-white text-xs px-2 py-1 rounded-full font-medium">
                WINNER
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-xs text-gray-600">Total Tax Saved</span>
              <span className="font-semibold text-sm text-[#4CAF50]">
                ₹{Math.round(result.totalTaxSaved || 0).toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-xs text-gray-600">Effective Monthly Cost</span>
              <span className="font-semibold text-sm text-[#2C178C]">
                ₹{Math.round(result.netEffectiveMonthlyLeaseCost || 0).toLocaleString("en-IN")}/mo
              </span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-1 mt-1">
              <span className="text-xs text-gray-600">Residual Buyback</span>
              <span className="font-semibold text-sm text-[#2C178C]">
                + ₹{Math.round(result.residualBuyback || 0).toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-4 pt-3 flex justify-between items-center">
            <span className="text-sm font-medium text-[#2C178C]">
              Total Outflow
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              ₹{Math.round(result.totalOutflowLease || 0).toLocaleString("en-IN")}
            </span>
          </div>
        </div>

        {/* Loan Card */}
        <div
          className={`rounded-2xl p-5 border-2 bg-[#F9F9FB] ${
            !isLeasingBetter ? "border-[#4facfe]" : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-gradient-to-r from-[#4facfe] to-[#00f2fe] rounded-xl flex items-center justify-center mr-3 shadow-sm">
                <Car className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-[#2C178C]">Auto Loan</h3>
                <p className="text-xs text-[#666666]">Own with EMIs</p>
              </div>
            </div>
            {!isLeasingBetter && (
              <div className="bg-[#4facfe] text-white text-xs px-2 py-1 rounded-full font-medium">
                WINNER
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-xs text-gray-600">Monthly EMI + Maintenance</span>
              <span className="font-semibold text-sm text-[#2C178C]">
                ₹{Math.round(result.totalMonthlyOutflowLoan || 0).toLocaleString("en-IN")}/mo
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-xs text-gray-600">Total Outflow</span>
              <span className="font-semibold text-sm text-[#2C178C]">
                ₹{Math.round(result.totalOutflowLoan || 0).toLocaleString("en-IN")}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm border-t border-gray-100 pt-1 mt-1 opacity-60">
              <span className="text-xs text-gray-600">No Tax Deduction Allowed</span>
              <span className="font-semibold text-sm text-[#e53935]">
                ₹0
              </span>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-4 pt-3 flex justify-between items-center">
            <span className="text-sm font-medium text-[#2C178C]">
              Total Outflow
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              ₹{Math.round(result.totalOutflowLoan || 0).toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarLeaseResult;
