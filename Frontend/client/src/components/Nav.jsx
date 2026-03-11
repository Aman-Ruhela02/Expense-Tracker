import React, { useState, useContext } from 'react'
import "./Nav.css"
import Model from './Model'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Nav() {
  const [showModal, setShowModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
    <div className="nav">
        <div className="logo">
        <h2>Expense Tracker</h2>
        <p>Manage your finances with ease</p>
      </div>

      <button className="mobile-menu-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
        {isMobileMenuOpen ? '✕' : '☰'}
      </button>

      <div className={`navaddbutton ${isMobileMenuOpen ? 'active' : ''}`}>
         {user && <span className="user-greeting">Hi, {user.name}</span>}
         <button onClick={() => { setShowModal(true); setIsMobileMenuOpen(false); }}>Add Expense</button>
         <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="btn-logout">Logout</button>

      {showModal && (
        <Model onClose={() => setShowModal(false)} />
      )}
      </div>
    </div>
      
    </>
  )
}

export default Nav
