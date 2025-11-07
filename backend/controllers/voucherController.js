const Voucher = require("../models/Voucher")

const voucherController = {
  generateVoucher: async (req, res, next) => {
    try {
      const { discountAmount, category = "general", maxUses = 1 } = req.body

      if (!discountAmount) {
        return res.status(400).json({
          success: false,
          message: "Discount amount is required",
        })
      }

      if (discountAmount <= 0) {
        return res.status(400).json({
          success: false,
          message: "Discount amount must be greater than 0",
        })
      }

      const voucher = await Voucher.generate(discountAmount, category, maxUses)

      res.status(201).json({
        success: true,
        message: "Voucher generated successfully",
        data: voucher,
      })
    } catch (error) {
      next(error)
    }
  },

  redeemVoucher: async (req, res, next) => {
    try {
      const { code } = req.body

      if (!code) {
        return res.status(400).json({
          success: false,
          message: "Voucher code is required",
        })
      }

      const voucher = await Voucher.redeem(code)

      res.json({
        success: true,
        message: "Voucher redeemed successfully",
        data: voucher,
      })
    } catch (error) {
      if (error.message.includes("not found")) {
        return res.status(404).json({
          success: false,
          message: error.message,
        })
      }
      next(error)
    }
  },

  getAllVouchers: async (req, res, next) => {
    try {
      const vouchers = await Voucher.getAll()
      res.json({
        success: true,
        data: vouchers,
      })
    } catch (error) {
      next(error)
    }
  },

  getVoucherByCode: async (req, res, next) => {
    try {
      const { code } = req.params

      if (!code) {
        return res.status(400).json({
          success: false,
          message: "Voucher code is required",
        })
      }

      const voucher = await Voucher.findByCode(code)

      if (!voucher) {
        return res.status(404).json({
          success: false,
          message: "Voucher not found",
        })
      }

      res.json({
        success: true,
        data: voucher,
      })
    } catch (error) {
      next(error)
    }
  },

  getStats: async (req, res, next) => {
    try {
      const stats = await Voucher.getStats()
      res.json({
        success: true,
        data: stats,
      })
    } catch (error) {
      next(error)
    }
  },

  resetVouchers: async (req, res, next) => {
    try {
      await Voucher.reset()
      res.json({
        success: true,
        message: "All vouchers have been reset",
      })
    } catch (error) {
      next(error)
    }
  },

  getVouchersByCategory: async (req, res, next) => {
    try {
      const { category } = req.params
      const vouchers = await Voucher.getByCategory(category)

      res.json({
        success: true,
        data: vouchers,
      })
    } catch (error) {
      next(error)
    }
  },
}

module.exports = voucherController
