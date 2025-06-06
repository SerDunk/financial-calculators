"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Toggle } from "@/components/ui/toggle";
import { ChevronDown, ChevronUp } from "lucide-react";

const AmortizationSchedule = ({ amortizationTable, yearlyAmortization }) => {
  const [viewType, setViewType] = useState("yearly");
  const [isCollapsed, setIsCollapsed] = useState(false);

  const formatCurrency = (amount) => {
    return `₹ ${(amount || 0).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    })}`;
  };

  const renderYearlyTable = () => (
    <Table className="text-xs">
      <TableHeader>
        <TableRow className="bg-[#F5F4F7] hover:bg-[#F5F4F7]">
          <TableHead className="text-[#323233] font-semibold px-3 py-3 text-left">
            Year
          </TableHead>
          <TableHead className="text-[#323233] font-semibold px-3 py-3 text-right">
            Opening Balance
          </TableHead>
          <TableHead className="text-[#323233] font-semibold px-3 py-3 text-right">
            Principal
          </TableHead>
          <TableHead className="text-[#323233] font-semibold px-3 py-3 text-right">
            Interest
          </TableHead>
          <TableHead className="text-[#323233] font-semibold px-3 py-3 text-right">
            Closing Balance
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {yearlyAmortization.length > 0 ? (
          yearlyAmortization.map((year, index) => (
            <TableRow
              key={index}
              className="border-b border-[#F5F4F7] hover:bg-[#FAFAFA] transition-colors"
            >
              <TableCell className="px-3 py-3 text-[#323233] font-medium">
                {year.year}
              </TableCell>
              <TableCell className="px-3 py-3 text-right text-[#686868]">
                {formatCurrency(year.startBalance)}
              </TableCell>
              <TableCell className="px-3 py-3 text-right text-[#2C178C] font-medium">
                {formatCurrency(year.principal)}
              </TableCell>
              <TableCell className="px-3 py-3 text-right text-[#F04393] font-medium">
                {formatCurrency(year.interest)}
              </TableCell>
              <TableCell className="px-3 py-3 text-right text-[#686868]">
                {formatCurrency(year.endBalance)}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell
              colSpan="5"
              className="px-3 py-8 text-center text-[#686868]"
            >
              No amortization data available. Please calculate first.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  const renderMonthlyTable = () => (
    <div className="max-h-96 overflow-y-auto">
      <Table className="text-xs">
        <TableHeader className="sticky top-0 bg-white">
          <TableRow className="bg-[#F5F4F7] hover:bg-[#F5F4F7]">
            <TableHead className="text-[#323233] font-semibold px-2 py-3 text-center">
              Month
            </TableHead>
            <TableHead className="text-[#323233] font-semibold px-2 py-3 text-center">
              Opening Balance
            </TableHead>
            <TableHead className="text-[#323233] font-semibold px-2 py-3 text-center">
              EMI
            </TableHead>
            <TableHead className="text-[#323233] font-semibold px-2 py-3 text-center">
              Principal
            </TableHead>
            <TableHead className="text-[#323233] font-semibold px-2 py-3 text-center">
              Interest
            </TableHead>
            <TableHead className="text-[#323233] font-semibold px-2 py-3 text-center">
              Closing Balance
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {amortizationTable.length > 0 ? (
            amortizationTable.map((month, index) => (
              <TableRow
                key={index}
                className="border-b border-[#F5F4F7] hover:bg-[#FAFAFA] transition-colors text-center"
              >
                <TableCell className="px-2 py-3 text-[#323233] text-center font-medium">
                  {month.month}
                </TableCell>
                <TableCell className="px-2 py-3 text-center text-[#686868]">
                  {formatCurrency(month.openingBalance)}
                </TableCell>
                <TableCell className="px-2 py-3 text-center text-[#323233] font-medium">
                  {formatCurrency(month.emi)}
                </TableCell>
                <TableCell className="px-2 py-3 text-center text-[#2C178C] font-medium">
                  {formatCurrency(month.principal)}
                </TableCell>
                <TableCell className="px-2 py-3 text-center text-[#F04393] font-medium">
                  {formatCurrency(month.interest)}
                </TableCell>
                <TableCell className="px-2 py-3 text-center text-[#686868]">
                  {formatCurrency(month.closingBalance)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan="6"
                className="px-3 py-8 text-center text-[#686868]"
              >
                No amortization data available. Please calculate first.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );

  return (
    <div className="sm:mt-6 mt-5 bg-white rounded-lg shadow-sm font-lexend">
      <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-3 font-semibold text-sm flex justify-between items-center">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center justify-between hover:text-[#1F0F6B] w-full transition-colors"
        >
          <span>Amortization Schedule</span>
          {isCollapsed ? (
            <ChevronDown className="h-4 w-4 transition-transform" />
          ) : (
            <ChevronUp className="h-4 w-4 transition-transform" />
          )}
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isCollapsed ? "max-h-0" : "max-h-[1000px]"
        }`}
      >
        {/* View Switcher */}
        {!isCollapsed && (
          <div className="bg-white px-4 py-3 border-b border-[#E5E2F2]">
            <div className="flex items-center justify-center gap-1">
              <Toggle
                pressed={viewType === "yearly"}
                onPressedChange={() => setViewType("yearly")}
                className="text-xs font-medium data-[state=on]:bg-[#2C178C] data-[state=on]:text-white hover:bg-[#F5F4F7] text-[#686868]"
              >
                Yearly View
              </Toggle>
              <Toggle
                pressed={viewType === "monthly"}
                onPressedChange={() => setViewType("monthly")}
                className="text-xs font-medium data-[state=on]:bg-[#2C178C] data-[state=on]:text-white hover:bg-[#F5F4F7] text-[#686868]"
              >
                Monthly View
              </Toggle>
            </div>
          </div>
        )}

        <div className="bg-white rounded-b-lg overflow-hidden">
          {viewType === "yearly" ? renderYearlyTable() : renderMonthlyTable()}
        </div>

        {/* Summary Footer */}
        <div className="bg-[#F5F4F7] px-4 py-3 text-xs text-[#686868] rounded-b-lg border-t border-[#E5E2F2]">
          <div className="flex justify-between items-center">
            <span>
              Showing {viewType === "yearly" ? "yearly" : "monthly"} breakdown
            </span>
            <span className="text-[#2C178C] font-medium">
              {viewType === "yearly"
                ? `${yearlyAmortization.length} years`
                : `${amortizationTable.length} months`}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AmortizationSchedule;
