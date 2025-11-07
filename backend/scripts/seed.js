const pool = require("../config/database")

const dummyVouchers = [
  { code: "WELCOME10", discountAmount: 10, category: "welcome", maxUses: 1 },
  { code: "SUMMER20", discountAmount: 20, category: "seasonal", maxUses: 2 },
  { code: "LOYALTY15", discountAmount: 15, category: "loyalty", maxUses: 3 },
  { code: "PROMO25", discountAmount: 25, category: "promotion", maxUses: 1 },
  { code: "FRIEND30", discountAmount: 30, category: "referral", maxUses: 5 },
]

async function seedDatabase() {
  try {
    console.log("Seeding database with dummy vouchers...")

    const query = `
      INSERT IGNORE INTO vouchers (code, discount_amount, category, max_uses, created_at)
      VALUES (?, ?, ?, ?, ?)
    `

    for (const voucher of dummyVouchers) {
      await pool.execute(query, [voucher.code, voucher.discountAmount, voucher.category, voucher.maxUses, new Date()])
    }

    console.log("Database seeded successfully!")
    process.exit(0)
  } catch (error) {
    console.error("Error seeding database:", error)
    process.exit(1)
  }
}

seedDatabase()
