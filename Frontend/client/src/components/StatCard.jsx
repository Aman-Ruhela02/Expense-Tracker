

import axios from 'axios'
import React, { useState, useEffect, useCallback } from 'react'
import "./StatCard.css"
import { CiWallet } from "react-icons/ci";
import { CgDollar } from "react-icons/cg";
import { IoMdCart } from "react-icons/io";
import { BsGraphUpArrow } from "react-icons/bs";

function StatCard() {

  const [totalExp, setTotalExp] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [avgExpense, setAvgExpense] = useState(0);
  const [totalNo, setTotalNo] = useState(0);

  // 🔁 stable function
  const fetchAmount = useCallback(async () => {
    try {
      const res = await axios.get("https://expense-tracker-backend-0sjt.onrender.com");
      const expense = res.data.data || [];

      const total = expense.reduce((sum, exp) => sum + exp.amount, 0);
      const highest = expense.reduce(
        (max, exp) => (exp.amount > max ? exp.amount : max),
        0
      );

      const count = expense.length;
      const average = count > 0 ? (total / count).toFixed(2) : 0;

      setTotalExp(total);
      setMaxAmount(highest);
      setTotalNo(count);
      setAvgExpense(average);

    } catch (error) {
      console.log({ errmsg: error });
    }
  }, []);

  useEffect(() => {
    fetchAmount();

    window.addEventListener("expense-updated", fetchAmount);

    return () => {
      window.removeEventListener("expense-updated", fetchAmount);
    };
  }, [fetchAmount]);

  return (
    <div className="statbox">

      <div className="stat">
        <div className="logo">
          <CiWallet size={30} />
        </div>
        <h3>${totalExp}</h3>
        <p>Total spent</p>
        <p>this month</p>
      </div>

      <div
        className="stat"
        style={{ background: "linear-gradient(320deg ,rgb(162, 137, 241), rgba(224, 53, 178, 1))" }}
      >
        <div className="logo">
          <IoMdCart size={30} />
        </div>
        <h3>{totalNo}</h3>
        <p>Expenses</p>
        <p>{totalNo} Transactions</p>
      </div>

      <div
        className="stat"
        style={{ background: "linear-gradient(320deg ,rgba(201, 241, 244, 1), rgba(11, 71, 71, 1))" }}
      >
        <div className="logo">
          <BsGraphUpArrow size={30} />
        </div>
        <h3>${avgExpense}</h3>
        <p>Average</p>
        <p>Per expense</p>
      </div>

      <div
        className="stat"
        style={{ background: "linear-gradient(320deg ,rgba(236, 166, 109, 1), rgba(250, 58, 4, 1))" }}
      >
        <div className="logo">
          <CgDollar size={30} />
        </div>
        <h3>${maxAmount}</h3>
        <p>Highest</p>
        <p>Single expense</p>
      </div>

    </div>
  );
}

export default StatCard;
