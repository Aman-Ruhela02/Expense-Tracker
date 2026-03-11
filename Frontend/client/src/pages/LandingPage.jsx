import React from 'react';
import { Link } from 'react-router-dom';
import '../index.css';

const LandingPage = () => {
  return (
    <div className="landing-container">
      <nav className="landing-nav">
        <h1>Expense Tracker</h1>
        <div className="landing-links">
          <Link to="/login" className="btn-login">Login</Link>
          <Link to="/signup" className="btn-signup">Sign Up</Link>
        </div>
      </nav>
      
      <header className="landing-hero">
        <div className="hero-content">
          <h2 className="hero-title">Take Control of Your Finances</h2>
          <p className="hero-subtitle">
            Track, Analyze, and Optimize your expenses beautifully. 
            Mange your money smartly today.
          </p>
          <Link to="/signup" className="hero-cta">Get Started for Free</Link>
        </div>
      </header>

      {/* Decorative background elements */}
      <div className="bg-shape shape-1"></div>
      <div className="bg-shape shape-2"></div>
    </div>
  );
};

export default LandingPage;
