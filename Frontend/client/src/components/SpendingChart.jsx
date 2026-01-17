

import "./SpendingChart.css"
import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale
);

function SpendingChart() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
<<<<<<< HEAD
        const res = await axios.get("https://expensetracker-mmel.onrender.com/api/v2/expense/");
=======
        const res = await axios.get("https://expense-tracker-backend-0sjt.onrender.com");
>>>>>>> 1daa06d63af31a111690e2f3550d39b33424a097
        setExpenses(Array.isArray(res.data.data) ? res.data.data : []);
      } catch (error) {
        console.log(error);
        setExpenses([]);
      }
    };
    fetchData();
  }, []);

  // last 7 days
  const dates = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().slice(0, 10);
  });

  const normalizeDate = d =>
    new Date(d).toISOString().slice(0, 10);

  const values = dates.map(date => {
    const dayExpenses = expenses.filter(
      e => normalizeDate(e.date) === date
    );

    return dayExpenses.reduce(
      (sum, e) => sum + Number(e.amount || 0),
      0
    );
  });

  const labels = dates.map(d =>
    new Date(d).toLocaleDateString("en-IN", { weekday: "short" })
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Expense (₹)",
        data: values,
        borderColor: "#4f46e5",
        backgroundColor: "rgba(79,70,229,0.3)",
        borderWidth: 3,
        tension: 0.3,
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax:
          Math.max(...values) > 0
            ? Math.max(...values) + 300
            : 100,
        ticks: {
          callback: v => `₹${v}`
        }
      }
    }
  };

  return (
    <>
     
    <div className="spendingdiv">
       <p>Last 7 days Expenses</p>
      <Line data={data} options={options} />
    </div>
    
    </>
  );
}

export default SpendingChart;


