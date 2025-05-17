"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ChartDisplay from "../../../components/ChartDisplay";
import { calculateEMI, calculateTotalOwnershipCost } from "@/utils/calculation";

const CarPurchaseCalculator = () => {
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);

  const initialValues = {
    carPrice: 1000000,
    downPayment: 200000,
    loanTerm: 5,
    interestRate: 9,
    annualMaintenance: 20000,
    annualInsurance: 15000,
    fuelCost: 10000,
    yearsOfOwnership: 5,
  };

  const validationSchema = Yup.object().shape({
    carPrice: Yup.number()
      .min(100000, "Minimum car price is ₹1,00,000")
      .required("Required"),
    downPayment: Yup.number()
      .min(0, "Down payment cannot be negative")
      .test(
        "less-than-car-price",
        "Down payment must be less than car price",
        function (value) {
          return value < this.parent.carPrice;
        }
      )
      .required("Required"),
    loanTerm: Yup.number()
      .min(1, "Minimum loan term is 1 year")
      .max(7, "Maximum loan term is 7 years")
      .required("Required"),
    interestRate: Yup.number()
      .min(1, "Minimum interest rate is 1%")
      .max(20, "Maximum interest rate is 20%")
      .required("Required"),
    annualMaintenance: Yup.number()
      .min(0, "Cannot be negative")
      .required("Required"),
    annualInsurance: Yup.number()
      .min(0, "Cannot be negative")
      .required("Required"),
    fuelCost: Yup.number().min(0, "Cannot be negative").required("Required"),
    yearsOfOwnership: Yup.number()
      .min(1, "Minimum ownership period is 1 year")
      .max(15, "Maximum ownership period is 15 years")
      .required("Required"),
  });

  const onSubmit = (values) => {
    const {
      carPrice,
      downPayment,
      loanTerm,
      interestRate,
      annualMaintenance,
      annualInsurance,
      fuelCost,
      yearsOfOwnership,
    } = values;

    const loanAmount = carPrice - downPayment;
    const emi = calculateEMI(loanAmount, loanTerm, interestRate);
    const totalInterest = emi * loanTerm * 12 - loanAmount;
    const totalLoanCost = emi * loanTerm * 12;

    const ownershipCost = calculateTotalOwnershipCost(
      carPrice,
      downPayment,
      emi,
      loanTerm,
      annualMaintenance,
      annualInsurance,
      fuelCost,
      yearsOfOwnership
    );

    setResult({
      emi,
      totalInterest,
      totalLoanCost,
      totalOwnershipCost: ownershipCost.totalCost,
      monthlyCost: ownershipCost.monthlyCost,
      depreciation: ownershipCost.depreciation,
    });

    setChartData({
      labels: [
        "Down Payment",
        "Loan Payments",
        "Maintenance",
        "Insurance",
        "Fuel",
      ],
      datasets: [
        {
          label: "Cost (₹)",
          data: [
            downPayment,
            totalLoanCost,
            annualMaintenance * yearsOfOwnership,
            annualInsurance * yearsOfOwnership,
            fuelCost * 12 * yearsOfOwnership,
          ],
          backgroundColor: [
            "#6b46c1",
            "#9f7aea",
            "#f6ad55",
            "#f687b3",
            "#68d391",
          ],
          borderColor: ["#6b46c1", "#9f7aea", "#f6ad55", "#f687b3", "#68d391"],
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-800 mb-6">
        Car Purchase Calculator
      </h2>
      <p className="text-gray-600 mb-8">
        Calculate your car loan EMI and total cost of ownership including
        maintenance and insurance.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div>
                  <label
                    htmlFor="carPrice"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Car Price (₹)
                  </label>
                  <Field
                    type="number"
                    name="carPrice"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="carPrice"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="downPayment"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Down Payment (₹)
                  </label>
                  <Field
                    type="number"
                    name="downPayment"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="downPayment"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="loanTerm"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Loan Term (years)
                  </label>
                  <Field
                    type="number"
                    name="loanTerm"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="loanTerm"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="interestRate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Interest Rate (%)
                  </label>
                  <Field
                    type="number"
                    step="0.1"
                    name="interestRate"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="interestRate"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="annualMaintenance"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Annual Maintenance (₹)
                  </label>
                  <Field
                    type="number"
                    name="annualMaintenance"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="annualMaintenance"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="annualInsurance"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Annual Insurance (₹)
                  </label>
                  <Field
                    type="number"
                    name="annualInsurance"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="annualInsurance"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="fuelCost"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Monthly Fuel Cost (₹)
                  </label>
                  <Field
                    type="number"
                    name="fuelCost"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="fuelCost"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="yearsOfOwnership"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Years of Ownership
                  </label>
                  <Field
                    type="number"
                    name="yearsOfOwnership"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="yearsOfOwnership"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Calculate Costs
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              Cost Breakdown
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Monthly EMI:</span>
                <span className="font-bold">
                  ₹
                  {result.emi.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Interest:</span>
                <span className="font-bold">
                  ₹
                  {result.totalInterest.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Loan Cost:</span>
                <span className="font-bold">
                  ₹
                  {result.totalLoanCost.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Depreciation (15% p.a.):</span>
                <span className="font-bold">
                  ₹
                  {result.depreciation.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Ownership Cost:</span>
                <span className="font-bold">
                  ₹
                  {result.totalOwnershipCost.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Effective Monthly Cost:</span>
                <span className="font-bold">
                  ₹
                  {result.monthlyCost.toLocaleString("en-IN", {
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            {chartData && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-purple-800 mb-3">
                  Cost Distribution
                </h4>
                <ChartDisplay data={chartData} type="pie" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CarPurchaseCalculator;
