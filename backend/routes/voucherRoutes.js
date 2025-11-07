const express = require("express")
const voucherController = require("../controllers/voucherController")

const router = express.Router()

// POST /api/vouchers/generate - Generate a new voucher
router.post("/generate", voucherController.generateVoucher)

// POST /api/vouchers/redeem - Redeem a voucher
router.post("/redeem", voucherController.redeemVoucher)

// GET /api/vouchers/:code - Get voucher by code
router.get("/:code", voucherController.getVoucherByCode)

// GET /api/vouchers/category/:category - Get vouchers by category
router.get("/category/:category", voucherController.getVouchersByCategory)

// GET /api/vouchers - Get all vouchers
router.get("/", voucherController.getAllVouchers)

// GET /api/vouchers/stats/overview - Get voucher statistics
router.get("/stats/overview", voucherController.getStats)

// DELETE /api/vouchers/reset - Reset all vouchers
router.delete("/reset", voucherController.resetVouchers)

module.exports = router
