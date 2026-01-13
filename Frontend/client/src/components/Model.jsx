
import React, { useState } from 'react'
import "./Model.css"
import { ToastContainer, toast } from 'react-toastify';

function Model({ onClose }) {

  const [description, setDescription] = useState("")
  const [amount, setAmount] = useState("")
  const [date, setDate] = useState("")
  const [textarea, setTextarea] = useState("")
  const [error, setError] = useState(false)
  const [category,setCategory] = useState("");
  const [ActiveCategory, setActiveCategory] = useState("");
  const handleAddExpense = async () => {

    if (!description || !amount || !date  ) {
      alert("Required fields are not Empty")
      setError(true)
      return;
    }

    let res = await fetch("https://expense-tracker-backend-0sjt.onrender.com", {
      method: 'POST',
      body: JSON.stringify({ description, amount, date, textarea, category }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    console.log(data);

     toast("Expense Added Successfully");

    // 🔥 RESET FORM
    setAmount("")
    setDescription("")
    setTextarea("")
    setDate("")
    setActiveCategory("")

    // 🔔 NOTIFY EVERYWHERE
    window.dispatchEvent(new Event("expense-updated"));
    
  };

  return (
    <div className="modelbox">
      <div className="box">

        <div className="modelnav">
          <div>
            <h3>Add Expense</h3>
            <p>Track your spending</p>
          </div>
          <button className='closebutton' onClick={onClose}>X</button>
        </div>

        <div className="input">
          <label>What did you Buy?</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder='What did you buy...?'
          />
        </div>

        <div className="amount">
          <div className="price">
            <label>Amount</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder='$0.00'
            />
          </div>
          <div className="date">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

       

     <label htmlFor="">Category</label>
    <div className="categories">
    {["Food", "Shopping", "Transportation","Healthcare", "Bills","Entertainment","other"].map((category) => (
    <button
      key={category}
      className={`category-btn ${ActiveCategory === category ? "active" : ""}`}
      onClick={() => setCategory(category)}
      
    >
      {category}
    </button>
  ))}
</div>

       <label htmlFor="">Notes (Optional)</label>
        <textarea
          placeholder='Add notes'
          value={textarea}
          onChange={(e) => setTextarea(e.target.value)}
        />

        <div className="submitdiv">
          <button className='addbutton' onClick={handleAddExpense}>
            Add Expense
          </button>
          <button className='cancelbtn' onClick={onClose}>Cancel</button>
        </div>

        <ToastContainer />

      </div>
    </div>
  );
}

export default Model;
