import React from 'react'
import "./index.css"
import Nav from './components/Nav'
import StatCard from './components/StatCard'
import SpendingChart from './components/SpendingChart'
import CategoryChart from './components/CategoryChart'
import Transactions from './components/Transactions'
import Model from './components/Model'

function App() {
  return (
    <>
      <Nav/>
      <StatCard/>
      <div className="chart">
      <SpendingChart/>
      <CategoryChart/>
      </div>
      <Transactions/>
      {/* <Model/> */}
      
    </>
  )
}

export default App



