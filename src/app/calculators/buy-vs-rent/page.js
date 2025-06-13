"use client";

import { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Info } from "lucide-react";
import { calculateBuyVsRentBreakdown } from "@/utils/calculation";
import Heading from "@/components/Heading";

const BuyVsRentCalculator = () => {
  // State for all calculator inputs
  const [homePrice, setHomePrice] = useState(8000000); // ₹80,00,000
  const [downPaymentPercent, setDownPaymentPercent] = useState(20); // 20%
  const [interestRate, setInterestRate] = useState(8.5); // 8.5%
  const [loanTerm, setLoanTerm] = useState(20); // 20 years
  const [monthlyRent, setMonthlyRent] = useState(25000); // ₹25,000
  const [rentIncreasePercent, setRentIncreasePercent] = useState(5); // 5% annually
  const [investmentReturnPercent, setInvestmentReturnPercent] = useState(12); // 12% annually
  const [comparisonPeriod, setComparisonPeriod] = useState(10); // 10 years

  // Calculated values
  const [loanAmount, setLoanAmount] = useState(6400000); // 80% of 80L
  const [downPaymentAmount, setDownPaymentAmount] = useState(1600000);

  // Input display states
  const [homePriceInput, setHomePriceInput] = useState("80,00,000");
  const [downPaymentPercentInput, setDownPaymentPercentInput] = useState("20%");
  const [interestRateInput, setInterestRateInput] = useState("8.5%");
  const [loanTermInput, setLoanTermInput] = useState("20 yrs");
  const [monthlyRentInput, setMonthlyRentInput] = useState("25,000");
  const [rentIncreasePercentInput, setRentIncreasePercentInput] =
    useState("5%");
  const [investmentReturnPercentInput, setInvestmentReturnPercentInput] =
    useState("12%");
  const [comparisonPeriodInput, setComparisonPeriodInput] = useState("10 yrs");

  // Results - these will only update when Calculate is pressed
  const [result, setResult] = useState(null);

  // Calculation functions

  useEffect(() => {
    const initialLoanAmount = homePrice * (1 - downPaymentPercent / 100);
    const initialDownPayment = homePrice * (downPaymentPercent / 100);
    setLoanAmount(initialLoanAmount);
    setDownPaymentAmount(initialDownPayment);

    // Perform initial calculation with default values
    performCalculations();
  }, []); // Empty dependency array to run only once on mount

  // Update loan amount and down payment when home price or down payment percent changes
  useEffect(() => {
    const calculatedLoanAmount = homePrice * (1 - downPaymentPercent / 100);
    const calculatedDownPayment = homePrice * (downPaymentPercent / 100);
    setLoanAmount(calculatedLoanAmount);
    setDownPaymentAmount(calculatedDownPayment);
  }, [homePrice, downPaymentPercent]);

  // Update input display when values change
  useEffect(() => {
    setLoanTermInput(`${loanTerm} yrs`);
  }, [loanTerm]);

  useEffect(() => {
    setInterestRateInput(`${interestRate}%`);
  }, [interestRate]);

  useEffect(() => {
    setDownPaymentPercentInput(`${downPaymentPercent}%`);
  }, [downPaymentPercent]);

  useEffect(() => {
    setRentIncreasePercentInput(`${rentIncreasePercent}%`);
  }, [rentIncreasePercent]);

  useEffect(() => {
    setInvestmentReturnPercentInput(`${investmentReturnPercent}%`);
  }, [investmentReturnPercent]);

  useEffect(() => {
    setComparisonPeriodInput(`${comparisonPeriod} yrs`);
  }, [comparisonPeriod]);

  // Format number with Indian comma separation
  const formatIndianNumber = (num) => {
    return num.toLocaleString("en-IN");
  };

  const formatShortIndianCurrency = (amount) => {
    const num = parseInt(amount);
    if (num >= 10000000) {
      return `${(num / 10000000).toFixed(1)}Cr`;
    } else if (num >= 100000) {
      return `${(num / 100000).toFixed(1)}L`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
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
  const performCalculations = () => {
    const breakdown = calculateBuyVsRentBreakdown(
      homePrice,
      downPaymentPercent,
      interestRate,
      loanTerm,
      0.5,
      0.7,
      7,
      2,
      monthlyRent,
      rentIncreasePercent,
      investmentReturnPercent,
      comparisonPeriod
    );

    if (!breakdown) return;

    const netBuyGain = breakdown.netHomeEquity - breakdown.totalBuyingCost;
    const netRentGain = breakdown.investmentReturn;
    const betterOption = netBuyGain > netRentGain ? "Buying" : "Renting";

    setResult({
      loanAmount: breakdown.loanAmount,
      monthlyEMI: breakdown.loanEMI,
      downPayment: breakdown.downPayment,
      totalEMIs: breakdown.totalLoanPayments,
      totalTax: breakdown.totalPropertyTax,
      totalOther: breakdown.totalMaintenance + breakdown.totalSellingCost,
      totalHomeCost: breakdown.totalBuyingCost,
      totalRentPaid: breakdown.totalRentPaid,
      netBuyGain: netBuyGain,
      netRentGain: netRentGain,
      totalMonthlyOutflowBuy: breakdown.totalMonthlyPayment,
      totalMonthlyOutflowRent: breakdown.monthlyRentPaid,
      comparisonPeriod: comparisonPeriod,
      decision: betterOption,
      savings: Math.abs(netBuyGain - netRentGain),
      betterOption,
      displayedTenure: comparisonPeriod,
      chartData: [
        {
          name: "Buy - Cost",
          value: breakdown.totalBuyingCost,
          color: "#AB78FF",
        },
        {
          name: "Rent - Cost",
          value: breakdown.totalRentPaid,
          color: "#F4B6D2",
        },
      ],
    });
  };

  // Handle Calculate button click
  const handleCalculate = () => {
    performCalculations();
  };

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] px-2 sm:px-4 lg:px-6">
      <div className="max-w-xl mx-auto">
        <Heading
          header="Buy vs Rent Calculator"
          desc="Compare the financial impact of buying vs renting to make an informed decision"
        />

        {/* SLIDERS SECTION ABSTRACTED - Insert your slider components here */}
        <div
          className="rounded-2xl p-6 relative"
          style={{
            background:
              "radial-gradient(ellipse 113px 357px at center, #8362D1 -60%, #192226 130%)",
          }}
        >
          {/* Home Price */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center text-white font-medium">
              <div className="flex items-center gap-1.5">
                <p>Home Price</p>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    The total price of the home you're considering to buy
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center text-xs bg-white px-1 py-1 rounded-lg">
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
            <div className="text-[10px] text-white flex justify-end pt-2 px-2">
              {formatShortIndianCurrency(homePrice.toString())}
            </div>

            <Slider
              value={homePrice}
              min={500000}
              max={50000000}
              step={25000}
              onChange={(e, val) => {
                setHomePrice(val);
                setHomePriceInput(formatIndianNumber(val));
              }}
              sx={{
                color: "#fff",
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
            <div className="flex text-sm justify-between items-center mb-1 text-white font-medium">
              <div className="flex items-center gap-1.5">
                <label>Down Payment</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    Percentage of home price you'll pay upfront
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center bg-white px-1 py-1 rounded-lg">
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
            <div className="flex justify-between items-center text-[10px] pt-2 px-2 mb-2">
              <div className="flex flex-col gap-2">
                <span className="text-white">Down Payment</span>
                <span className="font-medium bg-white text-[#2D14A0] px-2 py-1 rounded-md">
                  ₹{formatShortIndianCurrency(downPaymentAmount.toString())}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-white">Loan Amount</span>
                <span className="font-medium bg-white text-[#2D14A0] px-2 py-1 rounded-md">
                  ₹{formatShortIndianCurrency(loanAmount.toString())}
                </span>
              </div>
            </div>

            <Slider
              value={downPaymentPercent}
              min={5}
              max={50}
              step={0.5}
              onChange={(e, val) => {
                setDownPaymentPercent(val);
                setDownPaymentPercentInput(`${val}`);
              }}
              sx={{
                color: "#fff",
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
            <div className="flex text-sm justify-between items-center mb-1 text-white font-medium">
              <div className="flex items-center gap-1.5">
                <label>Housing Loan Interest</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    Annual interest rate on your home loan
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center bg-white px-1 py-1 rounded-lg">
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
              step={0.05}
              onChange={(e, val) => {
                setInterestRate(val);
                setInterestRateInput(`${val}`);
              }}
              sx={{
                color: "#fff",
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

          {/* Loan Tenure */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center mb-1 text-white font-medium">
              <div className="flex items-center gap-1.5">
                <label>Loan Tenure</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    Duration of your home loan in years
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center bg-white px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-20 text-center outline-none focus:ring-0"
                  value={loanTermInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setLoanTermInput(raw);
                    setLoanTerm(raw === "" ? 0 : parseInt(raw));
                  }}
                  onFocus={(e) =>
                    setLoanTermInput(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  onBlur={() =>
                    parseAndSetNumericValue(setLoanTerm, loanTermInput, 1, 30)
                  }
                />
              </div>
            </div>
            <Slider
              value={loanTerm}
              min={1}
              max={30}
              step={0.5}
              onChange={(e, val) => {
                setLoanTerm(val);
                setLoanTermInput(`${val}`);
              }}
              sx={{
                color: "#fff",
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

          {/* Monthly Rent */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center text-white font-medium">
              <div className="flex items-center gap-1.5">
                <label>Monthly Rent</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    Current monthly rent for a similar property
                  </PopoverContent>
                </Popover>
              </div>

              <div className="flex items-center text-xs bg-white px-1 py-1 rounded-lg">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-18 text-center outline-none focus:ring-0"
                  value={monthlyRentInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    const formatted = raw
                      ? formatIndianNumber(parseInt(raw))
                      : "";
                    setMonthlyRentInput(formatted);
                    setMonthlyRent(raw === "" ? 0 : parseInt(raw));
                  }}
                  onFocus={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setMonthlyRentInput(raw);
                  }}
                  onBlur={() => {
                    const value = parseFormattedNumber(monthlyRentInput);
                    const constrainedValue = Math.min(
                      Math.max(value, 1000),
                      200000
                    );
                    setMonthlyRent(constrainedValue);
                    setMonthlyRentInput(formatIndianNumber(constrainedValue));
                  }}
                />
              </div>
            </div>
            <div className="text-[10px] text-white flex justify-end pt-2 px-2">
              {formatShortIndianCurrency(monthlyRent.toString())}
            </div>

            <Slider
              value={monthlyRent}
              min={1000}
              max={200000}
              step={1000}
              onChange={(e, val) => {
                setMonthlyRent(val);
                setMonthlyRentInput(formatIndianNumber(val));
              }}
              sx={{
                color: "#fff",
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

          {/* Rent Increase % */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center mb-1 text-white font-medium">
              <div className="flex items-center gap-1.5">
                <label>Annual Rent Increase</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    Expected annual percentage increase in rent
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center bg-white px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-16 text-center outline-none focus:ring-0"
                  value={rentIncreasePercentInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setRentIncreasePercentInput(raw);
                    setRentIncreasePercent(raw === "" ? 0 : parseFloat(raw));
                  }}
                  onFocus={(e) =>
                    setRentIncreasePercentInput(
                      e.target.value.replace(/[^0-9.]/g, "")
                    )
                  }
                  onBlur={() =>
                    parseAndSetNumericValue(
                      setRentIncreasePercent,
                      rentIncreasePercentInput,
                      0,
                      15
                    )
                  }
                />
              </div>
            </div>
            <Slider
              value={rentIncreasePercent}
              min={0}
              max={15}
              step={0.1}
              onChange={(e, val) => {
                setRentIncreasePercent(val);
                setRentIncreasePercentInput(`${val}`);
              }}
              sx={{
                color: "#fff",
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

          {/* Investment Return % */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center mb-1 text-white font-medium">
              <div className="flex items-center gap-1.5">
                <label>Investment Return</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    Expected annual return on investing your down payment
                    savings
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center bg-white px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-16 text-center outline-none focus:ring-0"
                  value={investmentReturnPercentInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9.]/g, "");
                    setInvestmentReturnPercentInput(raw);
                    setInvestmentReturnPercent(
                      raw === "" ? 0 : parseFloat(raw)
                    );
                  }}
                  onFocus={(e) =>
                    setInvestmentReturnPercentInput(
                      e.target.value.replace(/[^0-9.]/g, "")
                    )
                  }
                  onBlur={() =>
                    parseAndSetNumericValue(
                      setInvestmentReturnPercent,
                      investmentReturnPercentInput,
                      1,
                      25
                    )
                  }
                />
              </div>
            </div>
            <Slider
              value={investmentReturnPercent}
              min={1}
              max={25}
              step={0.1}
              onChange={(e, val) => {
                setInvestmentReturnPercent(val);
                setInvestmentReturnPercentInput(`${val}`);
              }}
              sx={{
                color: "#fff",
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

          {/* Comparison Period */}
          <div className="mb-1">
            <div className="flex text-sm justify-between items-center mb-1 text-white font-medium">
              <div className="flex items-center gap-1.5">
                <label>Comparison Period</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent
                    className={`text-xs border-[#666666] font-lexend`}
                  >
                    Number of years to compare buying vs renting
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex items-center bg-white px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs border-none w-20 text-center outline-none focus:ring-0"
                  value={comparisonPeriodInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setComparisonPeriodInput(raw);
                    setComparisonPeriod(raw === "" ? 0 : parseInt(raw));
                  }}
                  onFocus={(e) =>
                    setComparisonPeriodInput(
                      e.target.value.replace(/[^0-9]/g, "")
                    )
                  }
                  onBlur={() =>
                    parseAndSetNumericValue(
                      setComparisonPeriod,
                      comparisonPeriodInput,
                      1,
                      50
                    )
                  }
                />
              </div>
            </div>
            <Slider
              value={comparisonPeriod}
              min={1}
              max={50}
              step={1}
              onChange={(e, val) => {
                setComparisonPeriod(val);
                setComparisonPeriodInput(`${val}`);
              }}
              sx={{
                color: "#fff",
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

        <div className="sm:mt-2 mt-4 sm:text-sm bg-white py-4 px-4 rounded-lg">
          {/* Main Summary Cards */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            {/* Down Payment */}
            <div className="bg-[#F5F4F7] rounded-xl p-3 text-center">
              <div className="text-xs text-[#666666] font-medium mb-1">
                Down Payment
              </div>
              <div className="text-md sm:text-lg font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                ₹{Math.round(result?.downPayment || 0).toLocaleString("en-IN")}
              </div>
            </div>

            {/* Total Rent Paid */}
            <div className="bg-[#F5F4F7] rounded-xl p-3 text-center">
              <div className="text-xs text-[#666666] font-medium mb-1">
                Total Rent Paid
              </div>
              <div className="text-md sm:text-lg font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                ₹
                {Math.round(result?.totalRentPaid || 0).toLocaleString("en-IN")}
              </div>
            </div>
          </div>

          {/* Total Cost & Value Over Tenure */}
          <div className="bg-[#F5F4F7] rounded-xl p-4 mb-4">
            <div className="text-center mb-3">
              <div className="text-xs text-[#666666] font-medium mb-1">
                Home Cost Over {result?.displayedTenure || comparisonPeriod}{" "}
                Years
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                ₹
                {Math.round(result?.totalHomeCost || 0).toLocaleString("en-IN")}
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center py-1">
                <span className="text-[#323233] flex items-center">
                  <div className="w-2 h-2 bg-[#AB78FF] rounded-full mr-2"></div>
                  Total EMIs Paid
                </span>
                <span className="text-[#020288] font-medium">
                  ₹{Math.round(result?.totalEMIs || 0).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#323233] flex items-center">
                  <div className="w-2 h-2 bg-[#CAF5BD] rounded-full mr-2"></div>
                  Property Tax
                </span>
                <span className="text-[#020288] font-medium">
                  ₹{Math.round(result?.totalTax || 0).toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-[#323233] flex items-center">
                  <div className="w-2 h-2 bg-[#45D099] rounded-full mr-2"></div>
                  Maintenance + Insurance
                </span>
                <span className="text-[#020288] font-medium">
                  ₹{Math.round(result?.totalOther || 0).toLocaleString("en-IN")}
                </span>
              </div>
            </div>
          </div>

          {/* Wealth Comparison */}
          <div className="bg-[#F5F4F7] rounded-xl p-4 mb-4">
            <div className="text-center mb-3">
              <div className="text-xs text-[#666666] font-medium mb-1">
                Net Gain from Buying vs Renting
              </div>
              <div className="text-xl font-bold bg-gradient-to-r from-[#320992] to-[#F04393] bg-clip-text text-transparent">
                ₹
                {Math.abs(
                  (result?.netBuyGain || 0) - (result?.netRentGain || 0)
                ).toLocaleString("en-IN")}
              </div>
              <div className="text-xs text-[#666666] mt-1">
                {result?.betterOption || "Buying"} is more practical over{" "}
                {result?.displayedTenure || comparisonPeriod} years
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="text-center">
                <div className="text-[#666666] font-medium mb-1">
                  Net Wealth (Buy)
                </div>
                <div className="text-[#020288] font-bold text-sm">
                  ₹{Math.round(result?.netBuyGain || 0).toLocaleString("en-IN")}
                </div>
              </div>
              <div className="text-center">
                <div className="text-[#666666] font-medium mb-1">
                  Net Wealth (Rent)
                </div>
                <div className="text-[#020288] font-bold text-sm">
                  ₹
                  {Math.round(result?.netRentGain || 0).toLocaleString("en-IN")}
                </div>
              </div>
            </div>
          </div>

          {/* Chart Placeholder */}
          <div className="flex justify-center py-2">
            <div className="bg-[#F5F4F7] rounded-xl p-4 w-full text-center">
              <div className="text-xs text-[#666666] mb-2">
                Cost Comparison Chart
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#AB78FF] rounded-full mr-2"></div>
                  <span>
                    Buy Cost: ₹
                    {formatShortIndianCurrency(
                      (result?.chartData?.[0]?.value || 0).toString()
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <div className="w-3 h-3 bg-[#F4B6D2] rounded-full mr-2"></div>
                  <span>
                    Rent Cost: ₹
                    {formatShortIndianCurrency(
                      (result?.chartData?.[1]?.value || 0).toString()
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyVsRentCalculator;
