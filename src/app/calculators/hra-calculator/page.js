"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Heading from "@/components/Heading";
import SliderInput from "@/components/SliderInput";
import HRAResult from "@/components/HRAResult";
import HRABreakdown from "@/components/HRABreakdown";
import HRAAssumptions from "@/components/HRAAssumptions";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const METRO_CITIES = ["Delhi", "Mumbai", "Kolkata", "Chennai"];
const NEW_METRO_CITIES = ["Bengaluru", "Hyderabad", "Pune", "Ahmedabad"];
const ALL_METRO_CITIES = [...METRO_CITIES, ...NEW_METRO_CITIES];
const ALL_CITIES = [...METRO_CITIES, ...NEW_METRO_CITIES, "Other City"];

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const isMetro = (city) => ALL_METRO_CITIES.includes(city);
const metroRate = (city) => (isMetro(city) ? 50 : 40);
const isNewMetroCity = (city) => NEW_METRO_CITIES.includes(city);

function calcHRAExemption1013A({ salary, hraReceived, rent, city }) {
  const annualSalary = salary * 12;
  const c1 = hraReceived * 12;
  const c2 = (metroRate(city) / 100) * annualSalary;
  const c3 = Math.max(0, rent * 12 - 0.1 * annualSalary);
  const exemption = Math.min(c1, c2, c3);
  const limiter = [c1, c2, c3].indexOf(Math.min(c1, c2, c3)) + 1;
  return { c1, c2, c3, exemption, limitingCondition: limiter };
}

function calcExemptionForPeriod({ monthsInPeriod, monthlySalary, monthlyHRA, monthlyRent, city }) {
  const periodSalary = monthlySalary * monthsInPeriod;
  const c1 = monthlyHRA * monthsInPeriod;
  const c2 = (metroRate(city) / 100) * periodSalary;
  const c3 = Math.max(0, monthlyRent * monthsInPeriod - 0.1 * periodSalary);
  const exemption = Math.min(c1, c2, c3);
  return {
    c1, c2, c3, exemption,
    city, months: monthsInPeriod, rate: metroRate(city),
    hraReceived: c1, salary: periodSalary,
  };
}

function getOptimizationTip(limitingCondition, c1, c2, c3) {
  if (limitingCondition === 1)
    return "Your employer pays less HRA than what you could exempt based on rent and salary. Negotiate a salary restructuring to increase the HRA component.";
  if (limitingCondition === 2)
    return "Your salary base (Basic + DA) is the ceiling. Increasing Basic Salary or DA — or moving to a higher metro — is the only way to raise this cap.";
  if (limitingCondition === 3)
    return "Your rent is the limiting factor. Paying slightly more rent would increase your exemption, up to the Condition 2 salary ceiling of ₹" +
      Math.round(c2).toLocaleString("en-IN") + ".";
  return "";
}

