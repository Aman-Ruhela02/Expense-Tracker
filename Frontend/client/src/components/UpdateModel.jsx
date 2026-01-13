import React, { useEffect } from 'react'
import "./Model.css"
import { useState } from 'react'
import axios from 'axios'

function UpdateModel() {

    const [description, setDescription] = useState("")
    const [amount , setAmount] = useState("")
    const [date,setDate] = useState("")
    const [textarea, setTextarea] = useState("")
   
    const [data,setData] = useState([])
    
    // const [category,setCategory] = useState("")
    



 useEffect(() => {
//   if (!id) return; // prevent bad request

  const fetchData = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v2/expense/${id}`
      );
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  fetchData();
}, []);

    const handleUpdateExpense = async()=>{
        
    }
    return (
        <>
            <div className="modelbox">
                <div className="box">
                    <div className="modelnav">
                        <div>
                            <h3>Update Expense</h3>
                            <p>Track your spending</p>
                        </div>
                        <div>
                            <button className='closebutton'  > X </button>
                           

                        </div>
                    </div>

                    <div className="input">
                    <label htmlFor="">What did you Buy?</label>
                    <input type="text" value={description} onChange={(e)=>setDescription(e.target.value)} placeholder='What did you buy....?' />
                    </div>

                    <div className="amount">
                        <div className="price">
                            <label htmlFor="">Amount</label>
                            <input type="text" value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder='$0.00' />
                        </div>
                        <div className="date">
                            <label htmlFor="">Date</label>
                            <input type="date" value={date} onChange={(e)=>setDate(e.target.value)} />
                        </div>
                    </div>
                   <div className="category">
                    <label htmlFor="">Category</label>
                    {/* <button >category</button>
                    <button>category</button> */}
                    category <br />
                    category
                    
                    </div> 
                    <textarea name="" id="" placeholder='Add notes' value={textarea} onChange={(e)=>setTextarea(e.target.value)} ></textarea>
                    <div className="submitdiv">
                        <div>
                      <button className='addbutton' onClick={handleUpdateExpense}>Update Expense</button>
                        </div>
                        <div>
                          <button>Cancel</button>
                        </div>
                    </div>

                </div>

            </div>
        </>
    )
}

export default UpdateModel




// import React, { useEffect, useState } from "react";
// import "./Model.css";
// import axios from "axios";

// function UpdateModel({ id, onClose, onUpdated }) {

//   const [description, setDescription] = useState("");
//   const [amount, setAmount] = useState("");
//   const [date, setDate] = useState("");
//   const [textarea, setTextarea] = useState("");

//   useEffect(() => {
//     if (!id) return;

//     const fetchData = async () => {
//       try {
//         const res = await axios.put(
//           `http://localhost:3000/api/v2/expense/${id}`
//         );

//         setDescription(res.data.description);
//         setAmount(res.data.amount);
//         setDate(res.data.date?.slice(0, 10));
//         setTextarea(res.data.notes || "");
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchData();
//   }, [id]);

//   const handleUpdateExpense = async () => {
//     try {
//       await axios.put(`http://localhost:3000/api/v2/expense/${id}`, {
//         description,
//         amount,
//         date,
//         notes: textarea,
//       });
      
//       onUpdated()
//       onClose(); // close modal after update
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div className="modelbox">
//       <div className="box">

//         <div className="modelnav">
//           <div>
//             <h3>Update Expense</h3>
//             <p>Track your spending</p>
//           </div>
//           <button className="closebutton" onClick={onClose}>X</button>
//         </div>

//         <div className="input">
//           <label>What did you Buy?</label>
//           <input
//             type="text"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//         </div>

//         <div className="amount">
//           <div className="price">
//             <label>Amount</label>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//             />
//           </div>

//           <div className="date">
//             <label>Date</label>
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//             />
//           </div>
//         </div>

//         <textarea
//           placeholder="Add notes"
//           value={textarea}
//           onChange={(e) => setTextarea(e.target.value)}
//         />

//         <div className="submitdiv">
//           <button className="addbutton" onClick={handleUpdateExpense}>
//             Update Expense
//           </button>
//           <button onClick={onClose}>Cancel</button>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default UpdateModel;
