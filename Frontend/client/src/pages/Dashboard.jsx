import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Nav from '../components/Nav';
import StatCard from '../components/StatCard';
import SpendingChart from '../components/SpendingChart';
import CategoryChart from '../components/CategoryChart';
import Transactions from '../components/Transactions';

const Dashboard = () => {
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !user) {
      navigate('/login');
    }
  }, [user, loading, navigate]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null; // Avoid rendering flash before redirect

  return (
    <>
      <Nav />
      <StatCard />
      <div className="chart">
        <SpendingChart />
        <CategoryChart />
      </div>
      <Transactions />
    </>
  );
};

export default Dashboard;
