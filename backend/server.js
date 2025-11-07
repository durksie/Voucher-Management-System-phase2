const express = require("express")
const cors = require("cors")
const voucherRoutes = require("./routes/voucherRoutes")
const errorHandler = require("./middleware/errorHandler")
const logger = require("./middleware/logger")

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())
app.use(logger)

// Routes
app.use("/api/vouchers", voucherRoutes)

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Backend is running!" })
})

// Error handling
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})
