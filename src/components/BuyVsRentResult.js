import Image from "next/image";
import { Calculator } from "lucide-react"; // Added for the loading state
import RentHouse from "../../public/house-for-sale.png";
import BuyHouse from "../../public/mortgage.png";

const BuyVsRentResults = ({ result, comparisonPeriod }) => {
  // A more informative loading/empty state, styled like WeddingResult's
  if (!result) {
    return (
      <div className="mt-6 p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center text-gray-500">
          <Calculator className="mx-auto mb-4 text-gray-400" size={48} />
          <h3 className="text-lg font-medium mb-2 text-[#2C178C]">
            Awaiting Comparison...
          </h3>
          <p className="text-sm">
            Your Buy vs. Rent analysis will appear here.
          </p>
        </div>
      </div>
    );
  }

  const isBuyingBetter = result?.betterOption === "Buying";
  const tenure = result?.displayedTenure || comparisonPeriod;
  const wealthDiff = Math.abs(
    (result?.netBuyGain || 0) - (result?.netRentGain || 0)
  );

  return (
    <div className="sm:mt-2 mt-4 sm:text-sm bg-white py-6 px-5 rounded-2xl shadow-lg">
      {/* Decision Header - Retained its impactful style, consistent with WeddingResult header */}
      <div className="text-center mb-6">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3"
          style={{
            background: isBuyingBetter ? "#AB78FF" : "#97A9FF",
          }}
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Image
              src={isBuyingBetter ? BuyHouse : RentHouse}
              width={30}
              height={30}
              alt={isBuyingBetter ? "Bought House" : "Rented House"}
            />
          </div>
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent mb-2">
          {result.betterOption} is Better
        </h2>
        <p className="text-sm text-[#666666]">
          You could be wealthier by{" "}
          <span className="font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
            ₹{Math.round(wealthDiff).toLocaleString("en-IN")}
          </span>{" "}
          over {tenure} years
        </p>
      </div>

      {/* Comparison Cards - Now stacked vertically with new styling */}
      <div className="space-y-4">
        {/* Buying Card */}
        <div
          className={`rounded-2xl p-5 border-2 bg-[#F9F9FB] ${
            isBuyingBetter ? "border-[#AB78FF]" : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#AB78FF] rounded-xl flex items-center justify-center mr-3">
                <Image
                  src={BuyHouse}
                  width={24}
                  height={24}
                  alt="Bought House"
                />
              </div>
              <div>
                <h3 className="font-semibold text-[#2C178C]">Buying</h3>
                <p className="text-xs text-[#666666]">Own a home</p>
              </div>
            </div>
            {isBuyingBetter && (
              <div className="bg-[#AB78FF] text-white text-xs px-2 py-1 rounded-full font-medium">
                WINNER
              </div>
            )}
          </div>

          <div className="space-y-2">
            {[
              ["Down Payment", result.downPayment],
              ["Total EMIs Paid", result.totalEMIs],
              ["Property Tax", result.totalTax],
              ["Maintenance & Others", result.totalOther],
            ].map(
              ([label, value]) =>
                value > 0 && (
                  <div
                    className="flex justify-between items-center text-sm"
                    key={label}
                  >
                    <span className="text-xs text-gray-600">{label}</span>
                    <span className="font-semibold text-sm text-[#2C178C]">
                      ₹{Math.round(value || 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                )
            )}
          </div>

          <div className="border-t border-gray-200 mt-4 pt-3 flex justify-between items-center">
            <span className="text-sm font-medium text-[#2C178C]">
              Total Cost
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              ₹{Math.round(result.totalHomeCost || 0).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="bg-white rounded-lg p-3 border border-gray-200 mt-4 text-center">
            <div className="text-xs text-gray-600 mb-1">
              Net Wealth After {tenure} Years
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              ₹{Math.round(result.netBuyGain || 0).toLocaleString("en-IN")}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              Includes property value
            </div>
          </div>
        </div>

        {/* Renting Card */}
        <div
          className={`rounded-2xl p-5 border-2 bg-[#F9F9FB] ${
            !isBuyingBetter ? "border-[#97A9FF]" : "border-gray-200"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#97A9FF] rounded-xl flex items-center justify-center mr-3">
                <Image
                  src={RentHouse}
                  width={24}
                  height={24}
                  alt="Rented House"
                />
              </div>
              <div>
                <h3 className="font-semibold text-[#2C178C]">Renting</h3>
                <p className="text-xs text-[#666666]">Rent + Invest</p>
              </div>
            </div>
            {!isBuyingBetter && (
              <div className="bg-[#97A9FF] text-white text-xs px-2 py-1 rounded-full font-medium">
                WINNER
              </div>
            )}
          </div>

          <div className="space-y-2">
            {[["Total Rent Paid", result.totalRentPaid]].map(
              ([label, value]) =>
                value > 0 && (
                  <div
                    className="flex justify-between items-center text-sm"
                    key={label}
                  >
                    <span className="text-xs text-gray-600">{label}</span>
                    <span className="font-semibold text-sm text-[#2C178C]">
                      ₹{Math.round(value || 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                )
            )}
          </div>

          <div className="border-t border-gray-200 mt-4 pt-3 flex justify-between items-center">
            <span className="text-sm font-medium text-[#2C178C]">
              Total Cost
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              ₹{Math.round(result.totalRentPaid || 0).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="bg-white rounded-lg p-3 border border-gray-200 mt-4 text-center">
            <div className="text-xs text-gray-600 mb-1">
              Net Wealth After {tenure} Years
            </div>
            <div className="text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              ₹{Math.round(result.netRentGain || 0).toLocaleString("en-IN")}
            </div>
            <div className="text-xs text-gray-600 mt-1">
              From invested savings
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyVsRentResults;
