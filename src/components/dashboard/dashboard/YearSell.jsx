"use client";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const YearSell = ({ thisYearSellData }) => {
  const [chartData, setChartData] = useState({
    labels: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
    datasets: [
      {
        label: "Total Order Count",
        data: Array(12).fill(0),
        backgroundColor: "#F27F21",
        borderRadius: 8,
        barThickness: 16,
        hoverBackgroundColor: "#3BB77E",
      },
      {
        label: "Total Sell Count",
        data: Array(12).fill(0),
        backgroundColor: "#FEB60D",
        borderRadius: 8,
        barThickness: 16,
        hoverBackgroundColor: "#9771FF",
      },
    ],
  });

  const [chartOptions] = useState({
    plugins: {
      legend: {
        display: true,
        position: "bottom",
        labels: {
          boxWidth: 0,
          boxHeight: 0,
          borderRadius: 0,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
    maintainAspectRatio: false,
    responsive: true,
  });

  useEffect(() => {
    // Initialize arrays to store the total sell count and total order count for each month
    const monthlySellData = Array(12).fill(0);
    const monthlyOrderCountData = Array(12).fill(0);

    // Update the total sell count and total order count for each month
    thisYearSellData?.forEach((order) => {
      const month = new Date(order?.createdAt).getMonth();
      monthlySellData[month] += 1; // Assuming each order contributes to the sell count
      monthlyOrderCountData[month] += order?.order_products?.length;
    });

    // Update the chart data only if it has changed
    if (
      !chartData.datasets[0].data.every(
        (value, index) => value === monthlySellData[index]
      ) ||
      !chartData.datasets[1].data.every(
        (value, index) => value === monthlyOrderCountData[index]
      )
    ) {
      setChartData({
        ...chartData,
        datasets: [
          {
            ...chartData.datasets[0],
            data: monthlySellData,
          },
          {
            ...chartData.datasets[1],
            data: monthlyOrderCountData,
          },
        ],
      });
    }
  }, [thisYearSellData, chartData]);

  return (
    <div>
      <div className="ml-6 mt-6">
        <h6 className="text-[18px] md:text-[26px] font-semibold">
          {" "}
          This year sales
        </h6>
      </div>

      {/* Chart Start */}
      <div className="p-6">
        <Bar data={chartData} options={chartOptions} width={100} height={300} />
      </div>
    </div>
  );
};

export default YearSell;
