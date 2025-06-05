import Home from "../../public/house-cleaning.png";
import Image from "next/image";

export const calculatorData = [
  {
    id: 1,
    title: "Mortgage Calculator",
    description:
      "Calculate your home loan EMI based on amount, tenure and interest rate",
    icon: <Image src={Home} alt="House" />,
    link: "/calculators/mortgage",
  },
  {
    id: 2,
    title: "Buy vs Rent",
    description: "Compare the long-term cost of buying a home vs renting",
    icon: "🏡",
    link: "/calculators/buy-vs-rent",
  },
  {
    id: 3,
    title: "Home Investment",
    description: "Calculate potential returns from real estate investment",
    icon: "💰",
    link: "/calculators/home-investment",
  },
  {
    id: 4,
    title: "Car Purchase",
    description: "Calculate your car loan EMI and total cost of ownership",
    icon: "🚗",
    link: "/calculators/car-purchase",
  },
  {
    id: 5,
    title: "Vacation Planning",
    description: "Plan your dream vacation savings with investment returns",
    icon: "✈️",
    link: "/calculators/vacation-planning",
  },
];
