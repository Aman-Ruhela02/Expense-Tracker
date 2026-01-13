

import React, { useEffect, useState } from "react";
import "./CategoryChart.css";
import axios from "axios";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function CategoryChart() {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "https://expense-tracker-backend-0sjt.onrender.com"
        );

        const expenses = Array.isArray(res.data.data)
          ? res.data.data
          : [];

        // 🔹 Group expenses by category
        const categoryTotals = {};

        expenses.forEach((item) => {
          const category = item.category || "Other";
          const amount = Number(item.amount) || 0;

          categoryTotals[category] =
            (categoryTotals[category] || 0) + amount;
        });

        // 🔹 Convert to Chart.js format
        const labels = Object.keys(categoryTotals);
        const data = Object.values(categoryTotals);

        setChartData({
          labels,
          datasets: [
            {
              data,
              backgroundColor: [
                "#4f46e5",
                "#22c55e",
                "#f97316",
                "#ef4444",
                "#06b6d4",
                "#a855f7",
              ],
              borderWidth: 0,
              cutout: "70%",
            },
          ],
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div
      style={{
        width: "300px",
        height: "300px",
        boxShadow: "2px 2px 10px 1px gray",
        borderRadius: "5px",
        marginRight: "3rem",
        padding: "1rem",
      }}
    >
      {chartData ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CategoryChart;

