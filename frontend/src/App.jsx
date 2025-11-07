"use client"

import { useState, useEffect } from "react"
import "./App.css"
import VoucherGenerator from "./components/VoucherGenerator"
import VoucherRedeemer from "./components/VoucherRedeemer"
import VoucherStats from "./components/VoucherStats"
import VoucherList from "./components/VoucherList"

const API_BASE_URL = "http://localhost:5000/api"

function App() {
  const [vouchers, setVouchers] = useState([])
  const [stats, setStats] = useState({ total: 0, redeemed: 0, unredeemed: 0 })
  const [loading, setLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [categories, setCategories] = useState([])

  // Fetch all vouchers
  const fetchVouchers = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${API_BASE_URL}/vouchers`)
      const data = await response.json()
      if (data.success) {
        setVouchers(data.data)
        const uniqueCategories = [...new Set(data.data.map((v) => v.category))]
        setCategories(uniqueCategories)
      }
    } catch (error) {
      console.error("Error fetching vouchers:", error)
    } finally {
      setLoading(false)
    }
  }

  // Fetch stats
  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/vouchers/stats/overview`)
      const data = await response.json()
      if (data.success) {
        setStats(data.data)
      }
    } catch (error) {
      console.error("Error fetching stats:", error)
    }
  }

  // Refresh data
  const refreshData = async () => {
    await fetchVouchers()
    await fetchStats()
  }

  useEffect(() => {
    refreshData()
    const interval = setInterval(refreshData, 2000)
    return () => clearInterval(interval)
  }, [])

  const filteredVouchers =
    selectedCategory === "all" ? vouchers : vouchers.filter((v) => v.category === selectedCategory)

  return (
    <div className="app">
      <header className="app-header">
        <h1>Voucher Management System</h1>
        <p>Generate, redeem, and track your vouchers</p>
      </header>

      <main className="app-main">
        <VoucherStats stats={stats} />

        <div className="app-grid">
          <VoucherGenerator onVoucherGenerated={refreshData} />
          <VoucherRedeemer onVoucherRedeemed={refreshData} />
        </div>

        <div className="category-filter">
          <h3>Filter by Category</h3>
          <div className="category-buttons">
            <button
              className={`category-btn ${selectedCategory === "all" ? "active" : ""}`}
              onClick={() => setSelectedCategory("all")}
            >
              All ({vouchers.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-btn ${selectedCategory === cat ? "active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat} ({vouchers.filter((v) => v.category === cat).length})
              </button>
            ))}
          </div>
        </div>

        <VoucherList vouchers={filteredVouchers} loading={loading} />
      </main>
    </div>
  )
}

export default App
