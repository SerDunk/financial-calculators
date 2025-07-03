// WeddingResult.jsx
import React, { useState } from "react";
import {
  Heart,
  Calculator,
  PieChart,
  Users,
  Calendar,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import HeartResult from "../../public/hearts.png";
import { formatters } from "@/utils/calculation";

const WeddingResult = ({ result }) => {
  const [expandedEvents, setExpandedEvents] = useState({});
  const toggleEventExpansion = (eventId) => {
    setExpandedEvents((prev) => ({ ...prev, [eventId]: !prev[eventId] }));
  };

  if (!result || !result.costs) {
    return (
      <div className="mt-6 p-8 bg-white rounded-2xl shadow-lg">
        <div className="text-center text-gray-500">
          <Calculator className="mx-auto mb-4" size={48} />
          <h3 className="text-lg font-medium mb-2">Awaiting Calculation...</h3>
          <p className="text-sm">
            Your wedding cost estimate will appear here.
          </p>
        </div>
      </div>
    );
  }

  const { weddingDetails, costs, formattedTotals } = result;

  return (
    <div className="sm:mt-2 mt-2 sm:text-sm bg-white py-6 px-5 rounded-2xl shadow-lg">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-3 bg-[#AB78FF]">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <Image
              src={HeartResult}
              width={30}
              height={30}
              alt="Wedding Result"
            />
          </div>
        </div>
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent mb-2">
          Your Estimated Wedding Cost
        </h2>
        <p className="text-sm text-[#666666]">
          For {weddingDetails.guestCount} guests over{" "}
          {weddingDetails.weddingDays} day(s)
        </p>
      </div>

      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4 text-center">
        <div className="text-xs text-[#666666] mb-1">
          Grand Total Wedding Cost
        </div>
        <div className="text-3xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
          {formattedTotals.grandTotal}
        </div>
      </div>

      {costs.eventsBreakdown.length > 0 && (
        <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
          <div className="flex items-center mb-4">
            <Calendar className="text-[#AB78FF] mr-3" size={30} />
            <div>
              <h3 className="font-semibold text-[#2C178C]">
                Events Cost Breakdown
              </h3>
              <p className="text-xs text-[#666666]">
                Total: {formattedTotals.totalEventsCost}
              </p>
            </div>
          </div>
          <div className="space-y-3">
            {costs.eventsBreakdown.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-lg p-3 border border-gray-200"
              >
                <div
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleEventExpansion(event.id)}
                >
                  <div>
                    <span className="text-sm font-medium text-gray-700">
                      {event.name}
                    </span>
                    <p className="text-xs text-gray-500">
                      {event.totalGuests} Guests
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                      {formatters.formatIndianCurrency(event.totalCost)}
                    </span>
                    {Object.values(event.breakdown).some((v) => v > 0) ? (
                      <ChevronUp
                        size={16}
                        className={`transition-transform text-gray-500 ${
                          !expandedEvents[event.id] && "rotate-180"
                        }`}
                      />
                    ) : (
                      <div className="w-4" />
                    )}
                  </div>
                </div>
                {expandedEvents[event.id] && (
                  <div className="mt-3 pt-3 border-t space-y-1">
                    {Object.entries(event.breakdown).map(
                      ([name, amount]) =>
                        amount > 0 && (
                          <div
                            key={name}
                            className="flex justify-between text-xs"
                          >
                            <span className="text-gray-600">{name}</span>
                            <span className="font-medium text-[#2C178C]">
                              {formatters.formatIndianCurrency(amount)}
                            </span>
                          </div>
                        )
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {costs.sharedExpensesBreakdown.length > 0 && (
        <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
          <div className="flex items-center mb-4">
            <PieChart className="text-[#B3BEF5] mr-3" size={30} />
            <div>
              <h3 className="font-semibold text-[#2C178C]">Shared Expenses</h3>
              <p className="text-xs text-[#666666]">
                Total: {formattedTotals.totalSharedCost}
              </p>
            </div>
          </div>
          <div className="space-y-2">
            {costs.sharedExpensesBreakdown.map((item) => (
              <div
                key={item.name}
                className="flex justify-between items-center text-sm"
              >
                <span className="text-gray-600">{item.name}</span>
                <span className="font-semibold text-[#2C178C]">
                  {formatters.formatIndianCurrency(item.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="rounded-2xl p-5 border-2 border-gray-200 bg-[#F9F9FB] mb-4">
        <div className="flex items-center mb-4">
          <Users className="text-[#B3BEF5] mr-3" size={30} />
          <div>
            <h3 className="font-semibold text-[#2C178C]">Cost Analysis</h3>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div className="bg-white rounded-lg p-3 border border-gray-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#666666]">Total Events Cost</span>
              <span className="font-semibold text-[#2C178C]">
                {formattedTotals.totalEventsCost}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#666666]">Total Shared Costs</span>
              <span className="font-semibold text-[#2C178C]">
                {formattedTotals.totalSharedCost}
              </span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[#2C178C]">
                  Grand Total
                </span>
                <span className="font-bold text-lg bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                  {formattedTotals.grandTotal}
                </span>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-3 border border-gray-200 space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#666666]">Max Guest Count</span>
              <span className="font-semibold text-[#2C178C]">
                {weddingDetails.guestCount}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#666666]">
                Average Cost Per Guest
              </span>
              <span className="font-semibold text-[#2C178C]">
                {formattedTotals.perGuestCost}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeddingResult;
