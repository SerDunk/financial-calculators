import Home from "../../public/house-cleaning.png";
import HouseBOR from "../../public/house.png";
import Car from "../../public/accept-car.png";
import Invest from "../../public/benefit.png";
import Vacation from "../../public/beach.png";
import Rings from "../../public/wedding-rings.png";
import CreditCard from "../../public/credit-card.png";
import Investment from "../../public/money.png";
import Salary from "../../public/salary.png";
import SIP from "../../public/SIP.png";
import CarLease from "../../public/car-lease.png";
import Tax from "../../public/tax.png"
import Image from "next/image";


export const calculatorData = [
  {
    id: 1,
    title: "Home Loan",
    description:
      "Calculate your home loan EMI based on amount, tenure and interest rate",
    icon: <Image src={Home} alt="House" />,
    link: "/calculators/mortgage",
    categories: ["home", "debt"],
  },
  {
    id: 2,
    title: "Buy vs Rent",
    description: "Compare the long-term cost of buying a home vs renting",
    icon: <Image src={HouseBOR} alt="House Sale" />,
    link: "/calculators/buy-vs-rent",
    categories: ["home"],
  },
  {
    id: 3,
    title: "Car Purchase",
    description: "Calculate your car loan EMI and total cost of ownership",
    icon: <Image src={Car} alt="Car" />,
    link: "/calculators/car-purchase",
    categories: ["home"],
  },
  {
    id: 4,
    title: "Home Investment",
    description: "Calculate potential returns from real estate investment",
    icon: <Image src={Invest} alt="Investment" />,
    link: "/calculators/home-investment",
    categories: ["investing", "home"],
  },
  {
    id: 5,
    title: "In-Hand Salary",
    description: "Calculate your in-hand salary and tax",
    icon: <Image src={Salary} alt="Salary" />,
    link: "/calculators/in-hand-salary",
    categories: ["salary"],
  },
  {
    id: 6,
    title: "Vacation Planning",
    description: "Estimate travel costs and plan your perfect getaway.",
    icon: <Image src={Vacation} alt="Beach" />,
    link: "/calculators/vacation-planning",
    categories: ["lifestyle"],
  },
  {
    id: 7,
    title: "Wedding Cost",
    description:
      "Create a personalized budget to plan your dream wedding with ease.",
    icon: <Image src={Rings} alt="wedding-ring" />,
    link: "/calculators/wedding",
    categories: ["lifestyle"],
  },
  {
    id: 8,
    title: "Credit Card",
    description: "Calculate your credit card EMI and total cost of ownership",
    icon: <Image src={CreditCard} alt="Credit Card" />,
    link: "/calculators/credit-card",
    categories: ["debt"],
  },
  {
    id: 9,
    title: "Investment",
    description: "Calculate your investment returns and growth",
    icon: <Image src={Investment} alt="Investment" />,
    link: "/calculators/investment",
    categories: ["investing"],
  },
  {
    id: 10,
    title: "SIP Calculator",
    description: "Calculate your SIP returns and growth",
    icon: <Image src={SIP} alt="Invest" />,
    link: "/calculators/sip",
    categories: ["investing"],
  },
  {
    id: 11,
    title: "Car Lease",
    description: "Calculate your car lease EMI and total cost of ownership",
    link: "/calculators/car-lease",
    icon: <Image src={CarLease} alt="Car" />,
    categories: ["home", "debt"],
  },
  {
  id: 12,
  title: "Old vs New Tax Regime",
  description: "Compare your tax liability under both regimes to identify the most tax-efficient option for you",
  link: "/calculators/old-vs-new-tax-regime",
  icon:<Image src={Tax} alt="Money in Hand"/>,
  categories: ["salary"]
}
];
