# Voucher Generation System

A complete voucher generation and redemption system with Node.js backend and React frontend.

## Project Structure

\`\`\`
voucher-generation/
├── backend/
│   ├── server.js                 # Main server entry point
│   ├── package.json
│   ├── models/
│   │   └── Voucher.js           # Voucher data model
│   ├── controllers/
│   │   └── voucherController.js  # Business logic
│   ├── routes/
│   │   └── voucherRoutes.js      # API routes
│   └── middleware/
│       ├── logger.js             # Request logging
│       └── errorHandler.js       # Error handling
│
└── frontend/
    ├── package.json
    ├── public/
    │   └── index.html
    └── src/
        ├── index.js
        ├── App.jsx
        ├── App.css
        ├── index.css
        └── components/
            ├── VoucherGenerator.jsx   # Generate vouchers
            ├── VoucherRedeemer.jsx    # Redeem vouchers
            ├── VoucherStats.jsx       # Statistics display
            └── VoucherList.jsx        # Voucher listings
\`\`\`

## Setup Instructions

### Backend

1. Navigate to the backend folder:
   \`\`\`bash
   cd backend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the server:
   \`\`\`bash
   npm run dev
   \`\`\`
   
   The API will run on `http://localhost:5000`

### Frontend

1. Navigate to the frontend folder:
   \`\`\`bash
   cd frontend
   \`\`\`

2. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

3. Start the React app:
   \`\`\`bash
   npm start
   \`\`\`
   
   The app will open on `http://localhost:3000`

## API Endpoints

### Generate Voucher
- **POST** `/api/vouchers/generate`
- **Body**: `{ discountAmount: number, maxUses: number }`
- **Response**: `{ success: boolean, message: string, data: Voucher }`

### Redeem Voucher
- **POST** `/api/vouchers/redeem`
- **Body**: `{ code: string }`
- **Response**: `{ success: boolean, message: string, data: Voucher }`

### Get All Vouchers
- **GET** `/api/vouchers`
- **Response**: `{ success: boolean, data: Voucher[] }`

### Get Voucher by Code
- **GET** `/api/vouchers/:code`
- **Response**: `{ success: boolean, data: Voucher }`

### Get Statistics
- **GET** `/api/vouchers/stats/overview`
- **Response**: `{ success: boolean, data: { total: number, redeemed: number, unredeemed: number } }`

### Reset All Vouchers (Testing)
- **DELETE** `/api/vouchers/reset`
- **Response**: `{ success: boolean, message: string }`

## Features

- Generate vouchers with custom discount amounts and usage limits
- Redeem vouchers with automatic validation
- Real-time statistics dashboard showing total, redeemed, and unredeemed vouchers
- View all vouchers in a comprehensive table with status indicators
- Search and filter vouchers by code
- RESTful API with proper error handling and validation
- CORS enabled for frontend-backend communication
- Request logging middleware for debugging
- Responsive UI design with modern styling

## Technologies

- **Backend**: Node.js, Express.js, JavaScript
- **Frontend**: React, Axios (via fetch)
- **Styling**: CSS3
- **Server Runtime**: Node.js 14+

## How to Use

1. **Generate a Voucher**: Enter a discount amount and max uses, then click "Generate Voucher"
2. **View Generated Code**: The voucher code will be displayed immediately after generation
3. **Redeem a Voucher**: Enter the voucher code and click "Redeem Voucher"
4. **View Statistics**: Check the dashboard for total, redeemed, and unredeemed vouchers
5. **Monitor All Vouchers**: View detailed information about all vouchers in the table at the bottom

## Error Handling

- Invalid discount amounts are rejected
- Duplicate redemptions are prevented
- Usage limits are enforced
- Detailed error messages guide users to correct inputs
- All errors are logged server-side for debugging


# DATABASE SCHEMA SQL COMMAND
-- Create the database
CREATE DATABASE IF NOT EXISTS voucher_db;
USE voucher_db;

-- Create the vouchers table
CREATE TABLE vouchers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) NOT NULL UNIQUE,
  discount_amount DECIMAL(10,2) NOT NULL,
  category VARCHAR(50) DEFAULT 'general',
  max_uses INT DEFAULT 1,
  used_count INT DEFAULT 0,
  is_redeemed BOOLEAN DEFAULT FALSE,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  redeemed_at DATETIME NULL
);

-- Optional: sample data for testing
INSERT INTO vouchers (code, discount_amount, category, max_uses, used_count, is_redeemed, created_at)
VALUES
('VOUCHER-TEST1', 50.00, 'general', 1, 0, FALSE, NOW()),
('VOUCHER-TEST2', 100.00, 'holiday', 2, 1, FALSE, NOW());
# ########################

# 1. To run this project 
download mysql workbench (https://www.mysql.com/products/workbench/)

then run the above sql commands and setup 
# Hostname
# Connection name
# Password and store inside vault 

# 2. Then inside this project go to the backend folder/config/database.js
#Replace the values there with the correct details from mysqlworkbench that you just created

# then open terminal and cd backend
THEN TO RUN YOUR BACKEND RUN # node server.js

### 3. On a different server cd frontend 
THEN RUN YOUR FRONTEND # npm run

# THEN YOUR PROJECT SHOULD SUCCESSFULLY RUN