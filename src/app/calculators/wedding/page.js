"use client";

import { useState, useEffect } from "react";
import { Slider } from "@mui/material";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

import { Info } from "lucide-react";
import Heading from "@/components/Heading";
import { calculateWeddingBreakdown } from "@/utils/calculation";
import WeddingResult from "@/components/WeddingResult";
import WeddingAssumptions from "@/components/WeddingAssumptions";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const WeddingCalculator = () => {
  const [totalBudget, setTotalBudget] = useState(1500000);
  const [guestCount, setGuestCount] = useState(200);
  const [foodAmount, setFoodAmount] = useState(375000);
  const [decorationAmount, setDecorationAmount] = useState(180000);
  const [photographyAmount, setPhotographyAmount] = useState(120000);
  const [venueAmount, setVenueAmount] = useState(375000);
  const [clothingAmount, setClothingAmount] = useState(150000);
  const [makeupAmount, setMakeupAmount] = useState(75000);
  const [entertainmentAmount, setEntertainmentAmount] = useState(75000);
  const [accommodationAmount, setAccommodationAmount] = useState(45000);
  const [invitationAmount, setInvitationAmount] = useState(30000);
  const [weddingPlanner, setWeddingPlanner] = useState("No");
  const [totalBudgetInput, setTotalBudgetInput] = useState("15,00,000");
  const [guestCountInput, setGuestCountInput] = useState("200");
  const [result, setResult] = useState(null);

  const formatIndianNumber = (num) => {
    if (num == null || isNaN(num)) return "0";
    return Number(num).toLocaleString("en-IN");
  };

  const formatShortIndianCurrency = (amt) => {
    if (amt == null) return "0";
    const num = parseInt(amt);
    if (isNaN(num)) return "0";
    if (num >= 1e7) return `${(num / 1e7).toFixed(1)}Cr`;
    if (num >= 1e5) return `${(num / 1e5).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return `${num}`;
  };

  const parseFormattedNumber = (str) => {
    if (!str) return 0;
    const parsed = parseInt(str.replace(/[^\d]/g, ""));
    return isNaN(parsed) ? 0 : parsed;
  };

  useEffect(() => {
    calculate();
  }, [
    totalBudget,
    guestCount,
    foodAmount,
    decorationAmount,
    photographyAmount,
    venueAmount,
    clothingAmount,
    makeupAmount,
    entertainmentAmount,
    accommodationAmount,
    invitationAmount,
    weddingPlanner,
  ]);

  // useEffect(() => handleCalculate(), []);

  const handleCalculate = () => {
    calculate();
  };

  const calculate = () => {
    const result = calculateWeddingBreakdown({
      totalBudget,
      guestCount,
      foodAmount,
      decorationAmount,
      photographyAmount,
      venueAmount,
      clothingAmount,
      makeupAmount,
      entertainmentAmount,
      accommodationAmount,
      invitationAmount,
      weddingPlanner,
    });
    setResult(result);
  };

  return (
    <div className="min-h-screen font-lexend bg-[#EFEDF4] xs:px-0 px-1.5">
      <div className="max-w-xl mx-auto">
        <Heading
          header="Wedding Budget Calculator"
          desc="Plan and allocate your wedding budget across different categories for Indian weddings"
        />

        <div className="rounded-2xl p-6 relative bg-white">
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Total Wedding Budget</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666] max-w-xs">
                    Total amount you plan to spend on the wedding including all
                    ceremonies like engagement, mehendi, sangam, wedding, and
                    reception
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288]">₹</span>
                <input
                  type="text"
                  className="text-[#020288] text-xs w-18 text-center border-none outline-none focus:ring-0 bg-transparent"
                  value={totalBudgetInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setTotalBudgetInput(raw ? formatIndianNumber(+raw) : "");
                    setTotalBudget(raw ? +raw : 0);
                  }}
                  onFocus={(e) =>
                    setTotalBudgetInput(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  onBlur={() => {
                    const val = parseFormattedNumber(totalBudgetInput);
                    const cons = Math.min(Math.max(val, 500000), 50000000);
                    setTotalBudget(cons);
                    setTotalBudgetInput(formatIndianNumber(cons));
                  }}
                />
              </div>
            </div>
            <div className="text-[10px] text-[#020288] flex justify-end pt-2 px-2">
              {formatShortIndianCurrency(totalBudget.toString())}
            </div>

            <Slider
              value={totalBudget}
              min={500000}
              max={20000000}
              step={100000}
              onChange={(e, val) => {
                setTotalBudget(val);
                setTotalBudgetInput(formatIndianNumber(val));
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

          {/* Guest Count */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Number of Guests</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666] max-w-xs">
                    Total number of guests across all wedding functions
                    including relatives, friends, colleagues, and neighbors
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg">
                <input
                  type="text"
                  className="text-[#020288] text-xs w-16 text-center border-none outline-none focus:ring-0 bg-transparent"
                  value={guestCountInput}
                  onChange={(e) => {
                    const raw = e.target.value.replace(/[^0-9]/g, "");
                    setGuestCountInput(raw);
                    setGuestCount(raw ? +raw : 0);
                  }}
                  onFocus={(e) =>
                    setGuestCountInput(e.target.value.replace(/[^0-9]/g, ""))
                  }
                  onBlur={() => {
                    const val = parseFormattedNumber(guestCountInput);
                    const cons = Math.min(Math.max(val, 50), 2000);
                    setGuestCount(cons);
                    setGuestCountInput(cons.toString());
                  }}
                />
              </div>
            </div>
            <Slider
              value={guestCount}
              min={50}
              max={1000}
              step={50}
              onChange={(e, val) => {
                setGuestCount(val);
                setGuestCountInput(val.toString());
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

          {/* Food */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Food & Catering</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666] max-w-xs">
                    Complete catering for all functions including welcome
                    drinks, breakfast, lunch, dinner, snacks, sweets, paan, and
                    special dietary requirements for different ceremonies
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288] text-xs">₹</span>
                <span className="text-[#020288] text-xs w-18 text-center">
                  {formatShortIndianCurrency(foodAmount.toString())}
                </span>
              </div>
            </div>
            <Slider
              value={foodAmount}
              min={0}
              max={1000000}
              step={5000}
              onChange={(e, val) => setFoodAmount(val)}
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

          {/* Venue */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Venue</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666] max-w-xs">
                    Booking charges for marriage halls, banquet halls,
                    farmhouses, hotels, or destination venues for all ceremonies
                    including advance booking, security deposits, and additional
                    charges
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288] text-xs">₹</span>
                <span className="text-[#020288] text-xs w-18 text-center">
                  {formatShortIndianCurrency(venueAmount.toString())}
                </span>
              </div>
            </div>
            <Slider
              value={venueAmount}
              min={0}
              max={10000000}
              step={10000}
              onChange={(e, val) => setVenueAmount(val)}
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

          {/* Decoration */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Decoration</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666] max-w-xs">
                    Complete decoration including mandap decoration, floral
                    arrangements, lighting, stage decoration, entrance gates,
                    backdrop, rangoli, and traditional decorative items for all
                    ceremonies
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288] text-xs">₹</span>
                <span className="text-[#020288] text-xs w-18 text-center">
                  {formatShortIndianCurrency(decorationAmount.toString())}
                </span>
              </div>
            </div>
            <Slider
              value={decorationAmount}
              min={0}
              max={1000000}
              step={50000}
              onChange={(e, val) => setDecorationAmount(val)}
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

          {/* Photography & Videography */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Photography & Videography</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666] max-w-xs">
                    Professional photography and videography for all ceremonies,
                    candid shots, traditional portraits, drone shots,
                    pre-wedding shoots, photo albums, and video editing services
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288] text-xs">₹</span>
                <span className="text-[#020288] text-xs w-18 text-center">
                  {formatShortIndianCurrency(photographyAmount.toString())}
                </span>
              </div>
            </div>
            <Slider
              value={photographyAmount}
              min={0}
              max={500000}
              step={10000}
              onChange={(e, val) => setPhotographyAmount(val)}
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

          {/* Clothing & Jewelry */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Clothing & Jewelry</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666] max-w-xs">
                    Wedding outfits for bride and groom including lehengas,
                    sarees, sherwanis, suits, jewelry (gold, silver, diamond),
                    accessories, footwear, and outfits for different ceremonies
                    like mehendi, sangam, etc.
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288] text-xs">₹</span>
                <span className="text-[#020288] text-xs w-18 text-center">
                  {formatShortIndianCurrency(clothingAmount.toString())}
                </span>
              </div>
            </div>
            <Slider
              value={clothingAmount}
              min={0}
              max={1000000}
              step={10000}
              onChange={(e, val) => setClothingAmount(val)}
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

          {/* Makeup & Grooming */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Makeup & Grooming</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666] max-w-xs">
                    Professional makeup artist, hair styling, mehendi artist,
                    spa treatments, facials, grooming services for bride and
                    groom, and makeup for different ceremonies and functions
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288] text-xs">₹</span>
                <span className="text-[#020288] text-xs w-18 text-center">
                  {formatShortIndianCurrency(makeupAmount.toString())}
                </span>
              </div>
            </div>
            <Slider
              value={makeupAmount}
              min={0}
              max={100000}
              step={10000}
              onChange={(e, val) => setMakeupAmount(val)}
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

          {/* Entertainment */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Entertainment</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666] max-w-xs">
                    DJ, live band, sound system, lighting setup, dance
                    performances, live singers, dhol players, and other
                    entertainment arrangements for all ceremonies
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288] text-xs">₹</span>
                <span className="text-[#020288] text-xs w-18 text-center">
                  {formatShortIndianCurrency(entertainmentAmount.toString())}
                </span>
              </div>
            </div>
            <Slider
              value={entertainmentAmount}
              min={0}
              max={500000}
              step={10000}
              onChange={(e, val) => setEntertainmentAmount(val)}
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

          {/* Accommodation */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Accommodation</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666] max-w-xs">
                    Hotel bookings for out-of-town guests, family members, and
                    VIPs including room charges, breakfast, and special
                    arrangements
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288] text-xs">₹</span>
                <span className="text-[#020288] text-xs w-18 text-center">
                  {formatShortIndianCurrency(accommodationAmount.toString())}
                </span>
              </div>
            </div>
            <Slider
              value={accommodationAmount}
              min={0}
              max={1000000}
              step={5000}
              onChange={(e, val) => setAccommodationAmount(val)}
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
          {/* Invitation Cards & Gifts */}
          <div className="mb-1">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Invitation Cards & Gifts</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666] max-w-xs">
                    Wedding invitation cards, save-the-date cards, return gifts
                    for guests, welcome hampers, and ceremonial gifts for
                    relatives and VIPs
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
                <span className="text-[#020288] text-xs">₹</span>
                <span className="text-[#020288] text-xs w-18 text-center">
                  {formatShortIndianCurrency(invitationAmount.toString())}
                </span>
              </div>
            </div>
            <Slider
              value={invitationAmount}
              min={0}
              max={100000}
              step={5000}
              onChange={(e, val) => setInvitationAmount(val)}
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

          {/* Wedding Planner Toggle */}
          <div className="mb-3">
            <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
              <div className="flex items-center gap-1.5">
                <label>Wedding Planner</label>
                <Popover>
                  <PopoverTrigger>
                    <Info width={15} />
                  </PopoverTrigger>
                  <PopoverContent className="text-xs border-[#666666]">
                    Do you plan to hire a professional wedding planner?
                  </PopoverContent>
                </Popover>
              </div>
              <Select value={weddingPlanner} onValueChange={setWeddingPlanner}>
                <SelectTrigger className="w-24 h-8 bg-[#EAE9F0] text-[#020288] text-xs border-none">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Yes">Yes</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <button
          onClick={handleCalculate}
          className="w-full mt-2 bg-gradient-to-r from-[#583FCA] to-[#2D14A0] text-white font-bold py-3 rounded-2xl text-sm hover:opacity-90"
        >
          CALCULATE
        </button>
        {/* Results and Assumptions */}
        <WeddingResult result={result} />
        <WeddingAssumptions />
      </div>
    </div>
  );
};

export default WeddingCalculator;
