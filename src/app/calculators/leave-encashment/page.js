"use client";

import { useState, useEffect } from "react";
import { calculateLeaveEncashment } from "@/utils/calculation";
import Heading from "@/components/Heading";
import SliderInput from "@/components/SliderInput";
import LeaveEncashmentResult from "@/components/LeaveEncashmentResult";
import LeaveEncashmentBreakdown from "@/components/LeaveEncashmentBreakdown";
import LeaveEncashmentGraph from "@/components/LeaveEncashmentGraph";
import LeaveEncashmentAssumptions from "@/components/LeaveEncashmentAssumptions";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function LeaveEncashment() {
  // Section 1: Profile
  const [employeeType, setEmployeeType] = useState("private"); // government, psu, private
  const [encashmentTrigger, setEncashmentTrigger] = useState("retirement"); // service, retirement, death
  const [taxRegime, setTaxRegime] = useState("new");

  // Section 2: Salary Details
  const [basicSalary, setBasicSalary] = useState(50000);
  const [da, setDa] = useState(0);
  const [commission, setCommission] = useState(0);

  // Section 3: Leave Details
  const [yearsOfService, setYearsOfService] = useState(10);
  const [entitledLeaveDays, setEntitledLeaveDays] = useState(30);
  const [unusedLeaveDays, setUnusedLeaveDays] = useState(150);

  // Section 4: Govt Details
  const [maxEncashableDaysGovt, setMaxEncashableDaysGovt] = useState(300);

  // Section 5: Lifetime Tracker (Private/PSU only)
  const [isLifetimeExpanded, setIsLifetimeExpanded] = useState(false);
  const [hasPriorExemption, setHasPriorExemption] = useState("no");
  const [priorExemptionClaimed, setPriorExemptionClaimed] = useState(0);

  // Section 6: Tax & Income
  const [isTaxExpanded, setIsTaxExpanded] = useState(false);
  const [otherSalaryIncome, setOtherSalaryIncome] = useState(1200000);
  const [overrideSlabRate, setOverrideSlabRate] = useState("auto"); // auto, 0, 5, 10, 15, 20, 25, 30
  const [hasServiceEncashment, setHasServiceEncashment] = useState(false);
  const [serviceEncashmentAmount, setServiceEncashmentAmount] = useState(0);

  const [result, setResult] = useState(null);

  useEffect(() => {
    performCalculations();
  }, [
    employeeType, encashmentTrigger, taxRegime, basicSalary, da, commission,
    yearsOfService, entitledLeaveDays, unusedLeaveDays, maxEncashableDaysGovt,
    hasPriorExemption, priorExemptionClaimed, otherSalaryIncome, overrideSlabRate,
    hasServiceEncashment, serviceEncashmentAmount
  ]);

  const performCalculations = () => {
    const override = overrideSlabRate === "auto" ? null : parseInt(overrideSlabRate);
    
    const inputs = {
      employeeType: employeeType === 'psu' ? 'private' : employeeType,
      encashmentTrigger,
      taxRegime,
      basicSalary,
      da,
      commission,
      yearsOfService,
      entitledLeaveDays,
      unusedLeaveDays,
      maxEncashableDaysGovt,
      priorExemptionClaimed: hasPriorExemption === 'yes' ? priorExemptionClaimed : 0,
      otherSalaryIncome,
      leaveEncashmentDuringServiceThisYear: hasServiceEncashment ? serviceEncashmentAmount : 0,
      overrideSlabRate: override
    };
    
    const breakdown = calculateLeaveEncashment(inputs);
    setResult(breakdown);
  };

  const monthlySalaryBase = basicSalary + da + commission;
  const maxPossibleDays = yearsOfService * entitledLeaveDays;
  const isDaysExceeded = unusedLeaveDays > maxPossibleDays;

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-1.5 xs:px-0 pb-10">
      <div className="max-w-xl mx-auto pt-6">
        <Heading
          header="Leave Encashment Calculator"
          desc="Calculate your tax exemption under Section 10(10AA) for FY 2026-27"
        />

        <div className="flex flex-col gap-3">
          
          {/* BANNERS */}
          {encashmentTrigger === 'service' && (
            <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-xl text-sm shadow-sm">
              <span className="font-bold">⚠️ During Service:</span> Leave encashed during active service is 100% taxable as salary income — no exemption applies. The Section 10(10AA) exemption is only available at retirement or resignation.
            </div>
          )}
          {encashmentTrigger === 'death' && (
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-sm shadow-sm">
              <span className="font-bold">✓ Death Scenario:</span> Leave encashment paid to the legal heirs of a deceased employee is 100% tax-exempt with no monetary limit — regardless of employment type or amount received.
            </div>
          )}
          {encashmentTrigger === 'retirement' && employeeType === 'government' && (
            <div className="bg-green-50 border border-green-200 text-green-800 p-4 rounded-xl text-sm shadow-sm">
              <span className="font-bold">✓ Government Employee:</span> As a Central/State Government employee, 100% of your leave encashment at retirement is tax-free under Section 10(10AA)(i). No monetary ceiling applies. Maximum encashable leave: 300 days (Central Government).
            </div>
          )}

          {/* Section 1: Employee Profile */}
          <div className="rounded-2xl p-6 relative bg-white shadow-sm border border-gray-100">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">1. Employee Profile</h2>
            <div className="flex flex-col gap-5 mt-3">
              
              <div className="mb-1">
                <label className="text-sm font-medium text-[#1A237E] mb-2 flex items-center gap-1 group relative">
                  Employee Type
                  <span className="text-gray-400 cursor-help text-xs">ⓘ</span>
                  <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 bg-gray-800 text-white text-xs p-2 rounded z-10 shadow-lg">
                    Government employees (central and state) get 100% tax exemption on retirement leave encashment with no upper limit. PSU and bank employees are treated as private sector for this exemption.
                  </div>
                </label>
                <div className="flex flex-col sm:flex-row bg-[#EFEDF4] rounded-lg p-1 gap-1">
                  <button 
                    onClick={() => setEmployeeType("government")}
                    className={`flex-1 text-xs py-2 px-1 rounded-md transition-all ${employeeType === "government" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Government</button>
                  <button 
                    onClick={() => setEmployeeType("psu")}
                    className={`flex-1 text-xs py-2 px-1 rounded-md transition-all ${employeeType === "psu" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >PSU / Bank</button>
                  <button 
                    onClick={() => setEmployeeType("private")}
                    className={`flex-1 text-xs py-2 px-1 rounded-md transition-all ${employeeType === "private" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Private Sector</button>
                </div>
                {employeeType === 'psu' && (
                  <p className="text-[11px] text-gray-500 mt-2 bg-blue-50 p-2 rounded">
                    PSU and public sector bank employees are treated as private sector employees for leave encashment tax purposes — not government employees. The ₹25 lakh cap and four-limb test both apply.
                  </p>
                )}
              </div>

              <div className="mb-1">
                <label className="text-sm font-medium text-[#1A237E] mb-2 block">Encashment Trigger</label>
                <div className="flex flex-col sm:flex-row bg-[#EFEDF4] rounded-lg p-1 gap-1">
                  <button 
                    onClick={() => setEncashmentTrigger("service")}
                    className={`flex-1 text-xs py-2 px-1 rounded-md transition-all ${encashmentTrigger === "service" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >During Service</button>
                  <button 
                    onClick={() => setEncashmentTrigger("retirement")}
                    className={`flex-1 text-xs py-2 px-1 rounded-md transition-all ${encashmentTrigger === "retirement" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Retirement / Resignation</button>
                  <button 
                    onClick={() => setEncashmentTrigger("death")}
                    className={`flex-1 text-xs py-2 px-1 rounded-md transition-all ${encashmentTrigger === "death" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Death (Legal Heir)</button>
                </div>
              </div>

              <div className="mb-1">
                <label className="text-sm font-medium text-[#1A237E] mb-2 flex items-center gap-1 group relative">
                  Tax Regime
                  <span className="text-gray-400 cursor-help text-xs">ⓘ</span>
                  <div className="absolute bottom-full left-0 mb-2 hidden group-hover:block w-64 bg-gray-800 text-white text-xs p-2 rounded z-10 shadow-lg">
                    Section 10(10AA) exemption applies under BOTH regimes. The regime only affects how the taxable portion (above exemption) is taxed.
                  </div>
                </label>
                <div className="flex bg-[#EFEDF4] rounded-lg p-1">
                  <button 
                    onClick={() => setTaxRegime("new")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${taxRegime === "new" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >New Regime</button>
                  <button 
                    onClick={() => setTaxRegime("old")}
                    className={`flex-1 text-xs py-2 rounded-md transition-all ${taxRegime === "old" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                  >Old Regime</button>
                </div>
              </div>

            </div>
          </div>

          {/* Section 2: Salary Details */}
          <div className="rounded-2xl p-6 relative bg-white shadow-sm border border-gray-100">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">2. Salary Details (Last 10 Months Avg)</h2>
            <div className="flex flex-col gap-5 mt-3">
              <SliderInput
                label="Basic Salary (Monthly ₹)"
                value={basicSalary}
                onChange={setBasicSalary}
                min={5000}
                max={500000}
                step={1000}
                tooltip="Average of Basic Salary drawn in the 10 months immediately preceding retirement/resignation. If salary was constant, use current Basic."
                showCurrency={true}
              />
              <SliderInput
                label="Dearness Allowance / DA (Monthly ₹)"
                value={da}
                onChange={setDa}
                min={0}
                max={300000}
                step={500}
                tooltip="Average DA in the last 10 months. Most private sector employees have ₹0 DA. Government and PSU employees typically have significant DA."
                showCurrency={true}
              />
              <SliderInput
                label="Fixed Commission as % of Turnover (Monthly ₹)"
                value={commission}
                onChange={setCommission}
                min={0}
                max={200000}
                step={500}
                tooltip="Only commission calculated as a fixed percentage of turnover is included in the salary base. Flat bonuses, HRA, and other allowances are excluded."
                showCurrency={true}
              />
              <div className="p-3 bg-indigo-50 text-indigo-800 text-sm font-medium rounded-lg border border-indigo-100 flex justify-between">
                <span>Salary Base (Basic + DA + Commission)</span>
                <span>₹{monthlySalaryBase.toLocaleString('en-IN')}/month</span>
              </div>
            </div>
          </div>

          {/* Section 3: Leave Details */}
          <div className="rounded-2xl p-6 relative bg-white shadow-sm border border-gray-100">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">3. Leave Details</h2>
            <div className="flex flex-col gap-5 mt-3">
              <SliderInput
                label="Years of Completed Service"
                value={yearsOfService}
                onChange={setYearsOfService}
                min={1}
                max={40}
                step={1}
                tooltip="Total completed years of continuous service. Partial years are generally not counted."
              />
              
              <div>
                <SliderInput
                  label="Earned / Privilege Leave Entitled per Year"
                  value={entitledLeaveDays}
                  onChange={setEntitledLeaveDays}
                  min={15}
                  max={60}
                  step={1}
                  tooltip="As per your company's leave policy. Factories Act guarantees 1 day per 20 days worked (~15 days/year); most private companies offer 15–21 days; government offers 30 days."
                />
                {entitledLeaveDays > 30 && (employeeType === 'private' || employeeType === 'psu') && encashmentTrigger === 'retirement' && (
                  <p className="text-[11px] text-gray-500 mt-2 bg-gray-50 p-2 rounded">
                    ⚡ The 30-days/year cap in Limb 4 is fixed by law — it cannot be increased even if your company gives you {entitledLeaveDays} days of earned leave per year. Extra entitlement above 30 days helps increase your gross encashment, but does not improve the exemption calculation under Limb 4.
                  </p>
                )}
              </div>

              <div>
                <SliderInput
                  label="Actual Unused Earned Leave Days at Encashment"
                  value={unusedLeaveDays}
                  onChange={setUnusedLeaveDays}
                  min={0}
                  max={600}
                  step={1}
                  tooltip="Total accumulated earned/privilege leave days in your leave account at the time of encashment."
                />
                {isDaysExceeded && (
                  <p className="text-[11px] text-amber-700 mt-2 bg-amber-50 p-2 rounded border border-amber-200">
                    ⚠️ Entered days ({unusedLeaveDays}) exceed maximum possible accrual ({maxPossibleDays}) based on your service ({yearsOfService} yrs) and entitlement ({entitledLeaveDays} days/yr).
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Section 4: Govt Details */}
          {employeeType === 'government' && (
             <div className="rounded-2xl p-6 relative bg-white shadow-sm border border-gray-100">
               <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">4. Government Service Rules</h2>
               <div className="flex flex-col gap-5 mt-3">
                 <SliderInput
                   label="Maximum Encashable Leave Days"
                   value={maxEncashableDaysGovt}
                   onChange={setMaxEncashableDaysGovt}
                   min={240}
                   max={300}
                   step={10}
                   tooltip="Central government employees can encash a maximum of 300 days of earned leave. Some state governments have different caps — check your service rules."
                 />
               </div>
             </div>
          )}

          {/* Section 5: Lifetime Tracker */}
          {(employeeType === 'private' || employeeType === 'psu') && (
            <div className="rounded-2xl p-6 relative bg-white shadow-sm border border-gray-100">
              <div 
                className="flex justify-between items-center cursor-pointer border-b pb-2 mb-3"
                onClick={() => setIsLifetimeExpanded(!isLifetimeExpanded)}
              >
                <h2 className="text-[#020288] text-base font-semibold">5. Lifetime Exemption Tracker (₹25L Cap)</h2>
                <div className="bg-blue-50 p-1.5 rounded-full text-blue-600">
                  {isLifetimeExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>
              
              {!isLifetimeExpanded && (
                <p className="text-xs text-gray-500 italic mt-2 cursor-pointer" onClick={() => setIsLifetimeExpanded(true)}>
                  Tap to securely expand the lifetime limit settings...
                </p>
              )}

              {isLifetimeExpanded && (
                <div className="flex flex-col gap-5 mt-4">
                  <div className="mb-1">
                    <label className="text-sm font-medium text-[#1A237E] mb-2 block">Claimed leave encashment exemption from any previous employer?</label>
                    <div className="flex bg-[#EFEDF4] rounded-lg p-1">
                      <button 
                        onClick={() => setHasPriorExemption("no")}
                        className={`flex-1 text-xs py-2 rounded-md transition-all ${hasPriorExemption === "no" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                      >No — First Time</button>
                      <button 
                        onClick={() => setHasPriorExemption("yes")}
                        className={`flex-1 text-xs py-2 rounded-md transition-all ${hasPriorExemption === "yes" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                      >Yes — Partial Used</button>
                    </div>
                  </div>

                  {hasPriorExemption === 'yes' && (
                    <>
                      <SliderInput
                        label="Exemption Already Claimed from Previous Employers"
                        value={priorExemptionClaimed}
                        onChange={setPriorExemptionClaimed}
                        min={0}
                        max={2500000}
                        step={25000}
                        tooltip="Lifetime aggregate cap of ₹25 lakh. Check your previous ITRs or Form 16s for amounts claimed. If this exceeds ₹25L, no further exemption is available."
                        showCurrency={true}
                      />
                      <div className="p-3 bg-indigo-50 text-indigo-800 text-sm font-medium rounded-lg border border-indigo-100 flex justify-between">
                        <span>Remaining Lifetime Exemption Available</span>
                        <span>₹{Math.max(0, 2500000 - priorExemptionClaimed).toLocaleString('en-IN')}</span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Section 6: Tax & Income */}
          <div className="rounded-2xl p-6 relative bg-white shadow-sm border border-gray-100">
            <div 
              className="flex justify-between items-center cursor-pointer border-b pb-2 mb-3"
              onClick={() => setIsTaxExpanded(!isTaxExpanded)}
            >
              <h2 className="text-[#020288] text-base font-semibold">6. Tax & Income Details</h2>
              <div className="bg-blue-50 p-1.5 rounded-full text-blue-600">
                {isTaxExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>
            
            {!isTaxExpanded && (
              <p className="text-xs text-gray-500 italic mt-2 cursor-pointer" onClick={() => setIsTaxExpanded(true)}>
                Tap to securely expand other income and slab rate overrides...
              </p>
            )}

            {isTaxExpanded && (
              <div className="flex flex-col gap-5 mt-4">
                <SliderInput
                  label="Other Annual Salary Income (₹)"
                  value={otherSalaryIncome}
                  onChange={setOtherSalaryIncome}
                  min={0}
                  max={10000000}
                  step={50000}
                  tooltip="Your annual salary income excluding the leave encashment — used to determine marginal slab rate for taxable leave encashment"
                  showCurrency={true}
                />

                <div className="mb-1 overflow-x-auto">
                  <label className="text-sm font-medium text-[#1A237E] mb-2 block whitespace-nowrap">Income Tax Slab on Taxable Portion (%)</label>
                  <div className="flex bg-[#EFEDF4] rounded-lg p-1 min-w-max">
                    <button 
                      onClick={() => setOverrideSlabRate("auto")}
                      className={`px-3 py-2 text-xs rounded-md transition-all ${overrideSlabRate === "auto" ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                    >Auto-Compute</button>
                    {["0", "5", "10", "15", "20", "25", "30"].map((rate) => (
                      <button 
                        key={rate}
                        onClick={() => setOverrideSlabRate(rate)}
                        className={`px-3 py-2 text-xs rounded-md transition-all ${overrideSlabRate === rate ? 'bg-white shadow-sm font-semibold text-[#020288]' : 'text-gray-500 hover:text-gray-700'}`}
                      >{rate}%</button>
                    ))}
                  </div>
                </div>

                <div className="mt-2">
                   <label className="flex items-center text-sm font-medium text-[#1A237E]">
                      <input type="checkbox" className="mr-3 accent-[#020288] w-4 h-4 rounded" checked={hasServiceEncashment} onChange={(e) => setHasServiceEncashment(e.target.checked)} />
                      Received Leave Encashment During Service This Year?
                   </label>
                </div>
                
                {hasServiceEncashment && (
                  <SliderInput
                    label="Amount of Service Encashment (₹)"
                    value={serviceEncashmentAmount}
                    onChange={setServiceEncashmentAmount}
                    min={0}
                    max={2000000}
                    step={10000}
                    tooltip="Leave encashment during service is 100% taxable as salary. Including this lets us compute your total tax liability accurately."
                    showCurrency={true}
                  />
                )}

              </div>
            )}
          </div>

        </div>

        <button
          onClick={performCalculations}
          className="w-full sm:mt-4 mt-6 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3.5 rounded-2xl text-sm shadow-md hover:shadow-lg transition-all active:scale-[0.98]"
        >
          CALCULATE
        </button>

        {result && (
          <div className="mt-8">
            {(encashmentTrigger === 'service' || result.taxableLeaveEncashment > 200000) && (
              <div className="bg-orange-50 border border-orange-200 text-orange-800 p-4 rounded-xl text-sm shadow-sm mb-6">
                <span className="font-bold block mb-1">Section 89(1) Callout:</span>
                If this leave encashment causes a significant tax spike in this year's income, you may claim Section 89(1) relief. File Form 10E on the Income Tax portal before your ITR. This computes tax as if income was received over the period to which it relates, reducing total tax liability.
              </div>
            )}
            
            {result.remainingLifetimeExemption !== undefined && result.remainingLifetimeExemption < 500000 && employeeType !== 'government' && (
               <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-xl text-sm shadow-sm mb-6">
                 ⚠️ After this claim, only ₹{Math.round(result.remainingLifetimeExemption).toLocaleString('en-IN')} of your lifetime ₹25 lakh exemption remains. Keep a record — your future employer(s) and ITR will require this disclosure.
               </div>
            )}

            <LeaveEncashmentResult result={result} unusedLeaveDays={unusedLeaveDays} />
            <LeaveEncashmentBreakdown result={result} employeeType={employeeType} />
            <LeaveEncashmentGraph result={result} employeeType={employeeType} />
            <LeaveEncashmentAssumptions />
          </div>
        )}
        
      </div>
    </div>
  );
}
