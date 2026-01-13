import React from 'react'
import "./Nav.css"
import  Model  from './Model'
import { useState } from 'react'


function Nav() {
// const [show, setShow] = useState(false)
const [showModal, setShowModal] = useState(false);

  return (
    <>
    <div className="nav">
        <div className="logo">
        <h2>Expense Tracker</h2>
        <p>Manage your finances with ease</p>
      </div>

      <div className="navaddbutton">
         {/* <button onClick={()=>setShow(!show)} > {show? "Hide chart":"+ Add Expense"} </button>
         {show && <Model/> } */}
         
         <button onClick={() => setShowModal(true)}>Add Expense</button>

      {showModal && (
        <Model onClose={() => setShowModal(false)} />
      )}
      </div>
    </div>
      
    </>
  )
}

export default Nav
