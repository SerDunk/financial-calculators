// InHandSalaryAssumptions.jsx
import React, { useState } from "react";

// A small, reusable component for displaying the tax slabs neatly.
const TaxSlabTable = ({ data }) => (
  <div className="text-xs text-[#323233] space-y-1">
    {data.map((row, i) => (
      <div
        key={i}
        className="flex justify-between items-center p-2 bg-white rounded-lg border"
      >
        <span className="w-1/2">{row.slab}</span>
        <span className="font-mono text-[#F04393]">{row.rate}</span>
      </div>
    ))}
  </div>
);

export default function InHandSalaryAssumptions() {
  const [activeTab, setActiveTab] = useState("taxSlabs");

  const oldRegimeSlabs = [
    { slab: "Up to ₹2,50,000", rate: "No Tax" },
    { slab: "₹2,50,001 - ₹5,00,000", rate: "5%" },
    { slab: "₹5,00,001 - ₹10,00,000", rate: "20%" },
    { slab: "Above ₹10,00,000", rate: "30%" },
  ];

  const newRegimeSlabs = [
    { slab: "Up to ₹3,00,000", rate: "No Tax" },
    { slab: "₹3,00,001 - ₹6,00,000", rate: "5%" },
    { slab: "₹6,00,001 - ₹9,00,000", rate: "10%" },
    { slab: "₹9,00,001 - ₹12,00,000", rate: "15%" },
    { slab: "₹12,00,001 - ₹15,00,000", rate: "20%" },
    { slab: "Above ₹15,00,000", rate: "30%" },
  ];

  return (
    <div className="sm:mt-4 mt-3 bg-white rounded-lg shadow-sm">
      <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-2 font-semibold text-sm">
        How This Calculator Works
      </div>

      <div className="bg-white border-b border-[#E5E2F2]">
        <div className="flex sm:justify-around">
          <button
            onClick={() => setActiveTab("taxSlabs")}
            className={`flex-1 sm:flex-none px-3 py-3 text-xs font-medium transition-colors ${
              activeTab === "taxSlabs"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Tax Slabs (FY 24-25)
          </button>
          <button
            onClick={() => setActiveTab("methodology")}
            className={`flex-1 sm:flex-none px-3 py-3 text-xs font-medium transition-colors ${
              activeTab === "methodology"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Methodology
          </button>
          <button
            onClick={() => setActiveTab("assumptions")}
            className={`flex-1 sm:flex-none px-3 py-3 text-xs font-medium transition-colors ${
              activeTab === "assumptions"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Assumptions
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === "taxSlabs" && (
          <div className="space-y-4">
            <div>
              <div className="text-sm font-semibold text-[#2C178C] mb-2">
                New Regime Slabs (Default Option)
              </div>
              <TaxSlabTable data={newRegimeSlabs} />
            </div>
            <div>
              <div className="text-sm font-semibold text-[#2C178C] mb-2">
                Old Regime Slabs
              </div>
              <TaxSlabTable data={oldRegimeSlabs} />
            </div>
            <p className="text-xs text-gray-500 mt-2 p-2 bg-indigo-50 rounded-md">
              <strong>Note:</strong> A 4% Health & Education Cess is added to
              the final tax amount. A tax rebate under Section 87A makes income
              effectively tax-free up to ₹7 Lakhs (New Regime) or ₹5 Lakhs (Old
              Regime).
            </p>
          </div>
        )}

        {activeTab === "methodology" && (
          <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
            <div className="text-xs font-semibold text-[#2C178C] mb-2">
              Payslip Calculation Model
            </div>
            <div className="text-xs text-[#323233] space-y-2">
              <p>
                1. <strong>Gross Salary Calculation:</strong> We first determine
                your annual Gross Salary by subtracting employer-side costs
                (like Employer's PF share and Gratuity) from your total CTC.
              </p>
              <p>
                2. <strong>Earning Components Derivation:</strong> From the
                Gross Salary, we derive standard earning components: Basic
                Salary, HRA, and a balancing Special Allowance.
              </p>
              <p>
                3. <strong>Taxable Income Calculation:</strong> Based on your
                chosen regime, we subtract all applicable deductions (like
                Standard Deduction, HRA exemption, 80C, etc.) from your Gross
                Salary.
              </p>
              <p>
                4. <strong>Net Salary Calculation:</strong> The final Net
                In-Hand Salary is your Gross Earnings minus all monthly
                deductions, including the calculated Income Tax and your PF
                contribution.
              </p>
            </div>
          </div>
        )}

        {activeTab === "assumptions" && (
          <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
            <div className="text-xs font-semibold text-[#2C178C] mb-2">
              Core Payroll Assumptions
            </div>
            <div className="text-xs text-[#323233] space-y-2">
              <p>
                • <strong>Employer's PF:</strong> Assumed to be equal to your
                monthly PF contribution input for CTC calculation.
              </p>
              <p>
                • <strong>Basic Salary:</strong> Assumed to be{" "}
                <strong>40% of your Gross Salary</strong>. This is a common
                industry standard used for modeling.
              </p>
              <p>
                • <strong>House Rent Allowance (HRA):</strong> Assumed to be{" "}
                <strong>50% of your Basic Salary</strong>, a standard for metro
                cities.
              </p>
              <p>
                • <strong>Special Allowance:</strong> This is calculated as the
                remaining balancing portion of your Gross Salary after Basic and
                HRA are allocated.
              </p>
              <p>
                • <strong>Professional Tax:</strong> Fixed at the standard rate
                of ₹2,400 per year (₹200 per month), applicable in most states.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
