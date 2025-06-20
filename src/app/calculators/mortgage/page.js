"use client";

import { useState, useEffect, useRef } from "react";
import { Slider } from "@mui/material";
import { tipData, headingData } from "@/constants/displayData";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";
import ChartDisplay from "@/components/ChartDisplay";
import {
  calculateTotalCostBreakdown,
  generateAmortizationSchedule,
  getYearlyAmortization,
} from "@/utils/calculation";

import AmortizationSchedule from "@/components/AmortisationSchedule";
import Assumptions from "@/components/Assumptions";
import { formatShortIndianCurrency } from "@/utils/formatting";
import Heading from "@/components/Heading";

const MortgageCalculator = () => {
  // Updated default values as per your requirements
  const [homePrice, setHomePrice] = useState(8000000); // ₹80,00,000
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); // 20%
  const [tenure, setTenure] = useState(20); // 20 years
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [propertyTaxes, setPropertyTaxes] = useState(8000); // ₹8,000
  const [homeInsurance, setHomeInsurance] = useState(3000); // ₹3,000
  const [otherCosts, setOtherCosts] = useState(4000); // ₹4,000

  // Calculated loan amount (80% of home price with 20% down payment)
  const [loanAmount, setLoanAmount] = useState(6400000); // 80% of 80L

  // Input display states
  const [tenureInput, setTenureInput] = useState("20 yrs");
  const [interestRateInput, setInterestRateInput] = useState("8.5%");
  const [homePriceInput, setHomePriceInput] = useState("80,00,000");
  const [downPaymentPercentInput, setDownPaymentPercentInput] = useState("20%");
  const [propertyTaxesInput, setPropertyTaxesInput] = useState("8,000");
  const [homeInsuranceInput, setHomeInsuranceInput] = useState("3,000");
  const [otherCostsInput, setOtherCostsInput] = useState("4,000");

  // Results and chart data - these will only update when Calculate is pressed
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [displayedTenure, setDisplayedTenure] = useState(20);
  const [amortizationTable, setAmortizationTable] = useState([]);

  // Initialize with default calculation on component mount
  useEffect(() => {
    // Calculate initial values with defaults
    const initialLoanAmount = homePrice * (1 - downPaymentPercent / 100);
    setLoanAmount(initialLoanAmount);
    performCalculations(
      initialLoanAmount,
      tenure,
      interestRate,
      propertyTaxes,
      homeInsurance,
      otherCosts
    );
  }, []); // Empty dependency array - only run once on mount

  // Update loan amount when home price or down payment changes (but don't recalculate results)
  useEffect(() => {
    const calculatedLoanAmount = homePrice * (1 - downPaymentPercent / 100);
    setLoanAmount(calculatedLoanAmount);
  }, [homePrice, downPaymentPercent]);

  // Update input display when values change
  useEffect(() => {
    setTenureInput(`${tenure} yrs`);
  }, [tenure]);

  useEffect(() => {
    setInterestRateInput(`${interestRate}%`);
  }, [interestRate]);

  useEffect(() => {
    setDownPaymentPercentInput(`${downPaymentPercent}%`);
  }, [downPaymentPercent]);

  // Format number with Indian comma separation
  const formatIndianNumber = (num) => {
    return num.toLocaleString("en-IN");
  };

  // Parse formatted number back to numeric value
  const parseFormattedNumber = (str) => {
    return parseInt(str.replace(/[^\d]/g, "")) || 0;
  };

  const parseAndSetNumericValue = (setter, value, min, max) => {
    const numericValue = parseFloat(value.replace(/[₹,%\syrs]/g, ""));
    if (!isNaN(numericValue)) {
      const constrainedValue = Math.min(Math.max(numericValue, min), max);
      setter(constrainedValue);
    } else {
      setter(min);
    }
  };

  // Separate function to perform calculations
  const performCalculations = (
    loanAmt,
    tenureYrs,
    rate,
    propTax,
    homeIns,
    otherCost
  ) => {
    // Calculate total cost breakdown including all expenses
    const costBreakdown = calculateTotalCostBreakdown(
      loanAmt,
      tenureYrs,
      rate,
      propTax,
      homeIns,
      otherCost
    );

    setResult({
      emi: costBreakdown.loanEMI,
      totalInterest: costBreakdown.totalInterest,
      totalPayment: costBreakdown.totalLoanPayments, // This is just loan payments
      totalCost: costBreakdown.totalCost, // This includes all costs
      totalMonthlyPayment: costBreakdown.totalMonthlyPayment,
      monthlyPropertyTax: costBreakdown.monthlyPropertyTax,
      monthlyHomeInsurance: costBreakdown.monthlyHomeInsurance,
      monthlyOtherCosts: costBreakdown.monthlyOtherCosts,
      totalPropertyTax: costBreakdown.totalPropertyTax,
      totalHomeInsurance: costBreakdown.totalHomeInsurance,
      totalOtherCosts: costBreakdown.totalOtherCosts,
    });

    const amortizationSchedule = generateAmortizationSchedule(
      loanAmt,
      tenureYrs,
      rate
    );
    setAmortizationTable(amortizationSchedule);

    // Update chart to show breakdown of total cost, not just loan
    setChartData({
      labels: [
        "Principal",
        "Interest",
        "Property Tax",
        "Home Insurance",
        "Other Costs",
      ],
      datasets: [
        {
          data: [
            loanAmt,
            costBreakdown.totalInterest,
            costBreakdown.totalPropertyTax,
            costBreakdown.totalHomeInsurance,
            costBreakdown.totalOtherCosts,
          ],
          backgroundColor: [
            "#AB78FF",
            "#F4B6D2",
            "#CAF5BD",
            "#45D099",
            "#97A9FF",
          ],
          borderWidth: 1,
        },
      ],
    });

    setDisplayedTenure(tenureYrs);
  };

  // Handle Calculate button click - this is the only place calculations should update
  const handleCalculate = () => {
    performCalculations(
      loanAmount,
      tenure,
      interestRate,
      propertyTaxes,
      homeInsurance,
      otherCosts
    );
  };

  const yearlyAmortization = getYearlyAmortization(amortizationTable);

  // Info tooltip data

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-1.5 xs:px-0">
      <div className="max-w-xl mx-auto">
        <Heading
          header={headingData.mortgage.heading}
          desc={headingData.mortgage.desc}
        />
        <div className="rounded-2xl p-6 relative bg-white">
          {/* Home Price */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center  text-[#020288] font-medium">
              <div className="flex items-center gap-1.5">
                <p>Home Price</p>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    {tipData.homePrice}
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center text-xs bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-18 text-center outline-none focus:ring-0"
                  value={homePriceInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    const formatted = raw
                      ? formatIndianNumber(parseInt(raw))
                      : "";
                    setHomePriceInput(formatted);
                    setHomePrice(raw === "" ? 0 : parseInt(raw));
                  }}
                  onFocus={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setHomePriceInput(raw);
                  }}
                  onBlur={() => {
                    const value = parseFormattedNumber(homePriceInput);
                    const constrainedValue = Math.min(
                      Math.max(value, 500000),
                      50000000
                    );
                    setHomePrice(constrainedValue);
                    setHomePriceInput(formatIndianNumber(constrainedValue));
                  }}
                />
              </div>
            </div>
            <div className="text-[10px] text-[#020288] flex justify-end pt-2 px-2">
              {formatShortIndianCurrency(homePrice.toString())}
            </div>

            <Slider
              value={homePrice}
              min={500000}
              max={50000000}
              step={100000}
              onChange={(e, val) => {
                setHomePrice(val);
                setHomePriceInput(formatIndianNumber(val));
              }}
              sx={{
                color: "#020288",
                height: 6,
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                  transition:
                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </div>

          {/* Down Payment % */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center mb-1 text-[#020288] font-medium">
              <div className="flex items-center gap-1.5">
                <label>Down Payment</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    {tipData.downPayment}
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-16 text-center outline-none focus:ring-0"
                  value={downPaymentPercentInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setDownPaymentPercentInput(raw);
                    setDownPaymentPercent(raw === "" ? 0 : parseFloat(raw));
                  }}
                  onFocus={(e) =>
                    setDownPaymentPercentInput(
                      e.target.value.replace(/[^0-9.]/g, "")
                    )
                  }
                  onBlur={() =>
                    parseAndSetNumericValue(
                      setDownPaymentPercent,
                      downPaymentPercentInput,
                      5,
                      50
                    )
                  }
                />
              </div>
            </div>

            {/* Down Payment and Loan Amount Display */}
            <div className="flex justify-between items-center text-[10px]  pt-2 px-2 mb-2">
              <div className="flex flex-col gap-2">
                <span className="text-[#020288]">Down Payment</span>
                <span className="font-medium bg-[#EAE9F0] text-[#2D14A0] px-2 py-1 rounded-md">
                  ₹
                  {formatShortIndianCurrency(
                    ((homePrice * downPaymentPercent) / 100).toString()
                  )}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[#020288]">Loan Amount</span>
                <span className="font-medium bg-[#EAE9F0] text-[#2D14A0] px-2 py-1 rounded-md">
                  ₹{formatShortIndianCurrency(loanAmount.toString())}
                </span>
              </div>
            </div>

            <Slider
              value={downPaymentPercent}
              min={5}
              max={50}
              step={1}
              onChange={(e, val) => {
                setDownPaymentPercent(val);
                setDownPaymentPercentInput(`${val}`);
              }}
              sx={{
                color: "#020288",
                height: 6,
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                  transition:
                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </div>

          {/* Tenure */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center mb-1 text-[#020288] font-medium">
              <div className="flex items-center gap-1.5">
                <label>Loan Tenure</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    {tipData.tenure}
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-20 text-center outline-none focus:ring-0"
                  value={tenureInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setTenureInput(raw);
                    setTenure(raw === "" ? 0 : parseInt(raw));
                  }}
                  onFocus={(e) =>
                    setTenureInput(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  onBlur={() =>
                    parseAndSetNumericValue(setTenure, tenureInput, 1, 30)
                  }
                />
              </div>
            </div>
            <Slider
              value={tenure}
              min={1}
              max={50}
              step={1}
              onChange={(e, val) => {
                setTenure(val);
                setTenureInput(`${val}`);
              }}
              sx={{
                color: "#020288",
                height: 6,
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                  transition:
                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </div>

          {/* Interest Rate */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center mb-1 text-[#020288] font-medium">
              <div className="flex items-center gap-1.5">
                <label>Interest Rate</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    {tipData.interestRate}
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-16 text-center outline-none focus:ring-0"
                  value={interestRateInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setInterestRateInput(raw);
                    setInterestRate(raw === "" ? 0 : parseFloat(raw));
                  }}
                  onFocus={(e) =>
                    setInterestRateInput(e.target.value.replace(/[^0-9.]/g, ""))
                  }
                  onBlur={() =>
                    parseAndSetNumericValue(
                      setInterestRate,
                      interestRateInput,
                      1,
                      20
                    )
                  }
                />
              </div>
            </div>
            <Slider
              value={interestRate}
              min={1}
              max={20}
              step={0.5}
              onChange={(e, val) => {
                setInterestRate(val);
                setInterestRateInput(`${val}`);
              }}
              sx={{
                color: "#020288",
                height: 6,
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                  transition:
                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </div>

          {/* Property Taxes */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center text-[#020288] font-medium">
              <div className="flex items-center gap-1.5">
                <label>
                  <div>Property Taxes</div>
                  (Annual)
                </label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    {tipData.propertyTax}
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center text-xs bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-18 text-center outline-none focus:ring-0"
                  value={propertyTaxesInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    const formatted = raw
                      ? formatIndianNumber(parseInt(raw))
                      : "";
                    setPropertyTaxesInput(formatted);
                    setPropertyTaxes(raw === "" ? 0 : parseInt(raw));
                  }}
                  onFocus={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setPropertyTaxesInput(raw);
                  }}
                  onBlur={() => {
                    const value = parseFormattedNumber(propertyTaxesInput);
                    const constrainedValue = Math.min(
                      Math.max(value, 0),
                      500000
                    );
                    setPropertyTaxes(constrainedValue);
                    setPropertyTaxesInput(formatIndianNumber(constrainedValue));
                  }}
                />
              </div>
            </div>
            <div className="text-[10px] text-[#020288] flex justify-end pt-2 px-2">
              {formatShortIndianCurrency(propertyTaxes.toString())}
            </div>

            <Slider
              value={propertyTaxes}
              min={0}
              max={50000}
              step={1000}
              onChange={(e, val) => {
                setPropertyTaxes(val);
                setPropertyTaxesInput(formatIndianNumber(val));
              }}
              sx={{
                color: "#020288",
                height: 6,
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                  transition:
                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </div>

          {/* Home Insurance */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center text-[#020288] font-medium">
              <div className="flex items-center gap-1.5">
                <label>
                  <div>Home Insurance</div> (Annual)
                </label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    {tipData.homeInsurance}
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center text-xs bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-18 text-center outline-none focus:ring-0"
                  value={homeInsuranceInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    const formatted = raw
                      ? formatIndianNumber(parseInt(raw))
                      : "";
                    setHomeInsuranceInput(formatted);
                    setHomeInsurance(raw === "" ? 0 : parseInt(raw));
                  }}
                  onFocus={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setHomeInsuranceInput(raw);
                  }}
                  onBlur={() => {
                    const value = parseFormattedNumber(homeInsuranceInput);
                    const constrainedValue = Math.min(
                      Math.max(value, 0),
                      100000
                    );
                    setHomeInsurance(constrainedValue);
                    setHomeInsuranceInput(formatIndianNumber(constrainedValue));
                  }}
                />
              </div>
            </div>
            <div className="text-[10px] text-[#020288] flex justify-end pt-2 px-2">
              {formatShortIndianCurrency(homeInsurance.toString())}
            </div>

            <Slider
              value={homeInsurance}
              min={0}
              max={50000}
              step={1000}
              onChange={(e, val) => {
                setHomeInsurance(val);
                setHomeInsuranceInput(formatIndianNumber(val));
              }}
              sx={{
                color: "#020288",
                height: 6,
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                  transition:
                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </div>

          {/* Other Costs */}
          <div>
            <div className="flex text-sm justify-between items-center text-[#020288] font-medium">
              <div className="flex items-center gap-1.5">
                <label>
                  <div>Other Costs</div> (Monthly)
                </label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    {tipData.otherCosts}
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center text-xs bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-18 text-center outline-none focus:ring-0"
                  value={otherCostsInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    const formatted = raw
                      ? formatIndianNumber(parseInt(raw))
                      : "";
                    setOtherCostsInput(formatted);
                    setOtherCosts(raw === "" ? 0 : parseInt(raw));
                  }}
                  onFocus={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setOtherCostsInput(raw);
                  }}
                  onBlur={() => {
                    const value = parseFormattedNumber(otherCostsInput);
                    const constrainedValue = Math.min(
                      Math.max(value, 0),
                      50000
                    );
                    setOtherCosts(constrainedValue);
                    setOtherCostsInput(formatIndianNumber(constrainedValue));
                  }}
                />
              </div>
            </div>
            <div className="text-[10px] text-[#020288] flex justify-end pt-2 px-2">
              {formatShortIndianCurrency(otherCosts.toString())}
            </div>

            <Slider
              value={otherCosts}
              min={0}
              max={50000}
              step={1000}
              onChange={(e, val) => {
                setOtherCosts(val);
                setOtherCostsInput(formatIndianNumber(val));
              }}
              sx={{
                color: "#020288",
                height: 6,
                "& .MuiSlider-thumb": {
                  backgroundImage: "url('/slider.svg')",
                  backgroundPosition: "center",
                  width: 18,
                  height: 18,
                  transition:
                    "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                  "&:hover, &.Mui-focusVisible": {
                    boxShadow: "0 0 0 8px rgba(255, 255, 255, 0.16)",
                  },
                },
                "& .MuiSlider-track": {
                  transition: "width 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
                },
              }}
            />
          </div>
        </div>
        <button
          onClick={handleCalculate}
          className="w-full sm:mt-2 mt-4 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90"
        >
          CALCULATE
        </button>

        {/* Output + Chart */}
        <div className="sm:mt-2 mt-4 sm:text-sm bg-white py-4 px-4 rounded-lg">
          {/* Main Summary Cards */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Down Payment Card */}
            <div className="bg-[#F5F4F7] rounded-xl p-3 text-center">
              <div className="text-xs text-[#666666] font-medium mb-1">
                Down Payment
              </div>
              <div
                className="text-md sm:text-lg font-bold"
                style={{
                  background: "linear-gradient(to right,#320992 30%,#F04393)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ₹
                {((homePrice * downPaymentPercent) / 100)?.toLocaleString(
                  "en-IN",
                  {
                    maximumFractionDigits: 0,
                  }
                )}
              </div>
            </div>

            {/* Loan Amount Card */}
            <div className="bg-[#F5F4F7] rounded-xl p-3 text-center">
              <div className="text-xs text-[#666666] font-medium mb-1">
                Loan Amount
              </div>
              <div
                className="text-md sm:text-lg font-bold"
                style={{
                  background: "linear-gradient(to right,#320992 30%,#F04393)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ₹
                {loanAmount?.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>
          </div>

          {/* Monthly Payment Breakdown */}
          <div className="bg-[#F5F4F7] rounded-xl p-4 mb-4">
            <div className="text-center mb-3">
              <div className="text-xs text-[#666666] font-medium mb-1">
                Your Monthly Payment
              </div>
              <div
                className="text-2xl font-bold"
                style={{
                  background: "linear-gradient(to right,#320992 30%,#F04393)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ₹
                {result?.totalMonthlyPayment?.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </div>
              <div className="text-xs text-[#666666] mt-1">per month</div>
            </div>

            {/* Monthly Breakdown */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-[#323233] flex items-center">
                  <div className="w-2 h-2 bg-[#AB78FF] rounded-full mr-2"></div>
                  Loan EMI
                </span>
                <span className="text-[#020288] font-medium">
                  ₹
                  {result?.emi?.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#323233] flex items-center">
                  <div className="w-2 h-2 bg-[#CAF5BD] rounded-full mr-2"></div>
                  Property Tax
                </span>
                <span className="text-[#020288] font-medium">
                  ₹
                  {result?.monthlyPropertyTax?.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#323233] flex items-center">
                  <div className="w-2 h-2 bg-[#45D099] rounded-full mr-2"></div>
                  Home Insurance
                </span>
                <span className="text-[#020288] font-medium">
                  ₹
                  {result?.monthlyHomeInsurance?.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#323233] flex items-center">
                  <div className="w-2 h-2 bg-[#97A9FF] rounded-full mr-2"></div>
                  Other Costs
                </span>
                <span className="text-[#020288] font-medium">
                  ₹
                  {result?.monthlyOtherCosts?.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Total Cost Over Loan Term */}
          <div className="bg-[#F5F4F7] rounded-xl p-4 mb-4">
            <div className="text-center mb-3">
              <div className="text-xs text-[#666666] font-medium mb-1">
                Total Cost Over {displayedTenure} Years
              </div>
              <div
                className="text-xl font-bold"
                style={{
                  background: "linear-gradient(to right,#320992 30%,#F04393)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                ₹
                {result?.totalCost?.toLocaleString("en-IN", {
                  maximumFractionDigits: 0,
                })}
              </div>
            </div>

            {/* Total Cost Breakdown */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-[#323233] flex items-center">
                  <div className="w-2 h-2 bg-[#AB78FF] rounded-full mr-2"></div>
                  Principal Amount
                </span>
                <span className="text-[#020288] font-medium">
                  ₹
                  {loanAmount?.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#323233] flex items-center">
                  <div className="w-2 h-2 bg-[#F4B6D2] rounded-full mr-2"></div>
                  Total Interest
                </span>
                <span className="text-[#020288] font-medium">
                  ₹
                  {result?.totalInterest?.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#323233] flex items-center">
                  <div className="w-2 h-2 bg-[#CAF5BD] rounded-full mr-2"></div>
                  Total Property Tax
                </span>
                <span className="text-[#020288] font-medium">
                  ₹
                  {result?.totalPropertyTax?.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#323233] flex items-center">
                  <div className="w-2 h-2 bg-[#45D099] rounded-full mr-2"></div>
                  Total Home Insurance
                </span>
                <span className="text-[#020288] font-medium">
                  ₹
                  {result?.totalHomeInsurance?.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#323233] flex items-center">
                  <div className="w-2 h-2 bg-[#97A9FF] rounded-full mr-2"></div>
                  Total Other Costs
                </span>
                <span className="text-[#020288] font-medium">
                  ₹
                  {result?.totalOtherCosts?.toLocaleString("en-IN", {
                    maximumFractionDigits: 0,
                  })}
                </span>
              </div>
            </div>
          </div>

          {/* Loan Summary */}
          <div className="bg-[#F5F4F7] rounded-xl p-4 mb-4">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="text-center">
                <div className="text-[#666666] font-medium mb-1">
                  Interest Rate
                </div>
                <div className="text-[#020288] font-bold text-sm">
                  {interestRate}% p.a.
                </div>
              </div>
              <div className="text-center">
                <div className="text-[#666666] font-medium mb-1">
                  Loan Tenure
                </div>
                <div className="text-[#020288] font-bold text-sm">
                  {displayedTenure} years
                </div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="flex justify-center py-2">
            {chartData && <ChartDisplay data={chartData} type="pie" />}
          </div>
        </div>

        {/* Amortization Schedule Section */}
        <AmortizationSchedule
          amortizationTable={amortizationTable}
          yearlyAmortization={yearlyAmortization}
        />

        {/* Assumptions*/}
        <Assumptions />
      </div>
    </div>
  );
};

export default MortgageCalculator;
