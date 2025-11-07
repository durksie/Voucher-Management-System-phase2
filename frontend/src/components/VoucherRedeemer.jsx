"use client"

import { useState } from "react"

const API_BASE_URL = "http://localhost:5000/api"

function VoucherRedeemer({ onVoucherRedeemed }) {
  const [code, setCode] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [messageType, setMessageType] = useState("")
  const [redeemDetails, setRedeemDetails] = useState(null)

  const handleRedeem = async (e) => {
    e.preventDefault()

    if (!code.trim()) {
      setMessage("Please enter a voucher code")
      setMessageType("error")
      return
    }

    try {
      setLoading(true)
      setMessage("")
      setRedeemDetails(null)

      const response = await fetch(`${API_BASE_URL}/vouchers/redeem`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: code.trim() }),
      })

      const data = await response.json()

      if (data.success) {
        setMessage(`✅ Voucher redeemed successfully!`)
        setMessageType("success")
        setRedeemDetails(data.data)
        setCode("")
        onVoucherRedeemed()
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
      <h2>Redeem Voucher</h2>
      <form onSubmit={handleRedeem}>
        <div className="form-group">
          <label>Voucher Code</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="e.g., VOUCHER-ABC123"
            disabled={loading}
            style={{ textTransform: "uppercase" }}
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-success">
          {loading ? "Redeeming..." : "Redeem Voucher"}
        </button>
      </form>

      {message && <div className={`message message-${messageType}`}>{message}</div>}

      {redeemDetails && (
        <div className="redeem-details">
          <p>
            <strong>Code:</strong> {redeemDetails.code}
          </p>
          <p>
            <strong>Category:</strong> {redeemDetails.category}
          </p>
          <p>
            <strong>Discount:</strong> ${redeemDetails.discountAmount}
          </p>
          <p>
            <strong>Used:</strong> {redeemDetails.usedCount} / {redeemDetails.maxUses}
          </p>
          <p>
            <strong>Status:</strong> {redeemDetails.isRedeemed ? "✅ Redeemed" : "⏳ Active"}
          </p>
        </div>
      )}
    </div>
  )
}

export default VoucherRedeemer
