

import React, { useState, useEffect, useCallback } from 'react'
import "./Transactions.css"
import { toast } from 'react-toastify';
import UpdateModel from './UpdateModel'
import { fetchExpenses, deleteExpense as deleteExpenseApi } from '../api'

function Transactions() {

  const [data, setData] = useState([])
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  

  // 🔁 stable fetch function
  const fetchData = useCallback(async () => {
    try {
      const expenses = await fetchExpenses();
      setData(expenses || []);
    } catch (error) {
      console.log({ errmsg: error });
    }
  }, []);

  // 🔔 notify StatCard
  const notifyStatUpdate = () => {
    window.dispatchEvent(new Event("expense-updated"));
  };

  useEffect(() => {
    fetchData();

    // 👂 LISTEN FOR ADD / UPDATE / DELETE
    window.addEventListener("expense-updated", fetchData);

    return () => {
      window.removeEventListener("expense-updated", fetchData);
    };
  }, [fetchData]);

  const deleteExpense = async (id) => {
    try {
      console.log("Transactions: deleteExpense() started for ID:", id);
      console.log("Transactions: Showing confirm dialog...");
      const isConfirmed = window.confirm("Are you sure you want to delete this expense?");
      console.log("Transactions: Confirm result:", isConfirmed);

      if (!isConfirmed) {
        console.log("Transactions: Delete cancelled by user.");
        return;
      }

      console.log("Transactions: Calling deleteExpenseApi...");
      const res = await deleteExpenseApi(id);
      console.log("Transactions: deleteExpenseApi resolved:", res);

      setData(prev => prev.filter(item => item._id !== id));
      console.log("Transactions: State updated. Dispatching event...");

      notifyStatUpdate(); 
      toast.success("Expense deleted successfully");
    } catch (error) {
      console.error("Transactions: Delete operation failed:", error);
      toast.error(error.response?.data?.message || "Failed to delete expense");
    }
  };

  const totalExp = data.reduce(
    (sum, exp) => sum + Number(exp.amount || 0),
    0
  );

  



  return (
    <div className="transbox">

      <div className="transactions">
        <div>
          <h3>Transactions</h3>
          <p>Total</p>
        </div>
        <div className="pricediv">
          <span className="pricespan">${totalExp}</span>
        </div>
      </div>

      <div className="searchnav">
       <input
  type="text"
  placeholder="Search Transactions..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
/>
        <select onChange={(e) => setCategory(e.target.value)}>
  <option value="">All</option>
  <option value="Food">Food</option>
  <option value="Shopping">Shopping</option>
  <option value="Bills">Bills</option>
  <option value="Transportation">Transportation</option>
  <option value="Healthcare">Healthcare</option>
  <option value="Entertainment">Entertainment</option>
  <option value="other">other</option>
</select>
      </div>

      {data.map(item => (
        <div className="list" key={item._id}>
          <div>
            <h4>{item.description}</h4>
            <span className='catspan' >{item.category}</span> · <span>{item.date.slice(0, 10)}</span>
          </div>

          <div>
            <span>${item.amount}</span>

      
            <button onClick={() => deleteExpense(item._id)}>
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Transactions;


