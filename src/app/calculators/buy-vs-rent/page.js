"use client";
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ChartDisplay from "../../../components/ChartDisplay";
import { calculateBuyVsRent } from "@/utils/calculation";

const BuyVsRentCalculator = () => {
  const [result, setResult] = useState(null);
  const [chartData, setChartData] = useState(null);

  const initialValues = {
    homePrice: 8000000,
    downPaymentPercent: 20,
    interestRate: 8.5,
    loanTerm: 20,
    maintenancePercent: 1,
    propertyTaxPercent: 1.5,
    homeAppreciation: 7,
    sellingCostPercent: 5,
    monthlyRent: 25000,
    rentIncreasePercent: 5,
    investmentReturn: 9,
    comparisonPeriod: 10,
  };

  const validationSchema = Yup.object().shape({
    homePrice: Yup.number()
      .min(100000, "Minimum ₹1,00,000")
      .required("Required"),
    downPaymentPercent: Yup.number()
      .min(0, "Minimum 0%")
      .max(100, "Maximum 100%")
      .required("Required"),
    interestRate: Yup.number()
      .min(0, "Minimum 0%")
      .max(20, "Maximum 20%")
      .required("Required"),
    loanTerm: Yup.number()
      .min(1, "Minimum 1 year")
      .max(30, "Maximum 30 years")
      .required("Required"),
    maintenancePercent: Yup.number()
      .min(0, "Minimum 0%")
      .max(10, "Maximum 10%")
      .required("Required"),
    propertyTaxPercent: Yup.number()
      .min(0, "Minimum 0%")
      .max(10, "Maximum 10%")
      .required("Required"),
    homeAppreciation: Yup.number()
      .min(-10, "Minimum -10%")
      .max(20, "Maximum 20%")
      .required("Required"),
    sellingCostPercent: Yup.number()
      .min(0, "Minimum 0%")
      .max(20, "Maximum 20%")
      .required("Required"),
    monthlyRent: Yup.number().min(1000, "Minimum ₹1,000").required("Required"),
    rentIncreasePercent: Yup.number()
      .min(0, "Minimum 0%")
      .max(20, "Maximum 20%")
      .required("Required"),
    investmentReturn: Yup.number()
      .min(0, "Minimum 0%")
      .max(20, "Maximum 20%")
      .required("Required"),
    comparisonPeriod: Yup.number()
      .min(1, "Minimum 1 year")
      .max(30, "Maximum 30 years")
      .required("Required"),
  });

  const onSubmit = (values) => {
    const result = calculateBuyVsRent(values);
    setResult(result);

    // Updated chart data
    setChartData({
      labels: ["Buying Expenses", "Future Home Value", "Renting Cost"],
      datasets: [
        {
          label: "Amount (₹)",
          data: [
            result.totalBuyingExpenses,
            result.futureHomeValue,
            result.totalRentCostAdjusted,
          ],
          backgroundColor: [
            "#6b46c1", // Purple for expenses
            "#38a169", // Green for asset value
            "#f6ad55", // Gold for rent
          ],
          borderColor: ["#6b46c1", "#38a169", "#f6ad55"],
          borderWidth: 1,
        },
      ],
    });
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-purple-800 mb-6">
        Buy vs Rent Calculator
      </h2>
      <p className="text-gray-600 mb-8">
        Compare the financial implications of buying a home versus renting over
        time.
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
                <h3 className="text-lg font-semibold text-purple-800 mb-3">
                  Home Purchase Details
                </h3>
                <div>
                  <label
                    htmlFor="homePrice"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Home Price (₹)
                  </label>
                  <Field
                    type="number"
                    name="homePrice"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                  />
                  <ErrorMessage
                    name="homePrice"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="downPaymentPercent"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Down Payment (%)
                    </label>
                    <Field
                      type="number"
                      step="0.1"
                      name="downPaymentPercent"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                    />
                    <ErrorMessage
                      name="downPaymentPercent"
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
                </div>

                <div className="grid grid-cols-3 gap-4">
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
                      htmlFor="maintenancePercent"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Maintenance (%/year)
                    </label>
                    <Field
                      type="number"
                      step="0.1"
                      name="maintenancePercent"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                    />
                    <ErrorMessage
                      name="maintenancePercent"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="propertyTaxPercent"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Property Tax (%/year)
                    </label>
                    <Field
                      type="number"
                      step="0.1"
                      name="propertyTaxPercent"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                    />
                    <ErrorMessage
                      name="propertyTaxPercent"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="homeAppreciation"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Home Appreciation (%/year)
                    </label>
                    <Field
                      type="number"
                      step="0.1"
                      name="homeAppreciation"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                    />
                    <ErrorMessage
                      name="homeAppreciation"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="sellingCostPercent"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Selling Cost (%)
                    </label>
                    <Field
                      type="number"
                      step="0.1"
                      name="sellingCostPercent"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                    />
                    <ErrorMessage
                      name="sellingCostPercent"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-purple-800 mb-3 mt-6">
                  Rental Details
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="monthlyRent"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Monthly Rent (₹)
                    </label>
                    <Field
                      type="number"
                      name="monthlyRent"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                    />
                    <ErrorMessage
                      name="monthlyRent"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="rentIncreasePercent"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Rent Increase (%/year)
                    </label>
                    <Field
                      type="number"
                      step="0.1"
                      name="rentIncreasePercent"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                    />
                    <ErrorMessage
                      name="rentIncreasePercent"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-purple-800 mb-3 mt-6">
                  Comparison Settings
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="investmentReturn"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Investment Return (%/year)
                    </label>
                    <Field
                      type="number"
                      step="0.1"
                      name="investmentReturn"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                    />
                    <ErrorMessage
                      name="investmentReturn"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="comparisonPeriod"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Comparison Period (years)
                    </label>
                    <Field
                      type="number"
                      name="comparisonPeriod"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 p-2 border"
                    />
                    <ErrorMessage
                      name="comparisonPeriod"
                      component="div"
                      className="text-red-500 text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Compare Buy vs Rent
                </button>
              </Form>
            )}
          </Formik>
        </div>

        {result && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-purple-800 mb-4">
              Comparison Results
            </h3>

            {/* Buying Section */}
            <div className="border-b pb-4 mb-4">
              <h4 className="text-lg font-medium text-purple-800 mb-2">
                Buying Details
              </h4>

              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <p className="text-sm text-gray-600">Loan Amount</p>
                  <p className="font-bold">
                    ₹{result.loanAmount.toLocaleString("en-IN")}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Monthly EMI</p>
                  <p className="font-bold">
                    ₹
                    {result.monthlyEMI.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-2">
                <div>
                  <p className="text-sm text-gray-600">Total EMI Paid</p>
                  <p className="font-bold">
                    ₹
                    {result.totalEMIPaid.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Maintenance</p>
                  <p className="font-bold">
                    ₹
                    {result.totalMaintenanceCost.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Property Tax</p>
                  <p className="font-bold">
                    ₹
                    {result.totalPropertyTax.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <p className="text-sm text-gray-600">Selling Cost</p>
                  <p className="font-bold">
                    ₹
                    {result.sellingCost.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Future Home Value</p>
                  <p className="font-bold">
                    ₹
                    {result.futureHomeValue.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 p-3 rounded mt-2">
                <div className="flex justify-between">
                  <span className="font-medium">Total Buying Expenses:</span>
                  <span className="font-bold">
                    ₹
                    {result.totalBuyingExpenses.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Net Profit from Home:</span>
                  <span
                    className={`font-bold ${
                      result.netProfitFromHome >= 0
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    ₹
                    {Math.abs(result.netProfitFromHome).toLocaleString(
                      "en-IN",
                      { maximumFractionDigits: 0 }
                    )}
                  </span>
                </div>
              </div>
            </div>

            {/* Renting Section */}
            <div className="border-b pb-4 mb-4">
              <h4 className="text-lg font-medium text-purple-800 mb-2">
                Renting Details
              </h4>

              <div className="grid grid-cols-2 gap-4 mb-2">
                <div>
                  <p className="text-sm text-gray-600">Total Rent Paid</p>
                  <p className="font-bold">
                    ₹
                    {result.totalRentPaid.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Investment Return</p>
                  <p className="font-bold">
                    ₹
                    {result.investmentReturn.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
              </div>

              <div className="bg-purple-50 p-3 rounded">
                <div className="flex justify-between font-medium">
                  <span>Total Rent Cost (Adjusted):</span>
                  <span className="font-bold">
                    ₹
                    {result.totalRentCostAdjusted.toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </div>
              </div>
            </div>

            {/* Decision Section */}
            <div
              className={`p-4 rounded-md ${
                result.decision === "BUY"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              <p className="font-semibold text-center text-lg mb-1">
                {result.decision === "BUY"
                  ? "BUYING IS BETTER"
                  : "RENTING IS BETTER"}
              </p>
              <p className="text-center">
                {result.decision === "BUY"
                  ? `Buying gives you ₹${result.savings.toLocaleString(
                      "en-IN"
                    )} more benefit over ${result.comparisonPeriod} years`
                  : `Renting saves you ₹${result.savings.toLocaleString(
                      "en-IN"
                    )} over ${result.comparisonPeriod} years`}
              </p>
            </div>

            {/* Chart - Remains the same */}
            {chartData && (
              <div className="mt-6">
                <h4 className="text-lg font-medium text-purple-800 mb-3">
                  Cost Comparison
                </h4>
                <ChartDisplay data={chartData} type="bar" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyVsRentCalculator;
