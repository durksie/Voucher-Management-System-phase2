function VoucherList({ vouchers, loading }) {
  return (
    <div className="card voucher-list">
      <h2>All Vouchers ({vouchers.length})</h2>
      {loading ? (
        <p className="loading">Loading...</p>
      ) : vouchers.length === 0 ? (
        <p className="empty">No vouchers yet. Generate one to get started!</p>
      ) : (
        <div className="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Category</th>
                <th>Discount</th>
                <th>Max Uses</th>
                <th>Used</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {vouchers.map((voucher) => (
                <tr key={voucher.id} className={voucher.isRedeemed ? "redeemed" : ""}>
                  <td className="code">{voucher.code}</td>
                  <td className="category-cell">{voucher.category}</td>
                  <td>${voucher.discountAmount}</td>
                  <td>{voucher.maxUses}</td>
                  <td>{voucher.usedCount}</td>
                  <td>
                    <span className={`badge ${voucher.isRedeemed ? "badge-redeemed" : "badge-active"}`}>
                      {voucher.isRedeemed ? "✅ Redeemed" : "⏳ Active"}
                    </span>
                  </td>
                  <td>{new Date(voucher.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default VoucherList
