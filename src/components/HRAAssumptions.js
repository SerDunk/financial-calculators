"use client";
import React, { useState } from "react";

export default function HRAAssumptions() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "rules", label: "Calculation Rules" },
    { id: "assumptions", label: "Assumptions" },
  ];

  return (
    <div className="sm:mt-6 mt-5 bg-white rounded-lg shadow-sm border border-gray-100 mb-8">
      <div className="bg-[#E5E2F2] text-[#2C178C] rounded-t-lg px-4 py-2 font-semibold text-sm">
        How This Calculator Works
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-[#E5E2F2]">
        <div className="flex sm:justify-around">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-3 text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-[#2C178C] border-b-2 border-[#2C178C]"
                  : "text-[#686868] hover:text-[#2C178C]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-4">
        {activeTab === "overview" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">🏠 What is HRA Exemption?</div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  House Rent Allowance (HRA) exemption allows salaried employees to reduce their
                  taxable income by the amount of rent they pay. There are two legal routes:
                </p>
                <p>
                  •{" "}
                  <strong>Section 10(13A):</strong> For salaried employees who receive HRA as a
                  named component in their salary slip. No absolute cap — depends on the three-condition
                  formula.
                </p>
                <p>
                  •{" "}
                  <strong>Section 80GG:</strong> For individuals with no HRA component (self-employed,
                  freelancers, or salaried without HRA). Strictly capped at ₹5,000/month (₹60,000/year).
                  Requires Form 10BA.
                </p>
                <p className="bg-amber-50 border border-amber-200 rounded-lg p-2 text-amber-800">
                  ⚠️ Both exemptions are available <strong>only under the Old Tax Regime.</strong>{" "}
                  Under the New Regime, your entire HRA received is fully taxable.
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">⭐ 2026 Metro City Update</div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>
                  Under the Income Tax Rules 2026 effective 1 April 2026, four additional cities have
                  been elevated to metro status, raising the HRA rate from 40% to 50%:
                </p>
                <div className="grid grid-cols-2 gap-1 mt-2">
                  {["Delhi", "Mumbai", "Kolkata", "Chennai", "Bengaluru ★", "Hyderabad ★", "Pune ★", "Ahmedabad ★"].map((city) => (
                    <div
                      key={city}
                      className={`flex items-center p-1.5 rounded-lg text-xs font-medium ${
                        city.includes("★")
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-white text-gray-700 border border-gray-100"
                      }`}
                    >
                      <span className="mr-1">🏙</span> {city.replace(" ★", "")}
                      {city.includes("★") && (
                        <span className="ml-auto text-[9px] font-bold text-green-600">NEW</span>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-gray-500 mt-1">All other cities: 40% (Non-Metro)</p>
              </div>
            </div>

            <div
              style={{ background: "radial-gradient(ellipse 113px 357px at center, #8362D1 -60%, #192226 130%)" }}
              className="p-3 rounded-xl text-white"
            >
              <div className="text-xs font-semibold mb-1.5">💡 Key Tip</div>
              <div className="text-xs leading-relaxed">
                If you work in Bengaluru, Hyderabad, Pune, or Ahmedabad, your HRA exemption just
                increased by up to 25% from FY 2026-27. This is the first change to the metro city
                list in decades and significantly benefits India&apos;s tech hub workforce.
              </div>
            </div>
          </div>
        )}

        {activeTab === "rules" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🧮 Section 10(13A) — Three Condition Formula
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <p>HRA Exemption = <strong>Minimum</strong> of the following three conditions:</p>
                <div className="space-y-1.5 mt-2">
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <p className="font-semibold text-[#020288]">Condition 1</p>
                    <p>Actual annual HRA received from employer</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <p className="font-semibold text-[#020288]">Condition 2</p>
                    <p>50% × Annual Salary (8 metro cities) <span className="text-gray-400">or</span> 40% × Annual Salary (all others)</p>
                    <p className="text-gray-500 text-[10px] mt-0.5">Salary = Basic + DA + Commission (% of turnover only)</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <p className="font-semibold text-[#020288]">Condition 3</p>
                    <p>Annual Rent Paid − 10% of Annual Salary (minimum zero)</p>
                  </div>
                </div>
                <p className="text-gray-500 italic text-[10px] mt-1">
                  The limiting condition (binding constraint) is highlighted in amber in the results.
                </p>
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">
                🧮 Section 80GG — Three Condition Formula
              </div>
              <div className="space-y-2 text-xs text-[#323233]">
                <p>80GG Deduction = <strong>Minimum</strong> of:</p>
                <div className="space-y-1.5 mt-2">
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <p className="font-semibold text-[#020288]">Condition 1</p>
                    <p>₹5,000 per month = ₹60,000 annually (absolute cap)</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <p className="font-semibold text-[#020288]">Condition 2</p>
                    <p>25% of Adjusted Gross Total Income</p>
                    <p className="text-gray-500 text-[10px] mt-0.5">Gross Total Income before LTCG and this deduction</p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-gray-100">
                    <p className="font-semibold text-[#020288]">Condition 3</p>
                    <p>Annual Rent Paid − 10% of Adjusted GTI (minimum zero)</p>
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-2 text-red-800 mt-2">
                  <strong>Exclusions:</strong> Cannot be claimed if you (or spouse/minor child) own
                  property in the city of work/residence. Form 10BA must be filed on the IT portal.
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "assumptions" && (
          <div className="space-y-3">
            <div className="bg-gradient-to-r from-[#F8F6FF] to-[#FFF5FA] p-3 rounded-xl border border-[#E5E2F2]">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">⚙️ Core Assumptions (FY 2026-27)</div>
              <div className="space-y-1.5 text-xs text-[#323233]">
                {[
                  ["Metro Cities (50% rate)", "Delhi, Mumbai, Kolkata, Chennai + Bengaluru, Hyderabad, Pune, Ahmedabad (Income Tax Rules 2026)"],
                  ["HRA Salary Base", "Basic + DA + Commission (% of turnover only). HRA, bonus, and other allowances excluded."],
                  ["Sec 10(13A) availability", "Old Tax Regime only. Fully taxable under New Regime."],
                  ["Sec 80GG cap", "₹5,000/month (₹60,000/year). Old Regime only. Form 10BA mandatory."],
                  ["Cess", "4% applied to all tax saving amounts."],
                  ["Surcharge", "Not included. Consult a CA if total income exceeds ₹50 lakh."],
                ].map(([key, val]) => (
                  <div key={key} className="flex justify-between p-2 bg-white rounded-lg gap-2">
                    <span className="font-medium text-[#020288] shrink-0">{key}</span>
                    <span className="text-[#686868] text-right">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#F5F4F7] p-3 rounded-xl">
              <div className="text-xs font-semibold text-[#2C178C] mb-2">⚠️ Limitations</div>
              <div className="text-xs text-[#323233] space-y-2">
                <p>• <strong>Indicative Only:</strong> This calculator is not a substitute for professional tax advice or your employer&apos;s Form 12BB/Form 16 computation.</p>
                <p>• <strong>Mid-Year Changes:</strong> HRA is calculated month-by-month. City changes, salary revisions, and variable rent affect the actual exemption.</p>
                <p>• <strong>Form 10BA:</strong> For 80GG, this form must be filed on the Income Tax portal every year before your ITR. Not filing = no deduction, even if otherwise eligible.</p>
                <p>• <strong>PAN Requirement:</strong> For annual rent exceeding ₹1 lakh, landlord&apos;s PAN is mandatory. Failure to provide may lead to HRA claim disallowance in Form 16.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
