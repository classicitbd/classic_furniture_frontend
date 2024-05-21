"use client";

import { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";

const MonthSell = ({ thisMonthSellData }) => {
  const [chartData, setChartData] = useState({
    labels: Array.from({ length: 31 }, (_, i) => i + 1),
    datasets: [
      {
        label: "Total Order Count",
        data: Array(31).fill(0),
        backgroundColor: "#F27F21",
        borderRadius: 8,
        barThickness: 16,
        hoverBackgroundColor: "#3BB77E",
      },
      {
        label: "Total Sell Count",
        data: Array(31).fill(0),
        backgroundColor: "#FEB60D",
        borderRadius: 8,
        barThickness: 16,
        hoverBackgroundColor: "#9771FF",
      },
    ],
  });

  useEffect(() => {
    if (thisMonthSellData && thisMonthSellData.length > 0) {
      const dailyOrderCountData = Array(31).fill(0);
      const dailySellCountData = Array(31).fill(0);

      thisMonthSellData.forEach((order) => {
        const orderDay = new Date(order.createdAt).getDate();
        dailyOrderCountData[orderDay - 1] += order?.order_products?.length;
        dailySellCountData[orderDay - 1]++;
      });

      setChartData((prevChartData) => ({
        ...prevChartData,
        datasets: [
            { ...prevChartData.datasets[1], data: dailySellCountData },
          { ...prevChartData.datasets[0], data: dailyOrderCountData },
        ],
      }));
    }
  }, [thisMonthSellData]);

  return (
    <div>
      <div className="ml-6 mt-6">
        <h6 className="text-[18px] md:text-[26px] font-semibold">
          This month sales
        </h6>
      </div>

      <div className="p-6">
        <Bar data={chartData} width={300} height={100} />
      </div>
    </div>
  );
};

export default MonthSell;
