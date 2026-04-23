import React, { useState } from "react";

export default function LeaveEncashmentAssumptions() {
  const [activeTab, setActiveTab] = useState("framework");

  return (
    <div className="sm:mt-6 mt-5 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-2 font-semibold text-sm">
        Rules & Assumptions
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-[#E5E2F2]">
        <div className="flex sm:justify-around overflow-x-auto">
          <button
            onClick={() => setActiveTab("framework")}
            className={`px-3 py-3 text-xs font-medium whitespace-nowrap transition-colors ${
              activeTab === "framework"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Statutory Framework
          </button>
          <button
            onClick={() => setActiveTab("rules")}
            className={`px-3 py-3 text-xs font-medium whitespace-nowrap transition-colors ${
              activeTab === "rules"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Four-Limb Test
          </button>
          <button
            onClick={() => setActiveTab("scenarios")}
            className={`px-3 py-3 text-xs font-medium whitespace-nowrap transition-colors ${
              activeTab === "scenarios"
                ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                : "text-[#686868] hover:text-[#2C178C]"
            }`}
          >
            Special Scenarios
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === "framework" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🏛️ Section 10(10AA) Income Tax Act
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  • <strong>ITA 2025:</strong> Leave encashment exemption rules are carried forward substantively unchanged under the new Income Tax Act, 2025 (effective 1 April 2026).
                </p>
                <p>
                  • <strong>Government Employees:</strong> Central and State government employees receive 100% tax exemption on leave encashment at retirement, with no monetary ceiling. Maximum encashable leave is typically 300 days for Central Govt.
                </p>
                <p>
                  • <strong>Private / PSU Employees:</strong> Exempt up to the least of four statutory conditions, subject to a lifetime aggregate cap.
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                💰 The ₹25 Lakh Lifetime Cap
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                 <p>The exemption limit was raised from ₹3 lakh to ₹25 lakh w.e.f. 1 April 2023.</p>
                 <ul className="space-y-1">
                   <li>• It is a <strong>lifetime aggregate</strong> across all employers ever worked for — not per employer or per year.</li>
                   <li>• If you claimed an exemption from a previous employer, the balance available is ₹25L minus all previously claimed amounts.</li>
                   <li>• You must declare prior exemptions in Form 130 (previously Form 16) / ITR.</li>
                 </ul>
              </div>
            </div>
            
            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⚖️ Tax Regime Applicability
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                 <p>Section 10(10AA) is an exemption, not a deduction. It is available under <strong>both Old and New Tax Regimes</strong>.</p>
                 <p>Only the taxable portion (Gross minus Exempt amount) is taxed at the applicable marginal slab rate under your chosen regime.</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "rules" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📐 Salary Base for Calculation
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <p>Salary = Basic Salary + Dearness Allowance + Commission (fixed % of turnover only).</p>
                <p>HRA, bonus, overtime, medical allowance, and other perquisites are strictly excluded. The average of the last 10 months' salary immediately preceding retirement is used.</p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl mt-3">
               <div className="text-xs font-semibold text-[#2C178C] mb-2">
                 🧩 The Four-Limb Test (Private & PSU)
               </div>
               <div className="space-y-2 text-xs text-[#323233]">
                  <p>Exemption is the lowest of the following four amounts:</p>
                  <ul className="space-y-2 mt-2">
                     <li><strong>Limb 1:</strong> Actual leave encashment amount received.</li>
                     <li><strong>Limb 2:</strong> The ₹25,00,000 lifetime statutory limit (minus past claims).</li>
                     <li><strong>Limb 3:</strong> 10 months' average salary base.</li>
                     <li><strong>Limb 4:</strong> Cash equivalent of earned leave. <em>Crucially, even if an employer grants more than 30 days of earned leave per year, only a maximum of 30 days per completed year of service can be used for this calculation.</em></li>
                  </ul>
               </div>
            </div>
          </div>
        )}

        {activeTab === "scenarios" && (
          <div className="space-y-3">
             <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                ⏳ During Service & Section 89
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                 <p>Leave encashment received while still employed is <strong>100% taxable</strong> as salary under both regimes. The Section 10(10AA) exemption does not apply.</p>
                 <p>If this causes a massive income spike, you can claim <strong>Section 89(1) relief</strong> by filing Form 10E on the IT portal before submitting your ITR.</p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🕊️ Death of Employee
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>Leave encashment paid to the legal heirs of a deceased employee is <strong>fully tax-exempt</strong>. There is no monetary limit, no four-limb test, and it applies regardless of government or private sector employment.</p>
              </div>
            </div>
            
            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                📈 Cess and Surcharge
              </div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>A 4% Health and Education Cess applies on all tax amounts. Surcharge applies if total income exceeds ₹50 lakh. This calculator does not automatically apply surcharge — please consult a CA if your income is in the surcharge bracket.</p>
                <p className="italic text-gray-500 mt-2">Calculator is indicative only and does not constitute professional tax advice.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
