"use client"

import { useState } from "react"

const API_BASE_URL = "http://localhost:5000/api"

function VoucherGenerator({ onVoucherGenerated }) {
  const [discountAmount, setDiscountAmount] = useState("")
  const [category, setCategory] = useState("general")
  const [maxUses, setMaxUses] = useState("1")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
  const [generatedCode, setGeneratedCode] = useState("")

  const handleGenerate = async (e) => {
    e.preventDefault()

    if (!discountAmount || discountAmount <= 0) {
      setMessage("Please enter a valid discount amount")
      setMessageType("error")
      return
    }

    try {
      setLoading(true)
      setMessage("")
      const response = await fetch(`${API_BASE_URL}/vouchers/generate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          discountAmount: Number.parseFloat(discountAmount),
          category: category,
          maxUses: Number.parseInt(maxUses) || 1,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage(`✅ Voucher created: ${data.data.code}`)
        setMessageType("success")
        setGeneratedCode(data.data.code)
        setDiscountAmount("")
        setCategory("general")
        setMaxUses("1")
        onVoucherGenerated()
      } else {
        setMessage(`❌ ${data.message}`)
        setMessageType("error")
      }
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`)
      setMessageType("error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card">
      <h2>Generate Voucher</h2>
      <form onSubmit={handleGenerate}>
        <div className="form-group">
          <label>Discount Amount ($)</label>
          <input
            type="number"
            step="0.01"
            value={discountAmount}
            onChange={(e) => setDiscountAmount(e.target.value)}
            placeholder="e.g., 10.00"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="e.g., general, premium, summer"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label>Max Uses</label>
          <input
            type="number"
            min="1"
            value={maxUses}
            onChange={(e) => setMaxUses(e.target.value)}
            placeholder="1"
            disabled={loading}
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? "Generating..." : "Generate Voucher"}
        </button>
      </form>

      {message && <div className={`message message-${messageType}`}>{message}</div>}

      {generatedCode && (
        <div className="generated-code">
          <p>
            Code: <strong>{generatedCode}</strong>
          </p>
        </div>
      )}
    </div>
  )
}

export default VoucherGenerator
