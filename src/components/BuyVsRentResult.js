import Image from "next/image";
import RentHouse from "../../public/house-for-sale.png";
import BuyHouse from "../../public/mortgage.png";

const BuyVsRentResults = ({ result, comparisonPeriod }) => {
  if (!result) return null;

  const tenure = result?.displayedTenure || comparisonPeriod;
  const wealthDiff = Math.abs(
    (result?.netBuyGain || 0) - (result?.netRentGain || 0)
  );
  const isBuyingBetter = result?.betterOption === "Buying";

  return (
    <div className="sm:mt-2 mt-4 sm:text-sm bg-white py-6 px-5 rounded-2xl shadow-lg">
      {/* Decision Header */}
      <div className="text-center mb-6">
        <div
          className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3"
          style={{
            background:
              result?.betterOption === "Buying" ? "#AB78FF" : "#97A9FF",
          }}
        >
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <div className="text-2xl">
              {result?.betterOption === "Buying" ? (
                <Image
                  src={BuyHouse}
                  width={80}
                  height={80}
                  alt="Bought House"
                />
              ) : (
                <Image
                  src={RentHouse}
                  width={80}
                  height={80}
                  alt="Rented House"
                />
              )}
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent mb-2">
          {result?.betterOption || "Buying"} is Better
        </h2>
        <p className="text-sm text-[#666666]">
          Save{" "}
          <span className="bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent font-semibold">
            ₹
            {Math.round(
              Math.abs((result?.netBuyGain || 0) - (result?.netRentGain || 0))
            ).toLocaleString("en-IN")}
          </span>{" "}
          over {result?.displayedTenure || comparisonPeriod} years
        </p>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Buying Card */}
        <div
          className={`rounded-2xl p-5 border-2 ${
            result?.betterOption === "Buying"
              ? "border-[#AB78FF] bg-[#F6F0FF]"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#AB78FF] rounded-xl flex items-center justify-center mr-3">
                <span className="text-white text-lg">
                  <Image
                    src={BuyHouse}
                    width={30}
                    height={30}
                    alt="Bought House"
                  />
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-[#320992]">Buying</h3>
                <p className="text-xs text-[#666666]">Own a home</p>
              </div>
            </div>
            {result?.betterOption === "Buying" && (
              <div className="bg-[#AB78FF] text-white text-xs px-2 py-1 rounded-full font-medium">
                WINNER
              </div>
            )}
          </div>

          {/* Cost Breakdown */}
          {[
            ["Down Payment", result?.downPayment],
            ["Total EMIs", result?.totalEMIs],
            ["Property Tax", result?.totalTax],
            ["Maintenance & Others", result?.totalOther],
          ].map(([label, value]) => (
            <div
              className="flex justify-between items-center text-sm mb-1"
              key={label}
            >
              <span className="text-xs text-[#666666]">{label}</span>
              <span className="font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                ₹{Math.round(value || 0).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
          <hr className="my-3 border-gray-300" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-[#320992]">
              Total Cost
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              ₹{Math.round(result?.totalHomeCost || 0).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="bg-white rounded-xl p-3 border border-gray-200 mt-4">
            <div className="text-center">
              <div className="text-xs text-[#666666] mb-1">
                Net Wealth After {result?.displayedTenure || comparisonPeriod}{" "}
                Years
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                ₹{Math.round(result?.netBuyGain || 0).toLocaleString("en-IN")}
              </div>
              <div className="text-xs text-[#666666] mt-1">
                You own the property
              </div>
            </div>
          </div>
        </div>

        {/* Renting Card */}
        <div
          className={`rounded-2xl p-5 border-2 ${
            result?.betterOption === "Renting"
              ? "border-[#97A9FF] bg-[#EFF1FF]"
              : "border-gray-200 bg-gray-50"
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-[#97A9FF] rounded-xl flex items-center justify-center mr-3">
                <span className="text-white text-lg">
                  <Image
                    src={RentHouse}
                    width={30}
                    height={30}
                    alt="Rented House"
                  />
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-[#3B82F6]">Renting</h3>
                <p className="text-xs text-[#666666]">Rent + Invest</p>
              </div>
            </div>
            {result?.betterOption === "Renting" && (
              <div className="bg-[#97A9FF] text-white text-xs px-2 py-1 rounded-full font-medium">
                WINNER
              </div>
            )}
          </div>

          {/* Cost Breakdown */}
          {[
            ["Total Rent Paid", result?.totalRentPaid],
            ["Down Payment Invested    ", result?.downPayment],
            [
              "Monthly Savings Invested",
              ((result?.totalMonthlyOutflowBuy || 0) -
                (result?.totalMonthlyOutflowRent || 0)) *
                (result?.displayedTenure || comparisonPeriod) *
                12,
            ],
          ].map(([label, value]) => (
            <div
              className="flex justify-between gap-1 items-center text-sm mb-1"
              key={label}
            >
              <span className="text-xs text-[#666666]">{label}</span>
              <span className="font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                ₹{Math.round(value || 0).toLocaleString("en-IN")}
              </span>
            </div>
          ))}
          <hr className="my-3 border-gray-300" />
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-[#3B82F6]">
              Total Cost
            </span>
            <span className="text-lg font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
              ₹{Math.round(result?.totalRentPaid || 0).toLocaleString("en-IN")}
            </span>
          </div>

          <div className="bg-white rounded-xl p-3 border border-gray-200 mt-4">
            <div className="text-center">
              <div className="text-xs text-[#666666] mb-1">
                Net Wealth After {result?.displayedTenure || comparisonPeriod}{" "}
                Years
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                ₹{Math.round(result?.netRentGain || 0).toLocaleString("en-IN")}
              </div>
              <div className="text-xs text-[#666666] mt-1">
                Investment portfolio
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyVsRentResults;
