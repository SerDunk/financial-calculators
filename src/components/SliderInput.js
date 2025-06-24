import React from "react";
import { Info } from "lucide-react";
import { Slider } from "@mui/material";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

const SliderInput = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100000,
  step = 5000,
  tooltip,
  sliderColor = "#020288",
  showCurrency = true,
}) => {
  // Format currency in short form (K, L, Cr)
  const formatShortIndianCurrency = (amt) => {
    if (amt == null) return "0";
    const num = parseInt(amt);
    if (isNaN(num)) return "0";
    if (num >= 1e7) return `${(num / 1e7).toFixed(1)}Cr`;
    if (num >= 1e5) return `${(num / 1e5).toFixed(1)}L`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return `${num}`;
  };

  // Handle slider change
  const handleSliderChange = (event, newValue) => {
    onChange(newValue);
  };

  return (
    <div className="mb-1">
      <div className="flex justify-between items-center text-[#323233] font-medium text-sm mb-1">
        <div className="flex items-center gap-1.5">
          <label>{label}</label>
          {tooltip && (
            <Popover>
              <PopoverTrigger>
                <Info width={15} />
              </PopoverTrigger>
              <PopoverContent className="text-xs border-[#666666] max-w-xs">
                {tooltip}
              </PopoverContent>
            </Popover>
          )}
        </div>
        <div className="flex bg-[#EAE9F0] px-1 py-1 rounded-lg items-center">
          {showCurrency && <span className="text-[#020288] text-xs">₹</span>}
          <span className="text-[#020288] text-xs w-18 text-center">
            {showCurrency
              ? formatShortIndianCurrency(value.toString())
              : value.toString()}
          </span>
        </div>
      </div>
      <Slider
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={handleSliderChange}
        sx={{
          color: sliderColor,
          height: 6,
          "& .MuiSlider-thumb": {
            backgroundImage: "url('/slider.svg')",
            backgroundPosition: "center",
            width: 18,
            height: 18,
            transition: "box-shadow 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
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
  );
};

export default SliderInput;
