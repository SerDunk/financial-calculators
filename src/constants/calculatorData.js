import Home from "../../public/house-cleaning.png";
import HouseBOR from "../../public/house.png";
import Car from "../../public/accept-car.png";
import Invest from "../../public/benefit.png";
import Vacation from "../../public/beach.png";
import Image from "next/image";

const FAQIcon = () => (
  <svg
    width="40"
    height="40"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="text-[#8362D1]"
  >
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
    <path
      d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 17h.01"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

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
    icon: <Image src={HouseBOR} alt="House Sale" />,
    link: "/calculators/buy-vs-rent",
  },
  {
    id: 3,
    title: "Car Purchase",
    description: "Calculate your car loan EMI and total cost of ownership",
    icon: <Image src={Car} alt="Car" />,
    link: "/calculators/car-purchase",
  },
  {
    id: 4,
    title: "Home Investment",
    description: "Calculate potential returns from real estate investment",
    icon: <Image src={Invest} alt="Investment" />,
    link: "/calculators/home-investment",
  },
  ,
  {
    id: 5,
    title: "Vacation Planning",
    description: "Plan your dream vacation savings with investment returns",
    icon: <Image src={Vacation} alt="Beach" />,
    link: "/calculators/vacation-planning",
  },
];
