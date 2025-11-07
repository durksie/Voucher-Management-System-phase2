const pool = require("../config/database")

class Voucher {
  static async generate(discountAmount, category = "general", maxUses = 1) {
    const code = this.generateCode()
    const createdAt = new Date()

    const query = `
      INSERT INTO vouchers (code, discount_amount, category, max_uses, created_at)
      VALUES (?, ?, ?, ?, ?)
    `

    try {
      const [result] = await pool.execute(query, [code, discountAmount, category, maxUses, createdAt])
      return {
        id: result.insertId,
        code,
        discountAmount,
        category,
        maxUses,
        usedCount: 0,
        isRedeemed: false,
        createdAt,
        redeemedAt: null,
      }
    } catch (error) {
      throw error
    }
  }

  static generateCode() {
    return "VOUCHER-" + Math.random().toString(36).substring(2, 11).toUpperCase()
  }

  static async findByCode(code) {
    const query = `SELECT * FROM vouchers WHERE code = ?`
    try {
      const [rows] = await pool.execute(query, [code])
      return rows.length > 0 ? this.mapDatabaseRow(rows[0]) : null
    } catch (error) {
      throw error
    }
  }

  static async getByCategory(category) {
    let query = `SELECT * FROM vouchers`
    const params = []

    if (category) {
      query += ` WHERE category = ?`
      params.push(category)
    }

    query += ` ORDER BY created_at DESC`

    try {
      const [rows] = await pool.execute(query, params)
      return rows ? rows.map((row) => this.mapDatabaseRow(row)) : []
    } catch (error) {
      throw error
    }
  }

  static async redeem(code) {
    try {
      const voucher = await this.findByCode(code)

      if (!voucher) {
        throw new Error("Voucher not found")
      }
      if (voucher.isRedeemed) {
        throw new Error("Voucher already redeemed")
      }
      if (voucher.usedCount >= voucher.maxUses) {
        throw new Error("Voucher usage limit exceeded")
      }

      const newUsedCount = voucher.usedCount + 1
      const isRedeemed = newUsedCount >= voucher.maxUses
      const redeemedAt = isRedeemed ? new Date() : null

      const query = `
        UPDATE vouchers 
        SET used_count = ?, is_redeemed = ?, redeemed_at = ?
        WHERE code = ?
      `

      await pool.execute(query, [newUsedCount, isRedeemed ? 1 : 0, redeemedAt, code])

      voucher.usedCount = newUsedCount
      voucher.isRedeemed = isRedeemed
      voucher.redeemedAt = redeemedAt
      return voucher
    } catch (error) {
      throw error
    }
  }

  static async getAll() {
    const query = `SELECT * FROM vouchers ORDER BY created_at DESC`
    try {
      const [rows] = await pool.execute(query)
      return rows ? rows.map((row) => this.mapDatabaseRow(row)) : []
    } catch (error) {
      throw error
    }
  }

  static async getStats() {
    const query = `
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN is_redeemed = 1 THEN 1 ELSE 0 END) as redeemed,
        SUM(CASE WHEN is_redeemed = 0 THEN 1 ELSE 0 END) as unredeemed
      FROM vouchers
    `

    try {
      const [rows] = await pool.execute(query)
      const row = rows[0]
      return {
        total: row.total || 0,
        redeemed: row.redeemed || 0,
        unredeemed: row.unredeemed || 0,
      }
    } catch (error) {
      throw error
    }
  }

  static mapDatabaseRow(row) {
    if (!row) return null
    return {
      id: row.id,
      code: row.code,
      discountAmount: row.discount_amount,
      category: row.category,
      maxUses: row.max_uses,
      usedCount: row.used_count,
      isRedeemed: Boolean(row.is_redeemed),
      createdAt: row.created_at,
      redeemedAt: row.redeemed_at,
    }
  }

  static async reset() {
    const query = `DELETE FROM vouchers`
    try {
      await pool.execute(query)
    } catch (error) {
      throw error
    }
  }
}

module.exports = Voucher
