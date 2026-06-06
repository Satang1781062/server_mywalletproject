MyWallet Server API



Backend API for managing personal income and expense tracking system.

Built with:
- Node.js
- Express.js
- MySQL
- Sequelize
- JWT Authentication



## Features
- User Authentication (Register / Login)
- JWT Authentication
- Create Wallet Transactions
- Income & Expense Tracking
- Category Management
- Protected Routes


## Project Structure
/server
├── config/
│   └── db.js

├── models/
│   ├── index.js
│   ├── User.js
│   ├── Wallet.js
│   ├── Category.js
│   └── Transaction.js

├── routes/
│   ├── auth.js
│   ├── wallet.js
│   ├── category.js
│   └── transaction.js

├── controllers/
│   ├── auth.js
│   ├── wallet.js
│   ├── category.js
│   └── transaction.js

├── middleware/
│   ├── auth.js
│   ├── errorHandler.js
│   └── validate.js

├── utils/
│   ├── generateToken.js
│   └── formatDate.js

├── uploads/
├── .env
├── package.json
└── server.js



Install dependencies
npm install

