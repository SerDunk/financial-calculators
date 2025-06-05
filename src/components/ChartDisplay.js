"use client";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
} from "chart.js";
import { lexend } from "../../public/fonts";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement
);

const ChartDisplay = ({ data, type = "pie" }) => {
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        enabled: true,
        bodyFont: {
          family: "Lexend",
          size: 14,
        },
      },
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          font: {
            size: 10,
          },
          padding: 10,
        },
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.dataset.label || "";
            if (label) {
              label += ": ";
            }
            if (context.parsed !== null) {
              label += new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(context.parsed);
            }
            return label;
          },
        },
      },
    },
  };

  const renderChart = () => {
    switch (type) {
      case "pie":
        return <Pie data={data} options={options} />;
      case "bar":
        return <Bar data={data} options={options} />;
      case "line":
        return <Line data={data} options={options} />;
      default:
        return <Pie data={data} options={options} />;
    }
  };

  return (
    <div className="w-full flex justify-center h-64 md:h-80">
      {renderChart()}
    </div>
  );
};

export default ChartDisplay;
