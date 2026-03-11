import React, { useEffect, useState } from "react";
import "./CategoryChart.css";
import { fetchExpenses } from "../api";
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
        const expenses = await fetchExpenses();

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

    const handleUpdate = () => {
      console.log("CategoryChart: expense-updated event received, re-fetching...");
      fetchData();
    };

    window.addEventListener("expense-updated", handleUpdate);
    return () => window.removeEventListener("expense-updated", handleUpdate);
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
    <div className="categorydiv">
      {chartData ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default CategoryChart;

