

import React, { useState, useEffect, useCallback } from 'react'
import "./Transactions.css"
import axios from 'axios'
import UpdateModel from './UpdateModel'

function Transactions() {

  const [data, setData] = useState([])
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  

  // 🔁 stable fetch function
  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/v2/expense/");
      setData(res.data.data || []);
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
      if (!window.confirm("Delete this expense?")) return;

      await axios.delete(`http://localhost:3000/api/v2/expense/${id}`);

      // optional optimistic update
      setData(prev => prev.filter(item => item._id !== id));

      notifyStatUpdate(); // 🔥 update StatCard
    } catch (error) {
      console.log({ errmsg: error });
    }
  };

  const totalExp = data.reduce(
    (sum, exp) => sum + exp.amount,
    0
  );

// const filteredData = data.filter((item) =>
//   item.description.toLowerCase().includes(search.toLowerCase()) ||
//   item.category.toLowerCase().includes(search.toLowerCase())
// );



// const filteredData = data.filter(item => {
//   const matchSearch =
//     item.description.toLowerCase().includes(search.toLowerCase()) ||
//     item.category.toLowerCase().includes(search.toLowerCase());

//   const matchCategory =
//     category === "" || item.category === category;

//   return matchSearch && matchCategory;
// });



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