// ---------------------------------------------------------------------------
// City Toggle Component
// ---------------------------------------------------------------------------
function CityToggle({ value, onChange }) {
  return (
    <div className="flex flex-col gap-2">
      {/* Row 1 — Classic Metros */}
      <div className="flex gap-1 flex-wrap">
        {METRO_CITIES.map((city) => (
          <button
            key={city}
            onClick={() => onChange(city)}
            className={`text-xs py-1.5 px-3 rounded-lg transition-all border ${
              value === city
                ? "bg-[#020288] text-white border-[#020288] shadow-sm font-semibold"
                : "bg-[#EFEDF4] text-gray-600 border-[#EFEDF4] hover:border-[#583FCA]"
            }`}
          >
            {city}
          </button>
        ))}
      </div>
      {/* Row 2 — New Metro 2026 */}
      <div className="flex gap-1 flex-wrap">
        {NEW_METRO_CITIES.map((city) => (
          <button
            key={city}
            onClick={() => onChange(city)}
            className={`text-xs py-1.5 px-3 rounded-lg transition-all border flex items-center gap-1 ${
              value === city
                ? "bg-[#020288] text-white border-[#020288] shadow-sm font-semibold"
                : "bg-green-50 text-green-800 border-green-200 hover:border-green-400"
            }`}
          >
            {city}
            {value !== city && (
              <span className="text-[8px] font-bold bg-green-500 text-white px-1 py-0.5 rounded-full">
                NEW ★
              </span>
            )}
          </button>
        ))}
      </div>
      {/* Row 3 — Other */}
      <div>
        <button
          onClick={() => onChange("Other City")}
          className={`text-xs py-1.5 px-3 rounded-lg transition-all border ${
            value === "Other City"
              ? "bg-[#020288] text-white border-[#020288] shadow-sm font-semibold"
              : "bg-[#EFEDF4] text-gray-600 border-[#EFEDF4] hover:border-[#583FCA]"
          }`}
        >
          Other City (Non-Metro 40%)
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Segmented Toggle Component
// ---------------------------------------------------------------------------
function SegmentedToggle({ options, value, onChange }) {
  return (
    <div className="flex bg-[#EFEDF4] rounded-lg p-1 gap-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onChange(opt.value)}
          className={`flex-1 text-xs py-2 px-1 rounded-md transition-all ${
            value === opt.value
              ? "bg-white shadow-sm font-semibold text-[#020288]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function HRACalculatorPage() {
  // Section 1 — Taxpayer Profile
  const [employmentType, setEmploymentType] = useState("salaried-hra");
  const [taxRegime, setTaxRegime] = useState("old");

  // Section 2 — Salary Details (10(13A))
  const [basicSalary, setBasicSalary] = useState(50000);
  const [da, setDa] = useState(0);
  const [commission, setCommission] = useState(0);
  const [hraReceived, setHraReceived] = useState(20000);

  // Section 3 — Rent & City
  const [city, setCity] = useState("Bengaluru");
  const [monthlyRent, setMonthlyRent] = useState(25000);

  // Section 4 — Special Scenarios
  const [specialExpanded, setSpecialExpanded] = useState(false);
  const [rentToParents, setRentToParents] = useState(false);
  const [landlordPan, setLandlordPan] = useState(false);
  const [midYearChange, setMidYearChange] = useState(false);
  const [city1, setCity1] = useState("Bengaluru");
  const [monthsInCity1, setMonthsInCity1] = useState(6);
  const [rent1, setRent1] = useState(25000);
  const [city2, setCity2] = useState("Delhi");
  const [rent2, setRent2] = useState(30000);

  // Section 5 — 80GG
  const [adjustedGTI, setAdjustedGTI] = useState(800000);
  const [rent80gg, setRent80gg] = useState(15000);
  const [ownsProperty, setOwnsProperty] = useState("no");

  // Section 6 — Tax Details
  const [taxDetailsExpanded, setTaxDetailsExpanded] = useState(false);
  const [slabRate, setSlabRate] = useState(20);

  const [result, setResult] = useState(null);

  const isSalariedHRA = employmentType === "salaried-hra";
  const is80GGRoute = !isSalariedHRA;

  // Auto-calculate on every change
  useEffect(() => {
    performCalculation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    employmentType, taxRegime, basicSalary, da, commission, hraReceived,
    city, monthlyRent, rentToParents, landlordPan, midYearChange,
    city1, monthsInCity1, rent1, city2, rent2,
    adjustedGTI, rent80gg, ownsProperty, slabRate,
  ]);

  const performCalculation = () => {
    // New regime shortcut
    if (taxRegime === "new") {
      setResult({ route: "new-regime", monthlyHRA: isSalariedHRA ? hraReceived : 0 });
      return;
    }

    // 80GG property ownership block
    if (is80GGRoute && ownsProperty === "yes") {
      setResult({ route: "property-owned" });
      return;
    }

    // Section 10(13A)
    if (isSalariedHRA) {
      const monthlySalary = basicSalary + da + commission;
      const multiplier = 1 + 0.04 * (slabRate / 100);
      const taxMultiplier = (slabRate / 100) * 1.04;

      if (midYearChange) {
        const months2 = 12 - monthsInCity1;
        const p1 = calcExemptionForPeriod({
          monthsInPeriod: monthsInCity1,
          monthlySalary,
          monthlyHRA: hraReceived,
          monthlyRent: rent1,
          city: city1,
        });
        const p2 = calcExemptionForPeriod({
          monthsInPeriod: months2,
          monthlySalary,
          monthlyHRA: hraReceived,
          monthlyRent: rent2,
          city: city2,
        });
        const totalExemption = p1.exemption + p2.exemption;
        const totalHRA = hraReceived * 12;
        const taxableHRA = totalHRA - totalExemption;
        const taxSaved = totalExemption * taxMultiplier;

        setResult({
          route: "section-1013a",
          c1: totalHRA,
          c2: p1.c2 + p2.c2,
          c3: p1.c3 + p2.c3,
          exemption: totalExemption,
          taxableHRA,
          totalHRA,
          taxSaved,
          salaryBase: monthlySalary,
          metroRate: metroRate(city1),
          isNewMetro: false,
          city: `${city1} / ${city2}`,
          limitingCondition: 1,
          optimizationTip: "",
          pan1LRequired: landlordPan,
          rentToParents,
          isMultiCity: true,
          splitPeriods: [p1, p2],
          slabRate,
        });
        return;
      }

      const { c1, c2, c3, exemption, limitingCondition } = calcHRAExemption1013A({
        salary: monthlySalary,
        hraReceived,
        rent: monthlyRent,
        city,
      });

      const taxableHRA = Math.max(0, c1 - exemption);
      const taxSaved = exemption * taxMultiplier;
      const optimizationTip = getOptimizationTip(limitingCondition, c1, c2, c3);
      const pan1LRequired = landlordPan || (monthlyRent * 12 > 100000);

      setResult({
        route: "section-1013a",
        c1,
        c2,
        c3,
        exemption,
        taxableHRA,
        totalHRA: c1,
        taxSaved,
        salaryBase: monthlySalary,
        metroRate: metroRate(city),
        isNewMetro: isNewMetroCity(city),
        city,
        limitingCondition,
        optimizationTip,
        pan1LRequired,
        rentToParents,
        isMultiCity: false,
        splitPeriods: [],
        slabRate,
        monthlyRent,
      });
      return;
    }

    // Section 80GG
    const c1 = 60000; // ₹5,000/month
    const c2 = 0.25 * adjustedGTI;
    const c3 = Math.max(0, rent80gg * 12 - 0.1 * adjustedGTI);
    const deduction = Math.min(c1, c2, c3);
    const taxSaved = deduction * (slabRate / 100) * 1.04;

    setResult({
      route: "section-80gg",
      c1,
      c2,
      c3,
      deduction,
      taxSaved,
      slabRate,
      adjustedGTI,
      monthlyRent: rent80gg,
    });
  };

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-1.5 xs:px-0">
      <div className="max-w-xl mx-auto">
        <Heading
          header="HRA Tax Exemption Calculator"
          desc="FY 2026-27 • Sec 10(13A) & Sec 80GG • Includes new metro cities"
        />

        <div className="flex flex-col gap-2">
          {/* ── Section 1 — Taxpayer Profile ── */}
          <div className="rounded-2xl p-6 relative bg-white">
            <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">
              1. Taxpayer Profile
            </h2>
            <div className="flex flex-col gap-5 mt-3 ml-1">

              <div>
                <label className="text-sm font-medium text-[#1A237E] mb-2 block">
                  Employment Type
                  <span className="ml-2 text-[10px] font-normal text-gray-400">
                    (HRA must appear as a named component in your salary slip)
                  </span>
                </label>
                <div className="flex flex-col gap-1.5">
                  <div className="flex bg-[#EFEDF4] rounded-lg p-1 gap-0.5">
                    <button
                      onClick={() => setEmploymentType("salaried-hra")}
                      className={`flex-1 text-xs py-2 rounded-md transition-all ${
                        employmentType === "salaried-hra"
                          ? "bg-white shadow-sm font-semibold text-[#020288]"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Salaried (with HRA)
                    </button>
                    <button
                      onClick={() => setEmploymentType("salaried-no-hra")}
                      className={`flex-1 text-xs py-2 rounded-md transition-all ${
                        employmentType === "salaried-no-hra"
                          ? "bg-white shadow-sm font-semibold text-[#020288]"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Salaried (no HRA)
                    </button>
                    <button
                      onClick={() => setEmploymentType("self-employed")}
                      className={`flex-1 text-xs py-2 rounded-md transition-all ${
                        employmentType === "self-employed"
                          ? "bg-white shadow-sm font-semibold text-[#020288]"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      Self-Employed
                    </button>
                  </div>
                  {is80GGRoute && (
                    <p className="text-xs text-[#583FCA] mt-0.5 ml-1 italic">
                      → Section 80GG applies — capped at ₹5,000/month
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-[#1A237E] mb-2 block">Tax Regime</label>
                <SegmentedToggle
                  options={[
                    { value: "old", label: "Old Regime" },
                    { value: "new", label: "New Regime" },
                  ]}
                  value={taxRegime}
                  onChange={setTaxRegime}
                />
                {taxRegime === "new" && (
                  <div className="mt-2 bg-amber-50 border border-amber-200 rounded-xl p-3 text-xs text-amber-800">
                    ⚠️ HRA exemption (Sec 10(13A)) and Sec 80GG are <strong>not available</strong> under
                    the New Tax Regime.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Section 2 — Salary Details [10(13A)] ── */}
          {isSalariedHRA && (
            <div className="rounded-2xl p-6 relative bg-white">
              <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">
                2. Salary Details
              </h2>
              <div className="flex flex-col gap-5 mt-3 ml-1">
                <SliderInput
                  label="Basic Salary (Monthly)"
                  value={basicSalary}
                  onChange={setBasicSalary}
                  min={5000}
                  max={500000}
                  step={1000}
                  tooltip="Only Basic Salary, not total CTC or gross salary. Check your salary slip."
                  showCurrency
                />
                <SliderInput
                  label="Dearness Allowance / DA (Monthly)"
                  value={da}
                  onChange={setDa}
                  min={0}
                  max={200000}
                  step={500}
                  tooltip="Most private sector employees have zero DA. Government employees may have significant DA."
                  showCurrency
                />
                <SliderInput
                  label="Commission as % of Turnover (Monthly)"
                  value={commission}
                  onChange={setCommission}
                  min={0}
                  max={200000}
                  step={500}
                  tooltip="Only fixed-percentage-of-turnover commission counts in the HRA salary base. Flat bonuses do NOT count."
                  showCurrency
                />
                <SliderInput
                  label="HRA Received from Employer (Monthly)"
                  value={hraReceived}
                  onChange={setHraReceived}
                  min={1000}
                  max={500000}
                  step={500}
                  tooltip="The exact HRA figure on your salary slip or Form 16 — not what you wish to claim."
                  showCurrency
                />
              </div>
            </div>
          )}

          {/* ── Section 3 — Rent & City [10(13A)] ── */}
          {isSalariedHRA && (
            <div className="rounded-2xl p-6 relative bg-white">
              <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">
                3. Rent &amp; City Details
              </h2>
              <div className="flex flex-col gap-5 mt-3 ml-1">
                <div>
                  <label className="text-sm font-medium text-[#1A237E] mb-2 block">
                    City of Residence
                  </label>
                  <CityToggle value={city} onChange={setCity} />
                  {isNewMetroCity(city) && (
                    <p className="mt-2 text-xs text-green-700 bg-green-50 border border-green-200 rounded-lg p-2">
                      ✦ <strong>{city}</strong> was elevated to metro status from 1 April 2026 —
                      the 50% HRA rate now applies (was 40% before FY 2026-27).
                    </p>
                  )}
                </div>
                <SliderInput
                  label="Monthly Rent Paid"
                  value={monthlyRent}
                  onChange={setMonthlyRent}
                  min={1000}
                  max={200000}
                  step={500}
                  tooltip="Enter the actual rent paid each month. If rent varies, use average monthly rent."
                  showCurrency
                />
              </div>
            </div>
          )}

          {/* ── Section 4 — Special Scenarios [collapsible, 10(13A)] ── */}
          {isSalariedHRA && (
            <div className="rounded-2xl p-6 relative bg-white">
              <div
                className="flex justify-between items-center cursor-pointer border-b pb-2 mb-3"
                onClick={() => setSpecialExpanded(!specialExpanded)}
              >
                <h2 className="text-[#020288] text-base font-semibold">
                  4. Special Scenarios{" "}
                  <span className="text-xs font-normal text-gray-400">(optional)</span>
                </h2>
                <div className="bg-blue-50 p-1.5 rounded-full text-blue-600">
                  {specialExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </div>

              {!specialExpanded && (
                <p
                  className="text-xs text-gray-500 italic mt-2 cursor-pointer"
                  onClick={() => setSpecialExpanded(true)}
                >
                  Tap to configure: rent-to-parents, PAN requirement, mid-year city change
                </p>
              )}

              {specialExpanded && (
                <div className="flex flex-col gap-5 mt-4 ml-1">
                  {/* Rent to Parents */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-[#1A237E] gap-3">
                      <input
                        type="checkbox"
                        className="accent-[#020288] w-4 h-4"
                        checked={rentToParents}
                        onChange={(e) => setRentToParents(e.target.checked)}
                      />
                      Paying Rent to Parents?
                    </label>
                    {rentToParents && (
                      <p className="text-xs text-green-700 mt-1.5 ml-7 bg-green-50 border border-green-200 rounded-lg p-2">
                        Valid — ensure a written rent agreement is in place, rent is transferred via
                        bank, and parents declare rental income in their ITR.
                      </p>
                    )}
                  </div>

                  {/* Landlord PAN */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-[#1A237E] gap-3">
                      <input
                        type="checkbox"
                        className="accent-[#020288] w-4 h-4"
                        checked={landlordPan}
                        onChange={(e) => setLandlordPan(e.target.checked)}
                      />
                      Landlord&apos;s Annual Rent Exceeds ₹1 Lakh?
                    </label>
                    {(landlordPan || monthlyRent * 12 > 100000) && (
                      <p className="text-xs text-amber-700 mt-1.5 ml-7 bg-amber-50 border border-amber-200 rounded-lg p-2">
                        Landlord&apos;s PAN is mandatory. Without PAN, your HRA claim may be disallowed.
                      </p>
                    )}
                  </div>

                  {/* Mid-Year City Change */}
                  <div>
                    <label className="flex items-center text-sm font-medium text-[#1A237E] gap-3">
                      <input
                        type="checkbox"
                        className="accent-[#020288] w-4 h-4"
                        checked={midYearChange}
                        onChange={(e) => setMidYearChange(e.target.checked)}
                      />
                      Mid-Year City Change?
                    </label>
                    {midYearChange && (
                      <div className="mt-3 ml-3 bg-[#EFEDF4] rounded-xl p-4 flex flex-col gap-4">
                        <p className="text-xs text-gray-500">
                          HRA is calculated month-by-month. City changes affect the metro/non-metro
                          rate and rent amount per period.
                        </p>

                        {/* City 1 */}
                        <div>
                          <p className="text-xs font-semibold text-[#1A237E] mb-2">City 1</p>
                          <CityToggle value={city1} onChange={setCity1} />
                        </div>
                        <SliderInput
                          label="Months in City 1"
                          value={monthsInCity1}
                          onChange={setMonthsInCity1}
                          min={1}
                          max={11}
                          step={1}
                          showCurrency={false}
                          tooltip="Remaining months automatically assigned to City 2"
                        />
                        <SliderInput
                          label="Rent in City 1 (Monthly)"
                          value={rent1}
                          onChange={setRent1}
                          min={1000}
                          max={200000}
                          step={500}
                          showCurrency
                        />

                        {/* City 2 */}
                        <div>
                          <p className="text-xs font-semibold text-[#1A237E] mb-2">
                            City 2 ({12 - monthsInCity1} months)
                          </p>
                          <CityToggle value={city2} onChange={setCity2} />
                        </div>
                        <SliderInput
                          label="Rent in City 2 (Monthly)"
                          value={rent2}
                          onChange={setRent2}
                          min={1000}
                          max={200000}
                          step={500}
                          showCurrency
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Section 5 — 80GG Details ── */}
          {is80GGRoute && (
            <div className="rounded-2xl p-6 relative bg-white">
              <h2 className="text-[#020288] text-base font-semibold mb-3 border-b pb-2">
                2. Section 80GG Details
              </h2>
              <div className="flex flex-col gap-5 mt-3 ml-1">
                <SliderInput
                  label="Annual Adjusted Gross Total Income"
                  value={adjustedGTI}
                  onChange={setAdjustedGTI}
                  min={100000}
                  max={5000000}
                  step={10000}
                  tooltip="Gross Total Income before this 80GG deduction and before long-term capital gains."
                  showCurrency
                />
                <SliderInput
                  label="Monthly Rent Paid"
                  value={rent80gg}
                  onChange={setRent80gg}
                  min={1000}
                  max={100000}
                  step={500}
                  tooltip="Actual rent paid per month. If variable, use average."
                  showCurrency
                />

                <div>
                  <label className="text-sm font-medium text-[#1A237E] mb-2 block">
                    Own any property in city of work/residence?
                  </label>
                  <SegmentedToggle
                    options={[
                      { value: "no", label: "No (Eligible)" },
                      { value: "yes", label: "Yes (Not Eligible)" },
                    ]}
                    value={ownsProperty}
                    onChange={setOwnsProperty}
                  />
                  {ownsProperty === "yes" && (
                    <div className="mt-2 bg-red-50 border border-red-200 rounded-xl p-3 text-xs text-red-800">
                      You own property in the city where you live/work. Section 80GG cannot be
                      claimed. This includes property in your spouse&apos;s or minor child&apos;s name.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Section 6 — Tax Details [collapsible] ── */}
          <div className="rounded-2xl p-6 relative bg-white">
            <div
              className="flex justify-between items-center cursor-pointer border-b pb-2 mb-3"
              onClick={() => setTaxDetailsExpanded(!taxDetailsExpanded)}
            >
              <h2 className="text-[#020288] text-base font-semibold">
                {isSalariedHRA ? "5" : "3"}. Tax Details
              </h2>
              <div className="bg-blue-50 p-1.5 rounded-full text-blue-600">
                {taxDetailsExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>
            </div>

            {!taxDetailsExpanded && (
              <p
                className="text-xs text-gray-500 italic mt-2 cursor-pointer"
                onClick={() => setTaxDetailsExpanded(true)}
              >
                Tap to set your marginal tax slab rate (currently {slabRate}%)
              </p>
            )}

            {taxDetailsExpanded && (
              <div className="mt-3 ml-1">
                <label className="text-sm font-medium text-[#1A237E] mb-2 block">
                  Income Tax Slab (%)
                  <span className="ml-2 text-[10px] font-normal text-gray-400">
                    — your marginal rate, used to calculate tax savings
                  </span>
                </label>
                <div className="flex bg-[#EFEDF4] rounded-lg p-1 gap-0.5">
                  {[5, 10, 20, 30].map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setSlabRate(rate)}
                      className={`flex-1 text-xs py-2 rounded-md transition-all ${
                        slabRate === rate
                          ? "bg-white shadow-sm font-semibold text-[#020288]"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      {rate}%
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Calculate Button */}
        <button
          onClick={performCalculation}
          className="w-full sm:mt-2 mt-4 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90 transition-all active:scale-[0.98]"
        >
          CALCULATE
        </button>

        <HRAResult result={result} />
        <HRABreakdown result={result} />
        <HRAAssumptions />
      </div>
    </div>
  );
}
