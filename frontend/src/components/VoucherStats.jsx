function VoucherStats({ stats }) {
  return (
    <div className="stats-container">
      <div className="stat-card">
        <h3>Total Vouchers</h3>
        <p className="stat-number">{stats.total}</p>
      </div>
      <div className="stat-card stat-active">
        <h3>Unredeemed</h3>
        <p className="stat-number">{stats.unredeemed}</p>
      </div>
      <div className="stat-card stat-redeemed">
        <h3>Redeemed</h3>
        <p className="stat-number">{stats.redeemed}</p>
      </div>
    </div>
  )
}

export default VoucherStats
