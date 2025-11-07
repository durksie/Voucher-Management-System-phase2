export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">Voucher Generation System</h1>

        <div className="bg-slate-700 rounded-lg p-8 mb-8">
          <p className="text-lg mb-4">This is a monorepo project with separate backend and frontend applications.</p>
          <p className="text-slate-300">
            To run this project, you need to start both applications in separate terminals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Backend API</h2>
            <p className="mb-4">Node.js/Express server running on port 5000</p>
            <div className="bg-slate-900 rounded p-4 text-sm font-mono mb-4">
              <p>cd backend</p>
              <p>npm install</p>
              <p>npm run dev</p>
            </div>
            <p className="text-blue-200 text-sm">API runs at http://localhost:5000</p>
          </div>

          <div className="bg-green-900 rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Frontend UI</h2>
            <p className="mb-4">React application running on port 3000</p>
            <div className="bg-slate-900 rounded p-4 text-sm font-mono mb-4">
              <p>cd frontend</p>
              <p>npm install</p>
              <p>npm start</p>
            </div>
            <p className="text-green-200 text-sm">App runs at http://localhost:3000</p>
          </div>
        </div>

        <div className="mt-8 bg-slate-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Project Structure</h2>
          <pre className="text-sm bg-slate-900 rounded p-4 overflow-auto">
            {`voucher-generation/
├── backend/
│   ├── server.js
│   ├── package.json
│   ├── models/
│   │   └── Voucher.js
│   ├── controllers/
│   │   └── voucherController.js
│   ├── routes/
│   │   └── voucherRoutes.js
│   └── middleware/
│       ├── logger.js
│       └── errorHandler.js
│
├── frontend/
│   ├── package.json
│   ├── public/
│   │   └── index.html
│   └── src/
│       ├── App.jsx
│       └── components/
│           ├── VoucherGenerator.jsx
│           ├── VoucherRedeemer.jsx
│           ├── VoucherStats.jsx
│           └── VoucherList.jsx
│
└── README.md`}
          </pre>
        </div>

        <div className="mt-8 bg-slate-700 rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4">API Endpoints</h2>
          <div className="space-y-2 text-sm">
            <p>
              <span className="text-green-400">POST</span> /api/vouchers/generate - Generate new voucher
            </p>
            <p>
              <span className="text-blue-400">POST</span> /api/vouchers/redeem - Redeem a voucher
            </p>
            <p>
              <span className="text-yellow-400">GET</span> /api/vouchers - Get all vouchers
            </p>
            <p>
              <span className="text-yellow-400">GET</span> /api/vouchers/:code - Get voucher by code
            </p>
            <p>
              <span className="text-yellow-400">GET</span> /api/vouchers/stats/overview - Get statistics
            </p>
            <p>
              <span className="text-red-400">DELETE</span> /api/vouchers/reset - Reset all vouchers
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
